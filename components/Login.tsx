'use client';
import { ConnectWallet, useAddress, useLogin, useUser } from "@thirdweb-dev/react";
import { FormEvent } from "react";

const Login = () =>{
    const address = useAddress()
    const {login} = useLogin()
    const { user: thirdwebUser } = useUser()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        console.log(formData)
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
