'use client'

import React from 'react'
import DetailBand from './_components/DetailBand'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import getUser from '@/actions/user/get-user'

interface IParams {
    bandId: string
}

export default async function page({ params }: { params: IParams }) {
    const user = await getUser()
    return (
        <div className='w-screen h-svh'>
            <Navbar user={user}/>
            <DetailBand bandId={params.bandId}/>
        </div>
    )
}
