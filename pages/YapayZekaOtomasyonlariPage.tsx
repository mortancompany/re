import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { AUTOMATION_SOLUTIONS } from '../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const YapayZekaOtomasyonlariPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            {/* Hero Section */}
            <section className="relative pt-36 pb-24 overflow-hidden px-4 border-b border-indigo-500/20">
                {/* Full-bleed Video Background Slider */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="w-full h-full"
                    >
                        {[
                            "https://media.istockphoto.com/id/2175867130/tr/video/3d-animation-of-colorful-branching-neural-network-on-dark-background-visualization-of-complex.mp4?s=mp4-640x640-is&k=20&c=kktBKy4fekxkBlqiXnIu-6V-uhZrUW63TqbtE_8e7VA=",
                            "https://media.istockphoto.com/id/1707385922/tr/video/futuristic-cyber-technology-innovation-artificial-intelligence-concept-brain-over-the-circuit.mp4?s=mp4-640x640-is&k=20&c=q9yhW2WO1bYVm3ZsZgd9srSqsYxv7X96TLuC7KIPfz8=",
                            "https://media.istockphoto.com/id/2217816754/tr/video/big-city-with-internet-connections-the-concept-of-internet-network-and-big-data.mp4?s=mp4-640x640-is&k=20&c=k1QOr40RuW-RtgYPrTod0TcYv6DcEoeiU_1oecTXs3Y="
                        ].map((videoUrl, idx) => (
                            <SwiperSlide key={idx} className="w-full h-full">
                                <video 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline 
                                    className="w-full h-full object-cover opacity-25"
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1731] via-[#0e1731]/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e1731]/30 to-[#0e1731] z-10" />
                </div>

                <div className="max-w-7xl mx-auto relative z-20 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-xs font-bold tracking-[0.25em] text-[#00d2ff] bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-6 py-2.5 rounded-full uppercase mb-8 backdrop-blur-md"
                    >
                        İŞLETMENİZ İÇİN STRATEJİK VERİMLİLİK
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight max-w-5xl mx-auto mb-6"
                    >
                        Mortanas: İşletmenizin <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-blue-400 to-indigo-400">Yapay Zeka Otomasyon Merkezi</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 font-medium text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        2024’ten beri geliştirdiğimiz yerli yapay zeka otomasyon çözümleriyle işletmenizi geleceğe taşıyoruz. Sosyal medyadan müşteri hizmetlerine, operasyonel süreçlerden veri analizine kadar her alanda akıllı otomasyonlarla verimliliğinizi artırıyoruz.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                {/* Automation Grid */}
                <div id="otomasyon-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {AUTOMATION_SOLUTIONS.map((solution, index) => (
                        <motion.div
                            key={solution.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl overflow-hidden hover:border-indigo-400 transition-all duration-500 group flex flex-col justify-between shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] hover:-translate-y-1 relative"
                        >
                            <div className="relative h-32 overflow-hidden shrink-0">
                                <img 
                                    src={solution.imageUrl} 
                                    alt={solution.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] to-transparent opacity-80"></div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between min-h-0">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                                            {solution.name}
                                        </h3>
                                        {solution.socialProof && (
                                            <span className="text-[10px] shrink-0 font-bold bg-[#00d2ff]/10 text-[#00d2ff] px-2.5 py-1 rounded-full border border-[#00d2ff]/30 shadow-sm shadow-[#00d2ff]/15">
                                                {solution.socialProof.count}+ {solution.socialProof.label.split(' ')[0]}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-300 font-medium text-xs md:text-[13px] leading-relaxed line-clamp-2">
                                        {solution.shortDescription || solution.description.substring(0, 110) + "..."}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3.5 border-t border-blue-500/20 flex items-center justify-between">
                                    <Link 
                                        to={`/otomasyon/${solution.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs text-[#00d2ff] font-bold hover:text-white transition-all group/link"
                                    >
                                        Detayları İncele
                                        <i className="fas fa-arrow-right ml-2 text-[10px] transition-transform group-hover/link:translate-x-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 border border-indigo-500/30 rounded-[32px] text-center relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3 relative z-10 uppercase tracking-wide">İhtiyacınıza Özel Çözüm Mü Arıyorsunuz?</h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium mb-8 max-w-2xl mx-auto relative z-10">
                        Uzman ekibimiz, işletmenizin özel ihtiyaçlarını analiz ederek size en uygun yapay zeka otomasyon stratejisini oluşturabilir.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Link 
                            to="/kurumsal#iletisim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 text-sm"
                        >
                            Ücretsiz Analiz İsteyin
                        </Link>
                        <a 
                            href="https://wa.me/905540118888" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
                        >
                            <i className="fab fa-whatsapp text-lg text-green-500"></i>
                            <span>WhatsApp'tan Yazın</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default YapayZekaOtomasyonlariPage;
