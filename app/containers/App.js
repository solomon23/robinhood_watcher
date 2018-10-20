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

  componentDidMount() {
    const isChartView = window.isChartView
    const { user, tryAuth } = this.props

    if (!user.authenticated && !isChartView) {
      // try to authenticate them
      tryAuth()
    }
  }

  render() {
    const isChartView = window.isChartView
    const { children, user } = this.props

    if (isChartView) {
      console.log(queryString.parse(window.location.search))
      const symbols = queryString.parse(window.location.search).symbol
      return <React.Fragment><ChartPage symbol={symbols} /></React.Fragment>
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
