'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Review {
  id: string
  name: string
  photo: string
  location: string
  comment: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      const user = data.results[0]

      return {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.large,
        location: `${user.location.city}, ${user.location.country}`,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    } catch (err) {
      console.error('Error fetching random user:', err)
      setError('Failed to fetch user data. Please try again later.')
      return null
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await Promise.all(
          Array.from({ length: 5 }).map(() => fetchRandomUser())
        )
        setReviews(reviews.filter((review) => review !== null) as Review[])
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError('Failed to load reviews. Please try again later.')
      }
    }

    fetchReviews()
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-black text-white">
      <div className="container mx-auto p-6 pt-24">
        <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-center mb-8">
          Customer Reviews
        </h1>

        {error && (
          <p className="font-poppins text-red-500 text-center mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                src={review.photo}
                alt={review.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-poppins font-semibold text-xl mb-2">
                  {review.name}
                </h2>
                <p className="font-poppins text-sm text-gray-300 mb-4">
                  {review.location}
                </p>
                <p className="font-poppins text-sm text-gray-300">
                  {review.comment}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}