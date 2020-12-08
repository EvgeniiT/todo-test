import React, {useState, useEffect} from 'react';
import './App.css';
import AddTaskPanel from './components/AddTaskPanel';
import TaskList from './components/TaskList';
import 'antd/dist/antd.css';

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
  return (
    <>
      <h1>To do app</h1>
      <AddTaskPanel addTask={addTask}/>
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask}/>
    </>
  )
};

function App() {
  return (
    <div className="App">
      <Todo/>
    </div>
  );
}

export default App;
