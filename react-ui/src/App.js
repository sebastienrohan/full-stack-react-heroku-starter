import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Signupin from './Signupin'
import Dashboard from './Dashboard'
import './App.css'

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#555',
    alternateTextColor: '#1AA'
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false // to be determined by reading a cookie
    }
  }

  logout = () => {
    this.setState({logged: false})
  }

  login = () => {
    this.setState({logged: true})
  }

  render () {
    if (this.state.logged) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Dashboard logout={this.logout} />
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Signupin login={this.login} />
        </MuiThemeProvider>
      )
    }
  }
}

export default App
