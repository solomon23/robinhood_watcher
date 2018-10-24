// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import toolbar from './toolbar'
import user from './user'
import app from './app'
import settings from './settings'

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {})

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      toolbar,
      app,
      user,
      settings,
    })
  )
}
