import React from 'react'
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
                <GridContainer spacing={3} direction="column" justify="center" alignItems="center">
                    <form className={""} autoComplete="on" onSubmit={this.handleSearch}>
                        <GridItem>
                            <Primary>
                                {/* Title */}
                                <h1>Búsqueda del donador</h1>
                            </Primary>
                        </GridItem>
                        {/* Elastic Search*/}
                        <GridItem>
                            <CustomInput
                                fullWidth
                                labelText="Busca donadores"
                                id="donorSearch"
                                icon="circle-cross"
                                onIconClick={this.props.handleClearSearch}
                                onChange={this.props.handleSearchChange}
                                value={this.props.searchTerm}

                            />
                        </GridItem>
                        <GridItem>
                            <Button
                                type="info"
                                icon="search"
                                fullWidth
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