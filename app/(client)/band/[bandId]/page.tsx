'use client'

import React from 'react'
import DetailBand from './_components/DetailBand'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'

interface IParams {
    bandId: string
}

export default function page({ params }: { params: IParams }) {
    const session = useSession();
    return (
        <div className='w-screen h-svh'>
            <Navbar user={session.data?.user}/>
            <DetailBand bandId={params.bandId}/>
        </div>
    )
}
