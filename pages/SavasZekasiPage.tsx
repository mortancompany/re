import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2 group">
        <div className="flex-shrink-0 h-16 w-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500">
            <i className={`${icon} text-3xl text-cyan-400`}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);


const SavasZekasiPage: React.FC = () => {
    return (
        <div className="bg-slate-900 text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.1),rgba(255,255,255,0))] animate-pulse"></div>
                <div className="container mx-auto px-8 relative z-10 text-center">
                    <span className="text-sm font-bold tracking-wider text-cyan-300 bg-cyan-500/20 px-4 py-2 rounded-full uppercase">
                        SAVUNMA SANAYİİ İÇİN STRATEJİK ÜSTÜNLÜK
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight max-w-4xl mx-auto">
                        Mortanas: Türkiye'nin Yerli <br /> <span className="text-cyan-400">Savaş Yapay Zekası</span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-300 max-w-3xl mx-auto">
                        2024’ten beri geliştirdiğimiz yerli savaş ve savunma yapay zekası Mortanas, otonom operasyonlar, ileri strateji algoritmaları ve çok katmanlı istihbarat analiziyle donatıldı. Siber güvenlikten gayrinizami harbe kadar geniş bir yelpazede eğitilen Mortanas, Türkiye’nin teknolojik gücünü yeniden tanımlıyor.
                    </p>
                </div>
            </section>

            {/* Core Capabilities Section */}
            <section className="py-24 bg-black/20">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">Temel Yetenekler</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                            Mortanas, modern savaş alanının gerektirdiği hız ve zekayı sağlamak üzere tasarlandı.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon="fas fa-robot"
                            title="Otonom Operasyonlar"
                            description="İnsan müdahalesini en aza indirerek karmaşık görevleri otonom olarak planlar ve icra eder."
                        />
                        <FeatureCard 
                            icon="fas fa-brain"
                            title="İleri Strateji Algoritmaları"
                            description="Milyarlarca senaryoyu analiz ederek en optimal harekat planını ve stratejiyi saniyeler içinde oluşturur."
                        />
                        <FeatureCard 
                            icon="fas fa-crosshairs"
                            title="Gerçek Zamanlı Analitik"
                            description="Savaş alanından gelen verileri anlık olarak işler, komuta merkezine stratejik içgörüler sunar."
                        />
                        <FeatureCard 
                            icon="fas fa-shield-alt"
                            title="Tehdit Öngörüsü"
                            description="Düşman hareketlerini ve potansiyel tehditleri proaktif olarak analiz eder, erken uyarı sistemleri oluşturur."
                        />
                    </div>
                </div>
            </section>
            
            {/* Intelligence Specializations Section */}
            <section className="py-24">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Çok Katmanlı <span className="text-cyan-400">İstihbarat Analizi</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                            Mortanas, farklı istihbarat disiplinlerinde eğitilerek bütünsel bir durumsal farkındalık sağlar.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="fas fa-shield-virus"
                            title="Siber Güvenlik ve Harp"
                            description="Ağ sızmalarını, siber saldırıları ve dijital tehditleri anlık olarak tespit eder, analiz eder ve karşı operasyonlar için senaryolar geliştirir."
                        />
                        <FeatureCard 
                            icon="fas fa-satellite"
                            title="Görüntü İstihbaratı (IMINT)"
                            description="Uydu ve İHA görüntülerinden elde edilen verileri işleyerek hedef tespiti, arazi analizi ve düşman hareketliliğini raporlar."
                        />
                        <FeatureCard 
                            icon="fas fa-broadcast-tower"
                            title="Sinyal İstihbaratı (SIGINT)"
                            description="Elektronik sinyalleri ve haberleşmeyi analiz ederek düşman konumlarını, niyetlerini ve yeteneklerini ortaya çıkarır."
                        />
                        <FeatureCard 
                            icon="fas fa-user-secret"
                            title="Gayrinizami Harp"
                            description="Asimetrik tehditleri, hibrit savaş taktiklerini ve terör ağlarını modelleyerek operasyonel stratejiler geliştirir."
                        />
                        <FeatureCard 
                            icon="fas fa-microchip"
                            title="Teknik İstihbarat (TECHINT)"
                            description="Düşman silah sistemlerini ve teknolojik yeteneklerini analiz ederek zafiyetleri belirler ve karşı tedbirler önerir."
                        />
                        <FeatureCard 
                            icon="fas fa-users"
                            title="İnsani İstihbarat (HUMINT)"
                            description="Farklı kaynaklardan gelen insan istihbaratı verilerini sentezleyerek daha büyük resmi ortaya çıkarır ve operasyonel doğruluğu artırır."
                        />
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive Section */}
            <section className="py-24 bg-black/20">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                             <div className="absolute -inset-8 bg-cyan-500/10 rounded-full blur-3xl opacity-60"></div>
                             <img src="https://i.imgur.com/5gY5Z5b.png" alt="Yapay Zeka Ağı" className="relative rounded-2xl shadow-2xl" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Teknik <span className="text-cyan-400">Altyapı</span>
                            </h2>
                            <p className="text-slate-300 mb-8">
                               Mortanas'ın gücü, en son yapay zeka teknolojileri ve askeri düzeyde veri setleriyle eğitilmiş sağlam bir mimariden gelmektedir.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start bg-slate-800 p-4 rounded-lg">
                                    <i className="fas fa-cogs text-2xl text-cyan-400 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-lg">Model Mimarisi</h4>
                                        <p className="text-slate-400">140 milyon parametreli Transformer yapısı.</p>
                                    </div>
                                </li>
                                 <li className="flex items-start bg-slate-800 p-4 rounded-lg">
                                    <i className="fas fa-project-diagram text-2xl text-cyan-400 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-lg">Çekirdek Yetenekler</h4>
                                        <p className="text-slate-400">Doğal Dil İşleme (NLP) ve Görüntü Tanıma modülleri.</p>
                                    </div>
                                </li>
                                <li className="flex items-start bg-slate-800 p-4 rounded-lg">
                                    <i className="fas fa-database text-2xl text-cyan-400 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-lg">Eğitim Veri Seti</h4>
                                        <p className="text-slate-400">Simülasyon senaryoları, askeri taktik verileri, siber tehdit kütüphaneleri ve multi-modal istihbarat (görüntü, sinyal, metin) verileri.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24">
                <div className="container mx-auto px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto">
                        Geleceğin Savaş Alanında <br /><span className="text-cyan-400">Stratejik Üstünlük</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                        Mortanas, Türkiye’nin ilk yerli savaş yapay zekası olarak siber uzaydan uydu görüntülerine kadar her alanda tehditleri saniyeler içinde öngörür, her harekâtı kusursuz analiz eder ve en doğru stratejiyi uygular. Otonom ve ölümcül zekâsıyla geleceğin çok alanlı (multi-domain) savaş ortamında stratejik üstünlük sağlayacaktır.
                    </p>
                    <div className="mt-10">
                        <Link to="/kurumsal" className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-700 transition-all transform hover:scale-105 inline-flex items-center space-x-3">
                            <span>Daha Fazla Bilgi İçin İletişime Geçin</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SavasZekasiPage;