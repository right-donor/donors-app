import React from 'react'

/** UI Components */
import { Loading, Notification } from 'element-react'
/** GraphQL Queries */
import { searchUsers, getUser } from '../../graphql/queries'
/** AWS Amplify */
import { API, graphqlOperation } from 'aws-amplify'
/** Man made components */
import DonorSearch from '../../components/DonorSearch'
import DonorList from '../../components/DonorList'
import Exploration from '../../components/forms/donor/exploration'
import { createHospital, updateUser } from '../../graphql/mutations'

class Homepage extends React.Component {
    state = {
        user: {},
        userdb: {},
        searchTerm: "",
        searchResults: [],
        isSearching: false,
        showInitialForm: false
    }

    componentDidMount = () => {
        if (this.props.user && this.props.userdb) {
            this.setState({
                user: this.props.user,
                userdb: this.props.userdb,
                showInitialForm: this.props.userdb.firstname === null
            })
            if(this.props.userdb.hospital === null) {
                this.createNewHospitalAndAssignToAssistant()
            }            
        }
    }

    createNewHospitalAndAssignToAssistant = async () => {
        const input = {
            name : "Hospital General de Mexico",
            country : "MX",
            address_line1: "Dr. Balmis 148, Doctores",
            address_state: "CDMX",
            address_zip: "06720"
        }
        const result = await API.graphql(graphqlOperation(createHospital,{input}))
        await this.assignHospitalToAssistant(result.data.createHospital.id)
    }

    assignHospitalToAssistant = async hospitalId => {
        const input = {
            id: this.props.userdb.id,
            userHospitalId : hospitalId
        }
        const result = await API.graphql(graphqlOperation(updateUser, {input}))
        console.log(result.data.updateUser)
    }

    refreshUserData = () => {
        this.retrieveUserFromDB(this.props.user.username)
    }

    retrieveUserFromDB = async (id) => {
        const qparams = {
            id
        }
        const userdb = await API.graphql(graphqlOperation(getUser, qparams))

        this.setState({
            userdb: userdb.data.getUser,
            showInitialForm: false
        })
    }

    handleSearchChange = searchTerm => this.setState({ searchTerm })
    handleSearchClear = () => this.setState({ searchTerm: "", searchResults: [] })
    handleSearch = async event => {
        try {
            event.preventDefault()
            this.setState({ isSearching: true })
            const result = await API.graphql(graphqlOperation(searchUsers, {
                filter: {
                    or: [
                        { firstname: { match: this.state.searchTerm } },
                        { lastname: { match: this.state.searchTerm } },
                    ]
                }
            }))
            this.setState({ searchResults: result.data.searchUsers.items, isSearching: false })
        } catch (err) {
            this.setState({ isSearching: false })
            Notification({
                title: "Error",
                message: "An error occurred while searching",
                type: "error"
            })
        }
    }

    render() {
        const { user, userdb, showInitialForm } = this.state
        return !user && !userdb ? <Loading fullscreen="true" /> : (
            <>
                {showInitialForm ? <Exploration refresh={this.state.refreshUserData} user={userdb} /> : (
                    <>
                        <DonorSearch
                            handleSearch={this.handleSearch}
                            isSearching={this.state.isSearching}
                            searchTerm={this.state.searchTerm}
                            handleSearchChange={this.handleSearchChange}
                            handleClearSearch={this.handleSearchClear}
                            user={this.state.userdb} />
                        <DonorList searchResults={this.state.searchResults} />
                    </>
                )}
            </>
        )
    }
}

export default Homepage