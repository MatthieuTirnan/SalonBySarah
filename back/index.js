import mongoose from "mongoose";
import express from "express";
import useRouter from "./routes/userRoute.js";
import adminRouter from './routes/adminRouter.js';
import cors from "cors";
import {auth} from "./middleware/authMiddleware.js";



const app = express();
const PORT = 9010;


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public',express.static('public'));

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://matthieutirnan:123@clusterapp.faayjel.mongodb.net/SalonSarah?retryWrites=true&w=majority');

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
    app.use('/', useRouter);
    app.use('/admin',[auth.verifiedToken,auth.isAdmin],adminRouter);
})

// ,[auth.verifiedToken,auth.isAdmin]

app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
}); 