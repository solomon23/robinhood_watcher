import React, { Component } from 'react'
import targetLine from '../3rd_party/chartist-plugin-targetline'
import targetThresh from '../3rd_party/chartist-plugin-threshold'
import styles from './styles/Chart.scss'
import { getSMA } from '../services/api'
import SingleRenderChart from './SingleRenderChart'

const CHART_LEFT = 90
const CHART_RIGHT = 804

type Props = {
  symbol: string
}

export default class Chart extends Component<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onHideTooltip = this.onHideTooltip.bind(this)

    this.state = {
      sma: null,
      chartData: null,
      options: null,
      tooltip: false,
      mouse: {
        x: 0,
        y: 0,
      },
    }
  }

  componentDidMount() {
    const { symbol } = this.props

    getSMA(symbol).then((sma) => {
      // build the chart data once and store it
      const { chartData, options } = this.getChartData(sma)

      this.setState({ sma, chartData, options })
      return null
    }).catch((err) => {
      console.log(err)
    })
  }

  getPriceForPosition(position) {
    const { chartData } = this.state
    const items = chartData.series[0].data

    const relative = position - CHART_LEFT
    let currentPrice = Number(items[items.length - 1].y).toFixed(2)
    let label = ''

    if (relative >= 0) {
      // find the mouse position by percent of width
      const percent = (100 * relative) / (CHART_RIGHT - CHART_LEFT)

      // use the percent to get an index into the data array
      let index = Math.round(((items.length - 1) * (percent / 100)))

      // if it's beyond the max, use the max
      if (index > items.length -1) {
        index = items.length - 1
      }

      // return the data
      currentPrice = Number(items[index].y).toFixed(2)
      label = items[index].x
    }

    return { currentPrice, label }
  }

  getChartData(sma) {
    const marketOpen = sma[0].marketOpen
    const { symbol } = this.props

    const points = sma.map((item) => {
      let average = item.average
      if (average === -1) {
        average = item.marketAverage
      }

      return {
        x: item.label,
        y: Number(average).toFixed(2),
      }
    }).filter(point => point.y >= 0)

    const labels = points.map((point) => point.x)

    const chartData = {
      series: [{
        name: symbol,
        data: points,
        labels,
      }],
    }

    const options = {
      fullWidth: true,
      chartPadding: 20,
      axisX: {
        showGrid: false,
      },
      height: '535px',
      targetLine: {
          value: marketOpen,
      },
      plugins: [
        targetThresh({
          threshold: marketOpen,
        }),

        targetLine({
          value: marketOpen,
        }),
      ],
    }

    return { chartData, options }
  }

  onMouseMove(e) {
    const mouse = { x: e.clientX, y: e.clientY }
    this.setState({ mouse, tooltip: true })
  }

  onHideTooltip() {
    this.setState({ tooltip: false })
  }

  render() {
    const { sma, mouse, tooltip, chartData, options } = this.state
    const { symbol } = this.props

    if (!sma) {
      return null
    }

    // don't let the tooltip leave the chart
    let left = mouse.x
    if (left < CHART_LEFT) {
      left = CHART_LEFT
    }

    if (left > CHART_RIGHT) {
      left = CHART_RIGHT
    }

    const { currentPrice, label } = this.getPriceForPosition(left)

    return (
      <div>
        <div>
          <div className={styles.label}>{symbol}</div>
          <div className={styles.price}>{currentPrice}</div>
        </div>
        <div className={styles.chart} onMouseMove={this.onMouseMove} onMouseLeave={this.onHideTooltip}>
          {tooltip && (
            <div className={styles.tooltip} style={{ left }}>
              <div className={styles.tooltipTitle}>{label}</div>
            </div>
          )}
          <SingleRenderChart data={chartData} options={options} />
        </div>
      </div>
    )
  }
}
