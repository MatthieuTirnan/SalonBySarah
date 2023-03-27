import User from "../../models/usersShema.js";


export const listUser = async (req, res) => {
    
    const user = await User.find()

    if (!user) {
        res.status(400).json({message: "aucun utilisateur"})
    } else {
        return res.status(200).json({count: user.length, user})
    }
};

export const deleteUser = async (req, res) => {
    
    const {id} = req.body
    const data = await User.find();
    const result = data.find(element => element._id == id)
    //traitement du cas ou l'utilisateur n'est pas trouver
    if (!result) {
        return res.status(404).json({message: "user introuvable."});
    }
    //suppression de l'utilisateur
    User.findByIdAndDelete(result._id)
        .then(() => {
            return res.status(204).json({message: 'delete'})
        }).catch((err) => {
        console.log(err)
        return res.status(400).json(err)
    })
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