import React from 'react';

/** Fonts */
import 'typeface-roboto';

/** React Router */
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

/** AWS Amplify Components */
import { Hub, Auth, API, graphqlOperation } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'

/** GraphQL Operations */
import { getUser } from './graphql/queries'
import { createUser } from './graphql/mutations'

/** Components */
import Navbar from './components/Navbar'

/** Donor's pages */
import Homepage from "../src/pages/HomepageRouter"
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
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput))
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          phonenumber: signInData.signInUserSession.idToken.payload.phone_number,
          type: "donor"
        }
        const newUser = await API.graphql(graphqlOperation(createUser, { input: registerUserInput }))
        this.setState({ dbuser: newUser })
        this.createNewTokensWallet(signInData)
      } catch (err) {
        console.error("User Creation failed!", err)
      }
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
    const { user, userAttributes } = this.state
    return !user ? <Authenticator /> : (
      <UserContext.Provider value={{ user, userAttributes }}>
        <Router history={history}>
          <>
            {/** Always present Navigation Bar */}
            <Navbar user={user} handleSignout={this.handleSignOut} />
            {/** Application Routes */}
            <div className="app-container">
              <Route exact path="/" component={
                () => <Homepage user={user} />
              } />

              <Route path="/patient/:patientId" component={
                ({ match }) => <PatientPage user={user} patientId={match.params.patientId} />
              } />

              <Route path="/donations" component={
                () => <DonationsPage user={user}/>
              }/>

              <Route path="/donor/:donorId/:userId" component={
                ({match}) => <DonorPage userId={match.params.userId} donorId={match.params.donorId}/>
              }/>
            </div>
          </>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App;