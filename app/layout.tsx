import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/app/ui/layout/Footer"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Holiwise Test - Oliver Chesterman",
  description: "Folders functionality without drag and drop and upvote/downvote functionality",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
