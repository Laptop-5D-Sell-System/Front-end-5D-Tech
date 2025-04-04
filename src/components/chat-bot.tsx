'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Headset, MessageCircleQuestion, Send } from 'lucide-react';
import axios from 'axios';

export default function ChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: 'assistant', content: 'Xin chào! Tôi có thể giúp gì cho bạn?' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:8888/test-chatbot?text=${encodeURIComponent(input)}&session_id=fixed-session-1234`
            );

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: response.data.mess || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.' },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 z-50">
            {/* Nút mở/đóng chatbot */}
            <Button
                onClick={toggleChat}
                className="cursor-pointer text-xl fixed bottom-4 right-4 bg-red-500 text-white w-[45px] h-[45px] flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 transition"
            >
                <MessageCircleQuestion />
            </Button>

            {/* Chatbot UI */}
            {isChatOpen && (
                <div className="chat-container fixed bottom-3 right-3 w-[300px] h-[400px] bg-white shadow-lg rounded-lg flex flex-col">
                    <div className="chat-header bg-red-500 text-white px-4 py-2 rounded-t-lg flex items-center justify-between">
                        <h3 className="text-sm font-[500] flex gap-2 items-center">
                            <Headset /> Hỗ trợ khách hàng
                        </h3>
                        <div
                            onClick={toggleChat}
                            className="text-white text-lg bg-transparent hover:bg-red-600 rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer transition-all duration-200"
                        >
                            &times;
                        </div>
                    </div>
                    <div className="chat-messages flex-1 overflow-y-auto p-4 text-[14px]">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                <p
                                    className={`inline-block px-4 py-2 rounded-full ${
                                        message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    {message.content}
                                </p>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-left">
                                <p className="inline-block px-4 py-2 rounded-full bg-gray-200 text-black">
                                    Đang trả lời...
                                </p>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="chat-input m-2 p-1 border-t flex items-center border rounded-full text-sm">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    sendMessage();
                                }
                            }}
                            placeholder="Nhập tin nhắn..."
                            className="w-full h-full outline-none px-2"
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={isLoading}
                            className={`flex items-center gap-1 cursor-pointer ${
                                isLoading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                            } text-white w-[80px] h-full rounded-full outline-none text-[14px]`}
                        >
                            Gửi <Send />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}