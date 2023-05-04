import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import { getTasks } from '../DB';
import '../style.css';
import { Link } from 'react-router-dom';

const MyToDoList = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  const fetchTasks = async () => {
    if (user) {
      const fetchedTasks = await getTasks(user.uid);
      setTasks(fetchedTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  useEffect(() => {
    const handleFocus = () => {
      fetchTasks();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const dailyTasks = tasks.filter(task => task.taskListTopic === 'Daily Tasks');
  const weeklyTasks = tasks.filter(task => task.taskListTopic === 'Weekly Tasks');

  const dailyTasksPaginated = dailyTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);
  const weeklyTasksPaginated = weeklyTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const totalPages = Math.ceil(Math.max(dailyTasks.length, weeklyTasks.length) / tasksPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <main>
      {user ? (
        <>
          <h1>My To-Do List</h1>
          <div className="container" id="task-list">
            <h2>Daily Tasks</h2>
            <ul>
              {dailyTasksPaginated.map(task => (
                <li key={task.taskID} className={task.status === 'complete' ? 'complete' : 'incomplete'}>
                  <Link to={`/details/${task.taskID}`}>{task.taskName}</Link>
                </li>
              ))}
            </ul>

            <h2>Weekly Tasks</h2>
            <ul>
              {weeklyTasksPaginated.map(task => (
                <li key={task.taskID} className={task.status === 'complete' ? 'complete' : 'incomplete'}>
                  <Link to={`/details/${task.taskID}`}>{task.taskName}</Link>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <h2>Please sign in to view your to-do list.</h2>
      )}
    </main>
  );
};

export default MyToDoList;

