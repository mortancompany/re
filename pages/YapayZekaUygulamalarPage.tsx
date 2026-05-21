import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { APPLICATIONS } from '../constants';

const YapayZekaUygulamalarPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden px-4 border-b border-white/10">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.15),rgba(255,255,255,0))] animate-pulse"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-sm font-bold tracking-widest text-[#00d2ff] bg-[#00d2ff]/10 px-6 py-2 rounded-full uppercase mb-8"
                    >
                        MÜŞTERİ İLİŞKİLERİNDE YAPAY ZEKA GÜCÜ
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl mx-auto mb-8"
                    >
                        Mortanas: Sektöre Özel <br /> <span className="text-[#00d2ff]">Yapay Zeka CRM Uygulamaları</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        İşletmenizin müşteri yönetim süreçlerini akıllı CRM uygulamalarımızla dijitalleştiriyoruz. Veri odaklı analizler, otonom müşteri takibi ve akıllı segmentasyon özellikleriyle satışlarınızı ve müşteri memnuniyetinizi en üst seviyeye çıkarıyoruz.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
                {/* Applications Grid */}
                <div id="uygulamalar-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {APPLICATIONS.map((app, index) => (
                        <motion.div
                            key={app.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={app.imageUrl} 
                                    alt={app.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {app.sector}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {app.name}
                                </h3>
                                <p className="text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {app.description}
                                </p>
                                <Link 
                                    to={`/uygulamalar/${app.slug}`}
                                    className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group/link"
                                >
                                    Uygulamayı İncele
                                    <i className="fas fa-arrow-right ml-2 transition-transform group-hover/link:translate-x-1"></i>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/20 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">İşletmenizi Dijitalleştirin</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
                        Mortanas CRM uygulamaları, sadece bir veri tabanı değil; işletmenizin büyümesine yardımcı olan akıllı bir asistandır.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Link 
                            to="/kurumsal#iletisim"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                        >
                            Demo Talep Edin
                        </Link>
                        <a 
                            href="tel:+905540118888" 
                            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                        >
                            <i className="fas fa-phone-alt text-xl text-blue-500"></i>
                            <span>Bizi Arayın</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default YapayZekaUygulamalarPage;
