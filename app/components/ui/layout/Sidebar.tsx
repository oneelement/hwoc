'use client'

import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import FolderIcon from '@/app/components/ui/icons/Folder'
import DestinationsIcon from '@/app/components/ui/icons/Destinations'

const navLinks = [
  {
    name: 'Folders',
    href: '/folders',
    icon: FolderIcon
  },
  {
    name: 'Destinations',
    href: '/destinations',
    icon: DestinationsIcon
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden sm:block border-r w-[220px] min-h-screen sticky">
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
                  'rounded-[11px] border border-transparent text-sm flex items-center mb-2',
                  {
                    'bg-primary-500 font-semibold': pathname.startsWith(href),
                    'hover:border-gray-200': !pathname.startsWith(href)
                  }
                )}
              >
                <Link href={href} 
                  className={clsx(
                    'flex items-center w-full px-3 py-2 h-12',
                    {
                      'text-gray-900': pathname.startsWith(href),
                      'text-gray-400': !pathname.startsWith(href)
                    }
                  )}
                >
                  <Icon
                    className={clsx(
                      'w-5 h-5 mr-3',
                      { 
                        'fill-gray-900': pathname.startsWith(href), 
                        'fill-gray-400': !pathname.startsWith(href)
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