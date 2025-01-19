
import 'github-markdown-css'
import ReactMarkdown from 'react-markdown';

const Changelog = ({ setChangelogVisible, changelog }) => {


    return (
        <div>
            <div className="changelog p-4 mt-4 rounded bg-gray-950 text-white w-[22rem] xl:w-fit max-h-fit overflow-scroll">
                <button
                    onClick={() => setChangelogVisible(false)}
                    className="bg-red-500 text-white py-1 px-3 rounded mb-2 hover:bg-red-700 transition-all"
                >
                    Close
                </button>
                <div className='markdown-body'>
                    <ReactMarkdown>{changelog}</ReactMarkdown>
                </div>

            </div>
        </div>
    );
};

export default Changelog;
