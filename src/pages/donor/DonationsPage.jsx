import React, { Component } from 'react';

import { connect } from 'react-redux';

/** Amplify Components */
import { API, graphqlOperation } from 'aws-amplify';
import { listDonations } from '../../graphql/queries';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import GridContainer from '../../useful/Grid/GridContainer';
import GridItem from '../../useful/Grid/GridItem';

import { Loading } from 'element-react'
import DonationItem from '../../components/DonationItem';

import {
    container,
    title
} from '../../assets/jss/material-kit-pro-react.js';
const styles = theme => ({
    container: {
        ...container,
        marginBottom: '50px'
    },
    title
});

class DonationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableDonations: []
        };
    }

    componentDidMount = async () => {
        if (this.props.user) {
            await this.listPossibleDonations();
        }
    }

    listPossibleDonations = async () => {
        if (this.props.user) {
            const { user } = this.props;
            var donationListing = await API.graphql(graphqlOperation(listDonations))

            const userBT = user.blood.type + user.blood.rh;

            donationListing = donationListing.data.listDonations.items.filter((donation) => {
                return donation.donatedBy === null
            });

            switch (userBT) {
                case 'A+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    });
                    break;
                case 'O+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    });
                    break;
                case 'B+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    });
                    break;
                case 'AB+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                    });
                    break;
                case 'A-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '-' })
                    });
                    break;
                case 'B-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '-' })
                    });
                    break;
                case 'AB-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    });
                    break;
                case 'O-': default:
                    break
            }
            this.setState({ availableDonations: donationListing });
        }
    }

    render() {
        const { availableDonations } = this.state;
        const { user, classes } = this.props;

        return !user && !availableDonations ? <Loading /> : (
            <GridContainer className={classes.container} spacing={4} justify='center' direction='column'>
                <GridItem xs={12} md={12} sm={12}>
                    <h3 className={classes.title}>Tus donaciones</h3>
                </GridItem>
                {user.donations.items.length !== 0 ?
                <>
                    {user.donations.items.map(donation => (
                        <GridItem xs={12} md={12} sm={12}>
                            <DonationItem donation={donation} user={user} />
                        </GridItem>
                    ))}
                </>
                : <h4> No has realizado donaciones. </h4>}
                {availableDonations.length !== 0 ?
                <>
                    {availableDonations.map(donation => (
                        <GridItem xs={12} md={12} sm={12}>
                            <DonationItem donation={donation} user={user} />
                        </GridItem>
                    ))}
                </>
                : <h4> No hay donaciones disponibles en este momento. </h4>}
            </GridContainer>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(DonationPage));