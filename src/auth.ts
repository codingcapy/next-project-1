import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongoclient"
import User from "./models/User"

export const authConfig = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "database"
    },
    providers: [GitHub, CredentialsProvider(
        {
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await User.findOne({ username: credentials.username })
                if (!user) {
                    return null
                }
                console.log("user is")
                // console.log(user)
                return user
            },
        }
    )],
    callbacks: {
        async session({ session, user }) {
            console.log("other user is")
            console.log(session)
            // session.user.id = user.id
            // //@ts-ignore
            // session.user.username = user.username
            // return session
            return session
        },
    }
} satisfies NextAuthConfig

export const {
    handlers,
    auth,
    signOut
} = NextAuth(authConfig)