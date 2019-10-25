import React from 'react';

/** React Router */
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

/** AWS Amplify Components */
import { Hub, Auth, API, graphqlOperation } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'

/** GraphQL Operations */
import {getUser} from './graphql/queries'
import {createUser} from './graphql/mutations'
/** Components */

/** Context elements */
export const UserContext = React.createContext()
export const history = createBrowserHistory()

// ___  _      __   __  ___                    
// / _ \(_)__ _/ /  / /_/ _ \___  ___  ___  ____
// / , _/ / _ `/ _ \/ __/ // / _ \/ _ \/ _ \/ __/
// /_/|_/_/\_, /_//_/\__/____/\___/_//_/\___/_/   
//      /___/                                   
class App extends React.Component {
  state = {
    user: null,
    userAttributes: null
  }

  /**
   * Once the component starts, setup the Hub
   */
  componentDidMount = () => {
    this.getUserData()
    Hub.listen('auth', this, 'onHubCapsule')
  }

  /**
   * Retrieves user's data from the Authentication component
   */
  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({ user }, () => this.getUserAttributes(this.state.user)) : this.setState({ user: null })
  }

  /**
   * Retrieves the most current attributes from an user
   */
  getUserAttributes = async authUserData => {
    const attributesArr = await Auth.userAttributes(authUserData)
    const attributesObj = Auth.attributesToObject(attributesArr)
    this.setState({ userAttributes: attributesObj })
  }

  /**
   * Handles Sign-out Manually from the Auth component
   */
  handleSignOut = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      alert("An error has occured while trying to sign out")
    }
  }

  /**
   * Creates a new user on the schema once it's signed up
   */
  registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    }
    const {data} = await API.graphql(graphqlOperation(getUser, getUserInput))
    if(!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true,
          type: "donor"
        }
        const newUser = await API.graphql(graphqlOperation(createUser, {input: registerUserInput}))
        console.log({newUser})
      } catch (err) {
        console.error("User Creation failed!",err)
      }
    }
  }

  /**
   * Captures User's Authentication status
   */
  onHubCapsule = async (capsule) => {
    switch (capsule.payload.event) {
      case 'signIn':
        console.log('The user signed in')
        this.getUserData()
        this.registerNewUser(capsule.payload.data)
        break
      case 'signUp':
        console.log('An user signed up')
        break
      case 'signOut':
        console.log('The user signed out')
        this.setState({ user: null})
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
            <Route exact path="/" component={
              () => <h1> Worked? </h1>
            }/>
          </>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App;