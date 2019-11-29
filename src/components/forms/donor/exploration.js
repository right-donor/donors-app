import React from 'react'

/** Amplify Libraries */
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify'
import { PhotoPicker } from 'aws-amplify-react'
import aws_exports from '../../../aws-exports'


/** API and GraphQL Calls */
import { updateUser } from '../../../graphql/mutations'

/** Material UI Stuff */
import { Paper, Select, MenuItem, InputLabel} from "@material-ui/core"
import styles from "../../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import GridContainer from '../../../useful/Grid/GridContainer'
import GridItem from '../../../useful/Grid/GridItem'
import Button from '../../../useful/CustomButtons/Button'
import Typography from '../../../useful/Typography/Primary'
import CustomInput from '../../../useful/CustomInput/CustomInput'

/** Date components */
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

/**
 * Initial Exploration Form when the user first signs in
 */
class Exploration extends React.Component {

    state = {
        firstname: "",
        lastname: "",
        birthday: new Date(),
        photo: "",
        blood: {
            type: "",
            rh: ""
        },
        city: "",
        imagePreview: "",
        image: "",
        uploading: false,
        percentUploaded: 0
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.setState({ user: this.props.user })
        }
    }

    handleSelectedDate = birthday => {
        this.setState({ birthday })
    }

    handleSubmit = async () => {
        try {
            // Start setting up the photo's metadata
            this.setState({ uploading: true })
            const visibility = 'public'
            const { identityId } = await Auth.currentCredentials()
            const filename = `/${visibility}/${identityId}/${Date.now()}-${this.state.image.name}`
            // Upload the photo to S3
            const uploadedFile = await Storage.put(filename, this.state.image.file, {
                contentType: this.state.image.type,
                progressCallback: progress => {
                    const percentUploaded = Math.round((progress.loaded / progress.total) * 100)
                    this.setState({ percentUploaded })
                }
            })
            // Once uploaded,create a photo object
            const photo = {
                key: uploadedFile.key,
                bucket: aws_exports.aws_user_files_s3_bucket,
                region: aws_exports.aws_project_region
            }
            // Finally, add it to the state
            this.setState({ photo, uploading: false })
            // Create the updated object
            const input = {
                id: this.props.user.id,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthday: this.state.birthday,
                photo: this.state.photo,
                city: this.state.city,
                blood: this.state.blood,
                canDonateFrom: new Date().toISOString()
            }
            //Commit it to the database
            await API.graphql(graphqlOperation(updateUser, { input }))
            this.props.refresh()
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }

    render() {
        return (
            <Paper style={{textAlign: 'center', color: '#E1B7BD', padding: '1rem'}}>
            <GridContainer
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center">
                <form className={""} autoComplete="on">
                    <GridItem>
                        <Typography variant="h3">
                            Exploratory Form
                        </Typography>
                    </GridItem>
                    <GridItem>
						<CustomInput
							labelText="First Name"
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
							labelText="Last Name"
							id="lastname"
                            value={this.state.firstname}
                            onChange={event => this.setState({ lastname: event.target.value })}
							formControlProps={{
							  fullWidth: true
							}}
						  />
                    </GridItem>
                    <GridItem>
                    <InputLabel htmlFor="blood-type">
                            City
                    </InputLabel>
                        <Select
                            value={this.state.city}
                            onChange={event => this.setState({city: event.target.value})}
                            inputProps={{
                                name: "city",
                                id: "city"
                            }}>
                            <MenuItem value={"CDMX"}>CDMX</MenuItem>
                            <MenuItem value={"Monterrey"}>Monterrey</MenuItem>
                            <MenuItem value={"Guadalajara"}>Guadalajara</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="birthday"
                                label="Birthday"
                                format="yyyy-MM-dd"
                                value={this.state.birthday}
                                onChange={this.handleSelectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem>
                        <InputLabel htmlFor="blood-type">
                            Blood Type
                </InputLabel>
                        <Select
                            value={this.state.blood.type}
                            onChange={event => this.setState({ blood: { ...this.state.blood, type: event.target.value } })}
                            inputProps={{
                                name: "blood type",
                                id: "bloodType"
                            }}>
                            <MenuItem value={"A"}>A</MenuItem>
                            <MenuItem value={"B"}>B</MenuItem>
                            <MenuItem value={"AB"}>AB</MenuItem>
                            <MenuItem value={"O"}>O</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem>
                        <InputLabel htmlFor="blood-type">
                            Blood RH
                </InputLabel>
                        <Select
                            value={this.state.blood.rh}
                            onChange={event => this.setState({ blood: { ...this.state.blood, rh: event.target.value } })}
                            inputProps={{
                                name: "blood rh",
                                id: "bloodRh"
                            }}>
                            <MenuItem value={"+"}>+</MenuItem>
                            <MenuItem value={"-"}>-</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem>
                        <PhotoPicker
                            title="Profile Image"
                            preview="visible"
                            onLoad={imagePreview => this.setState({ imagePreview })}
                            onPick={image => this.setState({ image })}
                            theme={{
                                formSection: {
                                    width: "15rem"
                                }
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <Button color="primary" disabled={this.state.uploading} onClick={this.handleSubmit}>
                            {this.state.uploading ? "Uploading..." : "Submit"}
                        </Button>
                    </GridItem>
                </form>
            </GridContainer>
            </Paper>
        )
    }
}

export default Exploration