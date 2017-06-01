import React, { Component } from 'react'
import Menu from './Menu'
import getUserData from '../utils/api'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = { users: [] }
  }

  getUserData () {
    getUserData().then((users) => {
      this.setState({ users })
    })
  }

  componentDidMount () {
    this.getUserData()
  }

  render () {
    const { users } = this.state

    return (
      <div style={{textAlign: 'center'}}>
        <Menu />
        <h2 style={{marginBottom: '64px'}}>
          This is the Dashboard
        </h2>
        <h3 style={{marginBottom: '48px'}}>
          User list:
        </h3>
        { users.map((user, index) => (
          <div key={index}>
            <h4>{user.name}</h4>
            <p>{user.have}</p>
            <p>{user.want}</p>
          </div>
        )) }
      </div>
    )
  }
}

export default Dashboard
