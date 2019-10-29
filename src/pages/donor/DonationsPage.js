import React from 'react'

/** Amplify Components */
import { API, graphqlOperation } from 'aws-amplify'

/** GraphQL Operations */
import { getUser, listDonations } from '../../graphql/queries'
import { Loading } from 'element-react'
import DonationItem from '../../components/DonationItem'

class DonationsPage extends React.Component {

    state = {
        user: null,
        availableDonations: null
    }

    componentDidMount = async () => {
        if (this.props.user) {
            await this.getUserFromGraphQL(this.props.user.attributes.sub)
            await this.listPossibleDonations()
        }
    }

    getUserFromGraphQL = async userId => {
        const result = await API.graphql(graphqlOperation(getUser, { id: userId }))
        this.setState({ user: result.data.getUser })
    }

    listPossibleDonations = async () => {
        if (this.state.user) {
            /** Get user from state */
            const { user } = this.state
            /** Get all listings */
            let donationListing = await API.graphql(graphqlOperation(listDonations))
            /** Get user blood type */
            const userBT = user.blood.type + user.blood.rh
            /** Only show donations with no assigned donor */
            donationListing.data.listDonations.items.filter(function(donation) {
                return donation.assignedTo !== null
            })
            /** Only show blood compatible donation listings */
            switch (userBT) {
                case 'A+':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'AB', rh: '+' }
                    })
                    break
                case 'O+':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'A', rh: '+' }
                            || user.blood === { type: 'B', rh: '+' }
                            || user.blood === { type: 'AB', rh: '+' }
                    })
                    break
                case 'B+':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'AB', rh: '+' }
                    })
                    break
                case 'AB+':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                    })
                    break
                case 'A-':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'A', rh: '+' }
                            || user.blood === { type: 'AB', rh: '+' }
                            || user.blood === { type: 'A', rh: '-' }
                    })

                    break
                case 'B-':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'B', rh: '+' }
                            || user.blood === { type: 'AB', rh: '+' }
                            || user.blood === { type: 'AB', rh: '-' }
                    })
                    break
                case 'AB-':
                    donationListing.data.listDonations.items.filter(function (donation) {
                        return donation.bloodType === user.blood
                            || user.blood === { type: 'AB', rh: '+' }
                    })
                    break
                case 'O-': default:
                    break
            }
            this.setState({availableDonations: donationListing.data.listDonations})
        }
    }

    render() {
        return !this.state.user && !this.state.availableDonations ? <Loading /> : (
            <>
                <h1> Your donations </h1>
                {/** Personal Donations */}
                {this.state.user.donations.items.length !== 0 ?
                    <>
                        {this.state.user.donations.items.map(donation => (
                            <DonationItem donation={donation} />
                        ))}
                    </> : <h2> No donations have been performed </h2>}
                {/** All other donations */}
                {this.state.availableDonations !== null ?
                    <>
                        <h3> Donations Available </h3>
                        {this.state.availableDonations.items.map(donation => (
                            <DonationItem donation={donation}/>
                        ))}
                    </> : 
                    <>
                        <h3> There are no donations available to select right now</h3>
                    </>
                }
            </>
        )
    }
}

export default DonationsPage