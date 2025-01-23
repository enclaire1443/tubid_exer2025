'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const particleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 5 + Math.random() * 5,
      delay: i * 0.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  })
}
export const dynamic = 'force-dynamic' 

export default function Page() {
  const [particles, setParticles] = useState<{ top: string; left: string }[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }))
    setParticles(generatedParticles)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
    } else {
      console.log('Signed in successfully:', data)
      router.push('/main')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden relative">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FF6B6B] rounded-full"
          style={{
            top: particle.top,
            left: particle.left
          }}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          custom={i}
        />
      ))}
      <motion.div
        className="w-full max-w-md p-8 bg-[#1F1F1F] rounded-lg shadow-lg relative z-10"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-poppins font-extrabold text-3xl mb-6 text-center">
          Login
        </h1>
        {error && (
          <div className="mb-4 p-2 bg-red-500 text-white text-sm rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="font-poppins font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 bg-[#2C2C2C] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="font-poppins font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 bg-[#2C2C2C] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF6B6B] text-white font-poppins font-semibold py-2 rounded-lg hover:bg-[#FF5A5A] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="font-poppins text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-[#FF6B6B] hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}