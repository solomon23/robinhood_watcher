// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import toolbar from './toolbar'
import user from './user'
import app from './app'

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {})

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      toolbar,
      app,
      user,
    })
  )
}
