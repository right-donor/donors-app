import React from "react"
/** GraphQL Operations */
import {createPatient} from '../../graphql/mutations'
/** Amplify elements */
import aws_exports from '../../aws-exports'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
/** Design elements */
import {Notification} from 'element-react'
/** Material UI Stuff */
import {Select, MenuItem, InputLabel, FormControl} from "@material-ui/core"
import { withStyles  } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import GridContainer from '../../useful/Grid/GridContainer'
import GridItem from '../../useful/Grid/GridItem'
import Button from '../../useful/CustomButtons/Button'
import Primary from '../../useful/Typography/Primary'
import CustomInput from '../../useful/CustomInput/CustomInput'

/** Date components */
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const initialState = {
    firstname: "",
    lastname: "",
    birthday: new Date(),
    photo: "",
    blood: {},
    doctor: "",
    hospital: {},
    isUploading: false,
    percentUpload: 0,
    genderOptions:[{
        value: 'male',
        label: 'male'
    },{
        value: 'female',
        label: 'female'
    },{
        value: 'other',
        label: 'other'
    }],
    bloodOptions:[{
        value: 'A',
        label: 'A'
    },{
        value: 'B',
        label: 'B'
    },
    {
        value: 'AB',
        label: 'AB'
    },
    {
        value: 'O',
        label: 'O'
    }],
    rhOptions: [{
        value: '+',
        label: '+'
    },{
        value: '-',
        label: '-'
    }]
}

class NewPatient extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        birthday: new Date(),
        blood: {},
        doctor: "",
        hospital: {},
        isUploading: false,
        percentUpload: 0,
        genderOptions:[{
            value: 'male',
            label: 'male'
        },{
            value: 'female',
            label: 'female'
        },{
            value: 'other',
            label: 'other'
        }],
        bloodOptions:[{
            value: 'A',
            label: 'A'
        },{
            value: 'B',
            label: 'B'
        },
        {
            value: 'AB',
            label: 'AB'
        },
        {
            value: 'O',
            label: 'O'
        }],
        rhOptions: [{
            value: '+',
            label: '+'
        },{
            value: '-',
            label: '-'
        }]
    }

	handleSelectedDate = birthday => {
		this.setState({ birthday })
	}

    handleAddPatient = async () => {
        // Retrieve the hospital Id from the props
        const hospitalId = this.props.user.hospital.id
        // Add visibility
        const visibility = "public"
		const { identityId } = await Auth.currentCredentials()
        //const filename = `/${visibility}/${identityId}/${Date.now()}-${this.state.image.name}`

        const input = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            gender: this.state.gender,
            blood: this.state.blood,
            patientDoctorId: this.props.user.id,
            patientHospitalId: hospitalId
        }

        try {
            const result = await API.graphql(graphqlOperation(createPatient, {input}))
            console.log(result)
            Notification({
                title: "Success!",
                message: "Added patient successfully!",
                type: 'success'
            })
            this.setState({...initialState})
        } catch (err) {
            Notification({
                title: "Error",
                message: err.errors[0].message,
                type: 'error'
            })
        }
    }

    render() {
        const {classes} = this.props;
      
        return (
       <FormControl className={classes.selectFormControl} style={{marginLeft:'auto',marginRight:'auto'}}>
            
                <form className={""} autoComplete="on" style={{maxWidth:'100%',backgroundColor:'#fff',padding:'2.5rem 2rem', borderRadius:'.7rem',marginLeft:'auto',marginRight:'auto'}}>
                    <GridItem>
                        <Primary>
                            <h2>Agregar paciente</h2>
                        </Primary>
                    </GridItem>
                    <GridItem>
						<CustomInput
							labelText="Nombre"
							id="firstname"
                            value={this.state.firstname}
                            onChange={event => this.setState({ firstname: event.target.value })}
							formControlProps={{
							  fullWidth: true
							}}
						  />
                    </GridItem>
                    <GridItem>
						<CustomInput
							labelText="Apellido"
							id="lastname"
                            value={this.state.firstname}
                            onChange={event => this.setState({ lastname: event.target.value })}
							formControlProps={{
							  fullWidth: true
							}}
						  />
                    </GridItem>
					<GridItem>
						<MuiPickersUtilsProvider utils={DateFnsUtils} >
							<KeyboardDatePicker
								margin="normal"
								label="Birthday"
								id="birthday"
								format="yyyy-MM-dd"
								value={this.state.birthday}
								onChange={this.handleSelectedDate}
								KeyboardButtonProps={{
									'aria-label': 'change date'
                                }}
                                style={{width:'100%'}}
							/>
						</MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem>
						<InputLabel htmlFor="blood-type" className={classes.selectLabel} style={{paddingLeft:'15px'}}>
								Sexo
						</InputLabel>
                        <Select fullWidth
							MenuProps={{
							  className: classes.selectMenu
							}}
							classes={{
							  select: classes.select
							}}
                            value={this.state.gender}
                            onChange={event => this.setState({gender: event.target.value})}>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"male"}>Hombre
							</MenuItem>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"female"}>Mujer
							</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem>
                        <InputLabel htmlFor="blood-type" className={classes.selectLabel}style={{paddingLeft:'15px', "&:focus":{display:'none'}}}>
                            Grupo Sanguineo
						</InputLabel>
                        <Select fullWidth
							MenuProps={{
							  className: classes.selectMenu
							}}
							classes={{
							  select: classes.select
							}}
                            value={this.state.blood.type}
                            onChange={event => this.setState({ blood: { ...this.state.blood, type: event.target.value } })}
                            inputProps={{
                                name: "blood type",
                                id: "bloodType"
                            }}>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"A"}>A
							</MenuItem>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"B"}>B
							</MenuItem>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"AB"}>AB
							</MenuItem>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"O"}>O
							</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem style={{ marginBottom:'2rem'}}>
                        <InputLabel htmlFor="blood-type" className={classes.selectLabel}style={{paddingLeft:'15px'}}>
                            Factor RH
						</InputLabel>
                        <Select fullWidth
                           
							MenuProps={{
							  className: classes.selectMenu
							}}
							classes={{
							  select: classes.select
							}}
                            value={this.state.blood.rh}
                            onChange={event => this.setState({ blood: { ...this.state.blood, rh: event.target.value } })}
                            inputProps={{
                                name: "blood rh",
                                id: "bloodRh"
                            }}>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"+"}>+
							</MenuItem>
                            <MenuItem 
								classes={{
									root: classes.selectMenuItem,
									selected: classes.selectMenuItemSelected
								}}
								value={"-"}>-
							</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem>
                        <Button fullWidth color="primary" disabled={this.state.uploading} onClick={this.handleAddPatient}>
                            {this.state.uploading ? "Cargando..." : "Guardar"}
                        </Button>
                    </GridItem>
                </form>
           
		</FormControl>
        )
    }
}

export default withStyles(styles)(NewPatient)