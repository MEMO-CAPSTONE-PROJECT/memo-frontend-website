import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memo Dashboard",
  description: "This a online school report system.",
  icons: {
    icon: "./logo.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-[kanit] w-screen h-dvh tracking-[0.01rem] text-body-1">
        {children}
      </body>
    </html>
  )
}
