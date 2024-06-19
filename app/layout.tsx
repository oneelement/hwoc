import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Sidebar from "@/app/components/ui/layout/Sidebar"
import Footer from "@/app/components/ui/layout/Footer"
import Content from "@/app/components/ui/layout/Content"
import Header from "@/app/components/ui/layout/Header"

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
        <div className="flex">
          <Sidebar />
          <Content>
            <Header />
            <div className="px-6 pt-3">
              {children}
            </div>            
          </Content>
        </div>        
        <Footer />
      </body>
    </html>
  )
}
