import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import { getTasks } from '../DB';
import '../style.css';

const MyToDoList = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const dailyTasks = tasks.filter(task => task.taskListTopic === 'Daily Tasks');
  const weeklyTasks = tasks.filter(task => task.taskListTopic === 'Weekly Tasks');

  return (
    <main>
      {user ? (
        <>
          <h1>My To-Do List</h1>
          <div className="container" id="task-list">
            <h2>Daily Tasks</h2>
            <ul>
              {dailyTasks.map(task => (
                <li key={task.taskID} className={task.status === 'complete' ? 'complete' : 'incomplete'}>
                  <a href={`/details/${task.taskID}`}>{task.taskName}</a>
                </li>
              ))}
            </ul>

            <h2>Weekly Tasks</h2>
            <ul>
              {weeklyTasks.map(task => (
                <li key={task.taskID} className={task.status === 'complete' ? 'complete' : 'incomplete'}>
                  <a href={`/details/${task.taskID}`}>{task.taskName}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h2>Please sign in to view your to-do list.</h2>
      )}
    </main>
  );
};

export default MyToDoList;

