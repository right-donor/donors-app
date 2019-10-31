import React from 'react'

/** Element UI */
import {Loading, Button, Dialog, Form, Input, Select, Notification} from 'element-react'

/** Other components */
import InterviewList from '../../InterviewList'

/** API and AWS */
import {API,graphqlOperation} from 'aws-amplify'

/** GraphQL */
import {updateUser, updateDonation} from '../../../graphql/mutations'

/** External APIs */
import axios from 'axios'

class ListInterviews extends React.Component {

    state = {
        donor: null,
        user: null,
        showInterviewDialog: false,
        showStepTwoDialog: false,
        showStepThreeDialog: false,
        bloodresults: {},
        options: [{
            value: true,
            label: "Yes"
        },{
            value: false,
            label: "No"
        }],
        medicalOptions: [{
            value: true,
            label: "Positive"
        },{
            value: false,
            label: "Negative"
        }]
    }

    componentDidMount = async () => {
        if(this.props.donor) {
            this.setState({donor : this.props.donor})
        }
    }

    addDays = (date,days) => {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }

    checkForStep2Interview = () => {
        this.setState({showInterviewDialog: false})
        let canDonate = true

        if(canDonate && this.state.weight < 49.5) {
            canDonate = false
        }

        if(canDonate && (this.state.recentTattoos
            || this.state.recentPregnancy
            || this.state.hypertension
            || this.state.recentMenstrualCycle
            || this.state.recentAntibiotics
            || this.state.recentSickness
            || this.state.recentAlcohol)) {
            canDonate = false
        }

        if(canDonate) {
            Notification({
                title: "Great!",
                message: "This candidate is eligible for a blood donation",
                type: "success"
            })
            this.setState({showStepTwoDialog: true})
        } else {
            Notification({
                title: "Oh no!",
                message: "This candidate is NOT eligible for a blood donation",
                type: "warning"
            })
            this.addDonationBan()
        }
    }

    checkForStep3Interview = () => {
        this.setState({showStepTwoDialog: false})
        let canDonate = true
        const {bloodresults} = this.state
        if(bloodresults.vih 
            || bloodresults.hepatitisB 
            || bloodresults.hepatitisC 
            || bloodresults.syphilis 
            || bloodresults.chagas) {
                canDonate = false
            }
        
        if(canDonate) {
            Notification({
                title: "Success",
                message: "Your blood can be donated",
                type: "success"
            })
            this.setState({showStepThreeDialog: true})
        } else {
            Notification({
                title: "Error",
                message: "This user is not a candidate for blood donation",
                type: "error"
            })
            this.addDonationBan()
        }
    }

    completeStep3 = async () => {
        /** Put the Bag ID Dialog Down */
        this.setState({showStepThreeDialog: false})
        // /** Try to commit the new bag to the chain */
        // console.log(this.state, this.props)
        try {
            const input = {
                bagId: this.state.bloodBagId,
                bagOriginId: this.props.user.hospital.id,
                bloodType: this.state.donor.blood.type,
                bloodRH: this.props.donor.blood.rh,
                bagSize: this.props.donor.donations.items[0].bagAmount
            }
            await this.createBloodBagOnBlockchain(input)
            await this.addTokensToDonor(input)
        } catch (error) {
            Notification({
                title: "Error",
                message: "Couldn't perform bag state update",
                type: "error"
            })
        }
    }

    createBloodBagOnBlockchain = async data => {
        await axios.post('http://3.222.166.83/blood/create/'
        +data.bagId+'/'
        +data.bagOriginId+'/'
        +data.bagOriginId+'/'
        +data.bloodType+'/'
        +data.bloodRH+'/'
        +data.bagSize+'/'
        +'user1')
        .then((res)=>{
            console.log(res)
            Notification({
                title: "Success",
                message: "Blood Bag was commited to the chain",
                type: "success"
            })
            this.handleAssignBagOnBlockchain(data)
        })
        .catch((error)=>{
            Notification({
                title: "Error",
                message: "Blood Bag couldn't be commited to the chain",
                type: "error"
            })
            this.handleAssignBagOnBlockchain(data)
        })
    } 

    handleAssignBagOnBlockchain = async (data) => {
        axios.post('http://3.222.166.83/blood/assign/'
        +data.bagId+'/'
        +this.props.donor.donations.items[0].assignedTo.id+'/'
        +this.state.donor.donations.items[0].hospital.id+'/'
        +'user1')
        .then((res)=>{
            Notification({
                title: "Success",
                message: "Blood Bag was assigned to patient",
                type: "success"
            })
            this.handleDonationMutation()
        })
        .catch((error)=>{
            Notification({
                title: "Error",
                message: "Blood Bag couldn't be assigned to patient",
                type: "error"
            })
        })
    }

    addTokensToDonor = async data => {
        await axios.post('http://3.222.166.83/rewards/receive/'
        +this.props.donor.id+'/'
        +data.bagAmount+'/'
        +'user1')
        .then((res)=>{
            Notification({
                title: "Success",
                message: "Tokens were submited to your account",
                type: "success"
            })
        })
        .catch((error)=>{
            Notification({
                title: "Error",
                message: "Tokens couldn't be received correctly",
                type: "error"
            })
        })
    }

    handleBloodDonation = async () => {
        try {
            const input = {
                id: this.props.donor.id,
                canDonateFrom: this.addDays(new Date(), 14),
                interviews: [ {
                    date: new Date(),
                    weight: this.state.weight,
                    recentSickness: this.state.recentSickness,
                    recentAntibiotics: this.state.recentAntibiotics,
                    recentAlcohol: this.state.recentAlcohol,
                    recentVaccines: this.state.recentVaccines,
                    recentTattoos: this.state.recentTattoos,
                    recentMenstrualCycle: this.state.recentMenstrualCycle,
                    diabetic: this.state.diabetic,
                    hypertension: this.state.hypertension,
                    bloodresults: this.state.bloodresults
                },...this.props.donor.interviews]
            }
            await API.graphql(graphqlOperation(updateUser,{input}))
            Notification({
                title: "Success",
                message: "A new interview was added to the user's history",
                type: "success"
            })
        } catch (error) {
            Notification({
                title: "Error",
                message: "Couldnt append an interview to this user",
                type: "error"
            })
        }
    }

    handleDonationMutation = async (bloodBagId) => {
        try {
            const input = {
                id: this.state.donor.donations.items[0].id,
                dateFulfilled: new Date(),
                bloodBagId
            }
            await API.graphql(graphqlOperation(updateDonation,{input}))
            Notification({
                title: "Success",
                message: "Donation status has been updated",
                type: "success"
            })
            await this.handleBloodDonation()
        } catch (error) {
            Notification({
                title: "Error",
                message: "Donation status could not be updated",
                type: "error"
            })
        }
    }

    addDonationBan = async () => {
        try {
            const input = {
                id: this.state.donor.id,
                canDonateFrom: this.state.recentTattoos ?
                    this.addDays(new Date(),365) : this.addDays(new Date(), 14),
                interviews: [ {
                    date: new Date(),
                    weight: this.state.weight,
                    recentSickness: this.state.recentSickness,
                    recentAntibiotics: this.state.recentAntibiotics,
                    recentAlcohol: this.state.recentAlcohol,
                    recentVaccines: this.state.recentVaccines,
                    recentTattoos: this.state.recentTattoos,
                    recentMenstrualCycle: this.state.recentMenstrualCycle,
                    diabetic: this.state.diabetic,
                    hypertension: this.state.hypertension,
                    bloodresults: this.state.bloodresults
                },...this.state.donor.interviews]
            }
            await API.graphql(graphqlOperation(updateUser,{input}))
            Notification({
                title: "Warning",
                message: "A Donation Ban has been ensued",
                type: "warning"
            })
        } catch (error) {
            Notification({
                title: "Error",
                message: "An error has occured",
                type: "error"
            })
        }
    }

    render () {
        const {donor,user} = this.props
        console.log(donor)
        return (!donor && !user) ? <Loading/> : (
            <>
                {/** Check if any interviews have happened before */}
                {donor.interviews === null && (
                    <h1> No recent donations have been identified </h1>
                )}
                {/** New interview button */}
                <Button
                    onClick={() => this.setState({showInterviewDialog: true})}>
                        Start new Interview
                </Button>
                {/** List all interviews */}
                {donor.interviews !== null && (
                    <>
                    <h1> Recent Interviews </h1>
                    <InterviewList user={this.state.donor}/>
                    </>
                )}
                {/** Interview Donation Dialog */}
                <Dialog
                    title="Add a new interview"
                    visible={this.state.showInterviewDialog}
                    onCancel={() => this.setState({showInterviewDialog: false})}
                    size="large"
                    customClass="dialog">
                        <Dialog.Body>
                            <Form labelPosition="top">
                                <Form.Item
                                    label="Weight">
                                    <Input
                                        type="number"
                                        placeholder="65.5"
                                        trim={true}
                                        onChange={weight => this.setState({weight})}/>
                                </Form.Item>
                                <Form.Item
                                    label="Have you been recenty sick?">
                                        <Select
                                            value={this.state.recentSickness}
                                            onChange={recentSickness => this.setState({recentSickness})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Have you recently taken antibiotics?">
                                        <Select
                                            value={this.state.recentAntibiotics}
                                            onChange={recentAntibiotics => this.setState({recentAntibiotics})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Have you been pregnant recently?">
                                        <Select
                                            value={this.state.recentPregnancy}
                                            onChange={recentPregnancy => this.setState({recentPregnancy})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Have you taken alcohol in the last 24h?">
                                        <Select
                                            value={this.state.recentAlcohol}
                                            onChange={recentAlcohol => this.setState({recentAlcohol})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Have you had any vaccines in the last 2 weeks?">
                                        <Select
                                            value={this.state.recentVaccines}
                                            onChange={recentVaccines => this.setState({recentVaccines})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Have you got a tattoo made in the last year?">
                                        <Select
                                            value={this.state.recentTattoos}
                                            onChange={recentTattoos => this.setState({recentTattoos})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Are you on your period?">
                                        <Select
                                            value={this.state.recentMenstrualCycle}
                                            onChange={recentMenstrualCycle => this.setState({recentMenstrualCycle})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Are you diabetic?">
                                        <Select
                                            value={this.state.diabetic}
                                            onChange={diabetic => this.setState({diabetic})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Do you suffer from hypertension?">
                                        <Select
                                            value={this.state.hypertension}
                                            onChange={hypertension => this.setState({hypertension})}>
                                                {this.state.options.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item>
                                        <Button
                                            type="primary"
                                            onClick={() => this.checkForStep2Interview()}>
                                                Submit
                                        </Button>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                </Dialog>
                {/** Blood donation */}
                <Dialog
                    title="Blood results"
                    visible={this.state.showStepTwoDialog}
                    onCancel={() => this.setState({showStepTwoDialog: false})}
                    size="large"
                    customClass="dialog">
                        <Dialog.Body>
                            <Form labelPosition="top">
                                <Form.Item
                                    label="VIH?">
                                        <Select
                                            value={this.state.bloodresults.vih}
                                            onChange={vih => this.setState({bloodresults: {...this.state.bloodresults, vih}})}>
                                                {this.state.medicalOptions.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Hepatitis B?">
                                        <Select
                                            value={this.state.bloodresults.hepatitisB}
                                            onChange={hepatitisB => this.setState({bloodresults: {...this.state.bloodresults, hepatitisB}})}>
                                                {this.state.medicalOptions.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Hepatitis C?">
                                        <Select
                                            value={this.state.bloodresults.hepatitisC}
                                            onChange={hepatitisC => this.setState({bloodresults: {...this.state.bloodresults, hepatitisC}})}>
                                                {this.state.medicalOptions.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Syphilis?">
                                        <Select
                                            value={this.state.bloodresults.syphilis}
                                            onChange={syphilis => this.setState({bloodresults: {...this.state.bloodresults, syphilis}})}>
                                                {this.state.medicalOptions.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Chagas?">
                                        <Select
                                            value={this.state.bloodresults.chagas}
                                            onChange={chagas => this.setState({bloodresults: {...this.state.bloodresults, chagas}})}>
                                                {this.state.medicalOptions.map(el => {
                                                    return <Select.Option
                                                                key={el.value}
                                                                label={el.label}
                                                                value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={this.checkForStep3Interview}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                </Dialog>
                {/** Step 3 and final dialog */}
                <Dialog
                    title="Create a blood bag"
                    visible={this.state.showStepThreeDialog}
                    onCancel={() => this.setState({showStepThreeDialog: false})}
                    size="large"
                    customClass="dialog">
                        <Dialog.Body>
                            <Form labelPosition="top">
                                <Form.Item
                                    label="Bag ID">
                                        <Input
                                            placeholder="ID"
                                            trim={true}
                                            onChange={bloodBagId => this.setState({bloodBagId})}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        disabled={!this.state.bloodBagId}
                                        onClick={this.completeStep3}>
                                            Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                </Dialog>
            </>
        )
    }
}

export default ListInterviews