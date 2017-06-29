import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const SignupForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Card className='container'>
    <form action='/' onSubmit={onSubmit}>
      <h2 className='card-heading'>Sign up</h2>

      {errors.summary && <p className='error-message'>{errors.summary}</p>}

      <div className='field-line'>
        <TextField
          floatingLabelText='Name'
          name='name'
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className='field-line'>
        <TextField
          floatingLabelText='Email'
          name='email'
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'
        />
      </div>

      <div className='field-line'>
        <TextField
          floatingLabelText='Password'
          type='password'
          name='password'
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className='button-line'>
        <RaisedButton type='submit' label='Create New Account' primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
)

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default SignupForm
