import express from "express";
import { createPrestation, deleteUser, listUser,PassRemoveAdmin } from '../controllers/adminController.js';




const adminRouter = express.Router()




adminRouter.get("/list-user", listUser )

adminRouter.post("/create-prestation", createPrestation)

adminRouter.delete("/delete-user", deleteUser )


adminRouter.put("/putAdmin-user", PassRemoveAdmin )
export default adminRouter