/**
 *
 * @file src/modules/csrf.ts
 * @author John Carr
 * @license MIT
 */

import Cookies from 'js-cookie'

export namespace csrf {
  export const headers = (init?: HeadersInit) => {
    const csrftoken = Cookies.get('csrftoken') ?? ''
    return new Headers({
      ...init,
      'X-CSRFToken': csrftoken,
    })
  }
}

export default csrf

