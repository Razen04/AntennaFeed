
import { useEffect, useState } from 'react';
import FontSetting from './FontSetting';
import Theme from './Theme';
import Settings from './Settings';

const Menu = ({ profile, setProfile }) => {

    const [fontSettingToggle, setFontSettingToggle] = useState(false);
    const [themeSettingToggle, setThemeSettingToggle] = useState(false);
    const [settingToggle, setSettingToggle] = useState(false);

    useEffect(() => {
        console.log("FontSettingToggle: ", fontSettingToggle)
        console.log("themeSettingToggle: ", themeSettingToggle)
        console.log("settingToggle: ", settingToggle)
    }, [fontSettingToggle, themeSettingToggle, settingToggle])

    return (
        <div className="menu flex justify-around items-center w-full">
            {
                settingToggle && !fontSettingToggle && !themeSettingToggle && (
                    <Settings profile={profile} setProfile={setProfile} settingToggle={settingToggle} setSettingToggle={setSettingToggle} />
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
                    <>
                        <Settings profile={profile} settingToggle={settingToggle} setSettingToggle={setSettingToggle} />
                        <FontSetting profile={profile} setProfile={setProfile} fontSettingToggle={fontSettingToggle} setFontSettingToggle={setFontSettingToggle} />
                        <Theme profile={profile} setProfile={setProfile} themeSettingToggle={themeSettingToggle} setThemeSettingToggle={setThemeSettingToggle} />
                    </>
                )
            }
        </div>
    )
}

export default Menu
