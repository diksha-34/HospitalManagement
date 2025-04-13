const mongoose = require("mongoose");

const connectDb = async () => {
   var  MONGO_URI= "mongodb+srv://rajendersharma95700:dPqJeU3cTuNl6Og8@cluster0.rj4sl.mongodb.net/"
  try {
    if (!MONGO_URI)
      throw new Error("got mongo uri undefined");

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
