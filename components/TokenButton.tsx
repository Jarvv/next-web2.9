'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
  
const TokenButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const awardJamesToken = async () => {
        setIsLoading(true); // Disable the button
        const response = await fetch('/api/token', {
            method: "POST"
        })
    
        setIsLoading(false); 
        
        // Replace this with a router refresh
        window.location.reload()
    }

    return (
        <button disabled={isLoading} onClick={awardJamesToken} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
            {isLoading ? (
                "Generating your token..."
            ) : (
                "Get a JAMES token"
            )}
        </button>
    )
}

export default TokenButton