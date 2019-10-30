import React from 'react'

/** Element React UI */
import { Card, Button, Dialog, Form, Notification, Loading } from 'element-react'

/** Delete thingie */
import { deleteDonation, updateDonation } from '../graphql/mutations'

/** Components */
import Tracker from '../components/Tracker'

/**  Amplify */
import { API, graphqlOperation } from 'aws-amplify'

class DonationItem extends React.Component {
    state = {
        showTrackerDialog: false,
        showDeleteDialog: false
    }

    handleDeleteDonation = async () => {
        this.setState({ showDeleteDialog: false })
        const input = {
            id: this.props.donation.id
        }
        try {
            const result = await API.graphql(graphqlOperation(deleteDonation, { input }))
            Notification({
                title: "Success",
                message: "Donation deleted successfully!",
                type: "success"
            })
        } catch (err) {
            Notification({
                title: "Error",
                message: err.errors[0].message,
                type: "error"
            })
        }
    }

    addDays = (date,days) => {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }

    assignDonationToDonor = async () => {
        try {
            const input = {
                id: this.props.donation.id,
                donationDonatedById: this.props.user.id,
                canDonateFrom: this.addDays(new Date(),14)
            }
            const result = await API.graphql(graphqlOperation(updateDonation, { input }))
            Notification({
                title: "Success",
                message: "Please proceed to the required hospital",
                type: "success"
            })
        } catch (error) {
            Notification({
                title: "Error",
                message: "An error happened while assigning the donation to you",
                type: "error"
            })
        }

    }

    render() {
        const { donation, user } = this.props
        return !user ? <Loading fullscreen="true"/> : (
            <>
                <div key={donation.id} className="my-2">
                    <Card
                        bodyStyle={{
                            padding: "0.7em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                        <span style={{ color: 'var(--darkAmazonOrange)' }}>
                            Donation ID: {donation.id}
                        </span>
                        <span style={{ color: 'var(--lightSquidInk)' }}>
                            {donation.donatedBy === null ?
                                <p> This donation hasn't been assigned yet</p> :
                                <p> This donation has been assigned </p>}
                        </span>
                        <span style={{ color: 'var(--lightSquidInk)' }}>
                            {donation.bloodBagId === null ?
                                <p> The donor hasnt donated</p> :
                                <p> The bag is on its way </p>}
                        </span>
                        <span>
                            {donation.donatedBy !== null && donation.donatedBy !== undefined && (<>
                               {donation.donatedBy.id === user.id && (
                                <Button onClick={() => this.setState({showTrackerDialog: true})}> Track </Button>
                               )}
                            </>)}
                            {user.hospital !== null && 
                                <Button onClick={() => this.setState({showTrackerDialog: true})}> Track </Button>
                            }
                        </span>
                        {user.hospital !== null && (<>
                            <span>
                                <Button onClick={() => this.setState({ showDeleteDialog: true, donationtbd: donation.id })}>
                                    <img alt="delete" src="https://icon.now.sh/x" />
                                </Button>
                            </span>
                        </>)}
                        {user.hospital === null && (<>
                            <span>
                                <p> <b>{donation.hospital.name}</b> - {donation.hospital.address_line1} </p>
                            </span>
                            <span>
                                {donation.donatedBy === null && (
                                    <Button onClick={() => this.assignDonationToDonor()}>
                                        Assign to me
                                    </Button>
                                )}
                            </span>
                        </>)}

                    </Card>
                </div>
                <Dialog
                    title="Blood Tracker"
                    visible={this.state.showTrackerDialog}
                    onCancel={() => this.setState({ showTrackerDialog: false })}
                    size="large"
                    customClass="dialog">
                    <Dialog.Body>
                        {this.props.donation && <Tracker donationId={this.props.donation.id} />}
                    </Dialog.Body>
                </Dialog>
                <Dialog
                    title="Are you sure?"
                    visible={this.state.showDeleteDialog}
                    onCancel={() => this.setState({ showDeleteDialog: false })}
                    size="large"
                    customClass="dialog">
                    <Dialog.Body>
                        <Form labelPosition="top">
                            <Form.Item
                                label="Are you sure you want to delete this donation?">
                                <Button type="primary" onClick={this.handleDeleteDonation}> Delete </Button>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                </Dialog>
            </>
        )
    }
}

export default DonationItem