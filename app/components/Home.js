// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { calculateEquity } from '../services/portfolio'
import styles from './styles/Home.scss'
import { USD } from '../services/utils'
import StockList from './StockList'

const TABS = {
  STOCKS: 'STOCKS',
  WATCHLIST: 'WATCHLIST',
}

type Props = {
  portfolio: object,
  positions: array,
  watchlist: array,
  actions: object,
  getAllData: () => void,
  startRefreshTimer: () => void
}

export default class Home extends Component<Props> {
  props: Props

  constructor(context, props) {
    super(context, props)

    this.onTabClick = this.onTabClick.bind(this)
    this.refresh = this.refresh.bind(this)

    this.state = {
      tab: TABS.STOCKS,
    }
  }

  componentDidMount() {
    const { startRefreshTimer } = this.props

    startRefreshTimer()
  }

  refresh() {
    const { getAllData } = this.props

    getAllData()
  }

  onTabClick(tab, e) {
    if (e) { e.preventDefault() }

    this.setState({ tab })
  }

  render() {
    const { portfolio, positions, watchlist, actions } = this.props
    const { tab } = this.state

    if (!Object.keys(portfolio).length > 0) {
      // show a loading state here
      return null
    }

    const {
      equity,
      equityDifference,
      afterHoursEquityDifference,
    } = calculateEquity(portfolio)

    const isReloading = actions.portfolioLoading || actions.positionsLoading || actions.watchlistLoading

    return (
      <div className={styles.equityContainer}>
        <div className={styles.header}>
          <div onClick={this.refresh} className={classnames(styles.refresh, { [styles.reloading]: isReloading })} />
          <div className={styles.equity}>
            {USD(equity)}
          </div>
          <div className={styles.change}>
            {equityDifference} Today
          </div>
          {afterHoursEquityDifference && (
            <div className={styles.afterHours}>
              {afterHoursEquityDifference} After Hours
            </div>
          )}
        </div>
        <div className={styles.tabs}>
          <a
            href="#"
            className={classnames(styles.tab, { [styles.selected]: tab === TABS.STOCKS })}
            onClick={(e) => this.onTabClick(TABS.STOCKS, e)}
          >
            Stocks
          </a>
          <a
            href="#"
            className={classnames(styles.tab, { [styles.selected]: tab === TABS.WATCHLIST })}
            onClick={(e) => this.onTabClick(TABS.WATCHLIST, e)}
          >
            Watchlist
          </a>
        </div>
        {tab === TABS.STOCKS && (
          <StockList stocks={positions} />
        )}
        {tab === TABS.WATCHLIST && (
          <StockList stocks={watchlist} watchlist />
        )}
      </div>
    )
  }
}
