module.exports= {validateBody,validateId}
const dbModel= require('./dreams_model');

function validateBody(req,res,next){
   if(!req.body.dreams_name){
       res.status(400).json({message: "please provide the dream name property"})
   }else{
       next()
   }
}

async function validateId(req,res,next){
    const [valid]= await dbModel.findById(req.params.id)
    console.log('valid',valid)
    if(!valid){
        const err= new Error("Invalid dreams ID")
        err.statusCode=400;
        next(err)
    }else{
        res.dreams=valid
        next()
    }
 }