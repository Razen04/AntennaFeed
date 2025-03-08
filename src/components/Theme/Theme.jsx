const Theme = () => {
    const accent = [
        {
            name: "Blue", 
            color: "#60a5fa"
        },
        {
            name: "Violet",
            color: "#895cf5"
        }
    ]
    return (
        <div className="bg-secondary w-full p-4 rounded-t-3xl">
            <div className="flex w-full justify-center">
                <div className="bg-white rounded-full w-12 h-2 mb-4"></div>
            </div>
            <div>
                <h1 className="font-bold text-xl text-blue-400">Theme Settings</h1>
                <div className="mt-4 bg-gray-700 rounded-full flex justify-center">
                    <button className="px-16 py-2 border-r-2">Light</button>
                    <button className="px-16 py-2 text-blue-400 font-semibold">Dark</button>
                </div>
            </div>
            <div className="accent mt-4 w-full flex justify-center">
                {accent.map(each => {
                    return (
                        <button key={each.name} value={each.color} className="p-2 border-2 rounded-md mr-2">
                            {each.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Theme