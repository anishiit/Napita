'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Scissors, Star, MapPin, Calendar, Clock, ChevronRight, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
    <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold mb-4 text-gray-800 leading-tight"
          >
            Discover and Book <span className="text-purple-600">Beautiful You</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find and book appointments with top-rated salons and beauty professionals in your area
          </motion.p>
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <form className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for salons, services, or stylists"
                  className="pl-10 pr-4 py-3 w-full border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-full text-lg"
                />
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg">
                Search
              </Button>
            </form>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-8 text-center text-gray-800"
          >
            Popular Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Scissors, title: 'Haircuts & Styling', description: 'Get a fresh new look' },
              { icon: Star, title: 'Coloring & Highlights', description: 'Add some flair to your hair' },
              { icon: Heart, title: 'Nail Services', description: 'Pamper your hands and feet' }
            ].map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                      <service.icon className="mr-2 h-6 w-6" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                    <Button variant="link" className="mt-4 text-purple-600 hover:text-purple-700 p-0 group-hover:underline">
                      Book Now <ChevronRight className="ml-1 h-4 w-4 inline" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16 bg-purple-100 py-12 rounded-3xl"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-8 text-center text-gray-800"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Search, title: 'Search', description: 'Find salons and services near you' },
              { icon: Calendar, title: 'Book', description: 'Choose a date and time that works for you' },
              { icon: Zap, title: 'Enjoy', description: 'Experience great service and feel amazing' }
            ].map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="bg-white rounded-full p-4 inline-block mb-4 shadow-md">
                  <step.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-8 text-center text-gray-800"
          >
            Featured Salons
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Chic Cuts', rating: 4.8, image: '/placeholder.svg?height=200&width=300' },
              { name: 'Glamour Studio', rating: 4.7, image: '/placeholder.svg?height=200&width=300' },
              { name: 'The Beauty Bar', rating: 4.9, image: '/placeholder.svg?height=200&width=300' }
            ].map((salon, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <img src={salon.image} alt={salon.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">{salon.name}</h3>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-semibold text-gray-700">{salon.rating}</span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                      View Salon
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 rounded-3xl"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and book your next appointment today!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full transition-colors">
              Sign Up Now
            </Button>
          </motion.div>
        </motion.section>
      </main>

    </div>
  )
}
