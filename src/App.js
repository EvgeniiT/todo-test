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
    const editInd = tasks.findIndex(el => el.id === editedTask.id);
    const editedTasks = [...tasks];
    editedTasks.splice(editInd, 1, editedTask);
    setTasks(editedTasks);
  };
  const deleteTask = (taskId) => {
    const deleteInd = tasks.findIndex(el => el.id === taskId);
    const updatedTasks = [...tasks];
    updatedTasks.splice(deleteInd, 1);
    setTasks(updatedTasks);
  }
  const tasksList = tasks.map((el, ind) => <Task key={el.id} task={el} editTask={editTask} deleteTask={deleteTask}/>);
  return (
    <>
      <h1>To do app</h1>
      <AddTask addTask={addTask}/>
      {tasksList}
    </>
  )
};

const Task = ({task, editTask, deleteTask}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(task.taskText);
  const handleTextClick = () => {
    const editedTask = {...task, isCompleted: !task.isCompleted};
    editTask(editedTask);
  };
  const handleEditClick = () => {
    setEditMode(true);
  }
  const handleChange = (e) => setEditedTaskText(e.target.value);
  const handleSaveClick = () => {
    const editedTask = {...task, taskText: editedTaskText};
    editTask(editedTask);
    setEditMode(false);
  }
  const handleDeleteClick = () => {
    deleteTask(task.id)
  }
  const cn = task.isCompleted ? "completed" : "";
  return (
    <>
      <div onClick={handleTextClick} className={cn}>{task.taskText}</div>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
      {isEditMode &&
        <div>
          <input value={editedTaskText} onChange={handleChange}/>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      }
    </>
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
