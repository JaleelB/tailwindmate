// import Link from "next/link";

import ColorComponent from "components/color";

export default function Page(){
    return (
        <section className='w-full max-w-[1200px] mx-auto'>
            <p className="text-neutral-500 text-base mt-5 sm:mt-3 max-w-[750px]">
                Enter your color code below to convert it to Tailwind CSS color classes.   
            </p>
            <ColorComponent/>
        </section>
    )
}