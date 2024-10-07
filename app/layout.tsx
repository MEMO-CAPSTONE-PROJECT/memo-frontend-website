import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Memo Dashboard",
  description: "This a online school report system.",
  icons: {
    icon: "./icon.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-kanit-medium">
        {children}
      </body>
    </html>
  )
}
