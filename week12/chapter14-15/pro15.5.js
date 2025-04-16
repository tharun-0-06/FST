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
// Query for a word with fields excluded
const wordWithoutCharset = await collection.findOne(
{ word: 'example' },
{ projection: { charsets: 0 } } // Excluding 'charsets' field
);
console.log("Excluding fields object:");
console.log(JSON.stringify(wordWithoutCharset, null, 2));
// Query for a word with specific fields included
const wordWithSelectedFields = await collection.findOne(
{ word: 'the' },
{ projection: { word: 1, size: 1, stats: 1 } } // Including 'word', 'size', and 'stats'
);
console.log("Including fields object:");
console.log(JSON.stringify(wordWithSelectedFields, null, 2));
// Close the connection after the queries
await client.close();
console.log("Connection closed");
} catch (err) {
console.error("Error:", err);
}
}
// Run the main function
main();