import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getDonation } from '../graphql/queries'
import {Loading} from 'element-react'

class Tracker extends React.Component {
    state = {
        isLoading: true,
        donation: {}
    }

    componentDidMount = () => {
        if(this.props.donationId) {
            this.handleGetDonation(this.props.donationId)
        }        
    }

    handleGetDonation = async donationId => {
        try{
            const donation = await API.graphql(graphqlOperation(getDonation,{id: donationId}))
            this.setState({donation: donation.data.getDonation, isLoading: false}) 
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        const {donation} = this.state
        return this.state.isLoading ? <Loading fullscreen={true}/> : (
            <>
                <h1> ID: {donation.id} </h1>
                <p> Date Needed: {donation.dateNeeded} </p>
            </>
        )
    }
}

export default Tracker