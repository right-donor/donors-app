import React from 'react'

/** Element UI Elements */
import {Loading, Card, Icon} from "element-react"
import {Link} from 'react-router-dom'
/** AWS Amplify components */
import {graphqlOperation} from "aws-amplify"
import {Connect} from "aws-amplify-react"
/** GraphQL Components */
import {listUsers} from "../graphql/queries"
import {onCreateUser} from "../graphql/subscriptions"

const DonorList = ({searchResults}) => {
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
            query={graphqlOperation(listUsers)}>
                {({data,loading,errors}) => {
                    if(errors.length > 0) {
                        return <h1> An error has occured </h1>
                    }

                    if(loading || !data.listUsers) {
                        return <Loading fullscreen={true}/>
                    }

                    const users = searchResults.length > 0 ? searchResults : data.listUsers.items

                    return (
                        <>
                        {/** Section Title */}
                        {searchResults.length > 0 ? (
                                <h2 className="text-green">
                                    <Icon 
                                        type="success"
                                        name="check"
                                        className="icon"/>
                                        {searchResults.length} Results
                                </h2>
                            ) : (
                                <h2 className="header">
                                    Donors
                                </h2>
                            )}
                        {/** Mapping of existing donors */}
                        {users.map(donor => (
                            <>
                            {donor.type === "donor" && (
                                <div key={donor.id} className="my-2">
                                <Card
                                    bodyStyle={{
                                        padding: "0.7em",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div>
                                            {/** Patient's name */}
                                            <span className="flex">
                                                <Link className="link" to={`/donor/${donor.id}`}>
                                                    {donor.firstname} {donor.lastname}
                                                </Link>
                                                <span style={{ color: 'var(--darkAmazonOrange)' }}>
                                                    {/* {donor.gender} */}
                                                </span>
                                                <img src="https://icon.now.sh/user" alt="Check Now" />
                                            </span>
                                            <div style={{color: "var(--lightSquidInk)"}}>
                                                Age: {new Date().getFullYear() - new Date(donor.birthday).getFullYear()}
                                            </div>
                                            {donor.blood.type}{donor.blood.rh}
                                        </div>
                                </Card>
                            </div>)}
                            </>
                        ))}
                        </>
                    )
                }}
        </Connect>
    )
}

// class DonorList extends React.Component {
//     render () {
//         return (
//             <h1> Donor List</h1>
//         )
//     }
// }

export default DonorList