import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask, deleteTask } from '../DB';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import '../style.css'

const Details = () => {
  const [user] = useAuthState(auth);
  const { taskID } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (user) {
        try {
          const fetchedTask = await getTask(taskID, user.uid);
          console.log('Fetched task:', fetchedTask);
          setTask(fetchedTask);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };
    fetchTask();
  }, [taskID, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleUpdate = async () => {
    if (!task) {
      return;
    }

    try {
      await updateTask(task);
      navigate('/MyToDoList');
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskID);
        navigate('/MyToDoList');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
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
            <form>
              <label>
                Task Name:
                <input
                  type="text"
                  name="taskName"
                  value={task.taskName}
                  onChange={handleChange}
                />
              </label>
            </form>
            <form>
              <label>
                Category:
                <input
                  type="text"
                  name="taskListTopic"
                  value={task.taskListTopic}
                  onChange={handleChange}
                />
              </label>
            </form>
            <form>
              <label>
                Topic:
                <input
                  type="text"
                  name="categoryID"
                  value={task.categoryID}
                  onChange={handleChange}
                />
              </label>
            </form>
            <form>
              <label>
                Due Date:
                <input
                  type="text"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
              </label>
            </form>
            <form>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                />
              </label>
            </form>
            <form>
              <label>
                Description:
                <textarea
                  name="taskDescription"
                  value={task.taskDescription}
                  onChange={handleChange}
                ></textarea>
              </label>
            </form>
            <div className="details-button-container">
              <div id="choice-buttons">
                <button
                  className="details-update-button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="details-delete-button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button className="details-back-button" onClick={handleBack}>
                  Back
                </button>
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
