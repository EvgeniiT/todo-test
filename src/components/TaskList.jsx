import React from 'react';
import Task from './Task';

const TaskList = ({tasks, editTask, deleteTask}) => {
  const naturalSort = (a, b, isReverse) => {
    const rtn =  a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    return isReverse ? -1 * rtn : rtn;
  };
  const sortedTasks = tasks.sort((a, b) => naturalSort(a.taskText, b.taskText, true));
  return sortedTasks.map((el) => <Task key={el.id} task={el} editTask={editTask} deleteTask={deleteTask}/>);
}

export default TaskList;