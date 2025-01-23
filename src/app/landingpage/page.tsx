'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page() {
  const [particles, setParticles] = useState<{ top: string; left: string }[]>([])

  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }))
    setParticles(generatedParticles)
  }, [])

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 5 + Math.random() * 5,
        delay: i * 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center text-center p-6 bg-black">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FF6B6B] rounded-full"
          style={{
            top: particle.top,
            left: particle.left
          }}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}

      <motion.div
        className="relative z-10"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.5
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-poppins font-extrabold text-6xl md:text-8xl text-white mb-8"
          variants={itemVariants}
        >
          Tahu Bulat <span className='text-[#FF6B6B]'>Pak Dadang</span>
        </motion.h1>

        <motion.p
          className="font-poppins font-medium text-xl md:text-2xl text-white mb-12"
          variants={itemVariants}
        >
          Crispy, Delicious, and Made with <span className='text-[#FF6B6B]'>Love</span>. Your Perfect Snack Anytime!
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/auth/login"
              className="bg-white text-[#FF6B6B] font-poppins font-semibold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Login with Account
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}