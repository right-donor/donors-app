import React from 'react'

// REDUX IMPORT
import { connect } from 'react-redux';

/** UI Components */
import { Loading, Notification } from 'element-react'
/** GraphQL Queries */
import { searchUsers } from '../../graphql/queries'
/** AWS Amplify */
import { API, graphqlOperation } from 'aws-amplify'
/** Man made components */
import DonorSearch from './DonorSearch'
import DonorList from './DonorList'
import { updateUser } from '../../graphql/mutations'

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            searchTerm: "",
            searchResults: [],
            isSearching: false,
        };
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.setState({ user: this.props.user })
            if(this.props.user.hospital === null) {
                this.assignHospitalToAssistant("HGM106720")
            }            
        }
    }

    assignHospitalToAssistant = async hospitalId => {
        const input = {
            id: this.props.user.id,
            userHospitalId : hospitalId
        }
        const result = await API.graphql(graphqlOperation(updateUser, {input}))
        console.log(result.data.updateUser)
    }

    handleSearchChange = searchTerm => this.setState({ searchTerm: searchTerm.target.value })
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
        const { user } = this.state
        const { match, history } = this.props
        return !user ? <Loading fullscreen /> : (
            <>
                <DonorSearch
                    handleSearch={this.handleSearch}
                    isSearching={this.state.isSearching}
                    searchTerm={this.state.searchTerm}
                    handleSearchChange={this.handleSearchChange}
                    handleClearSearch={this.handleSearchClear}
                    user={user} />
                <DonorList match={match} history={history} user={user} searchResults={this.state.searchResults} />
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Homepage)