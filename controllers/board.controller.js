import { Board } from "../models/board.model.js";

export const addBoard = async (req, res) => {
  try {
    const { boardName } = req.body;
    if (!boardName) {
      return res.status(400).json({
        success: false,
        message: "boardName is required",
      });
    }

    const board = await Board.create({ boardName });
    return res.status(201).json({
      success: true,
      message: "Board created successfully",
      board,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating board",
      error: error.message,
    });
  }
};

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching boards",
      error: error.message,
    });
  }
};



export const searchBoards = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) filter.boardName = new RegExp(q, "i");

    const boards = await Board.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, boards });
  } catch (error) {
    console.error("searchBoards error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};