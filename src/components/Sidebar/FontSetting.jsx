import { useEffect, useState } from 'react';
import fontLogo from '../../assets/font.svg';
import closeLogo from '../../assets/close.svg';

const FontSetting = ({ profile, setProfile, fontSettingToggle, setFontSettingToggle }) => {
    const fontSizeMapping = {
        small: '16px',
        medium: '18px',
        large: '20px'
    };

    const fontWeightMapping = {
        regular: '400',
        light: '300',
        bold: '700'
    };

    const getFontSizeKey = (value) => {
        return Object.keys(fontSizeMapping).find(key => fontSizeMapping[key] === value);
    };

    const getFontWeightKey = (value) => {
        return Object.keys(fontWeightMapping).find(key => fontWeightMapping[key] === value);
    };

    const [fontFamily, setFontFamily] = useState(profile.preferences.customizations.fontFamily);
    const [fontSize, setFontSize] = useState(getFontSizeKey(profile.preferences.customizations.fontSize));
    const [fontWeight, setFontWeight] = useState(getFontWeightKey(profile.preferences.customizations.fontWeight));

    const handleFontButtonClick = () => {
        setFontSettingToggle(prev => !prev);
    };

    const handleFontChange = (fSize, fFamily, fWeight) => {
        setFontFamily(fFamily);
        setFontSize(fSize);
        setFontWeight(fWeight);
    };

    useEffect(() => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            preferences: {
                ...prevProfile.preferences,
                customizations: {
                    fontFamily: fontFamily,
                    fontSize: fontSizeMapping[fontSize],
                    fontWeight: fontWeightMapping[fontWeight]
                }
            }
        }))
    }, [fontFamily, fontSize, fontWeight])



    return (
        <div className={`${fontSettingToggle ? 'w-full bg-gray-900 mx-2' : ''}`}>
            <div className='text-right mb-1'>
                <button
                    className='xl:px-3 px-1 py-1 bg-violet-700 rounded-full hover:bg-violet-700 hover:rounded-lg xl:bg-inherit'
                    onClick={handleFontButtonClick}
                >
                    <img src={!fontSettingToggle ? fontLogo : closeLogo} alt="" />
                </button>
            </div>
            

            {fontSettingToggle ? (
                <div className="font-setting w-full h-fit">
                    <div className="text-size flex justify-between items-center mb-2">
                        <label htmlFor="">Text Size</label>
                        <select name="" id="" className='ml-4 p-2 text-black rounded-lg w-32 cursor-pointer mt-1' value={fontSize} onChange={(e) => handleFontChange(e.target.value, fontFamily, fontWeight)}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className='flex justify-between items-center gap-1'>
                        <div className="font">
                            <label htmlFor="Font">Font</label>
                            <br />
                            <select name="font-familty" id="" className='p-2 text-black rounded-lg w-32 cursor-pointer mt-1' value={fontFamily} onChange={(e) => { handleFontChange(fontSize, e.target.value, fontWeight) }}>
                                <option value="default">Default</option>
                                <option value="serif">Serif</option>
                                <option value="sans-serif">Sans-serif</option>
                                <option value="monospace">Monospace</option>
                            </select>
                        </div>
                        <div className="font-weight">
                            <label htmlFor="font-weight">Font Weight</label>
                            <br />
                            <select name="font-weight" id="" className='p-2 text-black rounded-lg w-32 cursor-pointer mt-1' value={fontWeight} onChange={(e) => handleFontChange(fontSize, fontFamily, e.target.value)}>
                                <option value="regular">Regular</option>
                                <option value="light">Light</option>
                                <option value="bold">Bold</option>
                            </select>

                        </div>
                    </div>


                </div>
            ) : null}

        </div>
    )
}

export default FontSetting
