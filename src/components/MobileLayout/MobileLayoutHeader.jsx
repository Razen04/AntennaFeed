import menuLogo from '../../assets/menu.svg';

const MobileLayoutHeader = ({ toggle, setToggle }) => {

    const handleMenuButtonClick = () => {
        setToggle(prev => ({ ...prev, sidebarToggle: !prev.sidebarToggle }));
    }

    return (
        <div className={`w-full bg-gray-950 p-4 xl:hidden z-10`}>
            <div className={`w-full flex items-start ${!toggle.sidebarToggle ? 'justify-between' : ''}`}>
                <button onClick={handleMenuButtonClick}>
                    {!toggle.sidebarToggle && <img src={menuLogo} alt="Menu Logo" className='w-10' />}
                </button>
                <div className='flex'>
                    <h1 className='text-2xl text-left'>YuReader</h1>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-sm bg-violet-900 text-white rounded-xl text-center w-15 px-2 mb-4'>beta-v5</p>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default MobileLayoutHeader;