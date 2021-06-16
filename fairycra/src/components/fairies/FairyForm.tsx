import React from 'react'; 

interface Props {
    setName: (name: string) => void; 
    setEmail: (email: string) => void; 
    setBirthday: (birthday: string) => void; 
    submit: () => void; 
}; 

const FairyForm: React.FC<Props> = () => {
    return (
        <div>
             
        </div>
    )
}

export default FairyForm; 