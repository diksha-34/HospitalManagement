const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error("got mongo uri undefined");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
