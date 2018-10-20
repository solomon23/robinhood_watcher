/*
  ChartistGraph re-renders too frequently.  Our use case only needs a single render once we have data.
*/
import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

type Props = {
  data: object,
  options: object
}

export default class SingleRenderChart extends Component<Props> {
  props: Props

  shouldComponentUpdate(next) {
    const { data } = this.props
    return data === null && next.props.data
  }

  render() {
    const { data, options } = this.props

    return (<ChartistGraph data={data} options={options} type="Line" />)
  }
}
