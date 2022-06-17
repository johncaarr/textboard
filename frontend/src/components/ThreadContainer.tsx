import React, { useEffect, useState, ReactNode } from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import Markdown from './Markdown'
import posts from '../api/posts'
import threads from '../api/threads'
import { getDateString } from '../modules/date'
import type { DateCollection, Post, Thread } from '../types'

import styles from '../styles/components.module.css'

export interface ThreadContainerProps {
  boardName: string
  threadId: string | number
  collapsed?: boolean
  data?: Thread
  children?: null | ReactNode | ReactNode[]
}

export const ThreadContainer: React.FC<ThreadContainerProps> = ({
  boardName,
  threadId,
  data,
}) => {
  const [thread, setThread] = useState<Thread>()
  const [postList, setPostList] = useState<Post[]>()
  const [dates, setDates] = useState<DateCollection>()

  useEffect(() => {
    if (!data) {
      threads.fetchOne({
        params: `board=${boardName}&thread=${threadId}`,
        success: (result) => setThread(result),
      })
    } else {
      setThread(data)
    }
  }, [boardName, data, threadId])

  useEffect(() => {
    if (thread) {
      const threadDates: DateCollection = {
        created: new Date(thread.date_created),
        edited: new Date(thread.date_edited),
      }
      setTimeout(() => setDates(threadDates))
      posts.fetchAll({
        params: `board=${thread.board.name}&thread=${thread.id}`,
        success: (results) => setPostList(results),
      })
    }
  }, [thread])

  return (
    <Box className='Thread-container'>
      {thread && (
        <Box className='Thread-container-internal'>
          <Grid
            container
            spacing={1}
            sx={{ padding: '10px', paddingLeft: '30px' }}>
            <Grid item xs={12}>
              {/* {UserName} MM/DD/YY ({Mon-Sun}) HH:MM:SS No.{thread.id} [Reply] */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'left',
                }}>
                {thread.subject !== '' && (
                  <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                    {thread.subject}
                    {' - '}
                  </Typography>
                )}
                {thread.creator.is_staff && (
                  <SecurityIcon fontSize='small' sx={{ color: 'red' }} />
                )}
                <Typography
                  variant='h6'
                  sx={{
                    color: thread.creator.is_staff ? 'red' : 'blue',
                    paddingRight: '5px',
                  }}>
                  {thread.creator.username}
                  {' - '}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {dates && `${getDateString(dates.created)}`}
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {` - No.`}
                  <Link to={``} className={styles.link}>
                    {thread.id}
                  </Link>
                </Typography>
                <Typography variant='h6' sx={{ paddingRight: '5px' }}>
                  {'['}
                  <Link to={`/${thread.board.name}/${thread.id}#reply`}>
                    Reply
                  </Link>
                  {']'}
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
                      const path = `/${post.thread.board.name}/${post.thread.id}#${post.id}`
                      return (
                        <Typography
                          key={path}
                          variant='subtitle1'
                          sx={{ paddingRight: '3px' }}>
                          <Link to={path}>{`>>${post.id}`}</Link>
                        </Typography>
                      )
                    })}
                </Box>
              </Box>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  <Markdown>{thread.comment}</Markdown>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default ThreadContainer

