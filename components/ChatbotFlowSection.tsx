import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Message {
    sender: 'user' | 'bot';
    message: string;
}

interface ChatbotFlowSectionProps {
    title: string;
    subtitle: string;
    qrCodeUrl: string;
    conversation: Message[];
    themeColor?: 'blue' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange';
}

const ChatbotFlowSection: React.FC<ChatbotFlowSectionProps> = ({ title, subtitle, qrCodeUrl, conversation, themeColor = 'blue' }) => {
    
    const themeClasses = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-300' },
        green: { bg: 'bg-green-600', text: 'text-green-300' },
        pink: { bg: 'bg-pink-600', text: 'text-pink-300' },
        purple: { bg: 'bg-purple-600', text: 'text-purple-300' },
        cyan: { bg: 'bg-cyan-600', text: 'text-cyan-300' },
        orange: { bg: 'bg-orange-600', text: 'text-orange-300' },
    };
    const currentTheme = themeClasses[themeColor];

    const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    // FIX: Changed NodeJS.Timeout to number as setTimeout in browsers returns a number.
    const timeoutsRef = useRef<number[]>([]);

    const stopAnimation = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setDisplayedMessages([]);
        setIsBotTyping(false);
    };

    const startAnimation = () => {
        stopAnimation(); // Reset first
        let delay = 500;

        conversation.forEach((msg) => {
            const timeout = setTimeout(() => {
                if (msg.sender === 'bot') {
                    setIsBotTyping(true);
                    const typingTimeout = setTimeout(() => {
                        setIsBotTyping(false);
                        setDisplayedMessages(prev => [...prev, msg]);
                    }, 1200); // Typing indicator duration
                    timeoutsRef.current.push(typingTimeout);
                } else {
                    setDisplayedMessages(prev => [...prev, msg]);
                }
            }, delay);
            timeoutsRef.current.push(timeout);
            delay += msg.sender === 'bot' ? 2500 : 1500; // Add more delay for bot messages
        });
        
        // Loop animation
        const loopTimeout = setTimeout(startAnimation, delay + 3000); // Wait 3 seconds before looping
        timeoutsRef.current.push(loopTimeout);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            stopAnimation(); // Cleanup on unmount
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation]); // Rerun if conversation prop changes

    return (
        <section ref={sectionRef} className="container mx-auto px-8">
             <style>
                {`
                    @keyframes bubble-in {
                      0% { opacity: 0; transform: scale(0.8) translateY(10px); }
                      100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .message-bubble {
                      animation: bubble-in 0.4s ease-out forwards;
                      transform-origin: bottom;
                    }
                    @keyframes typing-dot {
                      0% { transform: translateY(0); }
                      25% { transform: translateY(-4px); }
                      50% { transform: translateY(0); }
                      100% { translateY(0); }
                    }
                    .typing-dot {
                        animation: typing-dot 1.2s infinite ease-in-out;
                    }
                `}
            </style>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className={currentTheme.text}>{title}</span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-8">{subtitle}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-32 h-32" />
                        </div>
                        <div>
                            <p className="font-semibold mb-3">Veya sosyal medyadan deneyin:</p>
                            <div className="flex justify-center lg:justify-start gap-6">
                                <a href="#" aria-label="WhatsApp'ta Dene" className="text-center group"><i className="fab fa-whatsapp text-4xl text-green-500 group-hover:scale-110 transition-transform"></i></a>
                                <a href="#" aria-label="Instagram'da Dene" className="text-center group"><i className="fab fa-instagram text-4xl text-pink-500 group-hover:scale-110 transition-transform"></i></a>
                                <a href="#" aria-label="Facebook'ta Dene" className="text-center group"><i className="fab fa-facebook-messenger text-4xl text-blue-500 group-hover:scale-110 transition-transform"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-700 max-w-sm mx-auto w-full">
                    <div className="w-full h-[550px] flex flex-col bg-slate-900 rounded-[2rem] overflow-hidden relative">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl border-x-4 border-b-4 border-slate-700 z-20"></div>

                        <div className="flex-shrink-0 flex items-center p-4 border-b border-slate-700 pt-8 z-10">
                            <div className="relative">
                                <i className="fas fa-robot text-3xl text-blue-400 p-2 bg-slate-800 rounded-full"></i>
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-slate-900"></span>
                            </div>
                            <div className="ml-3">
                                <p className="font-bold text-white">Mortanas AI</p>
                                <p className="text-xs text-green-400">Online</p>
                            </div>
                        </div>

                        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {displayedMessages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-bubble`}>
                                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><i className="fas fa-robot text-slate-400"></i></div>}
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? `${currentTheme.bg} text-white rounded-br-lg` : 'bg-slate-700 text-slate-200 rounded-bl-lg'}`}>
                                        {msg.message}
                                    </div>
                                </div>
                            ))}
                            {isBotTyping && (
                                <div className="flex items-end gap-2 justify-start message-bubble">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><i className="fas fa-robot text-slate-400"></i></div>
                                    <div className="px-4 py-3 rounded-2xl bg-slate-700 rounded-bl-lg flex items-center space-x-1.5">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" style={{animationDelay: '0s'}}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-shrink-0 p-3 border-t border-slate-700">
                            <div className="w-full bg-slate-700 rounded-full h-10 flex items-center px-4 text-slate-500 text-sm">
                                Bir mesaj yaz...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatbotFlowSection;
