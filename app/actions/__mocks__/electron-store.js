/* eslint-disable class-methods-use-this */

class MockStore {
  get() {
    return { token: 10, refresh_token: 11 }
  }

  set() {
    return null
  }
}

module.exports = MockStore
