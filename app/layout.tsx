import Navbar from 'components/Navbar'
import '../styles/globals.css'
import Footer from 'components/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Navbar/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}