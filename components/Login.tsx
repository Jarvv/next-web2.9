'use client';
import { ConnectWallet, useAddress, useLogin, useUser } from "@thirdweb-dev/react";
import { FormEvent, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/navigation';

const Login = () =>{
    const address = useAddress()
    const {login} = useLogin()
    const { user: thirdwebUser } = useUser()
    const router = useRouter();

    useEffect(() => {
        const authenticateUser = async () => {
            if (thirdwebUser) {
            
              const response = await fetch('/api/user');
              const result = await response.json();

              if (result?.address) {
                //router.push(`/user/${result.address}`);
                return;
              }
            }
          };
      
          authenticateUser();
    }, [thirdwebUser, router])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    return (
        <div >
          <h2>Create User</h2>
          <form onSubmit={onSubmit}>
            <input
              placeholder="Name"
              name="name"
              required
            />
            <input
              placeholder="Image"
              name="image"
              required
            />
            <button type="submit">Create</button>
          </form>
        </div>
      );
  
}

export default Login
  