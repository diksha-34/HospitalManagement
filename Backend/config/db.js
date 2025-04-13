const mongoose = require("mongoose");

const connectDb = async () =>{
    try{
        if(!process.env.MONGO_URI)
            throw new error("got mongo uri undefined")
     
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDb;
