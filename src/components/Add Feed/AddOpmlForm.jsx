import { useState } from "react";
import closeLogo from '../../assets/close.svg';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOpmlForm = ({ setProfile, setAddToggle }) => {
    console.log("Opml Add Clicked")

    const [opmlInput, setOpmlInput] = useState('');

    const handleOpmlChange = async (file) => {
        try {
            const content = await file.text(); // Ensure the content is resolved
            setOpmlInput(content); // Set the resolved string value
        } catch (error) {
            console.error('Error reading OPML file:', error);
            toast.error("Error reading OPML file");
        }
    };


    const handleAddOpml = async () => {

        console.log(opmlInput)
        if (!opmlInput) {
            console.error('No OPML input found');
            toast.error('No OPML input found')
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/opml/opmltojson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: opmlInput }), // Send the resolved string
            });

            if (!response.ok) {
                toast.error('Server Error.');
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
            setAddToggle(false);
            
        } catch (error) {
            console.error('Failed to process OPML:', error);
            toast.error('Failed to process OPML');
        }
    };



    return (
        <div className="details mt-4 flex flex-col justify-between">
            <label htmlFor="opmlTextInput" className="">Upload OPML file: </label>
            <input
                type="file"
                placeholder="Enter OPML Feed"
                accept='.opml'
                className="mt-2 p-2 outline-none border-b-2 font-semibold  text-white"
                onChange={(e) => handleOpmlChange(e.target.files[0])}
            />
            <button
                className="mt-8 px-4 py-2 transition-all bg-violet-400 hover:bg-violet-700 hover:rounded-2xl hover:font-semibold"
                onClick={handleAddOpml}
            >Import</button>
            <p className="italic mt-20 text-center text-gray-200">This will overwrite all the existing feeds.</p>
        </div>
    )
}

export default AddOpmlForm
