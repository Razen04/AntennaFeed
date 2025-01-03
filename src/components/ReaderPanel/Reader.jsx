import './Reader.css';
import { useState } from 'react';
import ReaderHeader from './ReaderHeader';
import ReaderContent from './ReaderContent';

const Reader = ({ feedData, articleSelected, fullArticle, articleHeading, loadingAnimation, distraction, setDistraction, setFullArticleLoaded }) => {
    const [textVoice, setTextVoice] = useState(false);

    const handleShareButtonClick = () => {
        navigator.clipboard.writeText(articleSelected).then(() => {
            alert('Copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className='reader w-screen bg-gray-950 sora-mono-regular lg:block'>
            <ReaderHeader
                distraction={distraction}
                setDistraction={setDistraction}
                textVoice={textVoice}
                setTextVoice={setTextVoice}
                handleShareButtonClick={handleShareButtonClick}
                setFullArticleLoaded={setFullArticleLoaded}
            />
            <ReaderContent
                feedData={feedData}
                articleSelected={articleSelected}
                fullArticle={fullArticle}
                articleHeading={articleHeading}
                loadingAnimation={loadingAnimation}
                textVoice={textVoice}
            />
        </div>
    );
};

export default Reader;