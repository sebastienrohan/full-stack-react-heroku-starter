import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Base from './components/Base'
import HomePage from './components/HomePage'
import DashboardPage from './containers/DashboardPage'
import NotfoundPage from './components/NotfoundPage'
import SignupPage from './containers/SignupPage'
import LoginPage from './containers/LoginPage'
import LogoutPage from './containers/LogoutPage'
import Auth from './modules/Auth'

const App = () => (
  <div>
    <Base />
    <Switch>
      <Route exact path='/' children={() => {
        if (Auth.isUserAuthenticated()) {
          return <Redirect push to='/dashboard' />
        } else {
          return <Redirect push to='/homepage' />
        }
      }} />
      <Route path='/signup' component={SignupPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/logout' component={LogoutPage} />
      <Route path='/homepage' component={HomePage} />
      <Route path='/dashboard' component={DashboardPage} />
      <Route component={NotfoundPage} />
    </Switch>
  </div>
  )

export default App
