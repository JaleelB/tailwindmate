import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className='w-screen px-8 h-16 md:h-20'>
      <nav className='w-full max-w-[1200px] h-full mx-auto flex justify-between items-center'>
        <Link href={'/'} className='text-xl text-white font-bold'>tailwindmate</Link>
        <div className='text-white hidden sm:block'>Made by Jaleel Bennett</div>
      </nav>
    </header>
  )
}

export default Navbar
