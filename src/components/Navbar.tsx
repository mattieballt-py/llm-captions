'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="font-bold text-xl">CaptionPro</div>
      <div className="flex gap-6">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/settings">Settings</Link>
        <button onClick={() => {/* Add logout logic */}}>Logout</button>
      </div>
    </nav>
  )
} 