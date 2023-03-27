import styles from './cardImage.module.css'

function CardImage(props) {
  var image = ''
  var dataColored = 'Lorem Ipsum'
  var dataNormal = 'Lorem Ipsum'
  var dataBig = null
  if(props.image !== undefined){
    image = props.image
  }
  if(props.dataBig !== undefined){
    dataBig  = props.dataBig
  }
  if(props.dataNormal !== undefined){
    dataNormal  = props.dataNormal
  }
  var height = '47.9130vh'
  
  return (
    <div className={styles.container} style={{height: height}}>
        <img className={styles.containImg} src={image} alt={""}/>
        <div className={styles.containData}>
            <div>{dataNormal}</div>
            <div style={{fontSize: '15px'}}>{dataBig}</div>
        </div>
    </div>
  );
}

export default CardImage;
