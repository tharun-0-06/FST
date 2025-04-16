const { MongoClient } = require('mongodb');
// Connection URL and Database name
const url = "mongodb://localhost:27017"; // Your MongoDB URL
const dbName = "words"; // Your database name
// Async function to perform database queries
async function main() {
 const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
 try {
 // Connect to the MongoDB server
 await client.connect();
 console.log("Connected to MongoDB");
 const db = client.db(dbName);
 const wordsCollection = db.collection("word_stats");
 // Run all queries
 await findWordsStartingWithABC(wordsCollection);
 await findWordsLongerThan12Chars(wordsCollection);
 await findWordsWithEvenLengths(wordsCollection);
 await findWordsWith12DistinctChars(wordsCollection);
 await findWordsWithVowelsAtStartAndEnd(wordsCollection);
 await findWordsWith7OrMoreVowels(wordsCollection);
 await findWordsWithAllVowels(wordsCollection);
 await findWordsWithNonAlphabetChars(wordsCollection);
 await findWordsWith2NonAlphabetChars(wordsCollection);
 } catch (err) {
 console.error("An error occurred:", err);
 } finally {
 // Close the connection after all queries are done
 await client.close();
 console.log("MongoDB connection closed");
 }
}
// Display the words from the query result
function displayWords(msg, items) {
 const wordList = items.map(item => item.word);
 console.log("\n" + msg);
 console.log(JSON.stringify(wordList, null, 2)); // Pretty print with 2 spaces indentation
}
// Queries:
async function findWordsStartingWithABC(collection) {
 const cursor = await collection.find({ first: { $in: ['a', 'b', 'c'] } }).toArray();
 displayWords("Words starting with a, b, or c: ", cursor);
}
async function findWordsLongerThan12Chars(collection) {
 const cursor = await collection.find({ size: { $gt: 12 } }).toArray();
 displayWords("Words longer than 12 characters: ", cursor);
}
async function findWordsWithEvenLengths(collection) {
 const cursor = await collection.find({ size: { $mod: [2, 0] } }).toArray();
 displayWords("Words with even lengths: ", cursor);
}
async function findWordsWith12DistinctChars(collection) {
 const cursor = await collection.find({ letters: { $size: 12 } }).toArray();
 displayWords("Words with 12 distinct characters: ", cursor);
}
async function findWordsWithVowelsAtStartAndEnd(collection) {
 const cursor = await collection.find({
 $and: [
 { first: { $in: ['a', 'e', 'i', 'o', 'u'] } },
 { last: { $in: ['a', 'e', 'i', 'o', 'u'] } }
 ]
 }).toArray();
 displayWords("Words that start and end with a vowel: ", cursor);
}
async function findWordsWith7OrMoreVowels(collection) {
 const cursor = await collection.find({ "stats.vowels": { $gt: 6 } }).toArray();
 displayWords("Words containing 7 or more vowels: ", cursor);
}
async function findWordsWithAllVowels(collection) {
 const cursor = await collection.find({ letters: { $all: ['a', 'e', 'i', 'o', 'u'] } }).toArray();
 displayWords("Words with all 5 vowels: ", cursor);
}
async function findWordsWithNonAlphabetChars(collection) {
 const cursor = await collection.find({ otherChars: { $exists: true } }).toArray();
 displayWords("Words with non-alphabet characters: ", cursor);
}
async function findWordsWith2NonAlphabetChars(collection) {
 const cursor = await collection.find({
 charsets: { $elemMatch: { $and: [{ type: 'other' }, { chars: { $size: 2 } }] } }
 }).toArray();
 displayWords("Words with 2 non-alphabet characters: ", cursor);
}
// Run the main function
main().catch(console.error);