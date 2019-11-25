import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import App from '../App';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import clsx from 'clsx';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
	setExpanded(!expanded);
  };


  return (
    <React.Fragment>
      <CssBaseline />
		<AppBar position="static">
			<Toolbar>
			  <Typography variant="h6" className={classes.title}>
				Right Donor
			  </Typography>
			</Toolbar>
		 </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              GRAPHIC DESIGN IS MY PASSION
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nec est quis pretium.
			  Curabitur pretium eget ex nec iaculis. Pellentesque in porta dolor, eget eleifend lorem. Pellentesque in semper leo. 
			  Ut molestie augue nec ullamcorper fringilla. Maecenas nisl tellus, varius a laoreet et, porttitor at quam.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Card className={classes.card}>
			  <CardHeader
				title="¡Atrevete!"
				subheader="Beneficios de ser donante"
			  />
			  <CardMedia
				className={classes.media}
				image="/static/images/cards/paella.jpg"
				title="Donante"
			  />
			  <CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
				  This impressive paella is a perfect party dish and a fun meal to cook together with your
				  guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
			  </CardContent>
			  <CardActions disableSpacing>
				<IconButton
				  className={clsx(classes.expand, {
					[classes.expandOpen]: expanded,
				  })}
				  onClick={handleExpandClick}
				  aria-expanded={expanded}
				  aria-label="show more"
				>
				  <ExpandMoreIcon />
				</IconButton>
			  </CardActions>
			  <Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
				  <Typography paragraph>Method:</Typography>
				  <Typography paragraph>
					Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
					minutes.
				  </Typography>
				  <Typography paragraph>
					Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
					heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
					browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
					and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
					pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
					saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				  </Typography>
				  <Typography paragraph>
					Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
					without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
					medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
					again without stirring, until mussels have opened and rice is just tender, 5 to 7
					minutes more. (Discard any mussels that don’t open.)
				  </Typography>
				  <Typography>
					Set aside off of the heat to let rest for 10 minutes, and then serve.
				  </Typography>
				</CardContent>
			  </Collapse>
			</Card>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}