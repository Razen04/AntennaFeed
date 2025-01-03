import './add.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import closeLogo from '../../assets/close.svg';
import AddFeedForm from './AddFeedForm';
import AddOpmlForm from './AddOpmlForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AddFeed = ({ setAddToggle, folders, setProfile, setAddOpmlToggle }) => {
    const [feedName, setFeedName] = useState('');
    const [feedLink, setFeedLink] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderName, setSelectedFolderName] = useState('');
    const [showOpmlWindow, setShowOpmlWindow] = useState(true)

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

            if (!selectedFolderId) {
                updatedChildren.push(newFeed)
            }

            setAddToggle(false)

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
        <div className="add-feed w-[19rem] md:w-[40rem] max-h-96 lg:min-w-96 bg-violet-500 p-6">
            <img src={closeLogo} alt="Close Button" className='absolute right-4 top-4 cursor-pointer hover:bg-violet-400 transition-all' onClick={() => setAddToggle(prevToggle => !prevToggle)} />
            <div className='mt-5'>
                <div className='w-full flex'>
                    <button className={`p-2 ${showOpmlWindow ? 'border-b-2' : 'opacity-50'}  text-md font-semibold cursor-pointer`} onClick={() => {
                        setShowOpmlWindow(true)
                    }
                    }>Add New Feeds</button>
                    <button className={`p-2 ${!showOpmlWindow ? 'border-b-2' : 'opacity-50'}  text-md font-semibold cursor-pointer`} onClick={() => setShowOpmlWindow(false)}>Import OPML</button>
                </div>
            </div>
            <TransitionGroup>
                <CSSTransition
                    key={showOpmlWindow ? 'opml' : 'feed'}
                    timeout={300}
                    classNames="slide"
                >
                    {!showOpmlWindow ? (
                        <AddOpmlForm
                            setProfile={setProfile}
                            setAddOpmlToggle={setAddOpmlToggle}
                            setAddToggle={setAddToggle}
                        />
                    ) : (
                        <AddFeedForm
                            feedName={feedName}
                            setFeedName={setFeedName}
                            feedLink={feedLink}
                            setFeedLink={setFeedLink}
                            folders={folders}
                            selectedFolderId={selectedFolderId}
                            setSelectedFolderId={setSelectedFolderId}
                            selectedFolderName={selectedFolderName}
                            setSelectedFolderName={setSelectedFolderName}
                            handleAddFeed={handleAddFeed}
                        />
                    )}
                </CSSTransition>
            </TransitionGroup>

        </div>
    );
};

export default AddFeed;