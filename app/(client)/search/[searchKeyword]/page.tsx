import getUser from '@/app/_actions/getUser'
import Navbar from '@/components/Navbar'
import React from 'react'
import Search from './_components/Search'

interface IParams {
    searchKeyword: string
}

export default async function page({ params }: { params: IParams }) {
    const user = await getUser()

    return (
        <div className='w-screen h-svh'>
            <Navbar user={user}/>
            <Search params={params}/>
        </div>
    )
}
