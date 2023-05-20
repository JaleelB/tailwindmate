"use client"
import ColorComponent from '@/components/color'
import React from 'react'


export default function Page(){
  return (
    <section className='w-full max-w-[1200px] mx-auto'>
       <p className="text-neutral-500 text-base mt-5 sm:mt-3 max-w-[750px]">
          Enter the Tailwind CSS color class below to get the equivalent color code in various color code formats.
      </p>
      <ColorComponent placeholder={'Enter tailwind color class'} type="from-tailwind"/>
    </section>
  )
}


