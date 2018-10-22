import { takeEvery, fork, put, call, race, take } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'
import * as appActions from '../actions/app'
import * as userActions from '../actions/user'
import * as api from '../services/api'

const REFRESH_TIME = 1000 * 60 * 10

const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
)

function* handleStartRefresh() {
  yield takeEvery(appActions.START_REFRESH_TIMER, function* handler() {
    // fire it off first
    yield put(appActions.getAllData())

    while(true) {
      const timer = yield race({
        stopped: take(appActions.STOP_REFRESH_TIMER),
        tick: call(wait, REFRESH_TIME),
      })

      if (!timer.stopped) {
        yield put(appActions.getAllData())
      } else {
        break
      }
    }
  })
}

function* handleLogout() {
  yield takeEvery(userActions.USER_LOGOUT, function* handler() {
    // stop refreshing
    yield put (appActions.stopRefresh())

    // kill our cookie
    api.logout()
  })
}

function* appQuit() {
  yield takeEvery(appActions.APP_QUIT, () => {
    // send the quit
    ipcRenderer.send('APP_QUIT')
  })
}

function* app() {
  yield fork(handleStartRefresh)
  yield fork(handleLogout)
  yield fork(appQuit)
}

export default app
