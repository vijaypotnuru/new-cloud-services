//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'

import { motion } from 'framer-motion'
import { Button } from '@/components/custom/button'
import ChatModal from './chatmodal'


interface Message {
  sender: 'user' | 'bot'
  text: string
}

export default function FlowingBtn() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
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

  const scrollToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/910449738637', '_blank')
  }

  const handleSend = async (input: string) => {
    const userMessage: Message = { sender: "user", text: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])

    setIsTyping(true)

    try {
      const res = await fetch("api/query", {
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
        const response = await fetch("api/translate", {
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

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === selectedLanguage) return

    setSelectedLanguage(newLanguage)

    try {
      const translatedMessages = await Promise.all(
        botMessagesInEnglish.map(async (message) => {
          const response = await fetch("api/translate", {
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
    }
  }

  return (
    <div className='fixed bottom-4 right-4 sm:bottom-12 sm:right-12 z-50 flex flex-col gap-4'>
      {isVisible && (
        <Button
          variant='outline'
          size='icon'
          className='rounded-full border-2 border-dotted border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground w-10 h-10 sm:w-12 sm:h-12'
          onClick={scrollToHero}
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-4 w-4 sm:h-5 sm:w-5' />
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
          className='rounded-full bg-green-500 border-none w-12 h-12 sm:w-14 sm:h-14'
          onClick={openWhatsApp}
          aria-label='Chat on WhatsApp'
        >
          <img src='/images/whatsapp.png' alt='WhatsApp' className='h-8 w-8 sm:h-10 sm:w-10' />
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
          className='rounded-full bg-primary border-none w-12 h-12 sm:w-14 sm:h-14'
          onClick={() => setIsModalOpen(true)}
          aria-label='Chat with Recruit CRM'
        >
          <MessageCircle className='h-6 w-6 sm:h-8 sm:w-8 text-white' />
        </Button>
      </motion.div>

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSend={handleSend}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  )
}

