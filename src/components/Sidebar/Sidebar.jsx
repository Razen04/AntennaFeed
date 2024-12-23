import addLogo from '../../assets/add.svg'
// import unreadLogo from '../../assets/unread.svg'
import dropDownLogo from '../../assets/dropdown.svg'
import filesLogo from '../../assets/files.svg'
import filesFilledLogo from '../../assets/filesfilled.svg'
import dropUpLogo from '../../assets/dropup.svg'
import deleteLogo from '../../assets/delete.svg'
import markerLogo from '../../assets/marker.svg'
import logo from '../../assets/logo.png'
import moreLogo from '../../assets/more.svg'
import rssLogo from '../../assets/rss.png'
import { useEffect, useState } from 'react'
import moment from 'moment'


const Sidebar = ({ profile, setProfile, folderSelected, setFolderSelected, setFileSelected, toggleSubscription, setToggleSubscription, setAddToggle, addToggle, setArticleHeading, handleAddFeed, setFeedData, distraction }) => {

    const [folders, setFolders] = useState([]);

    useEffect(() => {
        if (profile && profile.feeds) {
            setFolders(profile.feeds.subscribed.children || []);
        }
    }, [profile])




    const sidebarStyle = {
        height: '100rem'
    }

    const getFavicon = (url) => {
        try {
            const baseURL = new URL(url).origin;
            return `${baseURL}/favicon.ico`;
        } catch (error) {
            return '/default-png';
        }
    };


    const handleFolderClick = (id) => {
        setFolderSelected(id);

        setProfile((prevProfile) => {
            const toggleFolder = (folder) => {
                if (folder.id === id) {
                    return { ...folder, selected: !folder.selected };
                }
                if (folder.children && folder.children.length > 0) {
                    return {
                        ...folder,
                        children: folder.children.map(toggleFolder),
                    };
                }
                return folder;
            };

            return {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    subscribed: {
                        ...prevProfile.feeds.subscribed,
                        children: prevProfile.feeds.subscribed.children.map(folder => toggleFolder(folder)),
                    },
                },
            };
        });
    };


    const handleFileClick = (id) => {
        setArticleHeading({
            title: "",
            author: [],
            link: "",
            pubDate: "",
        });

        setProfile((prevProfile) => {
            const updateFile = (folder) => {
                if (folder.children) {
                    return {
                        ...folder,
                        children: folder.children.map((child) => {
                            if (child.xmlurl === id) {
                                const feedInProfile = prevProfile.feeds.fetchedFeeds.find(feed => {
                                    console.log("Feed ID from prevProfile.feeds.fetchedFeeds: ", feed.id)
                                    console.log("Clicked file id: ", id)
                                    return feed.id === id
                                })

                                if (feedInProfile) {
                                    console.log(moment(Date.now() - feedInProfile.feed.fetchedDate).fromNow());
                                    console.log("Activated local storage")
                                    setFeedData(feedInProfile.feed)

                                } else {
                                    console.log("Fetching feed....")
                                    handleAddFeed(child.xmlurl)
                                }

                                return { ...child, selected: true };
                            }
                            if (child.xmlurl !== id) {
                                return { ...child, selected: false }
                            }
                            if (child.children) {
                                return updateFile(child);
                            }
                            return child;
                        }),
                    };
                }
                return folder;
            };

            return {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    subscribed: {
                        ...prevProfile.feeds.subscribed,
                        children: prevProfile.feeds.subscribed.children.map(folder => updateFile(folder)),
                    },
                },
            };
        });

        setFileSelected(id);
    };




    // Rendering folder
    const renderFolder = folder => {
        return (
            <div
                key={folder.id}
                className=''
            >
                <div
                    className='folder p-1 flex flex-col justify-between transition-all'
                >
                    <div className='flex p-1 items-center justify-between w-full hover:bg-violet-400 cursor-pointer' onClick={() => handleFolderClick(folder.id)}>
                        <div className='flex items-center'>
                            <img src={folder.selected ? filesLogo : filesFilledLogo} alt="" />
                            <li className='ml-3'>{folder.text}</li>
                        </div>
                        {/* <h1 className='text-white font-semibold'>{folder.feeds.length}</h1> */}
                    </div>

                    {/* If folder is selected and it has a child */}
                    {folder.selected && folder.length > 0 && (
                        <div className='children'>
                            {folder.children.map((child) => renderFolder(child))}

                        </div>
                    )}

                    {/* If folder is selected and it has no child */}
                    {folder.selected && folder.children.map(eachItem => {
                        return (
                            <div key={eachItem.id} className='files py-2 mx-4 overflow-scroll' onClick={() => handleFileClick(eachItem.xmlurl)}>
                                <div className='flex relative'>
                                    <img src={eachItem.selected ? markerLogo : null} alt="" />
                                    <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                        <div className='flex items-center'>
                                            <img src={getFavicon(eachItem.xmlurl) || rssLogo} alt="" className='w-5' />
                                            <h1 className='max-w-full text-sm ml-2'>{eachItem.text}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    useEffect(() => {
        folders.forEach((folder) => renderFolder(folder)); // Use `forEach` for side effects
    }, [folders]);


    return (
        <div className={`${distraction ? 'focused' : null} max-w-80 bg-gray-950 z-0 relative h-full transition-all`}>
            <img src={logo} alt="AntennaFeed Logo" />
            <div className="your-feed" >
                <div className="p-4 feeds-header flex justify-around items-center">
                    <button className='px-4 py-2 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddToggle(!addToggle)}>Add Feed</button>
                    <button className='px-4 py-2 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddToggle(!addToggle)}>Import OPML</button>
                </div>
            </div>
            <div className="subscriptions mt-4 mx-4 overflow-scroll h-lvh">
                <div
                    onClick={() => setToggleSubscription(prevToggle => !prevToggle)}
                    className='flex items-center justify-between transition-all hover:border-b-2 cursor-pointer'
                >
                    <h1 className='text-white font-bold'>SUBSCRIPTIONS</h1>
                    {!toggleSubscription ? (<img src={dropDownLogo} alt="Drop Down" />) : <img src={dropUpLogo} alt="Drop Up" />}

                </div>
                {toggleSubscription ? (
                    <ul className='text-white mt-2 overflow-scroll' style={sidebarStyle}>
                        <div>{folders ? folders.map((folder) => renderFolder(folder)) : null}</div>
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default Sidebar
