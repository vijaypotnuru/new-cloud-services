import { Button } from '@/components/custom/button';
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, selectedLanguage, onLanguageChange }) => {
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <Button className='bg-blue-700 text-white' onClick={handleSend}>Send</Button>
        </div>
    );
};

export default ChatInput;

