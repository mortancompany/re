import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURES, TESTIMONIALS } from '../constants';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
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

                    let duration = 2000;
                    let frameRate = 1000 / 60;
                    let totalFrames = Math.round(duration / frameRate);
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
            {new Intl.NumberFormat('tr-TR').format(count)}
        </span>
    );
};


const HomePage: React.FC = () => {
  const [liveActivities, setLiveActivities] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const HERO_SLIDES = [
    {
      video: "https://media.istockphoto.com/id/947722112/tr/video/robot-dijital-aray%C3%BCz-3-puan-dokunmadan-cyborg-4-k-film-arka-plan.mp4?s=mp4-640x640-is&k=20&c=JV5OdSA94heJxbnCgx72BJu22wjiLMx_8lfUS8hn4Kk=",
      badge: "TÜRKİYE'NİN LİDER YAPAY ZEKA ŞİRKETİ",
      title: "İşletmeniz İçin Lider Yapay Zeka",
      subtitle: "Otomasyon Çözümleri",
      description: "Mortanas, işletmenizin müşteri hizmetleri, pazarlama ve satış süreçlerini dönüştüren akıllı otomasyon çözümleri sunar. Yapay zeka ile verimliliği artırın, maliyetleri düşürün ve büyümeyi hızlandırın."
    },
    {
      video: "https://media.istockphoto.com/id/829316394/tr/video/robot-robot-de%C4%9Fmek-perde-insan-ba%C4%9Flanmak-genel-d%C3%BCnya-haritas%C4%B1-nokta-k%C3%BCresel-ileti%C5%9Fim-yapar.mp4?s=mp4-640x640-is&k=20&c=nkfxP68UXPLnmnUpH2EmKPQJa0RgbS-rmJpbgHnoU_U=",
      badge: "MÜŞTERİ DENEYİMİNDE DEVRİM",
      title: "Yapay Zeka Destekli",
      subtitle: "CRM Uygulamaları",
      description: "Veri odaklı analizler ve otonom müşteri takibi ile satışlarınızı ve memnuniyetinizi zirveye taşıyoruz. Geleceğin iş modellerini bugün deneyimleyin."
    },
    {
      video: "https://media.istockphoto.com/id/947722112/tr/video/robot-dijital-aray%C3%BCz-3-puan-dokunmadan-cyborg-4-k-film-arka-plan.mp4?s=mp4-640x640-is&k=20&c=JV5OdSA94heJxbnCgx72BJu22wjiLMx_8lfUS8hn4Kk=",
      badge: "İNSAN & MAKİNE İŞBİRLİĞİ",
      title: "Hibrit Yapay Zeka ile",
      subtitle: "Maksimum Verimlilik",
      description: "İnsan zekasını ve yapay zeka gücünü kusursuzca harmanlayarak operasyonel mükemmelliğe ulaşmanızı sağlıyoruz. Hızlı, dinamik ve hatasız süreçler."
    },
    {
      video: "https://media.istockphoto.com/id/1459585081/tr/video/digital-abstract-network-grid-over-the-earth-artificial-intelligence-neural-network-growing.mp4?s=mp4-640x640-is&k=20&c=Mud21al0e60wimO_m4dt_wwM9s3DNDa-6hdcMbuwLvM=",
      badge: "KÜRESEL TEKNOLOJİ ALTYAPISI",
      title: "Küresel Bağlantı ve Hız",
      subtitle: "Yapay Zeka Altyapısı",
      description: "Sınırsız ölçeklenebilirlik, üstün hız ve gelişmiş veri güvenliği sunan global ağ gücümüzle şirketinizin erişimini tüm dünyaya yayın."
    },
    {
      video: "https://media.istockphoto.com/id/2183248399/tr/video/loopable-close-up-animation-of-colorful-branching-ai-neural-network-visualization-of-large.mp4?s=mp4-640x640-is&k=20&c=Cnxj8GeC2p6bOFS9CLSVqq2aqM-uOXcIXz2psiJok0c=",
      badge: "NÖRAL NETWORK TEKNOLOJİSİ",
      title: "Gelişmiş Derin Öğrenme",
      subtitle: "Akıllı Karar Mekanizmaları",
      description: "Milyonlarca sektörel veri noktasını anlık olarak analiz ederek, işletmeniz için kritik kararları ve tahminleri saniyeler içinde otonomlaştırın."
    },
    {
      video: "https://media.istockphoto.com/id/2181763120/tr/video/loopable-isometric-3d-animation-of-colorful-branching-ai-neural-network-visualization-of.mp4?s=mp4-640x640-is&k=20&c=6Je3AZHB_8hKE0s9qsvjWp0vrE0fK4VN9oWez-xB2Dw=",
      badge: "OTONOM SİSTEMLER",
      title: "Kendi Kendini Yöneten",
      subtitle: "İş Akışları ve Süreçler",
      description: "Manuel iş yüklerini tamamen ortadan kaldırın. Sürekli öğrenen, optimize olan ve kesintisiz çalışan yapay zeka ajanlarımızı devreye alın."
    },
    {
      video: "https://media.istockphoto.com/id/2183250803/tr/video/loopable-isometric-3d-animation-of-colorful-branching-ai-neural-network-visualization-of.mp4?s=mp4-640x640-is&k=20&c=XYPI9agOoblNBvYNiPa9VkoRdqx6iBFEZ3Q8_GLf4B8=",
      badge: "ÖLÇEKLENEBİLİR BÜYÜME",
      title: "Maksimum Performans",
      subtitle: "Minimum Maliyet",
      description: "Operasyonel maliyetlerinizi %80'e varan oranda düşürürken, hizmet kalitenizi ve süreçlerinizi hızlandırarak müşterilerinize kusursuz hizmet sunun."
    },
    {
      video: "https://media.istockphoto.com/id/1707385922/tr/video/futuristic-cyber-technology-innovation-artificial-intelligence-concept-brain-over-the-circuit.mp4?s=mp4-640x640-is&k=20&c=q9yhW2WO1bYVm3ZsZgd9srSqsYxv7X96TLuC7KIPfz8=",
      badge: "SİBER TEKNOLOJİ VE İNOVASYON",
      title: "Geleceğin Dijital Beyni",
      subtitle: "Mortanas AI Engine",
      description: "Yeni nesil mimarimiz ve akıllı entegrasyonlarımızla sistemlerinizi fütüristik bir güce kavuşturun. İleri düzey otomasyon çağı başlıyor."
    },
    {
      video: "https://media.istockphoto.com/id/2175859577/tr/video/3d-isometric-animation-of-colorful-branching-neural-network-on-dark-background-visualization.mp4?s=mp4-640x640-is&k=20&c=4ejrSZDFazHkjzPhg5kCL2dbLXyXHgwbNoOXTL0uv-c=",
      badge: "AGRESİF BÜYÜME STRATEJİSİ",
      title: "Dijital İmparatorluğunuzu",
      subtitle: "Yapay Zeka ile Kurun",
      description: "Rakiplerinizin geride kalmasını izleyin. Mortanas AI platformunun yıkıcı pazarlama ve dönüşüm gücüyle pazar liderliğine oynayın."
    }
  ];

  // Group testimonials into chunks of 3
  const testimonialChunks = [];
  for (let i = 0; i < TESTIMONIALS.length; i += 3) {
    testimonialChunks.push(TESTIMONIALS.slice(i, i + 3));
  }

  // Auto-play effect for testimonials
  useEffect(() => {
      const slideInterval = setInterval(() => {
          setCurrentTestimonial(prev => (prev === testimonialChunks.length - 1 ? 0 : prev + 1));
      }, 7000); // Change slide every 7 seconds

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

  const handleScroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
          const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll about 80% of the visible width
          scrollRef.current.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth',
          });
      }
  };


  const allPossibleActivities = [
    { icon: 'fas fa-comments-dollar text-purple-500', text: 'İstanbul\'dan bir e-ticaret markası <strong>Sosyal Medya Otomasyonu</strong> ile 50+ yeni sipariş aldı.', time: '2 saat önce' },
    { icon: 'fas fa-user-plus text-green-500', text: 'Ankara\'dan bir danışmanlık firması <strong>Şirket Yönetimi (CRM)</strong> planına geçti.', time: 'Dün' },
    { icon: 'fas fa-robot text-blue-500', text: 'İzmir\'deki bir otel, <strong>AI Chatbot</strong> ile 500+ misafir sorusunu yanıtladı.', time: 'Bu Hafta' },
    { icon: 'fas fa-calendar-check text-indigo-500', text: 'Bursa\'daki bir Spa merkezi, <strong>online randevu sistemi</strong> ile doluluk oranını %40 artırdı.', time: 'Bu Hafta'},
    { icon: 'fas fa-phone-volume text-red-500', text: 'Antalya\'daki bir turizm acentesi <strong>Sesli Müşteri Hizmetleri</strong> ile 7/24 hizmet vermeye başladı.', time: 'Pazartesi'},
    { icon: 'fas fa-dumbbell text-orange-500', text: 'Adana\'daki bir spor salonu, <strong>Spor & Fitness Yazılımı</strong> ile üye takibini dijitalleştirdi.', time: '3 gün önce' },
    { icon: 'fas fa-headset text-teal-500', text: 'Kayseri\'den bir teknik servis, <strong>Sesli Asistan</strong> ile günlük 200+ çağrıyı yönetti.', time: 'Dün'},
    { icon: 'fas fa-hotel text-cyan-500', text: 'Bodrum\'daki bir butik otel, <strong>Otel Yönetimi (CRM)</strong> ile doğrudan rezervasyonlarını %25 artırdı.', time: 'Bu Hafta'},
  ];

  useEffect(() => {
    // Initial activities
    setLiveActivities(allPossibleActivities.slice(0, 4).map(a => ({...a, id: Math.random()})).reverse());

    const interval = setInterval(() => {
        const newActivity = allPossibleActivities[Math.floor(Math.random() * allPossibleActivities.length)];
        const activityWithId = { ...newActivity, id: Math.random() };

        setLiveActivities(prev => {
            const updated = [activityWithId, ...prev];
            if (updated.length > 4) {
                updated.pop();
            }
            return updated;
        });
    }, 4500); // every 4.5 seconds

    return () => clearInterval(interval);
  }, []);


    const partnershipSteps = [
      { num: 1, icon: "fas fa-file-signature", title: "Hızlı Başvuru", description: "Partnerlik formunu doldurarak ilk adımı atın. Süreç sadece 2 dakikanızı alacak." },
      { num: 2, icon: "fas fa-user-check", title: "Onay Süreci", description: "Ekibimiz başvurunuzu 24 saat içinde inceler ve size geri dönüş sağlar." },
      { num: 3, icon: "fas fa-handshake", title: "Sözleşme", description: "Karşılıklı anlaşma ile partnerlik sözleşmemizi dijital olarak imzalayın." },
      { num: 4, icon: "fas fa-chalkboard-teacher", title: "Eğitim ve Materyaller", description: "Size özel eğitimlere ve tüm pazarlama materyallerine anında erişim sağlayın." },
      { num: 5, icon: "fas fa-rocket", title: "Satışa Başla", description: "Kendi portföyünüze Mortanas çözümlerini sunarak hemen kazanmaya başlayın." },
      { num: 6, icon: "fas fa-hand-holding-dollar", title: "Kazanç ve Destek", description: "Yüksek komisyon oranları ile gelirinizi artırın ve sürekli destek alın." },
    ];

    const sectorsForShowcase = [
        { name: 'Turizm ve Otelcilik', description: 'Otel yönetimi, misafir ilişkileri ve rezervasyon süreçlerinizi yapay zeka ile optimize edin.', imageUrl: 'https://mortanas.com/resim/m2.png', path: '/sektorler/otel-cozumlerimiz' },
        { name: 'Sağlık & Güzellik', description: 'Klinik, spa ve güzellik merkezleri için randevu yönetimi, hasta/danışan takibi ve pazarlama otomasyonları.', imageUrl: 'https://mortanas.com/resim/spa.png', path: '/uygulamalar/masaj-wellness-yonetimi' },
        { name: 'E-Ticaret', description: 'WhatsApp, Instagram ve Facebook üzerinden satışlarınızı artırın, müşteri desteğini otomatikleştirin.', imageUrl: 'https://mortanas.com/resim/sosyal.png', path: '/otomasyon/sosyal-medya-otomasyonu' },
        { name: 'Profesyonel Hizmetler', description: 'Danışmanlık ve ajanslar için proje yönetimi, müşteri ilişkileri ve faturalandırma otomasyonları.', imageUrl: 'https://mortanas.com/resim/compa.png', path: '/uygulamalar/sirket-yonitimi-crm' },
        { name: 'Eğitim Kurumları', description: 'Okullar ve kurslar için öğrenci kaydı, veli iletişimi ve eğitim yönetimi otomasyonları.', imageUrl: 'https://i.imgur.com/gKq7w2g.png', path: '/egitimler' },
    ];
    
    const trustedByLogos = [
        { name: 'Koç Holding', url: 'https://logowik.com/content/uploads/images/koc-holding-vertical4097.logowik.com.webp' },
        { name: 'Sabancı Holding', url: 'https://image.hurimg.com/i/hurriyet/75/750x422/66cf69ca601c04688fbe043f.jpg' },
        { name: 'Türk Hava Yolları', url: 'https://cdn.turkishairlines.com/asset/222168c9-4445-4e36-8d08-015c06421a49/THY_0039_RENKLI-c-CIFT-SATIR-DIKEY-TIRE.webp' },
        { name: 'Turkcell', url: 'https://ffo3gv1cf3ir.merlincdn.net/SiteAssets/Hakkimizda/genel-bakis/logolarimiz/TURKCELL_DIKEY_ERKEK_LOGO.jpg?20260520_03' },
        { name: 'Garanti BBVA', url: 'https://www.pazarlamasyon.com/wp-content/uploads/2013/06/garanti-bankas%C4%B111.jpg?fit=714%2C714' },
        { name: 'Microsoft', url: 'https://dhrp.com.au/wp-content/uploads/2023/07/microsoft-centered-logo.png' },
        { name: 'Google', url: 'https://thumbor.evrimagaci.org/5FtfjU15HF5k5b3fAQj4vN0g0bY=/2000x0/filters:quality(85)/old/content_media/9ab56bbe7fde8290e225d93c065efec2.jpg' },
        { name: 'Meta', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpT2yFo4dqRb49LVVA26PHefmlvO4hymdLkw&s' },
        { name: 'Shopify', url: 'https://static.vecteezy.com/system/resources/previews/067/565/523/non_2x/shopify-rounded-logo-design-free-png.png' },
        { name: 'Getir', url: 'https://www.find.com.tr/assets/images/Uploads/Company/1147795/find_2022113_11421934.jpg' },
        { name: 'Trendyol', url: 'https://play-lh.googleusercontent.com/LosPYfjaz1pOL-I3XCTroj4vQVxfsF5629nzPJM4pIj2KLaQuLbwmXUqV-I1RT5u9A' },
        { name: 'Vodafone', url: 'https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2025/11/19/thumbs_b_c_fd7557892ebecee7cedc5e591a7ffa79.jpg' }
    ];


  return (
    <div className="pb-24">
       <style>
          {`
            @keyframes flow {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-flow {
              animation: flow 4s ease-in-out infinite;
            }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            @keyframes ripple-wave {
              0% {
                transform: scale(0.9);
                opacity: 0.7;
              }
              100% {
                transform: scale(2);
                opacity: 0;
              }
            }
            .animate-ripple-wave {
              animation: ripple-wave 2.5s infinite;
            }
            .hero-slider .swiper-pagination-bullet {
                background: white;
                opacity: 0.5;
            }
            .hero-slider .swiper-pagination-bullet-active {
                background: #3b82f6;
                opacity: 1;
            }
            @keyframes scroll-logos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-logos {
              animation: scroll-logos 40s linear infinite;
            }
          `}
        </style>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[480px] md:min-h-[550px] lg:min-h-[580px] flex items-center">
        {/* Swiper for Background only */}
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="absolute inset-0 h-full w-full hero-slider"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full min-h-[480px] md:min-h-[550px] lg:min-h-[580px] flex items-center justify-center">
                {/* Background Video */}
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] z-1"></div>
                <div className="absolute inset-0 background-grid opacity-20 z-2"></div>

                {/* Video text content overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-6 md:px-12">
                  <div className="max-w-4xl text-center space-y-4 md:space-y-6">
                    {/* Badge */}
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-widest uppercase backdrop-blur-md animate-pulse">
                      {slide.badge}
                    </span>
                    
                    {/* Title & Subtitle */}
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                      <span className="inline-block sm:whitespace-nowrap max-w-full">{slide.title}</span> <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        {slide.subtitle}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-sm md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                      {slide.description}
                    </p>

                    {/* Action buttons with premium style & strong CTAs */}
                    <div className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 max-w-md mx-auto sm:max-w-none">
                      <Link 
                        to="/fiyatlandirma" 
                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/45 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 text-sm md:text-base text-center"
                      >
                        Hemen Başla <i className="fas fa-arrow-right ml-2 text-xs"></i>
                      </Link>
                      <Link 
                        to="/uygulamalar/sirket-yonitimi-crm" 
                        className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 backdrop-blur-md text-white font-semibold rounded-xl border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all duration-300 text-sm md:text-base text-center"
                      >
                        Çözümleri İncele
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Trusted By Section - Enhanced Slim Luxury Design */}
      <section className="bg-slate-950/90 backdrop-blur-md py-3.5 relative overflow-hidden border-y border-slate-900">
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.06),transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center mb-0.5">
            <span className="inline-flex items-center gap-2.5 text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              TÜRKİYE'NİN VE DÜNYANIN LİDERLERİ <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">MORTANAS'A GÜVENİYOR</span>
            </span>
          </div>
          
          <div className="logo-scroller relative h-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] animate-fade-in">
            <div className="flex w-max animate-scroll-logos items-center h-full gap-3">
              {[...trustedByLogos, ...trustedByLogos, ...trustedByLogos, ...trustedByLogos].map((logo, index) => (
                <div 
                  key={index} 
                  className="mx-2 flex items-center gap-2 backdrop-blur-sm bg-slate-900/35 hover:bg-slate-900/70 border border-slate-800/40 rounded-full px-3.5 py-1 filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-slate-700/80 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    title={logo.name} 
                    referrerPolicy="no-referrer"
                    className="h-5 md:h-6 max-w-[90px] object-contain rounded-sm" 
                  />
                  <div className="w-[1px] h-3 bg-slate-800" aria-hidden="true" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-slate-300 font-sans whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-8 md:space-y-12 mt-6 md:mt-8">
        {/* Verimlilik Section */}
        <section className="py-6 md:py-10 relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-900">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="container mx-auto px-8 relative z-10">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  Tek Platform, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">Sınırsız Verimlilik</span>
                </h2>
                <p className="mt-4 text-base text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                  Mortanas, yapay zeka gücüyle tüm operasyonlarınızı tek bir merkezden yönetmenizi sağlar.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </div>
        </section>

        {/* What is Mortanas Section */}
        <section id="what-is-mortanas" className="container mx-auto px-8">
          <div className="bg-gradient-to-br from-slate-900/90 to-indigo-950/95 backdrop-blur-sm rounded-3xl shadow-xl px-6 py-9 md:px-10 md:py-12 lg:py-14 overflow-hidden border border-indigo-500/20 shadow-indigo-500/5">
              <div className="grid lg:grid-cols-2 gap-6 items-center">
              {/* Text Content - Left Side */}
              <div>
                  <span className="text-[9px] md:text-[10px] font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase">
                  TÜRKİYE'NİN YAPAY ZEKA OTOMASYON LİDERİ
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 leading-tight">
                  İşletmeniz için 360° Akıllı Otomasyon
                  </h2>
                  <p className="mt-2.5 text-sm md:text-[15px] leading-relaxed text-slate-300">
                    Türkiye'nin öncü <strong>yapay zeka otomasyon şirketi</strong> olarak, tüm müşteri iletişiminizi, pazarlama faaliyetlerinizi ve satış süreçlerinizi tek bir akıllı platformda birleştiriyoruz. Mortanas, işletmenizin <strong>dijital dönüşümünü</strong> hızlandıran ve veriye dayalı büyümesini sağlayan <strong>yapay zeka çözümüdür</strong>.
                  </p>
                  
                  {/* Feature List */}
                  <div className="mt-5 space-y-4">
                    {/* Tümleşik İletişim */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl py-5 px-4.5 rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-blue-500/30 hover:border-blue-400 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] hover:-translate-y-1 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 text-white text-base group-hover:scale-105 transition-all duration-550">
                        <i className="fas fa-comments-dollar"></i>
                      </div>
                      <div className="relative z-10 flex-grow">
                        <h4 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors duration-300">Tümleşik İletişim</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-semibold">WhatsApp, Instagram ve web sitenizdeki görüşmeleri merkezden yönetin.</p>
                      </div>
                    </div>

                    {/* Akıllı Otomasyon */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl py-5 px-4.5 rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-purple-500/30 hover:border-purple-400 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:-translate-y-1 relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700 pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-650 flex items-center justify-center border border-purple-400/20 shadow-lg shadow-purple-500/20 relative z-10 text-white text-base group-hover:scale-105 transition-all duration-550">
                        <i className="fas fa-rocket"></i>
                      </div>
                      <div className="relative z-10 flex-grow">
                        <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors duration-300">Akıllı Otomasyon</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-semibold">Yapay zeka ile 7/24 satış yapın, randevu alın ve soruları yanıtlayın.</p>
                      </div>
                    </div>

                    {/* Veriye Dayalı İçgörüler */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl py-5 px-4.5 rounded-3xl shadow-[0_0_20px_rgba(6,182,212,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-cyan-500/30 hover:border-cyan-400 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-1 relative overflow-hidden ring-4 ring-cyan-500/5 hover:ring-cyan-500/15">
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/20 rounded-full blur-[30px] group-hover:bg-cyan-500/30 transition-all duration-700 pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center border border-cyan-400/20 shadow-lg shadow-cyan-500/20 relative z-10 text-white text-base group-hover:scale-105 transition-all duration-550">
                        <i className="fas fa-magnifying-glass-chart"></i>
                      </div>
                      <div className="relative z-10 flex-grow">
                        <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors duration-300">Veriye Dayalı İçgörüler</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-semibold">Detaylı raporlarla performansı takip edin ve stratejik kararlar alın.</p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Image - Right Side */}
              <div className="relative flex items-center justify-center">
                 <div className="absolute -inset-4 bg-indigo-500/15 rounded-full blur-3xl opacity-60"></div>
                 <img
                    src="https://mortanas.com/resim/m.png"
                    alt="Mortanas yapay zeka otomasyon çözümleri platformu"
                    className="relative max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm w-full aspect-square object-cover rounded-2xl shadow-2xl ring-1 ring-black/5"
                 />
              </div>
              </div>
          </div>
          </section>

        {/* How Our AI Works Section - Redesigned */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-3.5 md:py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[80%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none"></div>
          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-3">
              <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full inline-block mb-2 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">3 ADIMDA BAŞARI</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Yapay Zeka Mühendislik <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">Sürecimiz</span>
              </h2>
              <p className="mt-1.5 text-sm md:text-base text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
                Fikirden değere giden yolda, işletmenize özel çözümler üretmek için izlediğimiz kanıtlanmış mühendislik sürecimiz.
              </p>
            </div>
            
            <div className="relative">
              {/* The connecting animated line - only on desktop */}
              <div className="hidden lg:block absolute top-[45%] left-0 w-full h-[1px] -translate-y-1/2" aria-hidden="true">
                <div className="w-full h-full bg-slate-700/50"></div>
                <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent animate-flow shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>

              <div className="relative grid lg:grid-cols-3 gap-5 md:gap-6">
                {/* Step 1 Card */}
                <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl px-5 md:px-6 py-5 md:py-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.12),_0_15px_50px_rgba(0,0,0,0.7)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.35)] hover:-translate-y-2 h-full z-10 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/25 rounded-full blur-[35px] group-hover:bg-blue-500/35 transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="absolute -top-2 right-4 text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent select-none transition-all duration-500 group-hover:from-blue-500/15 group-hover:scale-105">01</span>
                  
                  <div className="flex flex-col mb-4 relative z-10">
                    <div className="flex-shrink-0 h-11 w-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3 group-hover:scale-110 group-hover:shadow-blue-500/50 transition-all duration-500 border border-blue-400/20">
                      <i className="fas fa-search-plus text-base text-white"></i>
                    </div>
                    <h3 className="text-[18.5px] font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">Keşif & Strateji</h3>
                  </div>
                  
                  <ul className="space-y-2.5 text-slate-300 flex-grow text-[13.5px] font-medium relative z-10">
                    <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">İşletmenizin ihtiyaçlarını ve hedeflerini derinlemesine anlıyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Mevcut süreçlerinizi analiz ederek otomasyon fırsatlarını belirliyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-blue-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Size özel, veriye dayalı bir yapay zeka yol haritası oluşturuyoruz.</span></li>
                  </ul>
                  
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 relative z-10 bg-gradient-to-b from-transparent to-blue-950/30 -mx-5 md:-mx-6 -mb-4.5 md:-mb-5 px-5 md:px-6 pb-4.5 md:pb-5 rounded-b-3xl">
                    <h4 className="text-[9.5px] font-bold text-blue-400 uppercase tracking-widest mb-1 flex items-center"><i className="fas fa-map-signs mr-2"></i> Çıktı</h4>
                    <p className="text-[12.5px] text-slate-200 font-semibold leading-snug">Net, uygulanabilir ve ölçülebilir bir yapay zeka yol haritası.</p>
                  </div>
                </div>

                {/* Step 2 Card */}
                <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl px-5 md:px-6 py-5 md:py-6 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.12),_0_15px_50px_rgba(0,0,0,0.7)] border-2 border-purple-500/40 hover:border-purple-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.35)] hover:-translate-y-2 h-full z-10 relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/25 rounded-full blur-[35px] group-hover:bg-purple-500/35 transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="absolute -top-2 right-4 text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent select-none transition-all duration-500 group-hover:from-purple-500/15 group-hover:scale-105">02</span>
                  
                  <div className="flex flex-col mb-4 relative z-10">
                    <div className="flex-shrink-0 h-11 w-11 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-3 group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-500 border border-purple-400/20">
                      <i className="fas fa-robot text-base text-white"></i>
                    </div>
                    <h3 className="text-[18.5px] font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors duration-300">Özel Model Geliştirme</h3>
                  </div>
                  
                  <ul className="space-y-2.5 text-slate-300 flex-grow text-[13.5px] font-medium relative z-10">
                     <li className="flex items-start"><i className="fas fa-check-circle text-purple-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Yapay zeka modellerimizi, markanızın dili ve verileriyle eğitiyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-purple-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Sektörünüze özel, yüksek doğruluk oranına sahip çözümler geliştiriyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-purple-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Sistemi, gerçek dünya senaryolarıyla kapsamlı bir şekilde test ediyoruz.</span></li>
                  </ul>
                  
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 relative z-10 bg-gradient-to-b from-transparent to-purple-950/30 -mx-5 md:-mx-6 -mb-4.5 md:-mb-5 px-5 md:px-6 pb-4.5 md:pb-5 rounded-b-3xl">
                    <h4 className="text-[9.5px] font-bold text-purple-400 uppercase tracking-widest mb-1 flex items-center"><i className="fas fa-dna mr-2"></i> Çıktı</h4>
                    <p className="text-[12.5px] text-slate-200 font-semibold leading-snug">Markanızın DNA'sını taşıyan, yüksek performanslı ve size özel bir yapay zeka motoru.</p>
                  </div>
                </div>

                {/* Step 3 Card */}
                <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl px-5 md:px-6 py-5 md:py-6 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.12),_0_15px_50px_rgba(0,0,0,0.7)] border-2 border-emerald-500/40 hover:border-emerald-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.35)] hover:-translate-y-2 h-full z-10 relative overflow-hidden ring-4 ring-emerald-500/5 hover:ring-emerald-500/15">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/25 rounded-full blur-[35px] group-hover:bg-emerald-500/35 transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="absolute -top-2 right-4 text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent select-none transition-all duration-500 group-hover:from-emerald-500/15 group-hover:scale-105">03</span>
                  
                  <div className="flex flex-col mb-4 relative z-10">
                    <div className="flex-shrink-0 h-11 w-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 group-hover:scale-110 group-hover:shadow-emerald-500/50 transition-all duration-500 border border-emerald-400/20">
                      <i className="fas fa-rocket text-base text-white"></i>
                    </div>
                    <h3 className="text-[18.5px] font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-300">Entegrasyon & Büyüme</h3>
                  </div>
                  
                  <ul className="space-y-2.5 text-slate-300 flex-grow text-[13.5px] font-medium relative z-10">
                    <li className="flex items-start"><i className="fas fa-check-circle text-emerald-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Çözümlerimizi mevcut altyapınıza (CRM, ERP vb.) sorunsuz entegre ediyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-emerald-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Sistemin performansını anlık olarak izliyor ve sürekli iyileştiriyoruz.</span></li>
                    <li className="flex items-start"><i className="fas fa-check-circle text-emerald-400 mt-1 mr-3 text-xs shrink-0"></i><span className="leading-snug">Size özel raporlar sunarak, yatırımınızın geri dönüşünü şeffaf bir şekilde gösteriyoruz.</span></li>
                  </ul>
                  
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 relative z-10 bg-gradient-to-b from-transparent to-emerald-950/30 -mx-5 md:-mx-6 -mb-4.5 md:-mb-5 px-5 md:px-6 pb-4.5 md:pb-5 rounded-b-3xl">
                    <h4 className="text-[9.5px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center"><i className="fas fa-chart-line mr-2"></i> Çıktı</h4>
                    <p className="text-[12.5px] text-slate-200 font-semibold leading-snug">İş akışlarınıza tam entegre, sürekli öğrenen ve yatırımınızın geri dönüşünü kanıtlayan canlı bir sistem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Engine Section */}
        <section className="container mx-auto px-8">
            <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900/90 to-slate-900 text-white rounded-3xl p-6 md:p-10 lg:p-12 border border-slate-700/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Teknolojimizin Kalbi: <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Mortanas AI Engine</span>
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
                        Sizi rakiplerinizden ayıran ve olağanüstü sonuçlar almanızı sağlayan temel yapay zeka yeteneklerimiz.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {/* NLU Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10">
                          <i className="fas fa-comments text-xl text-white"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white relative z-10 group-hover:text-blue-300 transition-colors duration-300">Doğal Dil Anlama (NLU)</h3>
                        <p className="text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium">AI, sadece anahtar kelimeleri değil, insan konuşmasının bağlamını ve niyetini anlar.</p>
                    </div>

                    {/* Intent Detection Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-purple-500/40 hover:border-purple-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-400/20 shadow-lg shadow-purple-500/20 relative z-10">
                          <i className="fas fa-lightbulb text-xl text-white"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white relative z-10 group-hover:text-purple-300 transition-colors duration-300">Niyet Tespiti</h3>
                        <p className="text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium">Müşterinin "satın alma", "destek isteme" veya "bilgi" alma gibi niyetlerini analiz eder.</p>
                    </div>

                    {/* Personalization Engine Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(6,182,212,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-cyan-500/40 hover:border-cyan-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-cyan-500/5 hover:ring-cyan-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/20 rounded-full blur-[30px] group-hover:bg-cyan-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-450 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/20 shadow-lg shadow-cyan-500/20 relative z-10">
                          <i className="fas fa-user-astronaut text-xl text-white"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-300">Kişiselleştirme Motoru</h3>
                        <p className="text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium">Kullanıcılara özel teklifler, öneriler ve yanıtlar sunarak dönüşüm oranlarını artırır.</p>
                    </div>

                     {/* Continuous Learning Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(16,185,129,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-emerald-500/40 hover:border-emerald-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-emerald-500/5 hover:ring-emerald-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-[30px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-emerald-400/20 shadow-lg shadow-emerald-500/20 relative z-10">
                          <i className="fas fa-sync-alt text-xl text-white"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white relative z-10 group-hover:text-emerald-300 transition-colors duration-300">Sürekli Öğrenme</h3>
                        <p className="text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium">Her etkileşimden öğrenir, zamanla daha akıllı ve isabetli hale gelir.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Futuristic AI Solutions Section */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 py-5 md:py-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
            <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.1),rgba(255,255,255,0))]"></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        Geleceğin Teknolojileri, <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Bugünün Çözümleri</span>
                    </h2>
                    <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto">
                        Ziyaretçi ve müşteri deneyimini yeniden tanımlayan, en yenilikçi yapay zeka çözümlerimizle tanışın.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {/* 1. Kiosk Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative h-48 overflow-hidden rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform duration-500 border border-slate-800/80">
                            <img src="https://mortanas.com/resim/sesli.png" referrerPolicy="no-referrer" alt="Yapay Zeka Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                            <div className="absolute top-3 left-3">
                                <span className="text-[10px] font-black tracking-wider text-blue-300 bg-blue-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg uppercase border border-blue-400/20 shadow-md">YAPAY ZEKA KIOSK</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-grow relative z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">İnteraktif Dijital Danışmanınız</h3>
                            <p className="mt-2 text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium flex-grow">Ziyaretçilerinize görsel ve sesli destekle yönlendirme sunan, sezgisel ve etkileyici bir deneyim sağlar.</p>
                            
                            <ul className="mt-4 space-y-2.5 text-[13px] font-medium border-t border-slate-800/80 pt-3.5 mb-5 relative z-10">
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-blue-400 mr-2.5 text-xs shrink-0"></i><span>İnteraktif Arayüz</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-blue-400 mr-2.5 text-xs shrink-0"></i><span>Akıllı Yönlendirme</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-blue-400 mr-2.5 text-xs shrink-0"></i><span>Görsel Tanıtım</span></li>
                            </ul>
                            
                            <Link to="/yapay-zeka-kiosk" className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/45 hover:-translate-y-0.5 text-sm">
                                Daha Fazla Bilgi <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
                            </Link>
                        </div>
                    </div>

                    {/* 2. Hologram Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-purple-500/40 hover:border-purple-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative h-48 overflow-hidden rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform duration-500 border border-slate-800/80">
                            <img src="https://mortanas.com/resim/sesli.png" referrerPolicy="no-referrer" alt="Yapay Zeka Hologram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                            <div className="absolute top-3 left-3">
                                <span className="text-[10px] font-black tracking-wider text-purple-300 bg-purple-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg uppercase border border-purple-400/20 shadow-md">YAPAY ZEKA HOLOGRAM</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-grow relative z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">Geleceğin Karşılama Deneyimi</h3>
                            <p className="mt-2 text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium flex-grow">Gerçek insan gibi konuşan, etkileşimli 3D hologram asistan ile unutulmaz ve fütüristik bir deneyim sunun.</p>
                            
                            <ul className="mt-4 space-y-2.5 text-[13px] font-medium border-t border-slate-800/80 pt-3.5 mb-5 relative z-10">
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-purple-400 mr-2.5 text-xs shrink-0"></i><span>3D Holografik Görüntü</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-purple-400 mr-2.5 text-xs shrink-0"></i><span>Doğal Diyalog</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-purple-400 mr-2.5 text-xs shrink-0"></i><span>Yüksek Etkileşim</span></li>
                            </ul>
                            
                            <Link to="/yapay-zeka-hologram" className="w-full text-center bg-gradient-to-r from-purple-600 to-pink-650 hover:from-purple-500 hover:to-pink-550 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/45 hover:-translate-y-0.5 text-sm">
                                Hologramı Keşfedin <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
                            </Link>
                        </div>
                    </div>

                    {/* 3. Voice Agent Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-indigo-500/40 hover:border-indigo-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-indigo-500/5 hover:ring-indigo-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-[30px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative h-48 overflow-hidden rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform duration-500 border border-slate-800/80">
                            <img src="https://mortanas.com/resim/sesli.png" referrerPolicy="no-referrer" alt="Yapay Zeka Voice Agent" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                            <div className="absolute top-3 left-3">
                                <span className="text-[10px] font-black tracking-wider text-indigo-300 bg-indigo-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg uppercase border border-indigo-400/20 shadow-md">YAPAY ZEKA VOICE AGENT</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-grow relative z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">7/24 Sesli Müşteri Hizmetleri</h3>
                            <p className="mt-2 text-[13px] text-slate-300 leading-relaxed relative z-10 font-medium flex-grow">İşletmeniz adına telefon görüşmeleri yapan, randevuları yöneten gelişmiş yapay zeka çözümü.</p>
                            
                            <ul className="mt-4 space-y-2.5 text-[13px] font-medium border-t border-slate-800/80 pt-3.5 mb-5 relative z-10">
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-indigo-400 mr-2.5 text-xs shrink-0"></i><span>Otomatik Arama & Karşılama</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-indigo-400 mr-2.5 text-xs shrink-0"></i><span>Akıllı Randevu Yönetimi</span></li>
                                <li className="flex items-center text-slate-300"><i className="fas fa-check-circle text-indigo-400 mr-2.5 text-xs shrink-0"></i><span>İnsan Benzeri Ses</span></li>
                            </ul>
                            
                            <Link to="/yapay-zeka-voice-agent" className="w-full text-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/45 hover:-translate-y-0.5 text-sm">
                                Voice Agent'ı Tanıyın <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Interactive Demos Section */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 py-6 md:py-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Deneyin ve Kendiniz Görün: <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">İnteraktif Demolar</span>
                    </h2>
                    <p className="mt-4 text-[15px] md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        Platformumuzun gücünü canlı olarak test edin. Yapay zeka asistanlarımızla sohbet edin ve yönetim panelimizin kullanım kolaylığını keşfedin.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Demo Panel Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <i className="fas fa-desktop text-xl text-white"></i>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Otel Yönetim Panelini Test Edin</h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium flex-grow">Tüm özellikleri canlı olarak deneyimleyin. Rezervasyon oluşturun, oda durumunu değiştirin ve raporları inceleyin.</p>
                        
                        <div className="bg-slate-950/60 border border-slate-800/80 w-full p-3.5 rounded-2xl my-4 relative z-10 transition-all duration-300 group-hover:border-blue-500/20">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Admin Giriş Şifresi</p>
                            <p className="font-mono text-base font-bold text-yellow-500 tracking-widest">mortanas</p>
                        </div>
                        
                        <a href="https://www.mortanas.com/mortanasotel" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2 md:py-2.5 px-5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-0.5 text-xs md:text-sm">
                            Demo Siteye Git <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
                        </a>
                    </div>

                    {/* Instagram Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-purple-500/40 hover:border-purple-400 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-650 flex items-center justify-center mb-4 border border-purple-400/20 shadow-lg shadow-purple-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <i className="fab fa-instagram text-xl text-white"></i>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">Instagram AI ile Sohbet Edin</h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium flex-grow">Yapay zeka asistanımıza mesaj atın. Oda müsaitliği sorun, fiyat bilgisi alın veya rezervasyon yapmayı deneyin.</p>
                        
                        <div className="bg-slate-950/60 border border-slate-800/80 w-full p-3.5 rounded-2xl my-4 relative z-10 transition-all duration-300 group-hover:border-purple-500/20">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hedef Hesap</p>
                            <p className="font-mono text-base font-bold text-pink-500">@mortanasotel</p>
                        </div>
                        
                        <a href="https://ig.me/m/mortanasotel" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-gradient-to-r from-purple-600 to-pink-650 hover:from-purple-500 hover:to-pink-550 text-white font-bold py-2 md:py-2.5 px-5 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40 hover:-translate-y-0.5 text-xs md:text-sm">
                            Mesaj Gönder <i className="fab fa-instagram ml-1.5 text-sm"></i>
                        </a>
                    </div>
                    
                    {/* WhatsApp Card */}
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(16,185,129,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-emerald-500/40 hover:border-emerald-400 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-emerald-500/5 hover:ring-emerald-500/15">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-[30px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 border border-emerald-400/20 shadow-lg shadow-emerald-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <i className="fab fa-whatsapp text-xl text-white"></i>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">WhatsApp'tan Rezervasyon Yapın</h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium flex-grow">Whatsapp üzerinden yapay zekamızla konuşarak 7/24 rezervasyon sürecini nasıl otomatikleştirdiğimizi canlı olarak görün.</p>
                        
                        <div className="bg-slate-950/60 border border-slate-800/80 w-full p-3.5 rounded-2xl my-4 relative z-10 transition-all duration-300 group-hover:border-emerald-500/20">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hedef Numara</p>
                            <p className="font-mono text-base font-bold text-emerald-400">+90 554 011 8888</p>
                        </div>
                        
                        <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2 md:py-2.5 px-5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:-translate-y-0.5 text-xs md:text-sm">
                            WhatsApp'ta Başlat <i className="fab fa-whatsapp ml-1.5 text-sm"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* Global Leadership Section */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-5 md:py-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
            <div className="absolute -top-1/4 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-50 animate-pulse [animation-delay:-2s]"></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
                        <img 
                            src="https://mortanas.com/resim/z.png" 
                            alt="Mortanas yapay zeka şirketinin global ağı"
                            className="relative rounded-2xl shadow-2xl ring-2 ring-slate-700 max-w-md mx-auto"
                        />
                    </div>
                    {/* Right Content */}
                    <div>
                        <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">
                            TÜRKİYE'NİN ÖNCÜ YAPAY ZEKA ŞİRKETİ
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                            Geleceği <span className="text-blue-400">Londra'dan</span> Şekillendiriyoruz
                        </h2>
                        <p className="mt-4 text-slate-300">
                            2020'den bu yana Türkiye'de yapay zeka otomasyonu alanında bir devrim başlattık. Sektörün ilk ve lider şirketi olarak, global vizyonumuzu Londra'daki merkezimizden dünyaya taşıyor, en son teknolojilerle işletmeler için değer yaratıyoruz.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {/* Card 1: 2020'den Beri Öncü */}
                            <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-blue-500/30 hover:border-blue-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                                <div className="absolute -top-16 -right-16 w-28 h-28 bg-blue-500/20 rounded-full blur-[25px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-blue-400/20 shadow-lg relative z-10 text-white text-lg">
                                    <i className="fas fa-flag-checkered"></i>
                                </div>
                                <h3 className="font-bold text-base text-white relative z-10 group-hover:text-blue-300 transition-colors duration-300">2020'den Beri Öncü</h3>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed relative z-10 font-medium">Türkiye'nin ilk AI otomasyon şirketi.</p>
                            </div>

                            {/* Card 2: Sektör Lideri */}
                            <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-purple-500/30 hover:border-purple-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                                <div className="absolute -top-16 -right-16 w-28 h-28 bg-purple-500/20 rounded-full blur-[25px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-purple-400/20 shadow-lg relative z-10 text-white text-lg">
                                    <i className="fas fa-trophy"></i>
                                </div>
                                <h3 className="font-bold text-base text-white relative z-10 group-hover:text-purple-300 transition-colors duration-300">Sektör Lideri</h3>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed relative z-10 font-medium">Yenilikçi çözümlerle pazara yön veriyoruz.</p>
                            </div>

                            {/* Card 3: Londra Merkezli */}
                            <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(99,102,241,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-indigo-500/30 hover:border-indigo-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-indigo-500/5 hover:ring-indigo-500/15">
                                <div className="absolute -top-16 -right-16 w-28 h-28 bg-indigo-500/20 rounded-full blur-[25px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-indigo-400/20 shadow-lg relative z-10 text-white text-lg">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <h3 className="font-bold text-base text-white relative z-10 group-hover:text-indigo-300 transition-colors duration-300">Londra Merkezli</h3>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed relative z-10 font-medium">Global teknoloji ekosisteminin kalbindeyiz.</p>
                            </div>

                            {/* Card 4: Global İnovasyon */}
                            <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(16,185,129,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-emerald-500/30 hover:border-emerald-400 flex flex-col transition-all duration-500 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-emerald-500/5 hover:ring-emerald-500/15">
                                <div className="absolute -top-16 -right-16 w-28 h-28 bg-emerald-500/20 rounded-full blur-[25px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-emerald-400/20 shadow-lg relative z-10 text-white text-lg">
                                    <i className="fas fa-globe-europe"></i>
                                </div>
                                <h3 className="font-bold text-base text-white relative z-10 group-hover:text-emerald-300 transition-colors duration-300">Global İnovasyon</h3>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed relative z-10 font-medium">Dünya standartlarında Ar-Ge ve teknoloji.</p>
                            </div>
                        </div>
                        <div className="mt-12">
                            <Link to="/kurumsal" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/20 transition-all inline-flex items-center space-x-3">
                                <span>Kurumsal Kimliğimizi Keşfedin</span>
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* NEW SECTIONS START HERE */}

        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-5 md:py-8">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold tracking-wider text-yellow-300 bg-yellow-500/10 px-3 py-1 rounded-full">HAREKETE GEÇİN</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-3 leading-tight">
                  Rakipleriniz Dijitalleşirken <br /> Siz Geride Kalmayın
                </h2>
                <p className="mt-3 text-sm text-slate-300">
                  Dijital dönüşümü ertelemek, sadece bir fırsatı kaçırmak değil, aynı zamanda her geçen gün artan maliyetlere katlanmaktır. İşte harekete geçmemenin somut maliyetleri:
                </p>
                <div className="mt-6 space-y-4">
                  {/* Kaçan Satış Fırsatları */}
                  <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-purple-500/30 hover:border-purple-400 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-650 flex items-center justify-center border border-purple-400/20 shadow-lg shadow-purple-500/20 relative z-10 text-white text-base">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="relative z-10 flex-grow">
                      <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors duration-300">Kaçan Satış Fırsatları</h3>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed font-medium">Anında yanıt alamayan müşterilerin <strong className="text-yellow-400 font-bold">85%</strong>'i rakip firmalara yöneliyor.</p>
                    </div>
                  </div>

                  {/* Artan Operasyonel Maliyetler */}
                  <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-blue-500/30 hover:border-blue-400 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 text-white text-base">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="relative z-10 flex-grow">
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors duration-300">Artan Operasyonel Maliyetler</h3>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed font-medium">Otomasyon kullanmayan işletmeler, müşteri hizmetleri için <strong className="text-yellow-400 font-bold">60%</strong>'a varan daha fazla harcama yapıyor.</p>
                    </div>
                  </div>

                  {/* Düşen Müşteri Sadakati */}
                  <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_20px_rgba(244,63,94,0.1),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-rose-500/30 hover:border-rose-450 flex items-start space-x-4 transition-all duration-500 hover:shadow-[0_0_35px_rgba(244,63,94,0.25)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-rose-500/5 hover:ring-rose-500/15">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-rose-500/20 rounded-full blur-[30px] group-hover:bg-rose-500/30 transition-all duration-700"></div>
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center border border-rose-400/20 shadow-lg shadow-rose-500/20 relative z-10 text-white text-base">
                      <i className="fas fa-heart-broken"></i>
                    </div>
                    <div className="relative z-10 flex-grow">
                      <h3 className="font-bold text-lg text-white group-hover:text-rose-300 transition-colors duration-300">Düşen Müşteri Sadakati</h3>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed font-medium">Kötü bir müşteri deneyimi yaşayanların <strong className="text-yellow-400 font-bold">90%</strong>'ı bir daha o markayı tercih etmiyor.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                    <Link to="/kurumsal" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-505 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-0.5 inline-flex items-center space-x-3 text-sm">
                        <span>Dijital Dönüşüme Şimdi Başla</span>
                        <i className="fas fa-arrow-right animate-pulse"></i>
                    </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <img src="https://mortanas.com/resim/z.png" referrerPolicy="no-referrer" alt="Dijital Dönüşüm" className="rounded-2xl shadow-2xl ring-2 ring-slate-700 max-w-sm mx-auto"/>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 py-10 md:py-12">
          <div className="container mx-auto px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Her Sektöre Özel <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Yapay Zeka Çözümleri</span>
              </h2>
              <p className="mt-4 text-base text-indigo-200 max-w-2xl mx-auto leading-relaxed font-medium">
                Farklı sektörlerin benzersiz ihtiyaçlarına özel olarak geliştirdiğimiz yapay zeka ve otomasyon çözümlerini keşfedin.
              </p>
            </div>
            <div className="relative">
                <div ref={scrollRef} className="flex overflow-x-auto space-x-8 pb-8 snap-x snap-mandatory scrollbar-hide">
                    {sectorsForShowcase.map((sector, index) => {
                        const styleKey = index % 5;
                        const cardStyles = [
                          {
                            border: "border-blue-500/40 hover:border-blue-400",
                            ring: "ring-blue-500/5 hover:ring-blue-500/15",
                            shadow: "shadow-[0_0_25px_rgba(59,130,246,0.15),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]",
                            glow: "bg-blue-500/20 group-hover:bg-blue-500/30",
                            line: "via-blue-400",
                            textHover: "group-hover:text-blue-300",
                            linkText: "text-blue-400"
                          },
                          {
                            border: "border-purple-500/40 hover:border-purple-400",
                            ring: "ring-purple-500/5 hover:ring-purple-500/15",
                            shadow: "shadow-[0_0_25px_rgba(168,85,247,0.15),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]",
                            glow: "bg-purple-500/20 group-hover:bg-purple-500/30",
                            line: "via-purple-400",
                            textHover: "group-hover:text-purple-300",
                            linkText: "text-purple-400"
                          },
                          {
                            border: "border-cyan-500/40 hover:border-cyan-400",
                            ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
                            shadow: "shadow-[0_0_25px_rgba(6,182,212,0.15),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]",
                            glow: "bg-cyan-500/20 group-hover:bg-cyan-500/30",
                            line: "via-cyan-400",
                            textHover: "group-hover:text-cyan-300",
                            linkText: "text-cyan-400"
                          },
                          {
                            border: "border-emerald-500/40 hover:border-emerald-400",
                            ring: "ring-emerald-500/5 hover:ring-emerald-500/15",
                            shadow: "shadow-[0_0_25px_rgba(16,185,129,0.15),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]",
                            glow: "bg-emerald-500/20 group-hover:bg-emerald-500/30",
                            line: "via-emerald-400",
                            textHover: "group-hover:text-emerald-300",
                            linkText: "text-emerald-400"
                          },
                          {
                            border: "border-amber-500/40 hover:border-amber-400",
                            ring: "ring-amber-500/5 hover:ring-amber-500/15",
                            shadow: "shadow-[0_0_25px_rgba(245,158,11,0.15),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]",
                            glow: "bg-amber-500/20 group-hover:bg-amber-500/30",
                            line: "via-amber-400",
                            textHover: "group-hover:text-amber-300",
                            linkText: "text-amber-300"
                          }
                        ];
                        const currentStyle = cardStyles[styleKey];

                        return (
                            <div key={index} className="flex-shrink-0 w-[290px] sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] snap-center pb-4">
                                <div className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl rounded-3xl pb-6 overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-2 relative border-2 ${currentStyle.border} ${currentStyle.shadow} ${currentStyle.ring}`}>
                                    <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${currentStyle.glow}`}></div>
                                    <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent ${currentStyle.line} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    
                                    <div className="h-44 overflow-hidden rounded-t-3xl border-b border-slate-900 relative">
                                        <img src={sector.imageUrl} referrerPolicy="no-referrer" alt={sector.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
                                    </div>
                                    <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                        <h3 className={`text-lg md:text-xl font-bold text-white mb-2 transition-colors duration-300 ${currentStyle.textHover}`}>{sector.name}</h3>
                                        <p className="text-slate-300 text-[13px] leading-relaxed font-medium flex-grow">{sector.description}</p>
                                        <Link to={sector.path} className={`mt-5 font-bold text-sm ${currentStyle.linkText} hover:brightness-110 flex items-center transition-all`}>
                                            Detayları Gör <i className="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1.5"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => handleScroll('left')} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10 hidden md:block">
                    <i className="fas fa-chevron-left text-blue-400"></i>
                </button>
                <button onClick={() => handleScroll('right')} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10 hidden md:block">
                    <i className="fas fa-chevron-right text-blue-400"></i>
                </button>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-5 md:py-7">
            <div className="container mx-auto px-8">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        6 Adımda <span className="text-blue-400">Kolay Başlangıç</span>
                    </h2>
                    <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Mortanas Company Partnerlik Programı'na katılarak işinizi büyütün ve yapay zeka devriminde yerinizi alın.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Left Steps */}
                    <div className="space-y-5 md:space-y-6">
                        {partnershipSteps.slice(0, 3).map(step => (
                           <div key={step.num} className="group relative bg-slate-800/50 p-5 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-start space-x-5">
                                    <div className="flex-shrink-0 h-14 w-14 bg-blue-600/20 rounded-xl flex items-center justify-center font-bold text-xl text-blue-300 ring-4 ring-slate-900 group-hover:bg-blue-600/40 transition-colors">
                                      <i className={step.icon}></i>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                        <p className="mt-1.5 text-xs md:text-sm text-slate-300 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center Graphic */}
                     <div className="text-center my-6 lg:my-0 order-first lg:order-none">
                        <div className="relative inline-flex items-center justify-center">
                            {/* Animated ripples */}
                            <div className="absolute w-full h-full rounded-full bg-blue-500/20 animate-ripple-wave" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute w-full h-full rounded-full bg-blue-500/20 animate-ripple-wave" style={{ animationDelay: '1.25s' }}></div>
                            
                            {/* Main Icon Content */}
                            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-10 md:p-14 rounded-full border-2 border-blue-500/50 shadow-2xl ring-8 ring-slate-900">
                                <i className="fas fa-handshake text-5xl md:text-6xl text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"></i>
                                <h3 className="text-xl md:text-2xl font-bold mt-4 text-white">Partner Olun</h3>
                                <p className="text-xs md:text-sm text-slate-300 mt-1">Birlikte büyüyelim</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Steps */}
                    <div className="space-y-5 md:space-y-6">
                        {partnershipSteps.slice(3, 6).map(step => (
                           <div key={step.num} className="group relative bg-slate-800/50 p-5 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-start space-x-5">
                                    <div className="flex-shrink-0 h-14 w-14 bg-blue-600/20 rounded-xl flex items-center justify-center font-bold text-xl text-blue-300 ring-4 ring-slate-900 group-hover:bg-blue-600/40 transition-colors">
                                      <i className={step.icon}></i>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                        <p className="mt-1.5 text-xs md:text-sm text-slate-300 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-10">
                    <Link to="/kurumsal" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-base">
                        <span>Partnerlik Başvurusu Yap</span>
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
        
        <div className="h-px w-full bg-gradient-to-r from-slate-900 via-blue-500/50 to-slate-900"></div>

        <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-10 md:py-12">
          <div className="container mx-auto px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Platformumuzdan <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">Canlı Veriler</span>
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto font-medium">
                İşletmelerin Türkiye genelinde yapay zeka ile elde ettiği haftalık başarıları ve hareketliliği görün.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-stretch">
              {/* Left: Counter */}
              <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-1.5 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <i className="fas fa-wave-square text-2xl text-white"></i>
                </div>
                
                <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-blue-300 mb-2">Bu Hafta İşlenen Müşteri Etkileşimi</h3>
                <p className="text-5xl md:text-6xl font-black my-4 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                  <AnimatedCounter target={1284592} />
                </p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-semibold max-w-sm mx-auto">
                  Müşterilerimizin operasyonel yükünü hafiflettik ve binlerce potansiyel satışı yakaladık.
                </p>
              </div>
              
              {/* Right: Live Feed */}
              <div className="space-y-4 flex flex-col justify-between">
                {liveActivities.map((activity, idx) => {
                  const cardStyles = [
                    {
                      border: "border-blue-500/30 hover:border-blue-400",
                      ring: "ring-blue-500/5 hover:ring-blue-500/15",
                      shadow: "shadow-[0_0_20px_rgba(59,130,246,0.08),_0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
                      gradient: "from-blue-500 to-indigo-600",
                      glow: "bg-blue-500/15 group-hover:bg-blue-500/25",
                      topLine: "via-blue-400",
                      textAccent: "text-blue-300"
                    },
                    {
                      border: "border-purple-500/30 hover:border-purple-400",
                      ring: "ring-purple-500/5 hover:ring-purple-500/15",
                      shadow: "shadow-[0_0_20px_rgba(168,85,247,0.08),_0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
                      gradient: "from-purple-500 to-pink-650",
                      glow: "bg-purple-500/15 group-hover:bg-purple-500/25",
                      topLine: "via-purple-400",
                      textAccent: "text-purple-300"
                    },
                    {
                      border: "border-emerald-500/30 hover:border-emerald-400",
                      ring: "ring-emerald-500/5 hover:ring-emerald-500/15",
                      shadow: "shadow-[0_0_20px_rgba(16,185,129,0.08),_0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
                      gradient: "from-emerald-500 to-teal-600",
                      glow: "bg-emerald-500/15 group-hover:bg-emerald-500/25",
                      topLine: "via-emerald-400",
                      textAccent: "text-emerald-300"
                    },
                    {
                      border: "border-cyan-500/30 hover:border-cyan-400",
                      ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
                      shadow: "shadow-[0_0_20px_rgba(6,182,212,0.08),_0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
                      gradient: "from-cyan-500 to-teal-600",
                      glow: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
                      topLine: "via-cyan-400",
                      textAccent: "text-cyan-300"
                    }
                  ];
                  const cardStyle = cardStyles[idx % cardStyles.length];
                  const cleanIcon = activity.icon.replace(/text-\w+-\d+/g, '').trim();
                  return (
                    <div 
                      key={activity.id} 
                      className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl flex items-center space-x-4 border-2 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${cardStyle.border} ${cardStyle.shadow} ${cardStyle.ring}`}
                    >
                      <div className={`absolute -top-12 -right-12 w-24 h-24 ${cardStyle.glow} rounded-full blur-[25px] transition-all duration-700 pointer-events-none`}></div>
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent ${cardStyle.topLine} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className={`flex-shrink-0 h-11 w-11 rounded-2xl bg-gradient-to-br ${cardStyle.gradient} flex items-center justify-center border border-white/10 shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                        <i className={`${cleanIcon} text-base text-white`}></i>
                      </div>
                      <div className="flex-grow relative z-10">
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-semibold font-sans" dangerouslySetInnerHTML={{ __html: activity.text }}></p>
                      </div>
                      <div className={`flex-shrink-0 text-[10px] font-bold ${cardStyle.textAccent} uppercase tracking-wider self-start relative z-10 mt-1`}>{activity.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTIONS END HERE */}


        {/* Testimonials Section */}
        <section className="py-7 md:py-8 bg-gradient-to-br from-slate-900 to-indigo-900">
            <div className="container mx-auto px-8">
                <div className="text-center mb-6 md:mb-8">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    Kullanıcılarımız <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 text-transparent bg-clip-text">Ne Diyor?</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-indigo-200 max-w-2xl mx-auto font-medium lead-relaxed">
                    Türkiye'nin dört bir yanından, farklı sektörlerden işletmelerin başarı hikayeleri.
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
                        className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10"
                        aria-label="Önceki yorum"
                    >
                        <i className="fas fa-chevron-left text-blue-400"></i>
                    </button>
                    <button 
                        onClick={handleNextTestimonial} 
                        className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all z-10"
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

        {/* CTA Section */}
        <section className="container mx-auto px-8 relative z-10 mb-16">
            <div className="group bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[32px] border-2 border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden relative transition-all duration-500 hover:border-indigo-400">
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
                
                <div className="grid lg:grid-cols-2 items-center">
                    {/* Left side: Text and Buttons */}
                    <div className="py-6 px-8 md:py-8 md:px-12 lg:py-12 lg:px-16 text-center lg:text-left z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Dijital Devrime</span><br /> Bugün Katılın
                        </h2>
                        <p className="mt-5 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                            Yapay zekanın gücünü iş süreçlerinize entegre ederek verimliliği artırmaya ve rakiplerinizin önüne geçmeye bugün başlayın. Mortanas ile tanışın, geleceğe hazırlanın.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/paketler" className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                <i className="fas fa-rocket mr-3"></i>
                                Hemen Başla
                            </Link>
                            <Link to="/kurumsal" className="w-full sm:w-auto bg-transparent border-2 border-slate-600 text-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-colors inline-flex items-center justify-center">
                                <i className="fas fa-headset mr-3"></i>
                                Uzmanla Görüş
                            </Link>
                        </div>
                    </div>
                    {/* Right side: Visual Element - AI Control Center Mockup */}
                    <div className="relative min-h-[350px] lg:min-h-[460px] flex items-center justify-center p-6 md:p-10 overflow-hidden z-10 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-slate-950/30">
                        {/* Glowing Background Orbs */}
                        <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -top-10 -right-10 animate-pulse"></div>
                        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none -bottom-10 -left-10 animate-pulse animation-delay-2000"></div>
                        
                        {/* High-tech Grid Background */}
                        <div className="absolute inset-x-0 top-0 h-full bg-grid-white/[0.015] pointer-events-none"></div>

                        {/* Mortanas Ecosystem Card */}
                        <div className="w-full max-w-md bg-slate-950/85 backdrop-blur-2xl rounded-3xl border border-indigo-500/35 p-5 md:p-6 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-1">
                            {/* Card Top Border Glow line */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>

                            {/* Header Panel */}
                            <div className="flex items-center justify-center border-b border-indigo-500/20 pb-4 mb-4">
                                <span className="text-sm font-black uppercase tracking-widest text-indigo-300">Mortanas Ekosistemi</span>
                            </div>

                            {/* Main List */}
                            <div className="space-y-3.5 mb-2">
                                {/* Mortanas Company */}
                                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-3.5 rounded-2xl border border-white/5 hover:border-indigo-500/40 transition-all duration-300 shadow-sm group/item">
                                    <div className="flex items-center justify-between mb-2.5">
                                        <h4 className="text-[13px] font-black text-white tracking-wide group-hover/item:text-indigo-300 transition-colors">Mortanas Company</h4>
                                        <div className="flex space-x-2.5 text-slate-400 text-sm">
                                            <a href="https://twitter.com/mortanascompany" target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] transition-colors"><i className="fab fa-twitter"></i></a>
                                            <a href="https://instagram.com/mortanascompany" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors"><i className="fab fa-instagram"></i></a>
                                            <a href="https://youtube.com/@mortanascompany" target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors"><i className="fab fa-youtube"></i></a>
                                            <a href="https://linkedin.com/company/mortanascompany" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors"><i className="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                                        <div className="flex items-center justify-between">
                                            <a href="https://www.mortanascompany.com" target="_blank" rel="noreferrer" className="flex items-center hover:text-indigo-400 transition-colors">
                                                <i className="fas fa-globe mr-1.5 text-indigo-500/70"></i> mortanascompany.com
                                            </a>
                                            <span className="flex items-center text-indigo-300/90 font-bold">
                                                <i className="fas fa-at mr-1 opacity-70 border-r border-indigo-500/30 pr-1"></i>mortanascompany
                                            </span>
                                        </div>
                                        <a href="mailto:info@mortanascompany.com" className="flex items-center hover:text-indigo-400 transition-colors">
                                            <i className="fas fa-envelope mr-1.5 text-indigo-500/70"></i> info@mortanascompany.com
                                        </a>
                                    </div>
                                </div>

                                {/* Mortanas Agency */}
                                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-3.5 rounded-2xl border border-white/5 hover:border-purple-500/40 transition-all duration-300 shadow-sm group/item">
                                    <div className="flex items-center justify-between mb-2.5">
                                        <h4 className="text-[13px] font-black text-white tracking-wide group-hover/item:text-purple-300 transition-colors">Mortanas Agency</h4>
                                        <div className="flex space-x-2.5 text-slate-400 text-sm">
                                            <a href="https://twitter.com/mortanasagency" target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] transition-colors"><i className="fab fa-twitter"></i></a>
                                            <a href="https://instagram.com/mortanasagency" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors"><i className="fab fa-instagram"></i></a>
                                            <a href="https://linkedin.com/company/mortanasagency" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors"><i className="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                                        <div className="flex items-center justify-between">
                                            <a href="https://www.mortanasagency.com" target="_blank" rel="noreferrer" className="flex items-center hover:text-purple-400 transition-colors">
                                                <i className="fas fa-globe mr-1.5 text-purple-500/70"></i> mortanasagency.com
                                            </a>
                                            <span className="flex items-center text-purple-300/90 font-bold">
                                                <i className="fas fa-at mr-1 opacity-70 border-r border-purple-500/30 pr-1"></i>mortanasagency
                                            </span>
                                        </div>
                                        <a href="mailto:info@mortanasagency.com" className="flex items-center hover:text-purple-400 transition-colors">
                                            <i className="fas fa-envelope mr-1.5 text-purple-500/70"></i> info@mortanasagency.com
                                        </a>
                                    </div>
                                </div>

                                {/* Mortanas Academy */}
                                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-3.5 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-sm group/item">
                                    <div className="flex items-center justify-between mb-2.5">
                                        <h4 className="text-[13px] font-black text-white tracking-wide group-hover/item:text-cyan-300 transition-colors">Mortanas Academy</h4>
                                        <div className="flex space-x-2.5 text-slate-400 text-sm">
                                            <a href="https://twitter.com/mortanasacademy" target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] transition-colors"><i className="fab fa-twitter"></i></a>
                                            <a href="https://instagram.com/mortanasacademy" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors"><i className="fab fa-instagram"></i></a>
                                            <a href="https://youtube.com/@mortanasacademy" target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors"><i className="fab fa-youtube"></i></a>
                                            <a href="https://linkedin.com/company/mortanasacademy" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors"><i className="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                                        <div className="flex items-center justify-between">
                                            <a href="https://www.mortanasacademy.com" target="_blank" rel="noreferrer" className="flex items-center hover:text-cyan-400 transition-colors">
                                                <i className="fas fa-globe mr-1.5 text-cyan-500/70"></i> mortanasacademy.com
                                            </a>
                                            <span className="flex items-center text-cyan-300/90 font-bold">
                                                <i className="fas fa-at mr-1 opacity-70 border-r border-cyan-500/30 pr-1"></i>mortanasacademy
                                            </span>
                                        </div>
                                        <a href="mailto:info@mortanasacademy.com" className="flex items-center hover:text-cyan-400 transition-colors">
                                            <i className="fas fa-envelope mr-1.5 text-cyan-500/70"></i> info@mortanasacademy.com
                                        </a>
                                    </div>
                                </div>

                                {/* Mortanas Medya */}
                                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-3.5 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all duration-300 shadow-sm group/item">
                                    <div className="flex items-center justify-between mb-2.5">
                                        <h4 className="text-[13px] font-black text-white tracking-wide group-hover/item:text-emerald-300 transition-colors">Mortanas Medya</h4>
                                        <div className="flex space-x-2.5 text-slate-400 text-sm">
                                            <a href="https://twitter.com/mortanasmedya" target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] transition-colors"><i className="fab fa-twitter"></i></a>
                                            <a href="https://instagram.com/mortanasmedya" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors"><i className="fab fa-instagram"></i></a>
                                            <a href="https://youtube.com/@mortanasmedya" target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors"><i className="fab fa-youtube"></i></a>
                                            <a href="https://linkedin.com/company/mortanasmedya" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors"><i className="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                                        <div className="flex items-center justify-between">
                                            <a href="https://www.mortanasmedya.com" target="_blank" rel="noreferrer" className="flex items-center hover:text-emerald-400 transition-colors">
                                                <i className="fas fa-globe mr-1.5 text-emerald-500/70"></i> mortanasmedya.com
                                            </a>
                                            <span className="flex items-center text-emerald-300/90 font-bold">
                                                <i className="fas fa-at mr-1 opacity-70 border-r border-emerald-500/30 pr-1"></i>mortanasmedya
                                            </span>
                                        </div>
                                        <a href="mailto:info@mortanasmedya.com" className="flex items-center hover:text-emerald-400 transition-colors">
                                            <i className="fas fa-envelope mr-1.5 text-emerald-500/70"></i> info@mortanasmedya.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ambient decorative elements */}
                        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-indigo-500/50 animate-ping"></div>
                        <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-blue-500/50 animate-ping animation-delay-2000"></div>
                        <div className="absolute top-12 right-24 w-12 h-12 border border-dashed border-indigo-500/15 rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;