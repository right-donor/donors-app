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
        donor: null
    }

    componentDidMount = () => {
        if(this.props.donorId) {
            this.getDonorInformation()
        }
    }

    getDonorInformation = async () => {
        const result = await API.graphql(graphqlOperation(getUser,{id: this.props.donorId}))
        this.setState({donor: result.data.getUser})
    }

    render () {
        const {donor} = this.state
        return !donor ? <Loading fullscreen="true"/> : (
            <>
                <Avatar user={donor}/>
                <ListInterviews donor={donor}/>
            </>
        )
    }
}

export default DonorPage