import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-screen px-8 h-16 md:h-20'>
      <div className='w-full max-w-[1200px] h-full mx-auto flex justify-between items-center'>
        <Link href={'/'} 
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent text-[22px] font-bold"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-animation 5s ease-in-out infinite',
          }}
        >
          tailwindmate
        </Link>
        <div className='text-white hidden sm:block'>Made by Jaleel Bennett</div>
      </div>
    </header>
  )
}

export default Header
