import React, { Component } from 'react';

// prop validation import
import PropTypes from 'prop-types';
// react components for routing without refresh
import { Link, Route, withRouter } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
import AccountBox from '@material-ui/icons/AccountBox';
import Store from '@material-ui/icons/Store';
import Healing from '@material-ui/icons/Healing';
import LocalHospital from '@material-ui/icons/LocalHospital';

// useful components
import Header from '../useful/Header/Header';
import GridContainer from '../useful/Grid/GridContainer';
import GridItem from '../useful/Grid/GridItem';
import Parallax from '../useful/Parallax/Parallax';
import Footer from '../useful/Footer/Footer';
import Button from '../useful/CustomButtons/Button';

/** AWS Amplify Components */
import { Auth, API, graphqlOperation } from 'aws-amplify';

/** GraphQL Operations */
import { getUser } from '../graphql/queries';

/** Redux imports */
import { connect } from 'react-redux';
import { masterLogin, logout } from '../actions';

/** DOCTOR COMPONENTS */
import DoctorHomepage from './doctor/Homepage.jsx';

// styles imports
import {
    container,
    main,
    mainRaised,
    mlAuto,
    grayColor
} from '../assets/jss/material-kit-pro-react.js';

const styles = theme => ({
    container,
    main: {
        ...main
    },
    mainRaised: {
        ...mainRaised,
    },
    parallax: {
        height: '380px',
    },
    left: {
        float: 'left!important',
        display: 'block',
    },
    right: {
        padding: '15px 0',
        margin: '0',
        float: 'right',
    },
    list: {
        marginBottom: '0',
        padding: '0',
        marginTop: '0',
    },
    inlineBlock: {
        display: 'inline-block',
        padding: '0px',
        width: 'auto',
    },
    block: {
        color: 'inherit',
        padding: '0.9375rem',
        fontWeight: '500',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        textDecoration: 'none',
        position: 'relative',
        display: 'block',
    },
    icon: {
        widht: '18px',
        height: '18px',
        top: '3px',
        position: 'relative',
    },
    progress: {
        ...mlAuto,
        marginTop: '50px',
        marginBottom: '50px',
    },
    mlAuto,
    listNav: {
        [theme.breakpoints.up("md")]: {
            WebkitBoxAlign: 'center',
            MsFlexAlign: 'center',
            alignItems: 'center',
            WebkitBoxOrient: 'horizontal',
            WebkitBoxDirection: 'normal',
            MsFlexDirection: 'row',
            flexDirection: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginTop: '0px',
        display: 'flex',
        paddingLeft: '0',
        marginBottom: '0',
        listStyle: 'none',
        padding: '0',
    },
    listItem: {
        float: 'left',
        color: 'inherit',
        position: 'relative',
        display: 'block',
        width: 'auto',
        margin: '0',
        padding: '0',
        [theme.breakpoints.down('sm')]: {
            '& ul': {
                maxHeight: '400px',
                overflow: 'scroll',
            },
            width: '100%',
            '&:not(:last-child)': {
                '&:after': {
                    width: 'calc(100% - 30px)',
                    content: '""',
                    display: 'block',
                    height: '1px',
                    marginLeft: '15px',
                    backgroundColor: grayColor[14],
                },
            },
        },
    },
    listItemText: {
        padding: '0 !important'
    },
    navLink: {
        color: 'inherit',
        position: 'relative',
        padding: '0.9375rem',
        fontWeight: '400',
        fontSize: '14px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        marginRight: '10px',
        display: 'inline-flex',
        '&:hover,&:focus': {
            color: 'inherit'
        },
        '& .fab,& .far,& .fal,& .fas,& .material-icons': {
            position: 'relative',
            top: '2px',
            marginTop: '-4px',
            marginRight: '4px',
            marginBottom: '0px',
            fontSize: '1.25rem'
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 30px)',
            marginLeft: '15px',
            marginBottom: '8px',
            marginTop: '8px',
            textAlign: 'left',
            '& > span:first-child': {
                justifyContent: 'flex-start'
            }
        },
        '& svg': {
            marginRight: '3px',
            width: '20px',
            height: '20px'
        }
    },
    navLinkJustIcon: {
        '& .fab,& .far,& .fal,& .fas,& .material-icons': {
            marginRight: '0px'
        },
        '& svg': {
            marginRight: '0px'
        }
    },
    navButton: {
        position: 'relative',
        fontWeight: '400',
        fontSize: '12px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 30px)',
            marginLeft: '15px',
            marginBottom: '5px',
            marginTop: '5px',
            textAlign: 'left',
            '& > span:first-child': {
                justifyContent: 'flex-start'
            }
        },
        '& $icons': {
            marginRight: '3px'
        }
    }
});

const HeaderLinks = ({ classes, userType, handleSignOut, match }) => {
    return (
        <List className={classNames(classes.listNav, classes.mlAuto)}>
            {userType &&
                userType === 'donor' ? (
                    <>
                        <ListItem className={classes.listItem}>
                            <Link to='/' className={classes.navLink}>
                                <AccountBox />
                                Perfil
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to='/' className={classes.navLink}>
                                <Store />
                                Tienda
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to='/' className={classes.navLink}>
                                <Healing />
                                Donaciones
                            </Link>
                        </ListItem>
                    </>
                ) : userType === 'doctor' ? (
                    <>
                        <ListItem className={classes.listItem}>
                            <Link to={match.path} className={classes.navLink}>
                                <AccountBox />
                                Perfil
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to={`${match.path}/pacientes`} className={classes.navLink}>
                                <LocalHospital />
                                Pacientes
                            </Link>
                        </ListItem>
                    </>
                ) :
                    (
                        <>
                            <ListItem className={classes.listItem}>
                                <Link to='/' className={classes.navLink}>
                                    <Healing />
                                    Donadores
                            </Link>
                            </ListItem>
                        </>
                    )
            }
            <ListItem className={classes.listItem}>
                <Button
                    onClick={() => handleSignOut()}
                    color={window.innerWidth < 960 ? "primary" : "white"}
                    className={classes.navButton}
                    round
                >
                    Cerrar sesión
                </Button>
            </ListItem>
        </List>
    )
}

class Homepage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            userData: this.props.user ? this.props.user : null
        };

        this.getUserFromDB();

        this.handleSignOut = this.handleSignOut.bind(this);
        this.getUserFromDB = this.getUserFromDB.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getUserFromDB = () => {
        API.graphql(graphqlOperation(getUser, { id: this.props.userC.username }))
            .then(({ data }) => {
                if (data.getUser && this._isMounted) {
                    console.log(data.getUser);
                    this.setState({ userData: data.getUser });
                    this.props.saveUser(data.getUser);
                }
            })
            .catch(err => console.error(err));
    }

    /**
     * Sign out of Cognito Auth component
     */
    handleSignOut = async () => {
        const { history } = this.props;
        try {
            await Auth.signOut();
            this.props.logout();
            history.push('/');
        } catch (err) {
            alert("An error has occured while trying to sign out")
        }
    }

    render() {
        const {
            classes,
            img,
            userC,
            match,
            history
        } = this.props;
        const { userData } = this.state;
        console.log('Match and History: ', match, history);

        return (
            <div>
                <Header
                    brand='Right Donor'
                    fixed
                    color='transparent'
                    changeColorOnScroll={{
                        height: 200,
                        color: 'primary'
                    }}
                    links={<HeaderLinks match={match} classes={classes} userType={userData ? userData.type : null} handleSignOut={this.handleSignOut} />}
                />
                <Parallax image={img ? img : require('../assets/img/header.png')} filter='primary' className={classes.parallax} />

                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12} md={12}>

                                {!userData ? <CircularProgress color='primary' /> :

                                    userData.type === 'donor' ? (
                                        <>
                                            <Route path='/donor/perfil' />
                                            <Route path='/tienda' />
                                            <Route path='/donor/donaciones' />
                                        </>
                                    ) : userData.type === 'doctor' ? (
                                        <>
                                            <DoctorHomepage />
                                            <Route path='/doctor/perfil' />
                                        </>
                                    ) :
                                            (
                                                <>
                                                    <Route path='/asistente/donadores' />
                                                </>
                                            )

                                }

                            </GridItem>
                        </GridContainer>
                    </div>
                </div>

                <Footer
                    content={
                        <div>
                            <div className={classes.left}>
                                <List className={classes.list}>
                                    <ListItem className={classes.inlineBlock}>
                                        <a
                                            href='https://github.com/right-donor'
                                            rel='noopener noreferrer'
                                            target='_blank'
                                            className={classes.block}
                                        >
                                            Right Donor
                                        </a>
                                    </ListItem>
                                    <ListItem className={classes.inlineBlock}>
                                        <a
                                            href='http://rightdonor.org'
                                            rel='noopener noreferrer'
                                            target='_blank'
                                            className={classes.block}
                                        >
                                            Acerca
                                        </a>
                                    </ListItem>
                                </List>
                            </div>
                            <div className={classes.right}>
                                &copy; {1900 + new Date().getYear()} , made with {" "}
                                <Favorite className={classes.icon} /> by{' '}
                                <a
                                    href='https://github.com/right-donor'
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    Right Donor Team
                                </a>{' '}
                                for a better world.
                            </div>
                        </div>
                    }
                />

            </div>
        );
    }

}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    saveUser: (user) => {
        dispatch(masterLogin(user));
    },
    logout: () => {
        dispatch(logout());
    }
});

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
    userC: PropTypes.object.isRequired,
    img: PropTypes.string,
    user: PropTypes.object,
    saveUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Homepage)));
