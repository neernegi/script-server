import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);