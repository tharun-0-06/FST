//Finding documents in a MongoDB collection
const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("astro");
 const nebulae = db.collection("nebulae");
 // Find all documents in the collection
 const allItems = await nebulae.find().toArray();
 console.log("Document Array:");
 console.log(allItems);
 // Find documents one by one (like `each` behavior, but using async iteration)
 console.log("Iterating over documents one by one:");
 for (const item of allItems) {
 console.log("Singular Document:");
 console.log(item);
 }
 // Find one document with a specific filter (e.g., type: 'planetary')
 const singleItem = await nebulae.findOne({ type: 'planetary' });
 console.log("Found One:");
 console.log(singleItem);

 } catch (err) {
 console.error("Error: ", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);