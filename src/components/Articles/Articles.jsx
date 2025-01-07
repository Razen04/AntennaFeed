import React, { useEffect, useState } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleItem from './ArticleItem';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileLayout from '../MobileLayout/MobileLayout';
import infiniteLoader from '../../assets/infiniteLoader.svg';

const Articles = ({ profile, setProfile, feedData, setFullArticle, articleSelected, setArticleSelected, setArticleHeading, setLoadingAnimation, distraction, fileSelected, decompressFeed, sidebarToggle, setSidebarToggle, setFullArticleLoaded, loadingAnimation }) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const [selected, setSelected] = useState('');
    const [query, setQuery] = useState('');
    const [newProfile, setNewProfile] = useState(feedData);
    const [filteredArticles, setFilteredArticles] = useState([]);

    const updateLastSession = (id) => {
        setProfile(prevProfile => {
            return {
                ...prevProfile,
                history: {
                    ...prevProfile.history,
                    lastSession: {
                        timestamp: Date.now(),
                        activeFeed: id
                    }
                }
            };
        });
    };

    const fetchFullArticle = async (url) => {
        try {
            const response = await fetch(`${apiUrl}/articles/fetch-article`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get error response as text
                console.error('Error response:', errorText);
                throw new Error('Network response was not ok');
            }

            const article = await response.json();
            await setFullArticle(article);
        } catch (error) {
            console.error(error);
            toast.error("Error fetching the article. Try again later.");
        }
    };

    const handleArticleClick = async (id) => {
        setFullArticleLoaded(true);
        updateLastSession(id);
        setLoadingAnimation(true);
        setArticleHeading(prevArticle => {
            if (prevArticle) {
                prevArticle.title = '';
                prevArticle.author = [];
                prevArticle.link = '';
                prevArticle.pubDate = '';
            }

            return prevArticle;
        });
        const url = id;
        setFullArticle({
            feed: '',
            image: ''
        });
        await fetchFullArticle(url);
        setLoadingAnimation(false);


        const selectedArticle = feedData.items.find(eachItem => eachItem.link === url);

        if (selectedArticle) {
            setArticleHeading({
                title: selectedArticle.title,
                author: selectedArticle.author || selectedArticle.creator || selectedArticle.byline || [],
                link: selectedArticle.link,
                pubDate: selectedArticle.pubDate
            });
        }

        setArticleSelected(id);
        setSelected(id);
    };

    const handleArticleAction = (url, actionType) => {
        setProfile((prevProfile) => {
            // Create a deep clone of the previous profile to ensure immutability
            const updatedProfile = {
                ...prevProfile,
                feeds: {
                    ...prevProfile.feeds,
                    fetchedFeeds: prevProfile.feeds.fetchedFeeds.map((feed) => {
                        if (feed.feed?.items) {
                            return {
                                ...feed,
                                feed: {
                                    ...feed.feed,
                                    items: feed.feed.items.map((item) => {
                                        // Update the specific actionType for the matching item
                                        if (item.id === url) {
                                            return {
                                                ...item,
                                                [actionType]: !item[actionType],
                                            };
                                        }
                                        return item;
                                    }),
                                },
                            };
                        }
                        return feed;
                    }),
                },
            };
            setNewProfile(updatedProfile.feeds.fetchedFeeds);
            return updatedProfile; // Return the updated profile
        });
    };

    useEffect(() => {
        const decompressedFeeds = profile?.feeds?.fetchedFeeds.map(feed => ({
            ...feed,
            feed: decompressFeed(feed.feed)
        }));
        const feedData = decompressedFeeds?.find(item => {
            return item.id === fileSelected;
        });

        if (!feedData) {
            console.warn("Feed data not found for fileSelected:", fileSelected);
            return;
        }
        const updatedArticles = feedData?.feed?.items?.filter(item =>
            item.title.toLowerCase().includes(query)
        );
        setFilteredArticles(updatedArticles);
    }, [query, newProfile, feedData]);

    return (
        <div className='relative'>
            {!sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>}

            {!feedData &&
                <div className='w-full h-lvh overflow-hidden bg-gray-950 flex justify-center items-center flex-col'>
                    <h1 className='text-lg xl:text-2xl'>Choose a feed to see the articles</h1>
                    <p className='text-sm md:text-sm text-center text-gray-400 w-2/3'>This is a beta build so there will be many errors so be careful about that. Don&apos;t spam click any feeds, wait for sometime otherwise feed providers may ban this app. Please report any issues on the <span className='text-violet-500 underline'><a href="https://github.com/Razen04/AntennaFeed" target='_blank'>Github</a></span> issues page.</p>
                </div>}
            {feedData && <div className={`${distraction ? 'focused' : null} w-full xl:w-96 z-10 pt-[4.5rem] xl:pt-0 h-lvh bg-gray-950 overflow-scroll transition-all`}>
                <div className='fixed w-full xl:w-96'>
                    <ArticleHeader query={query} setQuery={setQuery} />
                </div>
                <div className='pt-16'>
                    {
                        feedData && (
                            <div className='flex justify-between items-center px-4 pb-2 pt-4'>
                                <h1 className='text-white font-bold'>{feedData.title}</h1>
                                <h1 className='font-semibold bg-violet-500 text-white px-2 py-1 rounded-lg'>{feedData.items.length}</h1>
                            </div>
                        )
                    }
                    <div>

                        <div className={`${loadingAnimation ? 'w-full h-full flex items-center justify-center' : ''}`}>
                            {loadingAnimation && <img src={infiniteLoader} className='w-16 mt-48 transition-all' />}
                        </div>
                        {!loadingAnimation && <div className='mt-2 pb-20 xl:pb-0'>
                            {filteredArticles?.map((item, index) => (
                                <ArticleItem
                                    key={index}
                                    item={item}
                                    articleSelected={articleSelected}
                                    handleArticleClick={handleArticleClick}
                                    handleArticleAction={handleArticleAction}
                                />
                            ))}
                        </div>}
                    </div>

                </div>

            </div >}
        </div>

    );
};

export default Articles;