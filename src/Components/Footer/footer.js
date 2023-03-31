import Logo from "../logo";
import styles from './footer.module.css'
import Text from '../text.js'
import { Box } from "@mui/material";

function Footer() {
  var marginText = '0px 0.88vw'
  var marginTextBold = '0px 0.88vw 1.7391vh'
  return (
    <div className={styles.container}>
      <div style={{ alignContent: "center", display: "flex", justifyContent: "space-evenly", padding: '10px', width: "100%" }}>
        <Text data="Copyright. NMIMS Job Portal 2023." />
        <Text data="All Rights Reserved." />
      </div>
    </div>
  );
}

export default Footer;
