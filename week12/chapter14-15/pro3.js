//Atomically Modifying
const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("astro");
 const nebulae = db.collection("nebulae");
 // Find documents before modification
 const beforeModify = await nebulae.find({ type: "supernova" }).toArray();
 console.log("Before Modify:");
 console.log(beforeModify);
 // Atomically modify a document
 const result = await nebulae.findOneAndUpdate(
 { type: "supernova" }, // Query filter
 { $set: { type: "Super Nova", updated: true } }, // Update operation
 { returnDocument: 'after', writeConcern: { w: 1 } } // Options: return updated doc and ensure
//write success
 );
 console.log("After Modify:");
 console.log(result); // `value` is the updated document
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);