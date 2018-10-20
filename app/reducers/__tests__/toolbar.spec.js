import reducer from '../toolbar'
import * as ActionTypes from '../../actions/app'

describe('toolbar reducer', () => {
  it('should handle GET_PORTFOLIO.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_PORTFOLIO.SUCCESS,
        response: {
          equity: 100,
        },
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_PORTFOLIO.SUCCESS after hours', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_PORTFOLIO.SUCCESS,
        response: {
          equity: 10,
          extended_hours_equity: 200,
        },
      })
    ).toMatchSnapshot()
  })
})
