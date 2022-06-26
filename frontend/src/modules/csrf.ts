/**
 * @file src/modules/csrf.ts
 * @author John Carr
 * @license MIT
 */

import Cookies from 'js-cookie'

const CSRF_TOKEN = 'csrftoken'

export namespace csrf {
  export const headers = (init?: HeadersInit) =>
    new Headers({
      ...init,
      'X-CSRFToken': Cookies.get(CSRF_TOKEN) ?? '',
    })
}

export default csrf

