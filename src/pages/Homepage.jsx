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
