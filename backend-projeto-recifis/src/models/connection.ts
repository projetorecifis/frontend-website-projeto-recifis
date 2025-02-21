import mongoose, { Document, Schema } from "mongoose";

class Connection{
    private db: any;
    private url?: string = process.env.BASE_URL_MONGODB;

    constructor(){
        this.url = process.env.BASE_URL_MONGODB;
    }

    public async run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        if(this.url){
          this.db = await mongoose.connect(this.url, {
            dbName: process.env.DB_NAME,
          });
          console.log("Connected to MongoDB!");
          return "Pinged your deployment. You successfully connected to MongoDB!"
        }
        throw Error("Url not found - MongoDB");
      } catch (e) {
          console.error(e);
          throw Error("Error to connect to MongoDB");
      }
    }

    public getDB(){
      return this.db;
    }
}

export default Connection;