import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

export const jwtPassword = '37c73fe5834740bbe87bcfe158bae65787323928299a403c88227a476b58d9f9'

let userSchema = mongoose.Schema({
        pseudo:{
            type: String,
            required: true,
            index: { unique: true } },
        email: {
            type: String,
            required: [true, 'This property Email is required'],
            match: /.+\@.+\..+/,
            unique: true
        },
        password: { 
            type: String, 
            required: true 
        },
        isAdmin:Boolean
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
    });
};

userSchema.methods.createJWT = function () {
    return jwt.sign({
    pseudo: this._pseudo,
    id: this._id,
    email: this.email
    }, jwtPassword, {expiresIn: '24h'})
}

userSchema.statics.decodeJWT = async function (token) {
    try {
    const decoded = jwt.verify(token, jwtPassword);
    const user = await this.findOne({ email: decoded.email });

    if (!user) {
    console.log('User not found');
    }
    return user;
    } catch (error) {
            console.log('JWT decoding error');
    }
};

    export default mongoose.model("User", userSchema);