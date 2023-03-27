import mongoose from "mongoose";

let inboxSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
    }],
},
    {
        timestamps: true,
    }
);

inboxSchema.post('save', async function(doc, next) {
    if (doc.message.length === 0) {
        await doc.deleteOne()
    }
    next();
});

export default mongoose.model("Inbox", inboxSchema);