import './Reader.css';
import { useEffect, useState } from 'react';
import ReaderHeader from './ReaderHeader';
import ReaderContent from './ReaderContent';
import MobileLayout from '../MobileLayout/MobileLayout';

const Reader = ({ feedData, articleSelected, fullArticle, articleHeading, loadingAnimation, distraction, setDistraction, setFullArticleLoaded, sidebarToggle, setSidebarToggle, filteredArticles, setFilteredArticles, setProfile, setNewProfile, decompressFeed, compressedFeed, setArticleHeading }) => {
    const [textVoice, setTextVoice] = useState(false);

    const handleShareButtonClick = () => {
        if (articleHeading.link) {
            navigator.clipboard.writeText(articleSelected).then(() => {
                alert('Copied to clipboard!');
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        } else {
            alert("No article selected.");
        }

    };

    const handleArticleAction = (url, actionType) => {
        console.log("URL: ", url);
        console.log("Action type: ", actionType);

        if(url) {
            setArticleHeading(prev => {
                return {
                    ...prev,
                    [actionType]: !prev[actionType]
                }
            })

            setProfile((prevProfile) => {
                console.log("Prev profile: ", prevProfile);

                // Create a deep clone of the previous profile
                const updatedProfile = {
                    ...prevProfile,
                    feeds: {
                        ...prevProfile.feeds,
                        fetchedFeeds: prevProfile.feeds.fetchedFeeds.map((feed) => {
                            // Decompress the feed to get the full structure
                            const decompressedFeed = decompressFeed(feed.feed);
                            console.log("Decompressed Feed: ", decompressedFeed);

                            if (decompressedFeed?.items) {
                                // Modify the specific item based on the actionType
                                const updatedItems = decompressedFeed.items.map((item) => {
                                    if (item.id === url) {
                                        console.log("Item id selected: ", item.id);
                                        return {
                                            ...item,
                                            [actionType]: !item[actionType], // Toggle the actionType property
                                        };
                                    }
                                    return item; // Return unchanged item
                                });

                                console.log("Updated items: ", updatedItems)

                                // Recompress the feed with updated items
                                const recompressedFeed = compressedFeed({
                                    ...decompressedFeed,
                                    items: updatedItems,
                                });

                                // Return the updated feed with the recompressed feed
                                return {
                                    ...feed,
                                    feed: recompressedFeed,
                                };
                            }

                            return feed; // Return the feed unchanged if no items
                        }),
                    },
                };

                // Update the profile with the new fetchedFeeds
                setNewProfile(updatedProfile.feeds.fetchedFeeds);
                console.log("Updated profile: ", updatedProfile.feeds.fetchedFeeds);

                return updatedProfile; // Return the updated profile
            });
        } else {
            alert("No article selected.");
        }

        console.log("Article Heading : ", articleHeading)
        console.log("Article reading status: ", articleHeading.isRead);
    };



    return (
        <div className='reader w-full bg-gray-950 xl:relative'>
            {!sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>}
            <div className='pt-[4.5rem] xl:pt-0'>
                <div className='fixed h-lvh w-full xl:relative'>
                    <ReaderHeader
                        distraction={distraction}
                        setDistraction={setDistraction}
                        textVoice={textVoice}
                        setTextVoice={setTextVoice}
                        handleShareButtonClick={handleShareButtonClick}
                        setFullArticleLoaded={setFullArticleLoaded}
                        articleHeading={articleHeading}
                        handleArticleAction={handleArticleAction}
                    />
                    <div className={`mt-16 h-lvh w-dvw xl:w-full ${loadingAnimation ? 'overflow-hidden' : 'overflow-scroll'} scroll-smooth pb-16 absolute top-0 xl:mt-0 xl:relative`}>
                        <ReaderContent
                            feedData={feedData}
                            articleSelected={articleSelected}
                            fullArticle={fullArticle}
                            articleHeading={articleHeading}
                            loadingAnimation={loadingAnimation}
                            textVoice={textVoice}
                            setTextVoice={setTextVoice}
                        />
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Reader;