import moment from 'moment'
import doneLogo from '../../assets/done.svg'
import { useEffect, useState } from 'react';

const articleStyle = {
    height: '40rem'
}

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



const Articles = ({ setProfile, feedData, setFullArticle, articleSelected, setArticleSelected, setArticleHeading, setLoadingAnimation, distraction }) => {

    const [selected, setSelected] = useState('')

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

    function calculateReadingTime(content) {
        const averageReadingSpeedWPM = 1000;

        const wordCount = content.length

        const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeedWPM);

        return readingTimeMinutes;
    }

    const fetchFullArticle = async (url) => {
        try {
            const response = await fetch('http://localhost:3000/fetch-article', {
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
        updateLastSession(id)
        setLoadingAnimation(true)
        setArticleHeading(prevArticle => {
            if (prevArticle) {
                prevArticle.title = '',
                    prevArticle.author = [],
                    prevArticle.link = '',
                    prevArticle.pubDate = ''
            }

        })

        setFullArticle('')
        const url = id;
        await fetchFullArticle(url);

        const selectedArticle = feedData.items.find(eachItem => eachItem.link === url)

        if (selectedArticle) {
            setArticleHeading({
                title: selectedArticle.title,
                author: selectedArticle.author || selectedArticle.creator || [],
                link: selectedArticle.link,
                pubDate: selectedArticle.pubDate
            })
        }

        setArticleSelected(id)
        setSelected(id)
    }


    return (
        <div className={`${distraction ? 'focused' : null} max-w-96 h-screen bg-gray-900 relative transition-all`}>
            <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2 border-gray-800">
                <input
                    type="text"
                    placeholder="Search for Articles"
                    className="p-2 pl-5 w-56 rounded-3xl bg-gray-800 text-white border-gray-900 text-md outline-none"
                />
                <button className='p-2 bg-black rounded-3xl transition-all hover:bg-violet-900'>
                    <img src={doneLogo} alt="Mark all as read" />
                </button>

            </div>
            {feedData &&
                <div className='flex justify-between items-center px-4 pt-4'>
                    <h1 className='text-white font-bold'>{feedData.title}</h1>
                    <h1 className='font-semibold text-violet-500 '>{feedData.items.length}</h1>
                </div>
            }
            <div className='mt-2 overflow-scroll' style={articleStyle}>
                {feedData.items.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className={`feed-1 mx-2 mb-3 pb-2 p-4 cursor-pointer rounded-lg ${articleSelected === item.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`}`} onClick={() => { handleArticleClick(item.link) }}>
                                <div className="flex justify-between">
                                    <h1 className='text-white mr-6 text-sm'>{item.title}</h1>
                                    <img src={item.image} alt="" className='w-20 h-14 rounded-lg' />

                                </div>
                                <div className="footer mt-3 flex justify-between">
                                    <p className='text-gray-300 text-xs'>{Array.isArray(item.author || item.creator) ? returnAuthor(item.author || item.creator) : item.author || item.creator} &bull; {calculateReadingTime(item.content)} mins read</p>
                                    <p className='text-gray-300 text-xs ml-4'>{moment(item.pubDate).fromNow()}</p>
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
