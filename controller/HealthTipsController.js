const healthTipsSchema = require("../models/HealthTipSchema");
const {response} = require("express");

const create = (req, res) =>{
    const healthTip = new healthTipsSchema({
        header : req.body.header,
        body : req.body.body,
        description : req.body.description,
        vector_image: req.body.vector_image,
        images: req.body.images
    });
    healthTip.save().then(response=>{
        const healthTipId = response._id
        response.status(201).json({
            "message":"health tip saved, healthTip Id:"+healthTipId
        }).catch(error=>{
            return response.status(501).json(error)
        })
    });
}

const findById=(req,resp)=>{
    healthTipsSchema.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message':'healthTip not found!'});
    });
}

const findAll=(req,resp)=>{
    try{
        const {searchText, page=1, size=10}=req.query;

        const pageNumber=parseInt(page);
        const pageSize=parseInt(size);

        const query ={};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip= (pageNumber-1) * pageSize;
        healthTipsSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response=>{
            return resp.status(200).json(response);
        })

    }catch (error){
        console.log(error)
        return resp.status(500).json({'message':'internal server error'});
    }
}

const deleteById=async (req,resp)=>{
    const deleteData = await healthTipsSchema.findByIdAndDelete({'_id':req.params.id});
    if(deleteData){
        return  resp.status(204).json({'message':'deleted'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}

module.exports = {create,findById,findAll,deleteById}