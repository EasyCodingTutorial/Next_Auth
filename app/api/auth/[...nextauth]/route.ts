// For Database
import ConnectToDb from "@/utils/ConnectToDb"

// For Model/Schema
import User from "@/Models/User/User"

// For NEXT_AUTH
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

// For bcrypt
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from "next-auth"

interface AuthProps {
    Email: string,
    Password: string,
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {
                    Email, Password
                } = credentials as AuthProps;


                try {
                    await ConnectToDb()
                    const user = await User.findOne({ Email })

                    if (!user) {
                        // console.log("user Not Found")
                        return null

                    }

                    // if User Exists With The Email ID Then We Have to Check The Password So
                    const isValidPassword = await bcrypt.compare(Password, user.Password)

                    if (!isValidPassword) {
                        // console.log("Password Not Match")
                        return null
                    }


                    // If User Exists And Password Is Correct Then We Have To Return The User Data
                    return {
                        id: user._id,
                        name: user.Name,
                        email: user.Email,
                        image: user.UploadImage
                    }




                } catch (error) {
                    console.log("Authorization Error: ", error)
                    return null
                }

            }

        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
};


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }



