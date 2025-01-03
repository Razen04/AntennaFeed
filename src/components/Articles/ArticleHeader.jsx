import ArticleSearchBar from './ArticleSearchBar';

const ArticleHeader = ({ query, setQuery }) => {
    return (
        <div className="header px-2 py-2 flex justify-between items-center border-b-2 border-gray-800 bg-gray-950">
            <ArticleSearchBar query={query} setQuery={setQuery} />
        </div>
    );
};

export default ArticleHeader;