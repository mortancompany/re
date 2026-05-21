import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AiWebPricingSection from '../components/AiWebPricingSection';
import type { FAQ } from '../types';

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-green-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-start text-left p-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
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

const FeatureCard: React.FC<{ icon: string; title: string; description: string; color?: 'blue' | 'green' }> = ({ icon, title, description, color = 'green' }) => {
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
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[32rem] h-[32rem] bg-green-500/20 rounded-full blur-3xl opacity-40"></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
                <span className="text-sm font-bold tracking-wider text-green-300 bg-green-500/20 px-3 py-1.5 rounded-full uppercase">
                    Rekabette Öne Geçin
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                    Dijital Dönüşümü <br/> Ertelemeyin
                </h2>
                <p className="mt-6 text-lg text-slate-300">
                    Sektörünüz hızla dijitalleşirken, harekete geçmemek pazar payı kaybetmek anlamına gelir. İşte yapay zeka entegrasyonunun somut etkileri:
                </p>
                <Link to="/kurumsal" className="mt-10 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                    <span>Hemen Harekete Geçin</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
            {/* Right: Stats */}
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-green-400">70%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Fazla Müşteri</h3>
                        <p className="text-slate-300 text-sm">Wellness müşterileri, online randevu kolaylığı sunan işletmeleri tercih ediyor.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-green-400">40%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Az Gelir Kaybı</h3>
                        <p className="text-slate-300 text-sm">Akıllı web siteleri, 'no-show' (randevuya gelmeme) oranlarını %40'a kadar azaltır.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-green-400">25%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Yüksek Sadakat</h3>
                        <p className="text-slate-300 text-sm">Kişiselleştirilmiş deneyimler sunarak tekrar ziyaret oranını %25 artırın.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const AiSpaSitePage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs: FAQ[] = [
        { 
            question: "Yapay Zeka Spa Sitesi, standart bir web sitesinden ne kadar farklı?",
            answer: "Bu site, 7/24 online randevu alan, müşterilerinize ihtiyaçlarına göre terapi öneren, otomatik hatırlatmalarla 'no-show' oranını düşüren ve sadakat programları sunan akıllı bir iş ortağıdır."
        },
        { 
            question: "Mevcut randevu takvimimle senkronize çalışır mı?",
            answer: "Evet, platformumuz Google Calendar, Outlook ve diğer popüler randevu yazılımlarıyla tam entegre çalışarak terapistlerinizin ve odalarınızın takvimlerini anlık olarak senkronize eder."
        },
        { 
            question: "Online ödeme ve kapora alabilir miyim?",
            answer: "Evet, Stripe ve iyzico gibi güvenli ödeme altyapıları ile entegre çalışır. Randevu sırasında müşterilerinizden hizmet bedelinin tamamını veya bir kısmını kapora olarak alabilirsiniz."
        },
        { 
            question: "Kurulum süreci ne kadar sürüyor?",
            answer: "Hizmetlerinizin, terapistlerinizin ve takvimlerinizin sisteme entegrasyonu dahil olmak üzere anahtar teslim kurulum sürecimiz genellikle 3-5 iş günü içinde tamamlanır."
        },
        { 
            question: "Müşterilerime özel paketler veya kampanyalar sunabilir miyim?",
            answer: "Evet, yapay zeka asistanı, müşterilerinizin geçmiş randevularına göre onlara özel çoklu seans paketleri, indirimler veya tamamlayıcı hizmetler sunarak gelirinizi artırır."
        },
        { 
            question: "SMS ve WhatsApp hatırlatmaları için ek ücret ödemem gerekiyor mu?",
            answer: "Hayır, seçtiğiniz abonelik paketine dahil olan belirli bir kredi kapsamında otomatik randevu hatırlatmaları, onay ve geri bildirim mesajları standart olarak sunulmaktadır."
        },
        { 
            question: "Sitenin yönetimini kendim yapabilir miyim?",
            answer: "Evet, size sunacağımız kullanıcı dostu yönetim paneli üzerinden hizmetlerinizi, fiyatlarınızı, terapistlerinizi ve çalışma saatlerinizi kolayca güncelleyebilirsiniz."
        }
    ];

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent("Merhaba, Yapay Zeka Spa Sitesi hakkında bilgi almak istiyorum.")}`;
    const aiAssistantFeatures = [
        { icon: "fas fa-calendar-check", title: "Anında Randevu Alma", description: "Terapistlerin ve odaların uygunluğunu kontrol eder, danışan için en iyi zamanı bulur ve randevuyu anında oluşturur." },
        { icon: "fas fa-question-circle", title: "Sıkça Sorulan Sorular", description: "Hizmetler, fiyatlar, süreler ve hazırlık süreçleri hakkındaki tüm soruları 7/24 anında yanıtlar." },
        { icon: "fas fa-user-plus", title: "Potansiyel Müşteri Toplama", description: "Kararsız ziyaretçilerin iletişim bilgilerini alarak onlara özel teklifler sunmanız için pazarlama listenizi oluşturur." }
    ];
    const howItWorksSteps = [
        {
            icon: 'fa-plug',
            title: '1. Entegrasyon & Kurulum',
            description: 'Mevcut randevu ve müşteri yönetimi (CRM) yazılımınızı platformumuza sorunsuzca bağlıyoruz.'
        },
        {
            icon: 'fa-brain',
            title: '2. AI Eğitimi & Kişiselleştirme',
            description: 'Yapay zekayı; hizmetleriniz, terapistleriniz ve müşteri profilinizle eğitiyoruz. Asistanınız merkezinizin bir uzmanı haline geliyor.'
        },
        {
            icon: 'fa-rocket',
            title: '3. Aktivasyon & Büyüme',
            description: 'Akıllı web siteniz yayına alınır. 7/24 randevu almaya, \'no-show\' oranını düşürmeye ve müşteri sadakati oluşturmaya başlarsınız.'
        },
    ];

    return (
        <div className="bg-slate-900 text-slate-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-green-900 to-slate-900 text-white pt-24 pb-16">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-green-300 bg-green-500/20 px-3 py-1.5 rounded-full uppercase">YAPAY ZEKA WEB SİTESİ</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                                Huzur ve Teknolojiyi Buluşturan <span className="text-green-400">Akıllı Spa Siteniz</span>
                            </h1>
                            <p className="mt-6 text-lg text-green-200">
                                Sadece bilgi veren bir web sitesinden ötesi. Mortanas Yapay Zeka Web, danışanlarınıza kişiselleştirilmiş terapi önerileri sunar, 7/24 online randevu alır ve merkezinizin doluluk oranını en üst seviyeye çıkarır.
                            </p>
                            <div className="mt-8">
                                <Link to="/kurumsal" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-block">
                                    Teklif Alın
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.imgur.com/K5b4I0A.png" alt="AI Spa Website Mockup" className="rounded-2xl shadow-2xl ring-4 ring-green-500/30" />
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-8 py-24 space-y-24">
                {/* Features Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl py-20 -mx-8 px-8 border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Yapay Zeka Destekli Bir Spa Sitesi?</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           "No-show" oranlarını düşürün, müşteri sadakatini artırın ve operasyonel verimliliği maksimize edin.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="fas fa-user-nurse"
                            title="Kişiselleştirilmiş Terapi Önerisi"
                            description="Yapay zeka, ziyaretçinin ihtiyaçlarına ve geçmiş tercihlerine göre en uygun masaj veya bakım paketini proaktif olarak önerir."
                        />
                        <FeatureCard 
                            icon="fas fa-calendar-alt"
                            title="7/24 Akıllı Randevu Sistemi"
                            description="Danışanlarınız, telefon trafiği olmadan, diledikleri zaman web sitenizden online randevu alabilir ve en uygun terapisti seçebilir."
                        />
                         <FeatureCard 
                            icon="fas fa-sms"
                            title="Otomatik Randevu Hatırlatmaları"
                            description="Randevuya gelmeme oranını düşürmek için WhatsApp ve SMS üzerinden akıllı ve kişiselleştirilmiş hatırlatmalar gönderir."
                        />
                        <FeatureCard 
                            icon="fas fa-gift"
                            title="Dinamik Paket ve Hediye Kartı"
                            description="Sezonluk veya kişiye özel terapi paketleri sunar. Hediye kartı satışını teşvik ederek nakit akışınızı güçlendirir."
                        />
                        <FeatureCard 
                            icon="fas fa-hand-holding-heart"
                            title="Müşteri Sadakat Programı"
                            description="Tekrar gelen danışanları tanır ve onlara özel indirimler veya ek hizmetler sunarak sadakatlerini ödüllendirir."
                        />
                         <FeatureCard 
                            icon="fas fa-chart-pie"
                            title="Performans Analizi"
                            description="En popüler hizmetlerinizi, en yoğun saatlerinizi ve en verimli terapistlerinizi analiz ederek iş stratejinizi veriye dayalı olarak şekillendirir."
                        />
                    </div>
                </section>
                
                {/* Problem & Solution Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-inner border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Operasyonel Yükü Azaltın, Müşteriye Odaklanın</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Spa ve wellness merkezlerinin karşılaştığı yaygın sorunlara getirdiğimiz akıllı çözümler.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                       <ProblemSolutionCard
                            problem="Sürekli çalan telefonlar ve manuel randevu defteri, personelinizin zamanını alır ve hata riskini artırır."
                            solution="7/24 çalışan online randevu sistemi, telefon trafiğini %80'e kadar azaltır ve tüm takvimi otomatik yönetir."
                       />
                       <ProblemSolutionCard
                            problem="Danışanların randevularını unutması ('no-show'), hem zaman hem de gelir kaybına neden olur."
                            solution="Akıllı SMS ve WhatsApp hatırlatmaları, randevuya gelmeme oranını önemli ölçüde düşürür."
                       />
                       <ProblemSolutionCard
                            problem="Yeni danışanlara hangi hizmetin uygun olduğunu anlatmak zaman alır ve her zaman etkili olmayabilir."
                            solution="AI, ziyaretçiye birkaç soru sorarak en uygun terapiyi önerir ve satış sürecini hızlandırır."
                       />
                    </div>
                </section>

                {/* AI Chatbot System Section */}
                <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-green-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Merkezinizin Dijital Resepsiyonisti: <span className="text-green-400">AI Terapist Asistanı</span></h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Bu akıllı asistan, sadece soruları yanıtlamakla kalmaz, aynı zamanda merkezinizin doluluğunu ve gelirini artırmak için çalışır.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {aiAssistantFeatures.map((feature, index) => (
                                <div key={index} className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-green-400 hover:-translate-y-1">
                                    <div className="flex-shrink-0 h-16 w-16 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">
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
                        <h2 className="text-3xl md:text-4xl font-bold text-white">3 Adımda <span className="text-green-400">Huzurlu Başlangıç</span></h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Karmaşık kurulumları unutun. Anahtar teslim yaklaşımımızla, merkezinizin dijital yüzünü hızla ve zahmetsizce hayata geçiriyoruz.
                        </p>
                    </div>

                    <div className="relative container mx-auto px-6">
                        {/* Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-green-800 rounded-full"></div>
                        
                        <div className="space-y-16">
                            {howItWorksSteps.map((step, index) => (
                                <div key={index} className={`relative flex items-center group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Desktop Circle */}
                                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-green-600 rounded-full items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-green-400`}></i>
                                    </div>
                                    {/* Mobile Circle */}
                                    <div className="md:hidden absolute top-0 -left-6 w-12 h-12 bg-slate-900 border-4 border-green-600 rounded-full flex items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-green-400`}></i>
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
                <AiWebPricingSection planName="Yapay Zeka Spa Sitesi" themeColor="green" />

                 {/* FAQ Section */}
                 <section id="faq" className="bg-slate-800/50 backdrop-blur-sm py-24 rounded-2xl border border-slate-700">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Sıkça Sorulan <span className="text-green-400">Sorular</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Yapay Zeka Spa Siteniz hakkında aklınıza takılan en yaygın soruları sizin için yanıtladık.
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
                    <div className="bg-gradient-to-br from-gray-900 via-green-900 to-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 items-center">
                            <div className="p-8 md:p-12 lg:p-16 text-center lg:text-left z-10">
                                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                                    <span className="bg-gradient-to-r from-green-400 to-emerald-300 text-transparent bg-clip-text">Dijitalde Huzurlu</span><br /> Bir Başlangıç Yapın
                                </h2>
                                <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                                    Yapay zekanın gücüyle operasyonel yükünüzü nasıl hafifletebileceğinizi ve danışan memnuniyetini nasıl artırabileceğinizi öğrenmek için bugün bizimle iletişime geçin.
                                </p>
                                
                                <div className="mt-8 space-y-4 text-left max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-calendar-check fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>7/24 Otomatik</strong> Randevu Sistemi</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-user-slash fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>%70 Azalan</strong> "No-Show" Oranı</span>
                                    </div>
                                    <div className="flex items-center text-slate-200 bg-white/5 p-3 rounded-lg">
                                        <i className="fas fa-repeat fa-fw text-green-400 mr-4 text-xl"></i>
                                        <span><strong>Artan</strong> Müşteri Sadakati</span>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                  <Link to="/kurumsal" className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fas fa-calendar-check mr-3"></i>
                                    Ücretsiz Danışmanlık Al
                                  </Link>
                                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white/10 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/20 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fab fa-whatsapp mr-3"></i>
                                    WhatsApp'tan Sor
                                  </a>
                                </div>
                            </div>
                            <div className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden">
                                 <div className="absolute w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                                 <div className="absolute w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
                                <img src="https://i.imgur.com/K5b4I0A.png" alt="Spa Web Sitesi Arayüzü" className="relative w-4/5 lg:absolute lg:w-full lg:max-w-xl lg:-right-10 rounded-xl shadow-2xl ring-2 ring-white/10 transform lg:rotate-6 transition-transform duration-500 hover:rotate-2 hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AiSpaSitePage;