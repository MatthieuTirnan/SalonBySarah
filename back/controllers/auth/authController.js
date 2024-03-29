import jwt from "jsonwebtoken";

import User from "../../models/usersShema.js";

export const register = async(req, res) => {
    
    const { pseudo, email, password } = req.body;
    const newUser = new User({
        pseudo,
        email,
        password,
        isAdmin: email === process.env.ADMIN_PASSWORD,
    });
    const jwt = newUser.createJWT();
    
    newUser.save()
        .then((newUser) => {
            console.log(newUser);
            res.status(200).json({ user: newUser, jwt, isMatch: true });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

export const login = async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user == null) {
        res.status(400).json({ message: "identifiant incorrect" });
    }
    else {
        user.comparePassword(password, async(err, isMatch) => {
            if (isMatch) {
                const jwt = user.createJWT();
                res.status(200).json({ user, jwt, isMatch });
            }
            else {
                res.status(400).json({ message: "identifiant incorrect" });
            }
        });
    }
};

export const userprovider = async(req, res) => {
    let token;
    if (req.headers["authorization"] !== undefined) {
        token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
        res.status(403).send({ message: "No token provided!" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            res.status(403).send({ message: "Unauthorized!" });
            return;
        }
        const user = await User.findOne({ _id: decoded.id });

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
