import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Settings from '../Settings'

Enzyme.configure({ adapter: new Adapter() })

let actions = null

const defaultState = {
  settings: { refreshInterval: 1, viewChangeBy: 'TOTAL', notifyPercent: 10 },
}

describe('Settings component', () => {
  beforeEach(() => {
    actions = { saveSettings: jest.fn(), quit: jest.fn(), logout: jest.fn() }
  })

  it('should display', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should change refresh', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    component.find('Select').at(0).simulate('change', { target: { value: '10' } })
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should view by', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    component.find('Select').at(1).simulate('change', { target: { value: 'PERCENT' } })
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should fire submit', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    component.find('Select').at(1).simulate('change', { target: { value: 'PERCENT' } })
    component.find('.submit').childAt(0).simulate('click')
    expect(actions.saveSettings).toHaveBeenCalledWith({ notifyPercent: 10, refreshInterval: 1, viewChangeBy: 'PERCENT' })
  })

  it('should fire quit', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    component.find('Button').at(2).simulate('click')
    expect(actions.quit).toHaveBeenCalled()
  })

  it('should fire logout', () => {
    const component = shallow(<Settings {...defaultState} {...actions} />)
    component.find('Button').at(1).simulate('click')
    expect(actions.logout).toHaveBeenCalled()
  })
})
