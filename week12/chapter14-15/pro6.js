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
 // Perform the delete operation (delete all documents with type "planetary")
 const deleteResult = await nebulae.deleteMany({ type: "planetary" });
 console.log(`Deleted ${deleteResult.deletedCount} documents.`);
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