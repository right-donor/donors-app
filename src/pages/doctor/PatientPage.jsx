import React from 'react'

import { connect } from 'react-redux';

import { API, graphqlOperation } from 'aws-amplify'
import { getPatient } from '../../graphql/queries'
import { Loading, Dialog, Form, DatePicker, Input, Notification } from 'element-react'
import {Link} from 'react-router-dom'
import Avatar from '../../components/avatar'
import { createDonation } from '../../graphql/mutations'
import { onCreateDonation, onDeleteDonation, onUpdateDonation } from '../../graphql/subscriptions'
import Container from "@material-ui/core/Container";
import { Typography} from '@material-ui/core'
import Button from '../../useful/CustomButtons/Button'
import DonationItem from '../../components/DonationItem'
import NewDonation from './NewDonation'

class PatientPage extends React.Component {

    state = {
        patient: {},
        isLoading: true,
        showDonationForm: false,
        isCreatingDonation: false,
        showDeleteDialog: false,
        showTrackerDialog: false
    }

    componentDidMount = () => {
        if(this.props.match.params.pacientId) {
            this.getPatientInformation(this.props.match.params.pacientId)
        }
        //Creation listener
        this.createDonationListener = API.graphql(graphqlOperation(onCreateDonation))
            .subscribe({
                next: donationData => {
                    const createdDonations = donationData.value.data.onCreateDonation
                    const prevDonations = this.state.patient.donations.items.filter(
                        item => item.id !== createdDonations.id
                    )
                    const updatedDonations = [createdDonations, ...prevDonations]
                    const patient = {...this.state.patient}
                    patient.donations.items = updatedDonations
                    this.setState({patient})
                }})
        
        //Delete Listener 
        this.deleteDonationListener = API.graphql(graphqlOperation(onDeleteDonation))
                .subscribe({
                    next: donationData => {
                        const createdDonation = donationData.value.data.onDeleteDonation
                        const updatedDonations = this.state.patient.donations.items.filter(
                            item => item.id !== createdDonation.id
                        )
                        const patient = {...this.state.patient}
                        patient.donations.items = updatedDonations
                        this.setState({patient})
                    }
                })

        this.updateDonationListener = API.graphql(graphqlOperation(onUpdateDonation))
        .subscribe({
            next: donationData => {
                const updatedDonation = donationData.value.data.onUpdateDonation
                const updatedDonationIndex = this.state.patient.donations.items.findIndex(
                    item => item.id === updatedDonation.id
                )
                const updatedDonations = [
                    ...this.state.patient.donations.items.slice(0,updatedDonationIndex),
                    updatedDonation,
                    ...this.state.patient.donations.items.slice(updatedDonationIndex + 1)
                ]
                const patient = {...this.state.patient}
                patient.donations.items = updatedDonations
                this.setState({patient})
            }
        })
    }

    componentWillUpdate() {
        if(this.props.match.params.pacientId) {
            this.getPatientInformation(this.props.match.params.pacientId)
        }
    }
    
    componentWillUnmount = () => {
        this.updateDonationListener.unsubscribe()
        this.createDonationListener.unsubscribe()
        this.deleteDonationListener.unsubscribe()
    }

    getPatientInformation = async patientId => {
        const patient = await API.graphql(graphqlOperation(getPatient,{id: patientId}))
        this.setState({patient: patient.data.getPatient, isLoading: false})
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
            console.log(result)
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
                <Container maxWidth='lg' style={{padding:'3rem 0'}}>
                    {/** Patient's profile */}
                    <Avatar user={patient}/>
                    {/** Donations */}
                    {patient.donations.items.length > 0 ? (<>
                        <h2> Donations </h2>
                        {patient.donations.items.map(donation => (
                            <DonationItem user={this.props.user} donation={donation}/>
                        ))}
                    </>) : (<>
                      
                        <Typography variant="h2" style={{
                            color:'#555E65', 
                            fontWeight:'200',
                            fontSize:'2rem',
                            textAlign:'center', 
                            paddingTop:'2rem',
                            marginBottom:'2rem'}}> Este paciente no ha recibido donaciones </Typography>

                    </>)}
                    <div style={{display:'flex', justifyContent:'center'}}>
                    <Button color="primary" onClick={() => this.setState({showDonationForm: true})}> Pedir Donación</Button>

                    </div>
                
                </Container>
                
            {/** Dialog for New Blood */}
            <Dialog
                visible={this.state.showDonationForm}
                onCancel={() => this.setState({showDonationForm: false})}
                size="large"
                customClass="dialog">
                    <Dialog.Body>
                        <NewDonation user={this.props.user} patient={patient} />
                    </Dialog.Body>
            </Dialog>
            
            </>)
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(PatientPage)