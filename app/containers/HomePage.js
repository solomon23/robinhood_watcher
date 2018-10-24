// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/Home'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  return {
    portfolio: state.app.portfolio,
    positions: state.app.positions,
    watchlist: state.app.watchlist,
    actions: state.app.actions,
    settings: state.settings,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...UserActions, ...AppActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
