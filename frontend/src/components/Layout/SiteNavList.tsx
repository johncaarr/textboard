/**
 * @file src/components/Layout/SiteNavList.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'

import FlexBox from '../FlexBox'
import HRLink from '../HRLink'
import { useLayoutContext, useLocale, useAppSelector } from '../../state'
import type { NavLink } from '../../types'

export const SiteNavList: React.FC = () => {
  const locale = useLocale()
  const { pathname } = useLocation()
  const [navLinks, setNavLinks] = useState<NavLink[]>()
  const session = useAppSelector((state) => state.session)
  const { mobileState, setMobileState } = useLayoutContext()

  useEffect(() => {
    if (locale) {
      let links: NavLink[] = [
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
          label: mobileState ? locale.layout.desktop : locale.layout.mobile,
          link: `${pathname}#${mobileState ? 'desktop' : 'mobile'}`,
          onClick: () => setMobileState(!mobileState),
        },
        {
          label: locale.siteNavList.home,
          link: '/',
        },
      ]

      if (session?.user) {
        links.splice(1, 0, {
          label: locale.siteNavList.logout,
          link: '/logout',
        })
      }

      setNavLinks(links)
    }
  }, [locale, mobileState, pathname, session?.user, setMobileState])

  return (
    <FlexBox
      justify='right'
      sx={{
        float: 'right',
        paddingRight: '15px',
      }}>
      {navLinks &&
        navLinks.map((navLink) => (
          <FlexBox
            justify='right'
            key={`${navLink.link}/${navLink.label}`}
            sx={{ paddingLeft: '5px' }}>
            <Typography variant='h6' sx={{ paddingRight: '5px' }}>
              {'['}
            </Typography>
            <Typography variant='h6'>
              <HRLink
                onClick={navLink.onClick}
                to={navLink.link ?? pathname}
                style={{ textDecoration: 'none' }}>
                {navLink.label}
              </HRLink>
            </Typography>
            <Typography variant='h6' sx={{ paddingLeft: '5px' }}>
              {']'}
            </Typography>
          </FlexBox>
        ))}
    </FlexBox>
  )
}

export default SiteNavList

