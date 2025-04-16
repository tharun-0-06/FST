const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost:27017");
 try {
 await client.connect();
 const db = client.db("db");
 const nebulae = db.collection("nebulae");
 // Find the document before modification
 const item = await nebulae.findOne({ type: "supernova" });
 if(!item)
 console.log("Before Save:");
 console.log(item);
 // Modify the document
 item.info = 'Some New Info';
 // Save the modified document (using updateOne)
 const result = await nebulae.updateOne(
 { _id: item._id }, // Query filter by _id
 { $set: { info: item.info } }, // Update operation to set new info
 { writeConcern: { w: 1 } } // Ensure the write operation is acknowledged
 );
 // Fetch and display the document after the update
 const savedItem = await nebulae.findOne({ _id: item._id });
 console.log("After Save:");
 console.log(savedItem);
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);