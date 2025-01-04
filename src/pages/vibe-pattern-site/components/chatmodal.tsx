import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/custom/button';
import MessageList from './messagelist';
import ChatInput from './chatinput';


interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    isTyping: boolean;
    onSend: (message: string) => void;
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ChatModal: React.FC<ChatModalProps> = ({
    isOpen,
    onClose,
    messages,
    isTyping,
    onSend,
    selectedLanguage,
    onLanguageChange,
}) => {
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[80vh] max-h-[600px]">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Chat with Our AI Assistant</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <MessageList messages={messages} isTyping={isTyping} />
                <ChatInput
                    onSend={onSend}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={onLanguageChange}
                />
            </div>
        </div>
    );
};

export default ChatModal;

