import React from 'react';

/** React Router */
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

/** AWS Amplify Components */
import { Hub, Auth, API, graphqlOperation } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'

/** Context elements */
export const UserContext = React.createContext()
export const history = createBrowserHistory()

class App extends React.Component {
  state = {
    user: null,
    userAttributes: null
  }

  componentDidMount = () => {
    this.getUserData()
    Hub.listen('auth', this, 'onHubCapsule')
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({ user }, () => this.getUserAttributes(this.state.user)) : this.setState({ user: null })
  }

  getUserAttributes = async authUserData => {
    const attributesArr = await Auth.userAttributes(authUserData)
    const attributesObj = Auth.attributesToObject(attributesArr)
    this.setState({ userAttributes: attributesObj })
  }

  handleSignOut = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      alert("An error has occured while trying to sign out")
    }
  }

  onHubCapsule = async (capsule) => {
    switch (capsule.payload.event) {
      case 'signIn':
        console.log('The user signed in')
        break
      case 'signUp':
        console.log('An user signed up')
        break
      case 'signOut':
        console.log('The user signed out')
        break
      case 'signIn_failure':
        console.log('The user failed to sign in')
        break
      default:
        console.log(capsule.payload.event)
    }
  }

  render() {
    const {user, userAttributes} = this.state
    return !user ? <Authenticator/> : (
      <UserContext.Provider value={{user, userAttributes}}>
        <Router history={history}>
          <>
            {/** Navigation Bar */}
            
          </>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App;