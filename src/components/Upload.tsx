'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Upload({ usedFree }: { usedFree: boolean }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(`public/${file.name}`, file)
    setUploading(false)
    if (error) alert(error.message)
    else alert('Uploaded!')
  }

  const handleStripePayment = () => {
    window.location.href = 'https://buy.stripe.com/test_4gM8wP2e14xsaeubN5d7q00';
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={uploading || !file || usedFree === undefined || usedFree === true}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {usedFree && (
        <button onClick={handleStripePayment} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">
          Pay $3 to Caption
        </button>
      )}
    </div>
  )
} 