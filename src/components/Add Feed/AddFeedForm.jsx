import './add.css'
import closeLogo from '../../assets/close.svg'
import { useState } from 'react';


const AddFeedForm = ({ profile, setAddOpmlToggle, setProfile }) => {
    console.log("Opml Add Clicked")

    const [opmlInput, setOpmlInput] = useState('');

    const handleOpmlChange = async (file) => {
        try {
            const content = await file.text(); // Ensure the content is resolved
            setOpmlInput(content); // Set the resolved string value
        } catch (error) {
            console.error('Error reading OPML file:', error);
        }
    };


    const handleAddOpml = async () => {

        console.log(opmlInput)
        if (!opmlInput) {
            console.error('No OPML input found');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/opml/opmltojson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: opmlInput }), // Send the resolved string
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data: ", data)
            setProfile(prevProfile => {
                return {
                    ...prevProfile,
                    feeds: {
                        ...prevProfile.feeds,
                        subscribed: data
                    }
                }
            })
        } catch (error) {
            console.error('Failed to process OPML:', error);
        }
    };



    return (
        <div className="add-feed min-w-96 bg-violet-400 p-6">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl text-white font-semibold">Import OPML</h1>
                <img
                    src={closeLogo} alt="Close Button" className='cursor-pointer transition-all' onClick={() => setAddOpmlToggle(prevToggle => !prevToggle)} />
            </div>

            <div className="details mt-4 flex flex-col justify-between">
                <label htmlFor="opmlTextInput">Upload OPML file: </label>
                <input
                    type="file"
                    placeholder="Enter OPML Feed"
                    accept='.opml'
                    className="ml-2 p-2 outline-none border-b-2 font-semibold bg-violet-400 text-white"
                    onChange={(e) => handleOpmlChange(e.target.files[0])}
                />
                <button
                    className="mt-2 px-4 py-2 transition-all bg-violet-300 hover:bg-violet-700 hover:rounded-2xl hover:font-semibold"
                    onClick={handleAddOpml}
                >Import</button>
            </div>
        </div>
    )
}

export default AddFeedForm;
