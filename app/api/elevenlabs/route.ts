import { type NextRequest, NextResponse } from "next/server"

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech"

// Voice IDs for different languages (these are example IDs, replace with actual ones)
const VOICE_IDS: Record<string, string> = {
  english: "JBFqnCBsd6RMkjVDRZzb",  // Example voice ID for English
  hindi: "AZnzlk1XvdvUeBnXmlld",    // Example voice ID for Hindi
  tamil: "IKne3meq5aSn9XLyUdCD",    // Example voice ID for Tamil
  telugu: "LcfcDJNUP1GQjkzn1xUU",   // Example voice ID for Telugu
  bengali: "MF3mGyEYCl7XYWbV9V6O",  // Example voice ID for Bengali
  marathi: "TxGEqnHWrfWFTfGW9XjX",  // Example voice ID for Marathi
  gujarati: "VR6AewLTigWG4xSOukaG", // Example voice ID for Gujarati
  kannada: "pNInz6obpgDQGcFmaJgB",  // Example voice ID for Kannada
  malayalam: "yoZ06aMxZJJ28mfd3POQ", // Example voice ID for Malayalam
  punjabi: "AZnzlk1XvdvUeBnXmlld"   // Example voice ID for Punjabi
}

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "ElevenLabs API key not configured" }, { status: 500 })
  }

  try {
    const { text, language } = await req.json()
    const voiceId = VOICE_IDS[language] || VOICE_IDS.english

    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`

    return NextResponse.json({
      success: true,
      message: "Text-to-speech conversion successful",
      audioData: audioDataUrl,
    })
  } catch (error) {
    console.error("ElevenLabs API error:", error)
    return NextResponse.json({ error: "Failed to convert text to speech" }, { status: 500 })
  }
}
