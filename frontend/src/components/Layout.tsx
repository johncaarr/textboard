import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import { useAppSelector } from '../state/hooks'
import type { Board, NavLink } from '../types'

export const Layout: React.FC = () => {
  const session = useAppSelector((state) => state.session)
  const [boards, setBoards] = useState<Board[]>()
  const [navLinks, setNavLinks] = useState<NavLink[]>()
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/boards/', {
      method: 'GET',
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data: { results: Board[] }) =>
        setBoards(data.results.sort((a, b) => a.name.localeCompare(b.name)))
      )
  }, [])
  useEffect(() => {
    setNavLinks([
      {
        label: 'Settings',
        link: '/settings',
      },
      {
        label: session?.user?.username ?? 'Login',
        link:
          session?.user !== undefined ? `/usr/${session?.user?.id}` : '/login',
      },
      {
        label: 'Home',
        link: '/',
      },
    ])
  }, [session?.user])
  return (
    <Box className='Layout' sx={{ paddingTop: '10px' }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', float: 'left', paddingLeft: '15px' }}>
              {boards &&
                boards.map((board, index) => {
                  return (
                    <Typography
                      variant='h6'
                      key={`${board.name}/${index}`}
                      sx={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      {index === 0 && 'Boards: [ '}
                      <Link
                        to={`/${board.name}`}
                        style={{ textDecoration: 'none' }}>
                        {board.name}
                      </Link>
                      {index === boards.length - 1 ? ' ]' : ' /'}
                    </Typography>
                  )
                })}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
              <Typography variant='h4' textAlign='center'>
                textboard
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                float: 'right',
                paddingRight: '15px',
              }}>
              {navLinks?.map((navLink) => (
                <Typography
                  variant='h6'
                  key={`${navLink.link}/${navLink.label}`}
                  sx={{ paddingLeft: '5px', paddingRight: '0px' }}>
                  {'[ '}
                  <Link to={navLink.link} style={{ textDecoration: 'none' }}>
                    {navLink.label}
                  </Link>
                  {' ]'}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout

