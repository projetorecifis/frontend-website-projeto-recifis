// import ContentModel from "./content.model";
// import mongoose, { Document, Schema } from "mongoose";
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "x";

// export interface IContent extends Document {
//   title: string;
//   description: string;
// }

// const schema = new Schema<IContent>({
//   title:{
//       type: String,
//       required: true
//   },
//   description:{
//       type: String,
//       required: true
//   }
// });

// const Category = mongoose.model<IContent>('News', schema);
// class Connection{
//     private client: any;
//     private db : any;

//     constructor(){
//         this.client = new MongoClient(uri, {
//           serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//           },
//           serverSelectionTimeoutMS: 3000,
//         });
//     }

//     public async run() {
//       try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await this.client.connect();

//         const db = this.client.db("projetorecifis");
//         this.db = db;

//         // ContentModel.putCollection();

//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

   

      

//         // Send a ping to confirm a successful connection
//         // await this.client.db("projetorecifis").command({ ping: 1 });

//         // this.db = this.client.db("projetorecifis");

        
        


//         // const content = this.client.db("projetorecifis").collection("news").find();
//         // // const response = await content.save();
//         // console.log(content);

//         // console.log(this.db)
    
//         // console.log(await client.db("projetorecifis").stats())
        
       
//       } catch (e) {
//         console.log("entrou aqui?", e)
//         // Ensures that the client will close when you finish/error
//         await this.client.close();
//       }
//     }

//     public getDB(){
//       return this.db;
//     }
//     // Create a MongoClient with a MongoClientOptions object to set the Stable API version

// }

// export default new Connection();