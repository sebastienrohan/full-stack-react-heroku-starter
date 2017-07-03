import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

class Menu extends Component {
  render () {
    return (
      <Drawer>
        <Link to='/dashboard'><MenuItem>Dashboard</MenuItem></Link>
      </Drawer>
    )
  }
}

export default Menu
