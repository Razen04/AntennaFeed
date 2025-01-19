import React, { useEffect, useState } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleItem from './ArticleItem';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileLayout from '../MobileLayout/MobileLayout';
import infiniteLoader from '../../assets/loader.gif';
import { apiUrl } from '../../config';
import ArticleCard from './ArticleCard';

const Articles = ({ profile, setProfile, feedData, setFullArticle, articleSelected, setArticleSelected, setArticleHeading, setLoadingAnimation, distraction, fileSelected, decompressFeed, sidebarToggle, setSidebarToggle, setFullArticleLoaded, loadingAnimation, filteredArticles, setFilteredArticles, newProfile, articleView, setArticleView }) => {

    const [selected, setSelected] = useState('');
    const [query, setQuery] = useState('');
    const [listView, setListView] = useState(true);

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

    useEffect(() => {
        setLoadingAnimation(false); // Reset loader when the feed changes
        console.log("Loading: ", loadingAnimation)
    }, [feedData]); // Trigger whenever the feed data changes


    const handleArticleClick = async (id) => {
        setLoadingAnimation(true); // Trigger loader immediately
        updateLastSession(id);
        setFullArticleLoaded(true);

        setArticleHeading({
            title: '',
            author: [],
            link: '',
            pubDate: '',
        });

        setFullArticle({
            feed: '',
            image: '',
        });

        const url = id;
        try {
            await fetchFullArticle(url); // Fetch the article
        } finally {
            setLoadingAnimation(false); // Stop the loader after fetch
        }

        const selectedArticle = feedData.items.find(eachItem => eachItem.link === url);

        if (selectedArticle) {
            setArticleHeading({
                title: selectedArticle.title,
                author: selectedArticle.author || selectedArticle.creator || selectedArticle.byline || [],
                link: selectedArticle.link,
                pubDate: selectedArticle.pubDate,
                isRead: selectedArticle.isRead,
                isStarred: selectedArticle.isStarred
            });
        }

        setArticleSelected(id);
        setSelected(id);
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
        console.log("feed data for selected file: ", feedData)
        let updatedArticles = feedData?.feed?.items?.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        if (articleView === 'read') {
            updatedArticles = updatedArticles.filter(item => item.isRead);
        } else if (articleView === 'unread') {
            updatedArticles = updatedArticles.filter(item => !item.isRead);
        } else if (articleView === 'starred') {
            updatedArticles = updatedArticles.filter(item => item.isStarred);
        }

        setFilteredArticles(updatedArticles);
    }, [query, newProfile, feedData, articleView]);

    const calculateArticleLength = (feedData) => {
        let actualArticle = [];
        if (articleView === 'read') {
            actualArticle = feedData.items.filter(item => item.isRead);
        } else if (articleView === 'unread') {
            actualArticle = feedData.items.filter(item => !item.isRead);
        } else if (articleView === 'starred') {
            actualArticle = feedData.items.filter(item => item.isStarred);
        } else {
            actualArticle = feedData.items;
        }
        return actualArticle.length;
    }

    const calLength = (articles) => {
        return articles.length;
    }

    return (
        <div className='relative'>
            {!sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>}

            {!feedData && !loadingAnimation &&
                <div className='w-full h-lvh overflow-hidden bg-gray-950 flex justify-center items-center flex-col'>
                    <h1 className='text-lg xl:text-2xl'>Choose a feed to see the articles</h1>
                    <p className='text-sm md:text-sm text-center text-gray-400 w-2/3'>This is a beta build so there will be many errors so be careful about that. Don&apos;t spam click any feeds, wait for sometime otherwise feed providers may ban this app. Please report any issues on the <span className='text-violet-500 underline'><a href="https://github.com/Razen04/AntennaFeed" target='_blank'>Github</a></span> issues page.</p>
                </div>}
            <div className={`${loadingAnimation ? 'w-full h-full flex items-center justify-center' : ''}`}>
                {loadingAnimation && <img src={infiniteLoader} className='w-16 mt-48 transition-all' />}
            </div>
            {feedData && !loadingAnimation && <div className={`${distraction ? 'focused' : ''} w-full xl:w-96 z-10 pt-[4.5rem] xl:pt-0 h-lvh bg-gray-950 transition-all`}>
                <div className={`w-full xl:w-96 px-2 xl:px-0 `}>
                    <ArticleHeader query={query} setQuery={setQuery} listView={listView} setListView={setListView} articleView={articleView} setArticleView={setArticleView} />
                    {
                        filteredArticles && (
                            <div className='flex justify-between items-center pb-2 pt-4 px-2'>
                                <h1 className='text-white font-bold'>{feedData.title}</h1>
                                <h1 className='font-semibold bg-violet-500 text-white px-2 pb-1 rounded-lg'>{calLength(filteredArticles)}</h1>
                            </div>
                        )
                    }
                    <div className='px-2'>
                        <div>
                            {!loadingAnimation && <div className='mt-2 pb-60 xl:pb-48 overflow-scroll h-lvh'>
                                {listView && filteredArticles?.map((item, index) => (
                                    <ArticleItem
                                        key={index}
                                        item={item}
                                        articleSelected={articleSelected}
                                        handleArticleClick={handleArticleClick}
                                    />

                                ))}
                                {!listView && filteredArticles?.map((item, index) => (
                                    <ArticleCard
                                        key={index}
                                        item={item}
                                        articleSelected={articleSelected}
                                        handleArticleClick={handleArticleClick}
                                    />

                                ))}
                            </div>}
                        </div>

                    </div>
                </div>


            </div >}
        </div>

    );
};

export default Articles;