import mongoose from "mongoose";

let messageSchema = mongoose.Schema({

        titre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        },
        src: {
            type: String,
        },
        alt: {type: String},
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Messages", messageSchema);