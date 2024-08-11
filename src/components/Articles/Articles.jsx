import moment from 'moment'
import doneLogo from 'D:/rss-feedit/src/assets/done.svg'
import { Parser } from 'htmlparser2';
import { useState } from 'react';

const extractImageSrc = (html) => {
    let src = null;

    const parser = new Parser({
        onopentag(name, attributes) {
            if (name === "img" && attributes.src) {
                src = attributes.src;
            }
        }
    }, { decodeEntities: true });

    parser.write(html);
    parser.end();

    return src;
};

const articleStyle = {
    height: '49rem'
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



const Articles = ({ data, fileSelected, folderSelected, setArticleSelected, setFullArticle }) => {
    const [selected, setSelected] = useState('')

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
            setFullArticle(article);
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleArticleClick = async (id) => {
        const url = id;
        await fetchFullArticle(url);
        setArticleSelected(id)
        setSelected(id)
    }


    return (
        <div className="min-w-72 h-screen bg-gray-900 relative">
            <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2 border-gray-800">
                <input
                    type="text"
                    placeholder="Search for Articles"
                    className="p-2 pl-5 w-96 rounded-3xl bg-gray-800 text-white border-gray-900 text-md outline-none"
                />
                <button className='p-2 bg-black rounded-3xl transition-all hover:bg-violet-900'>
                    <img src={doneLogo} alt="Mark all as read" />
                </button>

            </div>
            {data.map(items => {
                if (folderSelected === items.id) {
                    return (
                        <div key={items.id} className="articles px-4 mt-3 z-0">
                            {items.contents.map(item => {
                                if (fileSelected === item.feed.id) {
                                    return (
                                        <div key={item.feed.id}>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='text-white font-bold'>{item.feed.title}</h1>
                                                <h1 className='text-black font-semibold bg-purple-500 px-2 py-1 rounded-full'>{item.feed.entry.length}</h1>
                                            </div>
                                            <div className="feeds mt-6 overflow-scroll" style={articleStyle}>
                                                {item.feed.entry.map(eachItem => (
                                                    <div key={eachItem.id} className={`feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg ${selected === eachItem.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`}`} onClick={() => { handleArticleClick(eachItem.id) }}>
                                                        <div className="flex justify-between">
                                                            <h1 className='text-white mr-6 text-sm'>{eachItem.title}</h1>
                                                            <img src={extractImageSrc(eachItem.content.__text)} alt="" className='w-20 h-14 rounded-lg' />
                                                        </div>
                                                        <div className="footer mt-3 flex justify-between">
                                                            <p className='text-gray-300 text-xs'>{Array.isArray(eachItem.author.name) ? returnAuthor(eachItem.author.name) : eachItem.author.name} &bull; {calculateReadingTime(eachItem.content.__text)} mins read</p>
                                                            <p className='text-gray-300 text-xs ml-4'>{moment(eachItem.updated).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Return null if fileSelected doesn't match
                            })}
                        </div>
                    );
                }
                return null; // Return null if folderSelected doesn't match
            })}


            <div className="end absolute bottom-0 z-99 w-full">
                <button className='text-center text-white bg-black p-3 w-full transition-all hover:bg-white hover:text-black'>Load More</button>
            </div>
        </div>
    )
}

export default Articles
