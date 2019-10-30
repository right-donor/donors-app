import React from 'react'

/** Amplify Components */
import { API, graphqlOperation } from 'aws-amplify'

/** GraphQL Operations */
import { Loading } from 'element-react'
import DonationItem from '../../components/DonationItem'

const getUser = `query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        items {
          id
          dateNeeded
          dateFulfilled
          bloodBagId
          bagAmount
          donatedBy {
              id
          }
          hospital {
              name
              address_line1
          }
        }
        nextToken
      }
      patients {
        items {
          id
          firstname
          lastname
          birthday
          gender
        }
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
        bloodresults {
          vih
          hepatitisB
          hepatitisC
          syphilis
          chagas
        }
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
        doctors {
          nextToken
        }
        patients {
          nextToken
        }
        donations {
          nextToken
        }
      }
    }
  }
  `;

const listDonations = `query ListDonations(
    $filter: ModelDonationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateNeeded
        dateFulfilled
        donatedBy {
          id
          firstname
          lastname
          birthday
          username
          email
          gender
          phonenumber
          type
          city
          canDonateFrom
        }
        assignedTo {
          id
          firstname
          lastname
          birthday
          gender
          blood {
              type
              rh
          }
        }
        bloodBagId
        bloodType {
          type
          rh
        }
        bagAmount
        hospital {
          id
          name
          country
          address_line1
          address_state
          address_zip
        }
      }
      nextToken
    }
  }
  `

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
            var donationListing = await API.graphql(graphqlOperation(listDonations))
            /** Get user blood type */
            const userBT = user.blood.type + user.blood.rh
            /** Only show donations with no assigned donor */
            donationListing = donationListing.data.listDonations.items.filter(function (donation) {
                return donation.donatedBy === null
            })
            /** Only show blood compatible donation listings */
            switch (userBT) {
                case 'A+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'O+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'B+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'AB+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                    })
                    break
                case 'A-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '-' })
                    })

                    break
                case 'B-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '-' })
                    })
                    break
                case 'AB-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'O-': default:
                    break
            }
            this.setState({ availableDonations: donationListing })
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
                            <DonationItem donation={donation} user={this.state.user} />
                        ))}
                    </> : <h2> No donations have been performed </h2>}
                {/** All other donations */}
                {this.state.availableDonations !== null ?
                    <>
                        <h3> Donations Available </h3>
                        {this.state.availableDonations.map(donation => (
                            <DonationItem donation={donation} user={this.state.user} />
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