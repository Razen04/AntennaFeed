import { useState } from "react"

const MobileFolders = () => {
    const [active, setActive] = useState('Default');
    const folders = ["Default", "Programming", "Science", "Technology", "Business", "Nature"]

    return (
        <div className="folders bg-secondary w-full mt-5 overflow-x-auto scroll-smooth hide-scrollbar">
            <ul className="flex items-center gap-3">
                {folders.map(folder => {
                    return (
                        <li key={folder} className={`px-2 pt-1 rounded-t-md ${active === folder ? 'bg-selected text-blue-400' : ''}`}>
                            <button onClick={() => setActive(folder)}>{folder}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MobileFolders