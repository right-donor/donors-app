import React, { Component } from 'react';

// Redux imports
import { connect } from 'react-redux';

import { S3Image } from 'aws-amplify-react';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import DateRange from '@material-ui/icons/DateRange';
import PinDrop from '@material-ui/icons/PinDrop';
import LocalHospital from '@material-ui/icons/LocalHospital';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Loading } from 'element-react';

// Useful imports
import GridContainer from '../useful/Grid/GridContainer';
import GridItem from '../useful/Grid/GridItem';
import InfoArea from '../useful/InfoArea/InfoArea';

import axios from 'axios';

import {
    container,
    title
} from '../assets/jss/material-kit-pro-react.js';
const styles = theme => ({
    container: {
        ...container,
        marginBottom: '50px',
    },
    profile: {
        textAlign: 'center',
        '& img': {
            maxWidth: '160px',
            width: '100%',
            margin: '0 auto',
            transform: 'translate3d(0, -50%, 0)'
        }
    },
    name: {
        marginTop: '-80px'
    },
    title: {
        ...title,
        position: 'relative',
        marginTop: '30px',
        minHeight: '32px',
        textDecoration: 'none'
    },
});

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: -1
        };
    }

    componentDidMount() {
        if (this.props.user) {
            this.getTokenAmount()
        }
    }

    getTokenAmount = async () => {
        await axios.get('http://3.222.166.83/rewards/read/'
            + this.props.user.id + '/'
            + 'user1')
            .then((res) => {
                console.log(res)
                this.setState({ tokens: res.data.tokens })
            })
            .catch((error) => {
                alert(JSON.stringify(error))
            })
    }

    render() {
        const { classes, user } = this.props;
        const { tokens } = this.state;

        return user ? (
            <GridContainer className={classes.container} justify='center' direction='column'>
                <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.profile}>
                        <div>
                            <S3Image
                                imgKey={user.photo.key}
                                theme={{
                                    photoImg: { backgroundColor: '#8c737d', maxWidth: '160px', maxHeight: '100%', borderRadius: '50%', margin: '0 auto', transform: 'translate3d(0, -50%, 0)' }
                                }}
                                onLoad={url => console.log(url)}
                            />
                        </div>
                        <div className={classes.name}>
                            <h3 className={classes.title}>{`${user.firstname} ${user.lastname}`}</h3>
                            <h6>
                                {user.type === 'donor' ? 'Donador' : 'Doctor'}
                            </h6>
                        </div>
                    </div>
                </GridItem>
                <GridContainer alignItems='center' justify='space-evenly' direction='row'>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea 
                            title='Edad'
                            description={new Date().getFullYear() - new Date(user.birthday).getFullYear()}
                            icon={DateRange}
                            iconColor='rose'
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {user.type === 'donor' ? 
                            (<InfoArea 
                                title='Tokens'
                                description={tokens !== -1 ? tokens : <Loading />}
                                icon={MonetizationOn}
                                iconColor='rose'
                            />) :
                            (<InfoArea 
                                title='Ciudad'
                                description={user.city}
                                icon={PinDrop}
                                iconColor='rose'
                            />)
                        }
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea 
                            title='Tipo de sangre'
                            description={`${user.blood.type}${user.blood.rh}`}
                            icon={LocalHospital}
                            iconColor='rose'
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer alignItems='center' justify='space-evenly' direction='row'>
                    <GridItem xs={12} sm={12} md={4}>
                        {user.type === 'doctor' ? 
                            (<InfoArea 
                                title='Hospital'
                                description={user.hospital ? user.hospital.name : 'Woops' }
                                icon={LocalHospital}
                                iconColor='rose'
                            />) :
                            (<InfoArea 
                                title='Ciudad'
                                description={user.city}
                                icon={PinDrop}
                                iconColor='rose'
                            />)
                        }
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title='¿Puedes donar?'
                            description={new Date() - new Date(user.canDonateFrom) < 0 ? 'Sí' : 'No'}
                            icon={ScheduleIcon}
                            iconColor='rose'
                        />
                    </GridItem>
                </GridContainer>
            </GridContainer>
        ) : null
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(Profile));