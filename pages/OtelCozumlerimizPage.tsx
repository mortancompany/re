import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const AnimatedCounter: React.FC<{ target: number, suffix?: string, prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let start = 0;
                    const end = target;
                    if (start === end) return;

                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    let increment = end / totalFrames;
                    let currentFrame = 0;

                    const timer = setInterval(() => {
                        currentFrame++;
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, frameRate);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [target]);

    return (
        <span ref={ref}>
            {prefix}{new Intl.NumberFormat('tr-TR').format(count)}{suffix}
        </span>
    );
};


const FeatureCard: React.FC<{ icon: string; title: string; description: string; path?: string; }> = ({ icon, title, description, path }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-blue-400">
        <div className="flex-shrink-0 h-8 w-8 bg-blue-500/10 rounded-lg flex items-center justify-center mb-1.5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-blue-400 text-lg`}></i>
        </div>
        <h3 className="font-bold text-[15px] mb-0.5 text-white">{title}</h3>
        <p className="text-slate-300 text-[13px] leading-snug flex-grow">{description}</p>
        {path && (
            <div className="mt-auto pt-1.5">
                <Link to={path} className="font-bold text-blue-400 hover:underline text-[13px]">
                    Detayları İncele <i className="fas fa-arrow-right ml-1"></i>
                </Link>
            </div>
        )}
    </div>
);


const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-blue-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-5"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </div>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-300">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const ValueCard: React.FC<{ icon: string; target: number; suffix: string; title: string; description: string; }> = ({ icon, target, suffix, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl text-center shadow-2xl border-t-4 border-blue-500">
        <i className={`${icon} text-5xl text-blue-400 mb-4`}></i>
        <p className="text-5xl font-extrabold text-white">
            <AnimatedCounter target={target} suffix={suffix} prefix={target > 0 ? '+' : ''}/>
        </p>
        <h3 className="text-xl font-bold text-slate-200 mt-3">{title}</h3>
        <p className="text-slate-400 mt-2">{description}</p>
    </div>
);

const PlatformModuleCard: React.FC<{ imageUrl: string; title: string; description: string; }> = ({ imageUrl, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden group border border-slate-700 hover:border-blue-500 transition-all duration-300">
        <div className="overflow-hidden h-48">
             <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        </div>
        <div className="p-6">
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-sm text-slate-300 mt-2">{description}</p>
        </div>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatarUrl: string; }> = ({ quote, name, title, avatarUrl }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col text-center h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-slate-700">
      <img
        className="w-24 h-24 rounded-full object-cover mb-6 ring-4 ring-blue-500/30"
        src={avatarUrl}
        alt={name}
      />
      <p className="text-slate-300 italic mb-6 relative flex-grow">
        <i className="fas fa-quote-left absolute -top-2 -left-4 text-3xl text-slate-700 -z-10"></i>
        {quote}
      </p>
      <div className="mt-auto">
        <h4 className="font-bold text-lg text-white">{name}</h4>
        <p className="text-sm text-blue-400 font-medium">{title}</p>
      </div>
    </div>
  );
};


const OtelCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // ROI Calculator State
    const [rooms, setRooms] = useState(25);
    const [occupancy, setOccupancy] = useState(70);
    const [adr, setAdr] = useState(100);
    const [commission, setCommission] = useState(18);
    const [directConversion, setDirectConversion] = useState(30);
    const [savingsBreakdown, setSavingsBreakdown] = useState<{ commission: number; operational: number; upsell: number; total: number } | null>(null);


    const [offerEndDate] = useState(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 57 * 60 * 1000)); // ~2d 23h 57m from now
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    
    // Hero Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = ['https://www.mortanas.com/resim/om1.png', 'https://www.mortanas.com/resim/om2.png'];

    const testimonials = [
        { quote: "Mortanas'ın hepsi bir arada çözümü sayesinde OTA komisyonlarımız %80 azaldı ve doğrudan rezervasyonlarımız tavan yaptı. Operasyonel verimliliğimizdeki artış ise inanılmaz.", name: 'Ayşe Güneş', title: 'Genel Müdür, Ege Butik Otel', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { quote: 'Sesli asistan ve sosyal medya otomasyonu, resepsiyon ekibimizin yükünü yarı yarıya azalttı. Artık misafirlerimizle daha kaliteli zaman geçirebiliyoruz. Keşke daha önce geçseydik!', name: 'Mehmet Yılmaz', title: 'İşletme Sahibi, Kapadokya Palace', avatarUrl: 'https://randomuser.me/api/portraits/men/44.jpg' },
        { quote: 'Yapay zeka web sitesi ve CRM entegrasyonu sayesinde misafirlerimize gerçekten kişiselleştirilmiş bir deneyim sunuyoruz. Geri dönüş oranlarımızda %40 artış gördük.', name: 'Canan Demir', title: 'Satış & Pazarlama Direktörü, İstanbul Business Hotel', avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg' },
        { quote: 'Gelir yönetimi modülü harika. Dinamik fiyatlandırma özelliği ile doluluk oranımızı ve oda başına gelirimizi optimize etmeyi başardık. Raporlama araçları çok detaylı.', name: 'Ahmet Çelik', title: 'Gelirler Müdürü, Antalya Resort & Spa', avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { quote: '6 farklı sistemi tek bir panelde birleştirmek, hayatımızı kurtardı. Personel eğitimi çok daha kolay ve tüm verilerimiz artık tek bir yerde, güvende. Bu yatırımın karşılığını fazlasıyla aldık.', name: 'Selin Aksoy', title: 'Operasyon Yöneticisi, Uludağ Kayak Oteli', avatarUrl: 'https://randomuser.me/api/portraits/women/46.jpg' },
        { quote: 'Butik otelcilikte misafir deneyimi her şeydir. Mortanas platformu, teknolojiyi kullanarak bu deneyimi bir üst seviyeye taşımamızı sağladı. Misafirlerimiz AI konsiyerj özelliğine bayılıyor!', name: 'Mustafa Arslan', title: 'Kurucu, Karadeniz Yayla Konakları', avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg' }
    ];

    const testimonialChunks = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      testimonialChunks.push(testimonials.slice(i, i + 3));
    }

    const handlePrevTestimonial = () => {
        setCurrentTestimonial(prev => (prev === 0 ? testimonialChunks.length - 1 : prev - 1));
    };

    const handleNextTestimonial = () => {
        setCurrentTestimonial(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
    };

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index);
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentTestimonial(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
        }, 7000); // Change slide every 7 seconds

        return () => clearInterval(slideInterval);
    }, [testimonialChunks.length]);


    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % sliderImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(sliderInterval);
    }, [sliderImages.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = +offerEndDate - +new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                });
            } else {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [offerEndDate]);

    const calculateSavings = useCallback(() => {
        const otaBookingPercentage = 0.70; // Assume 70% of bookings come from OTAs initially
        const operationalSavingsPerYear = 15000; // Estimated annual savings from reduced staff workload (USD)
        const upsellRevenueIncrease = 0.05; // Estimated 5% revenue increase from AI upselling

        const totalAnnualRevenue = rooms * (occupancy / 100) * adr * 365;
        const otaRevenue = totalAnnualRevenue * otaBookingPercentage;
        
        // The revenue we aim to convert from OTA to Direct
        const convertedRevenue = otaRevenue * (directConversion / 100);
        
        // The savings is the commission we no longer pay on this converted revenue
        const commissionSavings = convertedRevenue * (commission / 100);
        
        const upsellRevenue = totalAnnualRevenue * upsellRevenueIncrease;
    
        const totalSavings = commissionSavings + operationalSavingsPerYear + upsellRevenue;
        
        setSavingsBreakdown({
            commission: commissionSavings,
            operational: operationalSavingsPerYear,
            upsell: upsellRevenue,
            total: totalSavings,
        });
    }, [rooms, occupancy, adr, commission, directConversion]);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };
    
    const includedServices = [
        { icon: 'fas fa-hotel', title: 'AI Otel Yönetimi (CRM)', description: 'Tüm otel operasyonlarınızı (rezervasyon, oda durumu, misafir ilişkileri) tek yerden yönetin.', path: '/uygulamalar/otel-yonetimi-crm' },
        { icon: 'fas fa-globe', title: 'Yapay Zeka Web Sitesi', description: 'Misafirlerinize kişiselleştirilmiş deneyimler sunan, 7/24 rezervasyon alan akıllı bir web sitesi.', path: '/yapay-zeka-web/otel' },
        { icon: 'fas fa-share-alt', title: 'Sosyal Medya Otomasyonu', description: 'WhatsApp, Instagram gibi kanallardan gelen mesajları otomatik yanıtlayın ve 7/24 satış yapın.', path: '/otomasyon/sosyal-medya-otomasyonu' },
        { icon: 'fas fa-headset', title: 'Sesli Müşteri Hizmetleri', description: 'Telefon çağrılarınızı yapay zeka ile karşılayın, rezervasyonları sesli olarak alın ve personel yükünü azaltın. (Aylık 200 dakika dahildir, aşım durumunda ek paket gerekir.)', path: '/otomasyon/sesli-musteri-hizmetleri' },
        { icon: 'fas fa-microphone-alt', title: 'Sesli Chatbot Otomasyonu', description: 'Web sitenizde ve uygulamalarınızda sesli komutlarla çalışan akıllı asistan ile misafir deneyimini zenginleştirin.', path: '/otomasyon/sesli-chatbot' },
        { icon: 'fas fa-comments-dollar', title: 'Yapay Zeka Chatbot', description: 'Web sitenizdeki ziyaretçileri 7/24 karşılayın, sorularını yanıtlayın ve rezervasyona yönlendirerek satışları artırın.', path: '/uygulamalar/yapay-zeka-chatbot' },
        { icon: 'fas fa-boxes-stacked', title: 'Stok Yönetimi Otomasyonu', description: 'Otelinizin minibar, temizlik malzemeleri gibi stoklarını anlık takip edin ve siparişleri otomatikleştirin.', path: '/otomasyon/stok-yonetimi-otomasyonu' },
        { icon: 'fas fa-dollar-sign', title: 'AI Destekli Gelir Yönetimi', description: 'Piyasa talebini, rakip fiyatlarını ve etkinlikleri analiz ederek oda fiyatlarınızı dinamik olarak optimize eder, kârlılığınızı maksimize eder.', path: '/uygulamalar/otel-yonetimi-crm' },
        { icon: 'fas fa-star-half-alt', title: 'Online İtibar ve Yorum Yönetimi', description: 'Booking, Google, TripAdvisor gibi platformlardaki yorumları tek bir panelden takip edin ve yapay zeka ile anında yanıtlar oluşturun.', path: '/uygulamalar/otel-yonetimi-crm' }
    ];

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const pricingTiers = [
        { 
            name: "Butik",
            rooms: "5-25 Oda",
            monthly: 250,
            setup: 1500,
            popular: false,
            isEnterprise: false,
            description: "Küçük ve butik oteller için ideal, komisyonsuz başlangıç.",
            features: ["Tüm 9 Çözüm Modülü", "Yapay Zeka Web Sitesi", "Sınırsız Kullanıcı", "Standart Destek"]
        },
        {
            name: "Profesyonel",
            rooms: "25-100 Oda",
            monthly: 500,
            setup: 2500,
            popular: true,
            isEnterprise: false,
            description: "Büyüyen operasyonlar ve şehir otelleri için en popüler çözüm.",
            features: ["Tüm 9 Çözüm Modülü", "Gelişmiş AI Gelir Yönetimi", "Özel Müşteri Temsilcisi", "Öncelikli Destek"]
        },
        {
            name: "Kurumsal",
            rooms: "100+ Oda & Zincirler",
            monthly: 0, // Custom price
            setup: 0, // Custom price
            popular: false,
            isEnterprise: true,
            description: "Büyük oteller, tatil köyleri ve zincirler için ölçeklenebilir, özel çözümler.",
            features: ["Özelleştirilebilir Modüller", "Özel API Erişimi", "Yerinde Kurulum & Eğitim", "Özel Destek Hattı"]
        }
    ];

    const comparisonFeatures = [
        { type: 'heading', name: 'Temel Platform Özellikleri' },
        { name: "Oda Sayısı", butik: "5-25", profesyonel: "25-100", kurumsal: "100+" },
        { name: "Tüm 9 Çözüm Modülü", butik: true, profesyonel: true, kurumsal: true },
        { name: "Yapay Zeka Web Sitesi", butik: true, profesyonel: true, kurumsal: true },
        { name: "Sınırsız Kullanıcı", butik: true, profesyonel: true, kurumsal: true },
        { name: "Kanal Yöneticisi Entegrasyonu", butik: true, profesyonel: true, kurumsal: true },
        { name: "PMS Entegrasyonu", butik: true, profesyonel: true, kurumsal: true },
        { name: "Mobil Yönetim Paneli", butik: true, profesyonel: true, kurumsal: true },

        { type: 'heading', name: 'Yapay Zeka & Otomasyon' },
        { name: "Sesli Müşteri Hizmetleri", butik: "200 dk/ay", profesyonel: "500 dk/ay", kurumsal: "Özelleştirilmiş" },
        { name: "AI Gelir Yönetimi", butik: "Standart", profesyonel: "Gelişmiş", kurumsal: "Proaktif" },
        { name: "AI İtibar Yönetimi", butik: true, profesyonel: true, kurumsal: true },

        { type: 'heading', name: 'Destek & Hizmetler' },
        { name: "Özel Müşteri Temsilcisi", butik: false, profesyonel: true, kurumsal: true },
        { name: "Stratejik Performans Raporları", butik: false, profesyonel: true, kurumsal: true },
        { name: "Özel API Erişimi", butik: false, profesyonel: false, kurumsal: true },
        { name: "Yerinde Kurulum & Eğitim", butik: false, profesyonel: false, kurumsal: true },
        { name: "7/24 Destek", butik: "Standart", profesyonel: "Öncelikli", kurumsal: "Özel Hat" }
    ];

    const faqs = [
        { question: "Kurulum süreci ne kadar sürer ve nasıl işler?", answer: "Tüm sistemin entegrasyonu ve yapay zekanın otel verilerinizle eğitilmesi dahil olmak üzere anahtar teslim kurulum sürecimiz ortalama 7-10 iş günü sürmektedir. Süreç boyunca proje yöneticimiz sizinle sürekli iletişim halinde olacaktır." },
        { question: "Mevcut otel yönetim yazılımım (PMS) ile entegre olabilir mi?", answer: "Evet, çözüm paketimiz Elektra, Opera, Fidelio gibi birçok popüler PMS ve kanal yöneticisi ile tam entegre çalışabilmektedir. Mevcut altyapınızı analiz ederek sorunsuz bir geçiş sağlıyoruz." },
        { question: "Pakete donanım (kiosk, telefon vb.) dahil mi?", answer: "Standart paketlerimiz yazılım lisanslarını ve kurulum hizmetini kapsamaktadır. Kiosk, santral veya diğer donanım ihtiyaçlarınız için iş ortaklarımız üzerinden size özel teklifler sunabiliriz." },
        { question: "Ekibimize eğitim veriyor musunuz?", answer: "Kesinlikle. Kurulum tamamlandıktan sonra resepsiyon, satış, kat hizmetleri ve yönetim dahil olmak üzere tüm ekibinize özel online ve/veya yerinde eğitimler düzenliyoruz. Ayrıca sürekli olarak video eğitim materyalleri ve destek sağlıyoruz." },
        { question: "Destek hizmetleriniz neleri kapsıyor?", answer: "Tüm paketlerimiz 7/24 teknik desteği içermektedir. Telefon, e-posta veya WhatsApp üzerinden uzman ekibimize her an ulaşabilir, sistemle ilgili tüm sorularınıza anında yanıt alabilirsiniz." },
        { question: "Birden fazla oteli tek bir hesaptan yönetebilir miyim?", answer: "Evet, platformumuz çoklu tesis (multi-property) yönetimini desteklemektedir. Zincir veya grup otelleri, tüm mülklerinin rezervasyonlarını, doluluk oranlarını ve finansal raporlarını tek bir merkezi panelden kolayca yönetebilir." },
        { question: "Misafir verilerinin güvenliği nasıl sağlanıyor?", answer: "Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda uçtan uca şifrelenerek saklanır ve düzenli olarak yedeklenir." },
        { question: "Kanal yöneticisi (channel manager) entegrasyonu sağlıyor musunuz?", answer: "Evet, çözümümüz HotelRunner, SiteMinder gibi sektörün önde gelen kanal yöneticileriyle tam entegre çalışır. Bu sayede tüm online satış kanallarınızdaki (Booking, Expedia, Airbnb vb.) oda müsaitliğiniz ve fiyatlarınız anlık olarak senkronize olur." },
        { question: "Otel personeli için bir mobil uygulama var mı?", answer: "Evet, hem iOS hem de Android için geliştirdiğimiz mobil uygulama sayesinde kat hizmetleri personeliniz temizlik görevlerini anlık olarak takip edebilir, resepsiyon ekibiniz check-in/check-out işlemlerini tabletten yapabilir ve yöneticiler otel performansını cepten izleyebilir." },
        { question: "Platformu kendi otelimizin ihtiyaçlarına göre özelleştirebilir miyiz?", answer: "Evet, platformumuz modüler bir yapıya sahiptir. İhtiyaç duymadığınız modülleri kaldırabilir, işletmenize özel raporlar veya otomasyon kuralları oluşturabilirsiniz. Ekibimiz bu süreçte size tam destek sağlar." }
    ];

    const platformModules = [
        { imageUrl: 'https://www.mortanas.com/resim/mortan1.png', title: 'Merkezi CRM Paneli', description: 'Tüm misafir verileri, rezervasyonlar ve iletişim geçmişi tek bir yerde.' },
        { imageUrl: 'https://www.mortanas.com/resim/mortan2.png', title: 'Akıllı Sosyal Medya Inbox', description: 'WhatsApp, Instagram ve diğer kanallardan gelen mesajları yönetin.' },
        { imageUrl: 'https://www.mortanas.com/resim/mortan3.png', title: 'AI Web Sitesi Yönetimi', description: 'Web sitenizdeki içeriği ve teklifleri dinamik olarak kişiselleştirin.' },
        { imageUrl: 'https://www.mortanas.com/resim/mortan4.png', title: 'Gelir ve Analitik Raporları', description: 'Doluluk, gelir ve misafir trendleri hakkında anlık, veriye dayalı raporlar alın.' }
    ];

    const idealFor = [
        { icon: 'fas fa-hotel', name: 'Butik Oteller' },
        { icon: 'fas fa-building', name: 'Şehir Otelleri' },
        { icon: 'fas fa-umbrella-beach', name: 'Tatil Köyleri' },
        { icon: 'fas fa-key', name: 'Apart Oteller' },
        { icon: 'fas fa-spa', name: 'Termal Oteller' },
    ];
    
    const setupSteps = [
        {
            num: 1,
            icon: 'fas fa-magnifying-glass-chart',
            title: "Keşif & Strateji",
            details: [
                "Mevcut sistemlerinizin (PMS, Kanal Yöneticisi) analizi.",
                "Hedefleriniz doğrultusunda (doğrudan rezervasyon, verimlilik) strateji belirleme.",
                "Size özel entegrasyon ve kurulum yol haritasının oluşturulması."
            ]
        },
        {
            num: 2,
            icon: 'fas fa-cogs',
            title: "Kurulum & Entegrasyon",
            details: [
                "Tüm çözüm modüllerinin anahtar teslim kurulumu.",
                "Mevcut sistemlerinizle tam entegrasyon (PMS, ödeme altyapısı).",
                "Yapay zekanın otelinizin verileriyle (oda tipleri, fiyatlar) eğitilmesi.",
                "Kapsamlı testler ve canlıya geçiş onayı."
            ]
        },
        {
            num: 3,
            icon: 'fas fa-chalkboard-teacher',
            title: "Eğitim & Destek",
            details: [
                "Tüm departmanlarınıza (resepsiyon, satış, yönetim) özel uygulamalı eğitimler.",
                "Platformu en verimli kullanmanız için en iyi pratikler.",
                "7/24 ulaşabileceğiniz özel teknik destek hattı.",
                "Sistemin performansını sürekli izleme."
            ]
        },
        {
            num: 4,
            icon: 'fas fa-chart-line',
            title: "Optimizasyon & Büyüme",
            details: [
                "Aylık performans raporları ve strateji toplantıları.",
                "Yapay zeka modelinin yeni verilerle sürekli iyileştirilmesi.",
                "Yeni otomasyon fırsatlarının belirlenmesi ve uygulanması.",
                "Sektördeki yeni teknolojilerin sisteminize entegre edilmesi."
            ]
        }
    ];

    const partners = [
        { name: 'ElektraWeb', logoUrl: 'https://www.elektraweb.com/wp-content/uploads/2023/07/logo.png' },
        { name: 'Oracle Opera PMS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oracle_opera_pms.svg/1000px-Oracle_opera_pms.svg.png' },
        { name: 'HotelRunner', logoUrl: 'https://d2ls16jjuwn436.cloudfront.net/images/hr-logo-new-dark-v2.svg' },
        { name: 'Stripe', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png' },
        { name: 'Booking.com', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png' },
        { name: 'Expedia Group', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Expedia_Group_logo.svg/1280px-Expedia_Group_logo.svg.png' },
        { name: 'TripAdvisor', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/TripAdvisor_Logo.svg/1280px-TripAdvisor_Logo.svg.png' },
        { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png' },
        { name: 'Airbnb', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png' },
    ];
    
    const guestJourneySteps = [
        { icon: 'fas fa-search-dollar', title: 'Keşif & Rezervasyon', description: 'AI destekli web siteniz ve chatbot, misafirleri çeker ve komisyonsuz rezervasyon aldırır.' },
        { icon: 'fas fa-envelope-open-text', title: 'Konaklama Öncesi İletişim', description: 'Otomatik e-postalarla misafir beklentisini yönetin ve ek hizmet (upsell) satışları yapın.' },
        { icon: 'fas fa-concierge-bell', title: 'Konaklama Deneyimi', description: 'AI Asistan (WhatsApp/Sesli), oda servisi ve diğer talepleri 7/24 karşılayarak kusursuz bir deneyim sunar.' },
        { icon: 'fas fa-hand-holding-heart', title: 'Sadakat & Geri Dönüş', description: 'Otomatik geri bildirim toplama ve kişiselleştirilmiş kampanyalarla misafirlerinizi tekrar kazanır.' }
    ];


  return (
    <div className="bg-slate-900 text-slate-300">
      <style>
          {`
              @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
              }
              .animate-scroll {
                  animation: scroll 40s linear infinite;
              }
              .scroller:hover .animate-scroll {
                  animation-play-state: paused;
              }
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 24px;
                height: 24px;
                background: #2563eb;
                cursor: pointer;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 5px rgba(0,0,0,0.3);
              }
              input[type=range]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                background: #2563eb;
                cursor: pointer;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 5px rgba(0,0,0,0.3);
              }
          `}
      </style>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">OTEL ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                          Komisyonları Unutun, <br /> <span className="text-blue-400">Misafir Sadakati Yaratın</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         9'u 1 arada güç paketimizle tüm operasyonlarınızı tek bir akıllı platformda birleştirin. Doğrudan rezervasyonları artırın, personel verimliliğini yükseltin ve misafirlerinize unutulmaz bir dijital deneyim sunun.
                      </p>
                       <div className="mt-8">
                          <a href="#pricing" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Fiyatları İncele
                          </a>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                        {sliderImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`Akıllı Otel Çözümleri Slayt ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                            />
                        ))}
                  </div>
              </div>
          </div>
      </section>

      <div className="py-8 md:py-12 space-y-16">
            {/* The Old Way vs The Mortanas Way Section */}
            <section className="py-4 md:py-8">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Otel Yönetiminde Devrim: Kaostan Kontrole</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Dağınık sistemlerin yarattığı verimsizliği ve gelir kaybını, hepsi bir arada akıllı platformumuzla nasıl aştığımızı görün.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                            {/* The Old Way */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-[2rem] border-2 border-red-500/20 shadow-xl shadow-red-900/10 relative overflow-hidden group hover:border-red-500/40 transition-colors duration-500">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                <div className="flex items-center space-x-4 mb-6 relative z-10">
                                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center ring-2 ring-red-500/20 group-hover:bg-red-500/20 transition-colors duration-500">
                                        <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-red-400">Eski Yöntem (Kaos)</h3>
                                </div>
                                <ul className="space-y-4 text-slate-400 text-sm md:text-base relative z-10">
                                    <li className="flex items-start"><i className="fas fa-times-circle text-red-500/70 mr-3 mt-1"></i><span><strong>Yüksek Komisyonlar:</strong> OTA'lara ödenen %15-25 komisyonlarla kâr erir.</span></li>
                                    <li className="flex items-start"><i className="fas fa-times-circle text-red-500/70 mr-3 mt-1"></i><span><strong>Dağınık Sistemler:</strong> PMS, sosyal medya, telefonlar... Hepsi ayrı yönetilir, veri kopukluğu yaşanır.</span></li>
                                    <li className="flex items-start"><i className="fas fa-times-circle text-red-500/70 mr-3 mt-1"></i><span><strong>Kaçan Fırsatlar:</strong> Mesai dışı veya yoğun anlarda cevaplanamayan çağrılar ve mesajlar potansiyel misafir kaybıdır.</span></li>
                                    <li className="flex items-start"><i className="fas fa-times-circle text-red-500/70 mr-3 mt-1"></i><span><strong>Verimsiz Personel:</strong> Sürekli farklı ekranlar arasında geçiş yapan, tekrarlayan görevlerle yorulan bir ekip.</span></li>
                                    <li className="flex items-start"><i className="fas fa-times-circle text-red-500/70 mr-3 mt-1"></i><span><strong>Veri Kaybı:</strong> Misafir tercihleri ve önemli notlar kaybolur, kişiselleştirme ve sadakat programları hayal olur.</span></li>
                                </ul>
                            </div>
                            {/* The Mortanas Way */}
                            <div className="bg-gradient-to-br from-[#0a0f1d] via-slate-900 to-[#121b36] p-6 md:p-8 rounded-[2rem] border-2 border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden group hover:border-blue-400/60 hover:shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-500 hover:-translate-y-1">
                                 <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-100 pointer-events-none"></div>
                                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30 shadow-inner shadow-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-500">
                                            <i className="fas fa-rocket text-blue-400 text-2xl group-hover:scale-110 transition-transform duration-500"></i>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-500">Mortanas Yolu (Kontrol)</h3>
                                    </div>
                                    <ul className="space-y-4 text-slate-300 text-sm md:text-base">
                                        <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mr-3 mt-1"></i><span><strong>Sıfır Komisyon:</strong> Doğrudan rezervasyon motoru ile kârın %100'ü size kalır.</span></li>
                                        <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mr-3 mt-1"></i><span><strong>Tek Birleşik Platform:</strong> Tüm rezervasyon, iletişim ve misafir verileri tek bir akıllı CRM'de toplanır.</span></li>
                                        <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mr-3 mt-1"></i><span><strong>7/24 Otomasyon:</strong> Yapay zeka, siz uyurken bile her kanaldan rezervasyon alır ve soruları yanıtlar.</span></li>
                                        <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mr-3 mt-1"></i><span><strong>Güçlenmiş Ekip:</strong> Otomatikleşen görevler sayesinde personeliniz misafir memnuniyetine odaklanır.</span></li>
                                        <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mr-3 mt-1"></i><span><strong>360° Misafir Profili:</strong> Her misafirin tüm geçmişi ve tercihleri tek bir yerde, kişiselleştirilmiş pazarlama için hazır.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* The transformation arrow in the middle for large screens */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-24 h-24" aria-hidden="true">
                            <div className="absolute w-full h-[2px] bg-gradient-to-r from-red-500/50 via-slate-600 to-blue-500/50"></div>
                            <i className="fas fa-arrow-right-long text-4xl text-slate-300 transform bg-slate-900 px-4 animate-pulse"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* Included Services Section */}
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-6 md:py-8">
            <div className="container mx-auto px-8">
              <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Paketin İçindeki Güç: 9 Entegre Çözüm</h2>
                  <p className="mt-3 text-lg text-slate-300 max-w-3xl mx-auto">
                     Otelinizin her departmanını güçlendirmek için tasarlanmış 9 entegre yapay zeka çözümü.
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {includedServices.map(service => (
                     <div key={service.title} className="group">
                        <FeatureCard {...service} />
                     </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Guest Journey Section */}
            <section className="container mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Misafir Yolculuğunun Her Adımında <span className="text-blue-400">Yanınızdayız</span></h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Platformumuz, misafirinizin otelinizle ilk temasından, sadık bir müşteriye dönüşmesine kadar tüm süreci akıllıca ve kesintisiz bir şekilde yönetir.
                    </p>
                </div>
                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-slate-700" aria-hidden="true"></div>
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {guestJourneySteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="relative flex-shrink-0 h-24 w-24 bg-slate-900 rounded-full flex items-center justify-center ring-8 ring-slate-800 border-2 border-blue-500 shadow-lg z-10">
                                    <i className={`${step.icon} text-4xl text-blue-400`}></i>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg -mt-12 pt-16 h-full">
                                    <h4 className="font-bold text-lg text-white">{step.title}</h4>
                                    <p className="text-sm text-slate-400 mt-2">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
          {/* 3 Core Pillars Section */}
            <section className="bg-slate-900 py-24">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Otelciliğin Geleceği için <span className="text-blue-400">3 Temel Direk</span></h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Platformumuz, otelinizi geleceğe taşıyacak üç stratejik felsefe üzerine kurulmuştur.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:border-blue-400 hover:-translate-y-2">
                            <i className="fas fa-magnifying-glass-chart text-5xl text-blue-400 mb-6"></i>
                            <h3 className="text-2xl font-bold text-white mb-4">Veri Odaklı Gelir Yönetimi</h3>
                            <p className="text-slate-300">Dinamik fiyatlandırma, kişiselleştirilmiş ek hizmet (upsell) teklifleri ve tahmine dayalı analitik ile her odadan maksimum geliri elde edin. Kararlarınızı tahminlere değil, yapay zekanın sunduğu somut verilere dayandırın.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:border-blue-400 hover:-translate-y-2">
                            <i className="fas fa-user-astronaut text-5xl text-blue-400 mb-6"></i>
                            <h3 className="text-2xl font-bold text-white mb-4">Kusursuz Misafir Deneyimi</h3>
                            <p className="text-slate-300">7/24 çalışan AI konsiyerj, kişiselleştirilmiş iletişim ve proaktif hizmet ile her misafirinize kendini özel hissettirin. Unutulmaz anılar yaratın, sadık müşteriler kazanın.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:border-blue-400 hover:-translate-y-2">
                            <i className="fas fa-tachometer-alt-fast text-5xl text-blue-400 mb-6"></i>
                            <h3 className="text-2xl font-bold text-white mb-4">Maksimum Operasyonel Verimlilik</h3>
                            <p className="text-slate-300">Tekrarlayan görevleri, rezervasyon yönetimini ve misafir iletişimini otomatikleştirin. Personelinizin zamanını, misafir memnuniyetini artıracak katma değerli işlere ayırmasını sağlayın.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Competitive Edge Section */}
            <section className="bg-gradient-to-b from-slate-900 to-indigo-900/30 py-24">
              <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Rakiplerinizden Nasıl Ayrışırsınız?</h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Bu platform sadece bir verimlilik aracı değil, aynı zamanda size sürdürülebilir bir rekabet avantajı sağlayan stratejik bir silahtır.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg h-full border border-slate-700 flex flex-col hover:border-blue-400">
                        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
                            <i className="fas fa-user-astronaut text-blue-400 text-3xl"></i>
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Benzersiz Misafir Deneyimi</h3>
                        <p className="text-slate-300 text-sm flex-grow">Yapay zeka, her misafire adıyla hitap eder, geçmiş tercihlerini hatırlar ve onlara özel teklifler sunar. Bu, zincir otellerin bile sunamadığı bir kişiselleştirme seviyesidir.</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg h-full border border-slate-700 flex flex-col hover:border-blue-400">
                        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
                            <i className="fas fa-magnifying-glass-chart text-blue-400 text-3xl"></i>
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Veriye Dayalı Pazarlama</h3>
                        <p className="text-slate-300 text-sm flex-grow">Hangi müşteri segmentinin hangi tekliflere yanıt verdiğini anlayın. Pazarlama bütçenizi tahminlere değil, somut verilere dayalı olarak en kârlı kanallara yönlendirin.</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg h-full border border-slate-700 flex flex-col hover:border-blue-400">
                        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
                            <i className="fas fa-tachometer-alt-fast text-blue-400 text-3xl"></i>
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Operasyonel Mükemmellik</h3>
                        <p className="text-slate-300 text-sm flex-grow">Otomatikleştirilmiş süreçler sayesinde daha az personelle daha çok iş yapın. Bu size fiyatlandırmada esneklik ve hizmet kalitesinde tutarlılık olarak geri döner.</p>
                    </div>
                </div>
              </div>
            </section>
            
             {/* Turnkey Setup Section */}
             <section className="bg-gradient-to-br from-slate-900 to-blue-900/30 py-24">
                <div className="container mx-auto px-8">
                 <div className="text-center mb-20">
                     <h2 className="text-3xl md:text-4xl font-bold text-white">Anahtar Teslim Kurulum: <span className="text-blue-400">4 Adımda Dijital Dönüşüm</span></h2>
                     <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                         Endişelenmeyin, tüm süreci sizin için şeffaf ve profesyonel bir şekilde yönetiyoruz.
                     </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {setupSteps.map((step) => (
                         <div key={step.num} className="group relative bg-slate-800 rounded-2xl shadow-xl border border-transparent transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2">
                             <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-lg border-4 border-slate-900 group-hover:bg-blue-700 transition-colors">
                                 {`0${step.num}`}
                             </div>
                             
                             <div className="p-8 pt-16">
                                 <div className="mb-4 text-right">
                                      <i className={`${step.icon} text-4xl text-blue-500 group-hover:text-blue-400 transition-colors`}></i>
                                 </div>
                                 <h3 className="text-xl font-bold text-white mb-4 h-14">{step.title}</h3>
                                  <ul className="space-y-3 text-sm text-slate-300">
                                     {step.details.map((detail, i) => (
                                         <li key={i} className="flex items-start">
                                             <i className="fas fa-check-circle text-green-400 mr-3 mt-1 flex-shrink-0"></i>
                                             <span>{detail}</span>
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                         </div>
                     ))}
                 </div>
                </div>
             </section>
            
            {/* Security and Reliability Section */}
            <section className="bg-slate-900 py-24">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Güvenlik ve Güvenilirlik: <span className="text-blue-400">Verileriniz Bizimle Güvende</span></h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Misafir verilerinizin güvenliği ve platformumuzun kesintisiz çalışması en büyük önceliğimizdir.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'fas fa-shield-halved', title: 'KVKK & GDPR Uyumu', description: 'Tüm veri işleme süreçlerimiz, ulusal ve uluslararası veri koruma kanunlarına (KVKK, GDPR) tam uyumludur.' },
                            { icon: 'fas fa-cloud-arrow-up', title: '%99.9 Kesintisiz Çalışma', description: 'Global standartlardaki bulut altyapımız sayesinde platformumuz kesintisiz olarak çalışır, işiniz asla yarım kalmaz.' },
                            { icon: 'fas fa-lock', title: 'Uçtan Uca Şifreleme', description: 'Tüm misafir verileri ve iç iletişiminiz, bankacılık düzeyinde güvenlik sağlayan SSL/TLS şifreleme ile korunur.' },
                            { icon: 'fas fa-headset', title: '7/24 İzleme ve Destek', description: 'Sistemlerimiz proaktif olarak 7/24 izlenir ve herhangi bir sorun anında uzman teknik ekibimiz müdahale etmeye hazırdır.' }
                        ].map(item => (
                             <div key={item.title} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <i className={`${item.icon} text-3xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
          
           {/* Platform Deep Dive Section */}
            <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="container mx-auto px-8">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Platforma Derinlemesine Bakış</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Tüm operasyonlarınızı yöneteceğiniz merkezi ve akıllı kontrol paneliniz.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                       {platformModules.map(module => (
                           <PlatformModuleCard key={module.title} {...module} />
                       ))}
                    </div>
                </div>
              </div>
            </section>

          {/* Meet Your AI Team Section */}
            <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Tanışın: Otelinizin Yeni Akıllı Ekibi</h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Platformumuz, otelinizin farklı departmanları için uzmanlaşmış yapay zeka asistanlarından oluşur.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: 'fas fa-calendar-check', name: 'Alex - Rezervasyon Uzmanı', role: '7/24 çalışır, tüm kanallardan rezervasyonları alır ve misafir sorularını yanıtlar.' },
                        { icon: 'fas fa-comments-dollar', name: 'Sofia - Sosyal Medya Yöneticisi', role: 'Instagram, WhatsApp ve Facebook\'taki sohbetleri yönetir, satış fırsatları yaratır.' },
                        { icon: 'fas fa-headset', name: 'Leo - Sesli Resepsiyonist', role: 'Telefon çağrılarını karşılar, sesli olarak rezervasyon alır ve personelinizi bilgilendirir.' },
                        { icon: 'fas fa-chart-line', name: 'Clara - Gelir Stratejisti', role: 'Fiyatları dinamik olarak optimize eder, doluluğu tahminler ve gelir artırıcı öneriler sunar.' }
                    ].map(assistant => (
                        <div key={assistant.name} className="bg-slate-800 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-blue-500">
                            <div className="flex-shrink-0 h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <i className={`${assistant.icon} text-blue-400 text-4xl`}></i>
                            </div>
                            <h3 className="font-bold text-xl text-white">{assistant.name}</h3>
                            <p className="text-slate-300 text-sm mt-2">{assistant.role}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Heart of the Platform: AI Engine Section */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.15),rgba(255,255,255,0))]"></div>

                <div className="container mx-auto px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Teknolojimizin Kalbi: <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Akıllı Otelcilik Motoru</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Platformumuzun gücü, otelcilik sektörü için özel olarak tasarlanmış, sürekli öğrenen yapay zeka çekirdeğinden gelir.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'fas fa-user-astronaut', title: 'Kişiselleştirme Motoru', description: 'Misafir verilerini analiz ederek kişiselleştirilmiş teklifler, upsell fırsatları ve pazarlama mesajları oluşturur.' },
                            { icon: 'fas fa-dollar-sign', title: 'Dinamik Fiyatlandırma', description: 'Piyasa talebini, rakip fiyatlarını ve etkinlikleri izleyerek en uygun oda fiyatlarını gerçek zamanlı olarak önerir.' },
                            { icon: 'fas fa-comments', title: 'Doğal Dil İşleme (NLP)', description: 'Chatbot ve sesli asistanlarımızın misafir taleplerini bir insan gibi anlamasını ve yanıtlamasını sağlar.' },
                            { icon: 'fas fa-chart-line', title: 'Tahmine Dayalı Analitik', description: 'Gelecekteki doluluk oranlarını tahmin eder, misafir kayıp riskini belirler ve stratejik kararlar için içgörüler sunar.' }
                        ].map((engine, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <i className={`${engine.icon} text-3xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{engine.title}</h3>
                                <p className="text-slate-300 text-sm">{engine.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* 9-in-1 Power Pack Offer Section */}
            <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="lg:col-span-3 text-center lg:text-left text-white">
                        <span className="inline-flex items-center text-sm font-bold tracking-wider text-yellow-900 bg-yellow-400 px-4 py-2 rounded-full uppercase shadow">
                            <i className="fas fa-fire-alt mr-2"></i>
                            Yılın Fırsatı
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
                            9'u 1 Arada Güç Paketi
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
                            Oteliniz için uyarlanmış 9 farklı yazılım ve yapay zeka uygulamasından oluşan tam entegre çözümümüzün normal değeri <del className="text-red-400 font-semibold">$10,000</del>'dır.
                        </p>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
                            Sınırlı bir süre için, tüm yıl masraflar dahil, aylık ödeme olmadan, tek seferlik ödeme ile sahip olun!
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-8 py-4 border border-slate-700">
                                <span className="text-5xl font-extrabold text-yellow-400 tracking-wider">$3,000</span>
                            </div>
                            <a href="#pricing" className="bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                                <span>Bu Fırsatı Yakala</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    {/* Right: Countdown Timer */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
                            <p className="text-center font-semibold text-slate-200 mb-6 text-lg">Teklifin Sona Ermesine Kalan Süre:</p>
                            <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center text-white">
                                <div className="bg-slate-900/50 rounded-lg p-4 w-24 shadow-inner">
                                    <span className="text-5xl font-bold tracking-tight">{timeLeft.days}</span>
                                    <span className="block text-sm text-slate-300 mt-1">Gün</span>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-24 shadow-inner">
                                    <span className="text-5xl font-bold tracking-tight">{timeLeft.hours}</span>
                                    <span className="block text-sm text-slate-300 mt-1">Saat</span>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-24 shadow-inner">
                                    <span className="text-5xl font-bold tracking-tight">{timeLeft.minutes}</span>
                                    <span className="block text-sm text-slate-300 mt-1">Dakika</span>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-24 shadow-inner">
                                    <span className="text-5xl font-bold tracking-tight">{timeLeft.seconds}</span>
                                    <span className="block text-sm text-slate-300 mt-1">Saniye</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           {/* Ideal For Section */}
           <section className="bg-gradient-to-br from-slate-900 to-blue-900/30 py-24">
             <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Kimler İçin İdeal?</h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Çözümümüz, farklı büyüklükteki ve segmentlerdeki otellerin ihtiyaçlarını karşılamak üzere esnek bir yapıda tasarlanmıştır.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {idealFor.map((target) => (
                        <div key={target.name} className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-transparent hover:border-blue-500 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex-shrink-0 h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                     <i className={`${target.icon} text-blue-400 text-4xl`}></i>
                                </div>
                                <h4 className="font-bold text-white mt-6 text-lg">{target.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </section>
            
            {/* Pricing Section */}
            <section id="pricing" className="bg-gradient-to-b from-slate-900 to-indigo-900/20 py-24">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Her Otele Uygun, Şeffaf ve Esnek Fiyatlandırma</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            İşletmenizin büyüklüğüne ve ihtiyaçlarına göre tasarlanmış paketlerimizle, komisyon ödemeden büyümeye bugünden başlayın.
                        </p>
                    </div>
                    
                    <div className="flex justify-center mb-12">
                        <div className="bg-slate-800 rounded-lg p-1 flex items-center space-x-1">
                            <button onClick={() => setBillingCycle('monthly')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Aylık Ödeme</button>
                            <button onClick={() => setBillingCycle('annually')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${billingCycle === 'annually' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                                Yıllık Ödeme
                                <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">2 Ay Ücretsiz</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                        {pricingTiers.map((tier, index) => {
                            const annualPrice = tier.monthly * 10;
                            const price = billingCycle === 'annually' ? annualPrice : tier.monthly;
                            const paymentSearchParams = new URLSearchParams({
                                plan: `Otel Çözümü - ${tier.name}`,
                                price: tier.isEnterprise ? '0' : (billingCycle === 'annually' ? annualPrice.toString() : tier.monthly.toString()),
                                type: 'otel-cozumu',
                                cycle: billingCycle,
                                currency: 'USD',
                                setupFee: tier.setup.toString(),
                            }).toString();
                            
                            return (
                                <div key={index} className={`rounded-2xl shadow-lg flex flex-col transition-all duration-300 ${tier.popular ? 'bg-slate-800 text-white transform lg:scale-105 ring-4 ring-blue-500 z-10' : 'bg-slate-800/50 backdrop-blur-sm text-slate-300 border border-slate-700'}`}>
                                    {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">En Popüler</div>}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                                        <p className={`mt-2 font-semibold ${tier.popular ? 'text-blue-300' : 'text-blue-400'}`}>{tier.rooms}</p>
                                        <p className={`mt-4 text-sm h-16 ${tier.popular ? 'text-slate-300' : 'text-slate-400'}`}>{tier.description}</p>
                                        
                                        {!tier.isEnterprise ? (
                                            <>
                                                <div className="mt-6">
                                                    <span className={`text-5xl font-extrabold ${tier.popular ? 'text-white' : 'text-white'}`}>
                                                        {usdFormatter.format(billingCycle === 'annually' ? price / 12 : price)}
                                                    </span>
                                                    <span className={`text-lg font-medium ${tier.popular ? 'text-slate-400' : 'text-slate-400'}`}>/ay</span>
                                                </div>
                                                {billingCycle === 'annually' && <p className={`text-sm mt-1 font-semibold ${tier.popular ? 'text-blue-300' : 'text-blue-400'}`}>Yıllık {usdFormatter.format(price)} olarak faturalandırılır</p>}
                                                <p className={`mt-4 text-sm font-semibold ${tier.popular ? 'text-slate-300' : 'text-slate-400'}`}>
                                                    + {usdFormatter.format(tier.setup)} tek seferlik kurulum ücreti
                                                </p>
                                            </>
                                        ) : (
                                            <div className="mt-6 h-[124px] flex items-center justify-center">
                                                <span className="text-3xl font-bold">Özelleştirilmiş Fiyat</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`p-8 mt-auto flex-grow flex flex-col rounded-b-2xl ${tier.popular ? 'bg-slate-700/50' : 'bg-slate-700/30'}`}>
                                        <ul className="space-y-4 flex-grow">
                                            {tier.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start">
                                                    <i className={`fas fa-check-circle mr-3 mt-1 ${tier.popular ? 'text-blue-400' : 'text-blue-500'}`}></i>
                                                    <span className={`text-sm ${tier.popular ? 'text-slate-300' : 'text-slate-300'}`}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8">
                                            {tier.isEnterprise ? (
                                                <Link to="/kurumsal" className={`block w-full text-center py-3 font-semibold rounded-lg transition-colors ${tier.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>Teklif Alın</Link>
                                            ) : (
                                                <Link to={`/odeme?${paymentSearchParams}`} className={`block w-full text-center py-3 font-semibold rounded-lg transition-colors ${tier.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>Hemen Başla</Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center text-white mb-8">Tüm Özellikleri Karşılaştırın</h3>
                        <div className="max-w-7xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-semibold text-white w-1/4">Özellik</th>
                                            {pricingTiers.map(tier => <th key={tier.name} scope="col" className="px-6 py-4 font-semibold text-white text-center">{tier.name}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {comparisonFeatures.map((feature, index) => {
                                            if (feature.type === 'heading') {
                                                return (
                                                    <tr key={index} className="bg-blue-900/30">
                                                        <td colSpan={4} className="px-6 py-3 font-bold text-blue-300">{feature.name}</td>
                                                    </tr>
                                                );
                                            }
                                            
                                            const renderCheckmark = (value: any) => {
                                                if (typeof value === 'boolean') {
                                                    return value ? <i className="fas fa-check-circle text-xl text-green-400"></i> : <i className="fas fa-minus-circle text-xl text-slate-600"></i>;
                                                }
                                                return <span className="text-slate-300 font-medium">{value}</span>;
                                            }

                                            return (
                                                <tr key={index} className="hover:bg-slate-800/50">
                                                    <td className="px-6 py-4 font-medium text-white">{feature.name as string}</td>
                                                    <td className="px-6 py-4 text-center">{renderCheckmark((feature as any).butik)}</td>
                                                    <td className="px-6 py-4 text-center">{renderCheckmark((feature as any).profesyonel)}</td>
                                                    <td className="px-6 py-4 text-center">{renderCheckmark((feature as any).kurumsal)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Advantages Section */}
            <section className="bg-gradient-to-b from-slate-900 to-indigo-900/20 py-24">
              <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Mortanas Farkı: <span className="text-blue-400">Ölçülebilir Sonuçlar</span></h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                       Yatırımınızın karşılığını somut rakamlarla görün.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    <ValueCard icon="fas fa-hand-holding-dollar" target={35} suffix="%" title="Doğrudan Rezervasyon Artışı" description="OTA komisyonlarından kurtulun, kâr marjınızı en üst seviyeye çıkarın." />
                    <ValueCard icon="fas fa-headset" target={60} suffix="%" title="Operasyonel Maliyet Düşüşü" description="Tekrarlayan görevleri otomatikleştirerek personelinizin misafir memnuniyetine odaklanmasını sağlayın." />
                    <ValueCard icon="fas fa-star" target={25} suffix="%" title="Misafir Memnuniyeti Artışı" description="7/24 kesintisiz ve kişiselleştirilmiş hizmet ile misafir sadakatini güçlendirin." />
                    <ValueCard icon="fas fa-users-cog" target={50} suffix="%" title="Personel Verimliliği Artışı" description="Ekibiniz tekrarlayan görevlerden kurtulup misafir deneyimine odaklanır." />
                    <ValueCard icon="fas fa-arrow-trend-up" target={20} suffix="%" title="Ek Gelir (Upsell) Artışı" description="AI, doğru misafire doğru zamanda ek hizmetler önererek gelirinizi artırır." />
                </div>
              </div>
            </section>
          
                      {/* Testimonials Section */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                            Mutlu Otel Yöneticileri
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                            Çözümümüzü kullanan otellerin sahipleri ve yöneticileri ne diyor?
                        </p>
                    </div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="overflow-hidden relative">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out" 
                                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                            >
                                {testimonialChunks.map((chunk, slideIndex) => (
                                    <div key={slideIndex} className="flex-shrink-0 w-full px-4">
                                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {chunk.map((testimonial, cardIndex) => (
                                          <TestimonialCard 
                                              key={cardIndex} 
                                              quote={testimonial.quote}
                                              name={testimonial.name}
                                              title={testimonial.title}
                                              avatarUrl={testimonial.avatarUrl}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button 
                            onClick={handlePrevTestimonial}
                            className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-slate-800 rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10"
                            aria-label="Önceki yorum"
                        >
                            <i className="fas fa-chevron-left text-blue-400"></i>
                        </button>
                        <button 
                            onClick={handleNextTestimonial}
                            className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-slate-800 rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10"
                            aria-label="Sonraki yorum"
                        >
                            <i className="fas fa-chevron-right text-blue-400"></i>
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex justify-center space-x-3 mt-12">
                            {testimonialChunks.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-blue-400 scale-125' : 'bg-slate-600 hover:bg-slate-400'}`}
                                    aria-label={`Yorum sayfası ${index + 1}'e git`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Interactive Demos Section */}
            <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                        Deneyin ve Kendiniz Görün: <span className="text-blue-400">İnteraktif Demolar</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                        Platformumuzun gücünü canlı olarak test edin. Yapay zeka asistanlarımızla sohbet edin ve yönetim panelimizin kullanım kolaylığını keşfedin.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Demo Panel Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center text-center">
                        <div className="h-20 w-20 rounded-2xl bg-blue-900/50 flex items-center justify-center mb-6 border border-blue-700">
                            <i className="fas fa-desktop text-4xl text-blue-400"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Otel Yönetim Panelini Test Edin</h3>
                        <p className="text-slate-400 text-sm flex-grow">Tüm özellikleri canlı olarak deneyimleyin. Rezervasyon oluşturun, oda durumunu değiştirin ve raporları inceleyin.</p>
                        <div className="bg-slate-700/50 w-full p-4 rounded-lg my-6">
                            <p className="text-sm text-slate-300">Admin Giriş Şifresi:</p>
                            <p className="font-mono text-lg font-bold text-yellow-400 tracking-widest">mortanas</p>
                        </div>
                        <a href="https://www.mortanas.com/mortanasotel" target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                            Demo Siteye Git
                        </a>
                    </div>

                    {/* Instagram Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center text-center">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center mb-6 border border-pink-700">
                            <i className="fab fa-instagram text-4xl text-pink-400"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Instagram AI ile Sohbet Edin</h3>
                        <p className="text-slate-400 text-sm flex-grow">Yapay zeka asistanımıza mesaj atın. Oda müsaitliği sorun, fiyat bilgisi alın veya rezervasyon yapmayı deneyin.</p>
                        <div className="bg-slate-700/50 w-full p-4 rounded-lg my-6">
                            <p className="text-sm text-slate-300">Hedef Hesap:</p>
                            <p className="font-mono text-lg font-bold text-yellow-400">@mortanasotel</p>
                        </div>
                        <a href="https://ig.me/m/mortanasotel" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-orange-600 transition-all">
                            Mesaj Gönder
                        </a>
                    </div>
                    
                    {/* WhatsApp Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center text-center">
                        <div className="h-20 w-20 rounded-2xl bg-green-900/50 flex items-center justify-center mb-6 border border-green-700">
                            <i className="fab fa-whatsapp text-4xl text-green-400"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">WhatsApp'tan Rezervasyon Yapın</h3>
                        <p className="text-slate-400 text-sm flex-grow">Whatsapp üzerinden yapay zekamızla konuşarak 7/24 rezervasyon sürecini nasıl otomatikleştirdiğimizi canlı olarak görün.</p>
                        <div className="bg-slate-700/50 w-full p-4 rounded-lg my-6">
                            <p className="text-sm text-slate-300">Hedef Numara:</p>
                            <p className="font-mono text-lg font-bold text-yellow-400">+90 554 011 8888</p>
                        </div>
                        <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all">
                            WhatsApp'ta Başlat
                        </a>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 bg-slate-800/50">
                <div className="container mx-auto px-8">
                    <h3 className="text-center text-slate-300 font-semibold uppercase tracking-wider mb-12">Entegrasyon ve İş Ortaklarımız</h3>
                    <div className="scroller w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}>
                        <div className="flex w-max animate-scroll">
                            {[...partners, ...partners].map((partner, index) => (
                                <div key={index} className="flex-shrink-0 mx-10 flex items-center h-20" title={partner.name}>
                                    <img
                                        src={partner.logoUrl}
                                        alt={partner.name}
                                        className="max-h-10 md:max-h-12 object-contain filter grayscale brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="bg-slate-900 py-24">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Aklınızdaki soruların cevaplarını burada bulabilirsiniz.
                        </p>
                    </div>
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="space-y-4">
                            {faqs.slice(0, 5).map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    faq={faq}
                                    isOpen={openFaqIndex === index}
                                    onClick={() => handleFaqClick(index)}
                                />
                            ))}
                        </div>
                        <div className="space-y-4">
                             {faqs.slice(5, 10).map((faq, index) => {
                                const globalIndex = index + 5;
                                return (
                                    <FAQItem
                                        key={globalIndex}
                                        faq={faq}
                                        isOpen={openFaqIndex === globalIndex}
                                        onClick={() => handleFaqClick(globalIndex)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section>
              <div className="container mx-auto px-8">
                <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                     <h2 className="text-3xl font-bold mb-4">Otelinizin Dijital Dönüşümüne Bugün Başlayın!</h2>
                     <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                        Uzman ekibimizle görüşerek otelinizin ihtiyaçlarına özel bir demo talep edin ve yapay zekanın gücünü ilk elden deneyimleyin.
                     </p>
                     <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                          <Link to="/kurumsal" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                              Ücretsiz Demo Talep Et
                          </Link>
                          <a href="https://www.mortanas.com/mortanasotel" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                              Canlı Demo Sitesini Gör <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                          </a>
                      </div>
                </div>
              </div>
            </section>
      </div>

    </div>
  );
};

export default OtelCozumlerimizPage;