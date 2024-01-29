import ConnectWalletButton from '@/components/ConnectWalletButton'
import { useServerUser } from "@/hooks/useServerUser";

const User = async () => {
    const user = await useServerUser()
    
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        {user && (
           <>
               <h1>User</h1>
               <p>{user.name}</p>
               <img src={user.image} />
               <p>{user.address}</p>
               <ConnectWalletButton />
           </>
        )}
      </main>
    )
  }
  
  export default User;