const mongoose =require("mongoose");

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
        description:{
            type:String,
            required:true
        },
        vector_image:{
            type:String,
        },
        images:[
            {type:String}
        ]
    },
    {timestamps:true}
);



module.exports = mongoose.model('HealthTip', HealthTipSchema);