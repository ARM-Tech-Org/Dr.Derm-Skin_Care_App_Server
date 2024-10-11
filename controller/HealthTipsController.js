/*
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
        res.status(201).json({
            "message":"health tip saved, healthTip Id:"+healthTipId
        }).catch(error=>{
            return res.status(501).json(error)
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

const findAll=(req,res)=>{
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
            return res.status(200).json(response);
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({'message':'internal server error'});
    }
}

const deleteById=async (req,res)=>{
    const deleteData = await healthTipsSchema.findByIdAndDelete({'_id':req.params.id});
    if(deleteData){
        return  res.status(204).json({'message':'deleted'});
    }else{
        return res.status(500).json({'message':'internal server error'});
    }
}

module.exports = {create,findById,findAll,deleteById}*/
const healthTipsSchema = require("../models/HealthTipSchema");

const create = (req, res) => {
    const healthTip = new healthTipsSchema({
        header: req.body.header,
        body: req.body.body,
        description: req.body.description,
        vector_image: req.body.vector_image,
        images: req.body.images
    });

    healthTip.save()
        .then(response => {
            const healthTipId = response._id;
            res.status(201).json({
                message: "Health tip saved, healthTip Id: " + healthTipId
            });
        })
        .catch(error => {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        });
}

const findById = (req, res) => {
    healthTipsSchema.findOne({ '_id': req.params.id })
        .then(selectedObj => {
            if (selectedObj) {
                return res.status(200).json(selectedObj);
            }
            return res.status(404).json({ message: 'Health tip not found!' });
        })
        .catch(error => {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        });
}

const findAll = (req, res) => {

    try {
        const { searchText, page = 1, size = 10 } = req.query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};

        if (searchText) {
            query.$text = { $search: searchText };
        }

        const skip = (pageNumber - 1) * pageSize;
        healthTipsSchema.find(query)
            .limit(pageSize)
            .skip(skip)
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json({ message: 'Internal server error', error: error.message });
            });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const deleteById = async (req, res) => {
    try {
        const deleteData = await healthTipsSchema.findByIdAndDelete(req.params.id);
        if (deleteData) {
            return res.status(200).json({ message: 'deleted' });
        } else {
            return res.status(404).json({ message: 'Health tip not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { create, findById, findAll, deleteById };
