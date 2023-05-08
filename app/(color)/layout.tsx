import Footer from "components/footer"
import Header from "components/header"
import Nav from "components/nav"
import Link from "next/link"

export default function ColorLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="page">
            <Header/>
                <main className="w-screen min-h-screen py-20 px-8 bg-neutral-900">
                    <section className="w-full max-w-[1200px] mx-auto flex justify-center flex-col lg:flex-row lg:justify-between">
                        <div className="w-full mb-8 lg:mb-0">
                            <h1 className="hidden sm:block text-3xl md:text-4xl text-center lg:text-left">
                                Effortless Color Conversion for Tailwind CSS
                            </h1>
                            <h1 className="text-4xl text-center sm:hidden">Effortless Color <br/> Conversion <br/> for Tailwind CSS</h1>
                            <p className="text-neutral-500 text-base mt-5 sm:mt-3 max-w-[700px] text-center lg:text-left mx-auto lg:mx-0"> Save time and enhance your workflow by easily converting colors to their Tailwind counterparts or translating Tailwind color classes to HEX, RGB, RGBA, HSL, and HSLA formats.</p>
                        </div>
                        <button 
                            className="bg-gradient-to-r bg-blue-600 text-sm md:text-base text-white font-medium w-full h-min sm:max-w-[250px] rounded-xl py-3 px-14 mx-auto lg:mx-0"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #004ef5, #3B82F6, #418cc9, #10B981)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient-animation 5s ease-in-out infinite',
                            }}
                        >
                            <Link href={'/'}>
                                Visit Project Repo
                            </Link>
                        </button>
                    </section>
                    
                    <section className="w-full max-w-[1200px] mx-auto mt-20">
                        <aside>
                            <Nav/>
                        </aside>
                       
                    </section>
                    

                    {children}

                </main> 
            <Footer/>
        </div>   
    )
}