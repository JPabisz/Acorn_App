import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask, deleteTask } from '../DB';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

const Details = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedTask = getTask(id);
    setTask(fetchedTask);
    console.log(task);
  }, [id]);
  

  const handleUpdate = () => {
    // Call the updateTask function with the updated task data
    updateTask(task);
    // Redirect to the desired page, e.g., the tasks list
    navigate('/MyToDoList');
  };

  const handleDelete = () => {
    // Call the deleteTask function with the taskID
    deleteTask(id);
    // Redirect to the desired page, e.g., the tasks list
    navigate('/MyToDoList');
  };

  const handleBack = () => {
    // Navigate back to the desired page, e.g., the tasks list
    navigate('/MyToDoList');
  };

  if (!task) {
    return <div>Loading...</div>;
  };

  return (
    <main>
      {user ? (
        <>
          <div className="container" id="details">
        <h2>Task Details</h2>
        <ul id="task-details">
          <li>
            <span>
              <strong>Task:</strong> {task.taskName}
            </span>
          </li>
          <li>
            <span>
              <strong>Category:</strong> {task.taskListTopic}
            </span>
          </li>
          <li>
            <span>
              <strong>Due Date:</strong> {task.dueDate}
            </span>
          </li>
          <li>
            <span>
              <strong>Status:</strong> {task.status}
            </span>
          </li>
          <li>
            <span>
              <strong>Description:</strong> {task.taskDescription}
            </span>
          </li>
        </ul>
        <div className="details-button-container">
          <div id="choice-buttons">
            <button className="details-update-button" onClick={handleUpdate}>Update</button>
            <button className="details-delete-button" onClick={handleDelete}>Delete</button>
            <button className="details-back-button" onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
        </>
      ) : (
        <h2>Please sign in to view task details.</h2>
      )}
    </main>
  );
};

export default Details;
