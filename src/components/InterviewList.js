import React from 'react'

/** Material UI */
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper} from '@material-ui/core'
import {Loading} from 'element-react'
import { ExpandMore } from '@material-ui/icons'

class InterviewList extends React.Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.setState({user: this.props.user})
        }
    }

    render () {
        return this.state.user === null ? <Loading/> : (
            <>
            <Typography variant="h3"> Recent Interviews </Typography>
            {this.state.user.interviews === null ?
            <Typography component="p"> You haven't had any recent medical interviews </Typography> :
                <>
                    {this.state.user.interviews.map(interview => (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    <Typography style={{fontSize: "1rem"}}>
                                        Interview on {interview.date}
                                        {console.log(interview)}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Paper
                                        style={{padding: "2rem"}}>
                                    <Typography component="p"> Weight: {interview.weight} </Typography> 
                                    <Typography component="p"> Any recent Sickness?: {interview.recentSickness ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Any recent antibiotics taken?: {interview.recentAntibiotics ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Recently pregnant?: {interview.recentPregnancy ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Recently drunk?: {interview.recentAlcohol ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Recently vaccinated?: {interview.recentVaccines ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Recent tattoos?: {interview.recentTattoos ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Are you on your period?: {interview.recentMenstrualCycle ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Are you diabetic?: {interview.diabetic ? "Yes" : "No"} </Typography>
                                    <Typography component="p"> Do you suffer of hypertension?: {interview.hypertension ? "Yes" : "No"} </Typography>
                                    <Typography variant="h5"> Blood Test Results </Typography>
                                    <Typography component="p"> VIH: {interview.bloodresults.vih ? "Positive" : "Negative"} </Typography> 
                                    <Typography component="p"> Hepatitis B: {interview.bloodresults.hepatitisB ? "Positive" : "Negative"} </Typography> 
                                    <Typography component="p"> Hepatitis C: {interview.bloodresults.hepatitisC ? "Positive" : "Negative"} </Typography> 
                                    <Typography component="p"> Syphilis: {interview.bloodresults.syphilis ? "Positive" : "Negative"} </Typography> 
                                    <Typography component="p"> Chagas: {interview.bloodresults.chagas? "Positive" : "Negative"} </Typography> 
                                    </Paper>
                                </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </>
            }
            </>
        )
    }
}

export default InterviewList