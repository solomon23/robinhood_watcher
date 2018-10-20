import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Home from '../Home'

Enzyme.configure({ adapter: new Adapter() })

let actions = null

const defaultState = {
  portfolio: { extended_hours_equity: null,  equity: 100, adjusted_equity_previous_close: 101 },
  positions: [],
  actions: {},
}

describe('Home component', () => {
  beforeEach(() => {
    actions = { getAllData: jest.fn(), startRefreshTimer: jest.fn() }
  })

  it('should display for open hours', () => {
    const component = shallow(<Home {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
    expect(actions.startRefreshTimer).toHaveBeenCalled()
  })

  it('should display for after hours', () => {
    const state = {
      ...defaultState,
      portfolio: { extended_hours_equity: 102,  equity: 100, adjusted_equity_previous_close: 101 },
    }

    const component = shallow(<Home {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should show loading', () => {
    const state = { ...defaultState, actions: { portfolioLoading: true } }
    const component = shallow(<Home {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should fire refresh', () => {
    const component = shallow(<Home {...defaultState} {...actions} />)
    component.find('.refresh').simulate('click')
    expect(actions.getAllData).toHaveBeenCalled()
  })
})
