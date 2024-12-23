const userProfile = {
    preferences: {
        fontFamily: "default",
        theme: "light", // Options: 'light', 'dark'
        readingMode: "default", // Options: 'default', 'dim'
        customizations: {
            fontSize: "medium", // Options: 'small', 'medium', 'large'
            lineHeight: 1.5 // Example: 1.2, 1.5, etc.
        }
    },
    feeds: {
        subscribed: {
            "id": 0,
            "text": "Default Subscriptions",
            "selected": false,
            "children": [
                {
                    "id": 1,
                    "text": "General News",
                    "selected": false,
                    "children": [
                        {
                            "id": 101,
                            "text": "The Hindu",
                            "title": "The Hindu",
                            "type": "rss",
                            "xmlurl": "https://www.thehindu.com/feeder/default.rss",
                            "#type": "feed",
                            "folder": "General News",
                            "selected": false
                        },
                        {
                            "id": 102,
                            "text": "NDTV",
                            "title": "NDTV",
                            "type": "rss",
                            "xmlurl": "https://feeds.feedburner.com/ndtvnews-top-stories",
                            "#type": "feed",
                            "folder": "General News",
                            "selected": false
                        },
                        {
                            "id": 103,
                            "text": "BBC News",
                            "title": "BBC News",
                            "type": "rss",
                            "xmlurl": "https://www.bbc.co.uk/feeds/rss/news/world/rss.xml",
                            "#type": "feed",
                            "folder": "General News",
                            "selected": false
                        },
                        {
                            "id": 104,
                            "text": "The Guardian",
                            "title": "The Guardian",
                            "type": "rss",
                            "xmlurl": "https://www.theguardian.com/world/india/rss",
                            "#type": "feed",
                            "folder": "General News",
                            "selected": false
                        },
                        {
                            "id": 105,
                            "text": "India Today",
                            "title": "India Today",
                            "type": "rss",
                            "xmlurl": "https://www.indiatoday.in/rss/home",
                            "#type": "feed",
                            "folder": "General News",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "text": "Technology",
                    "selected": false,
                    "children": [
                        {
                            "id": 201,
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "rss",
                            "xmlurl": "https://www.theverge.com/tech/rss/index.xml",
                            "#type": "feed",
                            "folder": "Technology",
                            "selected": false
                        },
                        {
                            "id": 202,
                            "text": "9to5Google",
                            "title": "9to5Google",
                            "type": "rss",
                            "xmlurl": "https://9to5google.com/feed/",
                            "#type": "feed",
                            "folder": "Technology",
                            "selected": false
                        },
                        {
                            "id": 203,
                            "text": "TechCrunch",
                            "title": "TechCrunch",
                            "type": "rss",
                            "xmlurl": "https://techcrunch.com/feed/",
                            "#type": "feed",
                            "folder": "Technology",
                            "selected": false
                        },
                        {
                            "id": 204,
                            "text": "Gadgets360 by NDTV",
                            "title": "Gadgets360 by NDTV",
                            "type": "rss",
                            "xmlurl": "https://gadgets.ndtv.com/tech/rss/feeds",
                            "#type": "feed",
                            "folder": "Technology",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "text": "Science",
                    "selected": false,
                    "children": [
                        {
                            "id": 301,
                            "text": "NASA",
                            "title": "NASA",
                            "type": "rss",
                            "xmlurl": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
                            "#type": "feed",
                            "folder": "Science",
                            "selected": false
                        },
                        {
                            "id": 302,
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "rss",
                            "xmlurl": "https://www.theverge.com/science/rss/index.xml",
                            "#type": "feed",
                            "folder": "Science",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 4,
                    "text": "Sports",
                    "selected": false,
                    "children": [
                        {
                            "id": 401,
                            "text": "BBC Sport",
                            "title": "BBC Sport",
                            "type": "rss",
                            "xmlurl": "http://feeds.bbci.co.uk/sport/rss.xml",
                            "#type": "feed",
                            "folder": "Sports",
                            "selected": false
                        },
                        {
                            "id": 402,
                            "text": "NDTV Sports",
                            "title": "NDTV Sports",
                            "type": "rss",
                            "xmlurl": "https://sports.ndtv.com/rss/all",
                            "#type": "feed",
                            "folder": "Sports",
                            "selected": false
                        },
                        {
                            "id": 403,
                            "text": "Bleacher Report",
                            "title": "Bleacher Report",
                            "type": "rss",
                            "xmlurl": "https://bleacherreport.com/rss",
                            "#type": "feed",
                            "folder": "Sports",
                            "selected": false
                        },
                        {
                            "id": 404,
                            "text": "GoalServe",
                            "title": "GoalServe",
                            "type": "rss",
                            "xmlurl": "https://www.goalserve.com/rss",
                            "#type": "feed",
                            "folder": "Sports",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 5,
                    "text": "Entertainment",
                    "selected": false,
                    "children": [
                        {
                            "id": 501,
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "rss",
                            "xmlurl": "https://www.theverge.com/rss/entertainment/index.xml",
                            "#type": "feed",
                            "folder": "Entertainment",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 6,
                    "text": "Finance",
                    "selected": false,
                    "children": [
                        {
                            "id": 601,
                            "text": "Moneycontrol",
                            "title": "Moneycontrol",
                            "type": "rss",
                            "xmlurl": "http://www.moneycontrol.com/rss/latestnews.xml",
                            "#type": "feed",
                            "folder": "Finance",
                            "selected": false
                        },
                        {
                            "id": 602,
                            "text": "Economic Times",
                            "title": "Economic Times",
                            "type": "rss",
                            "xmlurl": "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
                            "#type": "feed",
                            "folder": "Finance",
                            "selected": false
                        },
                        {
                            "id": 603,
                            "text": "Business Line",
                            "title": "Business Line",
                            "type": "rss",
                            "xmlurl": "https://www.thehindubusinessline.com/feeder/default.rss",
                            "#type": "feed",
                            "folder": "Finance",
                            "selected": false
                        }
                    ]
                }
            ]
        }, // Array of user-subscribed feeds with metadata
        fetchedFeeds: [], // Cached feeds with timestamps, keyed by feed URL or ID
    },
    history: {
        readArticles: [], // List of article IDs or URLs the user has read
        starredArticles: [], // List of user-starred or favorite articles
        lastSession: {
            timestamp: Date.now(), // Timestamp of the last session
            activeFeed: "feed-1" // ID of the last active feed
        }
    },
    notifications: {
        enabled: true, // Whether notifications are allowed
        frequency: "daily", // Options: 'immediate', 'daily', 'weekly'
    },
    importExport: {
        lastImportedOPML: null, // Details of the last imported OPML file
        lastExportedOPML: null // Details of the last exported OPML file
    },
    advancedSettings: {
        cacheDuration: 3600, // Cache duration in seconds
        proxyEnabled: true, // Whether the user uses a proxy
        rateLimitSettings: {
            maxRequests: 10, // Max requests per interval
            interval: 60 // Interval in seconds
        }
    },
    futureFields: {} // Reserved for future-proofing
};

export default userProfile;