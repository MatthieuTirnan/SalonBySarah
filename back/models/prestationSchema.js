import mongoose from "mongoose";
let prestationSchema = mongoose.Schema({
        genre:{
            type: String,
            enum: ['Homme','Femme'],
            required: true
        },
        prestation: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true 
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model("Prestation", prestationSchema);