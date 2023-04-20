import Task from './Task';

const tasks = [
  new Task('1', 'Example Task 1', 'Daily Tasks', '1', '2023-01-01', 'complete', 'We have a lot of hw.'),
  new Task('2', 'Example Task 1', 'Weekly Tasks', '1', '2023-01-01', 'incomplete', 'We have a lot of projects.'),
  // Add more tasks here
];

export const getTasks = () => {
  return tasks;
};

export const getTask = (taskID) => {
  return tasks.find((task) => task.taskID === taskID);
};

const updateTask = (updatedTask) => {
  const taskIndex = tasks.findIndex(task => task.taskID === updatedTask.taskID);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
  }
};

const deleteTask = (taskID) => {
  const taskIndex = tasks.findIndex(task => task.taskID === taskID);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
};

// Modify this export statement
export { updateTask, deleteTask };
