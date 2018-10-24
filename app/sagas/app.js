import { takeEvery, fork, put, call, race, take, select } from 'redux-saga/effects'
import { remote } from 'electron'
import * as appActions from '../actions/app'
import * as userActions from '../actions/user'
import * as api from '../services/api'
import { setTitle } from '../services/ipc'

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
      const state = yield select()

      const timer = yield race({
        stopped: take(appActions.STOP_REFRESH_TIMER),
        tick: call(wait, state.settings.refreshInterval * 60 * 1000),
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
    yield put (appActions.stopRefreshTimer())

    // kill our cookie
    api.logout()

    // update the title
    setTitle('-')
  })
}

function* appQuit() {
  yield takeEvery(appActions.APP_QUIT, () => {
    // send the quit
    remote.app.quit()
  })
}

function* appEvents() {
  yield fork(handleStartRefresh)
  yield fork(handleLogout)
  yield fork(appQuit)
}

export default appEvents
