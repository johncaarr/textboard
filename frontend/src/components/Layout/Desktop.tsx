/**
 * @file src/components/Layout/Desktop.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import { boards } from '../../api'
import Header from './Header'
import SiteNavList from './SiteNavList'
import BoardsNavList from './BoardsNavList'
import type { Board } from '../../types'

export const Layout: React.FC = () => {
  const [boardsList, setBoardsList] = useState<Board[]>()

  useEffect(() => {
    if (!boardsList) {
      boards.fetchAll({
        success: (results) =>
          setBoardsList(results.sort((a, b) => a.name.localeCompare(b.name))),
      })
    }
  }, [boardsList])

  return (
    <Box className='Layout' sx={{ paddingTop: '10px' }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            {boardsList && <BoardsNavList boards={boardsList} />}
          </Grid>
          <Grid item xs={4}>
            <Header />
          </Grid>
          <Grid item xs={4}>
            <SiteNavList />
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

