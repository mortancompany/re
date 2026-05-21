import React, { useState } from 'react';
import { HOME_FAQS } from '../constants';
import { motion } from 'motion/react';

const FaqPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900/90 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-sm font-bold tracking-wider text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full uppercase mb-4 inline-block">
                            DESTEK MERKEZİ
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
                            Sıkça Sorulan <span className="text-blue-400">Sorular</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                            Yapay zeka otomasyonları, süreçlerimiz ve hizmetlerimiz hakkında aklınıza takılan tüm soruları burada yanıtladık.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Left Column */}
                    <div className="space-y-4 md:space-y-6">
                        {HOME_FAQS.slice(0, 10).map((faq, index) => (
                            <motion.div
                                key={`left-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15"
                            >
                                <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <button
                                    onClick={() => handleFaqClick(index)}
                                    className="w-full flex justify-between items-center text-left py-3 px-4 md:py-4 md:px-5 relative z-10"
                                    aria-expanded={openFaqIndex === index}
                                >
                                    <span className="font-bold text-base md:text-md text-white pr-4">{faq.question}</span>
                                    <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${openFaqIndex === index ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-300 group-hover:bg-slate-700'}`}>
                                        <i className={`fas transition-transform duration-300 text-xs ${openFaqIndex === index ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                                    </div>
                                </button>
                                <div
                                    className={`grid transition-all duration-500 ease-in-out relative z-10 ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-4 md:px-5 md:pb-5 text-slate-300 leading-relaxed text-sm border-t border-blue-500/20 pt-3">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4 md:space-y-6">
                        {HOME_FAQS.slice(10, 20).map((faq, index) => {
                            const globalIndex = index + 10;
                            return (
                                <motion.div
                                    key={`right-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (index + 10) * 0.05 }}
                                    className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15"
                                >
                                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none"></div>
                                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <button
                                        onClick={() => handleFaqClick(globalIndex)}
                                        className="w-full flex justify-between items-center text-left py-3 px-4 md:py-4 md:px-5 relative z-10"
                                        aria-expanded={openFaqIndex === globalIndex}
                                    >
                                        <span className="font-bold text-base md:text-md text-white pr-4">{faq.question}</span>
                                        <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${openFaqIndex === globalIndex ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-300 group-hover:bg-slate-700'}`}>
                                            <i className={`fas transition-transform duration-300 text-xs ${openFaqIndex === globalIndex ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                                        </div>
                                    </button>
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out relative z-10 ${openFaqIndex === globalIndex ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-4 pb-4 md:px-5 md:pb-5 text-slate-300 leading-relaxed text-sm border-t border-blue-500/20 pt-3">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Contact CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center bg-slate-800/30 p-10 rounded-3xl border border-slate-700 max-w-3xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Aradığınız cevabı bulamadınız mı?</h3>
                    <p className="text-slate-400 mb-8">Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
                    <a 
                        href="https://wa.me/905540118888" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-blue-500/20 inline-flex items-center space-x-3"
                    >
                        <i className="fab fa-whatsapp text-xl"></i>
                        <span>Bize WhatsApp'tan Yazın</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default FaqPage;
