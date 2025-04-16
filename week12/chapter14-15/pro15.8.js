const { MongoClient } = require('mongodb');
async function main() {
 const url = "mongodb://localhost:27017"; // MongoDB connection URL
 const dbName = "words"; // Database name
 try {
 // Connect to MongoDB
 const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
 await client.connect();
 console.log("Connected to MongoDB");
 const db = client.db(dbName); // Access the 'words' database
 const collection = db.collection("word_stats"); // Access the 'word_stats' collection
 // Find distinct values
 await distinctValues(collection);
 // Close the connection after the queries
 await client.close();
 console.log("Connection closed");
 } catch (err) {
 console.error("Error:", err);
 }
}
async function distinctValues(collection) {
 try {
 // Finding distinct sizes of words
 const sizes = await collection.distinct('size');
 console.log("\nSizes of words: ");
 console.log(sizes);
 // Finding distinct first letters of words ending in 'u'
 const firstLettersU = await collection.distinct('first', { last: 'u' });
 console.log("\nFirst letters of words ending in u: ");
 console.log(firstLettersU);
 // Finding distinct numbers of vowels in words
 const vowelCounts = await collection.distinct('stats.vowels');
 console.log("\nNumbers of vowels contained in words: ");
 console.log(vowelCounts);
 } catch (err) {
 console.error("Error in distinctValues:", err);
 }
}
// Run the main function
main();