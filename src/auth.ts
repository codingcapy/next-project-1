import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongoclient"
import User from "./models/User"
import bcrypt from "bcryptjs"
import db from "@/db/connect"

export const authConfig = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt"
    },
    providers: [GitHub, CredentialsProvider(
        {
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await db
                const user = await User.findOne({ username: credentials.username })
                if (!user) {
                    return null
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
                if (!passwordsMatch) return null
                console.log("user is")
                // console.log(user)
                return user
            },
        }
    )],
    callbacks: {
        async jwt({ token, user }) {
            console.log("HEYYYYY")
            console.log(token);
            console.log("COOOOL")
            console.log(user)
            if (user) {
                token.id = user.id
                //@ts-ignore
                token.username = user.username;
            }
            return token
        },
        async session({ session, token }) {
            console.log("LOOK HERE!!")
            console.log(session)
            console.log("LOOK ALSOOO HERE!!")
            console.log(token);
            //@ts-ignore
            session.user.id = token.id
            //@ts-ignore
            session.user.username = token.username
            return session
        },
    },
    secret:"secret"
} satisfies NextAuthConfig

export const {
    handlers,
    auth,
    signOut
} = NextAuth(authConfig)