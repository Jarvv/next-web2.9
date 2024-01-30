'use client';
import { ConnectWallet, useAddress, useLogin, useUser } from "@thirdweb-dev/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useQueryUser } from "@/hooks/useQueryUser";

const Login = () =>{
    const address = useAddress()
    const {login} = useLogin()
    const { user: thirdwebUser } = useUser()
    const router = useRouter();
    const user = useQueryUser();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (user?.address) {
        router.push(`/user`);
      }
    }, [user, router]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setIsLoading(true);
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        
        try{
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: formData.get('name'), image: formData.get('image')}),
            });

            const result = await response.json();

            if (result?.address) {
              router.push(`/user/`);
              return;
            }
        }
        catch(error){
            console.error('Failed to submit the form', error);
        }
    }

    if(!address){
        return(
            <ConnectWallet 
                modalSize="compact"
                btnTitle="Connect to Wallet"
            />
        )
    }

    if(!thirdwebUser){
        return (
            <button onClick={login}>Login</button>
        )
    }

    if(user){
      return (
        <h1>Logging in...</h1>
      )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2">
          <h2>Create User</h2>
          <form className="flex flex-col items-center justify-center gap-2" onSubmit={onSubmit}>
            <input
              placeholder="Name"
              name="name"
              required
            />
            <input
              placeholder="Image (url)"
              name="image"
              required
            />
            {isLoading ? <p>Creating account...</p> : <button type="submit">Create</button>}
            
          </form>
        </div>
      );
  
}

export default Login
  