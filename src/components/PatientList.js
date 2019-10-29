import React from "react"

/** Element UI Elements */
import {Loading, Card, Icon} from "element-react"
import {Link} from 'react-router-dom'
/** AWS Amplify components */
import {graphqlOperation} from "aws-amplify"
import {Connect} from "aws-amplify-react"
/** GraphQL Components */
import {listPatients} from "../graphql/queries"
import {onCreatePatient} from "../graphql/subscriptions"

const PatientList = ({searchResults}) => {

    const onNewPatient = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        const updatedPatientList = [
            newData.onCreatePatient,
            ...prevQuery.listPatients.items
        ]
        updatedQuery.listPatients.items = updatedPatientList
        return updatedQuery
    }

    return (
        <Connect
            subscription={graphqlOperation(onCreatePatient)}
            onSubscriptionMsg={onNewPatient}
            query={graphqlOperation(listPatients)}>
                {({data,loading,errors}) => {
                    if (errors.length > 0) {
                        return <h1> An error has occured </h1>
                    }

                    if (loading || !data.listPatients) {
                        return <Loading fullscreen={true}/>
                    }

                    const patients = searchResults.length > 0 ? searchResults : data.listPatients.items
                    
                    return (
                        <>
                        {/** Section title */}
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
                                    Patients
                                </h2>
                            )}
                            {/** Mapping of existing patients */}
                            {patients.map(patient => (
                                <div key={patient.id} className="my-2">
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
                                                    <Link className="link" to={`/patient/${patient.id}`}>
                                                        {patient.firstname} {patient.lastname}
                                                    </Link>
                                                    <span style={{ color: 'var(--darkAmazonOrange)' }}>
												        {patient.gender}
											        </span>
                                                    <img src="https://icon.now.sh/user" alt="Check Now" />
                                                </span>
                                                <div style={{color: "var(--lightSquidInk)"}}>
											        Age: {new Date().getFullYear() - new Date(patient.birthday).getFullYear()}
										        </div>
                                                {patient.blood.type}{patient.blood.rh}
                                            </div>
                                    </Card>
                                </div>
                            ))}
                        </>
                    )
                }}
        </Connect>
    )
}

export default PatientList