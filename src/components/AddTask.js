import React from 'react';
import '../style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

const AddTask = () => {
  
  const [user] = useAuthState(auth);
  
  return (
    <main id="newTaskMaker">
      {user ? (
        <>
      <h1>Add a New Task</h1>
      <form action="list.html" method="POST">
        <input type="radio" name="taskType" value="day" id="daily" />
        <label htmlFor="daily">Daily Task</label>
        <input type="radio" name="taskType" value="week" id="weekly" />
        <label htmlFor="weekly">Weekly Task</label><br />
        <input type="checkbox" id="complete" />
        <label htmlFor="complete">Task Complete?</label><br />
        <label htmlFor="taskName">Task Name:</label><br />
        <input type="text" id="taskName" /><br />
        <label htmlFor="due">Due Date:</label><br />
        <input type="date" id="due" /><br />
        <label htmlFor="location">Task Location</label><br />
        <input type="text" id="complete" /><br />
        <label htmlFor="desc">Task Description</label><br />
        <div className="container">
          <textarea id="desc" rows="7" columns="84"></textarea><br />
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
