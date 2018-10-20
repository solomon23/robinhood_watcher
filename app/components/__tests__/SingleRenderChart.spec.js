import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import SingleRenderChart from '../SingleRenderChart'

Enzyme.configure({ adapter: new Adapter() })

describe('SingleRenderChart component', () => {
  it('should render', () => {
    const component = shallow(<SingleRenderChart data={{ id: 1 }} options={{ options: true }} />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should not re-render', () => {
    const component = shallow(<SingleRenderChart data={{ id: 1 }} options={{ options: true }} />)
    expect(component.instance().shouldComponentUpdate({ data: { id: 2 } })).toBeFalsy()
  })
})
