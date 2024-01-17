

import Image from 'next/image'
import getServerSession from "next-auth"
import { authConfig } from '@/auth'
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth();
  console.log("THE SESSION IS:")
  console.log(session)
  return (
    <div>
      <h1>{session?.user?.username}</h1>
    </div>
  )
}
