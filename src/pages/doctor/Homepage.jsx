import React from 'react'
// prop validation import
import PropTypes from 'prop-types';

/** GraphQL Statements */
import { searchPatients } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

/** Manmade components */
import NewPatient from './NewPatient'
import PatientList from './PatientList'

/** Element UI */
import { Notification } from 'element-react'
import Exploration from '../exploration'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade'
import { withStyles } from "@material-ui/core/styles";
import Button from '../../useful/CustomButtons/Button'
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import Container from "@material-ui/core/Container";
import doc from "../../assets/img/doctor.jpg"

/** Redux imports */
import { connect } from 'react-redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            searchResults: [],
            isSearching: false,
            user: this.props.user,
            open: false,
        };

    }

    handleSearchChange = searchTerm => this.setState({ searchTerm })
    handleSearchClear = () => this.setState({ searchTerm: "", searchResults: [] })
    handleSearch = async event => {
        try {
            event.preventDefault()
            this.setState({ isSearching: true })
            const result = await API.graphql(graphqlOperation(searchPatients, {
                filter: {
                    or: [
                        { firstname: { match: this.state.searchTerm } },
                        { lastname: { match: this.state.searchTerm } },
                    ]
                }
            }))
            this.setState({ searchResults: result.data.searchPatients.items, isSearching: false })
        } catch (err) {
            this.setState({ isSearching: false })
            Notification({
                title: "Error",
                message: "An error occurred while searching",
                type: "error"
            })
        }
    }

    handleOpen = () => {
        this.setState({
            open: true,
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
        })
    }
    render() {
        const { classes, user } = this.props;
        return user ? (user.firstname === null ? <Exploration
            user={user} /> : (
                <>
                    {/*<div style={{marginBottom:'3rem',height:'25vh', backgroundImage:'url('+ doc+')', backgroundPosition:'center',backgroundSize:'cover'}}>
            </div>*/}
                    <Container maxWidth='lg'>
                        <div style={{ display: 'flex' }}>
                            <Button color="primary" onClick={() => this.handleOpen()} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                Agregar Paciente
                    </Button>
                        </div>
                        <Modal
                            open={this.state.open}
                            onClose={() => this.handleClose()}
                            closeAfterTransition
                            style={{ display: 'flex' }}
                        >
                            <Fade in={this.state.open}>
                                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                    <NewPatient
                                        handleSearch={this.handleSearch}
                                        isSearching={this.state.isSearching}
                                        searchTerm={this.state.searchTerm}
                                        handleSearchChange={this.handleSearchChange}
                                        handleClearSearch={this.handleSearchClear}
                                        user={user} />
                                </div>
                            </Fade>
                        </Modal>

                        <PatientList patients={user.patients.items} style={{ textAlign: 'center' }} searchResults={this.state.searchResults} />
                    </Container>

                </>
            )) : null
    }
}

Homepage.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(Homepage));
