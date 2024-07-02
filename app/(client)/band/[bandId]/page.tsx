import React from 'react'
import DetailBand from './_components/DetailBand'
import Navbar from '@/components/Navbar'

interface IParams {
    bandId: string
}

export default function page({ params }: { params: IParams }) {

    return (
        <div className='w-screen h-svh'>
            <Navbar />
            <DetailBand bandId={params.bandId}/>
        </div>
    )
}
