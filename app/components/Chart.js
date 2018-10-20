import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import targetLine from '../3rd_party/chartist-plugin-targetline'
import targetThresh from '../3rd_party/chartist-plugin-threshold'
import styles from './styles/Chart.scss'
import { getSMA } from '../services/api'

type Props = {
  symbol: string
}

export default class Chart extends Component<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)

    this.state = {
      sma: null,
    }
  }

  componentDidMount() {
    const { symbol } = this.props

    getSMA(symbol).then((results) => {
      this.setState({ sma: results })
      return null
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    const { sma } = this.state
    const { symbol } = this.props

    if (!sma) {
      return null
    }

    const currentPrice = Number(sma[sma.length - 1].marketClose).toFixed(2)
    const marketOpen = sma[0].marketOpen
    const marketClose = sma[0].marketClose
    const className = marketClose < marketOpen ? 'loss' : 'gain'

    const points = sma.map(item => ({
      x: item.label,
      y: Number(item.average).toFixed(2),
    })).filter(point => point.y >= 0)

    const labels = points.map((point) => point.x)

    const chartData = {
      series: [{
        name: symbol,
        data: points,
        className,
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

    return (
      <div>
        <div>
          <div className={styles.label}>{symbol}</div>
          <div className={styles.price}>{currentPrice}</div>
        </div>
        <div className={styles.chart}>
          <ChartistGraph data={chartData} options={options} type="Line" />
        </div>
      </div>
    )
  }
}
