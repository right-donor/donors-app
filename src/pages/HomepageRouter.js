import React from 'react'

/** Homepages */
import DonorHomepage from './donor/Homepage'
import DoctorHomepage from './doctor/Homepage'
import AssistantHomepage from './assistant/Homepage'
/** AWS Amplify Components */
import { API, graphqlOperation } from 'aws-amplify'
/** GraphQL */
import { getUser } from '../graphql/queries'
/** UI */
import { Loading, Button, Notification } from 'element-react'
import { updateUser } from '../graphql/mutations'

class HomepageRouter extends React.Component {

    state = {
        user: null,
        showUserTypeSelection: false
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.getUserFromDB()
        }
    }

    getUserFromDB = async () => {
        const user = await API.graphql(graphqlOperation(getUser,{id: this.props.user.username}))
        this.setState({user: user.data.getUser})
        try {
            this.setState({showUserTypeSelection: user.data.getUser.type === "unassigned"})
        } catch (err) {
            this.setState({showUserTypeSelection: true})
        } 
    }

    changeUserType = async type => {
        try {
            const input = {
                id : this.props.user.username,
                type
            }
            await API.graphql(graphqlOperation(updateUser,{input}))
            Notification({
                title: "Success!",
                message: "The user has now a type: "+type,
                type: "success"
            })
            this.setState({showUserTypeSelection: false})
        } catch (error) {
            Notification({
                title: "Error",
                message: "An error occured while trying to update user type",
                type: "error"
            })
        }
    }

    render() {
        const {user, showUserTypeSelection} = this.state
        return !user ? <Loading fullscreen={true}/> : (
            <>
            {showUserTypeSelection ? (
                <>
                <h1> Debug selection </h1>
                <p> Are you a doctor? <Button onClick={() => this.changeUserType("doctor")}> Yes </Button></p>
                <p> Are you a donor? <Button onClick={() => this.changeUserType("donor")}> Yes </Button></p>
                <p> Are you an assistant? <Button onClick={() => this.changeUserType("assistant")}> Yes </Button></p>
                </>
            ) : (
                <>
                {user.type === "doctor" && <DoctorHomepage user={this.props.user} userdb={user}/>}
                {user.type === "donor" &&  <DonorHomepage user={this.props.user} userdb={user}/>}
                {user.type === "assistant" &&  <AssistantHomepage user={this.props.user} userdb={user}/>}
                </>
            )}
            </>
        ) 
    }
}

export default HomepageRouter