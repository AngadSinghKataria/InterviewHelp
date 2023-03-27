import Logo from "../logo";
import styles from './footer.module.css'
import Text from '../text.js'

function Footer() {
  var marginText = '0px 0.88vw'
  var marginTextBold = '0px 0.88vw 1.7391vh'
  return (
    <div className={styles.container}>
        <div style={{alignContent: "center", display: "flex", justifyContent: "center", padding: '10px'}}>
            <Logo color='white'/>
            <Text data="Copyright. NMIMS Job Portal 2023."/>
            <Text data="All Rights Reserved." />
        </div>
    </div>
  );
}

export default Footer;
 