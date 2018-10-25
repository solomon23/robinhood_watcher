// @flow
import React, { Component } from 'react'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import styles from './styles/Settings.scss'
import { VIEW_BY } from '../actions/settings'

type Props = {
  saveSettings: (UserSettings) => void,
  quit: () => void,
  logout: () => void,
  settings: UserSettings
}

type State = {
  updated: boolean,
  settings: UserSettings
}

export default class Settings extends Component<Props, State> {
  props: Props

  constructor(props: Props) {
    super(props)

    this.onSaveClick = this.onSaveClick.bind(this)
    this.onQuitClick = this.onQuitClick.bind(this)
    this.onLogoutClick = this.onLogoutClick.bind(this)
    this.onRefreshChange = this.onRefreshChange.bind(this)
    this.onViewByChange = this.onViewByChange.bind(this)

    this.state = {
      updated: false,
      settings: { ...props.settings },
    }
  }

  componentWillReceiveProps(next: Props) {
    const { updated } = this.state
    if (!updated) {
      this.setState({ settings: next.settings })
    }
  }

  /* :: onSaveClick: Function */
  onSaveClick() {
    const { saveSettings } = this.props
    const { settings } = this.state

    saveSettings({ ...settings })
  }

  /* :: onQuitClick: Function */
  onQuitClick() {
    const { quit } = this.props

    quit()
  }

  /* :: onLogoutClick: Function */
  onLogoutClick() {
    const { logout } = this.props

    logout()
  }

  /* :: onRefreshChange: Function */
  onRefreshChange(e: SyntheticInputEvent<HTMLInputElement>) {
    const { settings: currentSettings } = this.state
    const settings = { ...currentSettings, refreshInterval: parseInt(e.target.value) }
    this.setState({ settings })
  }

  /* :: onViewByChange: Function */
  onViewByChange(e: SyntheticInputEvent<HTMLInputElement>) {
    const { settings: currentSettings } = this.state
    const settings = { ...currentSettings, viewChangeBy: e.target.value }
    this.setState({ settings })
  }

  render() {
    const { settings } = this.state

    return (
      <div>
        <div className={styles.inputs}>
          <Select label="Refresh every..." onChange={this.onRefreshChange} value={settings.refreshInterval} className={styles.dropdown} >
            <Option value={1} label="1 Minute" />
            <Option value={2} label="2 Minutes" />
            <Option value={5} label="5 Minutes" />
            <Option value={10} label="10 Minutes" />
            <Option value={15} label="15 Minutes" />
          </Select>
          <Select label="View Change By" value={settings.viewChangeBy} onChange={this.onViewByChange} className={styles.dropdown}>
            <Option value={VIEW_BY.PERCENT} label="Percent Change" />
            <Option value={VIEW_BY.INDIVIDUAL} label="Individual Gain/Loss" />
            <Option value={VIEW_BY.TOTAL} label="Total Gain/Loss" />
          </Select>
          <Input label="Notify me if a prices moves by..." placeholder="2%" pattern="[0-9]" />
        </div>
        <div className={styles.buttons}>
          <div className={styles.submit}>
            <Button onClick={this.onSaveClick}>Submit</Button>
          </div>
          <div>
            <Button type="button" onClick={this.onLogoutClick}>Logout</Button>
          </div>
          <div>
            <Button type="button" onClick={this.onQuitClick}>Quit</Button>
          </div>
        </div>
    </div>
    )
  }
}
