import toolbarSaga from './toolbar'
import appSaga from './app'

export default (sagas) => {
  sagas.run(toolbarSaga)
  sagas.run(appSaga)
}
