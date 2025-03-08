export { openDatabase, getArticleFromDatabase, storeUserProfile, storeFeedData, getProfileFromDatabase, getFeedFromDatabase, storeArticleData }

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

const DB_VERSION = 3;
const DB_NAME = "YuReaderDB";
const PROFILE_STORE = "userProfile";
const FEED_STORE = "fetchedFeeds";
const ARTICLE_STORE = "articles";

let db;

// Open the database and create object stores for user profile, feeds, and articles
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // Create the user profile store
            if (!db.objectStoreNames.contains(PROFILE_STORE)) {
                db.createObjectStore(PROFILE_STORE, { keyPath: "id" });
            }


            // Create the fetched feeds store
            if (!db.objectStoreNames.contains(FEED_STORE)) {
                const store = db.createObjectStore(FEED_STORE, { keyPath: "url" });
                store.createIndex("fetchedDate", "fetchedDate");
            }

            // Create the articles store
            if (!db.objectStoreNames.contains(ARTICLE_STORE)) {
                const store = db.createObjectStore(ARTICLE_STORE, { keyPath: "url" });
                store.createIndex("author", "author");
                store.createIndex("publishDate", "publishDate");
                store.createIndex("isRead", "isRead");
                store.createIndex("isStarred", "isStarred");
            }
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject("Error opening database: " + event.target.error);
        };
    });
};

// Function to store the user profile
const storeUserProfile = (profileData, db) => {
    const transaction = db.transaction(PROFILE_STORE, "readwrite");
    const store = transaction.objectStore(PROFILE_STORE);
    const request = store.put(profileData);

    request.onsuccess = () => {
        console.log("User profile stored successfully.");
    };

    request.onerror = (event) => {
        console.error("Error storing user profile:", event.target.error);
    };
};

const storeFeedData = (feedData, db) => {
    // Ensure feedData contains the required "url" property
    if (!feedData || !feedData.url) {
        console.error("Feed data must contain a 'url' property:", feedData);
        return;
    }

    try {
        const transaction = db.transaction(FEED_STORE, "readwrite");
        const store = transaction.objectStore(FEED_STORE);
        const request = store.put(feedData);

        request.onsuccess = () => {
            console.log(`Feed data stored successfully for URL: ${feedData.url}`);
        };

        request.onerror = (event) => {
            console.error(`Error storing feed data:`, event.target.error);
        };
    } catch (error) {
        console.error("Error in storeFeedData function:", error);
    }
};

const storeArticleData = (articles, db) => {
    const transaction = db.transaction(ARTICLE_STORE, "readwrite");
    const store = transaction.objectStore(ARTICLE_STORE);

    articles.forEach((article) => {
        const request = store.put(article);

        request.onsuccess = () => {
            console.log(`Article '${article.url}' stored successfully.`);
        };

        request.onerror = (event) => {
            console.error("Error storing article:", event.target.error);
        };
    });
};


const getProfileFromDatabase = (db) => {
    const transaction = db.transaction([PROFILE_STORE], "readonly");
    const store = transaction.objectStore(PROFILE_STORE);
    const request = store.getAll();  // Since there's only one user profile, this will return it

    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            // Assuming only one profile exists
            resolve(event.target.result[0]);  // Get the first (and only) profile
        };

        request.onerror = (event) => {
            reject('Error fetching user profile: ' + event.target.error);
        };
    });
};


// Function to fetch feed from IndexedDB
const getFeedFromDatabase = (db) => {
    const transaction = db.transaction(FEED_STORE, "readonly");
    const store = transaction.objectStore(FEED_STORE);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error(`Feeds not found`));
    });
};

// Function to fetch article from IndexedDB
const getArticleFromDatabase = (db) => {
    const transaction = db.transaction(ARTICLE_STORE, "readonly");
    const store = transaction.objectStore(ARTICLE_STORE);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(null);
    });
};
