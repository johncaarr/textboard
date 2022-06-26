import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { useLocale } from '../../modules/locale'
import { useAppSelector } from '../../state/hooks'
import HRLink from '../HRLink'
import type { NavLink } from '../../types'

export const SiteNavList: React.FC = () => {
  const locale = useLocale()
  const [navLinks, setNavLinks] = useState<NavLink[]>()
  const session = useAppSelector((state) => state.session)

  useEffect(() => {
    if (locale) {
      setNavLinks([
        {
          label: locale.siteNavList.settings,
          link: '/settings',
        },
        {
          label: session?.user?.username ?? locale.siteNavList.login,
          link:
            session?.user !== undefined
              ? `/usr/${session?.user?.id}`
              : '/login',
        },
        {
          label: locale.siteNavList.home,
          link: '/',
        },
      ])
    }
  }, [locale, session?.user])

  return (
    <Box
      sx={{
        display: 'flex',
        float: 'right',
        paddingRight: '15px',
      }}>
      {navLinks &&
        navLinks.map((navLink) => (
          <Typography
            variant='h6'
            key={`${navLink.link}/${navLink.label}`}
            sx={{ paddingLeft: '5px', paddingRight: '0px' }}>
            {'[ '}
            <HRLink to={navLink.link} style={{ textDecoration: 'none' }}>
              {navLink.label}
            </HRLink>
            {' ]'}
          </Typography>
        ))}
    </Box>
  )
}

export default SiteNavList

