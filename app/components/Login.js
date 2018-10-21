// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './styles/Login.scss'

type Props = {
  user: User,
  login: (string, string, ?string) => null
}

type State = {
  token: string,
  username: string,
  password: string
}

export default class Login extends Component<Props, State> {
  props: Props

  constructor(props: Props) {
    super(props)

    this.onLogin = this.onLogin.bind(this)

    this.state = {
      token: '',
      username: '',
      password: '',
    }
  }

  /* :: onLogin: Function */
  onLogin() {
    const { login } = this.props
    const { username, password, token } = this.state

    login(username, password, token || null)
  }

  oChangeField(field: string, e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ [field]: e.target.value })
  }

  render() {
    const { user } = this.props
    const { username, token, password } = this.state

    return (
      <div className={classnames(styles.login, { [styles.loading]: user.isLoading })}>
        <input
          type="text"
          className={styles.input}
          placeholder="USERNAME"
          value={username}
          onChange={e => this.oChangeField('username', e)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={e => this.oChangeField('password', e)}
        />
        {(user.needsMfa || token) && (
          <input
            type="text"
            className={styles.input}
            placeholder="TOKEN"
            value={token}
            onChange={e => this.oChangeField('token', e)}
          />
        )}
        <button
          className={styles.btn}
          onClick={this.onLogin}
          type="button"
        >
          LOGIN
        </button>
      </div>
    )
  }
}
