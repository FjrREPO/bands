import React from 'react'
import DetailBand from './_components/DetailBand'
import getUser from '@/app/_actions/getUser'
import Navbar from '@/components/Navbar'

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
