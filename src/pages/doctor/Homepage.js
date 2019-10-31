import React from 'react'

/** GraphQL Statements */
import {searchPatients, getUser} from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

/** Manmade components */
import NewPatient from '../../components/forms/doctor/NewPatient'
import PatientList from '../../components/PatientList'

/** Element UI */
import {Notification} from 'element-react'
import Exploration from '../../components/forms/donor/exploration'

class Homepage extends React.Component {
    state = {
        searchTerm: "",
        searchResults: [],
        isSearching: false,
        user: null,
        showInitialForm: false
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

    render() {
    return this.state.showInitialForm ? <Exploration 
        refresh={this.refreshUserData} 
        user={this.props.userdb}/> : (
        <>
           <NewPatient
            handleSearch={this.handleSearch}
            isSearching={this.state.isSearching}
            searchTerm={this.state.searchTerm}
            handleSearchChange={this.handleSearchChange}
            handleClearSearch={this.handleSearchClear}
            user={this.state.user}/>
           <PatientList searchResults={this.state.searchResults}/>
           </>
    )
    }
}

export default Homepage