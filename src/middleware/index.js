import thunk from 'redux-thunk'
import logger from './logger'
import authedUser from './authedUser'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  logger,
  authedUser
)
