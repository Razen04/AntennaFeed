import { XMLBuilder } from 'fast-xml-parser';
import settingsLogo from '../../assets/settings.svg';
import closeLogo from '../../assets/close.svg';
import githubDarkLogo from '../../assets/github-dark-logo.svg';
import changelogsLogo from '../../assets/changelog.svg';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Settings = ({ profile, settingToggle, setSettingToggle, fetchChangelog }) => {
    const [feeds, setFeeds] = useState(profile.feeds.subscribed.children);

    const handleSettingButtonCLick = () => {
        setSettingToggle(prev => !prev);
    }

    const handleExportButton = () => {
        if (!profile.feeds?.subscribed || typeof profile.feeds.subscribed !== 'object') {
            console.error("Invalid profile data for OPML export");
            return;
        } else {
            const builder = new XMLBuilder({ ignoreAttributes: false, format: true, attributeNamePrefix: "" })
            const opmlData = {
                opml: {
                    version: "2.0", // Top-level attribute
                    head: { title: "My Combined Subscriptions" }, // Inline title
                    body: {
                        outline: feeds.map(folder => {
                            // Check if the folder has children (it's a folder) or is a standalone feed
                            if (folder.children && folder.children.length > 0) {
                                // This is a folder with nested feeds
                                return {
                                    text: folder.text || "Unnamed Folder", // Folder name
                                    folder: "root", // Optional, for folder representation
                                    outline: folder.children.map(feed => ({
                                        text: feed.text || "Untitled Feed", // Feed title
                                        title: feed.title || feed.text || "Untitled Feed", // Feed title (optional)
                                        type: "rss", // Feed type
                                        xmlUrl: feed.xmlurl || "", // Feed URL
                                        folder: folder.text || "Unnamed Folder"
                                    }))
                                };
                            } else {
                                // This is a standalone feed, not part of a folder
                                return {
                                    text: folder.text || "Untitled Feed", // Feed title
                                    title: folder.title || folder.text || "Untitled Feed", // Feed title
                                    folder: null, // Explicitly empty for standalone feeds
                                    type: "rss", // Feed type
                                    xmlUrl: folder.xmlurl || "" // Feed URL
                                };
                            }
                        })
                    }
                }
            };




            const opml = builder.build(opmlData);

            const blob = new Blob([opml], { type: 'application/xml' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'feeds.opml';

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        }
    }

    return (
        <div className={`${settingToggle ? 'w-full transition-all p-2' : ''}`}>
            <div className={`${settingToggle ? 'text-right' : ''}`}>
                <button
                    className={`xl:px-3 ${settingToggle ? 'px-1 py-1 rounded-full' : 'px-10 py-5'} transition-all hover:bg-violet-700 xl:hover:rounded-lg bg-violet-700 xl:rounded-none xl:bg-inherit`}
                    onClick={handleSettingButtonCLick}
                >
                    <img src={!settingToggle ? settingsLogo : closeLogo} alt="" />
                </button>
            </div>



            {settingToggle ? (
                <div className='mt-1'>
                    <div className='px-1 py-2'>
                        <div className='flex gap-4 items-baseline'>
                            <a href="https://github.com/Razen04/AntennaFeed" target='_blank' className='p-0'>
                                <button><img src={githubDarkLogo} alt="Github Logo" className='bg-blend-color w-6 transition-all hover:w-7' /></button></a>
                            <button onClick={() => fetchChangelog()}><img src={changelogsLogo} className='bg-blend-color w-5 transition-all hover:w-6' alt="changelog" /></button>
                        </div>

                        <h1 className='text-lg'>Made by Razen.</h1>

                    </div>
                    <button
                        className='w-full px-4 py-2 bg-violet-500 transition-all hover:bg-violet-600 rounded-lg'
                        onClick={() => {
                            handleExportButton()
                        }}
                    >Export OPML</button>
                </div>
            ) : null}
        </div>
    )
}

export default Settings
