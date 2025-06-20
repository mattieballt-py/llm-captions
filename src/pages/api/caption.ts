import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { transcript } = req.body
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' })

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates high-quality captions for videos.' },
        { role: 'user', content: transcript }
      ]
    })
    res.status(200).json({ captions: completion.data.choices[0].message?.content })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
} 