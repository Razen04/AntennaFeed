import logo from '../../assets/logo.png';

const SidebarHeader = ({ toggle, setToggle }) => {
    return (
        <div className="sidebar-header">
            {!toggle.sidebarToggle && (
                <div className='flex items-baseline p-2 justify-around'>
                    <img src={logo} alt="YagiReader Logo" className='w-12 logo' />
                    <div className='flex'>
                        <h1 className='text-3xl font-bold'>YuReader</h1>
                        <p className='text-sm bg-violet-900 text-white rounded-xl text-center w-15 px-2 mb-4'>beta-v5</p>
                    </div>

                </div>
            )}
            <div className="your-feed">
                <div className="p-4 feeds-header flex justify-around items-center">
                    <button className='w-full px-4 py-2 bg-violet-600 transition-all hover:bg-violet-900 rounded-lg' onClick={() => {
                        setToggle(prev => ({ ...prev, addToggle: !prev.addToggle }))
                    }}>Add Feed</button>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;