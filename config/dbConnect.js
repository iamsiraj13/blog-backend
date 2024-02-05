const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const result = await mongoose.connect(process.env.DB_URI);

    if (result) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
