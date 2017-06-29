import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Auth from '../modules/Auth'

class LogoutPage extends Component {

  constructor (props, context) {
    super(props, context)
    this.logout = this.logout.bind(this)
  }

  logout () {
    Auth.deauthenticateUser()
    this.context.router.history.replace('/')
  }

  componentWillMount () {
    this.logout()
  }

  render () {
    return (
      <div />
    )
  }
}

LogoutPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default LogoutPage
