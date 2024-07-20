import addLogo from 'D:/rss-feedit/src/assets/add.svg'
import unreadLogo from 'D:/rss-feedit/src/assets/unread.svg'
import dropDownLogo from 'D:/rss-feedit/src/assets/dropdown.svg'
import filesLogo from 'D:/rss-feedit/src/assets/files.svg'
import filesFilledLogo from 'D:/rss-feedit/src/assets/filesfilled.svg'
import dropUpLogo from 'D:/rss-feedit/src/assets/dropup.svg'
import deleteLogo from 'D:/rss-feedit/src/assets/delete.svg'
import markerLogo from 'D:/rss-feedit/src/assets/marker.svg'
import logo from 'D:/rss-feedit/src/assets/logo.png'
import moreLogo from 'D:/rss-feedit/src/assets/more.svg'


const Sidebar = ({ toggle, setToggle, data, folderSelected, handleFolderClick, setAddToggle, addToggle, folderToggle, handleFileClick, fileSelected, moreFileToggle, setMoreFileToggle, moreFolderToggle, setMoreFolderToggle }) => {

    return (
        <div className='max-w-80 bg-gray-950 z-0 relative h-screen'>
            <img src={logo} alt="AntennaFeed Logo" />
            <div className="your-feed">
                <div className="p-4 feeds-header flex justify-between items-center">
                    <h1 className='font-bold text-white text-2xl'>Your Feeds</h1>
                    <button className='px-4 py-1 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddToggle(!addToggle)}><img src={addLogo} alt="Add Feed" /></button>
                </div>
                <div className='flex justify-between items-center mt-2 cursor-pointer transition-all hover:bg-violet-500 px-5 py-4'>
                    <div className='flex items-center'>
                        <img src={unreadLogo} alt="Unread Feeds" />
                        <h1 className='text-white text-xl font-semibold ml-3'>Unread</h1>
                    </div>
                    <h1 className='text-white text-xl font-semibold'>36</h1>
                </div>

            </div>
            <div className="subscriptions mt-4 mx-4 overflow-scroll h-lvh">
                <div
                    onClick={() => setToggle(prevToggle => !prevToggle)}
                    className='flex items-center justify-between transition-all hover:border-b-2 cursor-pointer'
                >
                    <h1 className='text-white font-bold'>SUBSCRIPTIONS</h1>
                    {!toggle ? (<img src={dropDownLogo} alt="Drop Down" />) : <img src={dropUpLogo} alt="Drop Up" />}

                </div>
                {toggle ? (
                    <ul className='text-white mt-2'>
                        {data.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                >
                                    <div
                                        className='folder p-1 flex justify-between items-center transition-all hover:bg-violet-400 cursor-pointer'
                                    >
                                        <div className='flex items-center justify-between w-full' onClick={() => handleFolderClick(item.id)}>
                                            <div className='flex items-center'>
                                                <img src={folderToggle && folderSelected === item.id ? filesLogo : filesFilledLogo} alt="" />
                                                <li className='ml-3'>{item.name}</li>
                                            </div>
                                            <h1 className='text-white font-semibold'>36</h1>
                                        </div>
                                        <div className='flex items-center relative'>
                                            <button className='p-1 ml-1 transition-all hover:bg-violet-900' onClick={() => setMoreFolderToggle(true)}>
                                                <img src={folderToggle && folderSelected === item.id ? moreLogo : null} />
                                            </button>
                                        </div>
                                        {moreFolderToggle && folderSelected === item.id ? (
                                            <div className='flex text-xs absolute right-5 bg-violet-400' onMouseLeave={() => setMoreFolderToggle(false)}>
                                                <button className='p-1 transition-all hover:bg-violet-500 rounded-sm'><img src={addLogo} alt="" /></button>
                                                <button className='p-1 transition-all hover:bg-violet-500 rounded-sm'><img src={deleteLogo} alt="" /></button>
                                            </div>
                                        ) : null}
                                    </div>
                                    {folderToggle && folderSelected === item.id && item.contents.map(eachItem => {
                                        return (
                                            <div key={eachItem.feed.id} className='files py-2 mx-4' onClick={() => handleFileClick(eachItem.feed.id)}>
                                                <div className='flex relative'>
                                                    <img src={fileSelected === eachItem.feed.id ? markerLogo : null} alt="" />
                                                    <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                                        <div className='flex items-center'>
                                                            <img src={eachItem.feed.icon} alt="" className='w-5' />
                                                            <h1 className='max-w-full text-sm ml-2'>{eachItem.feed.title}</h1>
                                                        </div>
                                                        <button className='transition-all hover:bg-violet-700' onClick={() => setMoreFileToggle(true)}><img src={fileSelected === eachItem.feed.id ? moreLogo : null} /></button>
                                                    </div>
                                                    {moreFileToggle && fileSelected === eachItem.feed.id ? (
                                                        <button className=' absolute top-0.5 right-0 p-1 transition-all hover:bg-violet-500 rounded-sm' onMouseLeave={() => setMoreFileToggle(false)}><img src={deleteLogo} /></button>
                                                    ) : null}

                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default Sidebar
