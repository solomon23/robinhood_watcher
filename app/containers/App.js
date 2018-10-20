// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../actions/user'
import LoginPage from './LoginPage'

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
    const { user, tryAuth } = this.props

    if (!user.authenticated) {
      // try to authenticate them
      tryAuth()
    }
  }

  render() {
    const { children, user } = this.props

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
