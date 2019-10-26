import React from 'react'

/** Amplify Libraries */
import {API, graphqlOperation} from 'aws-amplify'

/** API and GraphQL Calls */
import {getUser} from '../../graphql/queries'

/** Components */
import ExplorationForm from '../../components/forms/donor/exploration'

class Homepage extends React.Component {
    state = {
        user: null,
        userdb: null,
        showInitialForm: false
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.setState({user: this.props.user})
        }
        this.retrieveUserFromDB(this.props.user.username)
    }

    retrieveUserFromDB = async (id) => {
        const qparams = {
            id
        }
        const userdb = await API.graphql(graphqlOperation(getUser, qparams))
        this.setState({ 
            userdb: userdb.data.getUser, 
            showInitialForm: userdb.data.getUser.canDonateFrom === null ? true : false })
    }

    refreshUserData = () => {
        this.retrieveUserFromDB(this.props.user.username)
    }

    render() {
        const {userdb} = this.state
        return (
            <>
            {this.state.showInitialForm && <ExplorationForm refresh={this.refreshUserData} user={userdb}/>}
            </>
        )
    }
}

export default Homepage