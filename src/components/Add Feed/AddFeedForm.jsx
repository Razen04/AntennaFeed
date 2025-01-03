import React from 'react';

const AddFeedForm = ({
    feedName, setFeedName,
    feedLink, setFeedLink,
    folders, selectedFolderId, setSelectedFolderId,
    selectedFolderName, setSelectedFolderName,
    handleAddFeed
}) => (
    <div className="details mt-4 flex flex-col justify-between">
        <input
            type="text"
            placeholder="Enter feed name"
            className="opacity-80 mb-2 p-2 outline-none border-b-2 font-semibold bg-violet-500 text-white"
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Enter feed url..."
            className="opacity-80 p-2 outline-none border-b-2 font-semibold bg-violet-500 text-white"
            value={feedLink}
            onChange={(e) => setFeedLink(e.target.value)}
        />
        <label htmlFor="addToGroup" className='mt-4'>Select a folder: </label>
        <select
            name="addToGroup"
            id="addToGroup"
            className='p-2 mt-2 text-white bg-violet-400 cursor-pointer'
            onChange={(e) => {
                setSelectedFolderId(e.target.value);
                setSelectedFolderName(e.target.options[e.target.selectedIndex].text);
            }}
        >
            <option value={null} className='cursor-pointer'>--Folder--</option>
            {folders.map(folder => (
                <option key={folder.id} value={folder.id} name={folder.text} className='cursor-pointer'>{folder.text}</option>
            ))}
        </select>
        <button
            className="mt-4 px-4 py-2 transition-all bg-violet-400 hover:bg-violet-700 hover:rounded-2xl hover:font-semibold"
            onClick={() => handleAddFeed(feedName, feedLink, selectedFolderId, selectedFolderName)}
        >Add Feed</button>
    </div>
);

export default AddFeedForm;