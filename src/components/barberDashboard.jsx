'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Toast } from '@/components/ui/toast'
import { Scissors, DollarSign, Clock, Plus, Edit, Trash, Bell, CheckCircle, XCircle, Upload, MapPin, User, Camera } from 'lucide-react'

export default function BarberDashboard() {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', service: 'Haircut', date: '2023-09-28', time: '14:00', status: 'Completed', amount: 30 },
    { id: 2, customer: 'Jane Smith', service: 'Coloring', date: '2023-09-29', time: '10:00', status: 'Pending', amount: 60 },
    { id: 3, customer: 'Mike Johnson', service: 'Beard Trim', date: '2023-09-30', time: '11:30', status: 'Pending', amount: 20 },
  ])

  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', price: 30, image: '/placeholder.svg?height=100&width=100' },
    { id: 2, name: 'Coloring', price: 60, image: '/placeholder.svg?height=100&width=100' },
    { id: 3, name: 'Beard Trim', price: 20, image: '/placeholder.svg?height=100&width=100' },
  ])

  const [requests, setRequests] = useState([
    { id: 1, customer: 'Alice Brown', service: 'Haircut', requestedDate: '2023-10-01', requestedTime: '15:00', status: 'Pending' },
    { id: 2, customer: 'Bob Wilson', service: 'Beard Trim', requestedDate: '2023-10-02', requestedTime: '11:00', status: 'Pending' },
  ])

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false)
  const [newService, setNewService] = useState({ name: '', price: '', image: null })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [barber, setBarber] = useState({
    name: "Alex Johnson",
    shopName: "Style Masters",
    description: "Providing top-notch haircuts and styling services for over 10 years.",
    location: "123 Main St, New York, NY 10001",
    about: "Passionate about creating unique looks that suit each individual client.",
    shopImages: [
      '/placeholder.svg?height=200&width=300',
      '/placeholder.svg?height=200&width=300',
      '/placeholder.svg?height=200&width=300',
    ],
    avatar: '/placeholder.svg?height=100&width=100'
  })

  const handleAddService = (e) => {
    e.preventDefault()
    setServices([...services, { id: services.length + 1, name: newService.name, price: parseFloat(newService.price), image: newService.image || '/placeholder.svg?height=100&width=100' }])
    setNewService({ name: '', price: '', image: null })
    setIsAddServiceModalOpen(false)
  }

  const totalEarnings = orders.reduce((sum, order) => sum + order.amount, 0)

  const handleAcceptRequest = (id) => {
    const request = requests.find(req => req.id === id)
    if (request) {
      const isTimeClash = orders.some(order => 
        order.date === request.requestedDate && order.time === request.requestedTime
      )

      if (isTimeClash) {
        setToastMessage("Cannot accept request. Time slot is already booked.")
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        return
      }

      const newOrder = {
        id: orders.length + 1,
        customer: request.customer,
        service: request.service,
        date: request.requestedDate,
        time: request.requestedTime,
        status: 'Pending',
        amount: services.find(s => s.name === request.service)?.price || 0
      }
      setOrders([...orders, newOrder])
      setRequests(requests.filter(req => req.id !== id))
    }
  }

  const handleRejectRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewService({ ...newService, image })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditProfile = (e) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    setIsEditProfileModalOpen(false)
    setToastMessage("Profile updated successfully!")
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 md:mb-0"
        >
          Barber Dashboard
        </motion.h1>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative bg-white hover:bg-purple-100">
                <Bell className="h-4 w-4 mr-2 text-purple-600" />
                Notifications
                {requests.length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {requests.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h3 className="font-semibold mb-2 text-purple-800">New Requests</h3>
              {requests.map(request => (
                <motion.div 
                  key={request.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-2 bg-white rounded-lg shadow-md"
                >
                  <p className="font-medium text-purple-700">{request.customer}</p>
                  <p className="text-sm text-gray-600">{request.service} - {request.requestedDate} at {request.requestedTime}</p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAcceptRequest(request.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={() => handleRejectRequest(request.id)}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </PopoverContent>
          </Popover>
          <Avatar onClick={() => setIsProfileModalOpen(true)} className="cursor-pointer">
            <AvatarImage src={barber.avatar} alt={barber.name} />
            <AvatarFallback>{barber.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Orders</CardTitle>
              <Scissors className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{orders.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">${totalEarnings}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Services Offered</CardTitle>
              <Scissors className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{services.length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4 bg-white p-1 rounded-lg">
          <TabsTrigger value="orders" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Orders</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Services</TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-800">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-purple-700">Customer</TableHead>
                    <TableHead className="text-purple-700">Service</TableHead>
                    <TableHead className="text-purple-700">Date</TableHead>
                    <TableHead className="text-purple-700">Time</TableHead>
                    <TableHead className="text-purple-700">Status</TableHead>
                    <TableHead className="text-purple-700">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'} className="bg-purple-100 text-purple-800">
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-purple-800">Services</CardTitle>
              <Button onClick={() => setIsAddServiceModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Service
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold text-purple-800">{service.name}</h3>
                          <p className="text-sm text-purple-600">${service.price}</p>
                          <div className="mt-2 flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-100">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-800">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map(request => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-purple-800">{request.customer}</h3>
                            <p className="text-sm text-purple-600">{request.service}</p>
                            <p className="text-sm text-purple-600">{request.requestedDate} at {request.requestedTime}</p>
                          </div>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">{request.status}</Badge>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAcceptRequest(request.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={() => handleRejectRequest(request.id)}>
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-purple-800">Add New Service</DialogTitle>
            <DialogDescription className="text-purple-600">
              Enter the details of the new service you want to offer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddService}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-purple-700">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right text-purple-700">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right text-purple-700">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add Service</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-purple-800">Barber Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={barber.avatar} alt={barber.name} />
                <AvatarFallback>{barber.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-xl text-purple-800">{barber.name}</h3>
                <p className="text-sm text-purple-600">{barber.shopName}</p>
              </div>
            </div>
            <div>
              <Label className="font-semibold text-purple-700">Description</Label>
              <p className="text-sm text-purple-600">{barber.description}</p>
            </div>
            <div>
              <Label className="font-semibold text-purple-700">Location</Label>
              <p className="text-sm text-purple-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-purple-500" /> {barber.location}
              </p>
            </div>
            <div>
              <Label className="font-semibold text-purple-700">About</Label>
              <p className="text-sm text-purple-600">{barber.about}</p>
            </div>
            <div>
              <Label className="font-semibold text-purple-700">Shop Images</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {barber.shopImages.map((image, index) => (
                  <img key={index} src={image} alt={`Shop image ${index + 1}`} className="w-full h-20 object-cover rounded-md" />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => { setIsProfileModalOpen(false); setIsEditProfileModalOpen(true); }} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProfileModalOpen} onOpenChange={setIsEditProfileModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-purple-800">Edit Barber Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditProfile}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={barber.avatar} alt={barber.name} />
                  <AvatarFallback>{barber.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer bg-purple-100 text-purple-800 px-3 py-2 rounded-md hover:bg-purple-200 transition-colors">
                    <Camera className="h-4 w-4 inline-block mr-2" />
                    Change Avatar
                  </Label>
                  <Input id="avatar" type="file" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setBarber({ ...barber, avatar})
                      }
                      reader.readAsDataURL(file)
                    }
                  }} />
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-purple-700">Name</Label>
                <Input id="name" value={barber.name} onChange={(e) => setBarber({ ...barber, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="shopName" className="text-purple-700">Shop Name</Label>
                <Input id="shopName" value={barber.shopName} onChange={(e) => setBarber({ ...barber, shopName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="description" className="text-purple-700">Description</Label>
                <Textarea id="description" value={barber.description} onChange={(e) => setBarber({ ...barber, description: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location" className="text-purple-700">Location</Label>
                <Input id="location" value={barber.location} onChange={(e) => setBarber({ ...barber, location: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="about" className="text-purple-700">About</Label>
                <Textarea id="about" value={barber.about} onChange={(e) => setBarber({ ...barber, about: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-purple-700">Shop Images</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {barber.shopImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Shop image ${index + 1}`} className="w-full h-20 object-cover rounded-md" />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-0 right-0 m-1 p-1"
                        onClick={() => {
                          const newImages = [...barber.shopImages]
                          newImages.splice(index, 1)
                          setBarber({ ...barber, shopImages: newImages })
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {barber.shopImages.length < 3 && (
                    <Label htmlFor={`shopImage${barber.shopImages.length}`} className="w-full h-20 border-2 border-dashed border-purple-300 rounded-md flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors">
                      <Plus className="h-6 w-6 text-purple-500" />
                      <Input
                        id={`shopImage${barber.shopImages.length}`}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setBarber({ ...barber, shopImages: [...barber.shopImages] })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {showToast && (
        <Toast className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          {toastMessage}
        </Toast>
      )}
    </div>
  )
}