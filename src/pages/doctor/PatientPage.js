import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getPatient } from '../../graphql/queries'
import { Loading, Button, Card, Dialog, Form, DatePicker, Input, Notification } from 'element-react'
import {Link} from 'react-router-dom'
import Avatar from '../../components/avatar'
import { createDonation } from '../../graphql/mutations'

class PatientPage extends React.Component {

    state = {
        patient: {},
        isLoading: true,
        showDonationForm: false,
        isCreatingDonation: false
    }

    componentDidMount = () => {
        if(this.props.patientId) {
            this.getPatientInformation(this.props.patientId)
        }
    }

    getPatientInformation = async patientId => {
        const patient = await API.graphql(graphqlOperation(getPatient,{id: patientId}))
        this.setState({patient: patient.data.getPatient, isLoading: false})
    }

    trackBag = donationId => {

    }

    handleAddDonation = async () => {
        const input = {
            dateNeeded: this.state.dateNeeded,
            donationAssignedToId : this.state.patient.id,
            bloodType: this.state.patient.blood,
            bagAmount: this.state.bagAmount,
            donationHospitalId: this.state.patient.hospital.id
        }
        try {
            const result = await API.graphql(graphqlOperation(createDonation,{input}))
            Notification({
                title: "Success",
                message: "Donation created successfully!",
                type: "success"
            })
            this.setState({isCreatingDonation: false, showDonationForm: false})
        } catch (error) {
            console.error(error)
            Notification({
                title: "Error",
                message: error.errors[0].message,
                type: "error"
            })
        }
    }

    render () {
        const {patient} = this.state
        return this.state.isLoading ? <Loading fullscreen={true}/> : (<>
            {/** Back Button */}
            <Link className="link" to="/">
                Back to Patient's List
            </Link>
            {/** Patient's profile */}
            <Avatar user={patient}/>
            {/** Donations */}
            {patient.donations.items.length > 0 ? (<>
                <h2> Donations </h2>
                {patient.donations.items.map(donation => (
                    <div key={donation.id} className="my-2">
                        <Card
                            bodyStyle={{
                                padding: "0.7em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <span style={{color: 'var(--darkAmazonOrange)'}}>
                                    Donation ID: {donation.id}
                                </span>
                                <span style={{color: 'var(--lightSquidInk)'}}>
                                    {donation.bloodBagId === null ?
                                    <p> This bag hasn't been assigned yet</p> :
                                    <p> This bag is on it's way</p>}
                                </span>
                                <span>
                                    <Button onClick={() => this.trackBag(donation.id)}> Track </Button>
                                </span>
                        </Card>
                    </div>
                ))}
            </>) : (<>
                <h2> No Blood Donations have been received </h2>
                <Button color="primary" onClick={() => this.setState({showDonationForm: true})}> Ask for new donation </Button>
            </>)}
            {/** Dialog for New Blood */}
            <Dialog
                title="Ask for a donation"
                visible={this.state.showDonationForm}
                onCancel={() => this.setState({showDonationForm: false})}
                size="large"
                customClass="dialog">
                    <Dialog.Body>
                        <Form labelPosition="top">
                            <Form.Item 
                                label="Deadline">
                                    <DatePicker
                                        isShowTime={true}
                                        value={this.state.dateNeeded}
                                        placeholder="Pick a day"
                                        onChange={dateNeeded=>{this.setState({dateNeeded})}}
                                        disabledDate={time=>time.getTime() < Date.now()}/>
                            </Form.Item>
                            <Form.Item
                                label="Milliliters needed">
                                    <Input
                                        type="number"
                                        placeholder="650"
                                        trim={true}
                                        onChange={bagAmount => this.setState({bagAmount})}/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={!this.state.bagAmount || !this.state.dateNeeded}
                                    type="primary"
                                    onClick={this.handleAddDonation}
                                    loading={this.isCreatingDonation}>
                                        {this.state.isCreatingDonation ? "Adding Donation..." : "Add donation"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
            </Dialog>
            </>)
    }
}

export default PatientPage