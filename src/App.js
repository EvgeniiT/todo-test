import React, {useState, useEffect} from 'react';
import './App.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')) || [])
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (taskText) => setTasks((tasks) => [...tasks, {taskText, isCompleted: false, id: new Date().getTime()}]);
  const editTask = (editedTask) => {
    const filteredTasks = tasks.filter(el => el.id !== editedTask.id);
    setTasks([...filteredTasks, editedTask]);
  };
  const tasksList = tasks.map((el, ind) => <Task key={el.id} task={el} editTask={editTask}/>);
  return (
    <>
      <h1>To do app</h1>
      <AddTask addTask={addTask}/>
      {tasksList}
    </>
  )
};

const Task = ({task, editTask}) => {
  const handleClick = () => {
    const editedTask = {...task, isCompleted: !task.isCompleted};
    editTask(editedTask);
  };
  const cn = task.isCompleted ? "completed" : "";
  return (
    <div onClick={handleClick} className={cn}>{task.taskText}</div>
  );
} 

const AddTask = ({addTask}) => {
  const [task, setTask] = useState('');
  const handleChange = (e) => setTask(e.target.value);
  const handleClick = () => {
    addTask(task);
    setTask('');
  }
  return (
    <>
      <input type="text" placeholder="add task" onChange={handleChange} value={task}/>
      <button onClick={handleClick}>Add task</button>
    </>
  );
}

function App() {
  return (
    <Todo/>
  );
}

export default App;
