import React from 'react'

/** Amplify Components */
import { API, graphqlOperation } from 'aws-amplify'

import classNames from 'classnames';

import AccountBox from '@material-ui/icons/AccountBox';
import Header from '../../useful/Header/Header';

import { masterLogin, logout } from '../../actions';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
// react components for routing without refresh
import { Link, Route } from 'react-router-dom';
import Button from '../../useful/CustomButtons/Button';
import Favorite from '@material-ui/icons/Favorite';

import Footer from '../../useful/Footer/Footer';
/** GraphQL Operations */
import { Loading } from 'element-react'
import DonationItem from '../../components/DonationItem'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Store from '@material-ui/icons/Store';
import Healing from '@material-ui/icons/Healing';
import LocalHospital from '@material-ui/icons/LocalHospital';
  // styles imports ../assets/jss/material-kit-pro-react.js
  import {
    container,
    main,
    mainRaised,
    mlAuto,
    grayColor
  } from '../../assets/jss/material-kit-pro-react.js';

const getUser = `query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        items {
          id
          dateNeeded
          dateFulfilled
          bloodBagId
          bagAmount
          donatedBy {
              id
          }
          hospital {
              name
              address_line1
          }
        }
        nextToken
      }
      patients {
        items {
          id
          firstname
          lastname
          birthday
          gender
        }
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
        bloodresults {
          vih
          hepatitisB
          hepatitisC
          syphilis
          chagas
        }
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
        doctors {
          nextToken
        }
        patients {
          nextToken
        }
        donations {
          nextToken
        }
      }
    }
  }
  `;

const listDonations = `query ListDonations(
    $filter: ModelDonationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateNeeded
        dateFulfilled
        donatedBy {
          id
          firstname
          lastname
          birthday
          username
          email
          gender
          phonenumber
          type
          city
          canDonateFrom
        }
        assignedTo {
          id
          firstname
          lastname
          birthday
          gender
          blood {
              type
              rh
          }
        }
        bloodBagId
        bloodType {
          type
          rh
        }
        bagAmount
        hospital {
          id
          name
          country
          address_line1
          address_state
          address_zip
        }
      }
      nextToken
    }
  }
  `

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
class DonationsPage extends React.Component {

    state = {
        user: null,
        availableDonations: null
    }

    componentDidMount = async () => {
        if (this.props.user) {
            console.log("lo mate")
            console.log(this.props)
            await this.getUserFromGraphQL(this.props.user.id)
            await this.listPossibleDonations()
        }
    }

    getUserFromGraphQL = async userId => {
        const result = await API.graphql(graphqlOperation(getUser, { id: userId }))
        this.setState({ user: result.data.getUser })
    }

    listPossibleDonations = async () => {
        if (this.state.user) {
            /** Get user from state */
            const { user } = this.state
            /** Get all listings */
            var donationListing = await API.graphql(graphqlOperation(listDonations))
            /** Get user blood type */
            const userBT = user.blood.type + user.blood.rh
            /** Only show donations with no assigned donor */
            donationListing = donationListing.data.listDonations.items.filter(function (donation) {
                return donation.donatedBy === null
            })
            /** Only show blood compatible donation listings */
            switch (userBT) {
                case 'A+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'O+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'B+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'AB+':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                    })
                    break
                case 'A-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'A', rh: '-' })
                    })

                    break
                case 'B-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'B', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '-' })
                    })
                    break
                case 'AB-':
                    donationListing = donationListing.filter(function (donation) {
                        return JSON.stringify(donation.assignedTo.blood) === JSON.stringify(user.blood)
                            || JSON.stringify(user.blood) === JSON.stringify({ type: 'AB', rh: '+' })
                    })
                    break
                case 'O-': default:
                    break
            }
            this.setState({ availableDonations: donationListing })
        }
    }

    render() {
          const { 
            classes, 
            img,
            userC
        } = this.props;
        const { userData } = this.state;
        return !this.state.user && !this.state.availableDonations ? <Loading /> : (
            <>
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
                <h1> Your donations </h1>
                {/** Personal Donations */}
                {this.state.user.donations.items.length !== 0 ?
                    <>
                        {this.state.user.donations.items.map(donation => (
                            <DonationItem donation={donation} user={this.state.user} />
                        ))}
                    </> : <h2> No donations have been performed </h2>}
                {/** All other donations */}
                {this.state.availableDonations !== null ?
                    <>
                        <h3> Donations Available </h3>
                        {this.state.availableDonations.map(donation => (
                            <DonationItem donation={donation} user={this.state.user} />
                        ))}
                    </> :
                    <>
                        <h3> There are no donations available to select right now</h3>
                    </>
                }
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
            </>
        )
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DonationsPage));