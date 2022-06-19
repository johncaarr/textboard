import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export * from './boards'
export * from './posts'
export * from './threads'
export * from './users'
