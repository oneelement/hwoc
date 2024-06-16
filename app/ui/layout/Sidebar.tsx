'use client'

import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import FolderIcon from '@/app/ui/icons/Folder'

const navLinks = [
  {
    name: 'Folders',
    href: '/folders',
    icon: FolderIcon
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="border-r w-[220px] h-screen">
      <div className="flex flex-col pb-4 pt-6 h-full">
        <div className="pl-3.5 pr-2 mb-16">
          <Link href="/">
            <Image src="/holiwise.svg" alt="Holiwise" width="117" height="34" className="" priority={true} />
          </Link>
        </div>
        <nav className="px-2">
          <ul>
            {navLinks.map(({ name, href, icon: Icon }) => (
              <li 
                key={href}
                className={clsx(
                  'rounded-[11px] border border-transparent text-sm flex items-center',
                  {
                    'bg-primary-500 font-semibold': pathname === href,
                    'hover:bg-gray-200': pathname !== href
                  }
                )}
              >
                <Link href={href} className="flex items-center text-gray-900 w-full px-3 py-2 h-12">
                  <Icon
                    className={clsx(
                      'fill-gray-500 w-5 h-5 mr-3',
                      { 
                        'fill-gray-900': pathname === href 
                      }
                    )}
                  />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}