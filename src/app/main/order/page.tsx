'use client'
import React from 'react'
import Image from 'next/image'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  size: string
}

interface OrderProps {
  item: MenuItem
  onClose: () => void
}

export default function Page({ item, onClose }: OrderProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FF6B6B] text-white font-poppins font-semibold py-1 px-3 rounded-full hover:bg-[#FF4C4C] transition-colors duration-300"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-64">
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h2 className="font-poppins font-semibold text-3xl mb-4">
              {item.name}
            </h2>
            <p className="font-poppins text-lg text-gray-300 mb-6">
              {item.description}
            </p>
            <p className="font-poppins font-bold text-2xl text-[#FF6B6B] mb-6">
              Rp {item.price.toLocaleString()}
            </p>
            <button className="bg-[#FF6B6B] text-white font-poppins font-semibold py-2 px-6 rounded-lg hover:bg-[#FF4C4C] transition-colors duration-300 w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}