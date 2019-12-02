import React from 'react';

/** Fonts */
import 'typeface-roboto';

/** Styles */
import './assets/scss/material-kit-pro-react.scss?v=1.8.0'

/** Redux imports */
import { connect } from 'react-redux';
import { logout } from './actions';

/** React Router */
import { Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

/** AWS Amplify Components */
import { Hub, Auth, API, graphqlOperation } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'
import AmplifyTheme from './assets/jss/AmplifyAuthTheme'

/** GraphQL Operations */
import { getUser } from './graphql/queries'
import { createUser } from './graphql/mutations'

/** Donor's pages */
//import Homepage from './pages/doctor/Homepage.jsx'

import Homepage from "../src/pages/Homepage"
//import Homepage from "./pages/assistant/ListInterview" //"../src/pages/Homepage"
import PatientPage from './pages/doctor/PatientPage'
import DonationsPage from './pages/donor/DonationsPage'
import DonorPage from './pages/assistant/DonorPage'

/** External APIs */
import axios from 'axios'
import { Notification } from 'element-react';

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
    dbuser: null,
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
   * Creates a new user on the schema once it's signed up
   */
  registerNewUser = async signInData => {
    console.log(signInData)
    const getUserInput = {
      id: signInData.attributes.sub
    }
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput))
    console.log(data)
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.attributes.email,
          email: signInData.attributes.email,
          phonenumber: "unassigned",
          type: "donor"
        }
        const newUser = await API.graphql(graphqlOperation(createUser, { input: registerUserInput }))
        this.setState({ dbuser: newUser })
        this.createNewTokensWallet(signInData)
      } catch (err) {
        console.error("User Creation failed!", err)
      }
    } else {
      this.setState({ dbuser: data.getUser })
    }
  }

  createNewTokensWallet = async signInData => {
    axios.post('http://3.222.166.83/rewards/create/'
      + signInData.signInUserSession.idToken.payload.sub + '/'
      + 'user1')
      .then((res) => {
        Notification({
          title: "Success",
          message: "Created your rewards account",
          type: "success"
        })
      })
      .catch((error) => {
        Notification({
          title: "Error",
          message: "An error happened while creating your wallet",
          type: "error"
        })
      })
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
        this.props.logout()
        this.setState({ user: null })
        break
      case 'signIn_failure':
        console.log('The user failed to sign in')
        break
      default:
        console.log(capsule.payload.event)
    }
  }

  render() {
    const { match } = this.props
    const { user, userAttributes, dbuser } = this.state
    return !user ? <Authenticator theme={AmplifyTheme} usernameAttributes='email' signUpConfig={{ hiddenDefaults: 'phone_numbers' }} /> : (
      <UserContext.Provider value={{ user, userAttributes }}>
        <>
          {/** Always present Navigation Bar */}
          {/** <Navbar user={user} handleSignout={this.handleSignOut} /> */}
          {/** Application Routes */}
          <div className="app-container">
            <Route exact path={match.path} render={
              () => <Homepage userC={user} userDB={dbuser} />
            } />

          </div>
        </>
      </UserContext.Provider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
      dispatch(logout());
  }
});

export default connect(null, mapDispatchToProps)(App);