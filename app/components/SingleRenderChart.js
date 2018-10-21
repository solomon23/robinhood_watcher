// @flow
/*
  ChartistGraph re-renders too frequently.  Our use case only needs a single render once we have data.
*/
import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

type Props = {
  data: any,
  options: any
}

export default class SingleRenderChart extends Component<Props> {
  props: Props

  shouldComponentUpdate(next: Props) {
    const { data } = this.props
    return data === null && next.data
  }

  render() {
    const { data, options } = this.props

    return (<ChartistGraph data={data} options={options} type="Line" />)
  }
}
