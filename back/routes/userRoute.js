import express from "express";
import { showArticle } from "../controllers/article/articleController.js";
import { listImageGalerie } from "../controllers/image/imageController.js";
import { addMessage, deleteMessage, listUserMessage } from "../controllers/message/messageController.js";
import { listPrestation } from "../controllers/prestation/prestationController.js";
import { login, register, userprovider } from "../controllers/auth/authController.js";
import { listUserAdmin } from "../controllers/user/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const useRouter = express.Router()

useRouter.post("/login", login )
useRouter.post("/register", register )
useRouter.post("/add-message",[auth.verifiedToken], addMessage )

useRouter.delete("/delete-message",[auth.verifiedToken], deleteMessage )

useRouter.get("/list-user-message",[auth.verifiedToken], listUserMessage )
useRouter.get("/userprovider", userprovider )
useRouter.get("/prestation", listPrestation )
useRouter.get("/show-article", showArticle )
useRouter.get("/galerie", listImageGalerie )
useRouter.get("/list-user-admin", listUserAdmin)
export default useRouter