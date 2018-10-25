// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { calculateEquity } from '../services/portfolio'
import styles from './styles/Home.scss'
import { USD } from '../services/utils'
import StockList from './StockList'
import WatchList from './WatchList'

const TABS = {
  STOCKS: 'STOCKS',
  WATCHLIST: 'WATCHLIST',
}

type Props = {
  portfolio: Portfolio,
  positions: Array<Stock>,
  watchlist: Array<Stock>,
  actions: AppActions,
  settings: UserSettings,
  getAllData: () => void,
  startRefreshTimer: () => void,
  openSettings: (UserSettings) => void
}

type State = {
  tab: string
}

export default class Home extends Component<Props, State> {
  props: Props

  constructor(props: Props) {
    super(props)

    this.onTabClick = this.onTabClick.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onSettingsClick = this.onSettingsClick.bind(this)

    this.state = {
      tab: TABS.STOCKS,
    }
  }

  componentDidMount() {
    const { startRefreshTimer } = this.props

    startRefreshTimer()
  }

  /* :: onRefresh: Function */
  onRefresh() {
    const { getAllData } = this.props

    getAllData()
  }

  /* :: onTabClick: Function */
  onTabClick(tab: string, e: SyntheticEvent<HTMLDivElement>) {
    if (e) { e.preventDefault() }

    this.setState({ tab })
  }

  /* :: onSettingsClick: Function */
  onSettingsClick() {
    const { settings, openSettings } = this.props

    openSettings(settings)
  }

  render() {
    const { portfolio, positions, watchlist, actions, settings } = this.props
    const { tab } = this.state

    if (!(Object.keys(portfolio).length > 0)) {
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
          <div onClick={this.onRefresh} className={classnames(styles.refresh, { [styles.reloading]: isReloading })} />
          <div onClick={this.onSettingsClick} className={styles.settings} />
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
          <StockList stocks={positions} viewBy={settings.viewChangeBy} />
        )}
        {tab === TABS.WATCHLIST && (
          <WatchList stocks={watchlist} viewBy={settings.viewChangeBy} />
        )}
      </div>
    )
  }
}
