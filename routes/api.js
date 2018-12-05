const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const notification = require('../model');

router.get('/',(req,res,next)=>{
    notification.find()
    .exec()
    .then((docs)=>{
        if(docs){
            res.status(200).json(docs);
        }else{
            res.status(404).json({message:"Oops An error occur"});
        }
    })
})
router.post('/',(req,res,next)=>{

    const notify = new notification({
        _id:mongoose.Types.ObjectId(),
        type: req.body.type,
        title:req.body.title,
        text:req.body.text,
        body:req.body.body,
        expires:req.body.expires,
        name:req.body.name
    })
    notify
    .save()
    .then((result)=>{
        if(result){
            res.status(200).json({
                message:"hurayy",
                notify:notify
                })
        }else{
            res.status(404).json({error:"Data was not found"});
        }
    })
    .catch((err)=>{
        err.status(501).json({error:err});
        //console.log(err);
    })
})
router.get('/:notifyId',(req,res,next)=>{
    const id = req.params.notifyId
    notification.findById(id)
    .exec()
    .then((data)=>{
        if(data){
            res.status(200).json(data);
            console.log(data);
        }else{
            res.status(404).json({message:"Data was not found"});
        }
    }).catch((err)=>{
        res.status(501).json({
            error:err
        })
    })

})
router.delete('/:notifyID',(req,res,next)=>{
    const id = req.params.notifyID;
    notification.remove({_id:id})
    .exec()
    .then((data)=>{
        if(data){
            res.status(200).json({message:"datais deleted"})
        }else{
            res.status(404).json({message:"Opps un error occur"});
        }
    }).catch((err)=>{
        res.status(500).json({message:"error"})
    })
})
module.exports = router;