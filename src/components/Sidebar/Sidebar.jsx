import addLogo from '../../assets/add.svg'
// import unreadLogo from '../../assets/unread.svg'
import dropDownLogo from '../../assets/dropdown.svg'
import filesLogo from '../../assets/files.svg'
import filesFilledLogo from '../../assets/filesfilled.svg'
import dropUpLogo from '../../assets/dropup.svg'
import deleteLogo from '../../assets/delete.svg'
import markerLogo from '../../assets/marker.svg'
import logo from '../../assets/logo.png'
import moreLogo from '../../assets/more.svg'
import { useState } from 'react'


const Sidebar = ({ folders, setFolders, folderSelected, setFolderSelected, setFileSelected, handleAddFeed, toggleSubscription, setToggleSubscription, setAddToggle, addToggle }) => {

    const sidebarStyle = {
        height: '100rem'
    }


    const handleFolderClick = (id) => {
        setFolderSelected(id)
        setFolders(prevFolders => prevFolders.map(folder => {
            return folder.id === id ? { ...folder, selected: !folder.selected } : folder
        }))
    }

    const handleFileClick = (id) => {
        setFolders(prevFolders => prevFolders.map(folder => {
            if(folder.id === folderSelected) {
                return {
                    ...folder,
                    feeds: folder.feeds.map(eachItem => {
                        if(eachItem.id === id) {
                            handleAddFeed(eachItem.url)
                            return {...eachItem, selected: !eachItem.selected}
                        } else {
                            return {...eachItem, selected: false}
                        }
                    })
                }
            }
            return folder
        }))
        setFileSelected(id)
    }

    return (
        <div className='max-w-80 bg-gray-950 z-0 relative h-full'>
            <img src={logo} alt="AntennaFeed Logo" />
            <div className="your-feed" >
                <div className="p-4 feeds-header flex justify-between items-center">
                    <h1 className='font-bold text-white text-2xl'>Your Feeds</h1>
                    <button className='px-4 py-1 bg-violet-400 transition-all hover:bg-violet-600 rounded-lg' onClick={() => setAddToggle(!addToggle)}><img src={addLogo} alt="Add Feed" /></button>
                </div>
            </div>
            <div className="subscriptions mt-4 mx-4 overflow-scroll h-lvh">
                <div
                    onClick={() => setToggleSubscription(prevToggle => !prevToggle)}
                    className='flex items-center justify-between transition-all hover:border-b-2 cursor-pointer'
                >
                    <h1 className='text-white font-bold'>SUBSCRIPTIONS</h1>
                    {!toggleSubscription ? (<img src={dropDownLogo} alt="Drop Down" />) : <img src={dropUpLogo} alt="Drop Up" />}

                </div>
                {toggleSubscription ? (
                    <ul className='text-white mt-2 overflow-scroll' style={sidebarStyle}>
                        {folders.map((folder) => {
                            return (
                                <div
                                    key={folder.id}
                                    className=''
                                >
                                    <div
                                        className='folder p-1 flex flex-col justify-between transition-all'
                                    >
                                        <div className='flex p-1 items-center justify-between w-full hover:bg-violet-400 cursor-pointer' onClick={() => handleFolderClick(folder.id)}>
                                            <div className='flex items-center'>
                                                <img src={folder.selected === true ? filesLogo : filesFilledLogo} alt="" />
                                                <li className='ml-3'>{folder.name}</li>
                                            </div>
                                            <h1 className='text-white font-semibold'>36</h1>
                                        </div>
                                    
                                    {folder.selected && folder.feeds.map(eachItem => {
                                        return (
                                            <div key={eachItem.id} className='files py-2 mx-4 overflow-scroll' onClick={() => handleFileClick(eachItem.id)}>
                                                <div className='flex relative'>
                                                    <img src={eachItem.selected ? markerLogo : null} alt="" />
                                                    <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                                                        <div className='flex items-center'>
                                                            <img src={eachItem.icon ? eachItem.icon : null} alt="" className='w-5' />
                                                            <h1 className='max-w-full text-sm ml-2'>{eachItem.name}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </div>
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
