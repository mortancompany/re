import React from 'react';
import { Link } from 'react-router-dom';

const YapayZekaTanitimPage: React.FC = () => {
    return (
        <div className="bg-slate-900 text-white">
            <div className="container mx-auto px-8 py-24">
                <div className="text-center">
                    <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-4 py-2 rounded-full">
                        YAPAY ZEKA TANITIM SUNUMU
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
                        İşletmenizin Geleceği: <br className="hidden md:inline" /> <span className="text-blue-400">Yapay Zeka ile Dönüşüm</span>
                    </h1>
                    <p className="mt-6 text-lg text-blue-200 max-w-3xl mx-auto">
                        Mortanas Company'nin yapay zeka çözümlerinin işletmenizi nasıl bir sonraki seviyeye taşıyabileceğini keşfedin. Size özel hazırladığımız interaktif sunumla, potansiyelinizi ortaya çıkarın.
                    </p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                        <img src="https://i.imgur.com/5gY5Z5b.png" alt="Yapay Zeka Sunumu" className="absolute top-0 left-0 w-full h-full object-cover" />
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold">Özel Sunum Talebi</h2>
                        <p className="mt-2 text-slate-300">
                            Aşağıdaki butona tıklayarak, uzman ekibimizin işletmenizin ihtiyaçlarına özel olarak hazırlayacağı canlı bir yapay zeka tanıtım sunumu talep edebilirsiniz. Sunumda, otomasyon çözümlerimizin iş akışlarınıza nasıl entegre edileceğini ve yatırım getirisini (ROI) nasıl maksimize edeceğinizi detaylı olarak göreceksiniz.
                        </p>
                        <div className="mt-6">
                            <Link 
                                to="/kurumsal#iletisim" 
                                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                            >
                                <i className="fas fa-calendar-check"></i>
                                <span>Canlı Sunum Talep Et</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-3xl font-bold">Sunumda Neler Var?</h3>
                    <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <i className="fas fa-cogs text-3xl text-blue-400 mb-4"></i>
                            <h4 className="font-bold text-xl mb-2">Sektörel Otomasyonlar</h4>
                            <p className="text-slate-400 text-sm">Sizin sektörünüze özel otomasyon çözümleri ve başarı hikayeleri.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <i className="fas fa-chart-line text-3xl text-blue-400 mb-4"></i>
                            <h4 className="font-bold text-xl mb-2">Verimlilik Analizi</h4>
                            <p className="text-slate-400 text-sm">Mevcut süreçlerinizdeki verimlilik potansiyelinin analizi ve AI ile kazanımlar.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <i className="fas fa-road text-3xl text-blue-400 mb-4"></i>
                            <h4 className="font-bold text-xl mb-2">Yol Haritası</h4>
                            <p className="text-slate-400 text-sm">İşletmenize özel, adım adım uygulanabilir bir dijital dönüşüm yol haritası.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YapayZekaTanitimPage;
