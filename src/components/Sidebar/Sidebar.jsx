import { useEffect, useState } from 'react';
import SidebarHeader from './SidebarHeader';
import FolderItem from './FolderItem';
import Menu from './Menu'
import dropDownLogo from '../../assets/dropdown.svg';
import dropUpLogo from '../../assets/dropup.svg';
import { toast } from 'react-toastify';
import MobileLayout from '../MobileLayout/MobileLayout';

const Sidebar = ({ profile, setProfile, folders, setFolders, folderSelected, setFolderSelected, setFileSelected, toggleSubscription, setToggleSubscription, setAddToggle, addToggle, setArticleHeading, handleAddFeed, setFeedData, distraction, decompressFeed, sidebarToggle, setSidebarToggle }) => {

    useEffect(() => {
        if (profile && profile.feeds) {
            setFolders(profile.feeds.subscribed.children || []);
        }
    }, [profile]);

    useEffect(() => {
        if (profile) {
            const { fontFamily, fontSize, fontWeight } = profile.preferences.customizations;
            document.documentElement.style.setProperty('--font-family', fontFamily);
            document.documentElement.style.setProperty('--font-size', fontSize);
            document.documentElement.style.setProperty('--font-weight', fontWeight);
        }

    }, [profile])

    const isTimeUnderTenMinutes = (time) => {
        const currentTime = Date.now();
        const fetchedTime = time;
        const difference = (currentTime - fetchedTime) / 60000;
        console.log("Difference in Time: ", difference)
        return difference < 30;
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
                                const fetchedFeeds = prevProfile.feeds.fetchedFeeds;
                                const feedInProfile = fetchedFeeds.find(feed => feed.id === id);

                                if (feedInProfile && isTimeUnderTenMinutes(feedInProfile.fetchedDate)) {
                                    console.log("Local Storage activated...");
                                    setFeedData(decompressFeed(feedInProfile.feed));

                                } else {
                                    console.log("Fetching feed...");
                                    const url = child.xmlurl;
                                    const updatedFeeds = fetchedFeeds.filter(feed => feed.id !== id);
                                    prevProfile.feeds.fetchedFeeds = updatedFeeds;
                                    handleAddFeed(url);
                                }

                                return { ...child, selected: true };
                            }
                            if (child.xmlurl !== id) {
                                return { ...child, selected: false };
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
                            setFeedData(decompressFeed(feedInProfile.feed));
                        } else {
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
                    };
                }
                return folder.id !== id ? folder : null;
            }).filter(folder => folder !== null);

            return {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    subscribed: {
                        ...prevProfile.feeds.subscribed,
                        children: updatedFolders
                    }
                }
            };
        });
    };

    const getFavicon = (xmlUrl) => {
        try {
            const url = new URL(xmlUrl);
            const rootDomain = url.origin;
            const faviconUrl = `${rootDomain}/favicon.ico`;
            return faviconUrl;
        } catch (error) {
            console.error("Invalid URL provided:", xmlUrl, error);
            toast.error("Invalid URL provided.");
            return null;
        }
    };

    return (
        <div className={`max-w-80 xl:relative h-lvh ${sidebarToggle ? 'w-72 h-lvh md:maxn-w-80 z-50 absolute top-0 left-0 bg-gray-950 lg:bg-none overflow-hidden xl:relative sm:max-w-80 transition-transform ease-in-out ' : ''} md:transform-none md:block ${sidebarToggle ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='fixed top-0 w-full'>
                <MobileLayout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>
            <div className={`${distraction ? 'focused' : ''} pt-[4.5rem] xl:pt-0`}>
                <div>
                    <SidebarHeader setAddToggle={setAddToggle} addToggle={addToggle} sidebarToggle={sidebarToggle} />
                    <div className="subscriptions mt-4 mx-4 overflow-scroll">
                        <div
                            onClick={() => setToggleSubscription(prevToggle => !prevToggle)}
                            className='flex items-center justify-between transition-all hover:border-b-2 cursor-pointer'
                        >
                            <h1 className='text-white font-bold'>SUBSCRIPTIONS</h1>
                            {!toggleSubscription ? (<img src={dropDownLogo} alt="Drop Down" />) : <img src={dropUpLogo} alt="Drop Up" />}
                        </div>
                        {toggleSubscription ? (
                            <ul className={`text-white mt-2 overflow-scroll ${sidebarToggle ? 'h-[60vh]' : 'h-[60vh]'}`}>
                                {folders.map((folder) => (
                                    <FolderItem
                                        key={folder.id}
                                        folder={folder}
                                        handleFolderClick={handleFolderClick}
                                        handleFileClick={handleFileClick}
                                        handleFileDelete={handleFileDelete}
                                        getFavicon={getFavicon}
                                        folderSelected={folderSelected}
                                        setFolderSelected={setFolderSelected}
                                        setFileSelected={setFileSelected}
                                        setArticleHeading={setArticleHeading}
                                        setFeedData={setFeedData}
                                        handleAddFeed={handleAddFeed}
                                        profile={profile}
                                        setProfile={setProfile}
                                    />
                                ))}
                            </ul>
                        ) : null}
                    </div>
                    <Menu profile={profile} setProfile={setProfile} />
                </div>
            </div>

        </div>

    );
};

export default Sidebar;