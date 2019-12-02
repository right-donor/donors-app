import React from 'react'
import {Link} from 'react-router-dom'
/** Material UI Stuff */
import {FormControl} from "@material-ui/core"
import { withStyles  } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-pro-react/customSelectStyle.js";
import GridContainer from '../../useful/Grid/GridContainer'
import GridItem from '../../useful/Grid/GridItem'
import Button from '../../useful/CustomButtons/Button'
import Primary from '../../useful/Typography/Primary'
import CustomInput from '../../useful/CustomInput/CustomInput'

class DonorSearch extends React.Component {
    render () {
        const {classes} = this.props;
        return(
            <FormControl fullWidth className={classes.selectFormControl}>
                <GridContainer spacing={3} direction="column" justify="center" alignItems="start">
                    <form className={""} autoComplete="on" onSubmit={this.props.handleSearch}>
                        <GridItem>
                            <Primary>
                                {/* Title */}
                                <h2>Búsqueda del donador</h2>
                            </Primary>
                        </GridItem>
                        {/* Elastic Search*/}
                        <GridItem xs={4} sm={4} md={4}>
                            <CustomInput
                                formControlProps= {{ fullWidth: true }}
                                labelText="Busca donadores"
                                id="donorSearch"
                                icon="circle-cross"
                                onIconClick={this.props.handleClearSearch}
                                inputProps={{ onChange: this.props.handleSearchChange }}
                                value={this.props.searchTerm}
                            />
                        </GridItem>
                        <GridItem>
                            <Button
                                type="info"
                                icon="search"
                                color="primary"
                            >
                                Buscar
                            </Button>
                        </GridItem>
                    </form>
                </GridContainer>
            </FormControl>
        )
    }
}

export default withStyles(styles)(DonorSearch)