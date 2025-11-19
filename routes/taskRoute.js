
import express from "express";
import {
  addTask,
  getBoardTasks,
  getAllTasks,
  editTask,
  deleteTask,
  searchTasks,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();


taskRouter.post("/boards/:boardId/tasks", addTask);

taskRouter.get("/boards/:boardId/tasks", getBoardTasks);
taskRouter.get("/tasks", getAllTasks);
taskRouter.put("/tasks/:taskId", editTask);
taskRouter.delete("/tasks/:taskId", deleteTask);

taskRouter.get("/searchTask", searchTasks);


export default taskRouter;