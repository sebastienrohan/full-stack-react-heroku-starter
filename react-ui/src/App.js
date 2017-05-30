import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import logo from './logo.svg'
import './App.css'

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#FFF',
    alternateTextColor: '#F00'
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      fetching: true
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h2>Welcome to React Starter</h2>
          </div>
          <p className='App-intro'>
            {'This is '}
            <a href='https://github.com/mars/heroku-cra-node'>
              {'create-react-app with a custom Node/Express server'}
            </a><br />
          </p>
          <p className='App-intro'>
            {this.state.fetching
              ? 'Fetching message from API'
              : this.state.message}
          </p>
          <RaisedButton label='Halt' />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
