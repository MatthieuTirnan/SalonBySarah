import express from "express";
import { createPrestation, deleteUser, listUser,PassRemoveAdmin,deletePrestation, updatePrestation, addImageGalerie, deleteImageGalerie } from '../controllers/adminController.js';





const adminRouter = express.Router()




adminRouter.get("/list-user", listUser )

adminRouter.post("/create-prestation", createPrestation)
adminRouter.post("/add-image-galerie", addImageGalerie)

adminRouter.delete("/delete-user", deleteUser )
adminRouter.delete("/delete-prestation", deletePrestation )
adminRouter.delete("/delete-image-galerie", deleteImageGalerie )

adminRouter.put("/putAdmin-user", PassRemoveAdmin )
adminRouter.put("/update-prestation", updatePrestation )
export default adminRouter