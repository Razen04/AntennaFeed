import menuLogo from '../../assets/menu.svg';
import closeLogo from '../../assets/close.svg';

const MobileLayout = ({ sidebarToggle, setSidebarToggle }) => {


    const handleMenuButtonClick = () => {
        console.log("Menu button clicked")
        setSidebarToggle(prev => !prev);
    }

    return (
        <div className={`w-full bg-gray-950 p-4 xl:hidden z-10`}>
            <div className='w-full flex items-center justify-between'>
                <button onClick={handleMenuButtonClick}><img src={!sidebarToggle ? menuLogo : closeLogo} alt="Menu Logo" className='w-10' /></button>
                <h1 className='text-2xl'>AntennaFeed</h1>
            </div>
        </div>
    )
}

export default MobileLayout