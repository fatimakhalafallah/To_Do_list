import Task from './Task'
const Tasks = ({tasks , onDelete , Reminder}) => {
    return (
        <>
        {tasks.map((task)=>(
            <Task key={task.id} 
            task={task} 
            onDelete={onDelete} 
            Reminder={Reminder}/>
        ))}
        </>
    )
}

export default Tasks
