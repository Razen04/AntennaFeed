import moment from 'moment'
import doneLogo from '../../assets/done.svg'
import starLogo from '../../assets/star.svg'
import starFilledLogo from '../../assets/starfilled.svg'
import readLogo from '../../assets/read.svg'
import readFilledLogo from '../../assets/readfilled.svg'
import { useEffect, useState } from 'react';

const returnAuthor = (authorName) => {
    let authorNames = '';
    if (Array.isArray(authorName) && authorName.length > 0) {
        authorNames = authorName.join(',  ');
    } else if (typeof authorName === 'string') {
        authorNames = authorName;
    } else {
        authorNames = 'Unknown Author';
    }
    return authorNames;
}



const Articles = ({ setFeedData, profile, setProfile, feedData, setFullArticle, articleSelected, setArticleSelected, setArticleHeading, setLoadingAnimation, distraction, fileSelected }) => {

    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')
    const [newProfile, setNewProfile] = useState(feedData)
    const [filteredArticles, setFilteredArticles] = useState([])

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
            }
        })
    }

    const fetchFullArticle = async (url) => {
        try {
            const response = await fetch('http://localhost:3000/articles/fetch-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            })

            if (!response.ok) {
                const errorText = await response.text(); // Get error response as text
                console.error('Error response:', errorText);
                throw new Error('Network response was not ok');
            }

            const article = await response.json();
            await setFullArticle(article);
            setLoadingAnimation(false)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleArticleClick = async (id) => {
        setFullArticle({
            feed: '',
            image: ''
        })
        updateLastSession(id)
        setLoadingAnimation(true)
        setArticleHeading(prevArticle => {
            if (prevArticle) {
                prevArticle.title = '',
                    prevArticle.author = [],
                    prevArticle.link = '',
                    prevArticle.pubDate = ''
            }

            return prevArticle
        })
        const url = id;
        await fetchFullArticle(url);

        const selectedArticle = feedData.items.find(eachItem => eachItem.link === url)

        if (selectedArticle) {
            setArticleHeading({
                title: selectedArticle.title,
                author: selectedArticle.author || selectedArticle.creator || selectedArticle.byline || [],
                link: selectedArticle.link,
                pubDate: selectedArticle.pubDate
            })
        }

        setArticleSelected(id)
        setSelected(id)
    }

    const handleSearchBar = (item) => {
        setQuery(item.toLowerCase());
    }




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
            console.log("updatedProfile: ", updatedProfile)
            setNewProfile(updatedProfile.feeds.fetchedFeeds)
            return updatedProfile; // Return the updated profile
        });
    };

    useEffect(() => {
        const feedData = profile.feeds.fetchedFeeds.find(item => {
            return item.id === fileSelected
        })
        const updatedArticles = feedData.feed.items.filter(item =>
            item.title.toLowerCase().includes(query)
        )
        setFilteredArticles(updatedArticles)
    }, [query, newProfile, feedData])


    console.log("filteredArticles", filteredArticles)



    return (
        <div className={`${distraction ? 'focused' : null} w-[40rem] h-screen bg-gray-900 relative overflow-scroll transition-all`}>
            <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2 border-gray-800">
                <input
                    type="text"
                    placeholder="Search for articles..."
                    className="p-2 pl-5 w-56 rounded-3xl bg-gray-800 text-white border-gray-900 text-md outline-none"
                    value={query}
                    onChange={(e) => handleSearchBar(e.target.value)}
                />
                <button className='p-2 bg-black rounded-3xl transition-all hover:bg-violet-900'>
                    <img src={doneLogo} alt="Mark all as read" />
                </button>
            </div>
            {feedData &&
                <div className='flex justify-between items-center px-4 pb-2 pt-4'>
                    <h1 className='text-white font-bold'>{feedData.title}</h1>
                    <h1 className='font-semibold text-violet-900 bg-violet-300 p-2 rounded-lg'>{feedData.items.length}</h1>
                </div>
            }
            <div className='mt-2 pb-6'>
                {filteredArticles.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className={`feed-1 mx-2 mb-3 pb-2 p-4 cursor-pointer rounded-lg transition-all ${articleSelected === item.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`} ${item.isRead ? `opacity-50` : null}`}>
                                <div className='' onClick={() => {
                                    handleArticleClick(item.link)
                                }}>
                                    <div className="flex justify-between ">
                                        <h1 className='text-white mr-6 text-sm'>{item.title}</h1>
                                        {item.image ? (<img src={item.image} alt="" className='w-20 h-14 rounded-lg' />) : null}

                                    </div>
                                    <div className="footer mt-3 flex justify-between">
                                        <p className='text-gray-300 text-xs'>{Array.isArray(item.author || item.creator || item.byline) ? returnAuthor(item.author || item.creator || item.byline) : item.author || item.creator || item.byline}</p>
                                        <p className='text-gray-300 text-xs ml-4'>{moment(item.pubDate).fromNow()}</p>
                                    </div>
                                </div>
                                <div className='mt-2 flex gap-2'>
                                    <button onClick={() => handleArticleAction(item.id, "isRead")}>
                                        <img src={item.isRead ? readFilledLogo : readLogo} alt="" className='w-5 hover:w-6 transition-all' />
                                    </button>
                                    <button onClick={() => handleArticleAction(item.id, "isStarred")}>
                                        <img src={item.isStarred ? starFilledLogo : starLogo} alt="" className='w-5 hover:w-6 transition-all' />
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Articles
