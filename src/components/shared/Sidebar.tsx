// app/Components/Sidebar.js
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
const Sidebar = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className=" w-64 h-screen bg-white text-black p-4 shadow-lg drop-shadow-lg">
  
  <div className="mb-4">
      <Image
        src="/assets/logo.png"
        width={50}
        height={50}
        alt="Picture of the author"
      />
    </div>
      <ul>
        <li className="mb-2">
          <Link href="/">
          <p className={`block p-2 rounded transition-colors ${pathname === '/' ? 'text-black font-semibold' : 'text-gray-700 hover:text-gray-400'}`}>
              Home
            </p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/search">
            <p className={`block p-2 rounded transition-colors ${pathname === '/search' ? 'text-black font-semibold' : 'text-gray-700 hover:text-gray-400'}`}>Search</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/meaurement">
            <p className={`block p-2 rounded transition-colors ${pathname === '/meaurement' ? 'text-black font-semibold' : 'text-gray-700 hover:text-gray-400'}`}>Meaurement</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;