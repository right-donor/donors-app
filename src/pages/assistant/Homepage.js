import React from 'react'

/** UI Components */
import {Loading} from 'element-react'

class Homepage extends React.Component {
    state = {
        user : {},
        userdb: {}
    }

    componentDidMount = () => {
        if(this.props.user && this.props.userdb){
            this.setState({
                user: this.props.user,
                userdb: this.props.userdb
            })
        }
    }

    render() {
        const {user,userdb} = this.state
        return !user && !userdb ? <Loading fullscreen="true"/> : (
            <>
            <h1> Assistant homepage </h1>
            </>
        )
    }
}

export default Homepage