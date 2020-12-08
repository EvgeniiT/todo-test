import React, { useState } from 'react';

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
    <div className="task">
      <div className={cn}>{task.taskText}</div>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={handleCompleteChange}/>
        Complete
      </label>
      {isEditMode &&
        <div>
          <input value={editedTaskText} onChange={handleChange}/>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      }
    </div>
  );
};

export default Task;