import React from 'react';
import App from '../App';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import clsx from 'clsx';

/** Material-UI Elements */
import Header from "../useful/Header/Header.js";
import Button from "../useful/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const history = createBrowserHistory()
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
}));


export default function Landingpage() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
    setExpanded(!expanded);
	};

    return (
		<wrapper>
		  <AppBar position="static">
			<Toolbar>
			  <Typography variant="h6" className={classes.title}>
				Right Donor
			  </Typography>
			  <Button color="inherit">Login</Button>
			</Toolbar>
		  </AppBar>
		  <section>
			<h1>GRAPHIC DESIGN IS MY PASSION</h1>
			<Card className={classes.card}>
			  <CardHeader
				title="�Atrevete!"
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
					and chorizo in the pan. Add piment�n, bay leaves, garlic, tomatoes, onion, salt and
					pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
					saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				  </Typography>
				  <Typography paragraph>
					Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
					without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
					medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
					again without stirring, until mussels have opened and rice is just tender, 5 to 7
					minutes more. (Discard any mussels that don�t open.)
				  </Typography>
				  <Typography>
					Set aside off of the heat to let rest for 10 minutes, and then serve.
				  </Typography>
				</CardContent>
			  </Collapse>
			</Card>
		  </section>
		</wrapper>
    )
}