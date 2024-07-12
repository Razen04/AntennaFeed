import addLogo from 'D:/rss-feedit/src/assets/add.svg'
import unreadLogo from 'D:/rss-feedit/src/assets/unread.svg'
import dropDownLogo from 'D:/rss-feedit/src/assets/dropdown.svg'
import filesLogo from 'D:/rss-feedit/src/assets/files.svg'
import filesFilledLogo from 'D:/rss-feedit/src/assets/filesfilled.svg'
import dropUpLogo from 'D:/rss-feedit/src/assets/dropup.svg'
import deleteLogo from 'D:/rss-feedit/src/assets/delete.svg'
import markerLogo from 'D:/rss-feedit/src/assets/marker.svg'


const Sidebar = ({ toggle, setToggle, folders, folderSelected, handleFolderClick, setAddToggle, addToggle, folderToggle, handleFileClick, fileSelected }) => {

    return (
        <div className={addToggle ? `w-80 bg-violet-900 z-0 relative blur-sm pointer-events-none` : `w-80 bg-violet-900 z-0 relative`}>
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
                        {folders.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                >
                                    <div
                                        className='folder p-1 flex justify-between items-center transition-all hover:bg-violet-400 cursor-pointer'
                                        onClick={() => handleFolderClick(item.id)}
                                    >
                                        <div className='flex items-center'>
                                            <img src={folderToggle && folderSelected === item.id ? filesLogo : filesFilledLogo} alt="" />
                                            <li className='ml-3'>{item.name}</li>
                                        </div>
                                        <div className='flex items-center'>
                                            <h1 className='text-white font-semibold'>36</h1>
                                            <img
                                                src={folderToggle && folderSelected === item.id ? deleteLogo : ''}
                                                className='ml-2'
                                            />
                                        </div>
                                    </div>
                                    {folderToggle && folderSelected === item.id && item.contents.map(eachItem => {
                                        return (
                                            <div key={eachItem.id} className='files py-2 mx-4' onClick={() => handleFileClick(eachItem.id)}>
                                                <div className='flex'>
                                                    <img src={fileSelected === eachItem.id ? markerLogo : ''} alt="" />
                                                    <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                                        <h1 className='max-w-full text-sm'>{eachItem.title}</h1>
                                                        <img src={fileSelected === eachItem.id ? deleteLogo : ''} alt="" />
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                    </ul>
                ) : ''}
            </div>
        </div>
    )
}

export default Sidebar
