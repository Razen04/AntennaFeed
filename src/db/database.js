const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

const DB_VERSION = 1;
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
                const store = db.createObjectStore(PROFILE_STORE, { keyPath: "id" });
                store.createIndex("userName", "userName", { unique: true });
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
const storeUserProfile = (profileData) => {
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

// Function to store fetched feed data
const storeFeedData = (feedUrl, feedData) => {
    const transaction = db.transaction(FEED_STORE, "readwrite");
    const store = transaction.objectStore(FEED_STORE);
    const request = store.put(feedData);

    request.onsuccess = () => {
        console.log(`Feed data for '${feedUrl}' stored successfully.`);
    };

    request.onerror = (event) => {
        console.error(`Error storing feed data for '${feedUrl}':`, event.target.error);
    };
};

// Function to store an article
const storeArticleData = (article) => {
    const transaction = db.transaction(ARTICLE_STORE, "readwrite");
    const store = transaction.objectStore(ARTICLE_STORE);
    const request = store.put(article);

    request.onsuccess = () => {
        console.log(`Article '${article.url}' stored successfully.`);
    };

    request.onerror = (event) => {
        console.error("Error storing article:", event.target.error);
    };
};

// Function to fetch feed from IndexedDB
const getFeedFromDatabase = (feedUrl) => {
    const transaction = db.transaction(FEED_STORE, "readonly");
    const store = transaction.objectStore(FEED_STORE);
    const request = store.get(feedUrl);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error(`Feed '${feedUrl}' not found`));
    });
};

// Function to fetch article from IndexedDB
const getArticleFromDatabase = (articleUrl) => {
    const transaction = db.transaction(ARTICLE_STORE, "readonly");
    const store = transaction.objectStore(ARTICLE_STORE);
    const request = store.get(articleUrl);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(null);
    });
};

// Function to check if the feed needs updating (3-hour rule)
const checkAndUpdateFeed = async (feedUrl) => {
    try {
        const feed = await getFeedFromDatabase(feedUrl);
        const currentTime = Date.now();
        const threeHoursInMs = 3 * 60 * 60 * 1000;

        // Check if the feed is older than 3 hours
        if (currentTime - feed.fetchedDate > threeHoursInMs) {
            // Fetch the new feed (you'll replace this with actual fetching logic)
            const newFeedData = await fetchNewFeed(feedUrl);
            appendNewArticles(feedUrl, newFeedData);
        }
    } catch (error) {
        console.error("Error checking and updating feed:", error);
    }
};

// Function to append new articles to an existing feed
const appendNewArticles = (feedUrl, newFeedData) => {
    getFeedFromDatabase(feedUrl).then((existingFeed) => {
        const newArticles = newFeedData.articles.filter(article => {
            return !existingFeed.articles.some(existingArticle => existingArticle.id === article.id);
        });

        existingFeed.articles = [...existingFeed.articles, ...newArticles];
        storeFeedData(feedUrl, existingFeed);
    });
};

// Function to fetch and store an article
const fetchArticle = async (articleUrl) => {
    try {
        let article = await getArticleFromDatabase(articleUrl);

        if (!article) {
            // If not found in DB, fetch the article (replace with actual fetching logic)
            article = await fetchArticleData(articleUrl);
            storeArticleData(article);
        }

        return article;
    } catch (error) {
        console.error("Error fetching article:", error);
    }
};

// Example fetch function to simulate fetching new feed data
const fetchNewFeed = async (feedUrl) => {
    // Simulate a fetch request to get new feed data
    console.log("Fetching new feed for", feedUrl);
    return {
        url: feedUrl,
        fetchedDate: Date.now(),
        articles: [] // Simulated article list
    };
};

// Example fetch function to simulate fetching article data
const fetchArticleData = async (articleUrl) => {
    // Simulate a fetch request to get article data
    console.log("Fetching article for", articleUrl);
    return {
        url: articleUrl,
        content: "This is the full content of the article"
    };
};

// Initialize database and perform actions
openDatabase().then(() => {
    // Store user profile example
    storeUserProfile({
        id: "user123",
        userName: "John Doe",
        preferences: {}
    });

    // Store feed data example
    storeFeedData("https://example.com/feed", {
        url: "https://example.com/feed",
        fetchedDate: Date.now(),
        articles: []
    });

    // Store article data example
    storeArticleData({
        url: "https://example.com/article1",
        content: "This is an article."
    });
}).catch((error) => {
    console.error("Error opening database:", error);
});
