import express from "express";
import { deleteUser, listUser, PassRemoveAdmin } from './../controllers/user/userController.js';

import { addArticle, deleteArticle, updateArticle } from "../controllers/article/articleController.js";
import { deletePrestation, updatePrestation,createPrestation } from "../controllers/prestation/prestationController.js";
import { deleteImageGalerie, addImageGalerie } from "../controllers/image/imageController.js";


const adminRouter = express.Router()

adminRouter.get("/list-user", listUser)

adminRouter.post("/create-prestation", createPrestation)
adminRouter.post("/add-image-galerie", addImageGalerie)
adminRouter.post("/add-Article", addArticle)

adminRouter.delete("/delete-user", deleteUser)
adminRouter.delete("/delete-prestation", deletePrestation)
adminRouter.delete("/delete-image-galerie", deleteImageGalerie)
adminRouter.delete("/delete-article", deleteArticle)

adminRouter.put("/putAdmin-user", PassRemoveAdmin)
adminRouter.put("/update-prestation", updatePrestation)
adminRouter.put("/update-article", updateArticle)
export default adminRouter