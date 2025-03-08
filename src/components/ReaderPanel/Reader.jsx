import './Reader.css';
import { useEffect, useState } from 'react';
import ReaderHeader from './ReaderHeader';
import ReaderContent from './ReaderContent';
import MobileLayoutHeader from '../MobileLayout/MobileLayoutHeader';
import { compressFeed, decompressFeed } from '../../../utils/helper';

const Reader = ({ toggle, setToggle, feedData, selected, article, setArticle, setProfile, setNewProfile, fetchedFeeds, setFetchedFeeds }) => {

    const [textVoice, setTextVoice] = useState(false);

    const handleShareButtonClick = () => {
        if (article.articleHeading.link) {
            navigator.clipboard.writeText(selected.articleSelected).then(() => {
                alert('Copied to clipboard!');
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        } else {
            alert("No article selected.");
        }
    };

    const handleArticleAction = (url, actionType) => {

        if (url) {

            setArticle(prev => ({
                ...prev,
                articleHeading: {
                    ...prev.articleHeading,
                    [actionType]: !prev.articleHeading[actionType]
                }
            }));

            setFetchedFeeds(prev => {
                // Step 1: Find the feed to update
                console.log("Feed.id: ", prev.find(feed => console.log(feed.url === selected.fileSelected)))
                const actualFeed = prev.find(feed => feed.url === selected.fileSelected);
                if (!actualFeed) {
                    console.warn("No feed found for the selected file.");
                    return prev; // Return unchanged feeds if no match is found
                }

                console.log("actual Feed: ", actualFeed)
                // Step 2: Decompress and update the specific feed
                const updatedArticles = decompressFeed(actualFeed.feed).items.map(eachArticle => {
                    if (eachArticle.id === url) {
                        console.log("eachArticle: ", eachArticle)
                        console.log("actionType: ", !eachArticle[actionType])
                        return {
                            ...eachArticle,
                            [actionType]: !eachArticle[actionType] // Toggle the specified action
                        };
                    }
                    return eachArticle;
                });
                console.log("updatedArticles: ", updatedArticles);
                // Step 3: Replace the updated feed back into the list
                const updatedFeeds = prev.map(feed => {
                    if (feed.url === selected.fileSelected) {
                        console.log("feed.id: ", feed.url);
                        console.log("seelcted.fileSelected: ", selected.fileSelected)
                        return {
                            ...feed,
                            feed: compressFeed(updatedArticles)// Compress the updated articles back
                        };
                    }
                    return feed; // Return other feeds unchanged
                });

                console.log("Article action updated.", decompressFeed(updatedFeeds[1].feed))
                return updatedFeeds; // Return the updated feed list
            });


        } else {
            alert("No article selected.");
        }
    };

    return (
        <div className='reader w-full bg-gray-950 xl:relative'>
            {!toggle.sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayoutHeader toggle={toggle} setToggle={setToggle} />
            </div>}
            <div className='pt-[4.5rem] xl:pt-0'>
                <div className='fixed h-lvh w-full xl:relative'>
                    <ReaderHeader
                        toggle={toggle}
                        setToggle={setToggle}
                        textVoice={textVoice}
                        setTextVoice={setTextVoice}
                        handleShareButtonClick={handleShareButtonClick}
                        article={article}
                        setArticle={setArticle}
                        handleArticleAction={handleArticleAction}
                    />
                    <div className={`mt-16 h-lvh w-dvw xl:w-full ${toggle.loadingAnimationToggle ? 'overflow-hidden' : 'overflow-scroll'} scroll-smooth pb-16 absolute top-0 xl:mt-0 xl:relative`}>
                        <ReaderContent
                            feedData={feedData}
                            fetchedFeeds={fetchedFeeds}
                            articleSelected={selected.articleSelected}
                            fullArticle={article.fullArticle}
                            articleHeading={article.articleHeading}
                            loadingAnimationToggle={toggle.loadingAnimationToggle}
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