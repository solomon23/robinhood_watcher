const tryAuthFunction = jest.fn()

export function tryAuth() {
  return tryAuthFunction
}

export default {
  tryAuth,
}
