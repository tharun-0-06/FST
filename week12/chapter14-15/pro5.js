//Upseritng a Document
const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("astro");
 const nebulae = db.collection("nebulae");
 // Find documents before upsert
 const beforeUpsert = await nebulae.find({ type: "diffuse" }).toArray();
 console.log("Before Upsert:");
 console.log(beforeUpsert);
 // Perform the first upsert operation
 const upsertResult = await nebulae.updateOne(
 { type: "diffuse" }, // Filter: Match documents with type "diffuse"
 {
 $set: {
 ngc: "NGC 3372",
 name: "Carina",
 type: "diffuse",
 location: "Carina"
 }
 },
 { upsert: true, writeConcern: { w: 1 } } // Upsert option: Insert if no match
 );
 // Find documents after the first upsert
 const afterUpsert1 = await nebulae.find({ type: "diffuse" }).toArray();
 console.log("After Upsert 1:");
 console.log(afterUpsert1);
 // Fetch the ID of the first item in the result
 const itemID = afterUpsert1[0]._id;
 // Perform the second upsert operation (update the same document)
 const secondUpsertResult = await nebulae.updateOne(
 { _id: itemID }, // Filter: Match by document _id
 {
 $set: {
 ngc: "NGC 3372",
 name: "Carina",
 type: "Diffuse",
 location: "Carina"
 }
 },
 { upsert: true, writeConcern: { w: 1 } }
 );
 // Find the document after the second upsert
 const afterUpsert2 = await nebulae.findOne({ _id: itemID });
 console.log("After Upsert 2:");
 console.log(afterUpsert2);
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
main().catch(console.error);