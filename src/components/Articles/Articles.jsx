import { useEffect, useState } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleListView from './ArticleListView';
import MobileLayoutHeader from '../MobileLayout/MobileLayoutHeader';
import infiniteLoader from '../../assets/loader.gif';
import { apiUrl } from '../../config';
import ArticleCard from './ArticleCard';
import { decompressFeed } from '../../../utils/helper';

const Articles = ({ profile, toggle, setToggle, selected, setSelected, article, setArticle, setProfile, feedData, newProfile, fetchedFeeds, setFetchedFeeds, isInitialized }) => {
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
            setArticle((prev) => ({
                ...prev,
                fullArticle: article,
                fetchedArticles: [
                    ...prev.fetchedArticles,
                    {
                        url: url,
                        fullArticle: article,
                    },
                ],
            }));
            setSelected(prev => ({ ...prev, articleSelected: url }))
        } catch (error) {
            console.error(error);
            alert("Error fetching the article. Try again later.");
        }
    };

    useEffect(() => {
        setToggle(prev => ({ ...prev, loadingAnimationToggle: false }));
    }, [feedData]);


    const handleArticleClick = async (id) => {
        setToggle(prev => ({ ...prev, loadingAnimationToggle: true }));
        updateLastSession(id);
        setArticle(prev => ({ ...prev, fullArticleLoaded: true }));


        setArticle(prev => ({
            ...prev, articleHeading: {
                title: '',
                author: [],
                link: '',
                pubDate: '',
                isRead: false,
                isStarred: false
            }
        }));

        setArticle(prev => ({
            ...prev, fullArticle: {
                feed: '',
                image: ''
            }
        }));

        const url = id;
        try {
            const articleInDB = article.fetchedArticles.find((eachArticle) => eachArticle.url === id);

            if (articleInDB) {
                console.log("Article in DB present.");
                setArticle((prev) => ({
                    ...prev,
                    fullArticle: articleInDB.fullArticle,
                }));

                setSelected(prev => ({ ...prev, articleSelected: id }))
            } else {
                console.log("Article in DB not present.");
                await fetchFullArticle(url); // Fetch the article
            }

        } catch (err) {
            setArticle(prev => ({
                ...prev, articleHeading: {
                    title: '',
                    author: [],
                    link: '',
                    pubDate: '',
                    isRead: false,
                    isStarred: false
                }
            }));

            setArticle(prev => ({
                ...prev, fullArticle: {
                    feed: '',
                    image: ''
                }
            }));
        } finally {
            setToggle(prev => ({ ...prev, loadingAnimationToggle: false }));
        }

        console.log("Articles inside feed data: ", feedData)
        const selectedArticle = feedData.items.find(eachItem => eachItem.link === url);

        if (selectedArticle) {
            setArticle(prev => ({
                ...prev, articleHeading: {
                    title: selectedArticle.title,
                    author: selectedArticle.author || selectedArticle.creator || selectedArticle.byline || [],
                    link: selectedArticle.link,
                    pubDate: selectedArticle.pubDate,
                    isRead: selectedArticle.isRead,
                    isStarred: selectedArticle.isStarred
                }
            }));
        }
    };

    useEffect(() => {
        console.log("Initialized: ", isInitialized)
        if (!isInitialized) {
            console.log("Skipping...");
            return;
        }

        // Decompress feeds
        console.log("Article finding...")
        const decompressedFeeds = fetchedFeeds?.map(feed => ({
            ...feed,
            feed: decompressFeed(feed.feed)
        }));

        // Find selected feed
        console.log("Item: ", decompressedFeeds)
        console.log("Last selected file: ", selected.fileSelected)
        const feeds = decompressedFeeds?.find(item => item.url === selected.fileSelected);
        if (!feeds) {
            console.warn("Feed data not found for fileSelected:", selected.fileSelected);
            return;
        }

        console.log("feedDataaaa: ", feeds)
        console.log("feedData: ", feedData)
        // Filter articles by query and article view
        let updatedArticles = feedData.items?.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        if (!updatedArticles) updatedArticles = [];

        // Filter based on article view
        if (article.articleView === 'read') {
            updatedArticles = updatedArticles.filter(item => item.isRead);
        } else if (article.articleView === 'unread') {
            updatedArticles = updatedArticles.filter(item => !item.isRead);
        } else if (article.articleView === 'starred') {
            updatedArticles = updatedArticles.filter(item => item.isStarred);
        }

        console.log("updatedArticlessss: ", updatedArticles)
        // Update state
        setArticle(prev => ({ ...prev, filteredArticles: updatedArticles }));
    }, [feedData, article.articleView, query, fetchedFeeds, isInitialized, selected.fileSelected]);

    return (
        <div className='relative'>
            {!toggle.sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayoutHeader toggle={toggle}
                    setToggle={setToggle} />
            </div>}

            {!feedData && !toggle.loadingAnimationToggle &&
                <div className='w-full h-lvh overflow-hidden bg-gray-950 flex justify-center items-center flex-col'>
                    <h1 className='text-lg xl:text-2xl'>Choose a feed to see the articles</h1>
                    <p className='text-sm md:text-sm text-center text-gray-400 w-2/3'>This is a beta build so there will be many errors so be careful about that. Don&apos;t spam click any feeds, wait for sometime otherwise feed providers may ban this app. Please report any issues on the <span className='text-violet-500 underline'><a href="https://github.com/Razen04/AntennaFeed" target='_blank'>Github</a></span> issues page.</p>
                </div>}
            <div className={`${toggle.loadingAnimationToggle ? 'w-full h-full flex items-center justify-center xl:hidden' : ''}`}>
                {toggle.loadingAnimationToggle && <img src={infiniteLoader} className='w-16 mt-48 transition-all' />}
            </div>
            {feedData && !toggle.loadingAnimationToggle && <div className={`${toggle.distractionToggle ? 'focused' : ''} w-full xl:w-96 z-10 pt-[4.5rem] xl:pt-0 h-lvh bg-gray-950 transition-all`}>
                <div className={`w-full xl:w-96 px-2 xl:px-0 `}>
                    <ArticleHeader query={query} setQuery={setQuery} listView={listView} setListView={setListView} article={article} setArticle={setArticle} />
                    {
                        article.filteredArticles && (
                            <div className='flex justify-between items-center pb-2 pt-4 px-2'>
                                <h1 className='text-white font-bold'>{feedData.title}</h1>
                                <h1 className='font-semibold text-white px-2 rounded-lg'>{article.filteredArticles.length}</h1>
                            </div>
                        )
                    }
                    <div className='px-2'>
                        <div>
                            {!toggle.loadingAnimationToggle && <div className='mt-2 pb-60 xl:pb-48 overflow-scroll h-lvh'>
                                {listView && article?.filteredArticles?.map((item, index) => (
                                    <ArticleListView
                                        key={index}
                                        item={item}
                                        articleSelected={selected.articleSelected}
                                        handleArticleClick={handleArticleClick}
                                    />

                                ))}
                                {!listView && article?.filteredArticles?.map((item, index) => (
                                    <ArticleCard
                                        key={index}
                                        item={item}
                                        articleSelected={selected.articleSelected}
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