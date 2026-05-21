import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APPLICATIONS, TESTIMONIALS } from '../constants';
import TestimonialCard from '../components/TestimonialCard';
import type { FAQ, Reference } from '../types';

const AnimateInView: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.1 }
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
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string }> = ({ target, prefix = '', suffix = '' }) => {
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
                    if (start === end) {
                        setCount(end);
                        return;
                    }

                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    const increment = (end - start) / totalFrames;

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, frameRate);
                }
            },
            { threshold: 0.5 }
        );
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [target]);

    const formattedCount = Math.ceil(count).toLocaleString('tr-TR');

    return (
        <span ref={ref}>
            {prefix}{formattedCount}{suffix}
        </span>
    );
};


// FAQItem component for the accordion
const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-blue-500">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-sm text-slate-300">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

// LogoCarousel component for the scrolling references
const LogoCarousel: React.FC<{ logos: Reference[] }> = ({ logos }) => {
    // Duplicate logos for a seamless loop
    const extendedLogos = [...logos, ...logos];

    return (
        <>
            <style>
                {`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 60s linear infinite;
                    }
                    .scroller:hover .animate-scroll {
                        animation-play-state: paused;
                    }
                `}
            </style>
            <div className="scroller w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}>
                <div className="flex w-max animate-scroll">
                    {extendedLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0 mx-10 flex items-center" title={logo.name}>
                            <img 
                                src={logo.logoUrl} 
                                alt={logo.name} 
                                className="h-16 md:h-20 max-w-none object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


const ApplicationDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const application = APPLICATIONS.find(app => app.slug === slug);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually' | 'lifetime'>('monthly');

    const [offerEndDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date;
    });

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    const featureCategories = useMemo(() => {
        if (!application || application.slug !== 'sirket-yonitimi-crm') return [];
        const categories = new Set(application.features.map(f => f.category).filter(Boolean));
        return Array.from(categories) as string[];
    }, [application]);

    const [activeTab, setActiveTab] = useState(featureCategories[0]);
    const [demoPassword, setDemoPassword] = useState('');
    const [demoError, setDemoError] = useState('');

    const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

    const testimonialChunks = useMemo(() => {
        const chunks = [];
        const testimonialsToUse = [
          { quote: 'Mortanas Otel CRM\'i sayesinde rezervasyon sürecimiz %40 hızlandı ve manuel hatalar neredeyse sıfıra indi. Misafir memnuniyetimizdeki artış gözle görülür düzeyde.', name: 'Ahmet Yılmaz', title: 'Otel Müdürü, Ege Palace', avatarUrl: 'https://randomuser.me/api/portraits/men/44.jpg' },
          { quote: 'Online yorum yönetimi ve komisyonsuz rezervasyon motoru özellikleri bizim için oyun değiştirici oldu. OTA maliyetlerimiz %25 azaldı!', name: 'Elif Kaya', title: 'İşletme Sahibi, Boutique Hotel İstanbul', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { quote: 'Online randevu sistemi sayesinde telefon trafiğimiz yarı yarıya azaldı. Müşterilerimiz de 7/24 randevu alabilmekten çok memnun. Mortanas\'a teşekkürler!', name: 'Seda Kurtuluş', title: 'İşletme Sahibi, Serenity Spa', avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg' },
          { quote: 'Personel ve prim yönetimi modülü işimizi inanılmaz kolaylaştırdı. Otomatik hatırlatmalar sayesinde randevuya gelmeme oranımız neredeyse sıfırlandı.', name: 'Barış Arslan', title: 'Yönetici, Zen Wellness', avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg' },
          { quote: 'Mortanas Emlak CRM\'i sayesinde tüm portallardan gelen müşterileri tek bir yerden yönetmek işimizi inanılmaz kolaylaştırdı. Artık hiçbir fırsatı kaçırmıyoruz!', name: 'Serkan Öztürk', title: 'Kurucu, Lüks Konut Emlak', avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg' },
          { quote: 'Yapay zeka destekli müşteri puanlama ve otomatik takip özellikleri sayesinde, satış ekibimiz zamanını sadece ciddi alıcılara ayırıyor. Verimliliğimiz %60 arttı.', name: 'Derya Yılmaz', title: 'Satış Müdürü, Proje Gayrimenkul A.Ş.', avatarUrl: 'https://randomuser.me/api/portraits/women/78.jpg' }
        ];
        for (let i = 0; i < testimonialsToUse.length; i += 3) {
            chunks.push(testimonialsToUse.slice(i, i + 3));
        }
        return chunks;
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentTestimonial(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
        }, 7000);

        return () => clearInterval(slideInterval);
    }, [testimonialChunks.length]);
    
    const handlePrevTestimonial = () => {
        setCurrentTestimonial(prev => (prev === 0 ? testimonialChunks.length - 1 : prev - 1));
    };

    const handleNextTestimonial = () => {
        setCurrentTestimonial(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
    };

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index);
    };

    const handleDemoAccess = (e: React.FormEvent) => {
        e.preventDefault();
        if (demoPassword.toLowerCase() === 'ankara') {
            setDemoError('');
            window.open('https://mortanas.com/wellness.html', '_blank', 'noopener,noreferrer');
        } else {
            setDemoError('Geçersiz şifre. Lütfen tekrar deneyin.');
        }
    };


     useEffect(() => {
        if (featureCategories.length > 0) {
            setActiveTab(featureCategories[0]);
        }
    }, [featureCategories]);

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = +offerEndDate - +new Date();
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [offerEndDate]);


    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const getBillingCycleButtonClass = (cycle: 'monthly' | 'annually' | 'lifetime') => {
        return billingCycle === cycle
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-100';
    };

    if (!application) {
        return (
            <div className="text-center py-24 container mx-auto px-8">
                <h1 className="text-4xl font-bold mb-4">Uygulama Bulunamadı</h1>
                <p className="text-lg text-gray-600 mb-8">Aradığınız uygulamayı bulamadık.</p>
                <Link to="/" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                    Anasayfaya Geri Dön
                </Link>
            </div>
        );
    }
    
    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent(`Merhaba, "${application.title}" uygulaması hakkında detaylı bilgi almak istiyorum.`)}`;
    
    let displayPrice = 0;
    let originalPrice = 0;
    
    if (application.pricing) {
        const discountedMonthly = application.pricing.monthly * 0.7;
        const discountedAnnually = application.pricing.annually * 0.7;
        const discountedLifetime = application.pricing.lifetime * 0.7;

        switch (billingCycle) {
            case 'monthly':
                displayPrice = discountedMonthly;
                originalPrice = application.pricing.monthly;
                break;
            case 'annually':
                displayPrice = discountedAnnually;
                originalPrice = application.pricing.annually;
                break;
            case 'lifetime':
                displayPrice = discountedLifetime;
                originalPrice = application.pricing.lifetime;
                break;
        }
    }
    
    const paymentSearchParams = new URLSearchParams({
        plan: application.name,
        price: displayPrice.toString(),
        type: 'application',
        cycle: billingCycle,
    }).toString();

    const isOfferActive = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;
    
    const isCrmPage = application.slug === 'sirket-yonitimi-crm';

    return (
        <div className="bg-slate-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">{application.sector} UYGULAMASI</span>
                            {isCrmPage ? (
                                <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
                                    İşletmeniz İçin <span className="text-blue-400">360° Kontrol</span>
                                </h1>
                            ) : (
                                <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{application.title}</h1>
                            )}
                            <p className="mt-6 text-lg text-blue-200">{application.longDescription}</p>
                             <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link
                                    to={`/paketler?type=application`}
                                    className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                                >
                                    <i className="fas fa-tags"></i>
                                    <span>Paketleri İncele</span>
                                </Link>
                                <a 
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                                >
                                    <i className="fab fa-whatsapp"></i>
                                    <span>Demo Talep Et</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <img src={application.imageUrl} alt={application.title} className="w-full h-auto object-cover rounded-2xl shadow-2xl ring-4 ring-blue-500/30" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-24 space-y-24">
            
                {/* Social Proof Section */}
                <section className="container mx-auto px-8">
                    <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700">
                             <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-arrow-trend-up text-4xl text-blue-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">%60+</p>
                                <p className="text-slate-300 font-medium">Verimlilik Artışı</p>
                            </div>
                            <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-hand-holding-dollar text-4xl text-green-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">%45+</p>
                                <p className="text-slate-300 font-medium">Kârlılık ve Büyüme</p>
                            </div>
                            <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-users text-4xl text-indigo-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">500+</p>
                                <p className="text-slate-300 font-medium">Mutlu İşletme</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Problem, Solution, Goal Section - Redesigned */}
                {application.problem && application.solution && application.goal && (
                     <section>
                        <div className="container mx-auto px-8">
                            <AnimateInView>
                                <div className="bg-gradient-to-b from-slate-900 to-indigo-900/20 rounded-3xl p-8 md:p-12 border border-indigo-500/30">
                                    <div className="text-center mb-20">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">Sorundan Değere: <span className="text-blue-400">Dönüşüm Köprüsü</span></h2>
                                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                            İşletmenizin karşılaştığı zorlukları nasıl somut ve ölçülebilir sonuçlara dönüştürdüğümüzü adım adım keşfedin.
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                            {/* Connecting Arrows for Desktop */}
                                            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 w-full justify-around items-center px-8" aria-hidden="true">
                                                <i className="fas fa-angles-right text-4xl text-slate-600 animate-pulse"></i>
                                                <i className="fas fa-angles-right text-4xl text-slate-600 animate-pulse [animation-delay:200ms]"></i>
                                                <i className="fas fa-angles-right text-4xl text-slate-600 animate-pulse [animation-delay:400ms]"></i>
                                            </div>
                                            
                                            {/* Step 1: Temel Zorluklar */}
                                            <AnimateInView delay={0} className="z-10">
                                                <div className="h-full bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-red-500 transition-all duration-300 hover:shadow-red-500/10 hover:-translate-y-2 flex flex-col">
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center ring-2 ring-red-500/30">
                                                            <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-red-400">Temel Zorluklar</h3>
                                                    </div>
                                                    <p className="text-slate-300 flex-grow">{application.problem}</p>
                                                </div>
                                            </AnimateInView>

                                            {/* Step 2: Nihai Hedefimiz */}
                                            <AnimateInView delay={200} className="z-10">
                                                <div className="h-full bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 transition-all duration-300 hover:shadow-orange-500/10 hover:-translate-y-2 flex flex-col">
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center ring-2 ring-orange-500/30">
                                                            <i className="fas fa-crosshairs text-orange-400 text-2xl"></i>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-orange-400">Nihai Hedefimiz</h3>
                                                    </div>
                                                    <p className="text-slate-300 flex-grow">{application.goal}</p>
                                                </div>
                                            </AnimateInView>

                                            {/* Step 3: Mortanas Çözümü */}
                                            <AnimateInView delay={400} className="z-10">
                                                <div className="h-full bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-green-500 transition-all duration-300 hover:shadow-green-500/10 hover:-translate-y-2 flex flex-col">
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center ring-2 ring-green-500/30">
                                                            <i className="fas fa-rocket text-green-400 text-2xl"></i>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-green-400">Mortanas Çözümü</h3>
                                                    </div>
                                                    <p className="text-slate-200 font-medium flex-grow">{application.solution}</p>
                                                </div>
                                            </AnimateInView>

                                            {/* Step 4: Stratejik Değer */}
                                            <AnimateInView delay={600} className="z-10">
                                                <div className="h-full bg-gradient-to-br from-blue-800 to-indigo-900 p-8 rounded-2xl shadow-lg border-t-4 border-blue-400 transition-all duration-300 hover:shadow-blue-400/20 hover:-translate-y-2 ring-2 ring-blue-500/50 flex flex-col">
                                                    <div className="flex items-center space-x-4 mb-6">
                                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center ring-2 ring-blue-500/40">
                                                            <i className="fas fa-trophy text-blue-300 text-2xl"></i>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-blue-300">Stratejik Değer</h3>
                                                    </div>
                                                    <div className="space-y-4 flex-grow">
                                                        <div className="bg-slate-900/50 p-4 rounded-lg flex items-center space-x-4">
                                                            <i className="fas fa-rocket text-2xl text-green-400"></i>
                                                            <div>
                                                                <p className="text-2xl font-bold text-white"><AnimatedCounter target={60} prefix="+" suffix="%" /></p>
                                                                <p className="text-xs font-semibold text-slate-300">Verimlilik Artışı</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-900/50 p-4 rounded-lg flex items-center space-x-4">
                                                            <i className="fas fa-dollar-sign text-2xl text-green-400"></i>
                                                            <div>
                                                                <p className="text-2xl font-bold text-white"><AnimatedCounter target={35} prefix="+" suffix="%" /></p>
                                                                <p className="text-xs font-semibold text-slate-300">Gelir Artışı</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-900/50 p-4 rounded-lg flex items-center space-x-4">
                                                            <i className="fas fa-shield-halved text-2xl text-green-400"></i>
                                                            <div>
                                                                <p className="text-2xl font-bold text-white"><AnimatedCounter target={70} prefix="+" suffix="%" /></p>
                                                                <p className="text-xs font-semibold text-slate-300">Operasyonel Tasarruf</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AnimateInView>
                                        </div>
                                    </div>
                                </div>
                            </AnimateInView>
                        </div>
                    </section>
                )}


                {/* Why Choose Us Section */}
                {application.whyChooseUs && (
                    <section>
                        <div className="container mx-auto px-8">
                            <div className="bg-slate-800/30 rounded-3xl p-8 md:p-12 border border-slate-700 relative">
                                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
                                <div className="relative z-10">
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            Neden Bizi <span className="text-blue-400">Tercih Etmelisiniz?</span>
                                        </h2>
                                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                            Sizi sektördeki diğer çözümlerden ayıran temel farklarımız ve sunduğumuz benzersiz değerler.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {application.whyChooseUs.map((item, index) => (
                                            <div key={index} className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                                <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                                                    <i className={`${item.icon} text-3xl`}></i>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                                <p className="text-slate-300">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {/* Benefits Section */}
                {application.benefits && (
                    <section>
                        <div className="container mx-auto px-8">
                             <div className="bg-gradient-to-tr from-slate-900 to-purple-900/10 rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                                <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(167,139,250,0.1),rgba(255,255,250,0))]"></div>
                                <div className="relative z-10">
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            Uygulamanın <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Sağladığı Avantajlar</span>
                                        </h2>
                                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                            İşletmenizi daha verimli yönetin, müşteri ilişkilerini güçlendirin ve gelirinizi maksimize edin.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {application.benefits.map((benefit, index) => (
                                            <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <i className={`${benefit.icon} text-3xl`}></i>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                                <p className="text-slate-300">{benefit.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                
                {/* Features Section */}
                <section className="bg-slate-900 py-24">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Uygulamanın Öne Çıkan Özellikleri</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Operasyonlarınızı basitleştirmek ve işinizi zenginleştirmek için tasarlanmış modüllerimizi keşfedin.
                            </p>
                        </div>
                        {isCrmPage ? (
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
                                <div className="text-center mb-12">
                                    <h3 className="text-2xl font-bold text-white">Tüm İşletme İhtiyaçlarınız Tek Bir Yerde</h3>
                                    <p className="mt-2 text-md text-slate-400 max-w-2xl mx-auto">
                                        Mortanas Şirket Yönetimi, 20'den fazla modülüyle operasyonlarınızı kolaylaştırır. İhtiyacınız olan özelliği keşfetmek için kategoriler arasında gezinin.
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                                    {featureCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveTab(category)}
                                            className={`px-4 py-2 md:px-6 md:py-3 font-semibold rounded-full text-sm md:text-base transition-all duration-300 ${activeTab === category ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {application.features.filter(f => f.category === activeTab).map((feature, index) => (
                                        <div key={index} className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-start space-x-5 h-full border-t-4 border-blue-500">
                                            <div className="flex-shrink-0 h-14 w-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                                <i className={`${feature.icon} text-blue-400 text-2xl`}></i>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1 text-white">{feature.title}</h3>
                                                <p className="text-slate-300 text-sm">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {application.features.map((feature, index) => (
                                    <div key={index} className="bg-slate-800 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border-t-4 border-blue-500 shadow-xl">
                                        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                            <i className={`${feature.icon} text-blue-400 text-3xl`}></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-2 text-white">{feature.title}</h3>
                                            <p className="text-slate-300">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                
                {/* Dashboard Preview for CRM Page */}
                {isCrmPage && (
                    <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden container mx-auto px-8">
                         <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Akıllı Kontrol Paneli</h2>
                                <p className="text-slate-300 mb-8">
                                    Tüm operasyonlarınızı tek bir ekrandan, anlık verilerle yönetin. Gelişmiş kontrol panelimiz, işletmenizin nabzını tutmanız ve veriye dayalı kararlar almanız için tasarlandı.
                                </p>
                                <ul className="space-y-4 text-slate-200">
                                    <li className="flex items-center"><i className="fas fa-check-circle text-blue-400 mr-3"></i>Anlık Satış ve Gelir Takibi</li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-blue-400 mr-3"></i>Proje ve Görev İlerlemesi</li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-blue-400 mr-3"></i>Ekip Performans Metrikleri</li>
                                </ul>
                            </div>
                            <div className="hidden lg:block">
                                 <img src="https://i.imgur.com/G5g2fA1.png" alt="Yönetim Paneli" className="rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105 ring-2 ring-slate-700"/>
                            </div>
                        </div>
                    </section>
                )}


                {/* AI Features Section */}
                {application.aiFeatures && (
                    <section className="py-24">
                         <div className="container mx-auto px-8">
                             <AnimateInView>
                                 <div className="bg-gradient-to-br from-slate-900 to-purple-900/20 rounded-3xl p-8 md:p-12 border border-purple-500/30 relative overflow-hidden">
                                     <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(167,139,250,0.15),rgba(255,255,250,0))] animate-pulse"></div>
                                     <div className="relative z-10">
                                         <div className="text-center mb-16">
                                             <h2 className="text-3xl md:text-4xl font-bold text-white">{application.aiFeatures.title}</h2>
                                             <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                                 {application.aiFeatures.subtitle}
                                             </p>
                                         </div>
                                         <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                                             {application.aiFeatures.features.map((item, index) => (
                                                 <div key={index} className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg ring-1 ring-slate-700 flex items-start space-x-6 transition-all duration-300 hover:ring-purple-500 hover:-translate-y-1">
                                                     <div className="flex-shrink-0 h-16 w-16 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center ring-4 ring-slate-700">
                                                         <i className={`${item.icon} text-3xl`}></i>
                                                     </div>
                                                     <div>
                                                         <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                         <p className="text-slate-300">{item.description}</p>
                                                     </div>
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 </div>
                             </AnimateInView>
                         </div>
                    </section>
                )}
                

                {/* Target Audience Section */}
                {application.targetAudience && (
                     <section className="bg-blue-800 text-white rounded-2xl p-12 container mx-auto px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Kimler İçin Uygun?</h2>
                            <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
                                Çözümümüz, farklı büyüklük ve sektörlerdeki işletmelerinin ihtiyaçlarını karşılamak üzere esnek bir yapıda tasarlanmıştır.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                            {application.targetAudience.map((target, index) => (
                                <div key={index} className="bg-white/10 px-6 py-3 rounded-full flex items-center space-x-3">
                                    <i className={`${target.icon} text-yellow-300 text-lg`}></i>
                                    <span className="font-semibold">{target.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Demo Section for Spa/Wellness */}
                {application.slug === 'masaj-wellness-yonetimi' && (
                    <section className="bg-gradient-to-br from-slate-900 via-green-900/30 to-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 border-t-4 border-green-500 container mx-auto px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <i className="fas fa-desktop text-5xl text-green-400 mb-4"></i>
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Platformu Canlı Deneyimleyin</h2>
                                <p className="mt-4 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                                    Masaj & Wellness Yönetim platformumuzun tüm özelliklerini keşfetmek için demo sitemize göz atın. Randevu takviminden müşteri yönetimine kadar her şeyi test edebilirsiniz.
                                </p>
                                <p className="mt-4 text-sm text-slate-400">
                                    Demo Şifresi: <strong className="text-slate-200">ankara</strong>
                                </p>
                            </div>
                            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Demo Erişimi</h3>
                                <form onSubmit={handleDemoAccess} className="space-y-5">
                                    <div>
                                        <label htmlFor="demo-password" className="block text-sm font-medium text-slate-300 mb-1">Erişim Şifresi</label>
                                        <div className="relative">
                                            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                            <input
                                                type="password"
                                                id="demo-password"
                                                value={demoPassword}
                                                onChange={(e) => {
                                                    setDemoPassword(e.target.value);
                                                    if (demoError) setDemoError('');
                                                }}
                                                placeholder="******"
                                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                                                required
                                            />
                                        </div>
                                        {demoError && <p className="text-red-400 text-sm mt-2">{demoError}</p>}
                                    </div>
                                    <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <i className="fas fa-arrow-right"></i>
                                        <span>Demo Siteyi Gör</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                )}


                {/* Testimonials Section */}
                <section className="bg-gradient-to-b from-slate-900 to-indigo-900/30 py-24">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Kullanıcılarımız Ne Diyor?</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Platformumuzu kullanan, farklı sektörlerden işletmelerin başarı hikayeleri.
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
                                              <TestimonialCard key={cardIndex} testimonial={testimonial} />
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
                
                {/* FAQ Section */}
                {application.faqs && (
                    <section className="bg-slate-900 py-12">
                        <div className="container mx-auto px-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto">
                                    Platformumuz hakkında aklınıza takılabilecek en yaygın soruları sizin için yanıtladık.
                                </p>
                            </div>
                            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-6 gap-y-4">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {application.faqs.slice(0, Math.ceil(application.faqs.length / 2)).map((faq, index) => (
                                        <FAQItem
                                            key={index}
                                            faq={faq}
                                            isOpen={openFaqIndex === index}
                                            onClick={() => handleFaqClick(index)}
                                        />
                                    ))}
                                </div>
                                {/* Right Column */}
                                <div className="space-y-4">
                                    {application.faqs.slice(Math.ceil(application.faqs.length / 2)).map((faq, index) => {
                                        const globalIndex = index + Math.ceil(application.faqs.length / 2);
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
                )}
                
                
                {/* Pricing Section */}
                {application.pricing && (
                    <section id="pricing" className="bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden container mx-auto px-8">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-70"></div>
                        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl opacity-70"></div>

                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center relative z-10">
                            {/* Left Column: Offer Details */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                                    <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">Kaçırılmayacak Fırsat!</span>
                                </h2>
                                <p className="text-xl font-semibold text-red-400 mb-4 animate-pulse">
                                    <i className="fas fa-fire mr-2"></i>Sınırlı Süreli %30 İndirim Fırsatı
                                </p>
                                <p className="text-lg text-slate-300 mb-10">
                                    Bu özel tekliften yararlanarak işletmenizin dijital dönüşümünü en uygun maliyetle bugün başlatın ve rekabette öne geçin.
                                </p>

                                <div className="space-y-6 mb-12">
                                    <h3 className="text-2xl font-bold text-white">Neden Şimdi Almalısınız?</h3>
                                    <ul className="space-y-4 text-slate-200">
                                        <li className="flex items-start">
                                            <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                                            <span><strong className="text-white">Ömür Boyu Fiyat Garantisi:</strong> Bu indirimli fiyattan satın alın ve gelecekteki fiyat artışlarından etkilenmeyin.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                                            <span><strong className="text-white">Öncelikli Kurulum Desteği:</strong> Kampanya süresince katılan yeni müşterilerimize kurulum ve entegrasyon sürecinde öncelik tanıyoruz.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                                            <span><strong className="text-white">Ücretsiz Başlangıç Danışmanlığı:</strong> Platformu en verimli şekilde nasıl kullanacağınıza dair 1 saatlik ücretsiz danışmanlık kazanın.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Countdown Timer */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <p className="text-center font-semibold text-slate-200 mb-4">Bu Teklifin Sona Ermesine Kalan Süre:</p>
                                    <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center">
                                        {isOfferActive ? (
                                            <>
                                                <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner"><span className="text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span><span className="block text-xs text-slate-300 mt-1">GÜN</span></div>
                                                <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner"><span className="text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span><span className="block text-xs text-slate-300 mt-1">SAAT</span></div>
                                                <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner"><span className="text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="block text-xs text-slate-300 mt-1">DAKİKA</span></div>
                                                <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner"><span className="text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="block text-xs text-slate-300 mt-1">SANİYE</span></div>
                                            </>
                                        ) : (
                                            <p className="text-xl font-bold text-red-400">Teklif Sona Erdi!</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Interactive Pricing Card */}
                            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 transform transition-transform duration-500 hover:scale-105">
                                <h3 className="text-2xl font-bold text-center">{application.name}</h3>

                                {/* Billing Cycle Toggle */}
                                <div className="flex justify-center my-6">
                                    <div className="bg-gray-100 rounded-full p-1 flex items-center space-x-1">
                                        <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Aylık</button>
                                        <button onClick={() => setBillingCycle('annually')} className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm flex items-center ${billingCycle === 'annually' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Yıllık <span className="ml-1.5 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full hidden sm:inline-block">%40 Tasarruf</span></button>
                                        <button onClick={() => setBillingCycle('lifetime')} className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${billingCycle === 'lifetime' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Tek Seferlik</button>
                                    </div>
                                </div>

                                <div className="text-center mb-6">
                                    <del className="text-2xl text-gray-400 font-semibold">{usdFormatter.format(originalPrice)}</del>
                                    <div className="mt-2">
                                        <span className="font-bold text-5xl text-blue-600">
                                            {usdFormatter.format(displayPrice)}
                                        </span>
                                        <span className="text-gray-500 font-medium">
                                            {
                                                billingCycle === 'monthly' ? ' /ay' :
                                                billingCycle === 'annually' ? ' /yıl' :
                                                ' ömür boyu'
                                            }
                                        </span>
                                    </div>
                                    <p className="text-green-600 font-semibold mt-2 h-6">
                                        {billingCycle !== 'monthly' && `${usdFormatter.format(originalPrice - displayPrice)} tasarruf ediyorsunuz!`}
                                    </p>
                                </div>
                                
                                <div className="border-t border-gray-200 mt-6 pt-6 space-y-3 text-sm">
                                    <h4 className="font-bold text-md mb-3 text-gray-800">Pakete Neler Dahil?</h4>
                                    <p className="flex items-start text-gray-600"><i className="fas fa-check text-blue-500 mr-3 mt-1"></i>Tüm <strong className="font-semibold text-gray-700 mx-1">{application.name}</strong> özellikleri</p>
                                    <p className="flex items-start text-gray-600"><i className="fas fa-check text-blue-500 mr-3 mt-1"></i>Ömür boyu yazılım güncellemeleri</p>
                                    <p className="flex items-start text-gray-600"><i className="fas fa-check text-blue-500 mr-3 mt-1"></i>7/24 Teknik Destek</p>
                                </div>

                                <div className="mt-8">
                                    <Link 
                                        to={`/odeme?${paymentSearchParams}`}
                                        className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-3 text-lg"
                                    >
                                        <i className="fas fa-credit-card"></i>
                                        <span>İndirimle Satın Al</span>
                                    </Link>
                                    <a 
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-3"
                                    >
                                        <i className="fab fa-whatsapp text-xl"></i>
                                        <span>WhatsApp'tan Sor</span>
                                    </a>
                                </div>

                                <div className="mt-8 flex items-center justify-center text-gray-500">
                                    <i className="fas fa-shield-alt mr-2 text-green-500"></i>
                                    <p className="text-sm font-semibold">14 Gün Koşulsuz İade Garantisi</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* References Section */}
                {application.references && application.references.length > 0 && (
                    <section>
                        <div className="container mx-auto px-8">
                            <AnimateInView>
                                <div className="bg-gradient-to-br from-slate-900 to-purple-900/20 rounded-3xl p-8 md:p-12 border border-purple-500/30 relative overflow-hidden">
                                    <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(167,139,250,0.1),rgba(255,255,250,0))]"></div>
                                    <div className="relative z-10">
                                        <div className="text-center mb-16">
                                            <h2 className="text-3xl md:text-4xl font-bold text-white">Referanslarımız</h2>
                                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                                Sektörün önde gelen markaları, operasyonlarını yönetmek için platformumuza güveniyor.
                                            </p>
                                        </div>
                                        <LogoCarousel logos={application.references} />
                                    </div>
                                </div>
                            </AnimateInView>
                        </div>
                    </section>
                )}
                
                {/* Final CTA Section */}
                <section className="bg-gray-900 text-white rounded-2xl p-12 text-center shadow-2xl container mx-auto px-8">
                     <h2 className="text-3xl font-bold mb-4">İş Yönetiminde Yeni Bir Sayfa Açın</h2>
                     <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                        İşletmenizi dijitalleştirerek verimliliği artırmaya ve rakiplerinizin önüne geçmeye bugün başlayın.
                     </p>
                     <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            to={`/paketler?type=application`}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                        >
                            <i className="fas fa-tags"></i>
                            <span>Fiyatları Gör</span>
                        </Link>
                        <a 
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                        >
                            <i className="fas fa-calendar-check text-blue-600"></i>
                            <span>Ücretsiz Demo Ayarla</span>
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default ApplicationDetailPage;