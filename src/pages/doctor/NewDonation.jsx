import React from "react"
/** GraphQL Operations */
import { createDonation } from '../../graphql/mutations'
/** Amplify elements */
import { Auth, API, graphqlOperation } from 'aws-amplify'

/** Redux imports */
import { connect } from 'react-redux';
import { patientSaved } from '../../actions';

/** Design elements */
import { Notification } from 'element-react'

/** Material UI Stuff */
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import GridItem from '../../useful/Grid/GridItem'
import Button from '../../useful/CustomButtons/Button'
import Primary from '../../useful/Typography/Primary'
import CustomInput from '../../useful/CustomInput/CustomInput'

/** Date components */
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const initialState = {
	dateNeeded: new Date(),
    donationAssignedToId : "",
    bloodType: "",
    bagAmount: "",
    donationHospitalId: {}
}

class NewDonation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
			dateNeeded: new Date(),
            donationAssignedToId : "787afe61-e55d-4740-b5a4-2f9dcc98d1e0",
            bloodType: "O -",
            bagAmount: "500",
            donationHospitalId: "HGM106720"
        };
    }

    handleSelectedDate = dateNeeded => {
        this.setState({ dateNeeded })
    }

    handleAddDonation = async () => {
        const blood = this.state.bloodType.split(' ')
        const input = {
            dateNeeded: this.state.dateNeeded,
            donationAssignedToId : this.props.patient.id,
            bloodType: {
                type: blood[0],
                rh: blood[1]
            },
            bagAmount: this.state.bagAmount,
            donationHospitalId: this.props.patient.hospital.id
        }

        try {
            API.graphql(graphqlOperation(createDonation, { input })).then(({ data }) => {
                console.log(data.createdonation)
                Notification({
                    title: "Success!",
                    message: "Added donation successfully!",
                    type: 'success'
                })
                this.setState({ ...initialState })
                this.props.saveDonation(this.props.user.id);
            })
        } catch (err) {
            Notification({
                title: "Error",
                message: err.errors[0].message,
                type: 'error'
            })
        }
    }

    render() {
        const { classes } = this.props;
        console.log('Paciente', this.props.patient)
        console.log('User ', this.props.user)

        return (
            <FormControl className={classes.selectFormControl} style={{ marginLeft: 'auto', marginRight: 'auto' }}>

                <form className={""} autoComplete="on" style={{ maxWidth: '100%', backgroundColor: '#fff', padding: '2.5rem 2rem', borderRadius: '.7rem', marginLeft: 'auto', marginRight: 'auto' }}>
                    <GridItem>
                        <Primary>
                            <h2>Agregar donacion</h2>
                        </Primary>
                    </GridItem>
                    <GridItem>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                margin="normal"
                                label="Para cuando"
                                id="birthday"
                                format="yyyy-MM-dd"
                                value={this.state.dateNeeded}
                                onChange={this.handleSelectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                                style={{ width: '100%' }}
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem>
                        <InputLabel htmlFor="blood-type" className={classes.selectLabel} style={{ paddingLeft: '15px', "&:focus": { display: 'none' } }}>
                            Grupo Sanguineo
						</InputLabel>
                        <Select fullWidth
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={this.state.bloodType}
                            onChange={event => this.setState({ bloodType: event.target.value })}
                            inputProps={{
                                name: "blood type",
                                id: "bloodType"
                            }}>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"A +"}>A +
							</MenuItem>
							<MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"A -"}>A -
							</MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"B +"}>B +
							</MenuItem>
							<MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"B -"}>B -
							</MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"AB +"}>AB +
							</MenuItem>
							<MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"AB -"}>AB -
							</MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"O +"}>O +
							</MenuItem>
							<MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={"O -"}>O -
							</MenuItem>
                        </Select>
                    </GridItem>
					<GridItem>
                        <CustomInput
                            labelText="Cantidad de sangre requerida"
                            id="bagAmount"
                            value={this.state.bagAmount}
                            inputProps={{
                                onChange: event => this.setState({ bagAmount: event.target.value })
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <Button fullWidth color="primary" onClick={this.handleAddDonation}>
                            "Guardar"
                        </Button>
                    </GridItem>
                </form>

            </FormControl>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    saveDonation: (userID) => {
        dispatch(patientSaved(userID));
    }
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(NewDonation))