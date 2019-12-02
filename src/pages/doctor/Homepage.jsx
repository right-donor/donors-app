import React from 'react'

/** GraphQL Statements */
import {searchPatients, getUser} from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

/** Manmade components */
import NewPatient from './NewPatient'
import PatientList from './PatientList'

/** Element UI */
import {Notification} from 'element-react'
import Exploration from '../exploration'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade'
import { withStyles  } from "@material-ui/core/styles";
import Button from '../../useful/CustomButtons/Button'
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import Container from "@material-ui/core/Container";
import doc from "../../assets/img/doctor.jpg"

class Homepage extends React.Component {
    state = {
        searchTerm: "",
        searchResults: [],
        isSearching: false,
        user: null,
        showInitialForm: false,
        open:false,
    }

    componentDidMount =  () => {
        if(this.props.userdb){
            this.setState({user: this.props.userdb, showInitialForm: this.props.userdb.firstname === null})
            Notification({
                title: 'Welcome',
                message: "Welcome back "+this.props.userdb.firstname+" "+this.props.userdb.lastname
            })
        }
    }

    retrieveUserFromDB = async (id) => {
        const qparams = {
            id,
            userHospitalId: "bba6f559-52be-4e0d-8700-60cea7918889"

        }
        const userdb = await API.graphql(graphqlOperation(getUser, qparams))

        this.setState({
            user: userdb.data.getUser,
            showInitialForm: userdb.data.getUser.canDonateFrom === null
        })
    }

    refreshUserData = () => {
        this.retrieveUserFromDB(this.props.userdb.id)
    }

    handleSearchChange = searchTerm => this.setState({searchTerm})
    handleSearchClear = () => this.setState({searchTerm: "", searchResults: []})
    handleSearch = async event => {
        try {
            event.preventDefault()
            this.setState({isSearching: true})
            const result = await API.graphql(graphqlOperation(searchPatients, {
                filter: {
                    or: [
                        {firstname: {match: this.state.searchTerm}},
                        {lastname: {match: this.state.searchTerm}},
                    ]
                }
            }))
            this.setState({searchResults: result.data.searchPatients.items, isSearching: false})
        } catch (err) {
            this.setState({isSearching: false})
            Notification({
                title: "Error",
                message: "An error occurred while searching",
                type: "error"
            })
        }
    }

    handleOpen =()=>{
        this.setState({
            open:true,
        })
    }
    handleClose =()=>{
        this.setState({
            open:false,
        })
    }
    render() {
    const {classes} = this.props;
    return this.state.showInitialForm ? <Exploration 
        refresh={this.refreshUserData} 
        user={this.props.userdb}/> : (
        <>
            {/*<div style={{marginBottom:'3rem',height:'25vh', backgroundImage:'url('+ doc+')', backgroundPosition:'center',backgroundSize:'cover'}}>
            </div>*/}
            <Container maxWidth='lg'>
                <div style={{display:'flex'}}>
                    <Button color="primary" onClick={()=>this.handleOpen()} style={{marginLeft:'auto',marginRight:'auto'}}>
                        Agregar Paciente
                    </Button>
                </div>
                <Modal
                    open={this.state.open}
                    onClose={()=>this.handleClose()}
                    closeAfterTransition
                    style={{display:'flex'}}
                >
                <Fade in ={this.state.open}>
                    <div style={{marginLeft:'auto', marginRight:'auto'}}>
                        <NewPatient
                            handleSearch={this.handleSearch}
                            isSearching={this.state.isSearching}
                            searchTerm={this.state.searchTerm}
                            handleSearchChange={this.handleSearchChange}
                            handleClearSearch={this.handleSearchClear}
                            user={this.state.user}/>
                    </div>
                </Fade>
                </Modal>
        
                 <PatientList style={{textAlign:'center'}} searchResults={this.state.searchResults}/>
            </Container>
           
        </>
    )
    }
}

export default withStyles(styles)(Homepage);
