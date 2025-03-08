import ArticleSearchBar from './ArticleSearchBar';
import cardLogo from '../../assets/card.svg';
import listLogo from '../../assets/list.svg';

const ArticleHeader = ({ query, setQuery, listView, setListView, article, setArticle }) => {

    const handleArticleView = (value) => {
        setArticle(prev => ({ ...prev, articleView: value }));
    }

    return (
        <div className="header relative z-30 w-full p-2 border-b-2 border-gray-800 bg-gray-950">
            <ArticleSearchBar query={query} setQuery={setQuery} />
            <div className='flex items-center justify-between mt-4'>
                <div className='flex w-16 justify-between'>
                    <button className={`hover:bg-gray-700 rounded-lg ${listView ? 'bg-gray-700' : ''} transition-all p-1 mr-1`} onClick={() => setListView(true)}>
                        <img src={listLogo} alt="List View" />
                    </button>
                    <button className={`hover:bg-gray-700 rounded-lg ${!listView ? 'bg-gray-700' : ''} transition-all p-1`} onClick={() => setListView(false)}>
                        <img src={cardLogo} alt="Card View" />
                    </button>
                </div>
                <select
                    name="Articles View"
                    className="bg-gray-950 text-white border-b-2 border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    onChange={(e) => handleArticleView(e.target.value)}
                    value={article.articleView}
                >
                    <option value="all" className="bg-gray-800 text-white p-2">All</option>
                    <option value="unread" className="bg-gray-800 text-white p-2">Unread</option>
                    <option value="read" className="bg-gray-800 text-white p-2">Read</option>
                    <option value="starred" className="bg-gray-800 text-white p-2">Starred</option>
                </select>

            </div>
        </div>
    );
};

export default ArticleHeader;