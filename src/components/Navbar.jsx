'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Scissors,
  Menu,
  X,
  Home,
  Info,
  Phone,
  LogIn,
  ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <motion.header
      className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <Scissors className="h-8 w-8 text-purple-600 mr-2" />
              <span className="font-bold text-2xl text-purple-600">Napita</span>
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {[
              { href: '/', label: 'Home', icon: Home },
              { href: '/about', label: 'About', icon: Info },
              { href: '/contact', label: 'Contact', icon: Phone },
            ].map((item) => (
              <motion.li key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href={item.href} className="text-gray-600 hover:text-purple-600 transition-colors flex items-center">
                  <item.icon className="w-4 h-4 mr-1" />
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/login" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/register" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" /> Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <motion.ul className="flex flex-col" variants={menuVariants}>
                {[
                  { href: '/', label: 'Home', icon: Home },
                  { href: '/about', label: 'About', icon: Info },
                  { href: '/contact', label: 'Contact', icon: Phone },
                ].map((item) => (
                  <motion.li key={item.href} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors block py-3 px-4 flex items-center"
                      onClick={toggleMenu}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={menuItemVariants}>
                  <Link
                    href="/signin"
                    className="bg-purple-600 hover:bg-purple-700 text-white transition-colors block py-3 px-4 flex items-center"
                    onClick={toggleMenu}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}