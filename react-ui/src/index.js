import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
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

  }
})

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
)
