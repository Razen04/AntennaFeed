import React from 'react';
import ArticleSearchBar from './ArticleSearchBar';

const ArticleHeader = ({ query, setQuery }) => {
    return (
        <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2 border-gray-800">
            <ArticleSearchBar query={query} setQuery={setQuery} />
        </div>
    );
};

export default ArticleHeader;