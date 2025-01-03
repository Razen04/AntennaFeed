import React from 'react';

const ArticleSearchBar = ({ query, setQuery }) => {
    return (
        <input
            type="text"
            placeholder="Search for articles..."
            className="p-2 pl-5 w-full rounded-3xl bg-gray-800 text-white border-gray-900 text-md outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default ArticleSearchBar;