import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../DB';
import '../style.css';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

const AddTask = () => {
  const [taskType, setTaskType] = useState('day');
  const [isComplete, setIsComplete] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  });
  const [location, setLocation] = useState('Set Location');
  const [description, setDescription] = useState('');
  const [taskDescription, setTaskDescription] = useState('No description provided');
  const [categoryID, setCategoryID] = useState(' ');
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to create new tasks.');
      return;
    }

    const taskListTopic = taskType === 'day' ? 'Daily Tasks' : 'Weekly Tasks';
    const status = isComplete ? 'complete' : 'incomplete';

    const newTask = {
      userId: user.uid,
      taskListTopic,
      status,
      taskName,
      dueDate,
      location,
      taskDescription,
      categoryID,
      taskID: uuidv4(),
    };

    await addTask(newTask);
    navigate('/MyToDoList');
  };

  return (
    <main id="newTaskMaker">
      {user ? (
        <>
          <h1>Add a New Task</h1>
          <form onSubmit={handleSubmit}>
            <input type="radio" name="taskType" value="day" id="daily" checked={taskType === 'day'} onChange={() => setTaskType('day')} />
            <label htmlFor="daily">Daily Task</label>
            <input type="radio" name="taskType" value="week" id="weekly" checked={taskType === 'week'} onChange={() => setTaskType('week')} />
            <label htmlFor="weekly">Weekly Task</label><br />
            <input type="checkbox" id="complete" onChange={() => setIsComplete(!isComplete)} />
            <label htmlFor="complete">Task Complete?</label><br />
            <label htmlFor="taskName">Task Name:</label><br />
            <input type="text" id="taskName" required onChange={(e) => setTaskName(e.target.value)} /><br />
            <label htmlFor="categoryID">Topic:</label><br />
            <input type="text" id="categoryID" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} /><br />
            <label htmlFor="due">Due Date:</label><br />
            <input type="date" id="due" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
            <label htmlFor="location">Task Location</label><br />
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
            <label htmlFor="desc">Task Description</label><br />
            <div className="container">
              <textarea id="taskDescription" rows="7" columns="84" onChange={(e) => setTaskDescription(e.target.value)}></textarea><br />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <h2>Please sign in to create new tasks.</h2>
      )}
    </main>
  );
};

export default AddTask;

