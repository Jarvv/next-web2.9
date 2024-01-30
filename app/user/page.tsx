import { ProfileData } from '@/@types';
import ConnectWalletButton from '@/components/ConnectWalletButton'
import TokenButton from '@/components/TokenButton';
import { useServerUser } from "@/hooks/useServerUser";

const User = async () => {
    const user = await useServerUser()

    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        {user ? (
           <div className='flex flex-col items-center justify-center gap-2'>
                <h1>User</h1>
                <p>{user.name}</p>
                <img src={user.image} />
                <p>Wallet address: {user.address}</p>
                <p>xp: {user.xp_balance}</p>

                <p>Number of JAMES tokens: {user.reward_token_balance}</p>
                <TokenButton />
               <ConnectWalletButton />
           </div>
        ) : (
          <h1>Not logged in</h1>
        )}
      </main>
    )
  }
  
  export default User;