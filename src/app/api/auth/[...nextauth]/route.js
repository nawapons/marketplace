import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "@/app/nextauth/MySQLConnection"
import bcrypt from "bcrypt"
export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jonhdoe@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials.email || !credentials.password) {
                    return null
                }
                const queryCheck = "SELECT * FROM users WHERE email = ?"
                const user = await executeQuery(queryCheck, [credentials.email])
                if (!user) {
                    return null
                }
                const passwordMatch = await bcrypt.compare(credentials.password, user[0].password)
                if (!passwordMatch) {
                    return null
                }
                return user[0]
            }
        })
    ],
    pages: {
        signIn: `/login`,
    },
    jwt: {
        signingKey: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }