import mainLogo from '../../../assets/logo.svg'
import githubLogo from '../../../assets/github-dark-logo.svg'
import themeLogo from '../../../assets/themefilled.svg'
import fontLogo from '../../../assets/font.svg'
import folderLogo from '../../../assets/filesfilled.svg'
import exportlogo from '../../../assets/export.svg'
import statsLogo from '../../../assets/stats.svg'
import newLogo from '../../../assets/new.svg'
import Theme from '../../Theme/Theme'
import { useState } from 'react'
import New from '../../New/New'
import Font from '../../Font/Font'
import Folders from '../../Folders/Folders'

const MobileSetting = () => {
    const [showSetting, setShowSetting] = useState(null);
    const settings = [
        {
            name: "Theme",
            icon: themeLogo
        },
        {
            name: "Font",
            icon: fontLogo
        },
        {
            name: "Folders",
            icon: folderLogo
        },
        {
            name: "Statistics",
            icon: statsLogo
        },
        {
            name: "Import/Export",
            icon: exportlogo
        },
        {
            name: "What is new?",
            icon: newLogo
        },
    ]

    const handleSettingButtonClick = (e) => {
        console.log(e.currentTarget.value)
        setShowSetting(e.currentTarget.value)
    }

    const handleOverlayClick = (e) => {
        // Only close if clicking the overlay background, not its children
        if (e.target === e.currentTarget) {
            setShowSetting(null);
        }
    }

    return (
        <div className="w-full bg-black h-lvh">
            <div className="info px-5 py-4 w-full flex flex-col items-center border-b-2 border-gray-600">
                <img src={mainLogo} alt="Yureader logo" />
                <div className='flex mt-2'>
                    <h1 className='text-2xl text-left'>YuReader</h1>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-sm bg-blue-500 text-white rounded-xl text-center w-15 px-2 mb-4'>v0.5</p>
                    </div>
                </div>
                <div className="contacts mt-2">
                    <img src={githubLogo} alt="" className='w-6' />
                </div>
            </div>
            <div className="settings py-4">
                {settings.map(eachSetting => {
                    return (
                        <button key={eachSetting.name} value={eachSetting.name} className='flex w-full gap-8 px-10 py-4 hover:bg-red-500' onClick={(e) => handleSettingButtonClick(e)}>
                            <img src={eachSetting.icon} alt={eachSetting.name} />
                            <h1>{eachSetting.name}</h1>
                        </button>
                    )
                })}
            </div>
            <div className='z-10 fixed w-full'>
                {showSetting === 'Theme' && (
                    <div
                        className='z-10 fixed bottom-16 inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300'
                        onClick={handleOverlayClick}
                    >
                        <div className='w-full transform transition-transform duration-300 translate-y-0 animate-slide-up'>
                            <Theme />
                        </div>
                    </div>
                )}
                {showSetting === 'Font' && (
                    <div
                        className='z-10 fixed bottom-16 inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300'
                        onClick={handleOverlayClick}
                    >
                        <div className='w-full transform transition-transform duration-300 translate-y-0 animate-slide-up'>
                            <Font />
                        </div>
                    </div>
                )}
                {showSetting === 'Folders' && (
                    <div
                        className='z-10 fixed bottom-16 inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300'
                        onClick={handleOverlayClick}
                    >
                        <div className='w-full transform transition-transform duration-300 translate-y-0 animate-slide-up'>
                            <Folders />
                        </div>
                    </div>
                )}
                {showSetting === 'What is new?' && (
                    <div
                        className='z-10 fixed bottom-16 inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300'
                        onClick={handleOverlayClick}
                    >
                        <div className='w-full transform transition-transform duration-300 translate-y-0 animate-slide-up'>
                            <New />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileSetting