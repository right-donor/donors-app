import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from '../App';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import clsx from 'clsx';
import BackgroundHero from '../assets/img/donor-2.jpeg';
import DescImage from '../assets/img/preparing.jpeg';
import blood from '../assets/img/blood-types.png';
import reg from '../assets/img/register.jpeg';
import fact1 from '../assets/img/fact-1.png';
import fact2 from '../assets/img/fact-2.png';
import fact3 from '../assets/img/fact-3.png';
import fact4 from '../assets/img/fact-4.png';
import fact5 from '../assets/img/fact-5.png';
import fact6 from '../assets/img/fact-6.png';
import footer from '../assets/img/footer.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright � '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      500:"#833741"
    } ,
  },
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      500:"#B44B59",
    } ,
  },
});

const useStyles = makeStyles(theme => ({
  image:{
    width: '60%'
  },
  img:{
    width: '100%',
    height: 'auto'
  },
  banner: {
    paddingTop:'3%',
    width: '60%',
    fontWeight:'400',
    marginLeft:'auto'
  },
  bannerText: {
    width: '60%',
    marginLeft:'auto'
  },
  aboutText: {
    padding:'2rem 2rem 0 0',
    fontSize: '1.2rem',
    textAlign:'center'
  },
  toolbar: {
    backgroundColor: "#833741"
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    height: '80vh',
    padding: '3rem 0'
  },
  highlight: {
    fontWeight:'500',
    color: '#B44B59',
  },
  about: {
    display:'flex',
    backgroundColor: '#ffffff',
    margin: '0',
    maxWidth:'100%',
    paddingRight:'0'
  },
  aboutTitle:{
    fontSize:'3rem'
  },
  aboutTitle2:{
    fontSize:'3rem',
    paddingTop:'3rem'
  },
  bloodContainer:{
    width:'40%',
    marginLeft:'auto',
    marginRight:'auto'
  },
  blood:{
    height:'auto',
    width: '100%'
  },
  liveBlue:{
    color:'#00b1f3',
    fontWeight:'500',
  },
  liveGreen:{
    color:'#3CAEA3',
    fontWeight:'500',
  },
  liveYellow:{
    color:'#F6D55C',
    fontWeight:'500',
  },
  liveRed:{
    color:'#ED553B',
    fontWeight:'500',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent:'center',
    width:'60%',
    marginLeft:'auto'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem'
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
    position:'relative'
  },
  itemBox:{
    paddingRight:'2rem',
    maxWidth:'200px'
  },
  row:{
    display:'flex',
    justifyContent:'space-around',
    paddingBottom: '3rem',
    flexWrap:'wrap'
  },
  photo:{
    marginBottom:'1rem',
    display:'flex',
    justifyContent:'center'
  },
  imgF:{
    width:'150px',
    height:'150px',
    borderRadius:'50%',
    marginRight:'auto',
    marginLeft:'auto'
  },
  fact:{
    textAlign:'center',
    wordWrap:'break-word'
  },
  statistics:{
    padding:'3rem 0 3rem 0'
  },
  sectionAbout:{
    padding:'3rem 0'
  },
  factsTitle:{
    paddingBottom:'3rem',
    fontSize:'3rem'
  },
  register:{
    backgroundImage:"url(" + reg + ")",
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    padding: '7rem 3rem'
  },
  buttonWrapper:{
    width:'300px',
    marginLeft:'17%',
    "@media (max-width: 576px)": {
     marginLeft: 'auto',
     marginRight: 'auto'
    }
  },
  footerImageW:{
    marginTop:'.5rem',
    marginLeft:'auto',
    marginRight:'auto',
    width:'150px'
  },
  ftImg:{
    width:'100%',
    height:'auto'
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [exp, setExp] = React.useState(false);
  const [exp1, setExp1] = React.useState(false);

  const handleExpandClick = () => {
	setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExp(!exp);
  };
  const handleExpandClick3 = () => {
    setExp1(!exp1);
  };


  return (
    <React.Fragment>
      <CssBaseline />
		<AppBar position="static">
			<Toolbar className={classes.toolbar}>
			  <Typography variant="h6" className={classes.title}>
				Right Donor
			  </Typography>
			</Toolbar>
		 </AppBar>
      <main>
      
        <div className={classes.heroContent} 
        style={{backgroundImage:"url(" + BackgroundHero + ")",backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'}}>
          <Container>
            <Typography component="h1" variant="h2" align="center" className={classes.banner} gutterBottom>
              Share <span className={classes.liveBlue}>Live</span>, Give <span className={classes.highlight}>Blood</span>
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" className={classes.bannerText}paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nec est quis pretium.
			  Curabitur pretium eget ex nec iaculis. Pellentesque in porta dolor, eget eleifend lorem. Pellentesque in semper leo. 
			  Ut molestie augue nec ullamcorper fringilla. Maecenas nisl tellus, varius a laoreet et, porttitor at quam.
            </Typography>
            <div className={classes.heroButtons}>
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" color='primary'>
                  Login
                </Button> 
              </MuiThemeProvider>              
              
            </div>
          </Container>
        </div>

         {/* ----------------------------------------------------------*/}
        <Container className={classes.sectionAbout}>
          <Typography variant="h5" align="center" paragraph className={classes.aboutTitle}>
          <span className={classes.highlight.light}>Why </span> <span className={classes.highlight}>Matters? </span>
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nec est quis pretium.
			        Curabitur pretium eget ex nec iaculis. Pellentesque in porta dolor, eget eleifend lorem. Pellentesque in semper leo. 
			        Ut molestie augue nec ullamcorper fringilla. Maecenas nisl tellus, varius a laoreet et, porttitor at quam.
              Pellentesque in porta dolor, eget eleifend lorem. Pellentesque in semper leo. 
			        Ut molestie augue nec ullamcorper fringilla. Maecenas nisl tellus, varius a laoreet et, porttitor at quam.
          </Typography>
          <div className={classes.bloodContainer}>
            <img src={blood} className={classes.blood}></img>
          </div>
        </Container>
         {/* ----------------------------------------------------------*/}


        <Container className={classes.about}>
          <div className={classes.image}>
          <Typography variant="h5" align="center" paragraph className={classes.aboutTitle2}>
           It's <span className={classes.highlight}>Easy</span>, It's <span className={classes.highlight}>Safe</span>
          </Typography>
           <Typography variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nec est quis pretium.
			        Curabitur pretium eget ex nec iaculis. Pellentesque in porta dolor, eget eleifend lorem. Pellentesque in semper leo. 
			        Ut molestie augue nec ullamcorper fringilla. Maecenas nisl tellus, varius a laoreet et, porttitor at quam.
          </Typography>
          </div>
          <div className={classes.image}>
            <img src={DescImage} className={classes.img}>
            </img>
          </div>  
        </Container>


        <Container className={classes.statistics}>
           <Typography variant="h5" align="center"  className={classes.factsTitle}>
            Some <span className={classes.highlight}>Facts </span>
          </Typography>
            <div className={classes.row}>
                  <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact1} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}>En <span className={classes.highlight}>57</span> países, el 100% de las donaciones son altruistas.</div>
                  </div>
                  <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact2} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}>En 71 países, las donaciones altruistas son inferiores al <span className={classes.highlight}>50%</span>.</div>
                  </div>
                  <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact3} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}><span className={classes.highlight}>112.5 millones</span> de unidades de sangre se colectan anualmente en el mundo.</div>
                  </div>
            </div>
            <div className={classes.row}>
            <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact4} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}>Solo se puede asegurar un suministro suficiente de sangre <span className={classes.highlight}>no contaminada</span> mediante la donación altruista.</div>
                  </div>
                  <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact5} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}>La donación de sangre es <span className={classes.highlight}>9 veces</span> mayor en países de ingresos altos que los de ingresos bajos y medios.</div>
                  </div>
                  <div className={classes.itemBox}>
                    <div className={classes.photo}>
                      <img src={fact6} className={classes.imgF}></img>
                    </div>
                    <div className = {classes.fact}><span className={classes.highlight}>1 unidad</span> de sangre puede beneficiar a varios pacientes.</div>
                  </div>
            </div>
        </Container>



        <Container className={classes.cardGrid} maxWidth="md">
        
          <Grid container spacing={4}>
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
                  onClick={handleExpandClick2}
                  aria-exp={exp}
                  aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={exp} timeout="auto" unmountOnExit>
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
                  onClick={handleExpandClick3}
                  aria-exp1={exp1}
                  aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={exp1} timeout="auto" unmountOnExit>
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
          </Grid>
        </Container>
        
        <div className={classes.register}>
          <MuiThemeProvider theme={theme2}>
            <div className={classes.buttonWrapper}>
              <Button variant="contained" color='primary' fullWidth="true" size="large">
                  Register
                </Button> 
            </div> 
          </MuiThemeProvider>   
        </div>
        

      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Right Donor
        </Typography>
        <Copyright />
        <div className={classes.footerImageW}>
        <img src={footer} className={classes.ftImg}></img>
        </div>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}