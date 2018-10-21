import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import WatchList from '../WatchList'

Enzyme.configure({ adapter: new Adapter() })

let actions = null

const defaultState = {
  stocks: [],
}

describe('WatchList component', () => {
  beforeEach(() => {
    actions = { }
  })

  it('should display empty', () => {
    const component = shallow(<WatchList {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should sort list', () => {
    const state = { ...defaultState, stocks: [{ symbol: 'z' }, { symbol: 'a' }, { symbol: 'c' }] }
    const component = shallow(<WatchList {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should show as watchlist', () => {
    const state = { ...defaultState, stocks: [{ symbol: 'z' }, { symbol: 'a' }, { symbol: 'c' }] }
    const component = shallow(<WatchList {...state} {...actions} watchlist />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })
})
