import React from 'react'
/** AWS Amplify Components */
import { API, graphqlOperation } from 'aws-amplify'
/** GraphQL Queries */
import { getDonation } from '../graphql/queries'
/** UI Elements */
import { Loading, Card, Notification } from 'element-react'
/** Connection to outer API */
import axios from 'axios'

class Tracker extends React.Component {
    state = {
        isLoading: true,
        donation: {},
        bagHistory: null
    }

    componentDidMount = async () => {
        if (this.props.donationId) {
            await this.handleGetDonation(this.props.donationId)
        }
    }

    handleGetDonation = async donationId => {
        try {
            const donation = await API.graphql(graphqlOperation(getDonation, { id: donationId }))
            this.setState({ donation: donation.data.getDonation, isLoading: false })
            // this.setState({ donation: {
            //     "id":"123",
            //     "donatedBy":{
            //         "id":"daf"
            //         },
            //     "bloodBagId":"blood123",
            //     "hospital":{
            //         "name":"angeles",
            //         "address_line1":"por ahi"
            //     }
            // }, isLoading: false })
            await this.handleGetBagHistory()
        } catch (error) {
            console.error(error)
        }
    }

    handleGetBagHistory = async () => {
        if (this.state.donation) {
            console.log(this.state.donation)
            axios.get('http://3.222.166.83/blood/history/'
                + this.state.donation.bloodBagId + '/'
                + 'user1')
                .then((res) => {
                    this.setState({ bagHistory: res.data })
                })
                .catch((error) => {
                    Notification({
                        title: "Error",
                        message: "An error occured while getting bag history",
                        type: "error"
                    })
                })
        }
    }

    render() {
        const { donation } = this.state
        return this.state.isLoading ? <Loading fullscreen={true} /> : (
            <>
                <h1> ID: {donation.id} </h1>
                <p> Date Needed: {donation.dateNeeded} </p>
                {donation.dateFulfilled && <p> Date fulfilled: {donation.dateFulfilled}</p>}
                {!donation.donatedBy && (
                    <Card bodyStyle={{
                        padding: "0.7em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <h3> Donation pending </h3>
                        <p>Donation is waiting to be assigned...</p>
                    </Card>
                )}
                {donation.donatedBy && (
                    <Card bodyStyle={{
                        padding: "0.7em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <h3> Donation assigned </h3>
                        <p>Donation assigned to: {donation.donatedBy.firstname} {donation.donatedBy.lastname} (ID: {donation.donatedBy.id})</p>
                    </Card>
                )}
                {donation.bloodBagId && (
                    <Card bodyStyle={{
                        padding: "0.7em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <h3> Blood was donated </h3>
                        <p>Blood Bag Id: {donation.bloodBagId}</p>
                    </Card>
                )}
                {this.state.bagHistory && (
                    <>
                        {this.state.bagHistory.map(bag => (
                            <Card bodyStyle={{
                                padding: "0.7em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <p> TxId: {bag.TxId} </p>
                                <p> Location ID: {bag.Value.location} </p>
                                <p> Status: {bag.Value.status} </p>
                            </Card>
                        ))} 
                    </>
                )}
            </>
        )
    }
}

export default Tracker