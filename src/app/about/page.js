'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Scissors, Star, Heart, Users, Zap, Award } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
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
            About <span className="text-purple-600">Napita</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connecting beauty professionals with clients, making self-care accessible and convenient for everyone.
          </motion.p>
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
            Our Mission
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto text-center">
            At Napita, we&aposre on a mission to revolutionize the beauty industry by creating a seamless connection between skilled professionals and clients seeking top-notch services. We believe that everyone deserves to feel beautiful and confident, and we&apos;re here to make that happen.
          </motion.p>
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
            Why Choose Napita?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: 'Quality Service', description: 'We partner with top-rated salons and professionals' },
              { icon: Zap, title: 'Convenience', description: 'Book appointments anytime, anywhere with ease' },
              { icon: Users, title: 'Community', description: 'Join a thriving beauty community of professionals and clients' }
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
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
            Our Journey
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-4">
              Founded in 2023, Napita started as a small idea to solve a big problem: the disconnect between beauty professionals and clients. We&apos;ve grown from a local initiative to a nationwide platform, continuously evolving to meet the needs of our users.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-600">
              Today, we&apos;re proud to serve thousands of salons and clients across the country, facilitating beautiful transformations and building lasting relationships in the beauty community.
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-8 text-gray-800"
          >
            Join the Napita Family
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you&aposre a salon owner, beauty professional, or someone looking for top-notch beauty services, there&apos;s a place for you in the Napita community.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
              Join as a Professional
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
              Sign Up as a Client
            </Button>
          </motion.div>
        </motion.section>
      </main>

  
    </div>
  )
}