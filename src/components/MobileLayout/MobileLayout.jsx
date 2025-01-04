import menuLogo from '../../assets/menu.svg';

const MobileLayout = ({ sidebarToggle, setSidebarToggle }) => {


    const handleMenuButtonClick = () => {
        console.log("Menu button clicked")
        setSidebarToggle(prev => !prev);
    }

    return (
        <div className={`w-full bg-gray-950 p-4 xl:hidden z-10`}>
            <div className={`w-full flex items-start ${!sidebarToggle ? 'justify-between' : ''}`}>
            <button onClick={handleMenuButtonClick}>
                {!sidebarToggle ? <img src={menuLogo} alt="Menu Logo" className='w-10' /> : null}
            </button>
            <div className='flex'>
                    <h1 className='text-2xl text-left'>AntennaFeed</h1>
                    <div className='w-full flex justify-between items-center'>
                        <p></p>
                        <p className='text-sm bg-violet-900 text-white rounded-xl text-center w-10 mb-4'>beta</p>
                    </div>
                    
            </div>
            
        </div>
        </div >
    )
}

export default MobileLayout