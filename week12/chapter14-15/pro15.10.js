//Applying MapReduce by Aggregating Results
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
 // Aggregating the largest and smallest word sizes for words starting with a vowel
 await aggregateLargestSmallestWords(collection);
 // Aggregating stats for 5 four-letter words
 await aggregateStatsForFourLetterWords(collection);
 // Aggregating the letters with the largest average word size
 await aggregateLettersWithLargestAverage(collection);
 // Close the connection after the queries
 await client.close();
 console.log("Connection closed");
 } catch (err) {
 console.error("Error:", err);
 }
}
async function aggregateLargestSmallestWords(collection) {
 try {
 const results = await collection.aggregate([
 {
 $match: {
 first: { $in: ['a', 'e', 'i', 'o', 'u'] } // Match words starting with a vowel
 }
 },
 {
 $group: {
 _id: "$first", // Group by the first letter
 largest: { $max: "$size" }, // Find the largest word size
 smallest: { $min: "$size" }, // Find the smallest word size
 total: { $sum: 1 } // Count the number of words
 }
 },
 {
 $sort: { _id: 1 } // Sort by the first letter in ascending order
 }
 ]).toArray();
 console.log("Largest and smallest word sizes for words beginning with a vowel:");
 console.log(results);
 } catch (err) {
 console.error("Error in aggregateLargestSmallestWords:", err);
 }
}
async function aggregateStatsForFourLetterWords(collection) {
 try {
 const results = await collection.aggregate([
 {
 $match: { size: 4 } // Match only words of size 4
 },
 {
 $limit: 5 // Limit to 5 words
 },
 {
 $project: { _id: "$word", stats: 1 } // Only include the word and its stats
 }
 ]).toArray();
 console.log("Stats for 5 four-letter words:");
 console.log(results);
 } catch (err) {
 console.error("Error in aggregateStatsForFourLetterWords:", err);
 }
}
async function aggregateLettersWithLargestAverage(collection) {
 try {
 const results = await collection.aggregate([
 {
 $group: {
 _id: "$first", // Group by the first letter
 average: { $avg: "$size" } // Calculate the average word size for each letter
 }
 },
 {
 $sort: { average: -1 } // Sort by average word size in descending order
 },
 {
 $limit: 5 // Limit the result to the top 5 letters
 }
 ]).toArray();
 console.log("Letters with largest average word size:");
 console.log(results);
 } catch (err) {
 console.error("Error in aggregateLettersWithLargestAverage:", err);
 }
}
// Run the main function
main();