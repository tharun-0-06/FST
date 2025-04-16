//Limiting the specific set of documents in a MongoDB collection
const { MongoClient } = require('mongodb');
async function main() {
const url = "mongodb://localhost:27017"; // MongoDB connection URL
const dbName = "words"; // The database name
try {
// Connect to MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
console.log("Connected to MongoDB");
const db = client.db(dbName); // Get the database
const collection = db.collection("word_stats"); // Get the collection
// Query for words starting with 'a', 'b', or 'c'
const wordsStartingABC = await collection.find({ first: { $in: ['a', 'b', 'c'] } }).toArray();
displayWords("Words starting with a, b, or c:", wordsStartingABC);
// Query for words longer than 12 characters
const wordsLongerThan12 = await collection.find({ size: { $gt: 12 } }).toArray();
displayWords("Words longer than 12 characters:", wordsLongerThan12);
// Close the connection after all queries are done
await client.close();
console.log("Connection closed");
} catch (err) {
console.error("Error:", err);
}
}
function displayWords(msg, items) {
console.log("\n" + msg);
const wordList = items.map(item => item.word); // Extracting the 'word' field from the 
console.log(JSON.stringify(wordList, null, 2)); // Pretty print the word list
}
// Run the main function
main();