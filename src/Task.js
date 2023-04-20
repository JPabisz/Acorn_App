class Task {
  constructor(taskID, taskName, taskListTopic, categoryID, dueDate, status, taskDescription) {
    this.taskID = taskID;
    this.taskName = taskName;
    this.taskListTopic = taskListTopic;
    this.categoryID = categoryID;
    this.dueDate = dueDate;
    this.status = status;
    this.taskDescription = taskDescription;
    console.log('Task created:', this);
  }
}

export default Task;
