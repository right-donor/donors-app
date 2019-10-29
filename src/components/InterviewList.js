import React from 'react'

/** Material UI */
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
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
                    {this.state.user.interviews.items.map(interview => (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    <Typography style={{fontSize: "15rem"}}>
                                        Interview on {new Date(interview.date)}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography component="p"> Weight: {interview.weight} </Typography>
                                    <Typography component="p"> Any recent Sickness?: {interview.recentSickness} </Typography>
                                    <Typography component="p"> Any recent antibiotics taken?: {interview.recentAntibiotics} </Typography>
                                    <Typography component="p"> Recently pregnant?: {interview.recentPregnancy} </Typography>
                                    <Typography component="p"> Recently drunk?: {interview.recentAlcohol} </Typography>
                                    <Typography component="p"> Recently vaccinated?: {interview.recentVaccines} </Typography>
                                    <Typography component="p"> Recent tattoos?: {interview.recentTattoos} </Typography>
                                    <Typography component="p"> Are you on your period?: {interview.recentMenstrualCycle} </Typography>
                                    <Typography component="p"> Are you diabetic?: {interview.diabetic} </Typography>
                                    <Typography component="p"> Do you suffer of hypertension?: {interview.hypertension} </Typography>
                                    <Typography variant="h5"> Blood Test Results </Typography>
                                    <Typography component="p"> VIH: {interview.bloodresults.vih} </Typography> 
                                    <Typography component="p"> Hepatitis B: {interview.bloodresults.hepatitisB} </Typography> 
                                    <Typography component="p"> Hepatitis C: {interview.bloodresults.hepatitisC} </Typography> 
                                    <Typography component="p"> Syphilis: {interview.bloodresults.syphilis} </Typography> 
                                    <Typography component="p"> Chagas: {interview.bloodresults.chagas} </Typography> 
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