import { XMLBuilder } from 'fast-xml-parser';
import settingsLogo from '../../assets/settings.svg';
import closeLogo from '../../assets/close.svg';
import { useState } from 'react';

const Settings = ({ profile, settingToggle, setSettingToggle }) => {
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

        console.log("Export btn Clicked")
    }

    return (
        <div className={`${settingToggle ? 'w-full transition-all' : ''}`}>
            <button
                className='xl:px-3 py-1 transition-all hover:bg-violet-700 hover:rounded-lg'
                onClick={handleSettingButtonCLick}
            >
                <img src={!settingToggle ? settingsLogo : closeLogo} alt="" />
            </button>

            {settingToggle ? (
                <div className='mt-2'>
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
