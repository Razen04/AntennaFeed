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
                            "id": "259248d1-e1a9-4d9d-9923-95fe574d2237",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.thehindu.com"
                        },
                        {
                            "text": "NDTV",
                            "title": "NDTV",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.feedburner.com/ndtvnews-top-stories",
                            "#type": "feed",
                            "folder": null,
                            "id": "93fcefe5-4116-4278-86bb-4d56b01bc664",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=feeds.feedburner.com"
                        },
                        {
                            "text": "The Guardian",
                            "title": "The Guardian",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theguardian.com/world/india/rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "613643b7-a15d-4fba-9a4c-72800f7fe355",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.theguardian.com"
                        },
                        {
                            "text": "India Today",
                            "title": "India Today",
                            "type": "sub-parent",
                            "xmlurl": "https://www.indiatoday.in/rss/home",
                            "#type": "feed",
                            "folder": null,
                            "id": "9f589d3e-893b-41a8-a773-9f55ab9af9b7",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.indiatoday.in"
                        },
                        {
                            "text": "BBC News",
                            "title": "BBC News",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.bbci.co.uk/news/rss.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "7cdad7fa-a481-457f-af02-00058fa107dc",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=feeds.bbci.co.uk"
                        },
                        {
                            "text": "Reuters",
                            "title": "Reuters",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/www.reuters.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "536ff10f-c1ef-4b59-bda8-e56840e26b81",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.reuters.com"
                        },
                        {
                            "text": "Al Jazeera",
                            "title": "Al Jazeera",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/www.aljazeera.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "e402730f-4aac-4d6e-abfb-c9d5915ecb6d",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.aljazeera.com"
                        }
                    ],
                    "id": "70916aa6-bbfc-4f3e-9a10-a9be054655c8",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "30386f9c-35c5-4ef8-9352-5157e3c67914",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.theverge.com"
                        },
                        {
                            "text": "9to5Google",
                            "title": "9to5Google",
                            "type": "sub-parent",
                            "xmlurl": "https://9to5google.com/feed/",
                            "#type": "feed",
                            "folder": null,
                            "id": "01d30134-7a98-434f-9826-8fcb8af3abbc",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=9to5google.com"
                        },
                        {
                            "text": "TechCrunch",
                            "title": "TechCrunch",
                            "type": "sub-parent",
                            "xmlurl": "https://techcrunch.com/feed/",
                            "#type": "feed",
                            "folder": null,
                            "id": "c7b139a6-1de7-485e-9889-0c5873334e7f",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=techcrunch.com"
                        },
                        {
                            "text": "Ars Technica",
                            "title": "Ars Technica",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/arstechnica.com",
                            "#type": "feed",
                            "folder": null,
                            "id": "238b9718-6926-40ca-baad-b83cf641f9be",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=arstechnica.com"
                        }
                    ],
                    "id": "59466271-28ff-4f2f-ad14-2a6674834318",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "78ee3274-0443-4016-8876-a5177be97242",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=news.ycombinator.com"
                        },
                        {
                            "text": "Ray Wenderlich",
                            "title": "Ray Wenderlich",
                            "type": "sub-parent",
                            "xmlurl": "https://www.raywenderlich.com/feed",
                            "#type": "feed",
                            "folder": null,
                            "id": "a901f149-a5c2-43d2-8ee9-e56d33961f8d",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.raywenderlich.com"
                        },
                        {
                            "text": "Coding Horror",
                            "title": "Coding Horror",
                            "type": "sub-parent",
                            "xmlurl": "http://feeds.feedburner.com/codinghorror",
                            "#type": "feed",
                            "folder": null,
                            "id": "9dae8e15-a359-4925-8645-db6b975c58b9",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=feeds.feedburner.com"
                        }
                    ],
                    "id": "b7331576-1005-4e95-9590-5d2673752f87",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "67dc7a6c-abff-4a5b-9e87-ab76630ec644",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.nasa.gov"
                        },
                        {
                            "text": "The Verge",
                            "title": "The Verge",
                            "type": "sub-parent",
                            "xmlurl": "https://www.theverge.com/science/rss/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "3d765b89-1eb4-437b-9145-f132cd9994f3",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.theverge.com"
                        },
                        {
                            "text": "Nature",
                            "title": "Nature",
                            "type": "sub-parent",
                            "xmlurl": "https://www.nature.com/nmat/current_issue/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "5ceedb0f-f960-4dcd-aa69-9b371973a53c",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.nature.com"
                        }
                    ],
                    "id": "fb226da8-2886-40e1-86b6-0091c1b86f2b",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "e2b5a6a8-6885-42c9-8393-00347c3542b1",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.espn.com"
                        },
                        {
                            "text": "Sky Sports",
                            "title": "Sky Sports",
                            "type": "sub-parent",
                            "xmlurl": "https://feeds.skynews.com/feeds/rss/home.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "5b54c1e9-b4ec-4b87-9fba-81cd4f2c0a4a",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=feeds.skynews.com"
                        },
                        {
                            "text": "Deadspin",
                            "title": "Deadspin",
                            "type": "sub-parent",
                            "xmlurl": "https://deadspin.com/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "4128ba9e-11cc-4104-b1bc-50298d8346d5",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=deadspin.com"
                        }
                    ],
                    "id": "f086a787-d94a-4c08-8d27-02d3f502e69d",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "77b9002b-d391-4a98-8ae4-7d95826cc126",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.theverge.com"
                        },
                        {
                            "text": "Variety",
                            "title": "Variety",
                            "type": "sub-parent",
                            "xmlurl": "https://openrss.org/variety.com/feed/rss/",
                            "#type": "feed",
                            "folder": null,
                            "id": "3324d941-1447-4e00-9ae7-ac2929a25a59",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=variety.com"
                        },
                        {
                            "text": "BuzzFeed",
                            "title": "BuzzFeed",
                            "type": "sub-parent",
                            "xmlurl": "https://www.buzzfeed.com/in/index.xml",
                            "#type": "feed",
                            "folder": null,
                            "id": "4c0066c1-d4d8-4235-a64a-a9fe56fa3c2f",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.buzzfeed.com"
                        }
                    ],
                    "id": "360294de-39ae-42d9-9754-102b974f4c95",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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
                            "id": "ee3695ff-d8e7-40ee-bcc2-ad3cbdd9b55b",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.moneycontrol.com"
                        },
                        {
                            "text": "Economic Times",
                            "title": "Economic Times",
                            "type": "sub-parent",
                            "xmlurl": "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
                            "#type": "feed",
                            "folder": null,
                            "id": "cc38ca5e-f527-43f1-b32c-f38cf38d3cd1",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=economictimes.indiatimes.com"
                        },
                        {
                            "text": "Business Line",
                            "title": "Business Line",
                            "type": "sub-parent",
                            "xmlurl": "https://www.thehindubusinessline.com/feeder/default.rss",
                            "#type": "feed",
                            "folder": null,
                            "id": "aea59be5-0a86-48d0-98ad-e6eaa828479e",
                            "selected": false,
                            "level": 3,
                            "icon": "https://www.google.com/s2/favicons?sz=64&domain=www.thehindubusinessline.com"
                        }
                    ],
                    "id": "4883a13a-83f5-4b79-bc69-8dd9f0388ff7",
                    "selected": false,
                    "folder": "My Combined Subscriptions",
                    "level": 2,
                    "type": "main-parent",
                    "icon": null
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