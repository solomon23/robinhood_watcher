
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import { shallowToJson } from 'enzyme-to-json'
import thunk from 'redux-thunk'
import App from '../App'
import { tryAuth } from '../../actions/user'

jest.mock('../../actions/user')

Enzyme.configure({ adapter: new Adapter() })
const mockStore = configureMockStore([thunk])

let store

describe('App component', () => {
  beforeEach(() => {
    store = { user: {} }
    tryAuth().mockClear()
  })

  it('should show login', () => {
    const wrapper = shallow(<App store={mockStore(store)} />).shallow()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should fire try auth', () => {
    store.user.authenticated = false
    const mock = mockStore(store)
    shallow(<App store={mock} />).shallow()
    expect(tryAuth()).toHaveBeenCalled()
  })

  it('should show page', () => {
    store.user.authenticated = true
    const wrapper = shallow(<App store={mockStore(store)} />).shallow()

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
