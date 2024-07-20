import './Reader.css'

import fullscreenLogo from 'D:/rss-feedit/src/assets/fullscreen.svg'
// import fullscreenExitLogo from 'D:/rss-feedit/src/assets/fullscreenexit.svg'
import shareLogo from 'D:/rss-feedit/src/assets/share.svg'
import fulltextLogo from 'D:/rss-feedit/src/assets/fulltext.svg'
import moment from 'moment'
import cheerio from 'cheerio'
import { useState } from 'react'

const extractFigureContent = (html) => {
    const $ = cheerio.load(html);
    const figure = $('figure').html(); // Get inner HTML of the first figure
    return figure;
};

const extractContent = (html) => {
    const $ = cheerio.load(html);

    // Add a class to all <a> tags within <p> tags
    $('p a').addClass('blue-link');
    $('p a').attr('target', '_blank')

    $('p a:contains("Continue reading")').each((index, element) => {
        const url = $(element).attr('href'); // Get the link URL
        $(element).replaceWith(`<button class="fetch-full-article" data-link="${url}">Read Full Article</button>`);
    });

    const content = [];
    $('p').each((index, element) => {
        content.push($(element).html());
    });

    return content.join('<br/>'); // Joining with line breaks
};

const Reader = ({ data, fileSelected, folderSelected, articleSelected }) => {
    const [fullArticle, setFullArticle] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchFullArticle = async (url) => {
        setLoading(true)
        console.log("Fetching article from URL:", url);
        try {
            const response = await fetch('http://localhost:3000/fetch-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            })

            if (!response.ok) {
                const errorText = await response.text(); // Get error response as text
                console.error('Error response:', errorText);
                throw new Error('Network response was not ok');
            }

            const article = await response.json();
            setFullArticle(article)
            console.log(article.title)
        } catch (error) {
            console.error(error)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleButtonClick = (event) => {
        if (event.target.matches('.fetch-full-article')) {
            const url = event.target.getAttribute('data-link');
            fetchFullArticle(url);
        }
    };


    return (
        <div className='w-screen bg-black'>
            <div className='flex items-center justify-between bg-black p-2 border-b-2 border-gray-800 sticky'>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md'><img src={fullscreenLogo} alt="Full Screen" /></button>
                <button className='p-2 transition-all hover:bg-gray-800 rounded-md'><img src={shareLogo} alt="Share" /></button>

            </div>
            {data.map(eachData => {
                if (folderSelected === eachData.id) {
                    return eachData.contents.map(content => {
                        if (content.feed.id === fileSelected) {
                            return content.feed.entry.map(eachEntry => {
                                if (eachEntry.id === articleSelected) {
                                    const paragraph = extractContent(eachEntry.content.__text);
                                    return (
                                        <div key={eachEntry.id} className="article py-4 px-6 text-justify overflow-scroll h-lvh">
                                            <h1 className='text-3xl text-white font-extrabold'>{eachEntry.title}</h1>
                                            <h1 className='text-gray-400 mt-2'>
                                                {Array.isArray(eachEntry.author.name) ? eachEntry.author.name[0] : eachEntry.author.name} &bull; {moment(eachEntry.updated).fromNow()}
                                            </h1>
                                            <div
                                                className='mt-10 text-gray-500 font-bold'
                                                dangerouslySetInnerHTML={{ __html: extractFigureContent(eachEntry.content.__text) }}
                                            ></div>
                                            <div onClick={handleButtonClick}
                                                className='mt-10 mb-20 text-white'
                                                dangerouslySetInnerHTML={{ __html: paragraph }}
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
