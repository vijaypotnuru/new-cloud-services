'use client'

import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from 'react'
import { ArrowUp, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { motion } from 'framer-motion'

interface Message {
  sender: 'user' | 'bot'
  text: string
}

export default function FlowingBtn() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [botMessagesInEnglish, setBotMessagesInEnglish] = useState<Message[]>([])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, isTranslating])

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/917893683143', '_blank')
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { sender: "user", text: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    setIsTyping(true)

    try {
      const res = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })
      const data = await res.json()
      const botResponse = data.response

      const botMessageInEnglish: Message = { sender: "bot", text: botResponse || "No data Found" }
      setBotMessagesInEnglish((prevMessages) => [...prevMessages, botMessageInEnglish])

      let translatedText = botResponse

      if (selectedLanguage !== "en") {
        const response = await fetch("http://127.0.0.1:5000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: botResponse, targetLang: selectedLanguage }),
        })
        const translationData = await response.json()
        translatedText = translationData.translatedText || botResponse
      }

      const botMessage: Message = { sender: "bot", text: translatedText }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Error: Unable to fetch response.",
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === selectedLanguage) return

    setIsTranslating(true)
    setSelectedLanguage(newLanguage)

    try {
      const translatedMessages = await Promise.all(
        botMessagesInEnglish.map(async (message) => {
          const response = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: message.text, targetLang: newLanguage }),
          })
          const data = await response.json()
          return { ...message, text: data.translatedText || message.text }
        })
      )

      const updatedMessages = messages.map((message) => {
        if (message.sender === "bot") {
          const translatedMessage = translatedMessages.shift()
          return translatedMessage || message
        }
        return message
      })

      setMessages(updatedMessages)
    } catch (error) {
      console.error("Error translating messages:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className='fixed bottom-12 right-12 z-50 flex flex-col gap-4'>
      {isVisible && (
        <Button
          variant='outline'
          size='icon'
          className='rounded-full border-2 border-dotted border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground w-12 h-12'
          onClick={scrollToHero}
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-5 w-5' />
        </Button>
      )}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Button
          variant='outline'
          size='icon'
          className='rounded-full bg-green-500 border-none w-14 h-14'
          onClick={openWhatsApp}
          aria-label='Chat on WhatsApp'
        >
          <img src='/images/whatsapp.png' alt='WhatsApp' className='h-10 w-10' />
        </Button>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Button
          variant='outline'
          size='icon'
          className='rounded-full bg-primary border-none w-14 h-14'
          onClick={() => setIsModalOpen(true)}
          aria-label='Chat with Recruit CRM'
        >
          <MessageCircle className='h-8 w-8 text-white' />
        </Button>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[80vh]">
            {isTranslating && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Chat with RECRUIT CRM</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground max-w-[70%] rounded-lg p-3">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
            <div className="border-t p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={selectedLanguage}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleLanguageChange(e.target.value)}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="te">Telugu</option>
                <option value="bn">Bengali</option>
                <option value="ml">Malayalam</option>
                <option value="or">Odia</option>
                <option value="kn">Kannada</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
              </select>
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

