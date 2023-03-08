import jwt from "jsonwebtoken";
import formidable from "formidable";
import fs from "fs";

import Image from "../models/imagesSchema.js";
import Article from "../models/articleSchema.js";
import User from "../models/usersShema.js";
import Prestation from "../models/prestationSchema.js";
import Inbox from "../models/inboxSchema.js";
import Messages from "../models/messagesSchema.js";

export const register = async (req, res) => {
    const { pseudo, email, password } = req.body;

    const newUser = new User({
        pseudo,
        email,
        password,
        isAdmin: email === process.env.ADMIN_PASSWORD,
    });
    const jwt = newUser.createJWT();
    newUser
        .save()
        .then((newUser) => {
            console.log(newUser);
            res.status(200).json({ user: newUser, jwt, isMatch: true });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (user == null) {
        res.status(400).json({ message: "email ou mot de passe erroné" });
    } else {
        user.comparePassword(password, async (err, isMatch) => {
            if (isMatch) {
                const jwt = user.createJWT();
                res.status(200).json({ user, jwt, isMatch });
            } else {
                res.status(400).json({ message: "email ou mot de passe erroné" });
            }
        });
    }
};

export const userprovider = async (req, res) => {
    let token;
    if (req.headers["authorization"] !== undefined) {
        token = req.headers["authorization"].split(" ")[1];
        console.log(token);
    }
    if (!token) {
        res.status(403).send({ message: "No token provided!" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(403).send({ message: "Unauthorized!" });
            return;
        }
        const user = await User.findOne({ _id: decoded.id });
        console.log(user);
        res.status(200).json({
            user: {
                id: user._id,
                pseudo: user.pseudo,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            isMatch: true,
        });
    });
};

export const listPrestation = async (req, res) => {
    const data = await Prestation.find();
    if (!data) {
        return res.status(404).json({ message: "Prestation introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};
export const listImageGalerie = async (req, res) => {
    const data = await Image.find();

    if (!data) {
        return res.status(404).json({ message: "images introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};
export const showArticle = async (req, res) => {
    const data = await Article.find();
    if (!data) {
        return res.status(404).json({ message: "article introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};

export const addMessage = async (req, res) => {
    console.log(req.userId);

    const form = formidable();
    form.parse(req, function (err, fields, files) {
        console.log(fields, files, req.userId);
        if (!fields.titre || !fields.description) {
            return res.status(400).json({ message: "champ manquant" });
        }
        if (files.fichier) {
            const oldpath = files.fichier.filepath;
            function getExtension(fileExtension) {
                return fileExtension.split("/")[1];
            }
            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension);

            const newpath =
                "public/images/" + files.fichier.newFilename + currentExtension;
            const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                throw new Error("Unsupported image file type");
            }
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                console.log("fichier ajouter");
            });
            const page = "Message";
            const alt = files.fichier.originalFilename;
            const src =
                "http://localhost:9010/public/images/" +
                files.fichier.newFilename +
                currentExtension;
            const fileName = files.fichier.newFilename + currentExtension;
            const newImage = new Image({
                page,
                alt,
                src,
                fileName,
            });
            newImage.save();

            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Messages({
                titre,
                description,
                image: newImage,
                src,
                from: req.userId,
            });
            newMessage.save();

            Inbox.findOne({ to: req.userId })
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: "Message ajouté" });
                            })
                            .catch((err) => {
                                res.status(400).json({ message: "Message non ajouté" });
                            });
                    } else {
                        const newInbox = new Inbox({
                            to: req.userId,
                            message: [newMessage],
                        });
                        newInbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: "Message ajouté" });
                            })
                            .catch((err) => {
                                res.status(400).json({ message: "Message non ajouté" });
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Erreur serveur" });
                });
        } else {
            const titre = fields.titre;
            const description = fields.description;
            const newMessage = new Article({
                titre,
                description,
                from: req.userId,
            });
            newMessage.save();

            Inbox.findOne({ to: req.userId })
                .then((inbox) => {
                    if (inbox) {
                        inbox.message.push(newMessage);
                        inbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: "Message ajouté" });
                            })
                            .catch((err) => {
                                res.status(400).json({ message: "Message non ajouté" });
                            });
                    } else {
                        const newInbox = new Inbox({
                            to: req.userId,
                            message: [newMessage],
                        });
                        newInbox
                            .save()
                            .then(() => {
                                res.status(201).json({ message: "Message ajouté" });
                            })
                            .catch((err) => {
                                res.status(400).json({ message: "Message non ajouté" });
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Erreur serveur" });
                });
        }
    });
};
export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.body.id;
        const userId = req.userId;

        const messageToDelete = await Messages.findOne({ _id: messageId });
        console.log(messageToDelete, userId, messageId);
        if (!messageToDelete)
            return res.status(400).json({ message: "message introuvable" });
        if (messageToDelete.from.toString() !== userId) {
            return res.status(401).json({ message: "User not authorized" });
        }

        if (messageToDelete.image) {
            const imageToDelete = await Image.findById(messageToDelete.image);

            if (!imageToDelete) throw new Error();

            const imagePath = `public/images/${imageToDelete.fileName}`;
            fs.unlink(imagePath, (err) => {
                if (err) throw err;
                console.log(`Image supprimée : ${imagePath}`);
            });

            await Image.findByIdAndRemove(imageToDelete._id);
        }

        const inboxToUpdate = await Inbox.findOne({
            to: userId,
            message: { $in: [messageToDelete._id] },
        });

        if (inboxToUpdate) {
            inboxToUpdate.message.pull(messageToDelete._id);
            await inboxToUpdate.save();
        }

        await Messages.findByIdAndRemove(messageToDelete._id);

        res.status(200).json({ message: "Message supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Erreur lors de la suppression du message" });
    }
};
