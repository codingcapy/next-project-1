
'use client'

import {signOut} from "next-auth/react"

export default function Logout(){
    return(
        <button onClick={()=>signOut()} className="px-5">Logout</button>
    )
}