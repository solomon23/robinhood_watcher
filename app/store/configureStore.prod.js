// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from '../reducers'
import type { counterStateType } from '../reducers/types'
import sagas from '../sagas'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(thunk, router, sagaMiddleware)

function configureStore(initialState?: counterStateType) {
  sagas(sagaMiddleware)
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
