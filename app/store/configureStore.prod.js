// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from '../reducers';
import sagas from '../sagas';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

function configureStore(initialState?: any) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagas(sagaMiddleware);
  return store;
}

export default { configureStore, history };
