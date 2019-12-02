import React, { Component } from 'react';

// Redux imports
import { connect } from 'react-redux';

// Custom components
import Exploration from '../exploration';
import Profile from '../Profile';

class Homepage extends Component {
    render() {
        const { user } = this.props;

        return user ? (user.firstname === null ? <Exploration user={user} /> : <Profile />) : null
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Homepage);