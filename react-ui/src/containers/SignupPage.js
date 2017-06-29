import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignupForm from '../components/SignupForm.js'

class SignupPage extends Component {

  constructor (props, context) {
    super(props, context)

    // set the initial component state
    this.state = {
      errors: {
        message: ''
      },
      user: {
        email: '',
        name: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  changeUser (event) {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value

    this.setState({
      user
    })
  }

  processForm (event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    function validateEmail (email) {
      var re = /\S+@\S+\.\S+/
      return re.test(email)
    }

    if (!this.state.user.email || !validateEmail(this.state.user.email) || !this.state.user.name || !this.state.user.password) {
      const errors = {
        summary: 'All fields required, please try again'
      }
      this.setState({
        errors
      })
      return false
    } else {
      // create a string for an HTTP body message
      const name = encodeURIComponent(this.state.user.name)
      const email = encodeURIComponent(this.state.user.email)
      const password = encodeURIComponent(this.state.user.password)
      const formData = `name=${name}&email=${email}&password=${password}`

      // create an AJAX request
      const xhr = new XMLHttpRequest()
      xhr.open('post', '/auth/signup')
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.responseType = 'json'
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
           // success
           // change the component-container state
          this.setState({
            errors: {}
          })
          // set a message
          localStorage.setItem('successMessage', xhr.response.message)
          // make a redirect
          this.context.router.history.replace('/login')
        } else {
       // failure
          const errors = xhr.response.errors ? xhr.response.errors : {}
          errors.summary = xhr.response.message
          this.setState({
            errors
          })
        }
      })
      xhr.send(formData)
    }
  }

  render () {
    return (
      <SignupForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    )
  }

}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupPage
