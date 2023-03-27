import styles from './custom.module.css'
function Logo(props) {
  var input = 'white'
  if(props.color !== undefined){
    input = props.color
  }
  return (
    <div style={{color: input, marginRight: '2.7083vw'}}>
        <div className={styles.logoMain}>
          NMIMS<span className={styles.logoText}> Job Portal</span>
        </div>
    </div>
  );
}

export default Logo;
