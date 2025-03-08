
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

const ArticleListView = ({ item, articleSelected, handleArticleClick }) => {
    return (
        <div className={`flex feed-1 z-10 mb-3 justify-between cursor-pointer rounded-lg transition-all ${articleSelected === item.id ? `bg-gray-500` : `bg-gray-800 hover:bg-gray-700`} ${item.isRead ? `opacity-50 relative z-0` : ''} ${item.isStarred ? 'bg-violet-700' : ''}`} onClick={() => handleArticleClick(item.link)}>
            <div className='p-3 w-full'>
                <div>
                    <div className="flex">
                        <h1>{item.title}</h1>
                    </div>
                    <div className="footer mt-3 flex justify-between">
                        <p className='text-gray-300 text-xs'>{Array.isArray(item.author || item.creator || item.byline) ? returnAuthor(item.author || item.creator || item.byline) : item.author || item.creator || item.byline}</p>
                        <p className='text-gray-300 text-xs ml-4'>{moment(item.pubDate).fromNow()}</p>
                    </div>
                </div>
            </div>
            {item.image ? (<img src={item.image} alt="" className='max-w-28 max-h-32 rounded-r-lg' />) : null}
        </div>
        
    );
};

export default ArticleListView;