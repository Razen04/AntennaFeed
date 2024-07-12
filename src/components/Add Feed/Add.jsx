import './add.css'
import closeLogo from 'D:/rss-feedit/src/assets/close.svg'

const Add = ({ setFileName, fileName, handleAddButton, setAddToggle }) => {
    return (
        <div className="add-feed min-w-96 bg-violet-400 p-6">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl text-white font-semibold">Add Folder</h1>
                <img
                    src={closeLogo} alt="Close Button" className='cursor-pointer' onClick={() => setAddToggle(prevToggle => !prevToggle)} />
            </div>

            <div className="details mt-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Enter folder name..."
                    value={fileName}
                    onChange={(event) => setFileName(event.target.value)}
                    className="p-2 outline-none border-b-2 font-semibold bg-violet-400 text-white"
                />
                <button
                    className="px-4 py-2 transition-all bg-violet-50 hover:bg-violet-300 hover:rounded-2xl hover:font-semibold"
                    onClick={handleAddButton}
                >Add</button>
            </div>
        </div>
    )
}

export default Add
