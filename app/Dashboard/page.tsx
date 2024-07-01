import React from 'react'

export const metadata = {
    title: "Dashboard"
}

// for Components
import { UserInformation } from '@/Components/UserInformation/UserInformation'

const DashboardPage = () => {
    return (
        <UserInformation />
    )
}

export default DashboardPage