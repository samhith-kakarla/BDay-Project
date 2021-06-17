import React from 'react'; 
import { setTokenSourceMapRange } from 'typescript';

interface Props {
    setName: (name: string) => void; 
    setEmail: (email: string) => void; 
    setBirthday: (birthday: string) => void; 
    submit: () => void; 
}; 

const FairyForm: React.FC<Props> = ({ setName, setEmail, setBirthday, submit }) => {
    return (
        <div className="bg-gray container mx-auto h-72 w-5/12 m-12 
            flex flex-col justify-center items-center p-10">
             <input 
                onChange={(e) => setName(e.target.value)} 
                placeholder="NAME" 
                className="m-2 mt-8 p-3 block w-8/12 h-10"
            />
             <input 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="EMAIL" 
                className="m-2 p-3 block w-8/12 h-10"
            />
             {/* BIRTHDAY INPUT */}
             <input 
                placeholder="BIRTHDAY" 
                className="m-2 p-3 block w-8/12 h-10"
            />
             <button 
                onClick={() => submit()}
                className="m-2 p-3 block w-6/12 bg-white mb-5"
            >
                GET STARTED
            </button>
        </div>
    )
}

export default FairyForm; 