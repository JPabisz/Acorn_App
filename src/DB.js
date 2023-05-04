import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

const getTasks = async (userId) => {
  const { data } = await axios.get(`${API_BASE_URL}/user`, {
    params: {
      userId,
    },
  });
  return data;
};

const getTask = async (taskID, userId) => {
  const { data } = await axios.get(`${API_BASE_URL}/${userId}/${taskID}`);
  return data;
};

const updateTask = async (updatedTask) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${updatedTask.taskID}`, updatedTask);
    return response.data;
  } catch (error) {
    throw new Error('Error updating task');
  }
};

const deleteTask = async (taskID, userID) => {
  await axios.delete(`${API_BASE_URL}/${taskID}`);
};

const addTask = async (newTask) => {
  console.log('New task to add:', newTask);
  const { data } = await axios.post(API_BASE_URL, newTask);
  return data;
};

export { getTasks, getTask, updateTask, deleteTask, addTask };
