import { useEffect } from 'react';
import SidebarHeader from './SidebarHeader';
import FolderItem from './FolderItem';
import Menu from './Menu'
import dropDownLogo from '../../assets/dropdown.svg';
import dropUpLogo from '../../assets/dropup.svg';
import MobileLayoutHeader from '../MobileLayout/MobileLayoutHeader';
import { decompressFeed } from '../../../utils/helper';

const Sidebar = ({ profile, setProfile, toggle, setToggle, feedInfo, setFeedInfo, setArticle, folders, setFolders, setSelected, handleAddFeed, fetchChangelog, fetchedFeeds, isInitialized }) => {

    // To set folders for subscribed menu
    useEffect(() => {
        if (profile && profile.feeds) {
            setFolders(profile.feeds.subscribed.children || []);
        }
    }, [profile]);

    // To update font-family, font-size and font-weight
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
        console.log("Difference in Time: ", difference);
        return difference < 60;
    };

    // Function to handle when a folder is clicked in the subscribed menu
    const handleFolderClick = (id) => {
        setSelected(prev => ({ ...prev, folderSelected: id }));
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

    // Function to handle when a file is clicked in the subscirbed menu
    const handleFileClick = (id) => {
        console.log("File id: ", id)
        setSelected(prev => ({ ...prev, fileSelected: id }));

        setArticle(prev => ({
            ...prev, fullArticle: {
                feed: '',
                image: ''
            }
        }));

        setToggle(prev =>
            ({ ...prev, sidebarToggle: false })
        );

        setArticle(prev => ({
            ...prev, articleHeading: {
                title: "",
                author: [],
                link: "",
                pubDate: "",
                isRead: false,
                isStarred: false
            }
        }));

        const updateFeeds = (feeds) => {
            console.log("feeds:", feeds)
            const feedInFeedsArray = feeds.find(feed => feed.url === id);
            if (feedInFeedsArray && isTimeUnderTenMinutes(feedInFeedsArray.fetchedDate)) {
                console.log("Local storage activated...");
                setFeedInfo(prev => ({ ...prev, feedData: decompressFeed(feedInFeedsArray.feed) }));
            } else {
                console.log("Fetching feed....");
                const url = id;
                handleAddFeed(url);
            }
        };

        console.log("Fetched Feeds: ", fetchedFeeds)
        updateFeeds(fetchedFeeds);

        setProfile((prevProfile) => {
            const updateFile = (folder) => {
                if (folder.children) {
                    return {
                        ...folder,
                        children: folder.children.map((child) => {
                            if (child.xmlurl === id) {
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



    return (
        <div className='flex'>
            <div className={`w-80 xl:relative h-lvh ${toggle.sidebarToggle ? 'w-80 h-lvh md:max-w-96 z-50 absolute top-0 left-0 bg-gray-950 lg:bg-none overflow-hidden xl:relative sm:max-w-80 transition-transform ease-in-out duration-500' : ''} md:transform-none md:block ${toggle.sidebarToggle ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='fixed top-0 w-full'>
                    <MobileLayoutHeader toggle={toggle} setToggle={setToggle} />
                </div>
                <div className={`${toggle.distractionToggle ? 'focused' : ''} pt-[4.5rem] xl:pt-0`}>
                    <div>
                        <SidebarHeader toggle={toggle} setToggle={setToggle} />
                        <div className="subscriptions mt-4 mx-4 overflow-scroll">
                            <div
                                onClick={() =>
                                    setToggle(prev => ({ ...prev, toggleSubscription: !prev.toggleSubscription }))
                                }
                                className='flex items-center justify-between transition-all hover:border-b-2 cursor-pointer border-b-2'
                            >
                                <h1 className='text-white font-bold'>SUBSCRIPTIONS</h1>
                                {!toggle.toggleSubscription ? (<img src={dropDownLogo} alt="Drop Down" />) : <img src={dropUpLogo} alt="Drop Up" />}
                            </div>
                            {toggle.toggleSubscription ? (
                                <ul className={`text-white mt-2 overflow-scroll ${toggle.sidebarToggle ? 'h-[60vh]' : 'h-[60vh]'}`}>
                                    {folders.map((folder) => (
                                        <FolderItem
                                            key={folder.id}
                                            folder={folder}
                                            handleFolderClick={handleFolderClick}
                                            handleFileClick={handleFileClick}
                                            handleFileDelete={handleFileDelete}
                                            handleAddFeed={handleAddFeed}
                                            profile={profile}
                                            setProfile={setProfile}
                                        />
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                        <Menu profile={profile} setProfile={setProfile} fetchChangelog={fetchChangelog} />
                    </div>
                </div>

            </div>
            <div className='xl:hidden overlay h-lvh w-full absolute right-0 bg-gray-800' onClick={() => setToggle(prev =>
                ({ ...prev, sidebarToggle: false })
            )}>
            </div>
        </div >


    );
};

export default Sidebar;