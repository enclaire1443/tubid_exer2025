'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Review {
  id: string
  name: string
  photo: string
  location: string
  comment: string
}
interface APITypes {
  name: { first: string; last: string }
  picture: { large: string }
  location: { city: string; country: string }
}

export default function Page() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const comments = [
    'ENAK BANGET REKOMEN 100%',
    'makan disini bareng tmen temen, rasanya inget masa lalu',
    'kayak tahu masakan mama hehe',
    'KECE BANGET TAHU BULATNYAAAAA',
    'eh suka banget, makan disini bareng keluarga',
    'asli tahu bulat pak dadang TERBAIK'
  ]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=6')
        if (!response.ok) {
          throw new Error('fetch failed')
        }

        const data = await response.json()
        const fetchedReviews = data.results.map((user: APITypes, index: number) => ({
          id: `${index}`,
          name: `${user.name.first} ${user.name.last}`,
          photo: user.picture.large,
          location: `${user.location.city}, ${user.location.country}`,
          comment: comments[Math.floor(Math.random() * comments.length)] 
        }))

        setReviews([...fetchedReviews])
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [comments])

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-black text-white">
      <div className="container mx-auto p-6 pt-24">
        <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-center mb-8">
          Customer Reviews
        </h1>

        {loading && <p className="font-poppins text-center mb-6">Loading...</p>}

        {error && (
          <p className="font-poppins text-red-500 text-center mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={review.photo}
                alt={review.name}
                width={300}
                height={300}
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
            </div>
          ))}
        </div>

        {!loading && reviews.length === 0 && !error && (
          <p className="text-center text-gray-400">No reviews available.</p>
        )}
      </div>
    </div>
  )
}