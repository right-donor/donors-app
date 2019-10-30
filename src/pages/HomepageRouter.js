import React from 'react'

/** Homepages */
import DonorHomepage from './donor/Homepage'
import DoctorHomepage from './doctor/Homepage'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { Loading } from 'element-react'

class HomepageRouter extends React.Component {

    state = {
        user: null
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.getUserFromDB()
        }
    }

    getUserFromDB = async () => {
        const user = await API.graphql(graphqlOperation(getUser,{id: this.props.user.username}))
        this.setState({user: user.data.getUser})
    }

    render() {
        const {user} = this.state
        return !user ? <Loading fullscreen={true}/> : (
            <>
            {user.type === "doctor" && <DoctorHomepage user={this.props.user} userdb={user}/>}
            {user.type === "donor" &&  <DonorHomepage user={this.props.user} userdb={user}/>}
            </>
        ) 
    }
}

export default HomepageRouter