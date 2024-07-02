'use client'

import { Band } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import CardBand from './CardBand'
import { Label } from '@/components/ui/label'
import SkeletonWrapper from '@/components/loader/skeleton-wrapper'

export default function Search({ params }: { params: any }) {
    const bands = useQuery<Band[]>({
        queryKey: ['band'],
        queryFn: () => {
            return fetch(`/api/band`).then(res => res.json())
        }
    })

    const removePercent20 = (input: string = '') => {
        return input.replace(/%20/g, ' ');
    }

    const filteredBand = useMemo(() => {
        return bands.data?.filter((band: Band) => {
            return band.band_nama.toLowerCase().includes(removePercent20(params.searchKeyword.toLowerCase()))
        })
    }, [bands.data, params.searchKeyword])

    return (
        <div className='w-full h-full pt-[120px]'>
            <div className='flex flex-row flex-wrap justify-center items-center w-full h-auto'>
                <Label className='text-3xl'>Pencarian : {params.searchKeyword}</Label>
            </div>
            {filteredBand ? (
                <div className='flex flex-row flex-wrap justify-center items-center w-full h-auto pt-10 gap-5'>
                    {filteredBand && filteredBand.map((band: Band) =>
                    <SkeletonWrapper key={band.band_id} isLoading={bands.isLoading}>
                        <CardBand band={band} />
                    </SkeletonWrapper>
                    )}
                </div>
            ) : (
                <div className='flex flex-row flex-wrap justify-center items-center w-full h-auto pt-10'>
                    <Label className='text-3xl'>Data tidak ditemukan.</Label>
                </div>
            )}
        </div>
    )
}
