import React from 'react';
import markerLogo from '../../assets/marker.svg';
import deleteLogo from '../../assets/delete.svg';
import rssLogo from '../../assets/rss.png';

const FileItem = ({ item, handleFileClick, handleFileDelete }) => {
    return (
        <div className='files py-2 overflow-scroll'>
            <div className='flex relative'>
                <img src={item.selected ? markerLogo : null} alt="" />
                <div className='flex justify-between items-center transition-all hover:bg-violet-400 p-1 cursor-pointer w-full'>
                    <div className='flex items-center' onClick={() => handleFileClick(item.xmlurl)}>
                        <img src={item.icon || rssLogo} alt="" className='w-5 file-icon' />
                        <h1 className='max-w-full text-sm ml-2'>{item.text}</h1>
                    </div>
                    {item.selected ? <img
                        src={deleteLogo}
                        alt="Delete Feed"
                        className='hover:bg-violet-900 p-1'
                        onClick={() => handleFileDelete(item.id)}
                    /> : null}
                </div>
            </div>
        </div>
    );
};

export default FileItem;