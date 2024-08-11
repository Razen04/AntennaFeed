import './Reader.css'

import fullscreenLogo from 'D:/rss-feedit/src/assets/fullscreen.svg'
// import fullscreenExitLogo from 'D:/rss-feedit/src/assets/fullscreenexit.svg'
import shareLogo from 'D:/rss-feedit/src/assets/share.svg'
import headphoneLogo from 'D:/rss-feedit/src/assets/headphone.svg'
import headphoneOffLogo from 'D:/rss-feedit/src/assets/headphonesoff.svg'
import moment from 'moment'
import cheerio from 'cheerio'
import DOMPurify from 'dompurify';
import { useState } from 'react'

const extractContent = (html) => {
    const $ = cheerio.load(html);

    // Add a class to all <a> tags within <p> tags
    $('p a').addClass('blue-link');
    $('p a').attr('target', '_blank');

    // Replace "Continue reading" links with buttons
    $('p a:contains("Continue reading")').each((index, element) => {
        const url = $(element).attr('href'); // Get the link URL
        $(element).replaceWith(`<button class="fetch-full-article" data-link="${url}">Read Full Article</button>`);
    });

    // Add classes to various elements
    $('img').addClass('styled-image');
    $('figcaption').addClass('styled-caption');
    $('cite').addClass('styled-cite');
    $('em').addClass('styled-word');
    $('ul, ol').addClass('styled-list');
    $('p').addClass('styled-para');
    $('blockquote').addClass('styled-quote');

    // Collect content from paragraphs and lists
    const content = [];
    $('body').children().each((index, element) => {
        content.push($(element).html());
    });


    return content.join('<br/>'); // Joining with line breaks
};


const Reader = ({ data, fileSelected, folderSelected, articleSelected, fullArticle }) => {

    const [textVoice, setTextVoice] = useState(false)


    const handleShareButtonClick = () => {
        navigator.clipboard.writeText(articleSelected).then(() => {
            alert('Copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }

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
    }

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    };

    const stopSpeaking = () => {
        speechSynthesis.cancel()
    }
    textVoice ? speakText(fullArticle.textContent) : stopSpeaking();


    return (
        <div className='w-screen bg-gray-950'>
            <div className='flex items-center justify-between bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md'><img src={fullscreenLogo} alt="Full Screen" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => setTextVoice(prev => !prev)}><img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}><img src={shareLogo} alt="Share"/></button>
            </div>
            {data.map(eachData => {
                if (folderSelected === eachData.id) {
                    return eachData.contents.map(content => {
                        if (content.feed.id === fileSelected) {
                            return content.feed.entry.map(eachEntry => {
                                if (eachEntry.id === articleSelected) {
                                    const article = DOMPurify.sanitize(extractContent(fullArticle.content))
                                    return (
                                        <div key={eachEntry.id} className="article py-4 px-6 text-justify overflow-scroll h-lvh">
                                            <h1 className='text-3xl text-white font-extrabold leading-[1.4]'>{eachEntry.title}</h1>
                                            <div className='text-gray-400 mt-2 flex justify-between'>
                                                {Array.isArray(eachEntry.author.name) ? returnAuthor(eachEntry.author.name) : eachEntry.author.name} &bull; {moment(eachEntry.updated).fromNow()}
                                                <p>{fullArticle.siteName}</p>
                                            </div>
                                            <div
                                                className='mt-4 mb-20 full-text leading-relaxed'
                                                dangerouslySetInnerHTML={{ __html: article }}
                                            ></div>
                                        </div>
                                    )
                                }
                            })
                        }
                    })
                }
            })}


        </div>
    )
}

export default Reader
