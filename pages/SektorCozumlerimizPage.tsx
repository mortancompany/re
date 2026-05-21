import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const SECTOR_ITEMS = [
    { name: 'Otel Çözümlerimiz', path: '/sektorler/otel-cozumlerimiz', icon: 'fas fa-hotel', color: 'text-blue-500', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20', description: 'Otel ve konaklama işletmeleri için uçtan uca dijital dönüşüm.' },
    { name: 'Sağlık Çözümlerimiz', path: '/sektorler/saglik-cozumlerimiz', icon: 'fas fa-heartbeat', color: 'text-rose-500', bg: 'bg-gradient-to-br from-rose-500 to-red-600', shadow: 'shadow-rose-500/20', description: 'Klinik ve hastaneler için akıllı hasta yönetim sistemleri.' },
    { name: 'Eğitim Çözümlerimiz', path: '/sektorler/egitim-cozumlerimiz', icon: 'fas fa-graduation-cap', color: 'text-purple-500', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600', shadow: 'shadow-purple-500/20', description: 'Okul ve kurslar için yapay zeka destekli eğitim yönetim platformu.' },
    { name: 'E-Ticaret Çözümlerimiz', path: '/sektorler/eticaret-cozumlerimiz', icon: 'fas fa-shopping-cart', color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-400 to-amber-600', shadow: 'shadow-orange-500/20', description: 'Online satışlarınızı artıracak akıllı satış ve destek otomasyonları.' },
    { name: 'Otomotiv Çözümlerimiz', path: '/sektorler/otomotiv-cozumlerimiz', icon: 'fas fa-car', color: 'text-slate-400', bg: 'bg-gradient-to-br from-slate-400 to-slate-600', shadow: 'shadow-slate-500/20', description: 'Galeriler ve servisler için dijital müşteri ve portföy takibi.' },
    { name: 'Hukuk Çözümlerimiz', path: '/sektorler/hukuk-cozumlerimiz', icon: 'fas fa-gavel', color: 'text-yellow-500', bg: 'bg-gradient-to-br from-yellow-500 to-amber-600', shadow: 'shadow-yellow-500/20', description: 'Hukuk büroları için müvekkil ve dava yönetim otomasyonları.' },
    { name: 'Restoran Çözümlerimiz', path: '/sektorler/restoran-cozumlerimiz', icon: 'fas fa-utensils', color: 'text-emerald-500', bg: 'bg-gradient-to-br from-emerald-400 to-teal-600', shadow: 'shadow-emerald-500/20', description: 'Restoran ve kafeler için dijital menü ve rezervasyon çözümleri.' },
    { name: 'Fitness Çözümlerimiz', path: '/sektorler/fitness-cozumlerimiz', icon: 'fas fa-dumbbell', color: 'text-pink-500', bg: 'bg-gradient-to-br from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20', description: 'Spor salonları için üye takip ve online ders yönetim sistemleri.' },
    { name: 'Sigorta Çözümlerimiz', path: '/sektorler/sigorta-cozumlerimiz', icon: 'fas fa-shield-alt', color: 'text-sky-500', bg: 'bg-gradient-to-br from-sky-400 to-cyan-600', shadow: 'shadow-sky-500/20', description: 'Acenteler için poliçe sorgulama ve müşteri takip otomasyonları.' },
    { name: 'Güzellik Salonu Çözümlerimiz', path: '/sektorler/guzellik-salonu-cozumlerimiz', icon: 'fas fa-magic', color: 'text-indigo-400', bg: 'bg-gradient-to-br from-indigo-400 to-violet-600', shadow: 'shadow-indigo-500/20', description: 'Güzellik merkezleri için akıllı randevu ve personel yönetimi.' },
    { name: 'Diyetisyen Çözümlerimiz', path: '/sektorler/diyetisyen-cozumlerimiz', icon: 'fas fa-apple-alt', color: 'text-green-500', bg: 'bg-gradient-to-br from-green-400 to-emerald-600', shadow: 'shadow-green-500/20', description: 'Beslenme uzmanları için dijital danışan takibi ve randevu yönetimi.' },
    { name: 'Emlakçı Çözümlerimiz', path: '/sektorler/emlakci-cozumlerimiz', icon: 'fas fa-home', color: 'text-cyan-500', bg: 'bg-gradient-to-br from-cyan-400 to-blue-600', shadow: 'shadow-cyan-500/20', description: 'Gayrimenkul ofisleri için akıllı portföy ve müşteri yönetim sistemi.' },
];

const HERO_VIDEOS = [
    "https://media.istockphoto.com/id/638169520/tr/video/d%C3%BCnyadan-uzakla%C5%9Ft%C4%B1rmak.mp4?s=mp4-640x640-is&k=20&c=urlDn6MnQH2WmtsRGTeGv4WNVSxXTakcQAFX-WQWkf8=",
    "https://media.istockphoto.com/id/2199601251/tr/video/digital-world-map-background-4k-stock-video.mp4?s=mp4-640x640-is&k=20&c=YO5CH3M6pyHiz9mw33dSgqCpI5j4ZnD4ybMaDUF2f9w=",
    "https://media.istockphoto.com/id/1359108155/tr/video/company-operations-manager-holds-meeting-presentation-for-a-team-of-economists-adult-male.mp4?s=mp4-640x640-is&k=20&c=q54UmX8bkTyX5ZyxH6lHZUQMYdicRYNeDMJO_5ZWkec=",
    "https://media.istockphoto.com/id/1154935459/tr/video/insan-kaynaklar%C4%B1.mp4?s=mp4-640x640-is&k=20&c=CCUKoT9uV8YeTpiMj8oke0YVltTs3wGsNHCBVCH2mYc=",
    "https://media.istockphoto.com/id/2210598775/tr/video/social-media-marketing-digital-display-advertisement-engagement-post-structure-scrolling.mp4?s=mp4-640x640-is&k=20&c=2C5byfT4_jZnplrDWEjnPA8YN31jJbeYvkA0TPwgvi8="
];

const SektorCozumlerimizPage: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
        }, 5000); // Change video every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 selection:text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden px-4 md:px-8 z-10 w-full">
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3 py-1.5 rounded-full uppercase mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            SEKTÖREL DİJİTAL DÖNÜŞÜM LİDERİ
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tight"
                        >
                            Mortanas: Sektörünüz İçin <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                                Özelleştirilmiş Yapay Zeka Çözümleri
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-medium"
                        >
                            Her sektörün kendine özgü dinamiklerini anlayarak geliştirdiğimiz yapay zeka çözümleriyle rakiplerinizin önüne geçmenizi sağlıyoruz. Otelden sağlığa, eğitimden e-ticarete kadar geniş bir yelpazede işletmenize özel akıllı sistemler sunuyoruz.
                        </motion.p>
                    </div>

                    {/* Video Slider Area */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] border-2 border-slate-800/80 group transform lg:rotate-2 md:hover:rotate-0 transition-transform duration-700 mx-auto max-w-lg lg:max-w-none">
                        <div className="absolute inset-0 bg-slate-900 z-0"></div>
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={currentVideoIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1 }}
                                src={HERO_VIDEOS[currentVideoIndex]}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover z-10"
                            />
                        </AnimatePresence>
                        
                        {/* Elegant overlay gradient */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        
                        {/* Slider Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 p-2 bg-slate-950/40 backdrop-blur-md rounded-full border border-white/10">
                            {HERO_VIDEOS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentVideoIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        idx === currentVideoIndex ? 'bg-blue-400 w-6' : 'bg-slate-400/50 hover:bg-slate-300'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#071029] via-[#0B1F4D] to-[#172554] pt-10">
                <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none"></div>
                
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                    {/* Sectors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
                    {SECTOR_ITEMS.map((sector, index) => (
                        <motion.div
                            key={sector.path}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="h-full"
                        >
                            <Link 
                                to={sector.path}
                                className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-2xl border-2 border-slate-800/80 rounded-3xl p-5 lg:p-6 hover:border-blue-500/40 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                
                                <div className={`w-12 h-12 ${sector.bg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg ${sector.shadow} relative z-10 border border-white/10`}>
                                    <i className={`${sector.icon} text-xl text-white drop-shadow-md`}></i>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors relative z-10">
                                    {sector.name}
                                </h3>
                                <p className="text-slate-400 text-sm leading-snug mb-5 flex-grow font-medium relative z-10">
                                    {sector.description}
                                </p>
                                
                                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-blue-400 transition-colors duration-300 relative z-10">
                                    Çözümü İncele
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 ml-3 group-hover:bg-blue-500/20 group-hover:text-blue-400 border border-slate-700 group-hover:border-blue-500/30 transition-all duration-300">
                                        <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5"></i>
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Banner */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-indigo-950/80 border-2 border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col lg:flex-row items-center justify-between gap-10"
                >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 bg-grid-white/[0.015] pointer-events-none"></div>

                    <div className="lg:max-w-2xl text-center lg:text-left relative z-10">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Mevcut Yazılımlarınızla Tam Entegrasyon</h2>
                        <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                            Mortanas çözümleri, kullandığınız mevcut CRM, ERP ve diğer iş yönetim yazılımlarıyla (API üzerinden) sorunsuz bir şekilde konuşabilir. Dijital dönüşüm için sistemlerinizi yenilemenize gerek yok, biz onları akıllandırıyoruz.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
                        <Link 
                            to="/kurumsal#iletisim"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-center text-sm shadow-lg shadow-blue-500/25 border border-white/10"
                        >
                            Hemen Görüşelim
                        </Link>
                        <Link 
                            to="/entegrasyonlar"
                            className="bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md text-white border border-slate-600 px-8 py-3.5 rounded-xl font-bold transition-all text-center text-sm"
                        >
                            Entegrasyonları Gör
                        </Link>
                    </div>
                </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SektorCozumlerimizPage;
