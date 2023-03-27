import Logo from "../logo";
import styles from './header.module.css'
import Text from '../text.js'
import { useNavigate } from "react-router-dom";

function Header() {
  var marginText = '0vh 0.88vw'

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <Logo color='white'/>
        <div className={styles.topics}>
        </div>
    </div>
  );
}

export default Header;
 