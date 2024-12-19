import './Reader.css'

import fullscreenLogo from '../../assets/fullscreen.svg'
// import fullscreenExitLogo from 'D:/rss-feedit/src/assets/fullscreenexit.svg'
import shareLogo from '../../assets/share.svg'
import headphoneLogo from '../../assets/headphone.svg'
import headphoneOffLogo from '../../assets/headphonesoff.svg'
import moment from 'moment'
import cheerio from 'cheerio'
import DOMPurify from 'dompurify';
import { useState, useRef } from 'react'
// import TextToSpeechWithHighlight from './TextToSpeechWithHighlight'

const extractContent = (html) => {
    if(html) {
        const $ = cheerio.load(html);

        // Add a class to all <a> tags within <p> tags
        $('a').addClass('blue-link');
        $('a').attr('target', '_blank');
        $('a[href="https://amzn.to/3Zgmxxi"]').addClass('remove');

        // Add classes to various elements
        $('img').addClass('styled-image');
        $('figcaption').addClass('styled-caption');
        $('cite').addClass('styled-cite');
        $('em').addClass('styled-word');
        $('ul, ol').addClass('styled-list');
        $('p').addClass('styled-para');
        $('h2').addClass('styled-heading');
        $('h3').addClass('styled-heading-three');
        $('h4').addClass('styled-heading-three');
        $('blockquote').addClass('styled-quote');
        $('table').addClass('styled-table');
        $('th').addClass('styled-th');
        $('td').addClass('styled-td');
        $('p:contains("FTC: We use income earning auto affiliate links.")').addClass('remove');
        $('div > p:contains("FTC: We use income earning auto affiliate links.") > a').addClass('remove');

        // Remove the specific div
        $('div[data-ga-label="AlsoReadArticle"]').remove();
        $('a[href*="news.google.com"]').closest('p').remove();


        // Collect content from paragraphs and lists
        const content = [];
        $('body').children().each((index, element) => {
            content.push($(element).html());
        });

        return content.join('<br/>'); // Joining with line breaks

    }
    

    
};


const Reader = ({ feedData, articleSelected, fullArticle }) => {

    const [textVoice, setTextVoice] = useState(false);

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

    const wrapWordsWithSpans = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const walk = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const words = child.textContent.split(' ').map((word, index) => {
                        if(word.trim() !== "") {
                            return `<span class="word" id="word-${index}">${word} </span>`
                        }  
                    }).join('');
                    const spanWrapper = document.createElement('span');
                    spanWrapper.innerHTML = words;
                    node.replaceChild(spanWrapper, child);
                } else {
                    walk(child);
                }
            });
        };

        walk(doc.body);
        return doc.body.innerHTML;
    };

    const wordElementsRef = useRef([]);
    const speakText = (content) => {
        const utterance = new SpeechSynthesisUtterance(content);
        wordElementsRef.current = document.querySelectorAll('.word');
        let wordIndex = 0;
        utterance.rate = 0.8;
        utterance.onboundary = (event) => {
            if(event.name === 'word') {
                highlightWord(wordIndex);
                wordIndex++;
            }
        }

        const highlightWord = (charIndex) => {
            
            wordElementsRef.current.forEach((el, i) => {
                if (charIndex === i) {
                    el.classList.add('highlight');
                } else {
                    el.classList.remove('highlight');
                }
            });
        }
        

        if ('speechSynthesis' in window) {
            utterance.lang = "en-US"
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    };

    const stopSpeaking = () => {
        speechSynthesis.cancel()
    };
    
    textVoice ? speakText(fullArticle.textContent) : stopSpeaking();


    return (
        <div className='reader w-screen bg-gray-950 sora-mono-regular'>
            <div className='flex items-center justify-between bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md'><img src={fullscreenLogo} alt="Full Screen" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => {
                    setTextVoice(prev => !prev)
                }}><img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}><img src={shareLogo} alt="Share" /></button>
            </div>
            {feedData.items.map(eachEntry => {
                if (eachEntry.link === articleSelected) {
                    const article = DOMPurify.sanitize(extractContent(fullArticle.content))
                    console.log(article)
                    const wrappedContent = wrapWordsWithSpans(article)
                    console.log(wrappedContent)
                    return (
                        <div key={eachEntry.id} className="article py-4 px-6 text-justify overflow-scroll h-lvh">
                            <h1 className='text-3xl text-white font-extrabold leading-[1.1]'>{eachEntry.title.replace(/\s+/g, ' ').trim()}</h1>
                            <div className='text-gray-400 mt-2 flex justify-between'>
                                {Array.isArray(eachEntry.author || eachEntry.creator) ? returnAuthor(eachEntry.author || eachEntry.creator) : eachEntry.author || eachEntry.creator} &bull; {moment(eachEntry.pubDate).fromNow()}
                                <p>{fullArticle.siteName}</p>
                            </div>
                            <div className="excerpt text-white text-xl mt-4 border-2 py-2 border-gray-400 rounded-lg">
                                <h1 className='font-bold underline p-2'>Excerpt: </h1>
                                <p className='p-2'>{fullArticle.excerpt}</p>
                            </div>
                            <div
                                className='mt-4 mb-20 full-text leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: wrappedContent }}
                            ></div>
                        </div>
                    )
                }
            })}


        </div>
    )
}

export default Reader
