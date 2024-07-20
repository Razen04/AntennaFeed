import moment from 'moment'
import doneLogo from 'D:/rss-feedit/src/assets/done.svg'
import { Parser } from 'htmlparser2';

const extractImageSrc = (html) => {
    let src = null;

    const parser = new Parser({
        onopentag(name, attributes) {
            if (name === "img" && attributes.src) {
                src = attributes.src;
            }
        }
    }, { decodeEntities: true });

    parser.write(html);
    parser.end();

    return src;
};

const articleStyle = {
    height: '49rem'
}



const Articles = ({ data, fileSelected, folderSelected, setArticleSelected }) => {

    return (
        <div className="min-w-96 h-screen bg-gray-900 relative">
            <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2 border-gray-800">
                <input
                    type="text"
                    placeholder="Search for Articles"
                    className="p-2 rounded-3xl bg-gray-800 text-white border-gray-900 text-md outline-none"
                />
                <button className='p-2 bg-black rounded-3xl transition-all hover:bg-violet-900'>
                    <img src={doneLogo} alt="Mark all as read" />
                </button>

            </div>
            {data.map(items => {
                if (folderSelected === items.id) {
                    return (
                        <div key={items.id} className="articles px-4 mt-3 z-0">
                            {items.contents.map(item => {
                                if (fileSelected === item.feed.id) {
                                    return (
                                        <div key={item.feed.id}>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='text-white font-bold'>{item.feed.title}</h1>
                                                <h1 className='text-white'>{item.feed.entry.length}</h1>
                                            </div>
                                            <div className="feeds mt-6 overflow-scroll" style={articleStyle}>
                                                {item.feed.entry.map(eachItem => (
                                                    <div key={eachItem.id} className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700" onClick={() => {
                                                        setArticleSelected(eachItem.id)
                                                    }}>
                                                        <div className='flex'>
                                                            <h1 className='text-white mr-6 text-sm'>{eachItem.title}</h1>
                                                            <img src={extractImageSrc(eachItem.content.__text)} alt="" className='w-20 h-14 rounded-lg' />
                                                        </div>
                                                        <div className="footer mt-3 flex justify-between">
                                                            <p className='text-gray-300 text-xs'>{Array.isArray(eachItem.author.name) ? eachItem.author.name[0] : eachItem.author.name} &bull; 3 mins read</p>
                                                            <p className='text-gray-300 text-xs'>{moment(eachItem.updated).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Return null if fileSelected doesn't match
                            })}
                        </div>
                    );
                }
                return null; // Return null if folderSelected doesn't match
            })}


            <div className="end absolute bottom-0 z-99 w-full">
                <button className='text-center text-white bg-black p-3 w-full transition-all hover:bg-white hover:text-black'>Load More</button>
            </div>
        </div>
    )
}

export default Articles
