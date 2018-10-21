// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import * as UserActions from '../actions/user'

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
