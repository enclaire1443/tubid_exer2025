'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { name: 'Menu', href: '/main' },
    { name: 'Contact', href: '/main/contact' },
    { name: 'Reviews', href: '/main/reviews' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1F1F1F] p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/main" className="font-poppins font-extrabold text-2xl text-white">
            Tahu Bulat <span className="text-[#FF6B6B]">Pak Dadang</span>
        </Link>

        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-poppins font-semibold text-lg ${
                pathname === link.href
                  ? 'text-[#FF6B6B]'
                  : 'text-white hover:text-[#FF6B6B] transition-colors duration-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link href="/" className="font-poppins font-semibold text-lg text-white hover:text-[#FF6B6B] transition-colors duration-300">
          Logout
        </Link>
      </div>
    </nav>
  )
}