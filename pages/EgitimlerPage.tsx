import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { FAQ } from '../types';
import { TRAINING_PARTNER_LOGOS } from '../constants';

const RecentEnrollmentPopup: React.FC<{ isVisible: boolean; data: { name: string; location: string; course: string; } | null; onClose: () => void }> = ({ isVisible, data, onClose }) => {
    if (!isVisible || !data) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-2xl p-4 w-80 flex items-start space-x-4 animate-fade-in-up">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-check-double text-blue-600"></i>
            </div>
            <div>
                <p className="font-bold text-gray-800 text-sm">{data.name} ({data.location})</p>
                <p className="text-gray-600 text-sm mt-1">
                    "{data.course}" eğitimine az önce kaydoldu!
                </p>
            </div>
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <i className="fas fa-times text-xs"></i>
            </button>
        </div>
    );
};

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; avatar: string }> = ({ quote, name, role, avatar }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col items-center text-center h-full border border-slate-700">
      <img
        className="w-24 h-24 rounded-full object-cover mb-6 ring-4 ring-purple-500/30"
        src={avatar}
        alt={name}
      />
      <p className="text-slate-300 italic mb-6 relative flex-grow">
        <i className="fas fa-quote-left absolute -top-2 -left-4 text-3xl text-slate-700 -z-10"></i>
        {quote}
      </p>
      <div>
        <h4 className="font-bold text-lg text-white">{name}</h4>
        <p className="text-sm text-purple-400 font-medium">{role}</p>
      </div>
    </div>
);

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-purple-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-start text-left p-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-slate-200 pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-400">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CareerProblemSolutionCard: React.FC<{ problem: string; solution: string; }> = ({ problem, solution }) => (
    <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
        <div className="p-6 flex-grow">
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 bg-red-100/70 rounded-full flex items-center justify-center">
                    <i className="fas fa-times-circle text-red-500 text-xl"></i>
                </div>
                <h4 className="font-bold text-lg text-red-800">Karşılaşılan Sorun</h4>
            </div>
            <p className="text-gray-600">{problem}</p>
        </div>
        <div className="bg-green-50/70 p-6 border-t-2 border-green-200 mt-auto">
             <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <h4 className="font-bold text-lg text-green-800">Akademinin Çözümü</h4>
            </div>
            <p className="text-gray-700 font-medium">{solution}</p>
        </div>
    </div>
);


const EgitimlerPage: React.FC = () => {
    const [offerEndDate] = useState(() => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [popupData, setPopupData] = useState<{ name: string; location: string; course: string; } | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = [
        'https://mortanas.com/resim/kat1.png',
        'https://mortanas.com/resim/kat2.png'
    ];

    useEffect(() => {
        const sliderTimer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % sliderImages.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(sliderTimer);
    }, [sliderImages.length]);

    const testimonials = [
        { 
            quote: "Mortanas Academy, teorik bilgiyi gerçek dünya projeleriyle birleştirerek kariyerimde bir dönüm noktası oldu. Eğitmenlerin sektörün içinden gelmesi paha biçilmezdi.",
            name: "Ayşe Yılmaz",
            role: "AI Otomasyon Uzmanı, TechCorp",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        { 
            quote: "Geliştirici eğitimindeki derinlemesine API entegrasyonu ve ölçeklenebilir mimari dersleri sayesinde, mevcut projelerimde verimliliği %40 artırdım. Harika bir program!",
            name: "Mehmet Kaya",
            role: "Yazılım Geliştirici, FinTech Solutions",
            avatar: "https://randomuser.me/api/portraits/men/66.jpg"
        },
        {
            quote: "Pazarlama otomasyonu eğitimi ile müşteri yolculuğunu nasıl optimize edeceğimi öğrendim. Artık veri odaklı kampanyalarla çok daha iyi sonuçlar alıyorum.",
            name: "Zeynep Arslan",
            role: "Dijital Pazarlama Yöneticisi, Creative Minds",
            avatar: "https://randomuser.me/api/portraits/women/79.jpg"
        },
        {
            quote: "Kodlama bilmeden bu kadar güçlü otomasyonlar kurabileceğimi hayal etmezdim. Girişimci olarak zamanım çok değerli ve bu eğitim bana inanılmaz bir zaman kazandırdı.",
            name: "Caner Öztürk",
            role: "Kurucu, E-Ticaret Platformu",
            avatar: "https://randomuser.me/api/portraits/men/52.jpg"
        },
        {
            quote: "Büyük dil modellerini projelere entegre etme konusu benim için bir sıçrama tahtası oldu. Artık çok daha akıllı ve yetenekli uygulamalar geliştirebiliyorum.",
            name: "Selin Demir",
            role: "Backend Geliştirici, Innovate AI",
            avatar: "https://randomuser.me/api/portraits/women/52.jpg"
        },
        {
            quote: "Satış hunisi otomasyonu modülü, potansiyel müşteri takibimizi ve dönüşüm oranlarımızı tamamen değiştirdi. Her satış profesyonelinin alması gereken bir eğitim.",
            name: "Ozan Tekin",
            role: "Satış Direktörü, Global Solutions",
            avatar: "https://randomuser.me/api/portraits/men/60.jpg"
        }
    ];
    
    const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

    const testimonialChunks = [];
    for (let i = 0; i < testimonials.length; i += 3) {
        testimonialChunks.push(testimonials.slice(i, i + 3));
    }

    const handlePrevTestimonialSlide = () => {
        setCurrentTestimonialSlide(prev => (prev === 0 ? testimonialChunks.length - 1 : prev - 1));
    };

    const handleNextTestimonialSlide = useCallback(() => {
        setCurrentTestimonialSlide(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
    }, [testimonialChunks.length]);

    const goToTestimonialSlide = (index: number) => {
        setCurrentTestimonialSlide(index);
    };

    useEffect(() => {
        const slideInterval = setInterval(handleNextTestimonialSlide, 7000); // Auto-play every 7 seconds
        return () => clearInterval(slideInterval);
    }, [handleNextTestimonialSlide]);

    const enrollments = [
        { name: "Ahmet Y.", location: "İstanbul", course: "Yapay Zeka Otomasyon Uzmanlığı" },
        { name: "Elif K.", location: "Ankara", course: "Geliştiriciler için Otomasyon" },
        { name: "Mehmet A.", location: "İzmir", course: "AI Destekli Pazarlama" },
        { name: "Zeynep S.", location: "Bursa", course: "Yapay Zeka Otomasyon Uzmanlığı" },
    ];

    useEffect(() => {
        const showPopup = () => {
            setIsPopupVisible(false);
            setTimeout(() => {
                const randomEnrollment = enrollments[Math.floor(Math.random() * enrollments.length)];
                setPopupData(randomEnrollment);
                setIsPopupVisible(true);
            }, 500); // Wait for fade out
        };
        
        const popupInterval = setInterval(showPopup, 8000); // Show a new popup every 8 seconds
        const initialTimeout = setTimeout(showPopup, 5000); // Show first popup after 5 seconds

        return () => {
            clearInterval(popupInterval);
            clearTimeout(initialTimeout);
        };
    }, []);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

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
    
    const isOfferActive = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;
    
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
    
    const trainings = [
        {
            title: "Yapay Zeka Otomasyon Uzmanlığı",
            target: "Girişimciler & İş Sahipleri",
            price: 290,
            originalPrice: 590,
            slots: 7,
            popular: false,
            features: [
                "İşletmeler için AI potansiyelini keşfedin.",
                "Kodlama olmadan otomasyonlar kurun.",
                "Müşteri hizmetlerini ve pazarlamayı otomatikleştirin.",
                "Verimliliği artıracak pratik araçları öğrenin.",
                "Sektörel vaka analizleri ve stratejiler."
            ]
        },
        {
            title: "Geliştiriciler için Otomasyon ve Yazılım",
            target: "Yazılımcılar & Teknik Ekipler",
            price: 490,
            originalPrice: 990,
            slots: 5,
            popular: true,
            features: [
                "API entegrasyonları ve iş akışları.",
                "Ölçeklenebilir otomasyon mimarileri.",
                "Python ve JavaScript ile AI scriptleri.",
                "Büyük dil modellerini (LLM) projelere entegre etme.",
                "Uçtan uca proje geliştirme ve canlıya alma."
            ]
        },
        {
            title: "AI Destekli Pazarlama ve Satış",
            target: "Pazarlama & Satış Profesyonelleri",
            price: 390,
            originalPrice: 790,
            slots: 10,
            popular: false,
            features: [
                "Potansiyel müşteri yaratma otomasyonu.",
                "Kişiselleştirilmiş e-posta & WhatsApp kampanyaları.",
                "Müşteri yolculuğunu AI ile optimize etme.",
                "Veri analizi ile kampanya performansını artırma.",
                "Satış hunisi (funnel) otomasyonu ve optimizasyonu."
            ]
        }
    ];

    const faqs: FAQ[] = [
        { question: "Eğitimler tamamen online mı?", answer: "Evet, tüm eğitimlerimiz %100 online ve kendi hızınızda ilerleyebileceğiniz şekilde tasarlanmıştır. Ders materyallerine dilediğiniz zaman, dilediğiniz yerden erişebilirsiniz." },
        { question: "Hiç teknik bilgim yok, yine de katılabilir miyim?", answer: "Kesinlikle! 'Yapay Zeka Otomasyon Uzmanlığı' eğitimimiz, hiç teknik bilgisi olmayan girişimciler ve iş sahipleri için özel olarak hazırlanmıştır. 'Geliştiriciler İçin Otomasyon' eğitimimiz ise temel programlama bilgisi gerekmektedir." },
        { question: "Eğitim sonunda sertifika veriliyor mu?", answer: "Evet, tüm programları başarıyla tamamlayan katılımcılarımıza uluslararası geçerliliğe sahip, Birleşik Krallık (İngiltere) hükümeti tarafından tanınan bir başarı sertifikası verilmektedir. Bu, kariyerinize global bir değer katar." },
        { question: "Eğitmenlere soru sorabilecek miyim?", answer: "Evet. Tüm öğrencilerimiz, eğitmenlerimiz ve diğer öğrencilerle iletişim kurabilecekleri özel topluluk platformumuza erişim hakkı kazanır. Ayrıca düzenli olarak yapılan canlı soru-cevap etkinliklerimize de katılabilirsiniz." },
        { question: "Eğitim ücretini taksitle ödeyebilir miyim?", answer: "Evet, kredi kartına taksit seçeneklerimiz mevcuttur. Ödeme sayfasında size uygun taksit seçeneklerini görebilir ve seçiminizi yapabilirsiniz." },
        { question: "Dersleri kaçırırsam tekrar izleyebilir miyim?", answer: "Elbette. Tüm ders kayıtları, eğitim süresince ve sonrasında panelinizde erişilebilir olacaktır. Böylece kaçırdığınız dersleri dilediğiniz zaman tekrar izleyebilirsiniz." },
        { question: "Projeler bireysel mi, grup çalışması mı olacak?", answer: "Eğitimlerimiz hem bireysel hem de grup projeleri içerir. Bu sayede hem kendi başınıza problem çözme yeteneğinizi geliştirir hem de takım çalışması deneyimi kazanırsınız." },
        { question: "Kariyer desteği neleri kapsıyor?", answer: "Mezunlarımıza özel CV hazırlama, mülakat simülasyonları ve network etkinlikleri gibi kariyer destek hizmetleri sunuyoruz. Ayrıca, partner şirketlerimizdeki açık pozisyonları da mezunlarımızla paylaşıyoruz." },
        { question: "Kurumsal eğitimler için özel indirimler var mı?", answer: "Evet, 5 kişi ve üzeri grup katılımları için kurumsal indirimler ve özel ödeme planları sunuyoruz. Detaylı bilgi için lütfen bizimle iletişime geçin." },
        { question: "Eğitim materyallerine ömür boyu erişimim olacak mı?", answer: "Evet, bir kez kaydolduğunuzda eğitim videoları, notlar ve kod örnekleri gibi tüm materyallere ömür boyu erişim hakkınız olur. Gelecekteki güncellemelerden de ücretsiz olarak faydalanabilirsiniz." }
    ];

    return (
        <div className="bg-slate-900">
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
                `}
            </style>
            <RecentEnrollmentPopup isVisible={isPopupVisible} data={popupData} onClose={() => setIsPopupVisible(false)} />
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">MORTANAS ACADEMY</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                                Yapay Zeka ile İşinizi ve Kariyerinizi <br /> <span className="text-blue-400">Geleceğe Taşıyın</span>
                            </h1>
                            <p className="mt-6 text-lg text-blue-200 max-w-xl mx-auto lg:mx-0">
                                Sektör liderlerinden uygulamalı eğitimlerle, teoriden pratiğe geçin ve yapay zeka otomasyonlarının gücünü iş süreçlerinize entegre edin.
                            </p>
                            <div className="mt-10">
                                <a href="#trainings-section" className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3">
                                    <i className="fas fa-graduation-cap"></i>
                                    <span>Eğitimleri Keşfet</span>
                                </a>
                            </div>
                        </div>
                        <div className="hidden lg:block relative aspect-[16/10] rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden">
                           {sliderImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Yapay Zeka Eğitimi Slayt ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="py-16 bg-slate-800">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-700 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700">
                                <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-user-graduate text-4xl text-blue-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">+350</p>
                                <p className="text-slate-400 font-medium">Mutlu Öğrenci</p>
                            </div>
                            <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-building text-4xl text-green-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">+20</p>
                                <p className="text-slate-400 font-medium">Kurumsal Partner</p>
                            </div>
                            <div className="pt-8 md:pt-0 px-4">
                                <i className="fas fa-briefcase text-4xl text-indigo-400 mb-3"></i>
                                <p className="text-4xl font-bold text-white">%95</p>
                                <p className="text-slate-400 font-medium">İşe Yerleşme Oranı</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-24 space-y-24">
                
                 {/* Mortanas Academy Section */}
                <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl py-20 -mx-6 px-6 shadow-2xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                            Kariyerinizde Fark Yaratın: <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">Neden Mortanas Academy?</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                            Biz sadece teorik bilgi aktarmıyoruz; sizi sektörün aradığı, proje geliştirebilen ve sorun çözebilen bir profesyononele dönüştürüyoruz.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                         <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer hover:border-blue-400">
                            <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"><i className="fas fa-laptop-code text-3xl text-blue-400"></i></div>
                            <h4 className="font-bold text-lg text-white">Uygulamalı Projeler</h4>
                            <p className="text-slate-400 text-sm mt-2">Gerçek dünya problemlerini çözerek somut bir portfolyo oluşturun.</p>
                        </div>
                         <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer hover:border-blue-400">
                            <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"><i className="fas fa-chalkboard-teacher text-3xl text-blue-400"></i></div>
                            <h4 className="font-bold text-lg text-white">Sektör Liderleri</h4>
                            <p className="text-slate-400 text-sm mt-2">Aktif olarak çalışan uzmanlardan ve mühendislerden mentorluk alın.</p>
                        </div>
                         <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer hover:border-blue-400">
                            <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"><i className="fas fa-award text-3xl text-blue-400"></i></div>
                            <h4 className="font-bold text-lg text-white">Global Sertifika</h4>
                            <p className="text-slate-400 text-sm mt-2">Birleşik Krallık onaylı sertifikanızla yetkinliklerinizi uluslararası düzeyde kanıtlayın.</p>
                        </div>
                         <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer hover:border-blue-400">
                            <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"><i className="fas fa-network-wired text-3xl text-blue-400"></i></div>
                            <h4 className="font-bold text-lg text-white">Kariyer & Network</h4>
                            <p className="text-slate-400 text-sm mt-2">Mezunlarımızı sektörün önde gelen şirketleriyle buluşturuyoruz.</p>
                        </div>
                    </div>
                </section>
                
                <section className="bg-slate-900 py-24 rounded-2xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Eğitimlerimiz Kimler İçin İdeal?</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">Hedefiniz ne olursa olsun, sizi geleceğin teknolojisine hazırlayacak bir programımız var.</p>
                    </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: 'fas fa-rocket', name: 'Girişimciler' },
                            { icon: 'fas fa-code', name: 'Geliştiriciler' },
                            { icon: 'fas fa-bullhorn', name: 'Pazarlamacılar' },
                            { icon: 'fas fa-user-graduate', name: 'Öğrenciler' },
                            { icon: 'fas fa-people-arrows', name: 'Kariyer Değiştirenler' }
                        ].map(target => (
                            <div key={target.name} className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-purple-500/20 border border-slate-700">
                                <div className="flex-shrink-0 h-20 w-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className={`${target.icon} text-purple-400 text-3xl`}></i>
                                </div>
                                <h4 className="font-semibold text-white text-lg">{target.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">4 Adımda Öğrenim Yolculuğunuz</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Sizi fikirden uzmanlığa taşıyacak yapılandırılmış ve kanıtlanmış eğitim modelimiz.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-slate-700" aria-hidden="true"></div>
                        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {[
                                { icon: 'fas fa-search', title: '1. Keşfet & Kaydol', description: 'Kariyer hedeflerinize en uygun programı seçin ve yolculuğunuza başlayın.' },
                                { icon: 'fas fa-project-diagram', title: '2. Projelerle Öğren', description: 'Sektör uzmanlarının mentorluğunda gerçek dünya projeleri geliştirerek deneyim kazanın.' },
                                { icon: 'fas fa-award', title: '3. Sertifikanı Al', description: 'Uluslararası geçerli sertifikanızla yetkinliklerinizi global ölçekte kanıtlayın.' },
                                { icon: 'fas fa-briefcase', title: '4. Kariyerine Başla', description: 'Kariyer desteğimiz ve network ağımızla hayalinizdeki işe bir adım daha yaklaşın.' }
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 p-4 rounded-xl">
                                    <div className="relative flex-shrink-0 h-24 w-24 bg-slate-800 rounded-full flex items-center justify-center ring-8 ring-slate-900 border-2 border-blue-500 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                                        <i className={`${step.icon} text-4xl text-blue-400`}></i>
                                    </div>
                                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg -mt-12 pt-16 h-full border border-slate-700">
                                        <h4 className="font-bold text-lg text-white">{step.title}</h4>
                                        <p className="text-sm text-slate-400 mt-2">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* UK Certificate Section */}
                <section className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-slate-700">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="lg:col-span-1">
                            <img src="https://www.londoncollegeofteachers.com/assets/images/cp-diploma.jpg" alt="Uluslararası Geçerli Sertifika" className="mx-auto rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105" />
                        </div>
                        <div className="lg:col-span-1 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-white mb-4">Kariyerinize Global Bir Değer Katın</h2>
                            <h3 className="text-xl font-semibold text-blue-400 mb-4">Birleşik Krallık (İngiltere) Hükümet Onaylı Sertifika</h3>
                            <p className="text-lg text-slate-300">
                                Mortanas Academy, uluslararası standartlarda eğitim verdiğini kanıtlamıştır. Mezunlarımız, Birleşik Krallık hükümeti tarafından tanınan, global iş piyasasında sizi bir adım öne taşıyacak prestijli bir sertifikanın sahibi olurlar. Bu sertifika, yetkinliklerinizi uluslararası düzeyde belgelemenin en güçlü yoludur.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Kariyer Engellerini Aşıyoruz</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                           Teknoloji sektörüne girişte karşılaşılan yaygın sorunlara, pratik ve sonuç odaklı çözümler sunuyoruz.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                       <CareerProblemSolutionCard
                            problem="Üniversite eğitimi, hızla değişen teknoloji dünyasının pratik gereksinimlerini karşılamakta yetersiz kalıyor."
                            solution="Eğitimlerimiz, en güncel teknolojiler ve sektörün en çok aradığı yetkinlikler üzerine odaklanarak sizi iş hayatına hazırlar."
                       />
                       <CareerProblemSolutionCard
                            problem="Yapay zeka alanına nereden başlayacağını bilememek, kariyer yolculuğunda zaman kaybettiriyor."
                            solution="Yapılandırılmış ve seviyelere ayrılmış eğitim programlarımız, size net bir yol haritası sunarak adım adım ilerlemenizi sağlar."
                       />
                       <CareerProblemSolutionCard
                            problem="Teorik bilgi, iş başvurularında öne çıkmak için yeterli olmuyor; şirketler uygulamalı deneyim arıyor."
                            solution="Gerçek veri setleriyle çalışacağınız projeler sayesinde, iş görüşmelerinde gösterebileceğiniz somut bir portfolyo oluşturursunuz."
                       />
                    </div>
                </section>

                {/* Our Goal Section */}
                <section className="text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-12 shadow-2xl">
                     <h2 className="text-3xl font-bold mb-4">Akademimizin Amacı: Sadece Öğretmek Değil, Dönüştürmek</h2>
                     <p className="max-w-3xl mx-auto text-lg text-blue-100">
                        Misyonumuz, Türkiye'deki profesyonelleri ve işletmeleri yapay zeka çağının gerektirdiği bilgi ve becerilerle donatmaktır. Amacımız, her mezunumuzun kendi sektöründe fark yaratan, verimliliği artıran ve yenilikçi çözümler üreten bir lidere dönüşmesini sağlamaktır.
                     </p>
                </section>

                {/* Trainings Section */}
                <section id="trainings-section">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Eğitim Programlarımız</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                            Kariyer hedeflerinize ve mevcut bilgi seviyenize en uygun programı seçin.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {trainings.map((training, index) => {
                             const paymentSearchParams = new URLSearchParams({
                                plan: training.title,
                                price: training.price.toString(),
                                type: 'egitim',
                                cycle: 'lifetime',
                                currency: 'USD'
                            }).toString();

                            return (
                                <div key={index} className={`rounded-2xl shadow-lg flex flex-col relative transition-all duration-300 ${training.popular ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white transform lg:scale-105 ring-4 ring-yellow-400 z-10' : 'bg-slate-800 text-white border border-slate-700'}`}>
                                    {training.popular && (
                                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                            <i className="fas fa-star text-yellow-600 mr-2"></i>EN POPÜLER
                                        </div>
                                    )}
                                     <div className={`p-8 ${training.popular ? 'from-blue-600/10 to-transparent bg-gradient-to-b' : ''}`}>
                                        <span className={`font-bold uppercase text-sm ${training.popular ? 'text-yellow-300' : 'text-blue-400'}`}>{training.target}</span>
                                        <h3 className="text-3xl font-extrabold mt-2">{training.title}</h3>
                                        <p className={`mt-2 font-semibold text-red-400 ${training.popular ? 'bg-red-500 text-white rounded-full px-3 py-1 inline-block' : ''}`}>
                                            <i className="fas fa-hourglass-half mr-2"></i>
                                            Kontenjan Doluyor: Son {training.slots} kişilik yer!
                                        </p>
                                    </div>
                                    <div className="p-8 flex-grow">
                                        <ul className="space-y-4">
                                            {training.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start">
                                                    <i className={`fas fa-check-circle mr-3 mt-1 ${training.popular ? 'text-yellow-400' : 'text-green-400'}`}></i>
                                                    <span className={training.popular ? 'text-blue-100' : 'text-slate-300'}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={`p-8 mt-auto rounded-b-2xl ${training.popular ? 'bg-black/20' : 'bg-slate-700/50'}`}>
                                        <div className="text-center">
                                            <p className={`text-sm ${training.popular ? 'text-blue-200' : 'text-slate-400'}`}>Tek Seferlik Ödeme</p>
                                            <div className="my-2">
                                                <del className={`text-2xl font-semibold ${training.popular ? 'text-red-300' : 'text-red-400'}`}>{usdFormatter.format(training.originalPrice)}</del>
                                                <span className={`text-5xl font-bold ml-2 ${training.popular ? 'text-white' : 'text-white'}`}>{usdFormatter.format(training.price)}</span>
                                            </div>
                                        </div>
                                        <Link to={`/odeme?${paymentSearchParams}`} className={`mt-6 block w-full text-center py-4 font-bold rounded-lg text-lg transition-all transform hover:scale-105 ${training.popular ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                            İndirimle Kayıt Ol
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                
                {/* Special Offer Section */}
                <section id="ozel-teklif" className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-yellow-400">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left text-white">
                            <h2 className="text-3xl md:text-4xl font-extrabold ">Yapay Zeka Uzmanlık Eğitimi</h2>
                            <p className="mt-4 text-xl font-semibold text-yellow-400">Lansmana Özel İndirimli Fiyatlar</p>
                            <p className="mt-4 text-slate-300">
                                Geleceğin mesleğine bugünden yatırım yapın. Kontenjanlar dolmadan yerinizi ayırtın!
                            </p>

                            <div className="mt-8 text-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                                <p className="text-sm text-slate-400">Tek Seferlik Ödeme</p>
                                <del className="text-2xl font-semibold text-red-400">₺35.000</del>
                                <p className="text-5xl font-bold text-white mt-1">₺24.990 <span className="text-2xl font-medium text-slate-300">+ KDV</span></p>

                                <a href="#trainings-section" className="mt-6 block w-full text-center py-4 font-bold rounded-lg text-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all transform hover:scale-105">
                                    İndirimle Hemen Kaydol
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="text-center font-semibold text-slate-300 mb-2">Bu Teklifin Sona Ermesine Kalan Süre:</p>
                             <div className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-700">
                                <div className="flex justify-center items-center space-x-2 md:space-x-4">
                                    {isOfferActive ? (
                                        <>
                                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                                <span className="text-3xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                                                <span className="block text-xs text-slate-400">Gün</span>
                                            </div>
                                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                                <span className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                                                <span className="block text-xs text-slate-400">Saat</span>
                                            </div>
                                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                                <span className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                                <span className="block text-xs text-slate-400">Dakika</span>
                                            </div>
                                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                                <span className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                                <span className="block text-xs text-slate-400">Saniye</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-xl font-bold text-red-400">İndirim Fırsatı Sona Erdi!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-24 bg-slate-800 rounded-2xl">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Mezunlarımız Ne Diyor?</h2>
                            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                                Eğitimlerimizin gerçek hayattaki etkisini doğrudan mezunlarımızdan dinleyin.
                            </p>
                        </div>
                        <div className="relative max-w-7xl mx-auto">
                            <div className="overflow-hidden relative">
                                <div 
                                    className="flex transition-transform duration-700 ease-in-out" 
                                    style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
                                >
                                    {testimonialChunks.map((chunk, slideIndex) => (
                                        <div key={slideIndex} className="flex-shrink-0 w-full px-4">
                                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {chunk.map((testimonial, cardIndex) => (
                                              <TestimonialCard 
                                                  key={cardIndex}
                                                  quote={testimonial.quote}
                                                  name={testimonial.name}
                                                  role={testimonial.role}
                                                  avatar={testimonial.avatar}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <button 
                                onClick={handlePrevTestimonialSlide} 
                                className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-600 transition-all z-10"
                                aria-label="Önceki yorumlar"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button 
                                onClick={handleNextTestimonialSlide} 
                                className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-600 transition-all z-10"
                                aria-label="Sonraki yorumlar"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex justify-center space-x-3 mt-12">
                                {testimonialChunks.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToTestimonialSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialSlide === index ? 'bg-purple-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'}`}
                                        aria-label={`Yorum sayfası ${index + 1}'e git`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="sss" className="py-24 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Aklınızdaki soruların cevaplarını burada bulabilirsiniz.
                            </p>
                        </div>
                        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-12 gap-y-6">
                            {/* Left Column */}
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
                            {/* Right Column */}
                            <div className="space-y-4">
                                {faqs.slice(5, 10).map((faq, index) => (
                                    <FAQItem
                                        key={index + 5}
                                        faq={faq}
                                        isOpen={openFaqIndex === (index + 5)}
                                        onClick={() => handleFaqClick(index + 5)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Guarantee Section */}
                <section className="bg-slate-800 text-white rounded-2xl shadow-xl border border-slate-700 p-8 md:p-12">
                    <div className="grid lg:grid-cols-3 gap-8 items-center text-center lg:text-left">
                        <div className="lg:col-span-1">
                            <img src="https://w7.pngwing.com/pngs/700/104/png-transparent-money-back-guarantee-risk-receipt-satisfaction-guarantee-text-label-service.png" alt="Memnuniyet Garantisi" className="mx-auto h-48 w-auto object-contain filter brightness-0 invert"/>
                        </div>
                        <div className="lg:col-span-2">
                             <h2 className="text-3xl font-bold text-white mb-4">%100 Memnuniyet Garantisi</h2>
                            <p className="text-lg text-slate-300">
                                Eğitimlerimize o kadar güveniyoruz ki, ilk 14 gün içinde herhangi bir nedenle memnun kalmazsanız, sorgusuz sualsiz tam para iadesi yapıyoruz. Hiçbir risk almadan öğrenmeye başlayın.
                            </p>
                        </div>
                    </div>
                </section>
                
                 {/* Enhanced CTA Section */}
                <section>
                    <div className="bg-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden background-grid">
                        <div className="grid lg:grid-cols-2 items-stretch">
                            {/* Left Side: Text */}
                            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center z-10">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                        Akademiyi Keşfedin ve <br/><span className="text-blue-400">Kariyerinize Yön Verin</span>
                                    </h2>
                                    <p className="mt-4 text-lg text-slate-300">
                                        Yapay zeka devriminin bir parçası olun. Sektörün aradığı yetkinlikleri kazanın ve geleceğin teknolojisini bugünden şekillendirmeye başlayın.
                                    </p>
                                    <ul className="mt-6 space-y-3">
                                        <li className="flex items-center text-slate-200">
                                            <i className="fas fa-check-circle text-green-400 mr-3"></i>
                                            <span>Sektör liderlerinden uygulamalı eğitimler.</span>
                                        </li>
                                        <li className="flex items-center text-slate-200">
                                            <i className="fas fa-check-circle text-green-400 mr-3"></i>
                                            <span>Gerçek dünya projeleriyle portfolyo oluşturma.</span>
                                        </li>
                                        <li className="flex items-center text-slate-200">
                                            <i className="fas fa-check-circle text-green-400 mr-3"></i>
                                            <span>Uluslararası geçerli sertifika imkanı.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-10 grid sm:grid-cols-2 gap-6">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h3 className="font-bold text-lg text-white">Akademinin Vizyonunu Keşfedin</h3>
                                        <p className="text-sm text-slate-400 mt-2 mb-4">Felsefemiz ve kurumsal çözümlerimiz hakkında detaylı bilgi alın.</p>
                                        <a 
                                            href="https://www.mortanas.com/akademi" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                                        >
                                            Detaylı Bilgi Al <i className="fas fa-arrow-right ml-2 text-xs"></i>
                                        </a>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h3 className="font-bold text-lg text-white">Öğrenmeye Hemen Başlayın</h3>
                                        <p className="text-sm text-slate-400 mt-2 mb-4">Tüm kurs kataloğumuza göz atın ve size en uygun programa kaydolun.</p>
                                        <a 
                                            href="https://www.mortanasacademy.com" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                                        >
                                            Tüm Kursları Gör <i className="fas fa-arrow-right ml-2 text-xs"></i>
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 text-center sm:text-left">Tüm kurslar için: www.mortanasacademy.com</p>
                            </div>
                            {/* Right Side: Image */}
                            <div className="relative h-80 lg:h-auto min-h-[400px]">
                                <img src="https://mortanas.com/resim/kat1.png" alt="Yapay Zeka Akademi" className="absolute inset-0 w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent lg:bg-gradient-to-l"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Partner Logos Section */}
            <section className="py-16 bg-slate-800">
                <div className="container mx-auto px-6">
                    <h3 className="text-center text-slate-400 font-semibold uppercase tracking-wider mb-12">Mezunlarımızın Çalıştığı & Teknolojilerini Kullandığımız Şirketler</h3>
                    <div className="scroller w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}>
                        <div className="flex w-max animate-scroll">
                            {[...TRAINING_PARTNER_LOGOS, ...TRAINING_PARTNER_LOGOS].map((logo, index) => (
                                <div key={index} className="flex-shrink-0 mx-12 flex items-center h-20" title={logo.name}>
                                    <img
                                        src={logo.logoUrl}
                                        alt={logo.name}
                                        className="max-h-10 md:max-h-12 object-contain filter grayscale brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EgitimlerPage;