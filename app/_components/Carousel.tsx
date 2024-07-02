'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Band } from '@prisma/client';

export default function Carousel() {
    const bands = useQuery<Band[]>({
        queryKey: ['band'],
        queryFn: async () => {
            const response = await fetch('/api/band')
            const data = await response.json()
            return data
        }
    })

    return (
        <div className='w-full h-auto flex justify-center items-center pt-[120px]'>
            <div className='w-[60vw] h-auto'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="w-auto h-auto rounded-[20px]"
                >
                    {bands.data?.slice(0, 5).map((band) => (
                        <SwiperSlide key={band.band_id}>
                            <img src={band.band_gambar} alt="Slide" className='w-full max-h-[500px] object-cover'/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

