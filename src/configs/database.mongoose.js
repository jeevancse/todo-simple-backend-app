import mongoose from "mongoose";


const connectDatabase = async function (req, res) {
    try {
      const connect = await  mongoose.connect("mongodb+srv://jeevan24:Enableit123@authmodule.s3btc.mongodb.net/mytodo");
      if(connect){
          console.log("Database connected successfully.")
      }
    } catch (err) {
        console.error(err)
        
    }
}

connectDatabase();