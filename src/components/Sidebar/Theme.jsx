import { useEffect } from 'react';
import themeLogo from '../../assets/theme.svg';
import themeFilledLogo from '../../assets/themefilled.svg';
import closeLogo from '../../assets/close.svg';

const Theme = ({ profile, setProfile, themeSettingToggle, setThemeSettingToggle }) => {

    const handleThemeButtonClick = () => {
        setThemeSettingToggle(prev => !prev);
    };

    const handleThemeChange = (theme) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            preferences: {
                ...prevProfile.preferences,
                theme: theme
            }
        }))
    }

    useEffect(() => {
        const applyTheme = (theme) => {
            const root = document.documentElement;
            switch (theme) {
                case 'dark':
                    root.style.setProperty('--background', '#000000');
                    root.style.setProperty('--text-color', '#ffffff');
                    break;
                default:
                    root.style.setProperty('--background', 'linear-gradient(135deg, #292465 0%, #110f29 25%, #0b091b 50%, #05030d 75%, #04010a 100%)');
                    root.style.setProperty('--text-color', 'initial');
                    break;
            }
        };

        applyTheme(profile.preferences.theme);
    }, [profile.preferences.theme]);

    return (
        <div className={`${themeSettingToggle ? 'w-full' : ''}`}>
            <button
                className='xl:px-3 py-1 hover:bg-violet-700 hover:rounded-lg'
                onClick={handleThemeButtonClick}
            >
                <img src={!themeSettingToggle ? themeLogo : closeLogo} alt="Theme" className='transition-all' />
            </button>

            {themeSettingToggle ? (
                <div className='theme-setting mt-2  h-fit xl:px-4 flex justify-between items-center'>
                    <label htmlFor="">Theme</label>
                    <select name="" id="" className='ml-2 p-2 text-black rounded-lg w-32 cursor-pointer' value={profile.preferences.theme} onChange={(e) => handleThemeChange(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            ) : null}
        </div>
    )
}

export default Theme
