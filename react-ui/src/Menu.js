import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

class Menu extends Component {
  toggleLogout = () => {
    this.props.logout()
  }

  render () {
    return (
      <Drawer>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <Divider />
        <MenuItem>My Account</MenuItem>
        <MenuItem onClick={this.toggleLogout}>Logout</MenuItem>
      </Drawer>
    )
  }
}

export default Menu
