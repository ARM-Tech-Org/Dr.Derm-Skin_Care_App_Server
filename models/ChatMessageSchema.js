import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        // diagnosis_Id:{
        //     type:String,
        //     required:true
        // },
        message:{
            type:String
        },
        image_url:{
            type:String
        }
    },
    {timestamps:true}
);

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;