import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import UserInfo from './UserInfo'

const Dashboard = ({ userList, showUserInfo }) => (
  <Card className='container'>
    <CardTitle
      title='Dashboard'
      subtitle='You should get access to this page only after authentication.'
    />
    {userList && <CardText style={{ fontSize: '16px', color: 'green' }}>
      {userList.map(user =>
        <p key={user._id}>
          <a href='#' onClick={() => showUserInfo(user._id)}>{user.name} </a>
          {user.shown && <UserInfo user={user} />}
        </p>
      )}
    </CardText>}
  </Card>
)

Dashboard.propTypes = {
  userList: PropTypes.array.isRequired,
  showUserInfo: PropTypes.func.isRequired
}

export default Dashboard
