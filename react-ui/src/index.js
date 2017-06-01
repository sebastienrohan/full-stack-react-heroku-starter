import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import './index.css'

// better performance for font loading
WebFont.load({
  google: {
    families: ['Roboto']
  }
})

// needed for onTouchTap : http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// customize theme
const muiTheme = getMuiTheme({
  palette: {
    textColor: '#555',
    alternateTextColor: '#1AA'
  }
})

render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
