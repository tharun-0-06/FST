const { MongoClient } = require('mongodb');
async function main() {
 const client = new MongoClient("mongodb://localhost/");
 try {
 await client.connect();
 const db = client.db("words");
 const wordStats = db.collection("word_stats");
 // Perform the queries in sequence and log the results
 await findWordsStartingWithABC(wordStats);
 await findWordsLongerThan12Chars(wordStats);
 await findWordsWithEvenLengths(wordStats);
 await findWordsWith12DistinctLetters(wordStats);
 await findWordsStartAndEndWithVowel(wordStats);
 await findWordsWithMoreThan6Vowels(wordStats);
 await findWordsWithAllVowels(wordStats);
 await findWordsWithNonAlphabetCharacters(wordStats);
 await findWordsWithTwoNonAlphabetChars(wordStats);
 } catch (err) {
 console.error("Error:", err);
 } finally {
 await client.close();
 }
}
async function displayWords(msg, cursor, pretty = true) {
 const itemArr = await cursor.toArray();
 console.log("\n" + msg);
 const wordList = itemArr.map(item => item.word);
 console.log(JSON.stringify(wordList, null, pretty ? 2 : 0));
}
// Find words starting with 'a', 'b', or 'c'
async function findWordsStartingWithABC(wordStats) {
 const cursor = wordStats.find({ first: { $in: ['a', 'b', 'c'] } });
 await displayWords("Words starting with a, b or c: ", cursor);
}
// Find words longer than 12 characters
async function findWordsLongerThan12Chars(wordStats) {
 const cursor = wordStats.find({ size: { $gt: 12 } });
 await displayWords("Words longer than 12 characters: ", cursor);
}
// Find words with even lengths
async function findWordsWithEvenLengths(wordStats) {
 const cursor = wordStats.find({ size: { $mod: [2, 0] } });
 await displayWords("Words with even lengths: ", cursor);
}
// Find words with exactly 12 distinct characters
async function findWordsWith12DistinctLetters(wordStats) {
 const cursor = wordStats.find({ letters: { $size: 12 } });
 await displayWords("Words with 12 distinct characters: ", cursor);
}
// Find words that start and end with a vowel
async function findWordsStartAndEndWithVowel(wordStats) {
 const cursor = wordStats.find({
 $and: [
 { first: { $in: ['a', 'e', 'i', 'o', 'u'] } },
 { last: { $in: ['a', 'e', 'i', 'o', 'u'] } }
 ]
 });
 await displayWords("Words that start and end with a vowel: ", cursor);
}
// Find words containing 7 or more vowels
async function findWordsWithMoreThan6Vowels(wordStats) {
 const cursor = wordStats.find({ "stats.vowels": { $gt: 6 } });
 await displayWords("Words containing 7 or more vowels: ", cursor);
}
// Find words with all 5 vowels (a, e, i, o, u)
async function findWordsWithAllVowels(wordStats) {
 const cursor = wordStats.find({ letters: { $all: ['a', 'e', 'i', 'o', 'u'] } });
 await displayWords("Words with all 5 vowels: ", cursor);
}
// Find words with non-alphabet characters
async function findWordsWithNonAlphabetCharacters(wordStats) {
 const cursor = wordStats.find({ otherChars: { $exists: true } });
 await displayWords("Words with non-alphabet characters: ", cursor);
}
// Find words with exactly 2 non-alphabet characters
async function findWordsWithTwoNonAlphabetChars(wordStats) {
 const cursor = wordStats.find({
 charsets: { $elemMatch: { $and: [{ type: 'other' }, { chars: { $size: 2 } }] } }
 });
 await displayWords("Words with 2 non-alphabet characters: ", cursor);
}
main().catch(console.error);