import doneLogo from 'D:/rss-feedit/src/assets/done.svg'
import macLogo from 'D:/rss-feedit/src/assets/mac.jpg'


const Articles = () => {
    return (
        <div className="max-w-96 bg-gray-900 relative">
            <div className="header mt-2 px-2 pb-2 flex justify-between items-center border-b-2">
                <input
                    type="text"
                    placeholder="Search for Articles"
                    className="p-2 rounded-3xl bg-gray-900 text-white border-gray-900 text-md outline-none"
                />
                <button className='p-2 bg-black rounded-3xl transition-all hover:bg-violet-900'>
                    <img src={doneLogo} alt="Mark all as read" />
                </button>

            </div>
            <div className="articles px-4 mt-3 z-0">
                <div className='flex justify-between items-center'>
                    <h1 className='text-white font-bold'>iOS</h1>
                    <h1 className='text-white'>36</h1>
                </div>
                <div className="feeds mt-6 overflow-scroll h-screen">
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                    <div className="feed-1 mb-3 pb-2 p-4 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700">
                        <div className='flex'>
                            <h1 className='text-white mr-6 text-sm'>Mac Power Users #538: | Predate the Home Computer, with James Thomson</h1>
                            <img src={macLogo} alt="Mac logo" className='w-20 h-14 rounded-lg' />
                        </div>
                        <div className="footer mt-3 flex justify-between">
                            <p className='text-gray-300 text-xs'>Stephen Hackett &bull; 3 mins read</p>
                            <p className='text-gray-300 text-xs'>3 hours ago</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="end absolute bottom-0 z-99 w-full">
                <button className='text-center text-white bg-black p-3 w-full transition-all hover:bg-white hover:text-black'>Load More</button>
            </div>
        </div>
    )
}

export default Articles
