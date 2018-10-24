// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import queryString from 'query-string'
import * as UserActions from '../actions/user'
import * as SettingsActions from '../actions/settings'
import LoginPage from './LoginPage'
import ChartPage from './ChartPage'
import SettingsPage from './SettingsPage'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...UserActions, ...SettingsActions }, dispatch)
}

function mapStateToProps(state) {
  return { user: state.user }
}

type Props = {
  children: React.Node,
  user: User,
  tryAuth: () => void,
  loadSettings: () => void
}

class App extends React.Component<Props> {
  props: Props

  static chartingSymbol() {
    return queryString.parse(window.location.search).symbol
  }

  static isSettings() {
    return queryString.parse(window.location.search).settings === 'true'
  }

  componentDidMount() {
    const { user, tryAuth, loadSettings } = this.props

    if (!user.authenticated && !App.chartingSymbol() && !App.isSettings()) {
      // reload the settings
      loadSettings()

      // try to authenticate them
      tryAuth()
    }
  }

  render() {
    const symbol = App.chartingSymbol()
    const isSettings = App.isSettings()
    const { children, user } = this.props

    if (symbol) {
      return <React.Fragment><ChartPage symbol={symbol} /></React.Fragment>
    }

    if (isSettings) {
      return <React.Fragment><SettingsPage /></React.Fragment>
    }

    if (!user.authenticated) {
      return <React.Fragment><LoginPage /></React.Fragment>
    }

    return <React.Fragment>{children}</React.Fragment>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
