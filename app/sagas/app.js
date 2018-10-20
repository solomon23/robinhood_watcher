import { takeEvery, fork, put, call, race, take } from 'redux-saga/effects'
import * as appActions from '../actions/app'

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

function* app() {
  yield fork(handleStartRefresh)
}

export default app
