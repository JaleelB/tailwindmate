import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    title: "Tailwindmate",
    description: "A collection of all chatgpt plugins",
    twitter: {
      card: "summary_large_image",
      title: "Tailwindmate",
      description: "Easily convert between Tailwind CSS classes and color formats",
      creator: "@jal_eelll",
      images: ["https://tailwindmate.jaleelbennett.com/web-shot.png"],
    },
    openGraph: {
      title: "Tailwindmate",
      description: "A versatile color conversion web app for Tailwind CSS",
      type: "website",
      url: "https://tailwindmate.jaleelbennett.com/",
      images: [
        {
          url: "https://tailwindmate.jaleelbennett.com/web-shot.png",
          width: 1200,
          height: 715,
          alt: "Tailwindmate",
        },
      ],
    },
};
  

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    )
}