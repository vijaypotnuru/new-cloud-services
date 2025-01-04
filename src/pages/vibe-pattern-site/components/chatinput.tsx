import { Button } from '@/components/custom/button';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';


interface ChatInputProps {
    onSend: (message: string) => void;
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, selectedLanguage, onLanguageChange }) => {
    const [input, setInput] = useState<string>("");

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t p-4 flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
                <select
                    value={selectedLanguage}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onLanguageChange(e.target.value)}
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
        </div>
    );
};

export default ChatInput;

