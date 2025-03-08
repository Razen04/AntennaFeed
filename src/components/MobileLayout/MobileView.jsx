
import { useState } from "react"
import AddFeed from "../Add Feed/AddFeed"
import Articles from "../Articles/Articles"
import Changelog from "../Changelog/Changelog"
import Reader from "../ReaderPanel/Reader"
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "./BottomNavBar/Navbar"
import MobileFeeds from "./MobileFeeds/MobileFeeds"
import MobileHeader from "./MobileHeader/MobileHeader"
import MobileSetting from "./MobileSettings/MobileSetting"

const MobileView = ({ toggle, setToggle, profile, setProfile, folders, setFolders, selected, setSelected, feedInfo, setFeedInfo, article, setArticle, fetchChangelog, newProfile, setNewProfile, handleAddFeed, changelog, fetchedFeeds, setFetchedFeeds, isInitialized }) => {

    const [showNav, setShowNav] = useState('Feeds');
    console.log('Current showNav:', showNav);
    return (
        <div>
            {showNav === 'Feeds' && (
                <div className="w-full duration-300 animate-fade-in">
                    <MobileHeader />
                    <MobileFeeds />
                </div>
            )}
            {showNav === 'Settings' && (
                <div className='w-full transform transition-transform duration-300 translate-y-0 animate-fade-in'>
                    <MobileSetting />
                </div>
                
            )}
            {/* <div className={`w-96 z-99 ${toggle.addToggle || toggle.addOpmlToggle ? 'pointer-events-none blur-md' : ''}`}>
                {toggle.sidebarToggle &&
                    (<Sidebar
                        feedInfo={feedInfo}
                        setFeedInfo={setFeedInfo}
                        profile={profile}
                        toggle={toggle}
                        setToggle={setToggle}
                        setArticle={setArticle}
                        setProfile={setProfile}
                        folders={folders}
                        setFolders={setFolders}
                        selected={selected}
                        setSelected={setSelected}
                        handleAddFeed={handleAddFeed}
                        fetchChangelog={fetchChangelog}
                        fetchedFeeds={fetchedFeeds}
                        setFetchedFeeds={setFetchedFeeds}
                        isInitialized={isInitialized}
                    />)}
            </div> */}
            {/* <div className={`absolute ${article.fullArticleLoaded ? 'hidden' : ''} overflow-hidden left-0 z-90 w-full transition-opacity duration-300 ${toggle.sidebarToggle ? 'opacity-70 pointer-events-none' : 'opacity-150'}`}>
                {(<Articles
                    toggle={toggle}
                    setToggle={setToggle}
                    selected={selected}
                    setSelected={setSelected}
                    feedData={feedInfo.feedData}
                    profile={profile}
                    setProfile={setProfile}
                    article={article}
                    setArticle={setArticle}
                    newProfile={newProfile}
                    fetchedFeeds={fetchedFeeds}
                    setFetchedFeeds={setFetchedFeeds}
                    isInitialized={isInitialized}
                />)}
            </div> */}
            {/* <div className={`absolute left-0 overflow-hidden z-90 w-full transition-opacity duration-300 ${toggle.sidebarToggle ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {article.fullArticleLoaded && (
                    <>
                        <Reader
                            feedData={feedInfo.feedData}
                            toggle={toggle}
                            setToggle={setToggle}
                            article={article}
                            setArticle={setArticle}
                            selected={selected}
                            setSelected={setSelected}
                            newProfile={newProfile}
                            setNewProfile={setNewProfile}
                            setProfile={setProfile}
                            fetchedFeeds={fetchedFeeds}
                            setFetchedFeeds={setFetchedFeeds}
                        />
                    </>

                )}

            </div> */}


            <div className="w-96 z-99">
                {toggle.sidebarToggle && toggle.addToggle && (
                    <AddFeed
                        toggle={toggle}
                        setToggle={setToggle}
                        folders={folders}
                        setProfile={setProfile}
                    />
                )}
            </div>
            {toggle.changelogToggle && <div className="absolute w-lvw h-full flex justify-center items-center bg-inherit z-50">
                {<Changelog setToggle={setToggle} changelog={changelog} />}
            </div>}


            <div>
                <Navbar setShowNav={setShowNav} showNav={showNav} />
            </div>
        </div>
    )
}

export default MobileView