// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import queryString from 'query-string'
import * as UserActions from '../actions/user'
import LoginPage from './LoginPage'
import ChartPage from './ChartPage'

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

function mapStateToProps(state) {
  return { user: state.user }
}

type Props = {
  children: React.Node,
  user: object,
  tryAuth: () => void
}

class App extends React.Component<Props> {
  props: Props

  static chartingSymbol() {
    return queryString.parse(window.location.search).symbol
  }

  componentDidMount() {
    const { user, tryAuth } = this.props

    if (!user.authenticated && !App.chartingSymbol()) {
      // try to authenticate them
      tryAuth()
    }
  }

  render() {
    const symbol = App.chartingSymbol()
    const { children, user } = this.props

    if (symbol) {
      return <React.Fragment><ChartPage symbol={symbol} /></React.Fragment>
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
