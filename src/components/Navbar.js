import React from 'react'

/** Material-UI Elements */
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    welcome: {
        marginRight: "1rem"
    }
}))


export default function Navbar({ user, handleSignout }) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Right Donor
                    </Typography>
                    <Typography variant="caption" className={classes.welcome}>
                        Welcome {user.username} 
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleSignout}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}