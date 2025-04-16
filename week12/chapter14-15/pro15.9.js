//Grouping a set of documents by specific fields in a MongoDB
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
 // Grouping words by first and last letter that end with a vowel
 await groupItemsByFirstAndLast(collection);
 // Grouping words by first letter and size greater than 13
 await groupItemsByFirstLetterAndSize(collection);
 // Grouping words by first letter, counting vowels and consonants
 await groupItemsByFirstLetterAndVowelsConsonants(collection);
 // Close the connection after the queries
 await client.close();
 console.log("Connection closed");
 } catch (err) {
 console.error("Error:", err);
 }
}
async function groupItemsByFirstAndLast(collection) {
 try {
 const results = await collection.aggregate([
 {
 $match: {
 first: 'o',
 last: { $in: ['a', 'e', 'i', 'o', 'u'] },
 }
 },
 {
 $group: {
 _id: { first: "$first", last: "$last" },
 count: { $sum: 1 }
 }
 }
 ]).toArray();
 console.log("\n'O' words grouped by first and last letter that end with a vowel: ");
 console.log(results);
 } catch (err) {
 console.error("Error in groupItemsByFirstAndLast:", err);
 }
}
async function groupItemsByFirstLetterAndSize(collection) {
 try {
 const results = await collection.aggregate([
 {
 $match: { size: { $gt: 13 } }
 },
 {
 $group: {
 _id: "$first",
 count: { $sum: 1 },
 totalVowels: { $sum: "$stats.vowels" }
 }
 }
 ]).toArray();
 console.log("\nWords grouped by first letter larger than 13 characters: ");
 console.log(results);
 } catch (err) {
 console.error("Error in groupItemsByFirstLetterAndSize:", err);
 }
}
async function groupItemsByFirstLetterAndVowelsConsonants(collection) {
 try {
 const results = await collection.aggregate([
 {
 $group: {
 _id: "$first",
 count: { $sum: 1 },
 vowels: { $sum: "$stats.vowels" },
 consonants: { $sum: "$stats.consonants" }
 }
 },
 {
 $project: {
 total: { $add: ["$vowels", "$consonants"] },
 count: 1,
 vowels: 1,
 consonants: 1
 }
 }
 ]).toArray();
 console.log("\nWords grouped by first letter with vowel and consonant counts: ");
 console.log(results);
 } catch (err) {
 console.error("Error in groupItemsByFirstLetterAndVowelsConsonants:", err);
 }
}
// Run the main function
main();