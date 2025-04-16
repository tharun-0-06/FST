const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const url = "mongodb://localhost:27017";
const dbName = "words";

async function insertMultipleDocuments() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db(dbName);
        const wordsCollection = db.collection("word_stats");

        // Define multiple documents
        const newDocuments = [
            {
                word: "example",
                first: "e",
                last: "e",
                size: 7,
                letters: ["e", "x", "a", "m", "p", "l"],
                stats: {
                    vowels: 3,
                    consonants: 4
                },
                charsets: [
                    { type: "vowels", chars: ["e", "a", "e"] },
                    { type: "consonants", chars: ["x", "m", "p", "l"] }
                ]
            },
            {
                word: "banana",
                first: "b",
                last: "a",
                size: 6,
                letters: ["b", "a", "n", "a", "n"],
                stats: {
                    vowels: 3,
                    consonants: 3
                },
                charsets: [
                    { type: "vowels", chars: ["a", "a", "a"] },
                    { type: "consonants", chars: ["b", "n"] }
                ]
            },
            {
                word: "window",
                first: "w",
                last: "w",
                size: 6,
                letters: ["w", "i", "n", "d", "o","w"],
                stats: {
                    vowels: 2,
                    consonants: 4
                },
                charsets: [
                    { type: "vowels", chars: ["i", "o"] },
                    { type: "consonants", chars: ["w", "n","d","w"] }
                ]
            },
            {
                word: "cherry",
                first: "c",
                last: "y",
                size: 6,
                letters: ["c", "h", "e", "r", "r", "y"],
                stats: {
                    vowels: 2,
                    consonants: 4
                },
                charsets: [
                    { type: "vowels", chars: ["e"] },
                    { type: "consonants", chars: ["c", "h", "r", "y"] }
                ]
            }
        ];

        // Insert documents
        const result = await wordsCollection.insertMany(newDocuments);
        console.log(`🎉 ${result.insertedCount} documents inserted.`);

        // Fetch and display inserted documents
        const insertedData = await wordsCollection.find({}).toArray();
        console.log("📄 Inserted Documents:");
        console.log(JSON.stringify(insertedData, null, 2));

    } catch (err) {
        console.error("❌ Error inserting documents:", err);
    } finally {
        await client.close();
        console.log("🔒 MongoDB connection closed");
    }
}

// Run it!
insertMultipleDocuments().catch(console.error);
 
