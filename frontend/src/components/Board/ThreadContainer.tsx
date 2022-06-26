import React, { useEffect, useMemo, useState } from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import { Box, Grid, Typography } from '@mui/material'

import { posts, threads } from '../../api'
import { getDateString } from '../../modules/date'
import FlexBox from '../FlexBox'
import HRLink from '../HRLink'
import Markdown from './Markdown'
import PostContainer from './PostContainer'
import type { DateCollection, Post, Thread } from '../../types'

import styles from '../../styles/components.module.css'

export interface ThreadContainerProps {
  board?: string | number
  thread?: string | number
  collapsed?: boolean
  data?: Thread
  focus?: number
}

export const ThreadContainer: React.FC<ThreadContainerProps> = ({
  board,
  thread,
  collapsed,
  data,
  focus,
}) => {
  const [postList, setPostList] = useState<Post[]>()
  const [dates, setDates] = useState<DateCollection>()
  const [threadState, setThreadState] = useState<Thread>()

  const dateCreated = useMemo(() => {
    return dates && getDateString(dates.created)
  }, [dates])

  useEffect(() => {
    if (!data) {
      threads.fetchOne({
        params: `board=${board}&thread=${thread}`,
        success: (result) => setThreadState(result),
      })
    } else {
      setThreadState(data)
    }
  }, [board, data, thread])

  useEffect(() => {
    if (threadState) {
      setTimeout(() => {
        setDates({
          created: new Date(threadState.date_created),
          edited: new Date(threadState.date_edited),
        })
      }, 0)

      posts.fetchAll({
        params: `board=${threadState.board.name}&thread=${threadState.id}`,
        success: (results) =>
          setPostList(collapsed ? results.splice(results.length - 6) : results),
      })
    }
  }, [collapsed, threadState])

  return (
    <Box className='Thread-container'>
      {threadState && (
        <Box className='Thread-container-internal'>
          <Grid
            container
            spacing={1}
            sx={{ padding: '10px', paddingLeft: '30px' }}>
            <Grid item xs={12}>
              {/* {UserName} MM/DD/YY ({Mon-Sun}) HH:MM:SS No.{threadState.id} [Reply] */}
              <FlexBox justify='left'>
                {threadState.subject !== '' && (
                  <FlexBox justify='left'>
                    <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                      {threadState.subject}
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
                      {'-'}
                    </Typography>
                  </FlexBox>
                )}
                {threadState.creator.is_staff && (
                  <SecurityIcon fontSize='small' sx={{ color: 'red' }} />
                )}
                <Typography
                  variant='h6'
                  sx={{
                    color: threadState.creator.is_staff ? 'red' : 'blue',
                    paddingRight: '5px',
                  }}>
                  {threadState.creator.username}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  {`-`}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {dateCreated && `${dateCreated}`}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {`- No.`}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  <HRLink
                    to={`/${threadState.board.name}/thread/${threadState.id}`}
                    className={styles.link}>
                    {threadState.id}
                  </HRLink>
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {`[`}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  <HRLink
                    to={`/${threadState.board.name}/thread/${threadState.id}#reply`}>
                    Reply
                  </HRLink>
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {`]`}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    paddingLeft: '15px',
                  }}>
                  {postList &&
                    postList.map((post) => {
                      const referrer = `>>/thread/${threadState.id}`
                      if (post.comment.indexOf(referrer) > -1) {
                        const path = `/${post.thread.board.name}/thread/${post.thread.id}#${post.id}`
                        return (
                          <Typography
                            key={path}
                            variant='subtitle1'
                            sx={{ paddingRight: '3px' }}>
                            <HRLink to={path}>{`>>${post.id}`}</HRLink>
                          </Typography>
                        )
                      }
                      return undefined
                    })}
                </Box>
              </FlexBox>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  <Markdown>{threadState.comment}</Markdown>
                </Typography>
              </Grid>
              {postList &&
                postList.map((post) => {
                  const key = `${post.thread.board.name}/${post.thread.id}/${post.id}`
                  return (
                    <Grid item key={key} xs={12}>
                      <PostContainer data={post} />
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default ThreadContainer

