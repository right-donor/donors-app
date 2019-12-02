import React from "react"

/*Element UI Elements*/
import {Link} from 'react-router-dom'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Table from "../../useful/Table/Table.js";
import Button from "../../useful/CustomButtons/Button.js";
// material-ui icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import GridContainer from '../../useful/Grid/GridContainer'
import GridItem from '../../useful/Grid/GridItem'
import Primary from '../../useful/Typography/Primary'

import style from "../../assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";

/** AWS Amplify components */
import {graphqlOperation} from "aws-amplify"
import {Connect} from "aws-amplify-react"
/** GraphQL Components */
import {listPatients} from "../../graphql/queries"
import {onCreatePatient} from "../../graphql/subscriptions"

const PatientList = ({searchResults, patients}) => {

    const onNewPatient = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        const updatedPatientList = [
            newData.onCreatePatient,
            ...prevQuery.listPatients.items
        ]
        updatedQuery.listPatients.items = updatedPatientList
        return updatedQuery
    }
	const classes = withStyles();
	const roundButtons = [
		{ color: "primary", icon: Person },
		{ color: "info", icon: Edit },
		{ color: "danger", icon: Close }
		].map((prop, key) => {
	return (
		<Button style={{marginRight:'1rem'}} round justIcon size="sm" color={prop.color} key={key}>
			<prop.icon />
		</Button>
		);
	});

	return(
		<div style={{ padding: '50px 100px' }}>
			 <GridContainer
					spacing={3}
					direction="column"
					justify="center"
					alignItems="center">
					<GridItem>
						<Primary>
							<h2>Listado de pacientes</h2>
						</Primary>
					</GridItem>
					<GridItem>
						<Table
							
							tableHead={["#", "Nombre", "Apellido(s)", "Edad", "Sexo", "Estado", "Actions"]}
							tableData={[
								["1", "Miguel", "Martinez", "58", "Hombre", "En espera", roundButtons],
								["2", "Ana", "Holmes", "32", "Mujer","", roundButtons],
								["3", "Ricardo", "Clooney", "18", "Hombre","En espera", roundButtons]
							]}
							customCellClasses={[
								classes.textCenter,
								classes.textRight,
								classes.textRight
							]}
							customClassesForCells={[0, 4, 5]}
							customHeadCellClasses={[
								classes.textCenter,
								classes.textRight,
								classes.textRight
							]}
						/>
					</GridItem>
			</GridContainer>
		</div>
	)

}

export default withStyles(style)(PatientList)