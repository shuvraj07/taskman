// taskRoutes.js
import express from 'express';
import { createTaskController,deleteTaskController,getAllTasksController, getSuccessTasksController, updateTaskController } from '../controller/createTaskController.js';
import { loginController, signUpController } from '../controller/signupLoginController.js';
import { authenticateUser } from '../middleware/auth.js';
import { getSuccessTasks } from '../middleware/success.js';

const router = express.Router();

// Route to create a new task
router.post('/tasks', createTaskController);

// Route to update a task (replace :taskId with the actual task ID)
router.get('/tasks', getAllTasksController);
router.get('/tasks/success',getSuccessTasksController)
// Route to delete a task (replace :taskId with the actual task ID)
router.delete('/tasks/:id', deleteTaskController);

// Update task route
router.put('/tasks/:id',updateTaskController);
//update route
router.post("/signup",signUpController)
//login route
router.post("/login",loginController)
//success route
router.get("/success",authenticateUser,getSuccessTasks)

export default router;
