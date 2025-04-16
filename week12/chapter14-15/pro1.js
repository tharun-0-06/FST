//Inserting Multiple Documents using Function:
const { MongoClient } = require('mongodb');
async function addObject(collection, object) {
 try {
 const result = await collection.insertOne(object);
 console.log("Inserted: ", result);
 } catch (err) {
 console.error("Error inserting document: ", err);
 }
}
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("db");
 // Drop the collection if it exists
 await db.collection("nebulae").drop().catch(err => {
 // If collection doesn't exist, ignore the error
 console.log("Collection doesn't exist, skipping drop.");
 });
 // Create a new collection
 const nebulae = await db.createCollection("nebulae");
 // Insert documents into the collection
 await addObject(nebulae, { ngc: "NGC 7293", name: "Helix", type: "planetary", location:
"Aquila" });
 await addObject(nebulae, { ngc: "NGC 6543", name: "Cat's Eye", type: "planetary", location:
"Draco" });
 await addObject(nebulae, { ngc: "NGC 1952", name: "Crab", type: "supernova", location:
"Taurus" });
 } catch (err) {
 console.error("Error: ", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);