import React, {useState} from 'react';

const AddTaskPanel = ({addTask}) => {
  const [task, setTask] = useState('');
  const handleChange = (e) => setTask(e.target.value);
  const handleClick = () => {
    addTask(task);
    setTask('');
  }
  return (
    <>
      <input type="text" placeholder="New task text" onChange={handleChange} value={task}/>
      <button onClick={handleClick}>Add task</button>
    </>
  );
};

export default AddTaskPanel;