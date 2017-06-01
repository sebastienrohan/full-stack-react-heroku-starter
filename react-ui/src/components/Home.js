import React, { Component } from 'react'
import Menu from './Menu'

class Home extends Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <Menu />
        <h2>
          Home page
        </h2>
      </div>
    )
  }
}

export default Home
