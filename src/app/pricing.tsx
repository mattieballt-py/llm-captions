'use client'
import Navbar from '@/components/Navbar'

export default function Pricing() {
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="mb-6">First caption is free. After that, pay just $3 per video.</p>
        <a
          href="https://buy.stripe.com/test_4gM8wP2e14xsaeubN5d7q00"
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold"
        >
          Pay $3 to Caption
        </a>
      </div>
    </div>
  )
} 