import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import StockRow from '../StockRow'

Enzyme.configure({ adapter: new Adapter() })

const actions = {}
const defaultState = {
  stock: {},
  viewBy: 'TOTAL',
}

describe('StockRow component', () => {
  beforeEach(() => {
    defaultState.stock = { 'symbol': 'a', quantity: 1, last_trade_price: 10, previous_close: 5 }
  })

  it('should display positive value', () => {
    const component = shallow(<StockRow {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should display negative value', () => {
    defaultState.stock.previous_close = 20
    const component = shallow(<StockRow {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should display after hours value', () => {
    defaultState.stock.last_extended_hours_trade_price = 20
    const component = shallow(<StockRow {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })
})
