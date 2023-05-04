import Link from "next/link";

export default function Page(){
    return (
        <main className="w-screen h-screen py-20 px-8 bg-neutral-900">
            <section className="w-full max-w-[1200px] mx-auto flex justify-center flex-col lg:flex-row lg:justify-between">
                <div className="w-full mb-8 lg:mb-0">
                    <h1 className="text-2xl md:text-4xl text-center lg:text-left">
                        Effortless Color Conversion for Tailwind CSS
                    </h1>
                    <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-[700px] text-center lg:text-left mx-auto lg:mx-0"> Save time and enhance your workflow by easily converting colors to their Tailwind counterparts or translating Tailwind color classes to HEX, RGB, RGBA, HSL, and HSLA formats.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base text-white font-medium w-full h-min sm:max-w-[240px] rounded-xl py-3 md:py-4 px-16 mx-auto lg:mx-0">
                    <Link href={'/'} className="">
                        Star on GitHub
                    </Link>
                </button>
                
            </section>
        </main>
    )
}