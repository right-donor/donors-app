import React, { Component } from 'react';

// prop validation import
import PropTypes from 'prop-types';
// react components for routing without refresh
import { Link, Route } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

// useful components
import GridContainer from '../useful/Grid/GridContainer';
import GridItem from '../useful/Grid/GridItem';

// more style components
import { Loading } from 'element-react';

const styles = theme => ({

});

class DonorHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInitialForm: this.props.userData.canDonateFrom === null
        };
    }

    render() {
        
    }
}

DonorHomepage.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default withStyles(styles)(DonorHomepage);