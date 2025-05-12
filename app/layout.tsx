import type { Metadata } from "next";
import { Kanit } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Memo Dashboard",
  description: "This is an online school report system.",
  icons: {
    icon: "/logo.png", 
  },
};


const kanit = Kanit({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-kanit',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} w-full h-dvh tracking-[0.01rem] text-body-1`}>
        {children}
      </body>
    </html>
  )
}
