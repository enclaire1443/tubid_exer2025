import Navbar from './navbar'

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
}