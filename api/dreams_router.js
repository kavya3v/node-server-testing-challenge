const router=require('express').Router();
const dbModel=require('./dreams_model');
const {validateBody,validateId} = require('./middleware');

router.get('/', async (req,res,next)=>{
    try {
        const dreams= await dbModel.find();
        res.status(200).json(dreams); 
    } catch (err) {
        next(err)
    }  
})

router.get('/:id', async (req,res,next)=>{
     try {
         const [dream]= await dbModel.findById(req.params.id)
         if(!dream){
             return res.status(404).json({message: "No dreams found for this id"})
         }
         else{
            res.status(200).json(dream)
        }
     } catch (err) {
         next(err)
     }
})

router.post('/', validateBody, async (req,res,next)=>{
    try {
        const [post]= await dbModel.create(req.body)
        res.status(201).json(post)
    } catch (err) {
        next(err)
    }
})

router.put('/:id',validateId, validateBody, async (req,res,next)=>{
    try {
        const [update]= await dbModel.update(req.body,req.params.id)
        res.status(200).json(update)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id',validateId, async (req,res,next)=>{
    try {
        const deleted = await dbModel.removeById(req.params.id)
        if(deleted === 1){
            res.status(200).json({message: "delete successful"})
        }else res.status(400).json({message: "Unable to delete"})
    } catch (err) {
        next(err)
    }
})

module.exports=router;