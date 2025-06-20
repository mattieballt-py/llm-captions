import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file_url, user_id } = req.body

  // Download the file from Supabase Storage
  const response = await fetch(file_url)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const file = new File([buffer], 'audio.mp3')

  // Transcribe with Whisper
  const transcript = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
  })

  // Store in captions table
  await supabase.from('captions').insert([
    {
      user_id,
      video_url: file_url,
      caption_text: transcript.text,
      created_at: new Date().toISOString(),
    },
  ])

  res.status(200).json({ caption: transcript.text })
} 