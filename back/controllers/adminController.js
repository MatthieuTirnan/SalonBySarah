import User from "../models/usersShema.js"
import Prestation from "../models/prestationSchema.js"
import fs from "fs"

export const listUser = async (req, res) => {
    const user = await User.find()
    console.log(user.length)
    if(user == null){
        res.status(400).json({message :"email ou mot de passe erroné"})
    } else {
        res.status(200).json({count:user.length,user})
    }
};

export const deleteUser = async (req, res) => {
    const {id}=  req.body
    const data = await User.find();
    const result = data.find(element => element._id == id)
    console.log(result)
    User.findByIdAndDelete(result._id)
    .then(()=>{
        console.log("Successful deletion")
    }).catch((err)=>{
        console.log(err)
            res.status(400).json(err)
    })
};
export const PassRemoveAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAdmin = !user.isAdmin;
        await user.save();
        
        res.json({ message: `User ${user.pseudo} updated successfully` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export const createPrestation = async (req,res) => {
    const { genre,prestation,price } = req.body
    const newPrestation = new Prestation({
        genre,
        prestation,
        price,
    })
    newPrestation.save()
    .then((newPrestation) => {
        console.log(newPrestation)
        res.status(200).json({newPrestation})
    })
    .catch((err)=>{
        res.status(400).json({message :"un champ est manquant ou le genre est mal renseigné, uniquement Homme ou Femme accepter"})
    })

}