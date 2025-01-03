import React from 'react';
import filesLogo from '../../assets/files.svg';
import filesFilledLogo from '../../assets/filesfilled.svg';
import dropDownLogo from '../../assets/dropdown.svg';
import dropUpLogo from '../../assets/dropup.svg';
import FileItem from './FileItem';
import StandaloneFeed from './StandaloneFeed'

const FolderItem = ({ folder, handleFolderClick, handleFileClick, handleFileDelete, getFavicon, folderSelected, setFolderSelected, setFileSelected, setArticleHeading, setFeedData, handleAddFeed, profile, setProfile }) => {
    const renderFolder = (folder) => {
        return (
            <div key={folder.id}>
                <div className='folder p-1 flex flex-col justify-between transition-all'>
                    {folder.children && (
                        <div className='flex p-1 items-center justify-between w-full hover:bg-violet-400 cursor-pointer' onClick={() => handleFolderClick(folder.id)}>
                            <div className='flex items-center'>
                                <img src={folder.selected ? filesLogo : filesFilledLogo} alt="" />
                                <li className='ml-3'>{folder.text}</li>
                            </div>
                        </div>
                    )}
                    {folder.selected && folder.children && folder.children.length > 0 && folder.type === 'sub-parent' && (
                        <div className='children'>
                            {folder.children.map((child) => renderFolder(child))}
                        </div>
                    )}
                    {folder.selected && folder.children && folder.children.map(eachItem => (
                        <FileItem
                            key={eachItem.id}
                            item={eachItem}
                            handleFileClick={handleFileClick}
                            handleFileDelete={handleFileDelete}
                            getFavicon={getFavicon}
                        />
                    ))}
                    {!folder.children && (folder.type === 'main-parent' || folder.folder === "") && (
                        <StandaloneFeed
                            key={folder.id}
                            item={folder}
                            handleFileClick={handleFileClick}
                            handleFileDelete={handleFileDelete}
                            getFavicon={getFavicon}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderFolder(folder)}
        </div>
    );
};

export default FolderItem;