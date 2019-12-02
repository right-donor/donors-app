import React from 'react'

/** Element UI Elements */
import {Loading} from "element-react"
/** AWS Amplify components */
import {graphqlOperation} from "aws-amplify"
import {Connect} from "aws-amplify-react"
/** GraphQL Components */
import {listUsers} from "../../graphql/queries"
import {onCreateUser} from "../../graphql/subscriptions"

// React router
import { Link, Route } from 'react-router-dom';

/** Material UI Stuff */
import { withStyles } from "@material-ui/core/styles";
import Card from '../../useful/Card/Card'
import GridCointainer from '../../useful/Grid/GridContainer';
import GridItem from '../../useful/Grid/GridItem';
import Primary from '../../useful/Typography/Primary';
import Info from '../../useful/Typography/Info';
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
    card: {
        padding: '20px',
    },
});

const DonorList = ({ searchResults, classes, match, history }) => {
    const onNewUser = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        const updatedUserList = [
            newData.onCreateUser,
            ...prevQuery.listUsers.items
        ]
        updatedQuery.listUsers.items = updatedUserList
        return updatedQuery
    }

    return (
        <Connect
            subscription={graphqlOperation(onCreateUser)}
            onSubscriptionMsg={onNewUser}
            query={graphqlOperation(listUsers)}
        >
            {({data,loading,errors}) => {
                console.log(data)
                if(errors.length > 0) {
                    return <h1> Ha ocurrido un error </h1>
                }

                if(loading || !data.listUsers) {
                    return <Loading fullscreen />
                }

                const users = searchResults.length > 0 ? searchResults : data.listUsers.items
                console.log('Users', users)

                return (
                    <>
                        {/** Section Title */}
                        {searchResults.length > 0 ? (
                            <h3 className="text-green">
                                <Icon
                                    className="icon"
                                >
                                    done
                                </Icon>
                                {searchResults.length} Resultados
                            </h3>
                        ) : (
                            <h3 className="header">
                                Donadores
                            </h3>
                        )}
                        {users.map(donor => (
                            <>
                            {donor.type === 'donor' && donor.firstname !== null &&  (
                                <div key={donor.id} className='my-2'>
                                    <Card
                                        bodyStyle={{
                                            padding: '0.7rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <GridCointainer className={classes.card} direction='column'>
                                            <GridItem xs={6}>
                                                <Link to={`${match.path}/${donor.id}`}>
                                                    <Primary>
                                                        <h4>{donor.firstname} {donor.lastname}</h4>
                                                    </Primary> {' – '}
                                                </Link>
                                                <Info><strong>{donor.blood.type}{donor.blood.rh}</strong></Info>
                                            </GridItem>
                                            <GridItem xs={6}>
                                                Edad: {new Date().getFullYear() - new Date(donor.birthday).getFullYear()}
                                            </GridItem>
                                        </GridCointainer>
                                    </Card>
                                </div>
                            )}
                            </>
                        ))}
                    </>
                )
            }}
        </Connect>
    )
}

export  default withStyles(styles)(DonorList)