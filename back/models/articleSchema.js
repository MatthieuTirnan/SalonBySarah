import mongoose from "mongoose";

let articleSchema = mongoose.Schema({

        titre:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        image:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        },
        imagepath:{type:String},
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Article", articleSchema);