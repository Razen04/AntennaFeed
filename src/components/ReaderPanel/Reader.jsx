import './Reader.css'

import fullscreenLogo from '../../assets/fullscreen.svg'
import fullscreenExitLogo from '../../assets/fullscreenexit.svg'
import shareLogo from '../../assets/share.svg'
import headphoneLogo from '../../assets/headphone.svg'
import headphoneOffLogo from '../../assets/headphonesoff.svg'
import catLoader from '../../assets/catLoader.gif'
import moment from 'moment'
import cheerio from 'cheerio'
import DOMPurify from 'dompurify';
import { useState, useRef, useEffect } from 'react'
// import TextToSpeechWithHighlight from './TextToSpeechWithHighlight'

const extractContent = (html) => {
    if (html) {
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


const Reader = ({ feedData, articleSelected, fullArticle, articleHeading, loadingAnimation, distraction, setDistraction }) => {

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
                        if (word.trim() !== "") {
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
        utterance.rate = 1;
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
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
            utterance.lang = "en-IN"
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    };

    const stopSpeaking = () => {
        speechSynthesis.cancel()
    };

    const handleDistractionFreeButton = () => {
        setDistraction(prev => !prev)
    }

    textVoice ? speakText(fullArticle.textContent) : stopSpeaking();

    return (
        <div className='reader w-screen bg-gray-950 sora-mono-regular'>
            <div className='flex items-center justify-between bg-gray-950 p-2 border-b-2 border-gray-800 sticky'>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleDistractionFreeButton}><img src={distraction ? fullscreenExitLogo : fullscreenLogo} alt="Focussed Mode" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={() => {
                    setTextVoice(prev => !prev)
                }}><img src={textVoice ? headphoneOffLogo : headphoneLogo} alt="Read Aloud" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md' onClick={handleShareButtonClick}><img src={shareLogo} alt="Share" /></button>
            </div>
            <div className='flex flex-col gap-4 overflow-scroll h-lvh text-left px-4 py-4'>
                {articleHeading ? (
                    <div key={articleHeading.link}>
                        <h1 className={` text-3xl text-white font-extrabold leading-[1.1]`}>{articleHeading.title.replace(/\s+/g, ' ').trim()}</h1>
                        <div className={`text-gray-400 mt-2 flex justify-between`}>
                            {Array.isArray(articleHeading.author) ? returnAuthor(articleHeading.author) : articleHeading.author} &bull; {moment(articleHeading.pubDate).fromNow()}
                            <a href={articleHeading.link} target='_blank'><p className='transition-all hover:underline'>Read Original Article</p></a>
                        </div>
                    </div>
                ) : null}
                {feedData.items.map(eachEntry => {
                    if (eachEntry.link === articleSelected) {

                        const article = DOMPurify.sanitize(extractContent(fullArticle.content))
                        const wrappedContent = wrapWordsWithSpans(article)

                        return (

                            <div key={eachEntry.id} className={`${loadingAnimation ? 'w-full h-full flex items-center justify-center' : null}`}>
                                {!loadingAnimation ? (
                                    <div
                                        className='mt-4 mb-20 full-text leading-relaxed'
                                        dangerouslySetInnerHTML={{ __html: wrappedContent }}
                                    ></div>
                                ) : (
                                    <img src={catLoader} className='w-16 transition-all' />
                                )}

                            </div>
                        )
                    }
                })}
            </div>



        </div>
    )
}

export default Reader
