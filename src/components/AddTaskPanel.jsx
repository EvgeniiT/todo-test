import React, {useState} from 'react';
import {Input, Button, Space} from 'antd';

const AddTaskPanel = ({addTask}) => {
  const [task, setTask] = useState('');
  const handleChange = (e) => setTask(e.target.value);
  const handleClick = () => {
    addTask(task);
    setTask('');
  }
  return (
    <Space>
      <Input type="text" placeholder="New task text" onChange={handleChange} value={task}/>
      <Button type="primary" onClick={handleClick}>Add task</Button>
    </Space>
  );
};

export default AddTaskPanel;