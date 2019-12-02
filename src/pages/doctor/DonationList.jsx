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
import {listDonations} from "../../graphql/queries"
import {onCreateDonation} from "../../graphql/subscriptions"

const DonationList = ({searchResults, patients}) => {

    const onNewPatient = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        const updatedDonationList = [
            newData.onCreateDonation,
            ...prevQuery.listDonations.items
        ]
        updatedQuery.listDonations.items = updatedDonationList
        return updatedQuery
    }
	const classes = withStyles();

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
							
							tableHead={["#", "Paciente", "Tipo de sangre", "Cantidad", "Fecha Límite"]}
							tableData={[
								["1", "Miguel Martinez", "O -", "500 mL", "2020-01-01"],
								["1", "Ana Holmes", "O +", "1000 mL", "2020-06-18"],
								["1", "Otro Paciente", "AB -", "500 mL", "2020-10-21"],
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

export default withStyles(style)(DonationList)