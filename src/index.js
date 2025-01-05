import express from "express";
import connectDB from "./connectDB/db.js";
import app from "./app.js";

app.get('/', (req, res) => res.send("Hello CRM!"));
const PORT = process.env.PORT;

(async () =>{
    try{
        await connectDB();
        app.listen(PORT, () =>  {return console.log(`Server started on port ${PORT}`)});
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})();
