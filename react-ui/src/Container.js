import React, { Component } from 'react'

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      name: '',
      fetching: false
    }
  }

  componentDidMount () {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        this.setState({
          message: json.message,
          name: json.name,
          fetching: false
        })
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        })
      })
  }

  render () {
    return (
      <div className='App'>
        <p className='App-intro'>
        <h2>
          This is the dashboard
        </h2>
        </p>
        <p>
          Message from server: {this.state.message}
        </p>
        <p className='App-intro'>
          Hello {this.state.name} !
        </p>
      </div>
    )
  }
}

export default Container
