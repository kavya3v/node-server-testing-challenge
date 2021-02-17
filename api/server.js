const express= require('express');
const dreamRouter=require('./dreams_router');

const server=express();

const cors=require('cors');
const helmet=require('helmet');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/',(req,res)=>{
    res.status(200).json({message: 'Welcome to new API!'})
})

server.use('/dreams',dreamRouter);

//error handler
server.use((error,req,res,next)=>{
    const statusCode=error.statusCode ? error.statusCode : 500
    console.log('error=',error);
    res.status(statusCode).json(error.message);
})

module.exports=server;