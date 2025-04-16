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
// Start paging results with a specified page size and starting index
await pagedResults(collection, 0, 10);
// Close the connection after the queries
await client.close();
console.log("Connection closed");
} catch (err) {
console.error("Error:", err);
}
}
async function pagedResults(collection, startIndex, pageSize) {
try {
const cursor = collection.find({ first: 'e' })
.sort({ word: 1 })
.skip(startIndex)
.limit(pageSize);
const items = await cursor.toArray(); // Get documents as an array
if (items.length > 0) {
displayWords(`Page Starting at ${startIndex}`, items);
// If the number of items returned is equal to the page size, continue paging
if (items.length === pageSize) {
await pagedResults(collection, startIndex + pageSize, pageSize); // Go to the next page
}
} else {
console.log("No more results.");
}
} catch (err) {
console.error("Error in pagedResults:", err);
}
}
function displayWords(msg, itemArr) {
console.log("\n" + msg);
const wordList = itemArr.map(item => item.word); // Extract the 'word' field
console.log(JSON.stringify(wordList, null, 2)); // Pretty print the word list
}
// Run the main function
main();