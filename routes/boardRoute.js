import express from "express";
import { addBoard, getBoards, searchBoards } from "../controllers/board.controller.js";

const boardRouter = express.Router();

boardRouter.post("/boards", addBoard);
boardRouter.get("/boards", getBoards);
boardRouter.get("/searchBoard", searchBoards);


export default boardRouter;
