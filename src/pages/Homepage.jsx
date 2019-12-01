import React, { Component } from 'react';

// prop validation import
import PropTypes from 'prop-types';
// react components for routing without refresh
import { Link, Route } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import OpacityIcon from '@material-ui/icons/Opacity';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
import AccountBox from '@material-ui/icons/AccountBox';
import Store from '@material-ui/icons/Store';
import Healing from '@material-ui/icons/Healing';
import LocalHospital from '@material-ui/icons/LocalHospital';

import Paper from '@material-ui/core/Paper';

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
    },
    card: {
    maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});

const HeaderLinks = ({classes, userType, handleSignOut}) => {
    return(
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
                            <Link to='/' className={classes.navLink}>
                                <AccountBox />
                                Perfil
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to='/' className={classes.navLink}>
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
        API.graphql(graphqlOperation(getUser, {id: this.props.userC.username}))
            .then(({data}) => {
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
        try {
          await Auth.signOut();
          this.props.logout();
        } catch (err) {
          alert("An error has occured while trying to sign out")
        }
    }

    render() {
        const { 
            classes, 
            img,
            userC
        } = this.props;
        const { userData } = this.state;
        console.log(userC);
        // const [expanded, setExpanded] = React.useState(false);
        // const handleExpandClick = () => {
        //     setExpanded(!expanded);
        // };
        return(
            <div>
                <Header
                    brand='Right Donor'
                    fixed
                    color='transparent'
                    changeColorOnScroll={{
                        height: 300,
                        color: 'primary'
                    }}
                    links={<HeaderLinks classes={classes} userType={userData ? userData.type : null} handleSignOut={this.handleSignOut} />}
                />
                <Parallax image={img ? img : require('../assets/img/header.png')} filter='primary' className={classes.parallax} />

                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12} md={6}>
                                
                                {!userData ? <CircularProgress color='primary' /> :
                                
                                    userData.type === 'donor' ? (
                                        <>
                                            <Route path='/donor/perfil' />
                                            <Route path='/tienda' />
                                            <Route path='/donor/donaciones' />
                                        </>
                                    ) : userData.type === 'doctor' ? (
                                        <>
                                            <Route path='/doctor' />
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
                    <Paper className={classes.root}>
                        <Typography variant="h5" component="h3">
                            YOUR PROFILE
                        </Typography>
                        
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {this.state.userData.firstname[0] ? this.state.userData.firstname[0] : "N"}
                                </Avatar>
                                }
                                title={this.state.userData.firstname?this.state.userData.firstname+" "+this.state.userData.lastname:"complete name"}
                                subheader={this.state.userData.city ? this.state.userData.city : "CDMX"}
                            />
                            <CardMedia
                                className={classes.media}
                                image="data:image/jpeg;base64,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"
                                title="IDK"
                            />
                            <CardContent>
                                <List className={classes.root}>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <MonetizationOnIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Tokens" secondary="131" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <OpacityIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Donator since" secondary="Jan 9, 2014" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PhoneAndroidIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={this.state.userData?this.state.userData.phonenumber:"Phone Number"}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <LocalHospital />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Blood type" secondary={this.state.userData?this.state.userData.blood.type +""+this.state.userData.blood.rh:"bloodType"} />
                                    </ListItem>
                                </List>
                            </CardContent>
                            {/* <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                            </CardActions> */}
                        </Card>
                    </Paper>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Homepage));
