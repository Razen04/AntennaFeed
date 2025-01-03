import React from 'react';
import fullscreenLogo from '../../assets/fullscreen.svg';
import fullscreenExitLogo from '../../assets/fullscreenexit.svg';
import shareLogo from '../../assets/share.svg';
import headphoneLogo from '../../assets/headphone.svg';
import headphoneOffLogo from '../../assets/headphonesoff.svg';
import closeLogo from '../../assets/close.svg';

const ReaderHeader = ({ distraction, setDistraction, textVoice, setTextVoice, handleShareButtonClick, setFullArticleLoaded }) => {
    return (
        <div className='flex items-center justify-between bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md hidden lg:block' onClick={() => setDistraction(prev => !prev)}>
                <img src={distraction ? fullscreenExitLogo : fullscreenLogo} alt="Focussed Mode" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md lg:hidden' onClick={() => setFullArticleLoaded(prev => !prev)}>
                <img src={closeLogo} alt="Close Logo" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => setTextVoice(prev => !prev)}>
                <img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}>
                <img src={shareLogo} alt="Share" />
            </button>
        </div>
    );
};

export default ReaderHeader;