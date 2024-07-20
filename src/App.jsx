import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./components/Add Feed/Add"
import Articles from "./components/Articles/Articles"
// import dummyRss from '../dummy.json'
import dummyFolder from '../dummyFolder.json'
import Reader from "./components/ReaderPanel/Reader"


const App = () => {
  const [addToggle, setAddToggle] = useState(false) // State for adding new folder 
  const [toggle, setToggle] = useState(false) // State for toggling Subscriptions
  const [folderToggle, setFolderToggle] = useState(false) // State for toggling data
  const [folderSelected, setfolderSelected] = useState('1') // State for selecting each folder
  const [fileSelected, setFileSelected] = useState('1-1') // State for selecting each file
  const [folderName, setFolderName] = useState('') // State for adding file name
  const [moreFolderToggle, setMoreFolderToggle] = useState(false) // Toggle switch for data
  const [moreFileToggle, setMoreFileToggle] = useState(false) // Toggle switch for files
  const [articleSelected, setArticleSelected] = useState('') //State for selectig the article in the Articles tab
  const [data, setdata] = useState(dummyFolder) // State for managing folder structure. Will be changed when database will be instroduced.


  // Function to select each folder
  const handleFolderClick = (id) => {
    setfolderSelected(id)
    data.map(folder => {
      if (folder.id === id) {
        setFolderToggle(!folderToggle)
      }
    })
  }

  // Function to select each file inside a folder
  const handleFileClick = (id) => {
    data.map(item => {
      item.contents.map(content => {
        if (content.feed.id === id) {
          setFileSelected(id)
        }
      })
    })
  }


  // Function to add each folder
  const handleAddFolderButton = () => {
    setdata(prevList => [...prevList, folderName])
    setAddToggle(false)
  }

  

  return (
    <div>
      <div className={`flex ${addToggle ? 'pointer-events-none blur-md' : null}`}>
        <Sidebar setToggle={setToggle} toggle={toggle} data={data} setdata={setdata} addToggle={addToggle} setAddToggle={setAddToggle} folderSelected={folderSelected} setfolderSelected={setfolderSelected} handleFolderClick={handleFolderClick} setFolderToggle={setFolderToggle} folderToggle={folderToggle} fileSelected={fileSelected} setFileSelected={setFileSelected} handleFileClick={handleFileClick} moreFileToggle={moreFileToggle} setMoreFileToggle={setMoreFileToggle} moreFolderToggle={moreFolderToggle} setMoreFolderToggle={setMoreFolderToggle} />
        <Articles data={data} fileSelected={fileSelected} folderSelected={folderSelected} setArticleSelected={setArticleSelected} />
        <Reader data={data} fileSelected={fileSelected} folderSelected={folderSelected} articleSelected={articleSelected} />
      </div>

      {addToggle && <Add setFolderName={setFolderName} folderName={folderName} handleAddFolderButton={handleAddFolderButton} setAddToggle={setAddToggle} />}
    </div>
  )
}

export default App
