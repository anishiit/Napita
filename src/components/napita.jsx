'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Scissors, MapPin, Star, Clock, ChevronDown, User, Calendar, Navigation, CheckCircle, History, Phone, Mail } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NapitaSPA(){

const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
const [selectedSalon, setSelectedSalon] = useState(null)
const [date, setDate] = useState('')
const [time, setTime] = useState('')
const [selectedServices, setSelectedServices] = useState([])
const [isMapVisible, setIsMapVisible] = useState(false)
const [activeTab, setActiveTab] = useState('all')
const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
const [bookingHistory, setBookingHistory] = useState([])
const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
const [searchTerm, setSearchTerm] = useState('')
const [filteredSalons, setFilteredSalons] = useState([])

const salons = [
  { id: 1, name: 'Stylish Cuts', rating: 4.5, services: [
    { name: 'Haircut', price: 30 },
    { name: 'Coloring', price: 60 },
    { name: 'Styling', price: 40 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '1.2 km', time: '20-25 min', lat: 40.7128, lng: -74.006, category: 'all' },
  { id: 2, name: 'Glamour Studio', rating: 4.2, services: [
    { name: 'Haircut', price: 35 },
    { name: 'Styling', price: 45 },
    { name: 'Makeup', price: 50 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '0.8 km', time: '15-20 min', lat: 40.7138, lng: -74.013, category: 'trending' },
  { id: 3, name: 'Barber Bros', rating: 4.8, services: [
    { name: 'Haircut', price: 25 },
    { name: 'Shave', price: 20 },
    { name: 'Beard Trim', price: 15 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '1.5 km', time: '25-30 min', lat: 40.7118, lng: -74.009, category: 'offers' },
  { id: 4, name: 'Chic & Sleek', rating: 4.6, services: [
    { name: 'Haircut', price: 40 },
    { name: 'Coloring', price: 70 },
    { name: 'Styling', price: 50 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '2.0 km', time: '30-35 min', lat: 40.7148, lng: -74.007, category: 'premium' },
  { id: 5, name: 'The Beauty Bar', rating: 4.3, services: [
    { name: 'Makeup', price: 55 },
    { name: 'Manicure', price: 30 },
    { name: 'Pedicure', price: 35 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '1.7 km', time: '25-30 min', lat: 40.7108, lng: -74.003, category: 'all' },
  { id: 6, name: 'Scissors & Combs', rating: 4.7, services: [
    { name: 'Haircut', price: 30 },
    { name: 'Beard Trim', price: 20 },
    { name: 'Styling', price: 40 }
  ], image: '/placeholder.svg?height=200&width=300', distance: '0.5 km', time: '10-15 min', lat: 40.7158, lng: -74.011, category: 'trending' },
]

const categories = [
  { name: 'Haircuts', icon: Scissors },
  { name: 'Coloring', icon: Star },
  { name: 'Styling', icon: User },
  { name: 'Makeup', icon: Star },
  { name: 'Beard Trim', icon: Scissors },
  { name: 'Manicure', icon: Star },
]

const handleSearch = (e) => {
  e.preventDefault()
  const filtered = salons.filter(salon => 
    salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.services.some(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  setFilteredSalons(filtered)
  setIsMapVisible(true)
}

const handleAppointmentSubmit = (e) => {
  e.preventDefault()
  const newBooking = {
    salon: selectedSalon,
    date,
    time,
    services: selectedServices,
    status: 'Upcoming'
  }
  setBookingHistory([newBooking, ...bookingHistory])
  setIsBookingConfirmed(true)
  setTimeout(() => {
    setIsAppointmentModalOpen(false)
    setIsBookingConfirmed(false)
  }, 2000)
}

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

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  location: "New York, NY",
  avatar: "/placeholder.svg?height=100&width=100"
}

return (
  <div className="min-h-screen bg-gray-50">
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Scissors className="h-8 w-8 text-purple-600 mr-2" />
          <span className="font-bold text-2xl text-purple-600">
            Napita
          </span>
        </motion.div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Select>
              <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                <option>Current Location</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
              </select>
            </Select>
          </div>
          <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-6 w-6" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
              </DialogHeader>
              <AnimatePresence>
                {isUserProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Card className="border-none shadow-none">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-2xl">{user.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {user.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                            {user.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            {user.email}
                          </div>
                        </div>
                        <Tabs defaultValue="upcoming" className="mt-6">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="past">Past</TabsTrigger>
                          </TabsList>
                          <TabsContent value="upcoming">
                            <div className="space-y-4">
                              {bookingHistory.filter(booking => new Date(booking.date) >= new Date()).map((booking, index) => (
                                <Card key={index} className="overflow-hidden">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h3 className="font-semibold text-lg">{booking.salon.name}</h3>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Calendar className="mr-1 h-4 w-4" />
                                          {booking.date}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Clock className="mr-1 h-4 w-4" />
                                          {booking.time}
                                        </div>
                                      </div>
                                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                                        {booking.status}
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <h4 className="text-sm font-medium mb-1">Services:</h4>
                                      <ul className="text-sm text-muted-foreground">
                                        {booking.services.map((service, index) => (
                                          <li key={index} className="flex items-center">
                                            <Scissors className="mr-1 h-3 w-3" />
                                            {service.name} - ${service.price}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                          <TabsContent value="past">
                            <div className="space-y-4">
                              {bookingHistory.filter(booking => new Date(booking.date) < new Date()).map((booking, index) => (
                                <Card key={index} className="overflow-hidden">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h3 className="font-semibold text-lg">{booking.salon.name}</h3>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Calendar className="mr-1 h-4 w-4" />
                                          {booking.date}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Clock className="mr-1 h-4 w-4" />
                                          {booking.time}
                                        </div>
                                      </div>
                                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                                        {booking.status}
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <h4 className="text-sm font-medium mb-1">Services:</h4>
                                      <ul className="text-sm text-muted-foreground">
                                        {booking.services.map((service, index) => (
                                          <li key={index} className="flex items-center">
                                            <Scissors className="mr-1 h-3 w-3" />
                                            {service.name} - ${service.price}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold mb-4 text-gray-800 text-center"
        >
          Book Your Perfect Salon Experience
        </motion.h1>
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <form className="flex items-center space-x-2" onSubmit={handleSearch}>
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for salons, services, or stylists"
                className="pl-10 pr-4 py-3 w-full border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-full text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        className="mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold mb-4 text-gray-800"
        >
          Categories
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 cursor-pointer"
            >
              <category.icon className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold mb-4 text-gray-800"
        >
          Nearby Salons
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="offers">Great Offers</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </Tabs>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {(filteredSalons.length > 0 ? filteredSalons : salons)
                .filter(salon => activeTab === 'all' || salon.category === activeTab)
                .map((salon) => (
                <motion.div key={salon.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img src={salon.image} alt={salon.name} className="w-full h-48 object-cover" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800">{salon.name}</CardTitle>
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                          <Star className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{salon.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{salon.services.map(s => s.name).join(' • ')}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{salon.distance}</span>
                        <Clock className="h-4 w-4 ml-4 mr-1" />
                        <span>{salon.time}</span>
                      </div>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => {
                          setSelectedSalon(salon)
                          setIsAppointmentModalOpen(true)
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Nearby Salons Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Map View</span>
                  </div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Navigation className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {(filteredSalons.length > 0 ? filteredSalons : salons).map((salon) => (
                    <div
                      key={salon.id}
                      className="absolute"
                      style={{
                        left: `${(salon.lng + 74.006) * 100}%`,
                        top: `${(40.7128 - salon.lat) * 100}%`,
                      }}
                    >
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer"
                           onClick={() => {
                             setSelectedSalon(salon)
                             setIsAppointmentModalOpen(true)
                           }}>
                        <Scissors className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold mb-4 text-gray-800"
        >
          Your Booking History
        </motion.h2>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bookingHistory.map((booking, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800 mb-2">{booking.salon.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">Date: {booking.date}</p>
                  <p className="text-sm text-gray-600 mb-2">Time: {booking.time}</p>
                  <p className="text-sm text-gray-600 mb-2">Services: {booking.services.map(s => s.name).join(', ')}</p>
                  <p className="text-sm font-semibold text-purple-600">{booking.status}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>

    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Napita</h3>
            <p className="text-sm text-gray-400">Napita is your go-to platform for booking salon appointments and discovering great beauty services near you.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Search Salons</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Book Appointment</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Offers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-2">Email: support@napita.com</p>
            <p className="text-sm text-gray-400 mb-2">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-gray-400 text-center">
          © 2023 Napita. All rights reserved.
        </div>
      </div>
    </footer>

    <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
      <AnimatePresence>
        {isAppointmentModalOpen && (
          <DialogContent forceMount>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-purple-600">Book Appointment</DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedSalon ? `Booking for ${selectedSalon.name}` : 'Choose your preferred date, time, and services'}
                </DialogDescription>
              </DialogHeader>
              {isBookingConfirmed ? (
                <div className="py-6 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-green-700">Booking Confirmed!</p>
                  <p className="text-gray-600 mt-2">Your appointment has been successfully booked.</p>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right text-gray-700">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right text-gray-700">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="col-span-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right text-gray-700 mt-2">
                        Services
                      </Label>
                      <div className="col-span-3 space-y-2">
                        {selectedSalon?.services.map((service) => (
                          <div key={service.name} className="flex items-center">
                            <Checkbox
                              id={service.name}
                              checked={selectedServices.includes(service)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedServices([...selectedServices, service])
                                } else {
                                  setSelectedServices(selectedServices.filter((s) => s.name !== service.name))
                                }
                              }}
                            />
                            <label
                              htmlFor={service.name}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {service.name} - ${service.price}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>

  </div>
)
}