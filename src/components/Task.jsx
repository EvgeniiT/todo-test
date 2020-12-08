import React, { useState } from 'react';
import { Button, Space, Checkbox, Input, Divider, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const Task = ({task, editTask, deleteTask}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [editedTaskText, setEditedTaskText] = useState(task.taskText);
  const handleCompleteChange = (e) => {
    const isCompleted = e.target.checked;
    setIsCompleted(isCompleted);
    const editedTask = {...task, isCompleted};
    editTask(editedTask);
  };
  const handleEditClick = () => {
    setEditMode((isEditMode) => !isEditMode);
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
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <Divider orientation="left"/>
      <Row justify="space-between">
        <Col span={12} style={{textAlign: "left"}}>
          {isEditMode ?
            (
              <Space>
                <Input value={editedTaskText} onChange={handleChange}/>
                <Button onClick={handleSaveClick} type="primary" shape="circle" icon={<SaveOutlined />}/>
              </Space>
            ) :
            <div className={cn}>{task.taskText}</div>
          }
        </Col>
        <Col span={12} style={{textAlign: "right"}}>
          <Space>
            <Checkbox checked={isCompleted} onChange={handleCompleteChange}>Complete</Checkbox>
            <Button onClick={handleEditClick} type="primary" shape="circle" icon={<EditOutlined />} />
            <Button onClick={handleDeleteClick} type="danger" shape="circle" icon={<DeleteOutlined />} />
          </Space>
        </Col>
      </Row>
    </div>    
  );
};

export default Task;