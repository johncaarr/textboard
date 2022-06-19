import React from 'react'
import { useLocation, Link, LinkProps } from 'react-router-dom'
import type { LinkState } from '../types'

export const HRLink: React.FC<LinkProps> = (props) => {
  const { pathname } = useLocation()
  const hrLinkState: LinkState = { lastpath: pathname }
  return (
    <Link {...props} state={hrLinkState}>
      {props.children}
    </Link>
  )
}

export default HRLink

