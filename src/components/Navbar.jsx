import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Scissors, Star, MapPin, Calendar, Clock, ChevronRight, Heart, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation';
function Navbar() {
    const router = useRouter();
    const handleSignIn = () => {
        router.push('/login'); // Navigate to the login page
      };
    
  return (
    <div>
       <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Scissors className="h-8 w-8 text-purple-600 mr-2" />
            <span className="font-bold text-2xl text-purple-600">Napita</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <Button onClick={handleSignIn} className="bg-purple-600 hover:bg-purple-700 text-white">Sign In</Button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
