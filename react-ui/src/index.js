import React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'
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

render(
  <App />,
  document.getElementById('root')
)
