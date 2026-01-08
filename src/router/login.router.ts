import express from "express";
import { loginController } from "src/controller/login.controller";

let router = express.Router();

// Admin
router.post("/", loginController);


export { router as LoginRouter };