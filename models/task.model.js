import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    assignedTo: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);