import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./components/Add Feed/Add"
import Articles from "./components/Articles/Articles"
import dummyRss from '../dummy.json'
import dummyFolder from '../dummyFolder.json'


const App = () => {
  const [addToggle, setAddToggle] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [folderToggle, setFolderToggle] = useState(false)
  const [folderSelected, setfolderSelected] = useState('1')
  const [fileSelected, setFileSelected] = useState(false)
  const [fileName, setFileName] = useState('')
  const [folders, setFolders] = useState(dummyFolder)
  const [feeds, setFeeds] = useState(dummyRss.rss.channel)

  const handleFolderClick = (id) => {
    setfolderSelected(id)
    folders.map(folder => {
      if (folder.id === id) {
        setFolderToggle(!folderToggle)
      }
    })
  }

  const handleFileClick = (id) => {
    folders.map(item => {
      item.contents.map(content => {
        if (content.id === id) {
          setFileSelected(id)
        }
      })
    })
  }

  const handleAddButton = () => {
    setFolders(prevList => [...prevList, fileName])
    setAddToggle(false)
    console.log(folders)
  }

  return (
    <div>
      <div className="flex">
        <Sidebar setToggle={setToggle} toggle={toggle} folders={folders} setfolders={setFolders} addToggle={addToggle} setAddToggle={setAddToggle} folderSelected={folderSelected} setfolderSelected={setfolderSelected} handleFolderClick={handleFolderClick} setFolderToggle={setFolderToggle} folderToggle={folderToggle} fileSelected={fileSelected} setFileSelected={setFileSelected} handleFileClick={handleFileClick} />
        <Articles />
      </div>

      {addToggle && <Add setFileName={setFileName} fileName={fileName} handleAddButton={handleAddButton} setAddToggle={setAddToggle} />}
    </div>
  )
}

export default App
