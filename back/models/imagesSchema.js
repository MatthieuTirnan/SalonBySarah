import mongoose from "mongoose";

let imageSchema = mongoose.Schema({
        page : {
            type: String,
            enum: [
                'Message',
                'Article',
                'Galerie'
            ],
            required: true,
        },
        alt:{
            type: String,
            required: true,
        },
        src:{},
        fileName:{
            type:String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model("Image", imageSchema);