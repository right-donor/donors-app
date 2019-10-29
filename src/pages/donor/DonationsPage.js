import React from 'react'

/** Amplify Components */
import {API, graphqlOperation} from 'aws-amplify'

/** GraphQL Operations */
import {getUser} from '../../graphql/queries'
import { Loading } from 'element-react'

class DonationsPage extends React.Component {

    state = {
        user: null
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.getUserFromGraphQL(this.props.user.attributes.sub)
        }
    }

    getUserFromGraphQL = async userId => {
        const result = await API.graphql(graphqlOperation(getUser,{id: userId}))
        this.setState({user: result.data.getUser})
    }

    render() {
        return !this.state.user ? <Loading/> : (
            <h1> Donations page {this.state.user.id} </h1> 
        )
    }
}

export default DonationsPage