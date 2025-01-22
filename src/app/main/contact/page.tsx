'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '686e2be0-f207-481f-8f6a-e2ddc6bdb514', 
          name: name,
          email: email,
          message: message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('Message sent successfully!')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-black text-white">
      <div className="container mx-auto p-6 pt-24">
        <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-center mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-[#1F1F1F] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="font-poppins font-semibold text-xl mb-2">Phone</h2>
            <p className="font-poppins text-sm text-gray-300">+62 XXX XXXX XXXX</p>
          </motion.div>

          <motion.div
            className="bg-[#1F1F1F] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="font-poppins font-semibold text-xl mb-2">Email</h2>
            <p className="font-poppins text-sm text-gray-300">tahupakdadang@gmail.com</p>
          </motion.div>

          <motion.div
            className="bg-[#1F1F1F] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="font-poppins font-semibold text-xl mb-2">Address</h2>
            <p className="font-poppins text-sm text-gray-300">
              Kantek FTUI, Depok, Indonesia
            </p>
          </motion.div>
        </div>

        <motion.div
          className="bg-[#1F1F1F] rounded-lg p-8 shadow-lg"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-poppins font-semibold text-2xl mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="font-poppins font-medium text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mt-1 bg-[#2C2C2C] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="font-poppins font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 bg-[#2C2C2C] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="font-poppins font-medium text-sm">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 mt-1 bg-[#2C2C2C] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                rows={5}
                placeholder="Enter your message"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B6B] text-white font-poppins font-semibold py-2 rounded-lg hover:bg-[#FF5A5A] transition-colors duration-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {status && (
            <p className="mt-4 text-center font-poppins text-sm text-gray-300">
              {status}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}