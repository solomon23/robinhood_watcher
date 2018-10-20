import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Login from '../Login'

Enzyme.configure({ adapter: new Adapter() })

let actions = null

const defaultState = {
  user: {},
}

describe('Login component', () => {
  beforeEach(() => {
    actions = { login: jest.fn() }
  })

  it('should display', () => {
    const component = shallow(<Login {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should display loading', () => {
    const state = { ...defaultState, user: { isLoading: true } }
    const component = shallow(<Login {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should login', () => {
    const component = shallow(<Login {...defaultState} {...actions} />)
    component.find('input').at(0).simulate('change', { target: { value: 'user' } })
    component.find('input').at(1).simulate('change', { target: { value: 'password' } })
    component.find('.btn').simulate('click')
    expect(actions.login).toHaveBeenCalledWith('user', 'password', null)
  })

  it('should show token', () => {
    const state = { ...defaultState, user: { needsMfa: true } }
    const component = shallow(<Login {...state} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should send token', () => {
    const state = { ...defaultState, user: { needsMfa: true } }
    const component = shallow(<Login {...state} {...actions} />)
    component.find('input').at(0).simulate('change', { target: { value: 'user' } })
    component.find('input').at(1).simulate('change', { target: { value: 'password' } })
    component.find('input').at(2).simulate('change', { target: { value: 'token' } })
    component.find('.btn').simulate('click')
    expect(actions.login).toHaveBeenCalledWith('user', 'password', 'token')
  })
})
