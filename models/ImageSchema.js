import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        imageURL:{
            type: String,
            required:true
        },
        // uploadDate:{
        //     type:Date,
        //     required:true
        // }
    },
    {timestamps:true}
);

const Image = mongoose.model('Image', ImageSchema);

export default Image;