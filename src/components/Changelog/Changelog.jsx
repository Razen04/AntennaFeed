
import 'github-markdown-css'
import ReactMarkdown from 'react-markdown';

const Changelog = ({ setChangelogVisible, changelog }) => {


    return (
        <div>

            <div className="changelog p-4 mt-4 rounded bg-gray-950 text-white w-80 xl:w-fit">
                <button
                    onClick={() => setChangelogVisible(false)}
                    className="bg-red-500 text-white py-1 px-3 rounded mb-2"
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
