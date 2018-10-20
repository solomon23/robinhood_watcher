import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'
import Chart from '../Chart'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../services/api.js')

describe('Chart component', () => {
  it('should render', (done) => {
    const component = shallow(<Chart data={{ id: 1 }} options={{ options: true }} />)
    setTimeout(() => {
      component.update()
      expect(shallowToJson(component)).toMatchSnapshot()
      done()
    }, 0)
  })
})
