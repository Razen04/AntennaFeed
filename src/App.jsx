import { Analytics } from "@vercel/analytics/react"

import { apiUrl } from "./config";
import { useEffect, useState } from "react";
import userProfile from "./userProfile";
import MobileView from "./components/MobileLayout/MobileView";
import DesktopView from "./components/DesktopLayout/DesktopView";
import { compressFeed, decompressFeed } from "../utils/helper";
import { openDatabase, getArticleFromDatabase, storeUserProfile, storeFeedData, getProfileFromDatabase, getFeedFromDatabase, storeArticleData } from "./db/database";
import { registerServiceWorker } from "./serviceWrokerManager";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [showNotification, setShowNotification] = useState(false);

  // Export Feed Button Logic
  const handleExportFeeds = () => {
    const feeds = JSON.parse(localStorage.getItem("userFeeds")) || [];
    if (feeds.length === 0) {
      alert("No feeds to export!");
      return;
    }
    const blob = new Blob([JSON.stringify(feeds, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "feeds-export.json";
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  const handleReload = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: "skipWaiting" });
    }
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  // Register Service Worker
  useEffect(() => {
    registerServiceWorker(() => setShowNotification(true));
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [profile, setProfile] = useState({ ...userProfile, id: "profile" });
  const [db, setDb] = useState(null);

  const [fetchedFeeds, setFetchedFeeds] = useState([{
    url: "1",
    fetchedDate: Date.now(),
    feed: ""
  }]); // New state for feeds

  const [toggle, setToggle] = useState({
    addToggle: false,
    addOpmlToggle: false,
    toggleSubscription: true,
    sidebarToggle: false,
    distractionToggle: false,
    loadingAnimationToggle: false,
    changelogToggle: false
  }); // All the toggles in the app.

  const [selected, setSelected] = useState({
    folderSelected: '',
    fileSelected: '',
    articleSelected: ''
  }); // All the selections in the app.

  const [feedInfo, setFeedInfo] = useState({
    feedUrl: null,
    feedData: null,
    fetchFeedLink: null
  }); // All the feed related states in the app.

  const [article, setArticle] = useState({
    fetchedArticles: [],
    articleView: 'unread',
    fullArticleLoaded: false,
    fullArticle: {
      feed: '',
      image: ''
    },
    filteredArticles: [],
    articleHeading: {
      title: '',
      author: [],
      pubDate: '',
      link: '',
      isRead: false,
      isStarred: false
    }
  }); // All the article related states in the app.

  const [folders, setFolders] = useState([]);
  const [changelog, setChangelog] = useState('');
  const [newProfile, setNewProfile] = useState(feedInfo.feedData);
  const [isInitialized, setisInitialized] = useState(false);

  // This effect will open the database and fetch the user profile, update feeds and articles array
  useEffect(() => {
    console.log("Initializing profile....")
    const initializeProfile = async () => {
      try {
        const dbInstance = await openDatabase(); // Wait for the DB to open and get the instance
        setDb(dbInstance); // Set the db instance once it's ready

        // Parallel fetching of data
        const [savedProfile, savedFeeds, savedArticles] = await Promise.all([
          getProfileFromDatabase(dbInstance),
          getFeedFromDatabase(dbInstance),
          getArticleFromDatabase(dbInstance)
        ])

        if (savedProfile) {
          console.log("Getting profile from IndexedDB...");
          console.log("Saved Profile: ", savedProfile)
          setProfile(savedProfile);
        } else {
          setProfile(profile)
        }

        if (savedFeeds) {
          console.log("Saved Feeds: ", savedFeeds)
          setFetchedFeeds(savedFeeds);
        }

        if (savedArticles) {
          setArticle(prev => ({ ...prev, fetchedArticles: savedArticles }));
        }

      } catch (error) {
        console.error('Error initializing profile:', error);
      } finally {
        setisInitialized(true);
      }
    };

    initializeProfile();

  }, []);

  // This effect will save the user profile whenever it changes
  useEffect(() => {
    if (profile && db) {
      console.log("Profile stored.")
      storeUserProfile(profile, db); // Pass the db instance to store the profile
    }
  }, [profile, db]);


  // This effect will store the fetchedFeeds in the indexedDB
  useEffect(() => {
    if (fetchedFeeds && fetchedFeeds.length > 0 && db) {
      fetchedFeeds.forEach(async (feed) => {
        console.log("Feeds stored.")
        storeFeedData(feed, db);
      });
    }
  }, [fetchedFeeds, db]);


  // Save articles to IndexedDB whenever they change
  useEffect(() => {
    if (article.fetchedArticles.length > 0 && db) {
      console.log("Article stored.")
      storeArticleData(article.fetchedArticles, db);
    }
  }, [article.fetchedArticles, db]);


  /* useEffect(() => {
    const now = Date.now();

    const updatedFeeds = fetchedFeeds.filter((feed) => {
      const fetchedDate = feed?.fetchedDate; // Safeguard against undefined
      if (!fetchedDate) {
        console.warn("Feed missing fetchedDate:", feed);
        return false; // Exclude feeds without a valid fetchedDate
      }
      return now - fetchedDate <= 24 * 60 * 60 * 1000; // Retain feeds within 24 hours
    });

    setFetchedFeeds(updatedFeeds);
  }, [fetchedFeeds]); */


  // Merges new feeds with existing ones while avoiding duplicates
  const addNewFeeds = (newFeeds, oldFeeds, url) => {
    console.log("New feeds: ", newFeeds);
    console.log("Old feeds: ", oldFeeds);

    // Step 1: Find the relevant old feed matching the URL
    const oldActualFeed = oldFeeds.find(feed => feed.url === url);
    if (!oldActualFeed) {
      console.log(`No old feed found for URL: ${url}`);
      return newFeeds; // Return old feeds unchanged if no match
    }

    console.log("Old Actual Feed: ", oldActualFeed)
    console.log("Decompressed old actual feeds: ", decompressFeed(oldActualFeed.feed));

    // Step 2: Create a Set of unique identifiers from the old feed's articles
    const oldFeedIdentifiers = new Set(
      decompressFeed(oldActualFeed.feed).items.map(feed => feed.id || feed.url)
    );

    // Step 3: Filter new feeds to only include items not already in the old feed
    const filteredFeeds = newFeeds.items.filter(
      feed => !oldFeedIdentifiers.has(feed.id || feed.url)
    );

    // Step 4: Update the old feed with the new items
    const updatedFeed = {
      ...oldActualFeed,
      feed: [...oldActualFeed.feed, ...filteredFeeds], // Append new items
    };

    // Step 5: Replace the old feed in the list with the updated one
    const updatedFeeds = oldFeeds.map(feed =>
      feed.url === url ? updatedFeed : feed
    );

    console.log("Updated feed from addNewFeeds: ", updatedFeeds)
    return updatedFeeds;
  };

  // Use effect to handle fetching of feeds
  useEffect(() => {
    const fetchFeed = async (feedLink) => {
      setToggle(prev => ({ ...prev, loadingAnimationToggle: true }));
      try {
        let response = await fetch(`${apiUrl}/feeds/fetch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedLink })
        });

        console.log("Response: ", response)

        if (!response.ok) {
          alert("Unable to fetch feed from the link.");
          // Add an error component instead of anything else
          setToggle(prev => ({ ...prev, loadingAnimationToggle: false }));
          return;
        }

        const data = await response.json();
        if (!data.relevantFeedData) {
          alert("No relevant data.");
          // Add an error component instead of anything else
          return;
        }
        console.log("relevant feed data: ", data.relevantFeedData);

        const newFeeds = addNewFeeds(data.relevantFeedData, fetchedFeeds, feedLink);
        console.log("Feeds going into fetched feeds: ", newFeeds)

        setFetchedFeeds(prev => [...prev, {
          url: feedLink,
          fetchedDate: Date.now(),
          feed: compressFeed(newFeeds)
        }]);

        const feedSelected = fetchedFeeds.find(feed => feed.url === feedLink);
        let newFeedData = [];
        if (feedSelected) {
          console.log("Feed selected: ", decompressFeed(feedSelected.feed));
          newFeedData = decompressFeed(feedSelected.feed);
        } else {
          console.log("Feed selected: ", data.relevantFeedData);
          newFeedData = data.relevantFeedData;
        }

        setFeedInfo(prev => ({ ...prev, feedData: newFeedData }));
        setArticle(prev => ({ ...prev, fullArticleLoaded: false }));
      } catch (error) {
        alert("Error fetching the feeds. Try again later.");
        // Add an error component instead of anything else
        console.error(error);
        setToggle(prev => ({ ...prev, loadingAnimationToggle: false }));
      } finally {
        setToggle(prev => ({ ...prev, loadingAnimationToggle: false }));
      }

      setToggle(prev => ({ ...prev, addToggle: false }));
    };

    if (feedInfo.fetchFeedLink) {
      fetchFeed(feedInfo.fetchFeedLink);
    }
  }, [feedInfo.fetchFeedLink])

  // To fetch feeds from the source linked to the above useEffect
  const handleAddFeed = (feedLink) => {
    setFeedInfo(prev => ({ ...prev, fetchFeedLink: feedLink, feedUrl: feedLink }));
  };

  // Handles initial feed loading when the app starts
  const handleFirstLoad = () => {
    if (!profile?.feeds?.subscribed?.children || !fetchedFeeds) {
      console.warn("Data not ready. handleFirstLoad skipped.");
      return;
    }

    let lastSelectedFile = null;
    console.log("First Loading...")

    // Find the last selected file
    profile?.feeds?.subscribed?.children?.some(child => {
      lastSelectedFile = child.children?.find(feed => feed.selected === true) || child.selected === true;
      return lastSelectedFile; // Exit loop early if a selected feed is found
    });

    console.log("File selected the last time: ", lastSelectedFile)
    if (!lastSelectedFile) {
      console.log("No file was selected in the last session.");
      return; // Exit early if no file is selected
    }

    setSelected(prev => ({ ...prev, fileSelected: lastSelectedFile.xmlurl }));

    const fetchedFeedForLastSelectedFile = fetchedFeeds?.find(
      feed => feed.url === lastSelectedFile.xmlurl
    );

    if (fetchedFeedForLastSelectedFile) {
      console.log("Fetched feed for last selected file: ", fetchedFeedForLastSelectedFile)
      const now = Date.now();
      const fetchedDate = fetchedFeedForLastSelectedFile.fetchedDate;

      if (now - fetchedDate < 24 * 60 * 60 * 1000) {
        console.log("relevant feed data: ", decompressFeed(fetchedFeedForLastSelectedFile.feed))
        const decompressedData = decompressFeed(fetchedFeedForLastSelectedFile.feed);

        if (decompressedData) {
          console.log("Getting feed from DB...")
          setFeedInfo(prev => ({ ...prev, feedData: decompressedData }));
        } else {
          console.error("Failed to decompress feeds.");
        }
      } else {
        console.log("Cache expired, fetching new data.");
        handleAddFeed(lastSelectedFile.xmlurl);
      }
    } else {
      console.warn("No fetched feed found for the last selected file.");
      /* handleAddFeed(lastSelectedFile.xmlurl); // Fetch the feed if it wasn't cached */
    }
  };

  // This useEffect will run when the isInitialized state is changed which will then run the handleFirstLoad for the user
  useEffect(() => {
    console.log("Initializing completed: ", isInitialized)
    if (!isInitialized) {
      console.log("Skipping.. ");
      return;
    }
    const lastSessionTime = localStorage.getItem('lastSessionTime');
    const now = Date.now();

    console.log("Last Session Time: ", lastSessionTime)
    console.log("Feed Data: ", feedInfo.feedData)
    console.log("Profile: ", profile)

    // Ensure profile and fetchedFeeds are available before triggering handleFirstLoad
    if (!lastSessionTime || now - parseInt(lastSessionTime, 10) > 0 || !feedInfo.feedData) {
      if (profile && profile?.feeds && profile?.feeds?.subscribed && fetchedFeeds) {
        handleFirstLoad();
      } else {
        console.warn("Profile or fetchedFeeds not ready yet.");
      }
    }

    localStorage.setItem('lastSessionTime', now.toString());
  }, [isInitialized]);


  // This function fetches the changelog from the public folder
  const fetchChangelog = async () => {
    try {
      const response = await fetch('/changelog.md');
      if (!response.ok) {
        throw new Error('Failed to fetch changelog');
      }
      const text = await response.text();
      setChangelog(text);
      setToggle(prev => ({ ...prev, changelogToggle: true }));
    } catch (error) {
      console.error(error);
      setChangelog('Error loading changelog. Please try again later.');
    }
  };

  // Finds a specific feed from fetchedFeeds array
  const findSelectedFeed = (url, fetchedFeeds) => {
    console.log("New Fetched Feeds: ", fetchedFeeds);
    console.log("url: ", url)
    const feedSelected = fetchedFeeds.find(feed => feed.url === url);
    console.log("feedSelcted: ", feedSelected)
    return feedSelected;
  }

  // This useEffect updates the feed data when the fetchedFeeds changes which is using the findSelectedFeed function
  useEffect(() => {
    console.log("feedInfo.feedurl: ", feedInfo.feedUrl);

    const selectedFeed = findSelectedFeed(feedInfo.feedUrl, fetchedFeeds);

    if (selectedFeed) {
      const decompressedItems = decompressFeed(selectedFeed.feed);
      console.log("decompressedItems: ", decompressedItems)

      setFeedInfo(prev => ({
        ...prev,
        feedData: {
          ...prev.feedData,
          items: [
            ...prev.feedData.items.filter(
              item => !decompressedItems.some(newItem => newItem.link === item.link) || !decompressedItems.items.some(newItem => newItem.link === item.link)
            ), // Keep only unique items
            ...decompressedItems.items,
          ],
        },
      }));
    }
  }, [fetchedFeeds]);


  return (
    <div>
      {isMobile ? (
        <div className={`overflow-hidden`}>
          <MobileView
            toggle={toggle}
            setToggle={setToggle}
            profile={profile}
            setProfile={setProfile}
            fetchedFeeds={fetchedFeeds}
            setFetchedFeeds={setFetchedFeeds}
            folders={folders}
            setFolders={setFolders}
            selected={selected}
            setSelected={setSelected}
            feedInfo={feedInfo}
            setFeedInfo={setFeedInfo}
            article={article}
            setArticle={setArticle}
            newProfile={newProfile}
            setNewProfile={setNewProfile}
            fetchChangelog={fetchChangelog}
            handleAddFeed={handleAddFeed}
            changelog={changelog}
            isInitialized={isInitialized}
          />
        </div >
      ) : (
        <div className="overflow-hidden">
          <DesktopView
            toggle={toggle}
            setToggle={setToggle}
            profile={profile}
            setProfile={setProfile}
            fetchedFeeds={fetchedFeeds}
            setFetchedFeeds={setFetchedFeeds}
            folders={folders}
            setFolders={setFolders}
            selected={selected}
            setSelected={setSelected}
            feedInfo={feedInfo}
            setFeedInfo={setFeedInfo}
            article={article}
            setArticle={setArticle}
            newProfile={newProfile}
            setNewProfile={setNewProfile}
            fetchChangelog={fetchChangelog}
            handleAddFeed={handleAddFeed}
            changelog={changelog}
            isInitialized={isInitialized}
          />
        </div>
      )}


      <div>
        {console.log("Notification: ", showNotification)}
        {showNotification && (
          <Notification
            onExport={handleExportFeeds}
            onReload={handleReload}
            onDismiss={handleDismiss}
          />
        )}
      </div>
      <Analytics />
    </div >

  );
};

export default App;