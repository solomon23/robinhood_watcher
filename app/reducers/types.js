import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'

export type Action = {
  +type: string,
  response: any,
  message?: string
}

export type GetState = () => counterStateType

export type Dispatch = ReduxDispatch<Action>

export type Store = ReduxStore<GetState, Action>

export type User = {
  isLoading: boolean,
  isError: boolean,
  errorReason: ?string,
  needsMfa: boolean,
  authenticated: boolean,
  accountNumber: ?string
}

export type Portfolio = {
  extended_hours_equity: string,
  equity: string,
  adjusted_equity_previous_close: string
}

export type Position = {
}

export type AppActions = {
  portfolioLoading: boolean,
  positionsLoading: boolean,
  watchlistLoading: boolean
}

export type WatchStock = {
  last_extended_hours_trade_price: ?number,
  last_trade_price: number,
  previous_close: number,
  symbol: string
}

export type Stock = {
  symbol: string,
  quote: Quote,
  quantity: number
}

export type Quote = {
  last_extended_hours_trade_price: number,
  quantity: number,
  last_trade_price: number,
  previous_close: number
}
