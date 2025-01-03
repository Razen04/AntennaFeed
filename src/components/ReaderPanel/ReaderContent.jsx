import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import infiniteLoader from '../../assets/infiniteLoader.svg'
import cheerio from 'cheerio';

const extractContent = (html) => {
    if (html) {
        const $ = cheerio.load(html);
        // Add classes and attributes to various elements
        $('a').addClass('blue-link').attr('target', '_blank');
        $('a:not([href])').addClass('normal-a');
        $('a[href^="#"]').addClass('normal-a');
        $('a[href="https://amzn.to/3Zgmxxi"], a[href="https://bit.ly/3tJvq5a"]').addClass('remove');
        $('img').addClass('styled-image');
        $('figcaption').addClass('styled-caption');
        $('cite').addClass('styled-cite');
        $('em').addClass('styled-word');
        $('ul, ol').addClass('styled-list');
        $('p').addClass('styled-para');
        $('h2').addClass('styled-heading');
        $('h3, h4').addClass('styled-heading-three');
        $('blockquote').addClass('styled-quote');
        $('table').addClass('styled-table');
        $('th').addClass('styled-th');
        $('td').addClass('styled-td');
        $('code').addClass('styled-code');
        $('p:contains("FTC: We use income earning auto affiliate links.")').addClass('remove');
        $('div[data-ga-label="AlsoReadArticle"], a[href*="news.google.com"]').closest('p').remove();
        $('#creInContentWidget').addClass('remove');
        $('div>p>svg').addClass('remove');

        const content = [];
        $('body').children().each((index, element) => {
            content.push($(element).html());
        });

        return content.join('<br/>');
    }
};

const ReaderContent = ({ feedData, articleSelected, fullArticle, articleHeading, loadingAnimation, textVoice }) => {
    const wordElementsRef = useRef([]);
    const [wrappedContent, setWrappedContent] = useState('');

    const wrapWordsWithSpans = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const walk = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const words = child.textContent.split(' ').map((word, index) => {
                        if (word.trim() !== "") {
                            return `<span class="word" id="word-${index}">${word} </span>`;
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
        };

        const highlightWord = (charIndex) => {
            wordElementsRef.current.forEach((el, i) => {
                if (charIndex === i) {
                    el.classList.add('highlight');
                } else {
                    el.classList.remove('highlight');
                }
            });
        };

        if ('speechSynthesis' in window) {
            utterance.lang = "en-UK";
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    };

    const stopSpeaking = () => {
        speechSynthesis.cancel();
    };

    const calculateReadingTime = (content) => {
        const averageReadingSpeedWPM = 1000;
        let wordCount;

        if (content) {
            wordCount = content.length;
        } else {
            return null;
        }

        const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeedWPM);
        return readingTimeMinutes;
    };

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
    };

    useEffect(() => {
        console.log("Full Article", fullArticle);
    }, [])

    useEffect(() => {
        if (fullArticle?.feed?.content) {
            const article = DOMPurify.sanitize(extractContent(fullArticle.feed.content), {
                ADD_ATTR: ['target', 'src', 'alt', 'title', 'href', 'img', 'figure', 'div', 'source']
            });
            console.log("Wrapped content: ", wrapWordsWithSpans(article));
            setWrappedContent(wrapWordsWithSpans(article));
        }
    }, [fullArticle]);

    useEffect(() => {
        textVoice ? speakText(fullArticle.feed.textContent) : stopSpeaking();
    }, [textVoice, fullArticle]);

    return (
        <div className='flex flex-col gap-4 overflow-scroll h-lvh text-left px-4 py-4 border-b-2 pb-20 lg:pb-0'>
            {articleHeading && (
                <div key={articleHeading.link}>
                    <h1 className={` text-3xl text-white font-extrabold leading-[1.1]`}>{articleHeading.title.replace(/\s+/g, ' ').trim()}</h1>
                    <div className={`text-gray-400 mt-2 flex justify-between`}>
                        {returnAuthor(articleHeading.author)} <br />{moment(articleHeading.pubDate).fromNow()}
                        <a href={articleHeading.link} target='_blank'><p className='transition-all hover:underline'>Read Original Article</p></a>
                    </div>
                </div>
            )}
            {feedData.items.map(eachEntry => {
                if (eachEntry.link === articleSelected) {
                    return (
                        <div key={eachEntry.id} className={`${loadingAnimation ? 'w-full h-full flex items-center justify-center' : null}`}>
                            {loadingAnimation && <img src={infiniteLoader} className='w-16 transition-all' />}

                            <div className={`${loadingAnimation ? 'hidden' : ''}`}>
                                {fullArticle?.feed?.content?.length > 0 ? (<p>~{calculateReadingTime(fullArticle.feed.content)} mins to read</p>) : null}
                                {fullArticle.image ? <img src={fullArticle.image} alt="" className='rounded-3xl w-full p-4' /> : null}
                                <div className='mt-4 mb-20 full-text leading-relaxed' dangerouslySetInnerHTML={{ __html: wrappedContent }}></div>
                            </div>

                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ReaderContent;