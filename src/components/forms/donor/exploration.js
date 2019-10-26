import React from 'react'

/** Amplify Libraries */
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify'
import { PhotoPicker } from 'aws-amplify-react'
import aws_exports from '../../../aws-exports'


/** API and GraphQL Calls */
import { updateUser } from '../../../graphql/mutations'

/** Material UI Stuff */
import { Paper, TextField, Select, MenuItem, InputLabel, Button, Grid, Typography } from "@material-ui/core"

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
            <Paper style={{textAlign: 'center', color: 'gray', padding: '1rem'}}>
            <Grid
                container
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center">
                <form className={""} autoComplete="on">
                    <Grid item>
                        <Typography variant="h3">
                            Exploratory Form
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="firstname"
                            label="First Name"
                            className={"textField"}
                            value={this.state.firstname}
                            onChange={event => this.setState({ firstname: event.target.value })}
                            margin="normal"
                            variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="lastname"
                            label="Last Name"
                            className={"textField"}
                            value={this.state.lastname}
                            onChange={event => this.setState({ lastname: event.target.value })}
                            margin="normal"
                            variant="outlined" />
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item >
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
                    </Grid>
                    <Grid item >
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <Button disabled={this.state.uploading} onClick={this.handleSubmit}>
                            {this.state.uploading ? "Uploading..." : "Submit"}
                        </Button>
                    </Grid>
                </form>
            </Grid>
            </Paper>
        )
    }
}

export default Exploration