import mongoose from "mongoose";

let inboxSchema = mongoose.Schema({

        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Inbox", inboxSchema);