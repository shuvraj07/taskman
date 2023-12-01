//import { requireAuth } from "../middleware/auth.js";
import { createTask, deleteTask, getTasks,syncDatabase, updateTask } from "../model/taskModel.js";

//Contrller to create the task 
const createTaskController = async (req, res) => {
  try {
    const { description, status, title } = req.body;

    // Validate input data
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    if (!description) {
      return res.status(400).json({ error: 'Description is required.' });
    }

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    // Create a new task using the createTask function from taskModel
    const newTask = await createTask({ title, description, status });

    // Respond with the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get all task contrller 
const getAllTasksController = async (req, res) => {
  try {
    console.log("only here is goes ")
    const status ='pending'; // Default to 'pending'
    const tasks = await getTasks(status);
   // console.log(tasks)
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks from here :', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get only success task 
const getSuccessTasksController = async (req, res) => {
  try {
    // Ensure the user is authenticated before accessing success status
    requireAuth(req, res, async () => {
      const tasks = await getTasks({ status: 'success' });
      res.json(tasks);
    });
  } catch (error) {
    console.error('Error getting success tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//delte the task from database 
const deleteTaskController = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate task ID
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required.' });
    }

    // Delete task using the deleteTask function from taskModel
    await deleteTask(taskId);

    // Respond with success message
    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//update the task from database 
const updateTaskController = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    // Validate task ID and input data
    if (!taskId || (!title && !description && !status)) {
      return res.status(400).json({ error: 'Task ID and at least one field (title, description, status) are required.' });
    }

    // Update task using the updateTask function from taskModel
    const updatedTask = await updateTask(taskId, { title, description, status });

    // Respond with the updated task
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createTaskController, getAllTasksController,deleteTaskController,updateTaskController,getSuccessTasksController };
