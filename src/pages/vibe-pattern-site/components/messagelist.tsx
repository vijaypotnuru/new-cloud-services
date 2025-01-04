import React, { useEffect, useRef } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface MessageListProps {
    messages: Message[];
    isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-red-300">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user"
                            ? "bg-blue-700 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {message.text}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 max-w-[70%] rounded-lg p-3">
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
    );
};

export default MessageList;

