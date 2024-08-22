import mongoose from "mongoose";

const HealthTipSchema = new mongoose.Schema(
    {
        header:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        images:[
            {type:String}
        ]
    },
    {timestamps:true}
);

const HealthTip = mongoose.model('HealthTip', HealthTipSchema);

export default HealthTip;