import React from 'react'

/*** AWS Components */
import {API, graphqlOperation} from 'aws-amplify'
/** GraphQL Operations */
import { getUser } from '../../graphql/queries'
/** Element UI */
import { Loading } from 'element-react'
/** Manmade components */
import Avatar from '../../components/avatar'
import ListInterviews from "../../components/forms/assistant/ListInterview"

class DonorPage extends React.Component {

    state = {
        donor: null,
        userdb: null
    }

    componentDidMount = async () => {
        if(this.props.donorId && this.props.userId) {
            await this.getDonorInformation()
            await this.getAssistantInformation()
        }
    }

    getDonorInformation = async () => {
        const result = await API.graphql(graphqlOperation(getUser,{id: this.props.donorId}))
        this.setState({donor: result.data.getUser})
    }

    getAssistantInformation = async () => {
        const result = await API.graphql(graphqlOperation(getUser,{id: this.props.userId}))
        this.setState({userdb: result.data.getUser})
    }

    render () {
        const {donor,userdb} = this.state
        return (!donor && !userdb) ? <Loading fullscreen="true"/> : (
            <>
                <Avatar user={donor}/>
                <ListInterviews donor={donor} user={userdb}/>
            </>
        )
    }
}

export default DonorPage