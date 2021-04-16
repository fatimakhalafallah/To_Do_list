import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import AddTask from './components/AddTask'
import About from './components/About'
import {useState , useEffect} from 'react'
import { BrowserRouter  as Router, Route} from 'react-router-dom'
import { FaSketch } from 'react-icons/fa'
function App() {
    const [showAddTask ,setShowAddTask] = useState(false)
    const[tasks,setTasks]=useState([])

    useEffect(() => {
          const getTasks = async() => {
          const tasksFromServer = await fechTasks()
          setTasks(tasksFromServer)
       }
         getTasks()
    }, [])

    // fetch tasks a
    const fechTasks = async()=>
   {
       const res = await fetch('http://localhost:5000/tasks')
       const data=await res.json()
       
       return data
    }

//for delete from the backend

const deleteTask= async(id)=> {
   await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
}



// for delete of tasks
// const deleteTask= (id)=> {
//    setTasks(tasks.filter( (task)=> task.id !== id ))
//    console.log('Delete',id)
// }


// to fetch only one task and use it with the toggle
const fechTask = async(id)=>
{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data=await res.json()
    
    return data
}

 // Reminder
 const Reminder = async (id) => {
   const taskToToggle = await fechTask(id)
   const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

   const res = await fetch(`http://localhost:5000/tasks/${id}`, {
     method: 'PUT',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify(updTask),
   })

 }
// set the Reminder
// const Reminder = (id)=>{
//    setTasks(tasks.map((task)=>
//    task.id === id ? {...task , reminder : !task.reminder} : task
//    ))
// }

// add a new task 
const addTask= async (task) => {
   const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(task)
   })
   const data = await res.json()
   setTasks([...tasks,data])

   // const id = Math.floor(Math.random()*10000) + 1 
   // const newtask = {id, ...task }
   // setTasks ([...tasks,newtask])
}


  return (
     <Router>
    <div className="container">
       {/* on Header On Add) to allow show on and off the form */}
     <Header onAdd={()=> setShowAddTask(!showAddTask)} showadd = {showAddTask}/>    
     <Route path ='/' exact render={(props)=>(
         <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} Reminder={Reminder}/> :  <h4 style={{color:'red'}}>The List is empty</h4>}
         </>
      )  }/>
     <Route path ='/about' component={About} />
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
