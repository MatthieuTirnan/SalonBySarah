import formidable from "formidable";
import fs from "fs";

import Image from "../../models/imagesSchema.js";
import Inbox from "../../models/inboxSchema.js";
import Messages from "../../models/messagesSchema.js";


export const addMessage = async (req, res) => {


    const form = formidable();
    form.parse(req, function (err, fields, files) {

        if (!fields.titre || !fields.description) {
            return res.status(400).json({message: "champ manquant"});
        }
        if (files.fichier) {
            const oldpath = files.fichier.filepath;

            function getExtension(fileExtension) {
                return fileExtension.split("/")[1];
            }

            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension);

            const newpath = "public/images/" + files.fichier.newFilename + currentExtension;
            const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                return res.status(400).json({message: "Unsupported image file type"});
            }
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                console.log("fichier ajouter");
            });
            const page = "Message";
            const alt = files.fichier.originalFilename;
            const src = "http://localhost:9010/public/images/" + files.fichier.newFilename + currentExtension;
            const fileName = files.fichier.newFilename + currentExtension;
            const newImage = new Image({
                page, alt, src, fileName,
            });
            newImage.save();

            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Messages({
                titre, description, image: newImage, src, alt, from: req.userId,
            });
            newMessage.save()
                .then((newMessage) => {
                    console.log(newMessage)
                })
                .catch((err) => {
                    console.log(err)
                })


            Inbox.findOne({user: req.userId})
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox.save()
                            .then(() => {
                                res.status(201).json({message: `message ajouté`, message: newMessage, inbox: inbox});
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({message: `message ${newMessage.titre} non ajouté`});
                            });
                    } else {
                        const newInbox = new Inbox({
                            user: req.userId, message: [newMessage],
                        });
                        newInbox
                            .save()
                            .then(() => {
                                res.status(201).json({message: `message ajouté`, message: newMessage, inbox: inbox});
                            })
                            .catch((err) => {
                                res.status(400).json({message: err});
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({message: "Erreur serveur"});
                });
        } else {

            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Messages({
                titre, description, from: req.userId,
            });
            newMessage.save()
                .then((newMessage) => {
                    console.log(newMessage)
                })
                .catch((err) => {
                    console.log(err)
                })

            Inbox.findOne({user: req.userId})
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox.save()
                            .then(() => {
                                res.status(201).json({message: `message ajouté`, message: newMessage, inbox: inbox});
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({message: `message ${newMessage.titre} non ajouté`});
                            });
                    } else {
                        const newInbox = new Inbox({
                            user: req.userId, message: [newMessage],
                        });
                        newInbox
                            .save()
                            .then(() => {
                                res.status(201).json({message: `message ${newMessage.titre}  ajouté`});
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({message: `message ${newMessage.titre} non ajouté`});
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({message: "Erreur serveur"});
                });
        }
    });
};
export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.body.id;
        const userId = req.userId;
        const data = await Messages.find();
        const messageToDelete = data.find(element => element._id == messageId)
        console.log(messageToDelete)

        if (!messageToDelete) return res.status(400).json({message: "message introuvable"});


        if (messageToDelete.image) {
            const imageToDelete = await Image.findById(messageToDelete.image);

            if (!imageToDelete) {
                return res.status(400).json({message: "image absente"});
            }

            const imagePath = `public/images/${imageToDelete.fileName}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return res.status(400).json({message: "image absente"});
                }

                console.log(`Image supprimée : ${imagePath}`);
            });

            await Image.findByIdAndRemove(imageToDelete._id);
        }

        const inboxToUpdate = await Inbox.findOne({
            user: userId, message: {$in: [messageToDelete._id]},
        });

        if (inboxToUpdate) {
            inboxToUpdate.message.pull(messageToDelete._id);
            inboxToUpdate.save()
                .then(() => console.log("message supprimé de inbox "))
                .catch((err) => console.log(err))
        }

        Messages.findByIdAndRemove(messageToDelete._id)
            .then(() => {
                console.log("message remove")
                return res.status(204).json({message: "204"})
            })
            .catch((err) => {
                console.log(err)
            })

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Erreur lors de la suppression du message"});
    }

};

export const listUserMessage = async (req, res) => {
    try {
        const id = req.userId;
        const inbox = await Inbox.findOne({user: id}).populate("message user");
        if (!inbox) {
            return res.status(400).json({message: "Boîte de réception introuvable"});
        }
        console.log(inbox)

        res.status(200).json({inbox});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur"});
    }
};
export const listInbox = async (req, res) => {
    const inbox = await Inbox.find().populate("user message")
    if (!inbox) {
        return res.status(400).json({message: "Boîte de réception introuvable"});
    }

    console.log(inbox)
    res.status(200).json({inbox: inbox})
};

export const createAnswerMessage = async (req, res) => {

    const form = formidable();


    form.parse(req, function (err, fields, files) {
        const Userbox = fields.user
        console.log(fields)
        if (!fields.description) {
            return res.status(400).json({message: "corps du message manquant"});
        }
        if (files.fichier) {
            const oldpath = files.fichier.filepath;

            function getExtension(fileExtension) {
                return fileExtension.split("/")[1];
            }

            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension);

            const newpath = "public/images/" + files.fichier.newFilename + currentExtension;
            const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                return res.status(400).json({message: "Unsupported image file type"});
            }
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                console.log("fichier ajouter");
            });
            const page = "Message";
            const alt = files.fichier.originalFilename;
            const src = "http:localhost:9010/public/images/" + files.fichier.newFilename + currentExtension;
            const fileName = files.fichier.newFilename + currentExtension;
            const newImage = new Image({
                page, alt, src, fileName,
            });
            newImage.save();

            const titre = `réponse à ${fields.titre}`;
            const description = fields.description;
            const newMessage = new Messages({
                titre, description, image: newImage, src, alt, from: req.userId,
            });
            newMessage.save();

            Inbox.findOne({user: Userbox}).populate("user message")
                .then((inbox) => {
                    inbox.message.push(newMessage);
                    inbox.save()
                        .then(() => {
                            res.status(201).json({message: `message ajouté`, message: newMessage, inbox: inbox});
                        })
                        .catch((err) => {
                            log(err)
                            res.status(400).json({message: `message ${newMessage.titre} non ajouté`});
                        });

                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({message: "Erreur serveur"});
                });
        } else {
            const titre = `réponse à ${fields.titre}`;
            const description = fields.description;
            const newMessage = new Messages({
                titre, description, from: req.userId,
            });
            newMessage.save();

            Inbox.findOne({user: Userbox}).populate("user message")
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox
                            .save()
                            .then(() => {
                                res.status(201).json({message: `message ajouté`, message: newMessage, inbox: inbox});
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({message: `message ${newMessage.titre} non ajouté`});
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({message: "Erreur serveur"});
                });
        }
    });
}