import React, { useContext, useEffect, useState } from 'react'; 

const EnterCred: React.FC = () => {
    const [password, setPassword] = useState<string>(""); 

    useEffect(() => {
        // Set Cred in Local Storage
    }, []); 

    return (
        <div>
            <h1>ENTER CRED</h1>
        </div>
    )
}


export default EnterCred; 