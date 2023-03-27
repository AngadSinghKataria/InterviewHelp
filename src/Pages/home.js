import Header from '../Components/Header/Header.js'
import styles from './homepage.module.css'
import Text from '../Components/text.js';
import CardImage from '../Components/CardImage/cardImage.js';
import Footer from '../Components/Footer/footer.js';
import { useNavigate } from "react-router-dom";
import Button from '../Components/button'

function HomePage() {
  
  const navigate = useNavigate();
  
  return (
    <div style={{overflow: 'hidden'}}>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <div className={styles.head}> 
            <Text data="Discover jobs"  fontWeight="900" fontSize="6.5217vh" lineHeight="6.5217vh"/> 
            <Text data="Like never before" fontWeight="900" fontSize="6.5217vh" lineHeight="6.5217vh"/>
            <div style={{marginTop: '100px'}} onClick={()=>{navigate('SignIn')}}>
              <Button data='Login To Our Portal'/>
            </div>
          </div>
          <div style={{display: 'flex', marginRight: '100px', marginTop: '100px'}}>
            <img style={{height: '60%'}} src={require("../Images/background.png")}/>
          </div>
          
        </div>
      </div>
      <div className={styles.section2}>
        <div style={{marginTop: '9.3913vh'}}> 
          <Text data="Top Performers" color="black" fontWeight="900" fontSize="6.5217vh" lineHeight="6.5217vh"/>  
        </div>
        <div style={{marginTop: '8.7826vh', display: 'flex', flexDirection: 'row'}}>
          <span ><CardImage dataNormal="Hetvii Thakkar" dataBig="Amazon, NMIMS 2022" image= {require("../Images/girl.png")} /></span>
          <span ><CardImage dataNormal="Ananya" dataBig="Walmart, NMIMS 2022" image= {require("../Images/girl.png")} /></span>
          <span ><CardImage dataNormal="Mrunal Thakur" dataBig="Google, NMIMS 2022" image= {require("../Images/girl.png")} /></span>
          <span ><CardImage dataNormal="Jhanvi Kapoor" dataBig="Google, NMIMS 2022" image= {require("../Images/girl.png")} /></span>
        </div>
      </div>
      <div className={styles.section2} style={{backgroundColor: '#C1A3E3'}}>
        <div style={{marginTop: '9.3913vh'}}> 
          <Text data="Our Partners" color="black" fontWeight="900" fontSize="6.5217vh" lineHeight="6.5217vh"/>  
        </div>
        <div style={{marginTop: '8.7826vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
          <img src={require('../Images/amazon.png')} style={{marginRight: '10px', marginTop: '10px'}}/>
        </div>
      </div>
      <div className={styles.section2} style={{backgroundColor: 'white', height: '50vh', paddingTop: '120px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '50%', fontSize: '25px'}}>“ This is an awesome portal, More than 200 students and my collegues have been granted jobs with this portal.I am working as SDE in Google and it fills me with immense proud that I developed this portal which is helping everyone. ”</div>
          <div style={{width: '50%', fontSize: '25px', fontStyle: '900', marginTop: '25px'}}>Hetvii Thakkar</div>
          <div style={{width: '50%', fontSize: '15px', fontStyle: '900'}}>MBATECH, NMIMS 2023</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;
