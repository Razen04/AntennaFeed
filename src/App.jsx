import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./components/Add Feed/Add"
import Articles from "./components/Articles/Articles"
import Reader from "./components/ReaderPanel/Reader"
import folderData from '../src/folder.json'
// import { v4 as uuidv4 } from "uuid";



const App = () => {
  const [folders, setFolders] = useState(folderData) // Folder Data
  const [feedUrl, setFeedUrl] = useState([]); // State for storing feed Url
  const [feedData, setFeedData] = useState(null); // State for storing feed data
  const [addToggle, setAddToggle] = useState(false); // State for adding new feed 
  const [toggleSubscription, setToggleSubscription] = useState(true); // State for toggling subscriptions
  const [fullArticle, setFullArticle] = useState('') // State for storing full article
  const [folderSelected, setFolderSelected] = useState()
  const [fileSelected, setFileSelected] = useState();
  const [articleSelected, setArticleSelected] = useState('')

  // Function to add feeds
  const handleAddFeed = async (feedLink) => {
    try {
      let response = await fetch('http://localhost:3000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedLink })
      })
      const data = await response.json()
      setFeedData(data.feed)
      console.log(data.feed)
    } catch (error) {
      console.error(error)
    }
    setAddToggle(false)
  }


  return (
    <div>
      <div className={`flex ${addToggle ? 'pointer-events-none blur-md' : null}`}>
        <Sidebar folderSelected={folderSelected} setFolderSelected={setFolderSelected} fileSelected={fileSelected} setFileSelected={setFileSelected} folders={folders} setFolders={setFolders} handleAddFeed={handleAddFeed} setToggleSubscription={setToggleSubscription} toggleSubscription={toggleSubscription} feedUrl={feedUrl} setFeedUrl={setFeedUrl} setAddToggle={setAddToggle} addToggle={addToggle} />
        {feedData ? <Articles feedData={feedData} setFullArticle={setFullArticle} articleSelected={articleSelected} setArticleSelected={setArticleSelected} /> : null}
        {feedData ? <Reader feedData={feedData} fullArticle={fullArticle} folders={folders} folderSelected={folderSelected} fileSelected={fileSelected} articleSelected={articleSelected} /> : null}
      </div>

      {addToggle && <Add setAddToggle={setAddToggle} feedUrl={feedUrl} setFeedUrl={setFeedUrl} handleAddFeed={handleAddFeed} />}
    </div>
  )
}

export default App
