import React from 'react'

/** Amplify Libraries */
import { API, graphqlOperation } from 'aws-amplify'

/** API and GraphQL Calls */
import { getUser } from '../../graphql/queries'

/** Components */
import ExplorationForm from '../../components/forms/donor/exploration'
import Avatar from '../../components/avatar'
/** Material UI Components */
import { Grid, Paper } from '@material-ui/core'

/**
 * Main Donor Dashboard
 * Must include all basic data from the user
 */
class Homepage extends React.Component {
    state = {
        user: null,
        userdb: null,
        showInitialForm: false
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.setState({ user: this.props.user })
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
            showInitialForm: userdb.data.getUser.canDonateFrom === null ? true : false
        })
    }

    refreshUserData = () => {
        this.retrieveUserFromDB(this.props.user.username)
    }


    render() {
        const { userdb } = this.state
        return (
            <>
                {this.state.showInitialForm ? <ExplorationForm refresh={this.refreshUserData} user={userdb} /> :
                    <Grid container spacing={3} direction="column" justiy="center" alignItems="center">
                        <Grid item xs={12}>
                            {this.state.userdb && (
                                <Avatar user={this.state.userdb} />
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Paper> Tokens Dash </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper> Blood Dash </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper> Basic info </Paper>
                        </Grid>
                    </Grid>
                }
            </>
        )
    }
}

export default Homepage