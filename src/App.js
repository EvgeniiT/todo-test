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
  const addTask = (taskText) => setTasks((tasks) => [...tasks, {taskText, isCompleted: false}]);
  const tasksList = tasks.map(el => <Task taskText={el.taskText} isCompleted={el.isCompleted}/>);
  return (
    <>
      <h1>To do app</h1>
      <AddTask addTask={addTask}/>
      {tasksList}
    </>
  )
};

const Task = ({taskText, isCompleted}) => {
  //todo add complete button
  const cn = isCompleted ? "completed" : "";
  return (
    <div className={cn}>{taskText}</div>
  )
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
