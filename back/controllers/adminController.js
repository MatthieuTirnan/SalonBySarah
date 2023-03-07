import User from "../models/usersShema.js"
import Prestation from "../models/prestationSchema.js"
import formidable from "formidable";
import Image from "../models/imagesSchema.js"
import fs from "fs"

export const listUser = async (req, res) => {
    const user = await User.find()
    console.log(user.length)
    if(user == null){
        res.status(400).json({message :"email ou mot de passe erroné"})
    } else {
        return res.status(200).json({count:user.length,user})
    }
};

export const deleteUser = async (req, res) => {
    const {id}=  req.body
    const data = await User.find();
    const result = data.find(element => element._id == id)
    console.log(result)
    if (!result) {
        return res.status(404).json({ message: "user introuvable." });
    }
    User.findByIdAndDelete(result._id)
    .then(()=>{
        console.log("Successful deletion")
    }).catch((err)=>{
        console.log(err)
            return res.status(400).json(err)
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
        return res.status(400).json({message :"un champ est manquant ou le genre est mal renseigné, uniquement Homme ou Femme accepter"})
    })
}
export const deletePrestation = async (req,res) => {
    const id = req.body.id;
    const data = await Prestation.find();
    const result = data.find(element => element._id == id)
    if (!result) {
        return res.status(404).json({ message: "Prestation introuvable." });
    }
    Prestation.findByIdAndDelete(result._id)
    .then(()=>{
        console.log("Successful deletion")
    }).catch((err)=>{
        console.log(err)
            return res.status(400).json(err)
    })
}
export const updatePrestation = async (req,res) => {
    const id = req.body.id;

    
    const data = await Prestation.find();
    const result = data.find(element => element._id == id)
    if (!result) {
        return res.status(404).json({ message: "Prestation introuvable." });
    }
    Prestation.findByIdAndUpdate(result._id, {
        genre: req.body.genre,
        prestation: req.body.prestation,
        price: req.body.price,
    }, {new: true})
        .then((result) => res.status(201).json({message: "Update product successful", result}))
        .catch((err) => res.status(400).json({error: err.message}))
}
export const addImageGalerie = async (req,res) => {
    const form = formidable();
    form.parse(req, function (err, fields, files){
        console.log(fields,files)

    let oldpath = files.fichier.filepath;
    
    function getExtension(fileExtension) {
        return fileExtension.split("/")[1];
    }
    let fileExtension = files.fichier.mimetype;
    let currentExtension = "."+getExtension(fileExtension)
    
    let newpath = 'public/images/' + files.fichier.newFilename +currentExtension;

    fs.copyFile(oldpath, newpath, function (err){
        if (err) throw err;
        console.log("fichier ajouter")
    })
    const page = 'Galerie'
    const alt = files.fichier.originalFilename
    const src ="http://localhost:9010/public/images/"+files.fichier.newFilename+currentExtension
    const fileName=files.fichier.newFilename+currentExtension
    const newImage = new Image ({
        page,
        alt,
        src,
        fileName
    })
    newImage.save()
        .then(() => {
            res.status(201).json({message :"image ajouter"})
        })
        .catch((err)=>{
            res.status(400).json({message :"fichier  pas ajouter"})
        })
    
    })
}

export const deleteImageGalerie = async (req,res) => {
    const {id}=  req.body
    const data = await Image.find();
    const result = data.find(element => element._id == id)
    console.log(result)
    const imagePath = "./public/images/"+result.fileName;

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err);
            return 
        }else{
        console.log(`Le fichier ${imagePath} a été supprimé.`);
        res.status(200).json({message: 'fichier supprimé'})
        }
    })
    
    
}
