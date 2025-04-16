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
 // Sort by word (ascending)
 await sortItems(collection);
 // Close the connection after the queries
 await client.close();
 console.log("Connection closed");
 } catch (err) {
 console.error("Error:", err);
 }
}
async function sortItems(collection) {
 // Sorting words that end with 'w'
 const wordsEndingWithW = await collection.find({ last: 'w' }).toArray();
 displayWords("Words ending in w:", wordsEndingWithW);
 // Sorting words ending with 'w' in ascending order
 const wordsSortedAsc = await collection.find({ last: 'w' }).sort({ word: 1 }).toArray();
 displayWords("Words ending in w sorted ascending:", wordsSortedAsc);
 // Sorting words ending with 'w' in descending order
 const wordsSortedDesc = await collection.find({ last: 'w' }).sort({ word: -1 }).toArray();
 displayWords("Words ending in w sorted descending:", wordsSortedDesc);
 // Sorting words that start with 'b', first by size descending, then by last letter ascending
 const wordsBSizeDescLastAsc = await collection.find({ first: 'b' })
 .sort([['size', -1], ['last', 1]])
 .toArray();
 displayWords("B words sorted by size then by last letter:", wordsBSizeDescLastAsc);
 // Sorting words that start with 'b', first by last letter ascending, then by size descending
 const wordsBLastAscSizeDesc = await collection.find({ first: 'b' })
 .sort([['last', 1], ['size', -1]])
 .toArray();
 displayWords("B words sorted by last letter then by size:", wordsBLastAscSizeDesc);
}
function displayWords(msg, itemArr) {
 console.log("\n" + msg);
 const wordList = itemArr.map(item => item.word); // Extract the 'word' field
 console.log(JSON.stringify(wordList, null, 2)); // Pretty print the word list
}
// Run the main function
main();