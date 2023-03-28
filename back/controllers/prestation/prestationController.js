
import Prestation from "../../models/prestationSchema.js";



export const listPrestation = async (req, res) => {
    
    const data = await Prestation.find();
    
    if (!data) {
        return res.status(404).json({ message: "Prestation introuvable." });
    } else {
        return res.status(200).json({ count: data.length, data });
    }
};

export const createPrestation = async (req, res) => {
    
    const { genre, prestation, price } = req.body
    const newPrestation = new Prestation({
        genre,
        prestation,
        price,
    })
    //ajout de la prestation
    newPrestation.save()
        .then((newPrestation) => {
            console.log(newPrestation)
            res.status(200).json({ prestation:newPrestation })
        })
        .catch((err) => {
            return res.status(400).json({ message: "un champ est manquant ou le genre est mal renseigné, uniquement Homme ou Femme acceptés pour le genre" })
        })
}
export const deletePrestation = async (req, res) => {
    const id = req.body.id;
    const data = await Prestation.find();
    const result = data.find(element => element._id == id)
    //traitement du cas ou la prestation n'est pas présente
    if (!result) {
        return res.status(404).json({ message: "Prestation introuvable." });
    }
    //suppression de la prestation
    Prestation.findByIdAndDelete(result._id)
        .then(() => {
            return res.status(204).json({message:"Successful deletion"})
        }).catch((err) => {
            console.log(err)
            return res.status(400).json(err)
        })
}
export const updatePrestation = async (req, res) => {  
    
    const id = req.body.id;
    const data = await Prestation.find();
    const result = data.find(element => element._id == id)
    //traitement du cas ou la prestation n'est pas présente
    if (!result) {
        return res.status(404).json({ message: "Prestation introuvable." });
    }
    const genre = req.body.genre || result.genre
    const prestation = req.body.prestation || result.prestation
    const price = req.body.price || result.price

    if(!Number(req.body.price) ){
        return res.status(400).json({ message: "Price n'est pas un nombre" })
    }
    //ajout de la prestation modifié
    result.genre = genre
    result.prestation = prestation
    result.price = price
    result.save()
        .then((result) => res.status(201).json({ message: `Update  successful`, result }))
        .catch((err) => res.status(400).json({ message: err.message }))
}