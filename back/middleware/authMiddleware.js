import User from '../models/usersShema.js';
import  jwt from 'jsonwebtoken';
import { jwtPassword } from './../models/usersShema.js';


export const verifiedToken = async(req, res, next) => {
    
    let token;
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
        
    }
    if (!token) {
        res.status(403).send({message: "No token provided!"});
        return
    }

    jwt.verify(token, jwtPassword, async (err, decoded) => {
        if (err) {
            res.status(401).send({message: "Unauthorized!"});
            return
        }
        req.userId = decoded.id
        
        next()
    });
}
export const isAdmin = async (req,res,next) => {
    User.findOne({_id: req.userId})
    .then((user) => {
        if(user.isAdmin){
            next()
        } else {
            return res.status(401).send({message: "Unauthorized!"});
        }
    })
    .catch((err) => res.status(401).send({message: "Unauthorized!"}))

}

export const auth = {
    verifiedToken,
    isAdmin
}