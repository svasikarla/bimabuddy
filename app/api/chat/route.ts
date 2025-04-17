import { type NextRequest, NextResponse } from "next/server"

// This would be connected to ElevenLabs API in a real implementation
export async function POST(req: NextRequest) {
  try {
    const { message, language, text } = await req.json()

    // Skip artificial delay for greeting messages
    if (message !== "greeting") {
      // Simulate processing time 
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    let responseText: string;

    // If text is directly provided (e.g., for greeting), use it
    if (text) {
      responseText = text;
    } else {
      // Otherwise generate a response based on the message
      // Simple responses based on language
      const responses: Record<string, string> = {
        english: "I understand you're looking for health insurance information. How can I assist you further?",
        hindi: "मुझे समझ में आता है कि आप स्वास्थ्य बीमा जानकारी की तलाश कर रहे हैं। मैं आपकी और कैसे सहायता कर सकता हूं?",
        tamil: "நீங்கள் சுகாதார காப்பீட்டுத் தகவல்களைத் தேடுகிறீர்கள் என்பதை நான் புரிந்துகொள்கிறேன். நான் உங்களுக்கு மேலும் எவ்வாறு உதவ முடியும்?",
        // Add responses for other languages
      }

      responseText = responses[language] || responses.english;
    }

    let audioUrl = null;

    // Try to get audio from ElevenLabs, but don't fail the whole request if it fails
    try {
      // Call the Elevenlabs API to convert text to speech
      const elevenLabsResponse = await fetch(`${req.nextUrl.origin}/api/elevenlabs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: responseText,
          language: language
        }),
      });

      if (elevenLabsResponse.ok) {
        const audioData = await elevenLabsResponse.json();
        audioUrl = audioData.audioData;
      } else {
        console.warn(`ElevenLabs API returned status ${elevenLabsResponse.status}: ${elevenLabsResponse.statusText}`);
      }
    } catch (audioError) {
      console.error("Error calling ElevenLabs API:", audioError);
      // Continue with the request, just without audio
    }

    return NextResponse.json({
      text: responseText,
      audioUrl: audioUrl,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
