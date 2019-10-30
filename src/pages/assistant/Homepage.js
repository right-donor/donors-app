import React from 'react'

/** UI Components */
import {Loading} from 'element-react'
/** GraphQL Queries */
import { searchUsers } from '../../graphql/queries'
/** AWS Amplify */
import {API, graphqlOperation} from 'aws-amplify'
/** Man made components */
import DonorSearch from '../../components/DonorSearch'
import DonorList from '../../components/DonorList'

class Homepage extends React.Component {
    state = {
        user : {},
        userdb: {},
        searchTerm: "",
        searchResults : [],
        isSearching: false,
    }

    componentDidMount = () => {
        if(this.props.user && this.props.userdb){
            this.setState({
                user: this.props.user,
                userdb: this.props.userdb
            })
        }
    }

    handleSearchChange = searchTerm => this.setState({searchTerm})
    handleSearchClear = () => this.setState({searchTerm: "", searchResults: []})
    handleSearch = async event => {
        try {
            event.preventDefault()
            this.setState({isSearching: true})
            const result = await API.graphql(graphqlOperation(searchUsers, {
                filter: {
                    or: [
                        {firstname: {match: this.state.searchTerm}},
                        {lastname: {match: this.state.searchTerm}},
                    ]
                }
            }))
            this.setState({searchResults: result.data.searchUsers.items, isSearching: false})
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
        const {user,userdb} = this.state
        return !user && !userdb ? <Loading fullscreen="true"/> : (
            <>
            <DonorSearch
                handleSearch={this.handleSearch}
                isSearching={this.state.isSearching}
                searchTerm={this.state.searchTerm}
                handleSearchChange={this.handleSearchChange}
                handleClearSearch={this.handleSearchClear}
                user={this.state.userdb}/>
            <DonorList searchResults={this.state.searchResults}/>
            </>
        )
    }
}

export default Homepage