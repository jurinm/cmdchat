const dorenv = require("dotenv");
dorenv.config();
const MongoClient = require("mongodb").MongoClient;

let mongoClient;
mongoClient = new MongoClient(process.env.DBURI);
module.exports = {
  Connect: function dbConnect () {
    try {
      console.log("Connecting to MongoDB Atlas cluster...");
      mongoClient.connect();
      const db = mongoClient.db("chat");
      const messages = db.collection("messages");
      console.log("Successfully connected to MongoDB Atlas!");

      return messages;
    } catch (error) {
      console.error("Connection to MongoDB Atlas failed!", error);
      process.exit();
    }
  },
};

