import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class Signupin extends Component {

  toggleLogin = () => {
    this.props.login()
  }

  render () {
    return (
      <div>
        <h2>Sign up / Log in</h2>
        <RaisedButton label='Sign up' />
        <RaisedButton label='Log in' onClick={this.toggleLogin} />
        {this.props.test}
      </div>
    )
  }
}

export default Signupin
