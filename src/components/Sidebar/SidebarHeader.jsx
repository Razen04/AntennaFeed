import logo from '../../assets/logo.png';

const SidebarHeader = ({ setAddToggle, addToggle, sidebarToggle }) => {
    return (
        <div className="sidebar-header">
            {!sidebarToggle && <img src={logo} alt="AntennaFeed Logo" />}
            <div className="your-feed">
                <div className="p-4 feeds-header flex justify-around items-center">
                    <button className='w-full px-4 py-2 bg-violet-600 transition-all hover:bg-violet-900 rounded-lg' onClick={() => setAddToggle(!addToggle)}>Add Feed</button>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;