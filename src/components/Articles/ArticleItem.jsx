import React from 'react';
import moment from 'moment';
import starLogo from '../../assets/star.svg';
import starFilledLogo from '../../assets/starfilled.svg';
import readLogo from '../../assets/read.svg';
import readFilledLogo from '../../assets/readfilled.svg';

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
};

const ArticleItem = ({ item, articleSelected, handleArticleClick, handleArticleAction }) => {
    return (
        <div className={`feed-1 mx-2 mb-3 pb-2 p-4 cursor-pointer rounded-lg transition-all ${articleSelected === item.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`} ${item.isRead ? `opacity-50` : null}`}>
            <div className='' onClick={() => handleArticleClick(item.link)}>
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
    );
};

export default ArticleItem;