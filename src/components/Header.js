import PropTypes from 'prop-types'
import Button from './Button'
//import { useLocation } from 'react-router-dom' (try  it on ather time )

// we can use the props in two way : one as (props) {props.title} or just ({}) {title}
// styling done in two way as functin or as inline styel or as const 
const header = ( { title  , onAdd , showadd}) => {
    return (
       <header className="header">
           <h1> { title } </h1>  
           <Button color= {showadd ? "red" : "steelblue" } text={showadd ? 'Close' : 'Add'}
           onClick = {onAdd}/>
      </header>
    )
}

header.defaultProps = {
  title :'To Do List'
}

header.propTypes = { // type of the values 
    title: PropTypes.string
}
// const headingStyle = {
//     color:'red',
//     backgroundColor:'yellow'
// }

export default header

