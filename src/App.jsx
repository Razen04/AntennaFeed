import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./components/Add Feed/Add"
import Articles from "./components/Articles/Articles"
import Reader from "./components/ReaderPanel/Reader"
import userProfile from "./userProfile"
// import { v4 as uuidv4 } from "uuid";



const App = () => {

  const [profile, setProfile] = useState(() => {

    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(localStorage.getItem('profile')) : userProfile

  }) // User Data

  useEffect(() => {
      localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  const [feedUrl, setFeedUrl] = useState([]); // State for storing feed Url
  const [feedData, setFeedData] = useState(null); // State for storing feed data
  const [addToggle, setAddToggle] = useState(false); // State for adding new feed 
  const [toggleSubscription, setToggleSubscription] = useState(true); // State for toggling subscriptions
  const [fullArticle, setFullArticle] = useState('') // State for storing full article
  const [folderSelected, setFolderSelected] = useState()
  const [fileSelected, setFileSelected] = useState();
  const [articleSelected, setArticleSelected] = useState('')
  const [articleHeading, setArticleHeading] = useState({
    title: '',
    author: [],
    pubDate: '',
    link: ''
  })
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [distraction, setDistraction] = useState(false)

  // Function to add feeds
  const handleAddFeed = async (feedLink) => {
    console.log(feedLink)
    try {
      let response = await fetch('http://localhost:3000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedLink })
      })
      const data = await response.json()
      setFeedData(data.relevantFeedData)
      console.log(data.relevantFeedData)

      setProfile((prevProfile) => {
        const isFeedAlreadyFetched = prevProfile.feeds.fetchedFeeds.some(feed => feed.id === feedLink)

        if(!isFeedAlreadyFetched) {

          const feedSize = new TextEncoder().encode(JSON.stringify(data.feed)).length
          console.warn("Feed Size: ", feedSize);
          const MAX_FEED_SIZE = 5 * 1024;
          if(feedSize > MAX_FEED_SIZE) {
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

  window.addEventListener('beforeunload', () => {
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
  })

  return (
    <div>
      <div className={`flex ${addToggle ? 'pointer-events-none blur-md' : null}`}>
        <Sidebar profile={profile} setProfile={setProfile} distraction={distraction} folderSelected={folderSelected} setFolderSelected={setFolderSelected} fileSelected={fileSelected} setFileSelected={setFileSelected} handleAddFeed={handleAddFeed} setToggleSubscription={setToggleSubscription} toggleSubscription={toggleSubscription} feedUrl={feedUrl} setFeedUrl={setFeedUrl} setAddToggle={setAddToggle} addToggle={addToggle} setArticleHeading={setArticleHeading} setFeedData={setFeedData} />
        {feedData ? <Reader feedData={feedData} distraction={distraction} setDistraction={setDistraction} fullArticle={fullArticle} folderSelected={folderSelected} fileSelected={fileSelected} articleSelected={articleSelected} articleHeading={articleHeading} loadingAnimation={loadingAnimation} setLoadingAnimation={setLoadingAnimation} /> : null}
        {feedData ? <Articles setProfile={setProfile} feedData={feedData} distraction={distraction} setFullArticle={setFullArticle} articleSelected={articleSelected} setArticleSelected={setArticleSelected} setArticleHeading={setArticleHeading} setLoadingAnimation={setLoadingAnimation} /> : null}
      </div>

      {addToggle && <Add setAddToggle={setAddToggle} feedUrl={feedUrl} setFeedUrl={setFeedUrl} handleAddFeed={handleAddFeed} />}
    </div>
  )
}

export default App
