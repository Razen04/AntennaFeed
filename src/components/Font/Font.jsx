const Font = () => {
    return (
        <div className="bg-secondary w-full p-4 rounded-t-3xl">
            <div className="flex w-full justify-center">
                <div className="bg-white rounded-full w-12 h-2 mb-4"></div>
            </div>
            <div>
                <h1 className="font-bold text-xl text-blue-400">Font Settings</h1>
                <div className="mt-4 rounded-full flex justify-center">
                    <select name="font-name" id="" className="bg-inherit w-full border-b-2 px-2 py-4 focus:outline-none">
                        <option value="default" className="bg-secondary text-white p-4 hover:bg-blue-500">
                            Default
                        </option>
                        <option value="arial" className="bg-secondary text-white p-4 hover:bg-blue-500">
                            Arial
                        </option>
                        <option value="times" className="bg-secondary text-white p-4 hover:bg-blue-500">
                            Times New Roman
                        </option>
                        <option value="roboto" className="bg-secondary text-white p-4 hover:bg-blue-500">
                            Roboto
                        </option>
                    </select>
                </div>
                <div>
                    <select name="font-size" id="" className="bg-inherit w-full border-b-2 px-2 py-4 focus:outline-none">
                        <option value="16" className="bg-secondary text-white p-4 hover:bg-blue-500">16px</option>
                        <option value="18" className="bg-secondary text-white p-4 hover:bg-blue-500">18px</option>
                        <option value="20" className="bg-secondary text-white p-4 hover:bg-blue-500">20px</option>
                        <option value="22" className="bg-secondary text-white p-4 hover:bg-blue-500">22px</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Font