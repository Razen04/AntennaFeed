import './add.css'
import closeLogo from '../../assets/close.svg'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const AddFeed = ({ setAddToggle, folders, setProfile }) => {
    console.log("Add Feed clicked")

    const [feedName, setFeedName] = useState('');
    const [feedLink, setFeedLink] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState(null)
    const [selectedFolderName, setSelectedFolderName] = useState('')

    const handleInputFeedChange = (value, name) => {
        if (name === 'feedName') {
            setFeedName(value)
        } else {
            setFeedLink(value)
        }
    }

    const handleAddFeed = (feedName, feedLink, selectedFolderId, selectedFolderName) => {
        console.log("Add feed Clicked")

        setProfile(prevProfile => {
            const newFeed = {
                text: feedName,
                title: feedName,
                type: "rss",
                xmlurl: feedLink,
                "#type": "feed",
                folder: selectedFolderName,
                id: uuidv4(),
                selected: false
            }
            console.log("New Feed: ", newFeed)
            console.log("Selected folder Id: ", selectedFolderId)

            const updatedChildren = prevProfile.feeds.subscribed.children.map(folder => {
                if (folder.id === selectedFolderId) {
                    return {
                        ...folder,
                        children: [...folder.children, newFeed]
                    }
                }
                return folder;
            })
            console.log("Updated Children: ", updatedChildren)

            if (!selectedFolderId) {
                updatedChildren.push(newFeed)
            }

            return {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    subscribed: {
                        ...prevProfile.feeds.subscribed,
                        children: updatedChildren
                    }
                }
            }
        })
    }

    return (
        <div className="add-feed min-w-96 bg-violet-500 p-6">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl text-white font-semibold">Add New Feeds</h1>
                <img
                    src={closeLogo} alt="Close Button" className='cursor-pointer' onClick={() => setAddToggle(prevToggle => !prevToggle)} />
            </div>

            <div className="details mt-4 flex flex-col justify-between">
                <input
                    type="text"
                    placeholder="Enter feed name"
                    className="opacity-80 mb-2 ml-2 p-2 outline-none border-b-2 font-semibold bg-violet-500 text-white"
                    value={feedName}
                    onChange={(e) => handleInputFeedChange(e.target.value, 'feedName')}
                />
                <input
                    type="text"
                    placeholder="Enter feed url..."
                    className="opacity-80 ml-2 p-2 outline-none border-b-2 font-semibold bg-violet-500 text-white"
                    value={feedLink}
                    onChange={(e) => handleInputFeedChange(e.target.value, 'feedLink')}
                />
                <label htmlFor="addToGroup" className='mt-4'>Select a folder: </label>
                <select name="" id="" className='p-2 mt-2 text-white bg-violet-400 cursor-pointer' onChange={(e) => {
                    setSelectedFolderId(e.target.value)
                    setSelectedFolderName(e.target.name)
                }}>
                    <option value={null} className='cursor-pointer'>--Folder--</option>
                    {folders.map(folder => {
                        console.log("Folder.children: ", folder.children)
                        if (folder.children && folder.children.length > 0) {
                            return (
                                <option key={folder.id} value={folder.id} name={folder.text} className='cursor-pointer'>{folder.text}</option>
                            )
                        } else {
                            return null
                        }
                    })}
                </select>
                <button
                    className="mt-4 px-4 py-2 transition-all bg-violet-400 hover:bg-violet-700 hover:rounded-2xl hover:font-semibold"
                    onClick={() => handleAddFeed(feedName, feedLink, selectedFolderId, selectedFolderName)}
                >Add Feed</button>
            </div>
        </div>
    )
}

export default AddFeed
