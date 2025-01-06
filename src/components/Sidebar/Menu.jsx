
import { useState } from 'react';
import FontSetting from './FontSetting';
import Theme from './Theme';
import Settings from './Settings';

const Menu = ({ profile, setProfile, fetchChangelog }) => {

    const [fontSettingToggle, setFontSettingToggle] = useState(false);
    const [themeSettingToggle, setThemeSettingToggle] = useState(false);
    const [settingToggle, setSettingToggle] = useState(false);

    return (
        <div className="menu flex justify-around absolute bottom-0 xl:flex w-full bg-gray-900">
            {
                settingToggle && !fontSettingToggle && !themeSettingToggle && (
                    <Settings profile={profile} setProfile={setProfile} settingToggle={settingToggle} setSettingToggle={setSettingToggle} fetchChangelog={fetchChangelog} />
                )
            }
            {
                fontSettingToggle && !settingToggle && !themeSettingToggle && (
                    <FontSetting profile={profile} setProfile={setProfile} fontSettingToggle={fontSettingToggle} setFontSettingToggle={setFontSettingToggle} />
                )
            }
            {
                themeSettingToggle && !settingToggle && !fontSettingToggle && (
                    <Theme profile={profile} setProfile={setProfile} themeSettingToggle={themeSettingToggle} setThemeSettingToggle={setThemeSettingToggle} />
                )
            }
            {
                !settingToggle && !fontSettingToggle && !themeSettingToggle && (
                    <div className='menu flex justify-around absolute bottom-0 xl:flex w-full bg-gray-900'>
                        <Settings profile={profile} settingToggle={settingToggle} setSettingToggle={setSettingToggle} />
                        <FontSetting profile={profile} setProfile={setProfile} fontSettingToggle={fontSettingToggle} setFontSettingToggle={setFontSettingToggle} />
                        <Theme profile={profile} setProfile={setProfile} themeSettingToggle={themeSettingToggle} setThemeSettingToggle={setThemeSettingToggle} />
                    </div>
                )
            }
        </div>
    )
}

export default Menu
