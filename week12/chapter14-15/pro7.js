const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("astro");
 const nebulae = db.collection("nebulae");
 // Find documents before deletion
 const beforeDelete = await nebulae.find({ type: "planetary" }).toArray();
 console.log("Before Delete:");
 console.log(beforeDelete);
 // Perform the findOneAndDelete operation (deletes the first match)
 const deleteResult = await nebulae.findOneAndDelete(
 { type: "planetary" }, // Filter: Match the first document with type "planetary"
 { writeConcern: { w: 1 } } // Ensure the write is acknowledged
 );
 if (deleteResult) {
 console.log(`Deleted document:`);
 console.log(deleteResult);
 } else {
 console.log("No document matched the filter.");
 }
 // Find documents after deletion
 const afterDelete = await nebulae.find({ type: "planetary" }).toArray();
 console.log("After Delete:");
 console.log(afterDelete);
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);