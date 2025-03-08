import { motion } from "framer-motion";
import RssFeedsLogo from '../../../assets/rss_feeds.svg?react'
import DiscoverLogo from '../../../assets/discover.svg?react'
import HistoryLogo from '../../../assets/history.svg?react'
import AddLogo from '../../../assets/add.svg?react'
import SettingsLogo from '../../../assets/settingfilled.svg?react'

const Navbar = ({ showNav, setShowNav }) => {
    const navIcons = [
        {
            icon: RssFeedsLogo,
            name: "Feeds"
        },
        {
            icon: DiscoverLogo,
            name: "Discover"
        },
        {
            icon: HistoryLogo,
            name: "History"
        },
        {
            icon: AddLogo,
            name: "Add feeds"
        },
        {
            icon: SettingsLogo,
            name: "Settings"
        },
    ]

    const handleNavClick = (e) => {
        setShowNav(e.currentTarget.name)
    }
    return (
        <div className='w-full fixed bottom-0 px-5 py-3 bg-secondary'>
            <div className='nav-icons flex w-full justify-between'>
                {navIcons.map(eachIcon => {
                    const Icon = eachIcon.icon;
                    return (
                        <button className={`icon-1 flex flex-col items-center hover:bg-black ${showNav === eachIcon.name ? 'text-blue-400' : 'text-white'}`} key={eachIcon.name} name={eachIcon.name} onClick={(e) => handleNavClick(e)}>
                            {eachIcon.name === "Settings" ? (
                                <motion.div
                                    animate={{ rotate: showNav === "Settings" ? 180 : 0 }}
                                    initial={{ rotate: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    key={showNav === "Settings"}
                                >
                                    <Icon className={`w-6 ${showNav === eachIcon.name ? 'text-blue-400' : 'text-white'}`} />
                                </motion.div>
                            ) : (
                                <Icon className={`w-6 ${showNav === eachIcon.name ? 'text-blue-400' : 'text-white'}`} />
                            )}
                            <label className='text-xs font-semibold'>{eachIcon.name}</label>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Navbar