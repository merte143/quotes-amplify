import * as React from 'react'
import { Component } from 'react'
import './AuthBar.css'
import { Button } from 'react-bootstrap'
import { Auth }from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default class AuthBar extends Component {

  render () {
    const { authState } = this.props
    console.log(Auth)
    if ( authState === 'signedIn' ) {
      return (
        <div className='auth-bar'>
          <Button bsStyle='info' onClick={ () => this.signMeOut() }>
            <FontAwesomeIcon icon={ faSignOutAlt } /> Logout
          </Button>
        </div>
      )
    } else {
      return null
    }
  }

  signMeOut() {
    const { unsetUser } = this.props
    Auth.signOut()
      .then(() => {
        unsetUser()
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

}