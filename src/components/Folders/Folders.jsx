import editLogo from '../../assets/edit.svg'
import deleteLogo from '../../assets/delete.svg'

const Folders = () => {
    const folders = ["General News", "Technology", "Programming", "Science", "Economics"]
    return (
        <div className="bg-secondary w-full p-4 rounded-t-3xl">
            <div className="flex w-full justify-center">
                <div className="bg-white rounded-full w-12 h-2 mb-4"></div>
            </div>
            <div>
                <h1 className="font-bold text-xl text-blue-400">Folders Settings</h1>
                <div className="folders mt-4 max-h-64 overflow-auto">
                    {folders.map(folder => {
                        return (
                            <div key={folder} className='bg-primary rounded-xl p-2 px-3 mb-2 flex justify-between items-stretch'>
                                <h1>{folder}</h1>
                                <div className="action-buttons mt-6">
                                    <button className='px-2'>
                                        <img src={editLogo} alt="" />
                                    </button>
                                    <button className='px-2'>
                                        <img src={deleteLogo} alt="" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='mt-3 flex justify-end w-full'>
                    <button className='px-4 py-2 bg-blue-400 rounded-md'>Add folder</button>
                </div>
            </div>
        </div>
    )
}

export default Folders