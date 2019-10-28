import React from 'react'

/** GraphQL Statements */
import {createPatient} from '../../graphql/mutations'
import {listPatients, searchPatients} from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

/** Manmade components */
import NewPatient from '../../components/forms/doctor/NewPatient'
import PatientList from '../../components/PatientList'

class Homepage extends React.Component {
    state = {
        searchTerm: "",
        searchResults: [],
        isSearching: false
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
                        {id : {match: this.state.searchTerm}}
                    ]
                }
            }))
            this.setState({searchResults: result.data.searchPatients.items, isSearching: false})
        } catch (err) {
            console.err(err)
        }
    }

    render() {
        return (
            <>
           <NewPatient
            handleSearch={this.handleSearch}
            isSearching={this.state.isSearching}
            searchTerm={this.state.searchTerm}
            handleSearchChange={this.handleSearchChange}
            handleClearSearch={this.handleSearchClear}/>
           <PatientList searchResults={this.state.searchResults}/>
           </>
        )
    }
}

export default Homepage