import React from 'react'

/** AWS Amplify Components */
import { S3Image } from 'aws-amplify-react'
import { Typography, Grid } from '@material-ui/core'

export default function Avatar({ user }) {
    return (
        <Grid container spacing={3} direction="column" justiy="center" alignItems="center">
            <Grid item xs={12}>
                <S3Image
                    imgKey={user.photo.key}
                    theme={{
                        photoImg: { maxWidth: "10rem", maxHeight: "100%", borderRadius: "50%" }
                    }}
                    onLoad={url => console.log(url)}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2"> {user.firstname} {user.lastname} </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1"> {new Date().getFullYear() - new Date(user.birthday).getFullYear()} , {user.city} </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1"> {new Date() - new Date(user.canDonateFrom) > 0 ?
                    "You can donate now" : 
                    "You have to wait"}</Typography>
            </Grid>
        </Grid>
    )
}