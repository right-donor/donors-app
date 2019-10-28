import React from "react"
/** GraphQL Operations */
import {updatePatient,createPatient} from '../../../graphql/mutations'
/** Amplify elements */
import { PhotoPicker } from 'aws-amplify-react'
import aws_exports from '../../../aws-exports'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
/** Design elements */
import { Form, Button, Input, Notification, Progress, Dialog, Select, DatePicker } from 'element-react'

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

    handleAddPatient = async () => {
        // Retrieve the hospital Id from the props
        const hospitalId = this.props.user.hospital.id
        // Start uploading the photo to S3
        this.setState({isUploading: true})
        // Add visibility
        const visibility = "public"
		const { identityId } = await Auth.currentCredentials()
        const filename = `/${visibility}/${identityId}/${Date.now()}-${this.state.image.name}`
        
		const uploadedFile = await Storage.put(filename, this.state.image.file, {
			contentType: this.state.image.type,
			progressCallback: progress => {
			console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
			const percentUploaded = Math.round((progress.loaded / progress.total) * 100)
				this.setState({percentUploaded})
			}})
			
        const file = {
            key: uploadedFile.key,
            bucket: aws_exports.aws_user_files_s3_bucket,
            region: aws_exports.aws_project_region
        }

        const input = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            gender: this.state.gender,
            photo: file,
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
        return (
        <>
            <div className="market-header">
                {/** Title and edit button */}
                <h1 className="market-title">
                    Add a Patient 
                    <Button 
                        type="text" 
                        icon="edit" 
                        className="market-title-button" 
                        onClick={() => this.setState({addPatientDialog: true})}/>
                </h1>
                {/** Elastic Search */}
                <Form 
                    inline={true}
                    onSubmit={this.props.handleSearch}>
                        <Form.Item>
                            <Input
                                placeholder="Search patients..."
                                icon="circle-cross"
                                onIconClick={this.props.handleClearSearch}
                                onChange={this.props.handleSearchChange}
                                value={this.props.searchTerm}/>

                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="info"
                                icon="search"
                                onClick={this.props.handleSearch}
                                loading={this.props.isSearching}>
                                    Search
                                </Button>
                        </Form.Item>
                    </Form>
            </div>
            {/** Patient Creation dialog */}
            <Dialog
                title="Add a new patient"
                visible={this.state.addPatientDialog}
                onCancel={() => this.setState({addPatientDialog: false})}
                size="large"
                customClass="dialog">
                    <Dialog.Body>
                        <Form labelPosition="top">
                            <Form.Item
                                label="First name">
                                    <Input
                                        placeholder="John"
                                        trim={true}
                                        onChange={firstname => this.setState({firstname})}/>
                                </Form.Item>
                                <Form.Item
                                label="Last name">
                                    <Input
                                        placeholder="Wick"
                                        trim={true}
                                        onChange={lastname => this.setState({lastname})}/>
                                </Form.Item>
                                <Form.Item
                                label="Day of Birth">
                                    <DatePicker
                                        isShowTime={true}
                                        value={this.state.birthday}
                                        placeholder="Pick a day"
                                        onChange={date=>{this.setState({date})}}
                                        disabledDate={time=>time.getTime() > Date.now()}
                                        />
                                </Form.Item>
                                <Form.Item
                                    label="Gender">
                                        <Select 
                                            value={this.state.gender}
                                            onChange={gender => this.setState({gender})}>
                                                {this.state.genderOptions.map(el => {
                                                    return <Select.Option 
                                                        key={el.value} 
                                                        label={el.label}
                                                        value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Blood Group">
                                        <Select 
                                            onChange={type => this.setState({blood: {...this.state.blood, type}})}
                                            value={this.state.blood.type}>
                                                {this.state.bloodOptions.map(el => {
                                                    return <Select.Option 
                                                        key={el.value} 
                                                        label={el.label}
                                                        value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Blood RH">
                                        <Select
                                            onChange={rh => this.setState({blood: {...this.state.blood, rh}})}
                                            value={this.state.blood.rh}>
                                                {this.state.rhOptions.map(el => {
                                                    return <Select.Option 
                                                        key={el.value} 
                                                        label={el.label}
                                                        value={el.value}/>
                                                })}
                                        </Select>
                                </Form.Item>
                                {this.state.percentUpload > 0 &&
                                    <Progress
                                        type="circle"
                                        status="success"
                                        className="progress"
                                        percentage={this.state.percentUpload}/>
                                }
                                <PhotoPicker
                                    title="Patient Photo"
                                    onLoad={imagePreview => this.setState({imagePreview})}
                                    onPick={image => this.setState({image})}
                                    preview="visible"
                                    />
                                    <Form.Item>
                                        <Button
                                            loading={this.state.isUploading}
                                            disabled={!this.state.firstname 
                                                        || !this.state.lastname 
                                                        || !this.state.birthday 
                                                        || !this.state.gender 
                                                        || !this.state.blood
                                                        || !this.state.image}
                                            type="primary"
                                            onClick={this.handleAddPatient}>
                                                {this.state.isUploading ? 'Uploading...' : 'Add Patient'}
                                            </Button>
                                    </Form.Item>
                        </Form>
                    </Dialog.Body>
            </Dialog>
        </>
        )
    }
}

export default NewPatient