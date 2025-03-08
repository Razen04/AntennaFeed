import AddFeed from "../Add Feed/AddFeed"
import Articles from "../Articles/Articles"
import Changelog from "../Changelog/Changelog"
import Reader from "../ReaderPanel/Reader"
import Sidebar from "../Sidebar/Sidebar"

const DesktopView = ({ toggle, setToggle, profile, setProfile, folders, setFolders, selected, setSelected, feedInfo, setFeedInfo, article, setArticle, fetchChangelog, newProfile, setNewProfile, handleAddFeed, changelog, fetchedFeeds, setFetchedFeeds, isInitialized }) => {
    return (
        <div>
            <div className={`flex h-lvh ${toggle.addToggle || toggle.addOpmlToggle ? 'pointer-events-none blur-md' : ''}`}>
                <Sidebar
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
                />
                {!feedInfo.feedData && !toggle.loadingAnimationToggle &&
                    <div className='w-full h-lvh overflow-hidden bg-gray-950 flex justify-center items-center flex-col'>
                        <h1 className='text-lg xl:text-2xl'>Choose a feed to see the articles</h1>
                        <p className='text-sm md:text-sm text-center text-gray-400 w-2/3'>This is a beta build so there will be many errors so be careful about that. Don&apos;t spam click any feeds, wait for sometime otherwise feed providers may ban this app. Please report any issues on the <span className='text-violet-500 underline'><a href="https://github.com/Razen04/AntennaFeed" target='_blank'>Github</a></span> issues page.</p>
                    </div>}
                {feedInfo.feedData && (
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
                        <Articles
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
                        />
                    </>
                )}
                {toggle.changelogToggle && <div className="absolute w-lvw h-full flex justify-center items-center bg-inherit z-50">
                    {<Changelog setToggle={setToggle} changelog={changelog} />}
                </div>}
            </div>

            {toggle.addToggle && (
                <AddFeed
                    toggle={toggle}
                    setToggle={setToggle}
                    folders={folders}
                    setProfile={setProfile}
                />
            )}
        </div>
    )
}

export default DesktopView