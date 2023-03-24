import mongoose from "mongoose";
import express from "express";
import useRouter from "./routes/userRoute.js";
import adminRouter from './routes/adminRouter.js';
import cors from "cors";
import { auth } from "./middleware/authMiddleware.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = 9010;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static('public'));

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_URL);

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de données établie");
    app.use('/', useRouter);
    app.use('/admin', [auth.verifiedToken, auth.isAdmin], adminRouter);
})

app.listen(PORT, () => {
    console.log(`server running at port ${process.env.LINK_BACK}`);
});
