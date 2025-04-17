"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send } from "lucide-react"
import { useLanguage } from "./language-provider"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  audioUrl?: string
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  // Initialize AudioContext
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  // Set initial greeting message with proper translation
  useEffect(() => {
    const greetings: Record<string, string> = {
      english: "Hello! I'm your health insurance assistant. How can I help you today?",
      hindi: "नमस्ते! मैं आपका स्वास्थ्य बीमा सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
      tamil: "வணக்கம்! நான் உங்கள் சுகாதார காப்பீட்டு உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      telugu: "నమస్కారం! నేను మీ ఆరోగ్య బీమా సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను?",
      bengali: "নমস্কার! আমি আপনার স্বাস্থ্য বীমা সহায়ক। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      marathi: "नमस्कार! मी आपला आरोग्य विमा सहाय्यक आहे. मी आपली कशी मदत करू शकतो?",
      gujarati: "નમસ્તે! હું તમારો આરોગ્ય વીમા સહાયક છું. હું તમને કેવી રીતે મદદ કરી શકું?",
      kannada: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಆರೋಗ್ಯ ವಿಮೆ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      malayalam: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ആരോഗ്യ ഇൻഷുറൻസ് സഹായി ആണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?",
      punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਸਿਹਤ ਬੀਮਾ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
    };

    const greetingText = greetings[language] || greetings.english;
    
    // First set the text-only greeting
    setMessages([{
      id: "1",
      text: greetingText,
      sender: "bot",
      timestamp: new Date(),
    }]);
    
    // Wait until audio context is initialized before trying to play audio
    if (!audioContext) return;
    
    // Get the audio for the greeting using a simpler method
    const getGreetingAudio = async () => {
      try {
        // First try to get the audio from the API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: "greeting", 
            language,
            text: greetingText
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.audioUrl) {
            // Update the message with the audio URL
            setMessages([{
              id: "1",
              text: greetingText,
              sender: "bot",
              timestamp: new Date(),
              audioUrl: data.audioUrl
            }]);
            
            // Add a small delay before trying to play
            setTimeout(() => {
              // This is a more reliable way to play audio with better error handling
              playAudio(data.audioUrl);
            }, 500);
          }
        }
      } catch (error) {
        console.error("Error getting greeting audio:", error);
        // Continue without audio if there's an error
      }
    };
    
    // Small delay to ensure everything is ready
    const timer = setTimeout(() => {
      getGreetingAudio();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [language, audioContext]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Play audio from base64 data
  const playAudio = async (audioData: string) => {
    if (!audioContext) {
      console.error('AudioContext not initialized');
      return;
    }

    try {
      setIsSpeaking(true);
      console.log('Attempting to play audio');
      
      // Create a simple Audio element 
      const audio = new Audio();
      
      // Add event listeners
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio can play through, starting playback');
        audio.play().catch(e => {
          console.error('Error during audio play:', e);
          setIsSpeaking(false);
        });
      });
      
      audio.addEventListener('ended', () => {
        console.log('Audio playback completed');
        setIsSpeaking(false);
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error event:', e);
        setIsSpeaking(false);
        // Try fallback if needed
        fallbackPlayAudio(audioData);
      });
      
      // Set source and load
      audio.src = audioData;
      
      // Fallback timeout in case events don't fire
      setTimeout(() => {
        if (isSpeaking) {
          console.log('Timeout reached, resetting speaking state');
          setIsSpeaking(false);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error in playAudio function:', error);
      setIsSpeaking(false);
    }
  };
  
  // Fallback method using AudioContext
  const fallbackPlayAudio = async (audioData: string) => {
    if (!audioContext) return;
    
    try {
      const response = await fetch(audioData);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      source.onended = () => {
        console.log('AudioContext playback ended');
        setIsSpeaking(false);
      };
      
      source.start(0);
      console.log('AudioContext playback started');
      
      // Safety timeout to ensure isSpeaking is reset
      setTimeout(() => {
        setIsSpeaking(false);
      }, 10000);
    } catch (error) {
      console.error('Fallback audio playback error:', error);
      setIsSpeaking(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    try {
      // Get bot response with audio from chat API
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, language }),
      })

      if (!chatResponse.ok) {
        throw new Error(`Chat API returned status ${chatResponse.status}`);
      }

      const chatData = await chatResponse.json()

      // Handle error field returned by API
      if (chatData.error) {
        throw new Error(chatData.error);
      }

      // Check if text was returned (required field)
      if (!chatData.text) {
        throw new Error('No text response received from chat API');
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: chatData.text,
        sender: "bot",
        timestamp: new Date(),
        audioUrl: chatData.audioUrl, // This might be null, which is fine
      }

      setMessages((prev) => [...prev, botMessage])
      
      // Automatically play the audio response if available
      if (chatData.audioUrl) {
        // Short delay before playing to allow UI to update
        setTimeout(() => {
          playAudio(chatData.audioUrl);
        }, 300);
      }
    } catch (error) {
      console.error('Error processing message:', error)
      // Add error message to chat
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle voice recording
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        const audioChunks: BlobPart[] = []

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
        }

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
          const formData = new FormData()
          formData.append('audio', audioBlob)
          formData.append('language', language)

          try {
            // Here you would send the audio to a speech-to-text service
            // For now, we'll just simulate it
            setInput("I want to know more about health insurance plans for my family")
            setIsRecording(false)
          } catch (error) {
            console.error('Error processing voice input:', error)
            setIsRecording(false)
          }
        }

        mediaRecorder.start()
        setIsRecording(true)

        // Stop recording after 10 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop()
            stream.getTracks().forEach(track => track.stop())
          }
        }, 10000)
      } catch (error) {
        console.error('Error starting recording:', error)
        setIsRecording(false)
      }
    } else {
      setIsRecording(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p>{message.text}</p>
              {message.sender === "bot" && message.audioUrl && message.id === messages[messages.length - 1]?.id && isSpeaking && (
                <div className="flex items-center mt-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></span>
                  <span className="text-xs text-blue-500">Speaking...</span>
                </div>
              )}
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleRecording} 
            className={isRecording ? "bg-red-100 animate-pulse" : ""}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isRecording ? "Listening... (powered by ElevenLabs)" : "Press the microphone to speak in your language"}
        </p>
      </div>
    </div>
  )
}
