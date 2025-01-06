import { useEffect } from 'react';
import themeLogo from '../../assets/theme.svg';
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
                    root.style.setProperty('--background', '#000000');
                    root.style.setProperty('--text-color', '#ffffff');
                    break;
            }
        };

        applyTheme(profile.preferences.theme);
    }, [profile.preferences.theme]);

    return (
        <div className={`${themeSettingToggle ? 'w-full p-2 text-right' : ''}`}>
            <div>
                <button
                    className={`xl:px-3 ${themeSettingToggle ? 'px-1 py-1  rounded-full' : 'px-10 py-5'} transition-all hover:bg-violet-700 xl:hover:rounded-lg bg-violet-700 xl:rounded-none xl:bg-inherit`}
                    onClick={handleThemeButtonClick}
                >
                    <img src={!themeSettingToggle ? themeLogo : closeLogo} alt="Theme" className='transition-all' />
                </button>
            </div>
            

            {themeSettingToggle ? (
                <div className='theme-setting mt-2  h-fit xl:px-4 flex justify-between items-center'>
                    <label htmlFor="">Theme</label>
                    <select name="" id="" className='ml-2 p-2 text-black rounded-lg w-32 cursor-pointer' value={profile.preferences.theme} onChange={(e) => handleThemeChange(e.target.value)}>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            ) : null}
        </div>
    )
}

export default Theme
