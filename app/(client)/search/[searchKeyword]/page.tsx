'use client'

import Navbar from '@/components/Navbar'
import React from 'react'
import Search from './_components/Search'
import { useSession } from 'next-auth/react';

interface IParams {
    searchKeyword: string
}

export default function page({ params }: { params: IParams }) {
    const user = useSession().data?.user;

    return (
        <div className='w-screen h-svh'>
            <Navbar user={user}/>
            <Search params={params}/>
        </div>
    )
}
