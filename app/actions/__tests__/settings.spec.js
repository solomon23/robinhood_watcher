import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actions from '../settings'
import * as ipc from '../../services/ipc'

const mockStore = configureMockStore([thunk])
jest.mock('../../services/api.js')
jest.mock('../../services/ipc.js')

describe('settings actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should fire update settings', () => {
    expect(actions.updateSettings({ refreshInterval: 100 })).toMatchSnapshot()
  })

  it('should fire loadSettings', () => {
    const store = mockStore({ })

    store.dispatch(actions.loadSettings())
    expect(store.getActions()).toMatchSnapshot()
  })

  it('should fire saveSettings', () => {
    const store = mockStore({ })

    store.dispatch(actions.saveSettings({ refreshInterval: 5, viewChangeBy: 'TOTAL', notifyPercent: 10 }))
    expect(store.getActions()).toMatchSnapshot()
    expect(ipc.saveSettings).toHaveBeenCalledWith({ refreshInterval: 5, viewChangeBy: 'TOTAL', notifyPercent: 10 })
  })

  it('should fire quit', () => {
    actions.quit()()
    expect(ipc.quit).toHaveBeenCalledWith()
  })

  it('should fire logout', () => {
    actions.logout()()
    expect(ipc.logout).toHaveBeenCalledWith()
  })
})
