import { Analytics } from "@vercel/analytics/react"

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Articles from "./components/Articles/Articles";
import Reader from "./components/ReaderPanel/Reader";
import userProfile from "./userProfile";
import AddFeed from "./components/Add Feed/AddFeed";
import { gzip, ungzip } from "pako";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Changelog from "./components/Changelog/Changelog";

const App = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : userProfile;
  });

  const [feedUrl, setFeedUrl] = useState([]);
  const [feedData, setFeedData] = useState(null);
  const [addToggle, setAddToggle] = useState(false);
  const [addOpmlToggle, setAddOpmlToggle] = useState(false);
  const [toggleSubscription, setToggleSubscription] = useState(true);
  const [fullArticleLoaded, setFullArticleLoaded] = useState(false);
  const [fullArticle, setFullArticle] = useState('');
  const [folderSelected, setFolderSelected] = useState();
  const [fileSelected, setFileSelected] = useState();
  const [articleSelected, setArticleSelected] = useState('');
  const [articleHeading, setArticleHeading] = useState({
    title: '',
    author: [],
    pubDate: '',
    link: ''
  });
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [distraction, setDistraction] = useState(false);
  const [folders, setFolders] = useState([]);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [fetchFeedLink, setFetchFeedLink] = useState(null);
  const [changelogVisible, setChangelogVisible] = useState(false);
  const [changelog, setChangelog] = useState('');

  const decompressFeed = (compressedFeeds) => {
    if (compressedFeeds.length === 0) {
      return [];
    }
    try {
      const decompressed = ungzip(compressedFeeds, { to: 'string' });
      console.log("Decompressed Feed:", decompressed); // Add logging
      return JSON.parse(decompressed);
    } catch (error) {
      console.error("Error decompressing feed:", error);
      return null;
    }
  }

  const compressedFeed = (feeds) => {
    if (feeds.length === 0) {
      return [];
    }
    try {
      if (feeds) {
        const feedString = JSON.stringify(feeds);
        const compressed = gzip(feedString);
        console.log("Compressed Feed:", compressed); // Add logging
        return compressed;
      } else {
        return feeds;
      }

    } catch (error) {
      console.error("Error compressing feed:", error);
      return null;
    }
  };

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  // To periodically delete old feeds
  useEffect(() => {
    const updatedFeeds = (feeds) => {
      const now = Date.now();
      return feeds.filter(feed => {
        const fetchedDate = feed?.fetchedDate; // Safeguard against undefined
        if (!fetchedDate) {
          console.warn("Feed missing fetchedDate:", feed);
          return false; // Exclude feeds without a valid fetchedDate
        }
        let newFeeds = now - fetchedDate <= 24 * 60 * 60 * 1000; // Retain feeds within 24 hours
        console.log("New Feeds: ", newFeeds);
        return newFeeds;
      });
    };

    setProfile(prevProfile => {
      const currentFeeds = prevProfile?.feeds?.fetchedFeeds; // Default to empty array
      return {
        ...prevProfile,
        feeds: {
          ...prevProfile.feeds,
          fetchedFeeds: updatedFeeds(currentFeeds),
        },
      };
    });
  }, []);

  useEffect(() => {
    const fetchFeed = async (feedLink) => {
      try {
        let response = await fetch(`${apiUrl}/feeds/fetch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedLink })
        });

        if (!response.ok) {
          toast.error("Unable to fetch feed from the link.");
          setLoadingAnimation(false);
          return;
        }

        const data = await response.json();
        setLoadingAnimation(false);
        if (!data.relevantFeedData) {
          toast.error("Unable to fetch feed from the link.");
          return;
        }



        setFeedData(data.relevantFeedData);
        updateProfileWithFeed(feedLink, data.relevantFeedData);
        setFullArticleLoaded(false)
      } catch (error) {
        toast.error("Error fetching the feeds. Try again later.");
        console.error(error);
        setLoadingAnimation(false);
      }
      setAddToggle(false);
    };

    if (fetchFeedLink) {
      fetchFeed(fetchFeedLink);
      setFetchFeedLink(null);
    }
  }, [fetchFeedLink])

  const handleAddFeed = (feedLink) => {
    setLoadingAnimation(true);
    setFetchFeedLink(feedLink);
  };

  const updateProfileWithFeed = (feedLink, feedData) => {
    setProfile((prevProfile) => {
      const isFeedAlreadyFetched = prevProfile.feeds.fetchedFeeds.some(feed => feed.id === feedLink);

      if (!isFeedAlreadyFetched) {
        const compressedFeeds = compressedFeed(feedData);
        if (!compressedFeeds) {
          toast.error("Error compressing the feed.");
          return prevProfile;
        }

        const feedSize = compressedFeeds.length;
        console.log("FeedSize: ", feedSize / (1024 * 1024));
        const MAX_FEED_SIZE = 20 * 1024;
        if (feedSize > MAX_FEED_SIZE) {
          console.warn("Feed is too large, skipping it: ", feedSize / 1024);
          toast.error("Feed is too large, skipping it.");
          return prevProfile;
        }

        const updatedFeeds = [...prevProfile.feeds.fetchedFeeds, { id: feedLink, fetchedDate: Date.now(), feed: compressedFeeds }];

        return {
          ...prevProfile,
          feeds: {
            ...prevProfile.feeds,
            fetchedFeeds: updatedFeeds,
          }
        };
      }

      return prevProfile;
    });
  };

  const fetchChangelog = async () => {
    console.log("Fetching change log")
    try {
      const response = await fetch('/changelog.md');
      if (!response.ok) {
        throw new Error('Failed to fetch changelog');
      }
      const text = await response.text();
      console.log("Changelog text: ", text)
      setChangelog(text);
      setChangelogVisible(true);
    } catch (error) {
      console.error(error);
      setChangelog('Error loading changelog. Please try again later.');
    }
  };

  return (
    <div>
      <div className={`block xl:hidden overflow-hidden`}>
        <div>
          <div className={`w-96 z-99 ${addToggle || addOpmlToggle ? 'pointer-events-none blur-md' : ''}`}>
            {sidebarToggle &&
              (<Sidebar
                profile={profile}
                setAddOpmlToggle={setAddOpmlToggle}
                setProfile={setProfile}
                folders={folders}
                setFolders={setFolders}
                distraction={distraction}
                folderSelected={folderSelected}
                setFolderSelected={setFolderSelected}
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                handleAddFeed={handleAddFeed}
                setToggleSubscription={setToggleSubscription}
                toggleSubscription={toggleSubscription}
                feedUrl={feedUrl}
                setFeedUrl={setFeedUrl}
                setAddToggle={setAddToggle}
                addToggle={addToggle}
                setArticleHeading={setArticleHeading}
                setFeedData={setFeedData}
                decompressFeed={decompressFeed}
                compressedFeed={compressedFeed}
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
                loadingAnimation={loadingAnimation}
                setLoadingAnimation={setLoadingAnimation}
                feedData={feedData}
                fetchChangelog={fetchChangelog}
              />)}
          </div>
          <div className={`absolute ${fullArticleLoaded ? 'hidden' : ''} overflow-hidden left-0 z-90 w-full transition-opacity duration-300 ${sidebarToggle ? 'opacity-70 pointer-events-none' : 'opacity-150'}`}>
            {(<Articles
              fileSelected={fileSelected}
              setFeedData={setFeedData}
              profile={profile}
              setProfile={setProfile}
              feedData={feedData}
              distraction={distraction}
              setFullArticle={setFullArticle}
              articleSelected={articleSelected}
              setArticleSelected={setArticleSelected}
              setArticleHeading={setArticleHeading}
              setLoadingAnimation={setLoadingAnimation}
              decompressFeed={decompressFeed}
              compressedFeed={compressedFeed}
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              fullArticle={fullArticle}
              fullArticleLoaded={fullArticleLoaded}
              setFullArticleLoaded={setFullArticleLoaded}
              loadingAnimation={loadingAnimation}
            />)}
          </div>
          <div className={`absolute left-0 overflow-hidden z-90 w-full transition-opacity duration-300 ${sidebarToggle ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {fullArticleLoaded && (
              <>
                <Reader
                  feedData={feedData}
                  distraction={distraction}
                  setDistraction={setDistraction}
                  fullArticle={fullArticle}
                  folderSelected={folderSelected}
                  fileSelected={fileSelected}
                  articleSelected={articleSelected}
                  articleHeading={articleHeading}
                  loadingAnimation={loadingAnimation}
                  setLoadingAnimation={setLoadingAnimation}
                  setFullArticleLoaded={setFullArticleLoaded}
                  sidebarToggle={sidebarToggle}
                  setSidebarToggle={setSidebarToggle}
                />
              </>

            )}

          </div>


          <div className="w-96 z-99">
            {sidebarToggle && addToggle && (
              <AddFeed
                addToggle={addToggle}
                setAddToggle={setAddToggle}
                folders={folders}
                setProfile={setProfile}
                setAddOpmlToggle={setAddOpmlToggle}
              />
            )}
          </div>
          {changelogVisible && <div className="absolute w-lvw h-full flex justify-center items-center bg-inherit z-50">
            {<Changelog setChangelogVisible={setChangelogVisible} changelog={changelog} />}
          </div>}
          <ToastContainer />
        </div>

      </div >

      <div className="hidden xl:block overflow-hidden">
        <div className={`flex h-lvh ${addToggle || addOpmlToggle ? 'pointer-events-none blur-md' : ''}`}>
          <Sidebar
            profile={profile}
            setAddOpmlToggle={setAddOpmlToggle}
            setProfile={setProfile}
            folders={folders}
            setFolders={setFolders}
            distraction={distraction}
            folderSelected={folderSelected}
            setFolderSelected={setFolderSelected}
            fileSelected={fileSelected}
            setFileSelected={setFileSelected}
            handleAddFeed={handleAddFeed}
            setToggleSubscription={setToggleSubscription}
            toggleSubscription={toggleSubscription}
            feedUrl={feedUrl}
            setFeedUrl={setFeedUrl}
            setAddToggle={setAddToggle}
            addToggle={addToggle}
            setArticleHeading={setArticleHeading}
            setFeedData={setFeedData}
            decompressFeed={decompressFeed}
            compressedFeed={compressedFeed}
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
            loadingAnimation={loadingAnimation}
            setLoadingAnimation={setLoadingAnimation}
            feedData={feedData}
            fetchChangelog={fetchChangelog}
          />
          {feedData && (
            <>
              <Reader
                feedData={feedData}
                distraction={distraction}
                setDistraction={setDistraction}
                fullArticle={fullArticle}
                folderSelected={folderSelected}
                fileSelected={fileSelected}
                articleSelected={articleSelected}
                articleHeading={articleHeading}
                loadingAnimation={loadingAnimation}
                setLoadingAnimation={setLoadingAnimation}
              />
              <Articles
                fileSelected={fileSelected}
                setFeedData={setFeedData}
                profile={profile}
                setProfile={setProfile}
                feedData={feedData}
                distraction={distraction}
                setFullArticle={setFullArticle}
                articleSelected={articleSelected}
                setArticleSelected={setArticleSelected}
                setArticleHeading={setArticleHeading}
                setLoadingAnimation={setLoadingAnimation}
                decompressFeed={decompressFeed}
                compressedFeed={compressedFeed}
                setFullArticleLoaded={setFullArticleLoaded}
              />
            </>
          )}
          {changelogVisible && <div className="absolute w-lvw h-full flex justify-center items-center bg-inherit z-50">
            {<Changelog setChangelogVisible={setChangelogVisible} changelog={changelog} />}
          </div>}
        </div>

        {addToggle && (
          <AddFeed
            addToggle={addToggle}
            setAddToggle={setAddToggle}
            folders={folders}
            setProfile={setProfile}
            setAddOpmlToggle={setAddOpmlToggle}
          />
        )}
        <ToastContainer />
      </div>
      <Analytics />
    </div >

  );
};

export default App;