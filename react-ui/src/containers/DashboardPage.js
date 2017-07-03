import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import Dashboard from '../components/Dashboard'
import Auth from '../modules/Auth'

class DashboardPage extends Component {
  constructor (context) {
    super(context)
    this.state = {
      userList: []
    }
    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.showUserInfo = this.showUserInfo.bind(this)
  }

  showUserInfo (userId) {
    let updatedUserList = this.state.userList
    for (let i = 0; i < updatedUserList.length; i++) {
      if (updatedUserList[i]._id === userId) {
        updatedUserList[i].shown = !updatedUserList[i].shown
      }
    }
    this.setState({
      userList: updatedUserList
    })
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
          userList: xhr.response.users
        })
      }
    })
    xhr.send()
  }

  render () {
    return (
      <div>
        <Menu />
        <Dashboard
          userList={this.state.userList}
          showUserInfo={this.showUserInfo}
          clicked={this.state.clicked}
        />
      </div>
    )
  }
}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default DashboardPage
