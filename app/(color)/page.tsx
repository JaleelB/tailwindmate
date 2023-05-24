/* eslint-disable react/no-unescaped-entities */
"use client";
import ColorComponent from "components/color";


export default function Page(){

    return (
        <section className='w-full max-w-[1200px] mx-auto'>
            <p className="text-neutral-300 text-base mt-5 sm:mt-3 max-w-[750px]">
                Enter your color code below to convert it to Tailwind CSS color classes.   
            </p>
            <ColorComponent placeholder={'Enter non tailwind color code'} type="to-tailwind"/>
            <div className="w-full border rounded-md border-neutral-700 mt-12 lg:mt-20">
                <div className="py-3.5 px-5 border-b border-b-neutral-700 text-white">About</div>
                <div className="text-white px-5 py-6">
                    <p className="text-neutral-300 text-base">
                        A tool that transforms standard color codes into their Tailwind CSS equivalents.
                        Whether it's color names like 'red', 'blue', or 'green', hex codes, RGB or HSL 
                        values, simply input the color code and let the converter do the work. For instance,
                        a 'red' color input would yield 'red-600', thus streamlining your transition to Tailwind CSS.
                    </p>
                    <p className="text-neutral-300 text-base mt-5 sm:mt-3">
                        The conversion process is automatic and instant. Once your input is recognized, 
                        the converter generates the closest matching Tailwind color class. This not only 
                        saves you time but also ensures accuracy in your Tailwind development process.
                    </p>
                    <p className="text-neutral-300 text-base mt-5 sm:mt-3">
                        After conversion, the Tailwind class is ready for use. Click the color component to 
                        copy the Tailwind class to your clipboard, ready to be pasted into your Tailwind CSS project. 
                        Experience the ease of translating conventional color codes into Tailwind classes.
                    </p>
                </div>
            </div>
        </section>
    )
}