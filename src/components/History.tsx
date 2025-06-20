'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function History({ userId }: { userId: string }) {
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase
        .from('captions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (!error) setFiles(data)
    }
    fetchFiles()
  }, [userId])

  return (
    <div className="mt-8">
      <h2 className="font-semibold mb-2">Your Captioned Videos</h2>
      <ul>
        {files.map(file => (
          <li key={file.id} className="mb-4 border-b pb-2">
            <div>Video: <a href={file.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a></div>
            <div>Caption: <a href={file.caption_url} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Download</a></div>
            <div className="text-xs text-gray-500">{new Date(file.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
} 