import * as userActions from './user'
import * as appActions from './app'

export function createRequestTypes(base) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function action(type, payload = {}) {
  return { type, ...payload }
}

export function createRequests(base) {
  return {
    request: o => action(base.REQUEST, o),
    success: o => action(base.SUCCESS, o),
    failure: o => action(base.FAILURE, o),
  }
}

export function doApiCall(options) {
  const defaults = {
    api: () => { },
    action: {},
    apiParams: {},
    guardFunc: () => true,
    postFunc: (dispatch, getState, response) => response,
  }
  const opts = { ...defaults, ...options }
  opts.action = Array.isArray(options.action) ? options.action : [options.action]

  return (dispatch, getState) => {
    // bail if we don't pass any rules sent in
    if (!opts.guardFunc(getState())) {
      return Promise.resolve()
    }

    const { user } = getState()
    if (!user.authenticated) {
      // bail
      return Promise.resolve()
    }

    const params = { ...opts.apiParams || {}, user }

    // mark the call as starting
    opts.action.map(act => dispatch(act.request({ request: params })))

    // call the api with the args
    return opts.api(params)
      .then(
        response => opts.postFunc(dispatch, getState, response)
      ).then((response) => {
        opts.action.map(act => dispatch(act.success({ request: params, response })))

        return response
      }, (error) => {
        opts.action.map(act => dispatch(act.failure({ request: params, response: error })))
        return Promise.reject(error)
      }).catch((error) => {
        if (error === 401) {
          // log the user out and stop refreshing the data since our auth token is no longer valid
          dispatch(userActions.logout())
          dispatch(appActions.stopRefresh())
        }
      })
  }
}
