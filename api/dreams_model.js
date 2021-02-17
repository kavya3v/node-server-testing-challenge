const db=require('./dbConfig');

module.exports={find,
                findById,
                create,
                update,
                removeById}

async function find(){
 return dreams=await db("dreams")
}

async function findById(dreams_id){
    return dreams= await db("dreams").where("dreams_id",dreams_id).limit(1);
}

async function create(dreams){
    const id= await db("dreams").insert(dreams)
    return findById(id);
}

async function update(body,id){
    const updated = await db("dreams").where("dreams_id",id)
                    .update("dreams_name",body.dreams_name)
    return findById(id);
}

async function removeById(dreams_id){
    return await db("dreams").where("dreams_id",dreams_id).del();
}


