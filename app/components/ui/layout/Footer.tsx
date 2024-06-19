import { getCurrentYear } from '@/app/lib/utils/utils'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="px-6 py-12 text-gray-800 text-sm">
        © {getCurrentYear()} Holiwise
      </div>
    </footer>
  )
}