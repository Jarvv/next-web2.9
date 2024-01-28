import Login from '@/components/Login'
import { useEffect } from 'react';

const Home = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Login />
      <p>Hello</p>
    </main>
  )
}

export default Home;