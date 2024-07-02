'use client'

import { Search } from 'lucide-react';
import Carousel from './Carousel'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdLibraryMusic } from 'react-icons/md'
import Swal from 'sweetalert2';

export default function Homepage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
      if (searchQuery.trim() === '') {
          Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'Pencarian kosong!',
          });
          return;
      }
      router.push(`/search/${searchQuery}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  };
  
  return (
    <div className='w-screen h-svh overflow-x-hidden'>
      <Navbar />
      <div
        className='w-full h-full'
        style={{ backgroundImage: `url(https://hypeabis.id/assets/content/20230228154137000000BandRoktimtoomeyunsplash.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full bg-black/50'>
          <div className='flex flex-col w-full h-full justify-center items-center'>

            <div className="flex items-center max-w-sm mx-auto">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MdLibraryMusic />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-5/50 border w-[250px] sm:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari band..." required
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label='Search by title'
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-auto pb-20'>
        <Carousel />
      </div>
    </div>
  )
}
