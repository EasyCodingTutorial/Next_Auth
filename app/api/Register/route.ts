// For Connection
import ConnectToDb from "@/utils/ConnectToDb";

import bcrypt from 'bcryptjs'


// For Model/Schema
import User from "@/Models/User/User";

import { NextResponse } from "next/server";

// Normal API REQ
// export async function GET() {
//     return NextResponse.json({
//         "User": "Easy Coding Tutorial"
//     })
// }

export async function POST(req: Request) {
    const {
        Name, Email, Password, UploadImage
    } = await req.json()

    // For Hashing The Password
    const HashedPassword = await bcrypt.hash(Password, 10)

    await ConnectToDb()
    await User.create({
        Name, Email, Password: HashedPassword, UploadImage
    })

    return NextResponse.json({
        message: "Successfully Registered"
    }, { status: 201 })
}



