import { takeEvery, fork, select } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'
import * as appActions from '../actions/app'

function* handleTitleChange() {
  yield takeEvery(appActions.GET_PORTFOLIO.SUCCESS, function* get() {
    const state = yield select()
    ipcRenderer.send('SET_MENU_TITLE', state.toolbar.title)
  })
}

function* toolbar() {
  yield fork(handleTitleChange)
}

export default toolbar
