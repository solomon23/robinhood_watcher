import reducer from '../settings'
import * as ActionTypes from '../../actions/settings'

const initialState = {
  refreshInterval: 10,
  viewChangeBy: ActionTypes.VIEW_BY.TOTAL,
  notifyPercent: 0,
}

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle SETTINGS_UPDATE', () => {
    expect(
      reducer(initialState, {
        type: ActionTypes.SETTINGS_UPDATE,
        payload: { refreshInterval: 15 },
      })
    ).toMatchSnapshot()
  })
})
