import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actions from '../app'

const mockStore = configureMockStore([thunk])

describe('app actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should fire refresh timer', () => {
    expect(actions.startRefreshTimer()).toMatchSnapshot()
  })

  it('should fire stop timer', () => {
    expect(actions.stopRefresh()).toMatchSnapshot()
  })

  it('should fire getAccount', () => {
    fetchMock.mock('https://api.robinhood.com/accounts/',
      { body: { results: [{ account_number: 10 }] } }
    )
    const store = mockStore({ user: { authenticated: true, accountNumber: null } })

    return store.dispatch(actions.getAccount())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })

  it('should fire getPortfolio', () => {
    fetchMock.mock('https://api.robinhood.com/accounts/10/portfolio/',
      { body: { results: [{ portfolios: [] }] } }
    )
    const store = mockStore({ user: { authenticated: true, accountNumber: '10' } })

    return store.dispatch(actions.getPortfolio())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })

  it('should fire getAllData', () => {
    fetchMock.mock('https://api.robinhood.com/accounts/10/portfolio/',
      { body: { results: [] } }
    )
    fetchMock.mock('https://api.robinhood.com/accounts/10/positions/',
      { body: { results: [{ average_buy_price: 10, quantity: 1, instrument: 'https://instrument' }] } }
    )

    fetchMock.mock('https://instrument',
      { body: { quote: 'https://quote', symbol: 'a', name: 'name' } }
    )

    fetchMock.mock('https://quote',
      { body: { last_traded_price: 2 } }
    )

    const store = mockStore({ user: { authenticated: true, accountNumber: '10' } })

    return store.dispatch(actions.getAllData())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })
})
