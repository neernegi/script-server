
import { Task } from "../models/task.model.js";

export const addTask = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: "boardId is required in params",
      });
    }

    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title field is required",
      });
    }

    const task = await Task.create({
      board: boardId,
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding task",
      error: error.message,
    });
  }
};

export const getBoardTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: "boardId required",
      });
    }

    const tasks = await Task.find({ board: boardId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching tasks",
      error: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching tasks",
      error: error.message,
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "taskId is required",
      });
    }

    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while editing task",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "taskId is required",
      });
    }

    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting task",
      error: error.message,
    });
  }
};

export const searchTasks = async (req, res) => {
  try {
    const { q, priority, status, boardId, page = 1, limit = 100, sort = "-createdAt" } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { description: regex }, { assignedTo: regex }];
    }
    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (boardId) filter.board = boardId;

    const skip = (Number(page) - 1) * Number(limit);

    const [tasks, total] = await Promise.all([
      Task.find(filter).populate("board", "boardName").sort(sort).skip(skip).limit(Number(limit)).lean(),
      Task.countDocuments(filter),
    ]);

    return res.status(200).json({ success: true, tasks, total });
  } catch (error) {
    console.error("searchTasks error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

