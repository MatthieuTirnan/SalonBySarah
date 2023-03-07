import express from "express";
import { listPrestation, login, register, userprovider } from "../controllers/usersController.js";



const useRouter = express.Router()


useRouter.get("/login", login )
useRouter.get("/register", register )
useRouter.get("/userprovider", userprovider )
useRouter.get("/prestation", listPrestation )
export default useRouter