
import formidable from "formidable";
import fs from "fs";

import Image from "../../models/imagesSchema.js";


export const listImageGalerie = async (req, res) => {
    const data = await Image.find({page:"Galerie"});
    if (!data) {
        return res.status(404).json({ message: "images introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};

export const addImageGalerie = async (req, res) => {
    
    const form = formidable();
    form.parse(req, function (err, fields, files) {
        
        //traitement du cas ou il n'y a pas d'images
        if (!files.fichier) {
            return res.status(400).json({ message: 'fichier manquant' })
        }
        
        let oldpath = files.fichier.filepath;

        function getExtension(fileExtension) {
            return fileExtension.split("/")[1];
        }
        
        let fileExtension = files.fichier.mimetype;
        let currentExtension = "." + getExtension(fileExtension)
        let newpath = 'public/images/' + files.fichier.newFilename + currentExtension;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
        //traitement du cas on le type de l'image n'est pas bon
        if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
            return res.status(404).json({message:'Unsupported image file type'});
        }
        //ajout de l'image
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) return res.status(404).json({message:'échec de l\'ajout'});
            console.log("fichier ajouter")
        })
        const page = 'Galerie'
        const alt = files.fichier.originalFilename
        const src = newpath
        const fileName = files.fichier.newFilename + currentExtension
        const newImage = new Image({
            page,
            alt,
            src,
            fileName
        })
        newImage.save()
            .then(() => {
                res.status(201).json({ message: `l'image ${newImage.alt} a été ajouter à la galerie` })
            })
            .catch((err) => {
                res.status(400).json({ message: "fichier  pas ajouter" })
            })

    })
}

export const deleteImageGalerie = async (req, res) => {
    
    const { id } = req.body;
    try {
        const imageToDelete = await Image.findById(id);
        if (!imageToDelete) {
            return res.status(404).json({ message: "Image introuvable." });
        }
        const imagePath = "./public/images/" + imageToDelete.fileName;
        fs.unlinkSync(imagePath);
        await Image.findByIdAndDelete(id);
        console.log(`Le fichier ${imagePath} et l'image correspondante ont été supprimés.`);
        res.status(204).json({ message: "Supprimé" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'image." });
    }
};