import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="min-h-16 border-b border-transparent">
      <div className="sm:hidden py-3 px-6 border-b flex justify-center">
        <Link href="/">
          <Image src="/holiwise.svg" alt="Holiwise" width="117" height="34" className="" priority={true} />
        </Link>
      </div>
    </header>
  )
}