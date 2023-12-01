// Import Sequelize and create a Sequelize instance
import { Sequelize, DataTypes } from 'sequelize';
import { databaseConfig } from '../db/db.js';
import { Op } from 'sequelize';


const sequelize = new Sequelize(databaseConfig);
// Define the Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'tasks', 
});


// Synchronize the model with the database (create the table if not exists)
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Error synchronizing database:', error.message);
  }
};

// Function to create a new task
const createTask = async (task) => {
  try {
    const result = await Task.create(task);
    console.log('Task created:', result.toJSON());
    return result;
  } catch (error) {
    console.error('Error creating task hello error from here :', error.message);
  }
};

// Function to get all tasks
const getTasks = async (status) => {
  try {
    const tasks = await Task.findAll({
      where: { status },
    });

    
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    throw error;
  }
};


const deleteTask = async (taskId) => {
  try {
    const result = await Task.destroy({
      where: { id: taskId },
    });
    console.log('Task deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw error; // Ensure the error is propagated to the caller
  }
};
const updateTask = async (taskId, { title, description, status }) => {
  try {
    const result = await Task.update(
      { title, description, status },
      { where: { id: taskId }, returning: true }
    );

    if (result[0] === 0) {
      // No rows were affected, meaning the task with the given ID was not found
      return null;
    }

    console.log('Task updated:', result[1][0].toJSON());
    return result[1][0];
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error; // Ensure the error is propagated to the caller
  }
};


export { syncDatabase, createTask, getTasks ,deleteTask,updateTask,Task};
