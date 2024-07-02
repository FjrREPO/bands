import Navbar from '@/components/Navbar'
import React from 'react'
import Search from './_components/Search'

interface IParams {
    searchKeyword: string
}

export default function page({ params }: { params: IParams }) {
    return (
        <div className='w-screen h-svh'>
            <Navbar />
            <Search params={params}/>
        </div>
    )
}
