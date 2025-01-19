import moment from 'moment';

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

const ArticleCard = ({ item, articleSelected, handleArticleClick }) => {
    return (
        <div className={`feed-1 mb-3 cursor-pointer rounded-lg transition-all ${articleSelected === item.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`} ${item.isRead ? `opacity-50` : ''} ${item.isStarred ? 'bg-violet-700' : ''}` } onClick={() => handleArticleClick(item.link)}>
            {item.image ? (<img src={item.image} alt="" className='w-full rounded-t-lg max-h-64' />) : null}
            <div className='p-3'>
                <div className="flex justify-between">
                    <h1 className='text-white'>{item.title}</h1>
                </div>
                <div className="footer mt-3 flex justify-between">
                    <p className='text-gray-300 text-xs'>{Array.isArray(item.author || item.creator || item.byline) ? returnAuthor(item.author || item.creator || item.byline) : item.author || item.creator || item.byline}</p>
                    <p className='text-gray-300 text-xs ml-4'>{moment(item.pubDate).fromNow()}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;