import menuLogo from '../../assets/menu.svg';

const MobileLayout = ({ sidebarToggle, setSidebarToggle }) => {


    const handleMenuButtonClick = () => {
        console.log("Menu button clicked")
        setSidebarToggle(prev => !prev);
    }

    return (
        <div className={`w-full bg-gray-950 p-4 xl:hidden z-10`}>
            <div className={`w-full flex items-center ${!sidebarToggle ? 'justify-between' : ''}`}>
            <button onClick={handleMenuButtonClick}>
                {!sidebarToggle ? <img src={menuLogo} alt="Menu Logo" className='w-10' /> : null}
            </button>
            <h1 className='text-2xl text-left'>AntennaFeed</h1>
        </div>
        </div >
    )
}

export default MobileLayout