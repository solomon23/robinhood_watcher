// @flow
import type { GetState, Dispatch } from '../reducers/types'
import * as API from '../services/api'
import { createRequests, doApiCall, createRequestTypes } from './actionHelper'

export const START_REFRESH_TIMER = 'START_REFRESH_TIMER'
export const STOP_REFRESH_TIMER = 'STOP_REFRESH_TIMER'

export const GET_ACCOUNT_NUMBER = createRequestTypes('GET_ACCOUNT_NUMBER')
export const getAccountNumberActions = createRequests(GET_ACCOUNT_NUMBER)

export const GET_PORTFOLIO = createRequestTypes('GET_PORTFOLIO')
export const getPortfolioActions = createRequests(GET_PORTFOLIO)

export const GET_ACCOUNT_POSITIONS = createRequestTypes('GET_ACCOUNT_POSITIONS')
export const getAccountPositionsActions = createRequests(GET_ACCOUNT_POSITIONS)

export function startRefreshTimer() {
  return { type: START_REFRESH_TIMER }
}

export function stopRefresh() {
  return { type: STOP_REFRESH_TIMER }
}

export function getAccount() {
  return doApiCall({
    api: API.getAccountNumber,
    action: getAccountNumberActions,
    guardFunc: (state) => {
      const { user } = state
      return !user.accountNumber
    },
  })
}

export function getPortfolio() {
  return doApiCall({
    api: API.getPortfolio,
    action: getPortfolioActions,
  })
}

export function getAccountPositions() {
  return doApiCall({
    api: API.getAccountPositions,
    action: getAccountPositionsActions,
  })
}

export function getAllData() {
  return async function getAllCallback(dispatch: Dispatch, getState: GetState) {
    // (async () => {
      const { user } = getState()

      // bail if the user isn't logged in
      if (!user.authenticated) {
        return
      }

      if (!user.accountNumber) {
        await getAccount()(dispatch, getState)
      }

      // const positions = await API.getAccountPositions(user)
      await getPortfolio()(dispatch, getState)
      await getAccountPositions()(dispatch, getState)
    // })()
  }
}
