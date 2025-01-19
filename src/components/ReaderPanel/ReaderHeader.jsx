import React from 'react';
import fullscreenLogo from '../../assets/fullscreen.svg';
import fullscreenExitLogo from '../../assets/fullscreenexit.svg';
import shareLogo from '../../assets/share.svg';
import headphoneLogo from '../../assets/headphone.svg';
import headphoneOffLogo from '../../assets/headphonesoff.svg';
import closeLogo from '../../assets/close.svg';
import starLogo from '../../assets/star.svg';
import starFilledLogo from '../../assets/starfilled.svg';
import readLogo from '../../assets/read.svg';
import readFilledLogo from '../../assets/readfilled.svg';


const ReaderHeader = ({ distraction, setDistraction, textVoice, setTextVoice, handleShareButtonClick, setFullArticleLoaded, handleArticleAction, articleHeading }) => {
    return (
        <div className='flex items-center justify-around bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md hidden lg:block' onClick={() => setDistraction(prev => !prev)}>
                <img src={distraction ? fullscreenExitLogo : fullscreenLogo} alt="Focussed Mode" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md lg:hidden' onClick={() => setFullArticleLoaded(prev => !prev)}>
                <img src={closeLogo} alt="Close Logo" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => setTextVoice(prev => !prev)}>
                <img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => handleArticleAction(articleHeading.link, "isRead")}>
                <img src={articleHeading?.isRead ? readFilledLogo : readLogo} alt="Mark as read" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => handleArticleAction(articleHeading.link, "isStarred")}>
                <img src={articleHeading?.isStarred ? starFilledLogo : starLogo} alt="Add to Favorite" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}>
                <img src={shareLogo} alt="Share" />
            </button>
        </div>
    );
};

export default ReaderHeader;