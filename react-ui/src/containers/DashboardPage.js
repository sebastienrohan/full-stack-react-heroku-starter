import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import Dashboard from '../components/Dashboard'
import Auth from '../modules/Auth'

class DashboardPage extends Component {
  constructor (context) {
    super(context)
    this.state = { secretData: [] }
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  redirectToLogin () {
    // redirect unauthorized user to /login
    this.context.router.history.replace('/login')
  }

  componentWillMount () {
    if (!Auth.isUserAuthenticated()) {
      this.redirectToLogin()
    }
  }

  componentDidMount () {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/api/dashboard')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        })
      }
    })
    xhr.send()
  }

  render () {
    return (
      <div>
        <Menu />
        <Dashboard secretData={this.state.secretData} />
      </div>
    )
  }
}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default DashboardPage
