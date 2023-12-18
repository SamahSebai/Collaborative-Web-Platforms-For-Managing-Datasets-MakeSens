const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://samahsebaiengineering:test123@cluster0.xlcyfke.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
