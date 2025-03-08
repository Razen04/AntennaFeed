
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


const ReaderHeader = ({ toggle, setToggle, article, setArticle, textVoice, setTextVoice, handleShareButtonClick, handleArticleAction }) => {
    return (
        <div className='flex items-center justify-around bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md hidden lg:block' onClick={() => setToggle(prev => ({ ...prev, distractionToggle: !prev.distractionToggle }))}>
                <img src={toggle.distractionToggle ? fullscreenExitLogo : fullscreenLogo} alt="Focussed Mode" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md lg:hidden' onClick={() => setArticle(prev => ({ ...prev, fullArticleLoaded: !prev.fullArticleLoaded }))}>
                <img src={closeLogo} alt="Close Logo" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => setTextVoice(prev => !prev)}>
                <img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => handleArticleAction(article.articleHeading.link, "isRead")}>
                <img src={article?.articleHeading?.isRead ? readFilledLogo : readLogo} alt="Mark as read" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => handleArticleAction(article.articleHeading.link, "isStarred")}>
                <img src={article?.articleHeading?.isStarred ? starFilledLogo : starLogo} alt="Add to Favorite" />
            </button>
            <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}>
                <img src={shareLogo} alt="Share" />
            </button>
        </div>
    );
};

export default ReaderHeader;