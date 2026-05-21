import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AiWebPricingSection from '../components/AiWebPricingSection';
import type { FAQ } from '../types';

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-start text-left p-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-300">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};


const FeatureCard: React.FC<{ icon: string; title: string; description: string; color?: 'blue' | 'green' }> = ({ icon, title, description, color = 'blue' }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
        green: { bg: 'bg-green-500/10', text: 'text-green-400' },
    };
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full border border-slate-700">
            <div className={`flex-shrink-0 h-16 w-16 ${colorClasses[color].bg} rounded-xl flex items-center justify-center mb-5`}>
                <i className={`${icon} ${colorClasses[color].text} text-3xl`}></i>
            </div>
            <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
            <p className="text-slate-300">{description}</p>
        </div>
    );
};

const ProblemSolutionCard: React.FC<{ problem: string; solution: string; }> = ({ problem, solution }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-700">
        <div className="p-6">
            <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                </div>
                <h4 className="font-bold text-lg text-red-400">Sorun</h4>
            </div>
            <p className="text-slate-300">{problem}</p>
        </div>
        <div className="bg-green-900/20 p-6 border-t border-green-500/30">
             <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check-circle text-green-400"></i>
                </div>
                <h4 className="font-bold text-lg text-green-400">Çözüm</h4>
            </div>
            <p className="text-slate-200 font-medium">{solution}</p>
        </div>
    </div>
);


const FomoSection: React.FC = () => (
    <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-3xl opacity-40"></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
                <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">
                    Rekabette Öne Geçin
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                    Dijital Dönüşümü Ertelemeyin
                </h2>
                <p className="mt-6 text-lg text-slate-300">
                    Otelcilik sektörü dijitalleşirken, harekete geçmemek pazar payı ve kârlılık kaybetmek anlamına gelir. İşte yapay zeka entegrasyonunun somut etkileri:
                </p>
                <Link to="/kurumsal" className="mt-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                    <span>Hemen Harekete Geçin</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
            {/* Right: Stats */}
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">66%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Fazla Rezervasyon</h3>
                        <p className="text-slate-300 text-sm">Her 3 misafirden 2'si, kişiselleştirilmiş teklifler sunan sitelerden rezervasyon yapmayı tercih ediyor.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">35%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Yüksek Kârlılık</h3>
                        <p className="text-slate-300 text-sm">Akıllı otomasyon kullanan oteller, OTA komisyonlarından kurtularak doğrudan rezervasyonlarını ortalama %35 artırıyor.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">24/7</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Kesintisiz Hizmet</h3>
                        <p className="text-slate-300 text-sm">AI konsiyerj ile hiçbir potansiyel misafiri veya talebi kaçırmayın.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const AiHotelSitePage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs: FAQ[] = [
        { 
            question: "Yapay Zeka Web Sitesi tam olarak ne işe yarar?",
            answer: "Geleneksel bir web sitesinin ötesinde, misafirlerinizle 7/24 sohbet eden, onlara özel teklifler sunan ve doğrudan rezervasyon alarak sizi OTA komisyonlarından kurtaran akıllı bir platformdur."
        },
        { 
            question: "Mevcut rezervasyon sistemimle (PMS) entegre olabilir mi?",
            answer: "Evet, platformumuz Elektra, Opera gibi birçok popüler PMS ve kanal yöneticisi ile tam entegre çalışarak oda müsaitliğini ve rezervasyonları anlık olarak senkronize eder."
        },
        { 
            question: "Kurulum ve yayına alma süreci ne kadar sürer?",
            answer: "Anahtar teslim projemiz, mevcut sistemlerinizle entegrasyon ve yapay zekanın otel verilerinizle eğitimi dahil olmak üzere ortalama 5-7 iş günü içinde tamamlanır."
        },
        { 
            question: "AI Konsiyerj hangi dilleri destekliyor?",
            answer: "Asistanımız, Türkçe ve İngilizce başta olmak üzere Almanca, Rusça, Arapça gibi 10'dan fazla dilde hizmet vererek uluslararası misafirlerinize kendi dillerinde destek olur."
        },
        { 
            question: "Fiyatlandırmaya hosting ve alan adı dahil mi?",
            answer: "Evet, seçtiğiniz pakete göre abonelik süreniz boyunca güvenli hosting, SSL sertifikası ve alan adı hizmetleri fiyata dahildir. Hiçbir teknik detayla uğraşmanıza gerek kalmaz."
        },
        { 
            question: "Web sitesinin tasarımını kendi markama göre özelleştirebilir miyim?",
            answer: "Kesinlikle. Kurulum aşamasında, web sitenizin renklerini, logosunu ve genel tasarımını otelinizin kurumsal kimliğine tam uyumlu hale getiriyoruz."
        },
        { 
            question: "Raporlama ve analiz özellikleri nelerdir?",
            answer: "Yönetim panelinizden, web sitesi trafiği, en çok sorulan sorular, chatbot dönüşüm oranları ve doğrudan rezervasyon gelirleri gibi birçok kritik veriye anlık olarak ulaşabilirsiniz."
        }
    ];

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent("Merhaba, Yapay Zeka Otel Sitesi hakkında bilgi almak istiyorum.")}`;
    const aiConciergeFeatures = [
        { icon: "fas fa-bolt", title: "Anında Rezervasyon", description: "Oda müsaitliği sorar, en iyi fiyatı sunar ve rezervasyonu saniyeler içinde tamamlar." },
        { icon: "fas fa-concierge-bell", title: "Oda Servisi & Talep Yönetimi", description: "Misafirleriniz web sitenizden ayrılmadan havlu, yastık isteyebilir veya oda servisi siparişi verebilir." },
        { icon: "fas fa-map-location-dot", title: "Akıllı Bölge Rehberi", description: "Yakındaki restoranlar, gezilecek yerler veya ulaşım seçenekleri hakkında anında bilgi verir." },
        { icon: "fas fa-language", title: "Çok Dilli Destek", description: "Yabancı misafirlerinizle kendi dillerinde akıcı bir şekilde iletişim kurarak global müşteri kitlenizi genişletir." },
        { icon: "fas fa-star-half-alt", title: "Anlık Geri Bildirim Toplama", description: "Konaklama sonrası misafir memnuniyetini ölçmek için sohbet üzerinden anket yapar ve yorumları analiz eder." },
        { icon: "fas fa-arrow-up-right-dots", title: "Upsell & Cross-sell", description: "Spa randevusu, restoran rezervasyonu veya tur paketi gibi ek hizmetleri proaktif olarak önererek misafir başına geliri artırır." }
    ];
    const howItWorksSteps = [
        {
            icon: 'fa-plug',
            title: '1. Entegrasyon & Kurulum',
            description: 'Mevcut Otel Yönetim Sisteminizi (PMS), kanal yöneticinizi ve ödeme altyapınızı platformumuza sorunsuzca bağlıyoruz.'
        },
        {
            icon: 'fa-brain',
            title: '2. AI Eğitimi & Kişiselleştirme',
            description: 'Yapay zekayı, otelinizin kimliği, oda tipleri, fiyatlandırma stratejisi ve misafir profiliyle eğitiyoruz. Web siteniz markanızın dilini konuşmaya başlıyor.'
        },
        {
            icon: 'fa-rocket',
            title: '3. Aktivasyon & Büyüme',
            description: 'Akıllı web siteniz yayına alınır. İlk günden itibaren komisyonsuz rezervasyon almaya, misafir verisi toplamaya ve gelirinizi artırmaya başlarsınız.'
        },
    ];

    return (
        <div className="bg-slate-900 text-slate-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">YAPAY ZEKA WEB SİTESİ</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                                Misafir Deneyimini Zirveye Taşıyan <span className="text-blue-400">Akıllı Otel Siteniz</span>
                            </h1>
                            <p className="mt-6 text-lg text-blue-200">
                                Sadece rezervasyon alan bir web sitesinden çok daha fazlası. Mortanas Yapay Zeka Web, her misafirinize kişiselleştirilmiş bir deneyim sunar, doğrudan rezervasyonlarınızı artırır ve 7/24 çalışan akıllı bir konsiyerj gibi hareket eder.
                            </p>
                            <div className="mt-8">
                                <Link to="/kurumsal" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                                    Teklif Alın
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.imgur.com/v2Vz6oT.png" alt="AI Hotel Website Mockup" className="rounded-2xl shadow-2xl ring-4 ring-blue-500/30" />
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-8 py-24 space-y-24">
                {/* Features Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl py-20 -mx-8 px-8 border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Yapay Zeka Destekli Bir Web Sitesi?</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           OTA komisyonlarını azaltın, misafir sadakatini artırın ve operasyonel verimliliği en üst düzeye çıkarın.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="fas fa-user-astronaut"
                            title="Kişiselleştirilmiş Karşılama"
                            description="Yapay zeka, ziyaretçinin konumuna, geçmiş ziyaretlerine ve davranışlarına göre ana sayfanızı, tekliflerinizi ve içeriğinizi dinamik olarak değiştirir."
                        />
                        <FeatureCard 
                            icon="fas fa-calendar-check"
                            title="Akıllı Rezervasyon Motoru"
                            description="Misafirinize en uygun oda ve paketleri önerir, ek hizmetler (spa, tur vb.) için akıllıca çapraz satış yapar ve rezervasyon sürecini kolaylaştırır."
                        />
                         <FeatureCard 
                            icon="fas fa-comments-dollar"
                            title="7/24 Akıllı Konsiyerj"
                            description="Web sitenizdeki sohbet botu, misafirlerin sorularını anında yanıtlar, rezervasyon yapar ve hatta oda servisi gibi talepleri CRM'inize iletir."
                        />
                        <FeatureCard 
                            icon="fas fa-tags"
                            title="Dinamik Fiyatlandırma"
                            description="Doluluk oranına, talep yoğunluğuna ve rakip analizlerine göre web sitenizde anlık fiyat güncellemeleri yaparak kârlılığınızı maksimize eder."
                        />
                        <FeatureCard 
                            icon="fas fa-envelope-open-text"
                            title="Otomatik Misafir İletişimi"
                            description="Rezervasyon sonrası, konaklama öncesi ve sonrası e-postaları kişiselleştirilmiş içeriklerle otomatik olarak göndererek misafirlerinizle bağ kurar."
                        />
                         <FeatureCard 
                            icon="fas fa-chart-line"
                            title="Davranışsal Analiz"
                            description="Hangi tekliflerin daha çok ilgi çektiğini, hangi sayfaların terk edildiğini analiz eder ve web sitenizi sürekli olarak optimize etmeniz için size içgörüler sunar."
                        />
                    </div>
                </section>
                
                {/* Problem & Solution Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-inner border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Klasik Sitelerin Yarattığı Problemler ve Akıllı Çözümler</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Doğrudan rezervasyonları ve kârlılığı engelleyen yaygın sorunları nasıl aştığımızı görün.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                       <ProblemSolutionCard
                            problem="OTA'lara ödenen %15-25 arası yüksek komisyonlar kâr marjınızı eritir."
                            solution="Yapay zeka siteniz, misafirleri doğrudan rezervasyona teşvik ederek bu maliyeti ortadan kaldırır."
                       />
                       <ProblemSolutionCard
                            problem="Mesai saatleri dışında veya yoğun anlarda telefonlara cevap veremez, potansiyel misafirleri kaçırırsınız."
                            solution="AI Chatbot, her soruyu 7/24 anında yanıtlar ve hiçbir rezervasyon fırsatını kaçırmaz."
                       />
                       <ProblemSolutionCard
                            problem="Her ziyaretçiye aynı standart içeriği göstermek, kişiselleştirme eksikliği nedeniyle dönüşümleri düşürür."
                            solution="AI, her ziyaretçiye özel teklifler ve içerikler sunarak etkileşimi ve rezervasyon oranını artırır."
                       />
                    </div>
                </section>

                {/* AI Chatbot System Section */}
                <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Web Sitenizin Yeni Yıldızı: <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">7/24 AI Konsiyerj</span></h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Bu sadece bir chatbot değil; otelinizin tüm dijital operasyonlarını yöneten, gelir getiren akıllı bir asistandır.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {aiConciergeFeatures.map((feature, index) => (
                                <div key={index} className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                    <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                                        <i className={`${feature.icon} text-3xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-300">{feature.description}</p>
                                </div>
                           ))}
                        </div>
                    </div>
                </section>
                
                {/* FOMO Section */}
                <FomoSection />

                {/* How It Works - Redesigned Timeline Section */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">3 Adımda <span className="text-blue-400">Akıllı Siteniz</span> Hazır</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Karmaşık süreçleri unutun. Anahtar teslim yaklaşımımızla, otelinizin dijital dönüşümünü hızla ve zahmetsizce gerçekleştiriyoruz.
                        </p>
                    </div>

                    <div className="relative container mx-auto px-6">
                        {/* Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-800 rounded-full"></div>
                        
                        <div className="space-y-16">
                            {howItWorksSteps.map((step, index) => (
                                <div key={index} className={`relative flex items-center group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Desktop Circle */}
                                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-blue-600 rounded-full items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-blue-400`}></i>
                                    </div>
                                    {/* Mobile Circle */}
                                    <div className="md:hidden absolute top-0 -left-6 w-12 h-12 bg-slate-900 border-4 border-blue-600 rounded-full flex items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-blue-400`}></i>
                                    </div>

                                    <div className="md:w-1/2">
                                        <div className={`
                                            ${index % 2 !== 0 ? 'md:ml-auto' : ''} 
                                            w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700 
                                            transform ${index % 2 !== 0 ? 'md:group-hover:translate-x-2' : 'md:group-hover:-translate-x-2'} 
                                            transition-transform duration-300 ml-10 md:ml-0
                                        `}>
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <p className="mt-2 text-slate-300">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Pricing Section */}
                <AiWebPricingSection planName="Yapay Zeka Otel Sitesi" themeColor="blue" />

                {/* FAQ Section */}
                <section id="faq" className="bg-slate-800/50 backdrop-blur-sm py-24 rounded-2xl border border-slate-700">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Sıkça Sorulan <span className="text-blue-400">Sorular</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Yapay Zeka Otel Siteniz hakkında aklınıza takılan en yaygın soruları sizin için yanıtladık.
                            </p>
                        </div>
                        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-x-12">
                            <div className="lg:col-span-5 space-y-4">
                                {faqs.slice(0, 2).map((faq, index) => (
                                    <FAQItem key={index} faq={faq} isOpen={openFaqIndex === index} onClick={() => handleFaqClick(index)} />
                                ))}
                            </div>
                            <div className="lg:col-span-7 space-y-4 mt-4 lg:mt-0">
                                {faqs.slice(2, 7).map((faq, index) => (
                                    <FAQItem key={index + 2} faq={faq} isOpen={openFaqIndex === (index + 2)} onClick={() => handleFaqClick(index + 2)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto">
                    <div className="bg-slate-900 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 items-center">
                            <div className="p-8 md:p-12 lg:p-16 text-center lg:text-left z-10">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Doğrudan Rezervasyon</span><br /> Devrimine Katılın
                                </h2>
                                <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                                    Yapay zekanın gücüyle komisyon maliyetlerinizi nasıl sıfırlayabileceğinizi ve kârlılığınızı nasıl artırabileceğinizi öğrenmek için bugün bizimle iletişime geçin.
                                </p>
                                
                                <div className="mt-8 space-y-4 text-left max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-percent fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>%100 Komisyonsuz</strong> Rezervasyonlar</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-user-astronaut fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>7/24 Çalışan</strong> AI Konsiyerj</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-hand-holding-heart fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>Kişiselleştirilmiş</strong> Misafir Deneyimi</span>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                  <Link to="/kurumsal" className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fas fa-calendar-check mr-3"></i>
                                    Ücretsiz Danışmanlık Al
                                  </Link>
                                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fab fa-whatsapp mr-3"></i>
                                    WhatsApp'tan Sor
                                  </a>
                                </div>
                            </div>
                            <div className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden">
                                 <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                 <div className="absolute w-72 h-72 bg-cyan-400/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
                                <img src="https://i.imgur.com/v2Vz6oT.png" alt="Otel Web Sitesi Arayüzü" className="relative w-4/5 lg:absolute lg:w-full lg:max-w-xl lg:-right-10 rounded-xl shadow-2xl ring-2 ring-white/10 transform lg:rotate-6 transition-transform duration-500 hover:rotate-2 hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AiHotelSitePage;