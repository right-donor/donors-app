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
import hospital from '../assets/img/hospital.png';
import rd from '../assets/img/rd.jpg';
import tracking from '../assets/img/tracking.png';
import store from '../assets/img/store.png';

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
    maxWidth: '50%',
    minWidth:'50%'
  },
  img:{
    width: '100%',
    height: 'auto'
  },
  banner: {
    paddingTop:'3%',
    width: '60%',
    fontWeight:'400',
    marginLeft:'auto',
    color: '#555E65',
    "@media (max-width: 768px)": {
      fontSize:'2.5rem',
     },
     "@media (max-width: 1199px)": {
      paddingTop:'0'
     },
     "@media (max-width: 460px)":{
     
      fontSize:'2rem'
     },
  },
  bannerText: {
    width: '60%',
    marginLeft:'auto',
    "@media (max-width: 768px)": {
      fontSize:'1.2rem',
     
     },
     "@media (max-width: 460px)":{
     
      fontSize:'1rem'
     },
  },
  aboutText: {
    padding:'2rem 2rem 0 0',
    fontSize: '1.2rem',
    textAlign:'center',
    "@media (max-width: 768px)": {
      fontSize:'1rem',
     
     },
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
    paddingRight:'0',
    "@media (max-width: 1199px)": {
      flexWrap:'wrap',
      paddingLeft:'4%'
     }
  },
  aboutTitle:{
    fontSize:'3rem',
    "@media (max-width: 768px)": {
      fontSize:'2.2rem',
    
     },
  },
  aboutTitle2:{
    fontSize:'3rem',
    paddingTop:'3rem',
    "@media (max-width: 768px)": {
      fontSize:'2.2rem',
    
     },
  },
  bloodContainer:{
    width:'40%',
    marginLeft:'auto',
    marginRight:'auto',
    "@media (max-width: 768px)": {
      width:'60%'
    
     },
  },
  imgWrap:{
    minwidth:'55%',
    maxWidth:'55%',
    marginLeft:'auto',
    marginRight:'auto',

    "@media (max-width: 1199px)": {
      minWidth:'100%'
    
     },
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
    marginLeft:'auto',
    "@media (max-width: 768px)": {
      marginTop:'1rem',
    
     },
  
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1.5rem',

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
    display:'flex',
    fontSize:'1rem',
    alignItems:'center',
    padding:'1rem 4rem',
    justifyContent:'center',
    "@media (max-width: 768px)": {
      flexWrap:'wrap'
     }
  },
  itemBox:{
    paddingRight:'2rem',
    maxWidth:'200px',
    "@media (max-width: 1199px)": {
      paddingBottom:'2rem'
     },
     "@media (max-width: 768px)": {
      paddingRight:'0'
    } 
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
    fontSize:'3rem',
    "@media (max-width: 768px)": {
      fontSize:'2.2rem'
    } 
  },
  register:{
    backgroundImage:"url(" + reg + ")",
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    padding: '7rem 3rem'
  },
  buttonWrapper:{
    
    marginLeft:'17%',
    "@media (max-width: 768px)": {
     marginLeft: 'auto',
     marginRight: 'auto'
    }
  },
  btnWrp:{
    width:'300px',
    paddingLeft:'3rem',
    "@media (max-width: 768px)": {
     paddingLeft:'0',
     marginLeft:'auto',
     marginRight:'auto',
     width:'50%'
    }
  },
  footerImageW:{
    width:'100px',
    marginLeft:'1rem'
  },
  ftImg:{
    width:'100%',
    height:'auto'
  },
  wrapper:{
    display:'flex'
  },
  title2:{
    fontSize:'2rem',
    paddingBottom:'1.5rem',
    color:'#545c60',
    "@media (max-width: 768px)": {
     textAlign:'center'
     }
  }
  ,
  rightDonor:{
   
    padding: '3rem 0',

  },
  process:{
    backgroundColor:'rgba(0,177,243,0.9) ',
    padding:'3rem 0',
  },
  wrapProcess:{
    display:'flex',
   
    "@media (max-width: 1199px)": {
      flexWrap:'wrap',
     },
  },
  wrapProcess2:{
    display:'flex',
    justifyContent:'space-between',
    width:'100%',
    flexWrap:'wrap',
    "@media (max-width: 1199px)": {
      justifyContent:'space-around'
     },
  },
  proccesTitle:{
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    marginRight:'5rem',
    "@media (max-width: 1199px)": {
      flexDirection:'row',
      marginRight:'auto',
      marginLeft:'auto',
      paddingBottom:'3rem'
    },
  },
  rdTitle:{
    color: '#555E65',
    fontSize:'3rem',
    "@media (max-width: 768px)": {
      fontSize:'2.2rem'
    } 
  }
}));

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
              Dona  <span className={classes.highlight}>Sangre</span>, Dona <span className={classes.liveBlue}>Vida</span>            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" className={classes.bannerText}paragraph>
              En RightDonor, creemos en un mundo en el que podemos cuidarnos los unos a los otros. Donar sangre puede ser un regalo que cambia la vida y por ello, nos aseguramos de que tu regalo llegue a donde debe de llegar, de forma segura y transparente.
              <br></br>¡Ayúdanos a cambiar el mundo!
            </Typography>
            <div className={classes.heroButtons}>
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" color='primary'>
                  Ingresa
                </Button> 
              </MuiThemeProvider>              
              
            </div>
          </Container>
        </div>

         {/* ----------------------------------------------------------*/}
         <Container className={classes.rightDonor}>
              <Typography variant="h5" align="center" paragraph className={classes.rdTitle} >
            Right <span className={classes.highlight}>Donor</span>
             </Typography>
            
             <Typography style={{paddingRight:'0'}} variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
              Somos un proyecto que integra diferentes tecnologías de última generación como <span style={{fontWeight:'bold'}}> BlockChain, AWS, RFID</span>, entre otras. Right Donor te permite rastrear y saber el estado de tus donaciones cuidando siempre de tu información.<br></br> Sabemos que la sangre es el regalo más valioso que podemos ofrecer a otra persona y por eso te reconocemos el detalle con algunos beneficios.
          </Typography>
          </Container>
         {/* ----------------------------------------------------------*/}

          <div className={classes.process}>
            <Container className={classes.wrapProcess}>
              <div className={classes.proccesTitle}>
              <Typography variant="h5" align="center" paragraph className={classes.aboutTitle} style={{color: '#ffffff',fontSize:'3rem'}}>
                ¿Cómo  <br></br><span  style={{color: '#555E65'}}>funciona</span>?
                </Typography>
              </div>
               
               <div className={classes.wrapProcess2}>
                   <div className={classes.itemBox}>
                     <div className={classes.photo}>
                        <img src={hospital} className={classes.imgF} style={{backgroundColor:'#ffffff'}}></img>
                      </div>
                      <div className = {classes.fact}>Acude al centro de salud de tu preferencia para iniciar tu donación.</div>
                  </div>
                  <div className={classes.itemBox}>
                      <div className={classes.photo} >
                        <img src={rd} className={classes.imgF} style={{backgroundColor:'#ffffff'}}></img>
                      </div>
                      <div className = {classes.fact}>Regístrate en RightDonor con tu usuario.</div>
                  </div>
                  <div className={classes.itemBox}>
                      <div className={classes.photo}>
                        <img src={tracking} className={classes.imgF}style={{backgroundColor:'#ffffff'}}></img>
                      </div>
                      <div className = {classes.fact}>Rastrea y checa el estatus de tu donación.</div>
                  </div>
                  <div className={classes.itemBox}>
                      <div className={classes.photo}>
                        <img src={store} className={classes.imgF}></img>
                      </div>
                      <div className = {classes.fact}>Acumula puntos y canjéalos por beneficios en la tienda en línea.</div>
                  </div>
              </div>
           </Container>
          </div>


          {/* ----------------------------------------------------------*/}
        <Container className={classes.sectionAbout}>
          <Typography variant="h5" align="center" paragraph className={classes.aboutTitle} style={{color: '#555E65'}}>
          <span >¿Por qué </span> <span className={classes.highlight}>importa</span>?
          </Typography>
          <Typography style={{paddingRight:'0'}} variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
          Todas las donaciones de sangre contribuyen a salvar vidas y a mejorar la salud, no sólo la de otras personas sino también la tuya. Algunas de las personas que necesitan 
          transfusiones incluyen mujeres con complicaciones en el embarazo, niños con anemia grave, personas con traumatismos severos - debido a desastres naturales o causados por el hombre -, o personas con cáncer. 
        
          </Typography>
          <Typography style={{paddingRight:'0'}} variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
          Existe una necesidad constante de donaciones regulares, ya que la sangre sólo se puede conservar durante cierto tiempo y luego deja de ser utilizable. 
          Las donaciones regulares de sangre por personas altruistas sanas son imprescindibles para garantizar la disponibilidad de sangre segura en el momento y el lugar en que se precise.
         
          </Typography>

          <Typography style={{paddingRight:'0'}} variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
          En  México  se  donan  diariamente  casi  cinco  mil  unidades  de  sangre,  sin  embargo,  como  en  muchos  países  latinoamericanos,  aún  se  depende  de  la  donación de familiares 
          o de amigos para el abastecimiento y autosuficiencia. Por ello es vital generar consciencia sobre la importancia de la donación de sangre
          ¡No importa qué tipo de sangre seas, todas pueden ayudar a otras personas!
          </Typography>
          <div className={classes.bloodContainer}>
            <img src={blood} className={classes.blood}></img>
          </div>
        </Container>
         {/* ----------------------------------------------------------*/}


        <Container className={classes.about}>
          <div style={{width:'auto'}}>
          <Typography variant="h5" align="center" paragraph className={classes.aboutTitle2} style={{color: '#555E65'}}>
           Donar es <span className={classes.highlight}>Fácil</span>, Es<span className={classes.liveBlue}> Seguro</span>
          </Typography>
           <Typography variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
           Donar no significa quedarnos con menos sangre, ya que nuestro organismo es capaz de crear nueva. La Secretaría de Salud indicó que la cantidad máxima permitida para donar es de 450mls y esto representa solo el 10% de lo que hay en nuestro cuerpo, por lo que esta cantidad no interfiere con el funcionamiento normal de nuestro cuerpo.
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" className={classes.aboutText}paragraph>
            No importa el lugar a donde vayas, el proceso se rige bajo las normas sanitarias el cual se realiza a través de una punción en la vena del pliegue en el brazo, con un equipo <span style={{fontWeight:'bold'}}>nuevo, estéril y desechable</span>.
          </Typography>
          </div>
          <div className={classes.imgWrap}>
            <img src={DescImage} className={classes.img}>
            </img>
          </div>  
        </Container>

         {/* ----------------------------------------------------------*/}

        <Container className={classes.statistics}>
           <Typography variant="h5" align="center"  className={classes.factsTitle}>
            La <span className={classes.highlight}>Estadística </span>
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

          {/* ----------------------------------------------------------*/}
        <div className={classes.register}>
        
          <MuiThemeProvider theme={theme2}>
            <div className={classes.buttonWrapper}>
            <Typography  className={classes.title2}>
            ¡Únete a nuestro proyecto!
             </Typography>
             <div className={classes.btnWrp}>  <Button variant="contained" color='primary' fullWidth="true" size="large">
                  Register
                </Button> </div>
            
            </div> 
          </MuiThemeProvider>   
        </div>
        
        {/* ----------------------------------------------------------*/}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <div style={{textAlign:'center'}}> RightDonor &copy; 2019, Todos los derechos reservados </div>
        <div className={classes.footerImageW}>
        <img src={footer} className={classes.ftImg}></img>
        </div>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}