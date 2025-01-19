import { Client, Databases } from "appwrite";
import crypto from "crypto";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite server endpoint
    .setProject("678280d400340cbcd680"); // Your Appwrite project ID

const databases = new Databases(client);


const feedLink = "https://example.com/rss";
const fetchedDate = new Date().toISOString();
const feeds = [
    { title: "Feed 1", link: "https://example.com/1", content: "Content 1" },
    { title: "Feed 2", link: "https://example.com/2", content: "Content 2" },
];

// Generate an MD5 hash of the feed link
const documentId = crypto.createHash('md5').update(feedLink).digest('hex');

const serializedFeeds = feeds.map(feed => JSON.stringify(feed));  // Serialize the feeds array

const createFeedDocument = async () => {
    try {
        const response = await databases.createDocument(
            "678281da0005518463de", // Your Database ID
            "678281e60020712a42ec", // Your Collection ID
            documentId, // Use the feed link as the document ID
            {
                id: feedLink,
                fetchedDate,
                feeds: serializedFeeds,  // Store the serialized JSON string
            }
        );
        console.log("Document created:", response);
    } catch (error) {
        console.error("Error creating document:", error);
    }
};

// createFeedDocument();

const getFeedDocument = async (documentId) => {
    try {
        const document = await databases.getDocument(
            "678281da0005518463de", // Your Database ID
            "678281e60020712a42ec", // Your Collection ID
            documentId  // The document ID (MD5 hash of the feed link)
        );

        // Deserialize each feed back into an object
        const feeds = document.feeds.map(feedString => JSON.parse(feedString));

        console.log("Feeds:", feeds);  // This will show the original feed objects
    } catch (error) {
        console.error("Error fetching document:", error);
    }
};

// Use the documentId (MD5 hash of the feed link) that you used when storing the document
// getFeedDocument(documentId);



