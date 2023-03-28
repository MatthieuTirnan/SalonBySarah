import User from "../../models/usersShema.js";
import Image from "../../models/imagesSchema.js";
import Inbox from "../../models/inboxSchema.js";
import Messages from "../../models/messagesSchema.js";
import fs from "fs";


export const listUser = async (req, res) => {

    const user = await User.find()

    if (!user) {
        res.status(400).json({message: "aucun utilisateur"})
    } else {
        return res.status(200).json({count: user.length, user})
    }
};


export const PassRemoveAdmin = async (req, res) => {

    try {
        const {id} = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        user.isAdmin = !user.isAdmin;
        await user.save();

        res.json({message: `user updated successfully`, user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const listUserAdmin = async (req, res) => {
    const user = await User.find({isAdmin: true}, {email: 1, pseudo: 1})

    if (!user) {
        res.status(400).json({message: "pas d'admin"})
    } else {
        return res.status(200).json({count: user.length, adminUser: user})
    }
};
export const deleteUser = async (req, res) => {

    const {id} = req.body
    const data = await User.find();
    const result = data.find(element => element._id == id)
    const inbox = await Inbox.findOne({user: id}).populate("message");
    const image = await Image.find();
    //traitement du cas ou l'utilisateur n'est pas trouvé
    if (!result) {
        return res.status(404).json({message: "user introuvable."});
    }
    // vérifie si l'utilisateur a des messages et supprime la inbox, les messages et images lier
    if (inbox) {
        inbox.message.forEach((e) => {
            if (e.image) {
                const imageToDelete = image.find(element => element._id.toString() == e.image)
                const imagePath = `public/images/${imageToDelete.fileName}`;
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(400).json({message: "image absente"});
                    }
                    console.log(`Image supprimée : ${imagePath}`);
                });
                Image.findByIdAndDelete(e.image)
                    .then((res) => {
                        Messages.findByIdAndDelete(e._id)
                            .then((res) => {
                                inbox.message.pull(e);

                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                Messages.findByIdAndDelete(e._id)
                    .then((res) => {
                        inbox.message.pull(e);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
        console.log(inbox)
        Inbox.findByIdAndDelete(inbox._id)
            .then(() => console.log("message supprimé de inbox "))
            .catch((err) => console.log(err))
    }
    //suppression de l'utilisateur
    User.findByIdAndDelete(result._id)
        .then(() => {
            return res.status(204).json({message: 'delete'})
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json(err)
        })
}