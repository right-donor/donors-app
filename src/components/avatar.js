import React from 'react'

/** AWS Amplify Components */
import { S3Image } from 'aws-amplify-react'
import { Typography, Grid } from '@material-ui/core'

export default function Avatar({ user }) {
    return (
        <Grid container spacing={3} direction="column" justiy="center" alignItems="center"
         style={{
            backgroundColor:'#ffffff', 
            maxWidth:'500px', margin:'1rem auto 2rem auto', 
            borderRadius:'.7rem',
            padding:'1.5rem 1rem',
            boxShadow:'-4px 9px 49px -5px rgba(0,0,0,0.49)'
         }}>
            {/*<Grid item xs={12}>
                <S3Image
                    imgKey={user.photo.key}
                    theme={{
                        photoImg: { maxWidth: "10rem", maxHeight: "100%", borderRadius: "50%" }
                    }}
                    onLoad={url => console.log(url)}
                />
                </Grid>*/}
            <Grid item xs={12}style={{padding:'0.5rem 1rem'}}>
                <Typography variant="h2"> <span style={{color:'#555E65', fontWeight:'200'}}>{user.firstname}</span> <span style={{color:'#B44B59', fontWeight:'400'}}>{user.lastname}</span> </Typography>
            </Grid>
            <Grid item xs={12}style={{padding:'0.5rem 1rem'}}>
                <Typography style={{color:'#555E65', fontSize:'1.2rem'}} variant="body1"> {new Date().getFullYear() - new Date(user.birthday).getFullYear()} years old</Typography>
            </Grid>
            <Grid item xs={12} style={{padding:'0.5rem 1rem'}}>
            {user.canDonateFrom !== undefined &&
                <Typography style={{color:'#555E65',fontSize:'1.2rem'}}  variant="body1"> {new Date() - new Date(user.canDonateFrom) < 0 ?
                    "You can donate now" : 
                    "You can't donate now"}</Typography>
            }
            </Grid>
            <Grid item xs={12}style={{padding:'0.5rem 1rem'}}>
                <Typography style={{color:'#555E65',fontSize:'1.2rem'}}  variant="body1">
                    {user.blood.type}{user.blood.rh}
                </Typography>
            </Grid>
            {user.hospital !== null && (
                <Grid item xs={12}style={{padding:'0.5rem 1rem'}}>
                <Typography style={{color:'#555E65',fontSize:'1.2rem'}}  variant="body1">
                    {user.type === null && user.type !== "doctor" ?
                    <> Estancia en: {user.hospital.name} </> :
                    <> Trabaja en: {user.hospital.name} </>}
                </Typography>
            </Grid>)}
            {user.gender !== null && (
                <Grid item xs={12}style={{padding:'0.5rem 1rem'}}>
                    <Typography style={{color:'#555E65',fontSize:'1.2rem'}}  variant="body1">
                        {user.gender}
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}