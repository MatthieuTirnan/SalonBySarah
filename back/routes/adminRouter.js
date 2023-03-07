import express from "express";
import { testAdmin } from './../controllers/Admin.controller.js';



const adminRouter = express.Router()

adminRouter.get("/test", testAdmin )
export default adminRouter