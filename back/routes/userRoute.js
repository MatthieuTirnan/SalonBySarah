import express from "express";
import { testuser } from "../controllers/userscontroller.js";



const useRouter = express.Router()


useRouter.get("/test", testuser )
export default useRouter