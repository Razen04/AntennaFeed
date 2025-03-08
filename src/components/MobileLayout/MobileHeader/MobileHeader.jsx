import searchLogo from '../../../assets/search.svg'
import MobileFolders from '../MobileFolders/MobileFolders'

const MobileHeader = () => {
    return (
        <div className="fixed top-0 w-full px-5 pt-3 bg-secondary">
            <div className='flex justify-between items-center'>
                <h1 className="text-xl font-bold text-blue-400">YuReader</h1>
                <button>
                    <img src={searchLogo} alt="Search" />
                </button>
            </div>
            <MobileFolders />
        </div>
    )
}

export default MobileHeader