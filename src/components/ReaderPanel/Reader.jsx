import './Reader.css';
import { useState } from 'react';
import ReaderHeader from './ReaderHeader';
import ReaderContent from './ReaderContent';
import MobileLayout from '../MobileLayout/MobileLayout';

const Reader = ({ feedData, articleSelected, fullArticle, articleHeading, loadingAnimation, distraction, setDistraction, setFullArticleLoaded, sidebarToggle, setSidebarToggle }) => {
    const [textVoice, setTextVoice] = useState(false);

    const handleShareButtonClick = () => {
        navigator.clipboard.writeText(articleSelected).then(() => {
            alert('Copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className='reader w-screen bg-gray-950 sora-mono-regular xl:relative'>
            {!sidebarToggle && <div className='fixed top-0 w-full'>
                <MobileLayout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>}
            <div className='pt-[4.5rem] xl:pt-0'>
                <div className='fixed h-lvh w-full xl:relative'>
                    <ReaderHeader
                        distraction={distraction}
                        setDistraction={setDistraction}
                        textVoice={textVoice}
                        setTextVoice={setTextVoice}
                        handleShareButtonClick={handleShareButtonClick}
                        setFullArticleLoaded={setFullArticleLoaded}
                    />
                    <div className={`mt-16 h-lvh w-dvw xl:w-full ${loadingAnimation ? 'overflow-hidden' : 'overflow-scroll'} scroll-smooth pb-16 absolute top-0 xl:mt-0 xl:relative`}>
                        <ReaderContent
                            feedData={feedData}
                            articleSelected={articleSelected}
                            fullArticle={fullArticle}
                            articleHeading={articleHeading}
                            loadingAnimation={loadingAnimation}
                            textVoice={textVoice}
                        />
                    </div>
                </div>
                
                
            </div>

        </div>
    );
};

export default Reader;