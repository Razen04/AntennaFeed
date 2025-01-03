const userProfile = {
    userName: "",
    preferences: {
        theme: "default", // Options: 'light', 'dark'
        readingMode: "default", // Options: 'default', 'dim'
        customizations: {
            fontFamily: "default",
            fontSize: "medium", // Options: 'small', 'medium', 'large'
            fontWeight: "regular"
        }
    },
    feeds: {
        "subscribed": {
            "title": "My Combined Subscriptions",
            "children": [
                {
                    "text": "General News",
                    "children": [
                        {
                            "text": "The Hindu",
                            "title": "The Hindu",
                            "type": "sub-parent",
                            "xmlurl": "https://www.thehindu.com/feeder/default.rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "ed4ca4b5-72e6-4e2f-b2e0-3744f9840633",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "NDTV",
                            "title": "NDTV",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.feedburner.com/ndtvnews-top-stories",
                            "#type": "feed",
                            "folder": null,
                            "id": "13a43ef5-3dca-42ab-964e-38db438e7bc7",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "The Guardian",
                            "title": "The Guardian",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theguardian.com/world/india/rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "cba342f6-22db-4cb7-afa5-67d9665790c1",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "India Today",
                            "title": "India Today",
                            "type": "sub-parent",
                            "xmlurl": "https://www.indiatoday.in/rss/home",
                            "#type": "feed",
                            "folder": null,
                            "id": "a98064cc-47b5-45ec-afd4-cef66a7bd6f7",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "BBC News",
                            "title": "BBC News",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.bbci.co.uk/news/rss.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "03fa64e5-330f-48ff-b6cd-be0feca43fd6",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Reuters",
                            "title": "Reuters",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/www.reuters.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "3ae80e00-5207-4b90-98c8-80c1881df86f",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Al Jazeera",
                            "title": "Al Jazeera",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/www.aljazeera.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "6257e8d4-a6c4-4532-8182-3e51a13bee01",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "b36a46bb-ad28-4ed6-8c2d-e6a32b4fd653",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Technology",
                    "children": [
                        {
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theverge.com/tech/rss/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "8a31e365-00d5-4d6e-8448-42ac7af29e2c",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "9to5Google",
                            "title": "9to5Google",
                            "type": "sub-parent",
                            "xmlurl": "https://9to5google.com/feed/",
                            "#type": "feed",
                            "folder": null,
                            "id": "ccdc46ca-9f77-4b33-b34e-ea2eae1f8644",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "TechCrunch",
                            "title": "TechCrunch",
                            "type": "sub-parent",
                            "xmlurl": "https://techcrunch.com/feed/",
                            "#type": "feed",
                            "folder": null,
                            "id": "a868b532-68f5-40f8-9200-93067f79f532",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Ars Technica",
                            "title": "Ars Technica",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/arstechnica.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "9c1c5d5b-10f4-4023-95f0-27ff3bed0760",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "acb4467e-9ce2-4bb6-ada5-5652945ad3d4",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Programming",
                    "children": [
                        {
                            "text": "Hacker News",
                            "title": "Hacker News",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/news.ycombinator.com/news",
                            "#type": "feed",
                            "folder": null,
                            "id": "f9548d4b-22f5-4380-a54c-ee60de645026",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Ray Wenderlich",
                            "title": "Ray Wenderlich",
                            "type": "sub-parent",
                            "xmlurl": "https://www.raywenderlich.com/feed",
                            "#type": "feed",
                            "folder": null,
                            "id": "d0ff2534-0639-436f-bd49-a805fc2977c0",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Coding Horror",
                            "title": "Coding Horror",
                            "type": "sub-parent",
                            "xmlurl": "http://feeds.feedburner.com/codinghorror",
                            "#type": "feed",
                            "folder": null,
                            "id": "3f49b88a-cf15-454a-837a-ccaa03e28788",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "56303048-e98a-45df-8c94-9e56ddf5d217",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Science",
                    "children": [
                        {
                            "text": "NASA",
                            "title": "NASA",
                            "type": "sub-parent",
                            "xmlurl": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "54e4b33d-89fc-4074-a7d0-da76838de549",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theverge.com/science/rss/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "6c6c5df7-97b9-4f72-8dd9-98e22b912960",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Nature",
                            "title": "Nature",
                            "type": "sub-parent",
                            "xmlurl": "https://www.nature.com/nmat/current_issue/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "f0f301b8-617c-4727-bcf7-c870c44119a8",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "ed49ec7a-35a1-459c-8b41-fe56007a5bba",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Sports",
                    "children": [
                        {
                            "text": "ESPN",
                            "title": "ESPN",
                            "type": "sub-parent",
                            "xmlurl": "https://www.espn.com/espn/rss/news",
                            "#type": "feed",
                            "folder": null,
                            "id": "e3f38bf3-b6f3-4ead-a41e-4f3d7e46ee17",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Sky Sports",
                            "title": "Sky Sports",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.skynews.com/feeds/rss/home.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "533d5e57-583f-48d3-8a54-0d6aa08812f7",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Deadspin",
                            "title": "Deadspin",
                            "type": "sub-parent",
                            "xmlurl": "https://deadspin.com/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "5b15c547-324f-47cb-87ea-846521e12008",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "386ab5e1-d2db-4a1a-849b-dd8b9a69a0d5",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Entertainment",
                    "children": [
                        {
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theverge.com/rss/entertainment/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "7941414b-1b45-4c24-9be2-c9b175b69710",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Variety",
                            "title": "Variety",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/variety.com/feed/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "c02a0cfc-806a-424a-81ae-06dc9a847b4f",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "BuzzFeed",
                            "title": "BuzzFeed",
                            "type": "sub-parent",
                            "xmlurl": "https://www.buzzfeed.com/in/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "f55c2331-85d4-44bf-8fbd-f5de1c6abcbf",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "af5ab5f3-32f2-4d0c-8409-1927ba48fbe7",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                },
                {
                    "text": "Finance",
                    "children": [
                        {
                            "text": "Moneycontrol",
                            "title": "Moneycontrol",
                            "type": "sub-parent",
                            "xmlurl": "http://www.moneycontrol.com/rss/latestnews.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "379eff6a-c955-4a8d-b5ab-e7510eff0a52",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Economic Times",
                            "title": "Economic Times",
                            "type": "sub-parent",
                            "xmlurl": "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
                            "#type": "feed",
                            "folder": null,
                            "id": "75c31e53-228b-4849-aeb7-2405d2b4aaa3",
                            "selected": false,
                            "level": 3
                        },
                        {
                            "text": "Business Line",
                            "title": "Business Line",
                            "type": "sub-parent",
                            "xmlurl": "https://www.thehindubusinessline.com/feeder/default.rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "87175e00-0292-4a32-9285-79d74a275fb3",
                            "selected": false,
                            "level": 3
                        }
                    ],
                    "id": "adaf861c-3e88-461d-a6b2-51fa800cfa6d",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent"
                }
            ],
            "id": "e9b279b9-9664-45f7-a840-3fa4b7d82c69",
            "selected": false,
            "folder": null,
            "level": 1,
            "type": "sub-parent"
        },// Array of user-subscribed feeds with metadata
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