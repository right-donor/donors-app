import React from 'react'

/*** AWS Components */
import {API, graphqlOperation} from 'aws-amplify'
/** GraphQL Operations */
/** Element UI */
import { Loading } from 'element-react'
/** Material UI Stuff */
import { withStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/material-kit-pro-react/customSelectStyle.js';
/** Manmade components */
import Avatar from '../../components/avatar'
import ListInterviews from "ListInterview"

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
          assignedTo {
              id
          }
          hospital {
              id
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
  `

class DonorPage extends React.Component {

    state = {
        donor: null,
        userdb: null
    }

    componentDidMount = async () => {
        if(this.props.donorId && this.props.userId) {
            await this.getDonorInformation()
            await this.getAssistantInformation()
        }
    }

    getDonorInformation = async () => {
        const result = await API.graphql(graphqlOperation(getUser,{id: this.props.donorId}))
        this.setState({donor: result.data.getUser})
    }

    render () {
        const {donor,userdb} = this.state
        return (!donor && !userdb) ? <Loading fullscreen="true"/> : (
            <>
                <Avatar user={donor}/>
                <ListInterviews donor={donor} user={userdb}/>
            </>
        )
    }

}

export default withStyle(styles)(DonorPage)