import express from "express";
import { listPrestation, login, register, userprovider,listImageGalerie, showArticle } from "../controllers/usersController.js";




const useRouter = express.Router()


useRouter.post("/login", login )
useRouter.post("/register", register )

useRouter.get("/userprovider", userprovider )
useRouter.get("/prestation", listPrestation )
useRouter.get("/show-article", showArticle )
useRouter.get("/galerie", listImageGalerie )
export default useRouter