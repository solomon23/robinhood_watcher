import { takeEvery, fork, select } from 'redux-saga/effects'
import * as appActions from '../actions/app'
import { setTitle } from '../services/ipc'

function* handleTitleChange() {
  yield takeEvery(appActions.GET_PORTFOLIO.SUCCESS, function* get() {
    const state = yield select()
    setTitle(state.toolbar.title)
  })
}

function* toolbar() {
  yield fork(handleTitleChange)
}

export default toolbar
