import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Articles from "./components/Articles/Articles";
import Reader from "./components/ReaderPanel/Reader";
import userProfile from "./userProfile";
import AddFeed from "./components/Add Feed/AddFeed";
import AddFeedForm from "./components/Add Feed/AddFeedForm";
// import { v4 as uuidv4 } from "uuid";

const App = () => {
  // State for storing user profile data
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(localStorage.getItem('profile')) : userProfile;
  });

  // Effect to save profile data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  // State for storing feed URLs
  const [feedUrl, setFeedUrl] = useState([]);
  // State for storing feed data
  const [feedData, setFeedData] = useState(null);
  // State for toggling the add feed modal
  const [addToggle, setAddToggle] = useState(false);
  const [addOpmlToggle, setAddOpmlToggle] = useState(false)
  // State for toggling subscriptions view
  const [toggleSubscription, setToggleSubscription] = useState(true);
  // State for storing the full article content
  const [fullArticle, setFullArticle] = useState('');
  // State for storing the selected folder
  const [folderSelected, setFolderSelected] = useState();
  // State for storing the selected file
  const [fileSelected, setFileSelected] = useState();
  // State for storing the selected article
  const [articleSelected, setArticleSelected] = useState('');
  // State for storing the article heading details
  const [articleHeading, setArticleHeading] = useState({
    title: '',
    author: [],
    pubDate: '',
    link: ''
  });
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [distraction, setDistraction] = useState(false)
  const [folders, setFolders] = useState([]);

  // Function to add feeds
  const handleAddFeed = async (feedLink) => {
    console.log(feedLink)
    try {
      let response = await fetch('http://localhost:3000/feeds/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedLink })
      })

      if(!response) {
        console.alert("Unable to fetch feed from the link.")
      }
      
      const data = await response.json()
      if(!data.relevantFeedData) {
        alert("Unable to fetch feed from the link")
      }
      setFeedData(data.relevantFeedData)
      console.log(data.relevantFeedData)

      setProfile((prevProfile) => {
        const isFeedAlreadyFetched = prevProfile.feeds.fetchedFeeds.some(feed => feed.id === feedLink)

        if (!isFeedAlreadyFetched) {

          const feedSize = new TextEncoder().encode(JSON.stringify(data.feed)).length
          console.warn("Feed Size: ", feedSize);
          const MAX_FEED_SIZE = 5 * 1024;
          if (feedSize > MAX_FEED_SIZE) {
            console.warn("Feed is too large, skipping it: ", feedSize);
            return prevProfile;
          }

          const updatedFeeds = [...prevProfile.feeds.fetchedFeeds, { id: feedLink, fetchedDate: Date.now(), feed: data.relevantFeedData }]

          return {
            ...prevProfile,
            feeds: {
              ...prevProfile.feeds,
              fetchedFeeds: updatedFeeds,
            }
          }
        }

        return prevProfile;
      })

    } catch (error) {
      console.error(error)
    }
    setAddToggle(false)
  }

  /* window.addEventListener('beforeunload', () => {
    setProfile(prevProfile => {
      return {
        ...prevProfile,
        history: {
          ...prevProfile.history,
          lastSession: {
            timestamp: Date.now(),
            activeFeed: articleSelected
          }
        }
      }
    })
  }) */

  return (
    <div>
      <div className={`flex ${addToggle || addOpmlToggle ? 'pointer-events-none blur-md' : null}`}>
        <Sidebar profile={profile} setAddOpmlToggle={setAddOpmlToggle} setProfile={setProfile} folders={folders} setFolders={setFolders} distraction={distraction} folderSelected={folderSelected} setFolderSelected={setFolderSelected} fileSelected={fileSelected} setFileSelected={setFileSelected} handleAddFeed={handleAddFeed} setToggleSubscription={setToggleSubscription} toggleSubscription={toggleSubscription} feedUrl={feedUrl} setFeedUrl={setFeedUrl} setAddToggle={setAddToggle} addToggle={addToggle} setArticleHeading={setArticleHeading} setFeedData={setFeedData} />
        {feedData ? <Reader feedData={feedData} distraction={distraction} setDistraction={setDistraction} fullArticle={fullArticle} folderSelected={folderSelected} fileSelected={fileSelected} articleSelected={articleSelected} articleHeading={articleHeading} loadingAnimation={loadingAnimation} setLoadingAnimation={setLoadingAnimation} /> : null}
        {feedData ? <Articles fileSelected={fileSelected} setFeedData={setFeedData} profile={profile} setProfile={setProfile} feedData={feedData} distraction={distraction} setFullArticle={setFullArticle} articleSelected={articleSelected} setArticleSelected={setArticleSelected} setArticleHeading={setArticleHeading} setLoadingAnimation={setLoadingAnimation} /> : null}
      </div>

      {addOpmlToggle && <AddFeedForm setAddOpmlToggle={setAddOpmlToggle} setProfile={setProfile} />}

      {addToggle && <AddFeed setAddToggle={setAddToggle} profile={profile} setProfile={setProfile} folders={folders} />}
    </div>
  )
}

export default App
