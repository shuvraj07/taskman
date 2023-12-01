// Function to get tasks by status
import { Task } from "../model/taskModel.js";


//the fucntio to get sucess task from Task database
const getTasksByStatus = async (status) => {
    try {
      const tasks = await Task.findAll({
        where: { status },
      });
  
      console.log('Tasks retrieved with status', status, ':', tasks.map(task => task.toJSON()));
  
      return tasks;
    } catch (error) {
      console.error('Error getting tasks by status:', error.message);
      throw error;
    }
  };

const getSuccessTasks = async (req, res) => {
    try {
      const successTasks = await getTasksByStatus('success');
      res.json(successTasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export { getSuccessTasks };