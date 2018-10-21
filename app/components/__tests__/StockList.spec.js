import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import StockList from '../StockList'

Enzyme.configure({ adapter: new Adapter() })

let actions = null

const defaultState = {
  stocks: [],
}

describe('StockList component', () => {
  beforeEach(() => {
    actions = { }
  })

  it('should display empty', () => {
    const component = shallow(<StockList {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should sort list', () => {
    const state = { ...defaultState, stocks: [{ symbol: 'z' }, { symbol: 'a' }, { symbol: 'c' }] }
    const component = shallow(<StockList {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should show as watchlist', () => {
    const state = { ...defaultState, stocks: [{ symbol: 'z' }, { symbol: 'a' }, { symbol: 'c' }] }
    const component = shallow(<StockList {...state} {...actions} watchlist />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })
})
