'use client'

import { Label } from '@/components/ui/label'
import { Band } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function DetailBand({ bandId }: { bandId: string }) {
    const bands = useQuery<Band[]>({
        queryKey: ['band'],
        queryFn: () => {
            return fetch(`/api/band`).then(res => res.json())
        }
    })

    const findBandById = bands.data?.find((band: Band) => band.band_id === bandId)

    const getRandomBands = () => {
        if (!bands.data) return []
        const filteredBands = bands.data.filter(band => band.band_id !== bandId)
        const randomBands = filteredBands.sort(() => 0.5 - Math.random()).slice(0, 5)
        return randomBands
    }

    const recommendedBands = getRandomBands()

    return (
        <div className='w-full h-full overflow-x-hidden'>
            {findBandById && (
                <section className="w-full h-auto overflow-x-hidden flex pt-[120px] pb-10 items-center justify-center p-10">
                    <div className='max-w-[800px] h-full flex items-center justify-center border rounded-lg p-10'>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-[250px] h-[250px] mb-3 rounded-full shadow-lg" src={findBandById.band_gambar} alt="Bonnie image" />
                            <div className='flex flex-col items-center gap-5'>
                                <div className='flex flex-col items-center'>
                                    <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{findBandById.band_nama}</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{findBandById.band_genre.map((genre: string) => (genre)).join(', ')}</span>
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <Label className='text-md'>Lahir pada {findBandById.band_rilis}</Label>
                                    <Label className="leading-relaxed text-md">{findBandById.band_deskripsi}</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <div className='w-full h-auto flex flex-col gap-3 px-5 pb-10 items-center justify-center'>
                <Label className='text-xl'>Rekomendasi band lainnya :</Label>
                <div className='flex flex-row flex-wrap gap-3 w-full h-auto justify-center'>
                    {recommendedBands.map((band: Band) => (
                        <div className="flex flex-col items-center pb-10 border p-5 w-fit rounded-lg" key={band.band_id}>
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={band.band_gambar} alt="Bonnie image" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{band.band_nama}</h5>
                            <div className="flex mt-4 md:mt-6">
                                <a href={`/band/${band.band_id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detail</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
