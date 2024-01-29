import Login from '@/components/Login'
import { redirect  } from 'next/navigation';
import { useServerUser } from '@/hooks/useServerUser';

const Home = async () => {
  const user = await useServerUser()

  if (user?.address) {
    redirect(`/user`);
    return;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Login />
    </main>
  )
}

export default Home;