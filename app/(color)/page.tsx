"use client"
import ColorComponent from "components/color";


export default function Page(){

    return (
        <section className='w-full max-w-[1200px] mx-auto'>
            <p className="text-neutral-500 text-base mt-5 sm:mt-3 max-w-[750px]">
                Enter your color code below to convert it to Tailwind CSS color classes.   
            </p>
            <ColorComponent placeholder={'Enter non tailwind color code'} type="to-tailwind"/>
            <p className="mt-5 sm:mt-3 text-neutral-500">Click to copy tailwind color class</p>
            <div className="w-full border rounded-md border-neutral-700 mt-12 lg:mt-20">
                <div className="py-3.5 px-5 border-b border-b-neutral-700 text-white">How to use</div>
                <div className="text-white px-5 py-6">1. Enter your color code</div>
            </div>
        </section>
    )
}