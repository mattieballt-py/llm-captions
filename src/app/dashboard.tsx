'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Upload from '@/components/Upload'
import History from '@/components/History'
import Navbar from '@/components/Navbar'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [usedFree, setUsedFree] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        supabase
          .from('user_credits')
          .select('used_free')
          .eq('user_id', data.user.id)
          .single()
          .then(({ data }) => setUsedFree(data?.used_free ?? false))
      }
    })
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Upload a Video for Captions</h1>
        <Upload usedFree={usedFree} />
        <History userId={user.id} />
      </div>
    </div>
  )
} 