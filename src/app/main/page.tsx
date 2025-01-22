'use client'
import React from 'react'
import { motion } from 'framer-motion'

const menu = [
  {
    id: 1,
    name: 'Tahu Bulat Original',
    description: 'Crispy and delicious original tahu bulat.',
    price: 5000,
    image: '/images/tahu-bulat-1.jpg',
    size: 'small'
  },
  {
    id: 2,
    name: 'Tahu Bulat Pedas',
    description: 'Spicy tahu bulat for those who love heat.',
    price: 6000,
    image: '/images/tahu-bulat-3.jpg',
    size: 'medium'
  },
  {
    id: 3,
    name: 'Tahu Bulat Keju',
    description: 'Tahu bulat with a cheesy twist.',
    price: 7000,
    image: '/images/tahu-bulat-2.jpg',
    size: 'large'
  },
  {
    id: 4,
    name: 'Tahu Bulat Sambal',
    description: 'Tahu bulat served with special sambal.',
    price: 6500,
    image: '/images/tahu-bulat-1.jpg',
    size: 'tall'
  },
  {
    id: 5,
    name: 'Tahu Bulat Mix',
    description: 'A mix of all our best tahu bulat flavors.',
    price: 8000,
    image: '/images/tahu-bulat-3.jpg',
    size: 'medium'
  },
  {
    id: 6,
    name: 'Tahu Bulat Extra Crispy',
    description: 'Extra crispy tahu bulat for maximum crunch.',
    price: 7500,
    image: '/images/tahu-bulat-2.jpg',
    size: 'small'
  }
]

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-black text-white z-0 top-20 relative">
      <div className="container mx-auto p-6">
        <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-center mb-8">
          Our Menu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px, auto)]">
          {menu.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                item.size === 'medium'
                  ? 'sm:col-span-2'
                  : item.size === 'large'
                  ? 'lg:col-span-2 lg:row-span-2'
                  : item.size === 'tall'
                  ? 'lg:row-span-2'
                  : ''
              }`}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} 
              whileHover={{
                scale: 1.01,
                transition: {
                    duration: 0.7,
                    ease: 'easeOut'
                }
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`w-full ${
                  item.size === 'large' ? 'h-96' : 'h-48'
                } object-cover`}
              />
              <div className="p-4">
                <h2 className="font-poppins font-semibold text-xl mb-2">
                  {item.name}
                </h2>
                <p className="font-poppins text-sm text-gray-300 mb-4">
                  {item.description}
                </p>
                <p className="font-poppins font-bold text-lg text-[#FF6B6B]">
                  Rp {item.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}