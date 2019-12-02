import React from 'react'
import {Link} from 'react-router-dom'

/** Design elements */
import {Loading, Dialog, Notification, Progress, DatePicker } from 'element-react'
/** Material UI Stuff */
import {Select, MenuItem, InputLabel, FormControl} from "@material-ui/core"
import { withStyles  } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import GridContainer from '../../useful/Grid/GridContainer'
import GridItem from '../../useful/Grid/GridItem'
import Button from '../../useful/CustomButtons/Button'
import Primary from '../../useful/Typography/Primary'
import CustomInput from '../../useful/CustomInput/CustomInput'

// Redux imports
import { connect } from 'react-redux';

/** Other components */
import InterviewList from '../../components/InterviewList'

/** API and AWS */
import {API,graphqlOperation} from 'aws-amplify'

/** GraphQL */
import {updateUser, updateDonation} from '../../graphql/mutations'

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
        recentTattoos: "",
        recentPregnancy: "",
        hypertension: "",
        recentMenstrualCycle: "",
        recentAntibiotics: "",
        recentSickness: "",
        recentAlcohol: "",
        bloodBagId: "",
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
                this.handleDonationMutation(data.bagId)
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
            +'100/'
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
            let interview = {
                date: new Date(),
                weight: parseFloat(this.state.weight),
                recentSickness: this.state.recentSickness,
                recentPregnancy: this.state.recentPregnancy,
                recentAntibiotics: this.state.recentAntibiotics,
                recentAlcohol: this.state.recentAlcohol,
                recentVaccines: this.state.recentVaccines,
                recentTattoos: this.state.recentTattoos,
                recentMenstrualCycle: this.state.recentMenstrualCycle,
                diabetic: this.state.diabetic,
                hypertension: this.state.hypertension,
                bloodresults: this.state.bloodresults
            }
            let interviews = []
            if(this.props.donor.interviews !== null ){
                interviews = [interview, ...this.props.donor.interviews]
            } else {
                interviews = [interview]
            }
            const input = {
                id: this.props.donor.id,
                canDonateFrom: this.addDays(new Date(), 14),
                interviews
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
            console.log(error)
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
            let interview = {
                date: new Date(),
                weight: parseFloat(this.state.weight),
                recentSickness: this.state.recentSickness,
                recentPregnancy: this.state.recentPregnancy,
                recentAntibiotics: this.state.recentAntibiotics,
                recentAlcohol: this.state.recentAlcohol,
                recentVaccines: this.state.recentVaccines,
                recentTattoos: this.state.recentTattoos,
                recentMenstrualCycle: this.state.recentMenstrualCycle,
                diabetic: this.state.diabetic,
                hypertension: this.state.hypertension,
                bloodresults: this.state.bloodresults
            }
            let interviews = []
            if(this.props.donor.interviews !== null ){
                interviews = [interview, ...this.props.donor.interviews]
            } else {
                interviews = [interview]
            }
            const input = {
                id: this.props.donor.id,
                canDonateFrom: this.state.recentTattoos ? this.addDays(new Date(), 365) : this.addDays(new Date(), 14),
                interviews
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
        const {donor,user,classes} = this.props;
        const {
            showInterviewDialog,
            showStepTwoDialog,
            showStepThreeDialog
        } = this.state;
        /* TO DO:
        * Diferenciar cuándo mostrar cada formulario
        * return (!donor && !user) ? <Loading/> : (
        * {donor.interviews === null && ( Agregar una nueva entrevista
        * {donor.interviews !== null && ( Entrevistas recientes -> paso 1 -> paso 2 -> paso 3
        */
        return(
            <>
            <FormControl fullWidth className={classes.selectFormControl}>
                <GridContainer spacing={3} direction="column" justify="center" alignItems="center">
                    <form className={""} autoComplete="on">
                        {donor.interviews === null && (
                            <GridItem>
                                <Primary>
                                    <h3>No se han encontrado donaciones recientes</h3>
                                </Primary>
                            </GridItem>
                        )}
                        <GridItem>
                            <Button
                                onClick={() => this.setState({showInterviewDialog: true})}
                                fullWidth
                                color="primary"
                            >
                                Empezar nueva entrevista
                            </Button>
                        </GridItem>
                    </form>
                </GridContainer>
            </FormControl>
            <FormControl fullWidth className={classes.selectFormControl}>
                <GridContainer spacing={3} direction="column" justify="center" alignItems="center">
                    <form className={""} autoComplete="on">
                        {donor.interviews !== null && (
                            <>
                            <GridItem>
                                <Primary>
                                        <h3>Entrevistas recientes</h3>
                                </Primary>
                            </GridItem>
                            <GridItem>
                                <InterviewList user={this.props.donor}/>
                            </GridItem>
                            </>
                        )}
                        {showInterviewDialog && (
                            <>
                            <GridItem>
                                <CustomInput
                                    labelText="Peso"
                                    inputProps={{ onChange: weight => this.setState({weight}) }}
                                />
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-sickness"
                                    className={classes.selectLabel}
                                >
                                    ¿Te has enfermado recientemente?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentSickness}
                                    onChange={event => this.setState({recentSickness: event.target.value})}
                                    inputProps={{
                                        name: "recentSickness",
                                        id: "recent-sickness"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Te has enfermado recientemente?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-antibiotics"
                                    className={classes.selectLabel}
                                >
                                    ¿Has tomado antibióticos recientemente?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentAntibiotics}
                                    onChange={event => this.setState({recentAntibiotics: event.target.value})}
                                    inputProps={{
                                        name: "recentAntibiotics",
                                        id: "recent-antibiotics"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Has tomado antibióticos recientemente?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-pregnancy"
                                    className={classes.selectLabel}
                                >
                                    ¿Estuviste embarazada recientemente?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentPregnancy}
                                    onChange={event => this.setState({recentPregnancy: event.target.value})}
                                    inputProps={{
                                        name: "recentPregnancy",
                                        id: "recent-pregnancy"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Estuviste embarazada recientemente?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-alcohol"
                                    className={classes.selectLabel}
                                >
                                    ¿Has tomado alcohol en las últimas 24h?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentAlcohol}
                                    onChange={event => this.setState({recentAlcohol: event.target.value})}
                                    inputProps={{
                                        name: "recentAlcohol",
                                        id: "recent-alcohol"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Has tomado alcohol en las últimas 24h?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-tattoos"
                                    className={classes.selectLabel}
                                >
                                    ¿Te has tatuado en el último año?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentTattoos}
                                    onChange={event => this.setState({recentTattoos: event.target.value})}
                                    inputProps={{
                                        name: "recentTattoos",
                                        id: "recent-tattoos"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Te has tatuado en el último año?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-menstrual-cycle"
                                    className={classes.selectLabel}
                                >
                                    ¿Estás en tu periodo?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentMenstrualCycle}
                                    onChange={event => this.setState({recentMenstrualCycle: event.target.value})}
                                    inputProps={{
                                        name: "recentMenstrualCycle",
                                        id: "recent-menstrual-cycle"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Estás en tu periodo?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="diabetic"
                                    className={classes.selectLabel}
                                >
                                    ¿Eres diabético?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.diabetic}
                                    onChange={event => this.setState({diabetic: event.target.value})}
                                    inputProps={{
                                        name: "diabetic",
                                        id: "diabetic"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Eres diabético?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="hypertension"
                                    className={classes.selectLabel}
                                >
                                    ¿Sufres de hipertensión?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.hypertension}
                                    onChange={event => this.setState({hypertension: event.target.value})}
                                    inputProps={{
                                        name: "hypertension",
                                        id: "hypertension"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Sufres de hipertensión?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputLabel
                                    htmlFor="recent-vaccines"
                                    className={classes.selectLabel}
                                >
                                    ¿Te has vacunado en las últimas dos semanas?
                                </InputLabel>
                                <Select
                                    fullWidth
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.recentVaccines}
                                    onChange={event => this.setState({recentVaccines: event.target.value})}
                                    inputProps={{
                                        name: "recentVaccines",
                                        id: "recent-vaccines"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        ¿Te has vacunado en las últimas dos semanas?
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={true}
                                    >
                                        Sí
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                </Select>
                            </GridItem>
                            <GridItem>
                                <Button fullWidth
                                        color="primary"
                                        onClick={() => this.checkForStep2Interview()}
                                >
                                    Enviar
                                </Button>
                            </GridItem>
                            </>
                        )}
                    </form>
                </GridContainer>
            </FormControl>
            {showStepTwoDialog && (
            <FormControl fullWidth className={classes.selectFormControl}>
                <GridContainer
                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <form className={""} autoComplete="on">
                        <GridItem>
                            <Primary>
                                <h3>Resultados de la donación</h3>
                            </Primary>
                        </GridItem>
                        <GridItem>
                            <InputLabel
                                htmlFor="vih"
                                className={classes.selectLabel}>
                                VIH
                            </InputLabel>
                            <Select
                                fullWidth
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.bloodresults.vih}
                                onChange={event => this.setState({bloodresults: {...this.state.bloodresults, vih: event.target.value}})}
                                inputProps={{
                                    name: "vih",
                                    id: "vih"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    VIH
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={true}
                                >
                                    Positivo
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={false}
                                >
                                    Negativo
                                </MenuItem>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <InputLabel
                                htmlFor="hepatitis-b"
                                className={classes.selectLabel}>
                                Hepatitis B
                            </InputLabel>
                            <Select
                                fullWidth
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.bloodresults.hepatitisB}
                                onChange={event => this.setState({bloodresults: {...this.state.bloodresults, hepatitisB:event.target.value}})}
                                inputProps={{
                                    name: "hepatitisB",
                                    id: "hepatitis-b"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Hepatitis B
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={true}
                                >
                                    Positivo
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={false}
                                >
                                    Negativo
                                </MenuItem>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <InputLabel
                                htmlFor="hepatitis-c"
                                className={classes.selectLabel}>
                                Hepatitis C
                            </InputLabel>
                            <Select
                                fullWidth
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.bloodresults.hepatitisC}
                                onChange={event => this.setState({bloodresults: {...this.state.bloodresults, hepatitisC: event.target.value}})}
                                inputProps={{
                                    name: "hepatitisC",
                                    id: "hepatitis-c"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Hepatitis C
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={true}
                                >
                                    Positivo
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={false}
                                >
                                    Negativo
                                </MenuItem>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <InputLabel
                                htmlFor="sifilis"
                                className={classes.selectLabel}>
                                Sifilis
                            </InputLabel>
                            <Select
                                fullWidth
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.bloodresults.syphilis}
                                onChange={event => this.setState({bloodresults: {...this.state.bloodresults, syphilis: event.target.value}})}
                                inputProps={{
                                    name: "sifilis",
                                    id: "sifilis"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Sifilis
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={true}
                                >
                                    Positivo
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={false}
                                >
                                    Negativo
                                </MenuItem>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <InputLabel
                                htmlFor="chagas"
                                className={classes.selectLabel}>
                                Chagas
                            </InputLabel>
                            <Select
                                fullWidth
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.bloodresults.chagas}
                                onChange={event => this.setState({bloodresults: {...this.state.bloodresults, chagas: event.target.value}})}
                                inputProps={{
                                    name: "chagas",
                                    id: "chagas"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Chagas
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={true}
                                >
                                    Positivo
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value={false}
                                >
                                    Negativo
                                </MenuItem>
                            </Select>
                        </GridItem>
                        <Button fullWidth
                                color="primary"
                                onClick={this.checkForStep3Interview}
                        >
                            Enviar
                        </Button>
                    </form>
                </GridContainer>
            </FormControl>
            )}
            {showStepThreeDialog && (
            <FormControl fullWidth className={classes.selectFormControl}>
                <GridContainer
                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <form className={""} autoComplete="on">
                        <GridItem>
                            <Primary>
                                <h3>Crear una bolsa de sangre</h3>
                            </Primary>
                        </GridItem>
                        <GridItem>
                            <CustomInput
                                labelText="ID"
                                onChange={event => this.setState({bloodBagId: event.target.id})}
                            />
                        </GridItem>
                        <GridItem>
                            <Button fullWidth
                                    color="primary"
                                    onClick={this.completeStep3}
                            >
                                Enviar
                            </Button>
                        </GridItem>
                    </form>
                </GridContainer>
            </FormControl>
            )}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(ListInterviews))