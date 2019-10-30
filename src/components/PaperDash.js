import React from 'react'
/** Material UI and UI Components */
import { Paper, Typography, Button } from '@material-ui/core'
import { Loading } from 'element-react'
/** React Router Dom */
import { Link } from "react-router-dom"
/** External API library */
import axios from 'axios'


class PaperDash extends React.Component {
    state = {
        tokens: -1
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.getTokenAmount()
        }
    }

    /**
     * Retrieve Tokens from Blockchain API
     */
    getTokenAmount = async () => {
        await axios.get('http://3.222.166.83/rewards/read/'
            + this.props.user.id + '/'
            + 'user1')
            .then((res) => {
                this.setState({ tokens: res.data.tokens })
            })
            .catch((error) => {
                alert(JSON.stringify(error))
            })
    }

    /** Aplication Render */
    render() {
        return (
            <Paper style={{ padding: "2rem" }}>
                <Typography variant="h5" component="h3">
                    {this.props.type === "blood" ?
                        <> Blood Donations </> :
                        <> Tokens in Wallet</>}
                </Typography>
                <Typography component="p">
                    {this.props.type === "blood" ?
                        <>
                            You have had {this.props.user.donations.items.length} recent donations
                        {this.props.user.donations.items.length === 0
                                || new Date(this.props.user.canDonateFrom) - new Date() > 0 ?
                                <Link to="/donations"><Button> Donate now </Button></Link> : <Link to="/donations"><Button > See recent donations </Button></Link>}
                        </> :
                        <>
                            You have {this.state.tokens !== -1 ? this.state.tokens : <Loading />} tokens on your wallet
                        <Link to="/store">
                                <Button> Go shopping </Button>
                            </Link>
                        </>}
                </Typography>
            </Paper>
        )
    }
}

export default PaperDash