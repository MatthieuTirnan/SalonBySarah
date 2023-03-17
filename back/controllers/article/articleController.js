import formidable from "formidable";
import fs from "fs";

import Image from "../../models/imagesSchema.js";
import Article from "../../models/articleSchema.js";


export const showArticle = async (req, res) => {
    const data = await Article.find().populate("image");
    if (!data) {
        return res.status(404).json({message: "article introuvable."});
    } else {
        return res.status(200).json({count: data.length, data});
    }
};


export const addArticle = async (req, res) => {
    const form = formidable();
    form.parse(req, function (err, fields, files) {
        console.log(fields, files)
        if (files.fichier) {

            const oldpath = files.fichier.filepath;

            function getExtension(fileExtension) {
                return fileExtension.split("/")[1];
            }

            let fileExtension = files.fichier.mimetype;
            const currentExtension = "." + getExtension(fileExtension)

            const newpath = 'public/images/' + files.fichier.newFilename + currentExtension;
            const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];

            if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                return res.status(400).json({message: "Unsupported image file type"});
            }
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                console.log("fichier ajouter")
            })
            const page = 'Article'
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


            const titre = fields.titre
            const description = fields.description
            const newArticle = new Article({
                titre,
                description,
                image: newImage,
                imagepath: src
            })
            newArticle.save()
                .then(() => {
                    res.status(201).json({message: `l'article a été ajouté`, article: newArticle})
                })
                .catch((err) => {
                    res.status(400).json({message: `l'article n'a pas été ajouté`, err: err})
                })
        } else {
            const titre = fields.titre
            const description = fields.description
            const newArticle = new Article({
                titre,
                description,
            })
            newArticle.save()
                .then(() => {
                    res.status(201).json({message: `l'article a été ajouté`, article: newArticle})
                })
                .catch((err) => {
                    res.status(400).json({message: `l'article n'a pas été ajouté`, err: err})
                })
        }


    })
}

export const deleteArticle = async (req, res) => {
    const {id} = req.body
    const data = await Article.find();
    const result = data.find(element => element._id == id)
    if (!result) {
        return res.status(404).json({message: "article introuvable."});
    }
    if (result.image) {
        const images = await Image.findOne({_id: result.image});
        const imagePath = "./public/images/" + images.fileName;
        console.log(images)
        console.log(imagePath)
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                return
            } else {
                console.log(`Le fichier ${imagePath} a été supprimé.`);

            }
        })
    }
    Article.findByIdAndDelete(result._id)
        .then(() => {
            console.log(result)
            console.log("Successful deletion")
            return res.status(204).json({message: "Successful deletion"})
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json(err)
        })
}
export const updateArticle = async (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        console.log(files)
        if (err) {
            console.log(err);
            throw err;
        }

        try {
            const id = fields.id;
            const article = await Article.findById(id);

            if (!article) {
                return res.status(404).json({message: "article introuvable."});
            }

            const titre = fields.titre || article.titre;
            const description = fields.description || article.description;


            if (files.fichier) {
                const oldpath = files.fichier.filepath;

                function getExtension(fileExtension) {
                    return fileExtension.split("/")[1];
                }

                let fileExtension = files.fichier.mimetype;
                const currentExtension = "." + getExtension(fileExtension)

                const newpath = 'public/images/' + files.fichier.newFilename + currentExtension;
                const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];

                if (!allowedExtensions.includes(`.${getExtension(fileExtension)}`)) {
                    throw new Error('Unsupported image file type');
                }

                if (article.image) {
                    const images = await Image.findOne({_id: article.image});
                    const imagePath = "./public/images/" + images.fileName;

                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error(err);

                        }
                    })
                }

                const page = 'Article';
                const alt = files.fichier.originalFilename;
                const src = "http://localhost:9010/public/images/" + files.fichier.newFilename + currentExtension;
                const fileName = files.fichier.newFilename + currentExtension
                fs.copyFile(oldpath, newpath, function (err) {
                    if (err) throw err;
                    console.log("fichier ajouter")
                })
                const newImage = new Image({
                    page,
                    alt,
                    src,
                    fileName
                });

                await newImage.save();

                article.titre = titre;
                article.description = description;
                article.image = newImage;
                article.imagepath = src;

                await article.save();

            } else {
                article.titre = titre;
                article.description = description;
                await article.save();
            }

            res.status(200).json({
                message: 'Article updated successfully',
                NewArticle: article
            });

        } catch (err) {
            console.log(err);
            res.status(400).json({message: err.message});
        }
    });
};
