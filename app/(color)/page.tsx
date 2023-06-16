/* eslint-disable react/no-unescaped-entities */
import ColorComponent from "components/color";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Color Conversion - TailwindMate',
    description: 'Convert standard color codes to their Tailwind equivalents with TailwindMate. Streamline your Tailwind CSS development process with our color conversion tool.',
    openGraph: {
      title: 'Color Conversion - TailwindMate',
      description: 'Convert standard color codes to their Tailwind equivalents with TailwindMate. Streamline your Tailwind CSS development process with our color conversion tool.',
      images: ['/web-shot.png'],
    },
};


export default function Page(){

    return (
        <section className='w-full max-w-[1200px] mx-auto'>
            <p className="text-neutral-300 text-[15px] mt-5 sm:mt-3 max-w-[750px]">
                Enter your color code below to convert it to tailwind color classes.   
            </p>
            <ColorComponent placeholder={'Enter non tailwind color code'} type="to-tailwind"/>
            <div className="w-full border rounded-md border-neutral-700 mt-12 lg:mt-20">
                <div className="py-3.5 px-5 border-b border-b-neutral-700 text-white">About</div>
                <div className="text-white px-5 py-6">
                    <p className="text-neutral-300 text-base">
                        Welcome to TailwindMate, your ultimate tool for effortless color conversion in Tailwind. With TailwindMate, 
                        you can save time and enhance your workflow by easily converting colors to their closest Tailwind counterparts 
                        or translating Tailwind color classes to HEX, RGB, RGBA, HSL, and HSLA formats.
                    </p>
                    <p className="text-neutral-300 text-base mt-5 sm:mt-3">
                        Simply enter your color code or tailwind class and let TailwindMate 
                        do the work. Whether it's color names like 'red', 'blue', or 'green', hex codes, RGB or HSL values or 
                        tailwind color classes like rose-600 or teal-400, TailwindMate's 
                        converter will provide you with the closest matching Tailwind color class or equivalent color code values.
                    </p>
                    <p className="text-neutral-300 text-base mt-5 sm:mt-3">
                        After conversion, the tailwind color class or equivalent color codes are ready for use. Click the color component to 
                        copy the color class/codes to your clipboard, ready to be pasted into your  project. 
                        Visit <Link className="underline" href="https://github.com/JaleelB/tailwindmate">the project repo</Link> to learn more 
                        about how TailwindMate can help you find the nearest Tailwind color and streamline your development process.  
                    </p>
                </div>
            </div>
        </section>
    )
}