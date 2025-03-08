const New = () => {
    return (
        <div>
            <div className="bg-secondary w-full p-4 rounded-t-3xl">
                <div className="flex w-full justify-center">
                    <div className="bg-white rounded-full w-12 h-2 mb-4"></div>
                </div>
                <div>
                    <h1 className="font-bold text-xl text-blue-400">What&apos;s new?</h1>
                    <p className="mt-3 max-h-80 overflow-auto">
                        <h2 className="text-xl font-semibold">Changelog beta-v5:</h2>
                        <ul className="list-disc px-4 mt-1">
                            <li>For old changelogs refer to commit history on Github. </li>
                            <li>Fixed loading animation issue for the first instance. </li>
                            <li>Resolved various minor bugs.</li>
                            <li>Added new filter options for articles (all, read, unread, starred).</li>
                            <li>Introduced new article view options (list view, card view).</li>
                            <li>Updated application name to &quot;YuReader&quot; paying homage to Yagi-Uda.</li>
                            <li>Added new application icon.</li>
                            <li>Implemented new loading animation. </li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-2">Know issues:</h2>
                        <ul className="list-disc px-4 mt-1">
                            <li>Very slow loading(no database is there as of now so also don&apos;t spam click anything).</li>
                        </ul>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default New