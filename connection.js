const  mongoose = require("mongoose");
require("dotenv").config();

// const mongo_url = "mongodb+srv://abcdfga:abcdfga@cluster0.1vtnx8y.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
        console.log("database has been connected");
    } else {
        console.log("database connection Failed");
    }
};

module.exports = { connectDB };