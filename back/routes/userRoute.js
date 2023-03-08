import express from "express";
import { listPrestation, login, register, userprovider,listImageGalerie, showArticle,addMessage, deleteMessage } from "../controllers/usersController.js";
import { auth } from "../middleware/authMiddleware.js";

const useRouter = express.Router()

useRouter.post("/login", login )
useRouter.post("/register", register )
useRouter.post("/add-message",[auth.verifiedToken], addMessage )

useRouter.delete("/delete-message",[auth.verifiedToken], deleteMessage )

useRouter.get("/userprovider", userprovider )
useRouter.get("/prestation", listPrestation )
useRouter.get("/show-article", showArticle )
useRouter.get("/galerie", listImageGalerie )
export default useRouter