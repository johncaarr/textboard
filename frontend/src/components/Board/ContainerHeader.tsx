/**
 * @file src/components/Board/ContainerHeader.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useMemo, useState } from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import { Typography } from '@mui/material'

import { useDateString } from '../../modules/date'
import FlexBox from '../FlexBox'
import HRLink from '../HRLink'
import type { DateCollection, Post, Thread } from '../../types'

import styles from '../../styles/components.module.css'

export interface ContainerHeaderProps {
  data: Partial<Thread> | Partial<Post>
  posts: Post[]
  variant?: 'post' | 'thread'
}

export const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  data,
  posts,
  variant = 'thread',
}) => {
  const getDateString = useDateString()
  const [dates, setDates] = useState<DateCollection>()

  const dateCreated = useMemo(() => {
    return dates && getDateString(dates.created)
  }, [dates, getDateString])

  useEffect(() => {
    if (!dates)
      setDates({
        created: new Date(data.date_created!),
        edited: new Date(data.date_edited!),
      })
  }, [dates, data.date_created, data.date_edited])

  const threadPath = `/${
    'board' in data
      ? data.board?.name
      : 'thread' in data && data.thread?.board?.name
  }/thread/${'thread' in data ? data.thread?.id : data.id}`

  return (
    <FlexBox justify='left'>
      {'subject' in data && data.subject !== '' && (
        <FlexBox justify='left'>
          <Typography variant='h6' sx={{ paddingRight: '5px' }}>
            {data.subject}
          </Typography>
          <Typography
            variant='h6'
            sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
            {'-'}
          </Typography>
        </FlexBox>
      )}
      {data.creator?.is_staff && (
        <SecurityIcon fontSize='small' sx={{ color: 'red' }} />
      )}
      <Typography
        variant='h6'
        sx={{
          color: data.creator?.is_staff ? 'red' : 'blue',
          paddingRight: '5px',
        }}>
        {data.creator?.username}
      </Typography>
      <Typography variant='h6' sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
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
          to={`${threadPath}/${variant === 'post' ? `#${data.id}` : ''}`}
          className={styles.link}>
          {data.id}
        </HRLink>
      </Typography>
      <Typography variant='h6' sx={{ paddingRight: '5px' }}>
        {`[`}
      </Typography>
      <Typography variant='h6' sx={{ paddingRight: '5px' }}>
        <HRLink to={`${threadPath}/#reply`}>Reply</HRLink>
      </Typography>
      <Typography variant='h6' sx={{ paddingRight: '5px' }}>
        {`]`}
      </Typography>
      <FlexBox
        justify='left'
        sx={{
          paddingLeft: '15px',
        }}>
        {posts &&
          posts.map((post) => {
            const referrer = `>>/thread/${data.id}`
            if (post.comment.indexOf(referrer) > -1) {
              const path = `${threadPath}/#${post.id}`
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
      </FlexBox>
    </FlexBox>
  )
}

export default ContainerHeader

