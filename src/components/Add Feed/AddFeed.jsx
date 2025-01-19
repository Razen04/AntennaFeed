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

    const getFavicon = async (link) => {
        try {
            const url = new URL(link);

            let domain = url.hostname;
            if (domain === "openrss.org") {
                const pathParts = url.pathname.split("/");
                if (pathParts[1]) {
                    domain = pathParts[1];
                }
            }

            const iconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
            return iconUrl;
        } catch (error) {
            console.error("Invalid URL or error fetching favicon:", error);
            return null;
        }
    };


    const handleAddFeed = async (feedName, feedLink, selectedFolderId, selectedFolderName) => {
        const iconImg = await getFavicon(feedLink);

        setProfile((prevProfile) => {
            const newFeed = {
                text: feedName,
                title: feedName,
                type: "rss",
                xmlurl: feedLink,
                icon: iconImg,
                "#type": "feed",
                folder: selectedFolderName,
                id: uuidv4(),
                selected: false
            }

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
        <div className='overflow-hidden add-feed h-svh flex items-center justify-center'>
            <div className="relative z-50 w-[19rem] md:w-[40rem] max-h-[26rem] xl:min-w-96 bg-violet-500 p-6 overflow-hidden rounded-lg">
                <button>
                    <img src={closeLogo} alt="Close Button" className='absolute right-4 top-4 cursor-pointer hover:bg-violet-400 transition-all p-1 bg-violet-700 rounded-full' onClick={() => setAddToggle(prevToggle => !prevToggle)} />
                </button>

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
        </div>

    );
};

export default AddFeed;