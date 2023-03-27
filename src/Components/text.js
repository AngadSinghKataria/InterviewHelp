import styles from './custom.module.css'

function Text(props) {
  var input = 'white'
  var data = 'Lorem Ipsum'
  var margin = '0vh'
  var fontSize = '1.7391vh'
  var lineHeight = '2.1739vh'
  var fontWeight = '400'
  var color = ''
  if(props.input !== undefined){
    input = props.color
  }
  if(props.data !== undefined){
    data = props.data
  }
  if(props.margin !== undefined){
    margin  = props.margin
  }
  if(props.fontWeight !== undefined){
    fontWeight = props.fontWeight
  }
  if(props.fontSize !== undefined){
    fontSize  = props.fontSize
  }
  if(props.lineHeight !== undefined){
    lineHeight  = props.lineHeight
  }
  if(props.color !== undefined){
    color  = props.color
  }
  
  return (
    <div style={{color: input}}>
        <div className={styles.text40020} style={{margin: margin, fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight, color: color}}>
            {data}
        </div>
    </div>
  );
}

export default Text;