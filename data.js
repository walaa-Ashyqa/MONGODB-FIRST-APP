const { MongoClient ,ObjectId} = require("mongodb");
 
// Replace the following with your Atlas connection string
const url = "mongodb+srv://walaa:Qj0aHvADeUJcFyk3@mycluster.bgqicch.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";


const client = new MongoClient(url);
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();

         // Get the database and collection on which to run the operation
         const db = client.db("gettingStarted");
         const col = db.collection("users");

         // Create new documents                                                                                                                                         
         const peopleDocuments = [
           {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
           },
           {
             "name": { "first": "Grace", "last": "Hopper" },
             "birth": new Date(1906, 12, 9), // Dec 9, 1906                                                                                                                                 
             "death": new Date(1992, 1, 1),  // Jan 1, 1992                                                                                                                                  
             "contribs": [ "Mark I", "UNIVAC", "COBOL" ],
             "views": 3860000
           }
         ]

         // Insert the documents into the specified collection        
        // const p = await col.insertMany(peopleDocuments);

         // Find the document
         const filter = { "name.last": "Turing" };
         const filter2={_id:new ObjectId("65f9d0ace3fa2ef62e1cad38")};
         const filter3 = { views: 3860000 };
         const document = await col.findOne(filter);
         const document2 = await col.findOne(filter2);
         const document3 = await col.findOne(filter3);
        //  const document4 =await col.find({"views":3860000},(error,user)=>{
        //     if(error) {console.log("error")}
        //     console.log("\nDocument found33:\n")
        //     console.log(user)
        // })
         // Print results
         console.log("Document found 1:\n" + JSON.stringify(document));
         console.log("\nDocument found 2:\n" + JSON.stringify(document2));
         console.log("\nDocument found 3:\n" + JSON.stringify(document3));
       
         const cursor = await col.find({});
         await cursor.forEach(element => {
            console.log(element)
         });

        
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
