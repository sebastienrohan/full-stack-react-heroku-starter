import React, { Component } from 'react'
import Menu from './Menu'
import Container from './Container'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Menu logout={this.props.logout} />
        <Container name={this.props.name} />
      </div>
    )
  }
}

export default Dashboard
