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
import { v4 as uuidv4 } from 'uuid'
// import moment from 'moment'
import axios from 'axios'
import cheerio from 'cheerio'


const Sidebar = ({ profile, setProfile, folders, setFolders, setAddOpmlToggle, folderSelected, setFolderSelected, setFileSelected, toggleSubscription, setToggleSubscription, setAddToggle, addToggle, setArticleHeading, handleAddFeed, setFeedData, distraction }) => {

    useEffect(() => {
        if (profile && profile.feeds) {
            setFolders(profile.feeds.subscribed.children || []);
        }
    }, [profile])

    const isTimeUnderTenMinutes = (time) => {
        const currentTime = Date.now();
        const fetchedTime = time;

        console.log("Current Time: ", currentTime)
        console.log("Fetched Time: ", fetchedTime)

        const difference = (currentTime - fetchedTime) / 60000;
        console.log("Difference: ", difference)

        return difference < 30;
    }

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
        console.log("File CLicked: ", id)
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
                                const fetchedFeeds = prevProfile.feeds.fetchedFeeds;

                                const feedInProfile = fetchedFeeds.find(feed => feed.id === id);


                                if (feedInProfile && isTimeUnderTenMinutes(feedInProfile.fetchedDate)) {
                                    console.log("Activated local storage")
                                    setFeedData(feedInProfile.feed)
                                } else {
                                    console.log("Fetching new feed...")
                                    const url = child.xmlurl;

                                    const updatedFeeds = fetchedFeeds.filter(feed => feed.id !== id);

                                    prevProfile.feeds.fetchedFeeds = updatedFeeds;


                                    handleAddFeed(url)
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
                } else {
                    if (folder.xmlurl === id) {
                        const fetchedFeeds = prevProfile.feeds.fetchedFeeds;

                        const feedInProfile = fetchedFeeds.find(feed => feed.id === id);

                        if (feedInProfile && isTimeUnderTenMinutes(feedInProfile.fetchedDate)) {
                            console.log("Activated local storage");
                            setFeedData(feedInProfile.feed);
                        } else {
                            console.log("Fetching new feed...");
                            const url = folder.xmlurl;

                            const updatedFeeds = fetchedFeeds.filter(feed => feed.id !== id);
                            prevProfile.feeds.fetchedFeeds = updatedFeeds;

                            handleAddFeed(url);
                        }

                        return { ...folder, selected: true };
                    } else {
                        return { ...folder, selected: false };
                    }
                }
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

    const handleFileDelete = (id) => {
        setProfile(prevProfile => {
            const updatedFolders = prevProfile.feeds.subscribed.children.map(folder => {
                if (folder.children) {
                    return {
                        ...folder,
                        children: folder.children.filter(child => child.id !== id)
                    }
                }

                return folder.id !== id ? folder : null;
            }).filter(folder => folder !== null)

            console.log("Updated Folder: ", updatedFolders)

            return {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    subscribed: {
                        ...prevProfile.feeds.subscribed,
                        children: updatedFolders
                    }
                }
            }
        })
    }


    const getFavicon = (xmlUrl) => {
        try {
            // Parse the root domain from the xmlUrl
            const url = new URL(xmlUrl);
            const rootDomain = url.origin;

            // Construct the favicon URL
            const faviconUrl = `${rootDomain}/favicon.ico`;
            return faviconUrl;
        } catch (error) {
            console.error("Invalid URL provided:", xmlUrl, error);
            return null; // Return null if the URL is invalid
        }
    };



    console.log("Folder: ", folders)

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
                    {folder.children && (
                        <div className='flex p-1 items-center justify-between w-full hover:bg-violet-400 cursor-pointer' onClick={() => handleFolderClick(folder.id)}>
                            <div className='flex items-center'>
                                <img src={folder.selected ? filesLogo : filesFilledLogo} alt="" />
                                <li className='ml-3'>{folder.text}</li>
                            </div>
                            {/* <h1 className='text-white font-semibold'>{folder.feeds.length}</h1> */}
                        </div>
                    )}


                    {/* If folder is selected and it has a child */}
                    {folder.selected && folder.children && folder.children.length > 0 && folder.type === 'sub-parent' && (
                        <div className='children'>
                            {folder.children.map((child) => renderFolder(child))}
                        </div>
                    )}

                    {/* If folder is selected and it has no child */}
                    {folder.selected && folder.children && folder.children.map(eachItem => {
                        return (
                            <div key={eachItem.id} className='files py-2 mx-4 overflow-scroll'>
                                <div className='flex relative'>
                                    <img src={eachItem.selected ? markerLogo : null} alt="" />
                                    <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                        <div className='flex items-center' onClick={() => handleFileClick(eachItem.xmlurl)}>
                                            <img src={getFavicon(eachItem.xmlurl) || rssLogo} alt="" className='w-5' />
                                            <h1 className='max-w-full text-sm ml-2'>{eachItem.text}</h1>
                                        </div>
                                        {eachItem.selected ? <img
                                            src={deleteLogo}
                                            alt="Delete Feed"
                                            className='hover:bg-violet-900 p-1'
                                            onClick={() => handleFileDelete(eachItem.id)}
                                        /> : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* If there is no folder and there is standalone feed */}
                    {folder.folder === ''  ? (
                        <div key={folder.id} className='standalone-files py-2 overflow-scroll'>
                            <div className='flex relative'>
                                <img src={folder.selected ? markerLogo : null} alt="" />
                                <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                    <div className='flex items-center' onClick={() => handleFileClick(folder.xmlurl)}>
                                        <img src={getFavicon(folder.xmlurl) || rssLogo} alt="" className='w-5' />
                                        <h1 className='max-w-full text-sm ml-2'>{folder.text}</h1>
                                    </div>
                                    {folder.selected ? <img
                                        src={deleteLogo}
                                        alt="Delete Feed"
                                        className='hover:bg-violet-900 p-1'
                                        onClick={() => handleFileDelete(folder.id)}
                                    /> : null}
                                </div>
                            </div>
                        </div>

                    ) : null}
                </div>
            </div>
        )
    }

    useEffect(() => {
        folders.forEach((folder) => renderFolder(folder)); // Use `forEach` for side effects
    }, [folders]);


    return (
        <div className={`${distraction ? 'focused' : null} max-w-80 z-0 relative transition-all`}>
            <img src={logo} alt="AntennaFeed Logo" />
            <div className="your-feed" >
                <div className="p-4 feeds-header flex justify-around items-center">
                    <button className='px-4 py-2 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddToggle(!addToggle)}>Add Feed</button>
                    <button className='px-4 py-2 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddOpmlToggle(prev => !prev)}>Import OPML</button>
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
                    <ul className='text-white mt-2 h-[60vh] overflow-scroll'>
                        <div>{folders ? folders.map((folder) => renderFolder(folder)) : null}</div>
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default Sidebar
