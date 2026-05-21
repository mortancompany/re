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

// Re-usable components from other AiWeb pages
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
                    Piyasada Öne Çıkın
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                    Fırsatları Kaçırmayın
                </h2>
                <p className="mt-6 text-lg text-slate-300">
                    Emlak piyasası dijitalleşirken, harekete geçmemek potansiyel müşteri kaybetmek demektir. İşte yapay zeka destekli bir sitenin getireceği somut avantajlar:
                </p>
                <Link to="/kurumsal" className="mt-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                    <span>Hemen Harekete Geçin</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
            {/* Right: Stats */}
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">90%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Geniş Erişim</h3>
                        <p className="text-slate-300 text-sm">Alıcıların %90'ı emlak arayışına internetten başlıyor. Onları ilk karşılayan siz olun.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">50%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Hızlı Satış</h3>
                        <p className="text-slate-300 text-sm">AI destekli bir site, potansiyel müşterileri %50 daha hızlı nitelikli hale getirir.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">40%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Verimli Danışman</h3>
                        <p className="text-slate-300 text-sm">Danışmanlarınızın zamanını %40 oranında serbest bırakarak satışa odaklanmalarını sağlayın.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const AiEmlakSitePage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs: FAQ[] = [
        { 
            question: "Yapay Zeka Emlak Sitesi'nin en büyük avantajı nedir?",
            answer: "En büyük avantajı, 7/24 çalışan bir sanal danışman gibi potansiyel müşteri (lead) yakalamasıdır. Ziyaretçilerin sorularını yanıtlar, aradıkları kriterlere uygun ilanları sunar ve iletişim bilgilerini alarak size nitelikli müşteri adayları oluşturur."
        },
        { 
            question: "Mevcut ilanlarımı siteye kolayca aktarabilir miyim?",
            answer: "Evet, XML entegrasyonu sayesinde Sahibinden, Hepsiemlak gibi portallardaki veya kendi CRM'inizdeki tüm ilanlarınızı fotoğrafları ve detaylarıyla birlikte sitenize otomatik olarak aktarabiliyoruz."
        },
        { 
            question: "Site üzerinden mülk gösterme randevusu alınabilir mi?",
            answer: "Evet, AI asistanı, danışmanlarınızın takvimleriyle entegre çalışarak potansiyel alıcıların uygun zaman dilimleri için otomatik olarak randevu oluşturmasını sağlar."
        },
        { 
            question: "Kurulum ne kadar sürer?",
            answer: "Portföyünüzün entegrasyonu ve yapay zekanın bölge ve mülkleriniz hakkında eğitilmesi dahil olmak üzere anahtar teslim kurulum sürecimiz ortalama 5-7 iş günü sürer."
        },
        { 
            question: "Site, SEO (Arama Motoru Optimizasyonu) uyumlu mu?",
            answer: "Evet, tüm sitelerimiz en güncel SEO tekniklerine uygun olarak inşa edilir. Yapay zeka, ilan başlıkları ve açıklamaları için SEO dostu öneriler sunarak Google'da daha kolay bulunmanızı sağlar."
        },
        { 
            question: "Ziyaretçiler kredi hesaplaması yapabilir mi?",
            answer: "Evet, sitenize entegre edilecek konut kredisi hesaplama aracı sayesinde ziyaretçiler, ilgilendikleri mülkler için anında ödeme planı ve taksit tutarı hesaplaması yapabilir."
        },
        { 
            question: "Danışman performansını takip edebilir miyim?",
            answer: "Evet, yönetim panelinden hangi danışmanın ne kadar potansiyel müşteriyle görüştüğünü, kaç randevu oluşturduğunu ve hangi ilanların daha popüler olduğunu takip edebilirsiniz."
        }
    ];

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent("Merhaba, Yapay Zeka Emlak Sitesi hakkında bilgi almak istiyorum.")}`;
    const aiAssistantFeatures = [
        { icon: "fas fa-calendar-check", title: "Otomatik Randevu Planlama", description: "Danışmanlarınızın takvimleriyle entegre çalışarak, mülk gösterme randevularını otomatik olarak ve çakışma olmadan ayarlar." },
        { icon: "fas fa-comments-dollar", title: "Anında Ön Bilgilendirme", description: "İlanın özellikleri, konumu, metrekare bilgisi gibi temel soruları 7/24 anında yanıtlar ve müşteriyi sıcak tutar." },
        { icon: "fas fa-user-plus", title: "Nitelikli Müşteri Adayı Toplama", description: "Sohbet esnasında alıcının bütçesi, aradığı özellikler ve iletişim bilgileri gibi kritik verileri toplayarak CRM'inize kaydeder." }
    ];
    const howItWorksSteps = [
        {
            icon: 'fa-plug',
            title: '1. Entegrasyon & Kurulum',
            description: 'Kullandığınız Emlak CRM\'ini veya ilan portalı hesaplarınızı platformumuza sorunsuzca entegre ediyoruz.'
        },
        {
            icon: 'fa-brain',
            title: '2. AI Eğitimi & Kişiselleştirme',
            description: 'Yapay zekayı; portföyünüz, bölge özellikleri ve hedef müşteri kitlenizle eğitiyoruz. Asistanınız uzman bir danışman gibi davranmaya başlıyor.'
        },
        {
            icon: 'fa-rocket',
            title: '3. Aktivasyon & Büyüme',
            description: 'Akıllı emlak siteniz yayına alınır. İlk günden itibaren nitelikli potansiyel müşteri toplamaya ve satış süreçlerinizi hızlandırmaya başlarsınız.'
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
                                Portföyünüzü Hayata Geçiren <span className="text-blue-400">Akıllı Emlak Siteniz</span>
                            </h1>
                            <p className="mt-6 text-lg text-blue-200">
                                Sadece ilan listeleyen bir web sitesinden fazlası. Mortanas Yapay Zeka Web, her ziyaretçiye özel bir emlak danışmanı gibi davranır, potansiyel müşterileri yakalar ve satışlarınızı hızlandırır.
                            </p>
                            <div className="mt-8">
                                <Link to="/kurumsal" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                                    Teklif Alın
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.imgur.com/3D1jQ2r.png" alt="AI Real Estate Website Mockup" className="rounded-2xl shadow-2xl ring-4 ring-blue-500/30" />
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-8 py-24 space-y-24">
                {/* Features Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl py-20 -mx-8 px-8 border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Yapay Zeka Destekli Bir Emlak Sitesi?</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Potansiyel müşteri kalitesini artırın, danışman verimliliğini yükseltin ve satış süreçlerinizi hızlandırın.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="fas fa-search-location"
                            title="Akıllı Portföy Arama"
                            description="AI, 'deniz manzaralı 3+1 yazlık' gibi doğal dil sorgularını anlar ve ziyaretçiye en uygun ilanları saniyeler içinde sunar."
                        />
                        <FeatureCard 
                            icon="fas fa-user-tie"
                            title="7/24 Potansiyel Müşteri Yakalama"
                            description="AI Chatbot, site ziyaretçilerini karşılar, sorularını yanıtlar, iletişim bilgilerini alır ve randevu planlayarak size nitelikli müşteri adayları sunar."
                        />
                         <FeatureCard 
                            icon="fas fa-house-user"
                            title="Kişiselleştirilmiş İlan Önerileri"
                            description="Ziyaretçinin gezdiği ilanları ve arama kriterlerini analiz ederek, ana sayfada ve e-posta ile kişiye özel yeni ilan önerileri sunar."
                        />
                        <FeatureCard 
                            icon="fas fa-calculator"
                            title="Dinamik Değerleme ve Kredi Aracı"
                            description="AI, bölge verilerini analiz ederek mülkler için tahmini bir değerleme sunar ve entegre kredi hesaplama araçlarıyla alıcıları teşvik eder."
                        />
                        <FeatureCard 
                            icon="fas fa-vr-cardboard"
                            title="Sanal Tur Entegrasyonu"
                            description="360° sanal tur entegrasyonu ile potansiyel alıcıların mülkleri evlerinden ayrılmadan gezmelerini sağlayarak zaman kazandırır."
                        />
                         <FeatureCard 
                            icon="fas fa-map-marked-alt"
                            title="Akıllı Mahalle Analizi"
                            description="Her ilan sayfasında okullar, hastaneler, ulaşım ve sosyal olanaklar hakkında yapay zeka tarafından derlenmiş güncel bilgiler sunar."
                        />
                    </div>
                </section>
                
                {/* Problem & Solution Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-inner border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Standart Sitelerin Yarattığı Fırsat Kayıpları</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Satışları ve kiralamaları yavaşlatan yaygın sorunlara getirdiğimiz akıllı çözümler.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                       <ProblemSolutionCard
                            problem="Ziyaretçiler binlerce ilan arasında kaybolur ve aradığını bulamadan siteyi terk eder."
                            solution="AI destekli arama, ziyaretçinin tam olarak ne istediğini anlar ve en uygun ilanları saniyeler içinde sunar."
                       />
                       <ProblemSolutionCard
                            problem="Ciddi olmayan alıcılardan gelen telefon ve mesaj trafiği, danışmanların değerli zamanını tüketir."
                            solution="AI Asistan, 7/24 çalışarak ilk teması kurar, ön elemeyi yapar ve sadece nitelikli alıcıları danışmanlara yönlendirir."
                       />
                       <ProblemSolutionCard
                            problem="Standart web siteleri, her ziyaretçiye aynı deneyimi sunar ve potansiyel müşteriye özel bir bağ kuramaz."
                            solution="AI, ziyaretçinin davranışlarına göre kişiselleştirilmiş ilanlar sunarak, onlara özel bir danışmanlık deneyimi yaşatır."
                       />
                    </div>
                </section>

                {/* AI Chatbot System Section */}
                 <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Sitenizin Yeni Emlak Danışmanı: <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">7/24 AI Asistan</span></h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Bu asistan, sadece soruları yanıtlamakla kalmaz, aynı zamanda sizin için potansiyel müşteri üretir ve satış sürecini başlatır.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {aiAssistantFeatures.map((feature, index) => (
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
                            Karmaşık süreçleri unutun. Anahtar teslim yaklaşımımızla, emlak işinizin dijital dönüşümünü hızla ve zahmetsizce gerçekleştiriyoruz.
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
                <AiWebPricingSection planName="Yapay Zeka Emlak Sitesi" themeColor="blue" />

                {/* FAQ Section */}
                <section id="faq" className="bg-slate-800/50 backdrop-blur-sm py-24 rounded-2xl border border-slate-700">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Sıkça Sorulan <span className="text-blue-400">Sorular</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Yapay Zeka Emlak Siteniz hakkında aklınıza takılan en yaygın soruları sizin için yanıtladık.
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
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Emlak Satışında</span><br /> Yeni Bir Dönem Başlatın
                                </h2>
                                <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                                   Yapay zekanın gücüyle potansiyel müşteri yaratma ve satış süreçlerinizi nasıl otomatikleştirebileceğinizi öğrenmek için bugün bizimle iletişime geçin.
                                </p>
                                
                                <div className="mt-8 space-y-4 text-left max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-user-plus fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>Otomatik</strong> Potansiyel Müşteri</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-rocket fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>%50 Daha Hızlı</strong> Satış Süreci</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-clock-rotate-left fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span>Danışmanlar için <strong>%40 Zaman Tasarrufu</strong></span>
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
                                <img src="https://i.imgur.com/3D1jQ2r.png" alt="Emlak Web Sitesi Arayüzü" className="relative w-4/5 lg:absolute lg:w-full lg:max-w-xl lg:-right-10 rounded-xl shadow-2xl ring-2 ring-white/10 transform lg:rotate-6 transition-transform duration-500 hover:rotate-2 hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AiEmlakSitePage;