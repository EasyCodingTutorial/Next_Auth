import ConnectToDb from "@/utils/ConnectToDb";

import User from "@/Models/User/User";

import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        await ConnectToDb()
        const { Email } = await req.json()
        const user = await User.findOne({ Email }).select("_id")
        console.log(user)
        return NextResponse.json({ user })

    } catch (error) {
        console.log(error)
    }


}

