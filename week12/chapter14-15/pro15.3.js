//Counting a document
const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("words");
 const wordStats = db.collection("word_stats");
 // Perform the count queries in sequence
 await countWordsStartingWithABC(wordStats);
 await countWordsLongerThan12Chars(wordStats);
 await countWordsWithEvenLengths(wordStats);
 await countWordsWith12DistinctLetters(wordStats);
 await countWordsStartAndEndWithVowel(wordStats);
 await countWordsWithMoreThan6Vowels(wordStats);
 await countWordsWithAllVowels(wordStats);
 await countWordsWithNonAlphabetCharacters(wordStats);
 await countWordsWithTwoNonAlphabetChars(wordStats);
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
// Count words starting with 'a', 'b', or 'c'
async function countWordsStartingWithABC(wordStats) {
 const count = await wordStats.countDocuments({ first: { $in: ['a', 'b', 'c'] } });
 console.log("Words starting with a, b or c: " + count);
}
// Count words longer than 12 characters
async function countWordsLongerThan12Chars(wordStats) {
 const count = await wordStats.countDocuments({ size: { $gt: 12 } });
 console.log("Words longer than 12 characters: " + count);
}
// Count words with even lengths
async function countWordsWithEvenLengths(wordStats) {
 const count = await wordStats.countDocuments({ size: { $mod: [2, 0] } });
 console.log("Words with even lengths: " + count);
}
// Count words with exactly 12 distinct characters
async function countWordsWith12DistinctLetters(wordStats) {
 const count = await wordStats.countDocuments({ letters: { $size: 12 } });
 console.log("Words with 12 distinct characters: " + count);
}
// Count words that start and end with a vowel
async function countWordsStartAndEndWithVowel(wordStats) {
 const count = await wordStats.countDocuments({
 $and: [
 { first: { $in: ['a', 'e', 'i', 'o', 'u'] } },
 { last: { $in: ['a', 'e', 'i', 'o', 'u'] } }
 ]
 });
 console.log("Words that start and end with a vowel: " + count);
}
// Count words containing 7 or more vowels
async function countWordsWithMoreThan6Vowels(wordStats) {
 const count = await wordStats.countDocuments({ "stats.vowels": { $gt: 6 } });
 console.log("Words containing 7 or more vowels: " + count);
}
// Count words with all 5 vowels (a, e, i, o, u)
async function countWordsWithAllVowels(wordStats) {
 const count = await wordStats.countDocuments({ letters: { $all: ['a', 'e', 'i', 'o', 'u'] } });
 console.log("Words with all 5 vowels: " + count);
}
// Count words with non-alphabet characters
async function countWordsWithNonAlphabetCharacters(wordStats) {
 const count = await wordStats.countDocuments({ otherChars: { $exists: true } });
 console.log("Words with non-alphabet characters: " + count);
}
// Count words with exactly 2 non-alphabet characters
async function countWordsWithTwoNonAlphabetChars(wordStats) {
 const count = await wordStats.countDocuments({
 charsets: { $elemMatch: { $and: [{ type: 'other' }, { chars: { $size: 2 } }] } }
 });
 console.log("Words with 2 non-alphabet characters: " + count);
}
main().catch(console.error);