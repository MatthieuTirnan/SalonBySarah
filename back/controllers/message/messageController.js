import formidable from "formidable";
import fs from "fs";

import Image from "../../models/imagesSchema.js";
import Inbox from "../../models/inboxSchema.js";
import Messages from "../../models/messagesSchema.js";


export const addMessage = async(req, res) => {


    const form = formidable();
    form.parse(req, function(err, fields, files) {
        
        //traitement du cas un champ est manquant
        if (!fields.titre || !fields.description) {
            return res.status(400).json({ message: "champ manquant" });
        }
        //traitement du cas où on a une image
        if (files.fichier) {
            const oldpath = files.fichier.filepath;
            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension);
            const newpath = "public/images/" + files.fichier.newFilename + currentExtension;
            const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];
            //traitement du cas ou on a un mauvais type d'image
            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                return res.status(400).json({ message: "Unsupported image file type" });
            }
            //ajout de l'image
            fs.copyFile(oldpath, newpath, function(err) {
                if (err) throw err;
                console.log("fichier ajouter");
            });
            const page = "Message";
            const alt = files.fichier.originalFilename;
            const src = newpath
            const fileName = files.fichier.newFilename + currentExtension;
            const newImage = new Image({
                page,
                alt,
                src,
                fileName,
            });
            newImage.save();
            //ajout du message
            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Messages({
                titre,
                description,
                image: newImage,
                src,
                alt,
                from: req.userId,
            });
            newMessage.save()
                .then((newMessage) => {
                    console.log(newMessage)
                })
                .catch((err) => {
                    console.log(err)
                })

            //cherche la inbox si existe ou en créer une et y ajoute le message
            inboxCheck(req,newMessage,res)
        }
        else {

            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Messages({
                titre,
                description,
                from: req.userId,
            });
            newMessage.save()
                .then((newMessage) => {
                    console.log(newMessage)
                })
                .catch((err) => {
                    console.log(err)
                })

           inboxCheck(req,newMessage,res)
        }
    });
};
export const deleteMessage = async(req, res) => {
    
    try {
        const messageId = req.body.id;
        const userId = req.body.user;

        const data = await Messages.find();
        const messageToDelete = data.find(element => element._id == messageId)

        //traitement du cas ou le message n'est pas trouver
        if (!messageToDelete) return res.status(400).json({ message: "message introuvable" });

        //traitement du cas ou le message à une image associé
        if (messageToDelete.image) {
            const imageToDelete = await Image.findById(messageToDelete.image);

            if (!imageToDelete) {
                return res.status(400).json({ message: "image absente" });
            }

            const imagePath = `public/images/${imageToDelete.fileName}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return res.status(400).json({ message: "image absente" });
                }

                console.log(`Image supprimée : ${imagePath}`);
            });

            await Image.findByIdAndRemove(imageToDelete._id);
        }
        //mise à jour de la inbox
        const inboxToUpdate = await Inbox.findOne({
            user: userId,
            message: { $in: [messageToDelete._id] },
        });

        if (inboxToUpdate) {
            inboxToUpdate.message.pull(messageToDelete._id);
            inboxToUpdate.save()
                .then(() => console.log("message supprimé de inbox "))
                .catch((err) => console.log(err))
        }

        Messages.findByIdAndRemove(messageToDelete._id)
            .then(() => {
                return res.status(204).json({ message: "204" })
            })
            .catch((err) => {
                console.log(err)
            })

    }
    catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression du message" });
    }

};

export const listUserMessage = async(req, res) => {
    
    try {
        const id = req.userId;
        const inbox = await Inbox.findOne({ user: id }).populate("message user");
        if (!inbox) {
            return res.status(400).json({ message: "Boîte de réception introuvable" });
        }


        res.status(200).json({ inbox });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
export const listInbox = async(req, res) => {
    const inbox = await Inbox.find().populate("user message")
    
    if (!inbox) {
        return res.status(400).json({ message: "Boîte de réception introuvable" });
    }

    res.status(200).json({ inbox: inbox })
};

export const createAnswerMessage = async(req, res) => {

    const form = formidable();


    form.parse(req, function(err, fields, files) {
        const Userbox = fields.user
        //vérification du cas ou la description est manquante
        if (!fields.description) {
            return res.status(400).json({ message: "corps du message manquant" });
        }
        //traitement du cas il y a une image
        if (files.fichier) {
            const oldpath = files.fichier.filepath;
            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension);
            const newpath = "public/images/" + files.fichier.newFilename + currentExtension;
            const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                return res.status(400).json({ message: "Unsupported image file type" });
            }
            //ajout de l'image
            fs.copyFile(oldpath, newpath, function(err) {
                if (err) throw err;
            });
            const page = "Message";
            const alt = files.fichier.originalFilename;
            const src = newpath
            const fileName = files.fichier.newFilename + currentExtension;
            const newImage = new Image({
                page,
                alt,
                src,
                fileName,
            });
            newImage.save();
            //ajout du message
            const titre = `réponse à ${fields.titre}`;
            const description = fields.description;
            const newMessage = new Messages({
                titre,
                description,
                image: newImage,
                src,
                alt,
                from: req.userId,
            });
            newMessage.save();
            //ajout de la inbox
           inboxCheckAnswer(req,newMessage,res,Userbox)
        }
        else {
            const titre = `réponse à ${fields.titre}`;
            const description = fields.description;
            const newMessage = new Messages({
                titre,
                description,
                from: req.userId,
            });
            newMessage.save();
            inboxCheckAnswer(req,newMessage,res,Userbox)
            
        }
    });
}

function inboxCheck(req,newMessage,res){
    Inbox.findOne({ user: req.userId })
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox.save()
                            .then(() => {
                                res.status(201).json({ message: `message ajouté`, message: newMessage, inbox: inbox });
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({ message: `message ${newMessage.titre} non ajouté` });
                            });
                    }
                    else {
                        const newInbox = new Inbox({
                            user: req.userId,
                            message: [newMessage],
                        });
                        newInbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: `message ajouté`, message: newMessage, inbox: inbox });
                            })
                            .catch((err) => {
                                res.status(400).json({ message: err });
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Erreur serveur" });
                });
}

function getExtension(fileExtension) {
                return fileExtension.split("/")[1];
            }
            
function inboxCheckAnswer(req,newMessage,res,Userbox){
   Inbox.findOne({ user: Userbox }).populate("user message")
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: `message ajouté`, message: newMessage, inbox: inbox });
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({ message: `message ${newMessage.titre} non ajouté` });
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Erreur serveur" });
                });
}
