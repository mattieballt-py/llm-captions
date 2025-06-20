'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Upload() {
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

  return (
    <div>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
} 