
import formidable from "formidable";
import fs from "fs";

import Image from "../../models/imagesSchema.js";


export const listImageGalerie = async (req, res) => {
    const data = await Image.find();

    if (!data) {
        return res.status(404).json({ message: "images introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};

export const addImageGalerie = async (req, res) => {
    const form = formidable();
    form.parse(req, function (err, fields, files) {
        console.log(fields, files)
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

        if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
            return res.status(404).json({message:'Unsupported image file type'});
        }
        
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) return res.status(404).json({message:'échec de l\'ajout'});
            console.log("fichier ajouter")
        })
        const page = 'Galerie'
        const alt = files.fichier.originalFilename
        const src = "http://localhost:9010/public/images/" + files.fichier.newFilename + currentExtension
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
    const { id } = req.body
    const data = await Image.find();
    const result = data.find(element => element._id == id)
    if (!result) {
        return res.status(404).json({ message: "image introuvable." });
    }

    const imagePath = "./public/images/" + result.fileName;

    fs.unlink(imagePath, (err) => {
        if (err) {
            if (err) return res.status(404).json({message:'échec de la suppression'});
        } else {
            console.log(`Le fichier ${imagePath} a été supprimé.`);
            res.status(204).json({ message: "supprimé" })
        }
    })
}