"use client"
import React from 'react'

import styles from './UserInformation.module.css'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export const UserInformation = () => {
    const { data: session } = useSession()
    // console.log(session)
    return (
        <>
            <h6 className={styles.UserHeading}>User Dashboard</h6>
            <div className={styles.UserInformation}>
                <div>
                    {
                        session?.user?.image && (
                            <Link href={session.user.image} target='_blank'>
                                <img src={session.user.image} alt={session.user.name ?? "User Image"} />
                            </Link>
                        )
                    }
                </div>


                <div>
                    <h6><span>Name :</span> {session?.user?.name}</h6>
                    <h6><span>Email :</span> {session?.user?.email}</h6>

                    <button className={styles.Btn} onClick={() => signOut()}>Sign Out</button>
                </div>

            </div>
        </>
    )
}
