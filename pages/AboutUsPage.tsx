import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TEAM_MEMBERS, MILESTONES, WHY_MORTANAS_POINTS } from '../constants';
import type { TeamMember, Milestone, ValueProposition } from '../types';

const AnimatedCounter: React.FC<{ target: number, suffix?: string }> = ({ target, suffix = '' }) => {
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
                    
                    const timer = setInterval(() => {
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
            {new Intl.NumberFormat('tr-TR').format(count)}{suffix}
        </span>
    );
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.12),_0_15px_50px_rgba(0,0,0,0.7)] border-2 border-blue-500/40 hover:border-blue-400 text-center transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.35)] hover:-translate-y-2 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/25 rounded-full blur-[35px] group-hover:bg-blue-500/35 transition-all duration-700"></div>
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative inline-block mb-4 z-10">
            <img src={member.imageUrl} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg ring-4 ring-slate-800 group-hover:ring-blue-500/50 transition-all duration-500" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <h3 className="text-xl font-bold text-white mt-2 relative z-10 group-hover:text-blue-300 transition-colors duration-300">{member.name}</h3>
        <p className="text-blue-400 font-semibold mb-3 relative z-10">{member.title}</p>
        <p className="text-slate-300 text-sm max-w-xs mx-auto relative z-10 leading-relaxed">{member.bio}</p>
    </div>
);

const ValuePropositionCard: React.FC<{ item: ValueProposition }> = ({ item }) => (
    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col text-left transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
            <i className={`${item.icon} text-xl text-white`}></i>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium flex-grow">{item.description}</p>
    </div>
);


const AboutUsPage: React.FC = () => {
    const bgVideos = [
      "https://media.istockphoto.com/id/1453963806/tr/video/time-lapse-low-angle-of-tall-corporate-buildings-skyscraper-with-reflection-of-clouds-among.mp4?s=mp4-640x640-is&k=20&c=diSLIcwBLIdreFhRk2g67VKjEcB_vqegb5JZGor5Bh4=",
      "https://media.istockphoto.com/id/2200575943/tr/video/group-of-people-working-in-business-office-with-computers-on-desks-and-talking-on-phones.mp4?s=mp4-640x640-is&k=20&c=S-ST98p4PU4Kyd2g9msZOl2YJDHrmky7c7iFbfoegCY=",
      "https://media.istockphoto.com/id/2211012335/tr/video/empty-office-building-after-work-hours.mp4?s=mp4-640x640-is&k=20&c=RkeFX6QVfHkcP51rDuSTKXVovm6nKIlSbFphk34nhkw=",
      "https://media.istockphoto.com/id/2212776370/tr/video/business-team-meeting-in-modern-office-conference-room.mp4?s=mp4-640x640-is&k=20&c=k_djrf7lB_h7u4xru8JZC9luh-S4lkOxrIKkb9MMhP0=",
      "https://media.istockphoto.com/id/2211722163/tr/video/modern-architecture-buildings-exterior-background-in-london.mp4?s=mp4-640x640-is&k=20&c=9Brg6726N5HZciaFNw9gTVW3fsUBr8mC7aLZh0LXFkg=",
      "https://media.istockphoto.com/id/472807049/tr/video/businessmen-in-the-city.mp4?s=mp4-640x640-is&k=20&c=ile5zB7dqTnXQcsDn30WFJWybbIcQoqJRPd68Z4aVC8=",
      "https://media.istockphoto.com/id/1798544289/tr/video/team-of-businessmen-silhouettes-leading-a-large-corporation.mp4?s=mp4-640x640-is&k=20&c=M_Z2am271zdBVE0U07iYAHKqm2BeQEaXVga5wRaH1qE="
    ];
    const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIdx((prev) => (prev + 1) % bgVideos.length);
        }, 5000); // switch every 5 seconds
        return () => clearInterval(interval);
    }, [bgVideos.length]);

    const values = [
        { icon: 'fa-solid fa-lightbulb', title: 'İnovasyon', description: 'Sürekli olarak en son teknolojileri takip eder ve çözümlerimize entegre ederiz.' },
        { icon: 'fa-solid fa-users', title: 'Müşteri Odaklılık', description: 'Müşterilerimizin başarısını kendi başarımız olarak görür, ihtiyaçlarına en uygun çözümleri sunarız.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Güvenilirlik', description: 'Veri güvenliği ve şeffaflık ilkeleriyle hareket eder, uzun vadeli iş ortaklıkları kurarız.' },
        { icon: 'fa-solid fa-handshake-angle', title: 'İşbirliği', description: 'Hem kendi içimizde hem de müşterilerimizle güçlü bir takım ruhuyla çalışırız.' }
    ];

    const TimelineItem: React.FC<{ milestone: Milestone; isLeft: boolean }> = ({ milestone, isLeft }) => {
      const cardPositionClass = isLeft ? 'md:mr-12' : 'md:ml-12';
      return (
        <div className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
          <div className="order-1 w-5/12 hidden md:block"></div> {/* Spacer */}
          
          {/* The timeline dot */}
          <div className="z-20 flex items-center order-1 bg-slate-900 w-8 h-8 rounded-full ring-8 ring-slate-900 relative">
             <div className="h-full w-full rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
          </div>
    
          {/* The Card */}
          <div className="order-1 w-full md:w-5/12 px-1 py-4">
            <div className={`bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/10 hover:border-blue-400 ${cardPositionClass}`}>
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                        <i className={`${milestone.icon} text-xl text-blue-300`}></i>
                    </div>
                    <div>
                         <h3 className="font-bold text-blue-400 text-2xl">{milestone.year}</h3>
                         <h4 className="font-semibold text-white">{milestone.title}</h4>
                    </div>
                </div>
                <p className="text-sm leading-snug tracking-wide text-slate-300">
                    {milestone.description}
                </p>
            </div>
          </div>
        </div>
      );
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden">
                {bgVideos.map((video, idx) => (
                    <video 
                        key={idx}
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentVideoIdx ? 'opacity-30' : 'opacity-0'}`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]"></div>
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.15),rgba(255,255,255,0))]"></div>
                
                <div className="container mx-auto px-8 text-center relative z-10">
                    <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-4 py-2 rounded-full uppercase">
                        Hakkımızda
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-6 leading-tight max-w-4xl mx-auto animate-fade-in-up">
                        Teknolojiyle Geleceği <span className="text-blue-400">Şekillendiriyoruz</span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Mortanas olarak, 2020'den beri Türkiye'nin yapay zeka otomasyonu alanındaki öncüsü olarak, işletmelerin dijital dönüşüm yolculuklarına liderlik ediyoruz. Misyonumuz, en karmaşık sorunlara bile akıllı, verimli ve ölçeklenebilir çözümler sunarak işletmelerin potansiyelini en üst düzeye çıkarmaktır.
                    </p>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <p className="text-4xl font-extrabold text-blue-400"><AnimatedCounter target={500} suffix="+" /></p>
                            <p className="mt-2 text-sm font-semibold text-slate-300">Mutlu İş Ortağı</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <p className="text-4xl font-extrabold text-blue-400"><AnimatedCounter target={40} suffix="%" /></p>
                            <p className="mt-2 text-sm font-semibold text-slate-300">Ortalama Verimlilik Artışı</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <p className="text-4xl font-extrabold text-blue-400"><AnimatedCounter target={20} suffix="+" /></p>
                            <p className="mt-2 text-sm font-semibold text-slate-300">Sektör Çözümü</p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                        <a href="#hikayemiz-ve-kilometre-taslari" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                            Hikayemizi Keşfedin
                        </a>
                         <Link to="/kurumsal#iletisim" className="bg-transparent border-2 border-slate-600 text-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-colors">
                            Bizimle İletişime Geçin
                        </Link>
                    </div>
                </div>
            </section>

            <div className="py-6 space-y-6">
                {/* Neden Mortanas Section */}
                <section id="neden-mortanas" className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-8 rounded-2xl">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Mortanas?</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Bizi farklı kılan ve iş ortaklarımızın bizi tercih etmesini sağlayan temel değerlerimiz.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                            {WHY_MORTANAS_POINTS.map(item => (
                                <ValuePropositionCard key={item.title} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Our Story & Milestones Section */}
                <section id="hikayemiz-ve-kilometre-taslari" className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-900 py-10 rounded-2xl">
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none rounded-2xl"></div>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="container mx-auto px-8 relative z-10">
                        <div className="text-center mb-8 md:mb-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                5 Yıllık <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">Başarı Hikayemiz</span>
                            </h2>
                            <p className="mt-4 text-base text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                                Mortanas, 5 yıl önce büyük bir vizyonla kuruldu: Yapay zekanın gücünü her ölçekteki işletme için erişilebilir kılmak. İşte yolculuğumuzun önemli anları.
                            </p>
                        </div>
                         <div className="relative wrap overflow-hidden px-4 md:px-10 py-1 h-full">
                            {/* The central timeline */}
                            <div className="absolute h-full w-1 bg-slate-700 left-1/2 -translate-x-1/2">
                                {/* The glowing part of the line */}
                                <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-blue-500 to-transparent shadow-[0_0_10px_#8b5cf6]"></div>
                            </div>
                            {MILESTONES.map((milestone, index) => (
                               <TimelineItem key={index} milestone={milestone} isLeft={index % 2 !== 0} />
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Values & Mission & Vision Section */}
                <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-8 rounded-2xl">
                    <div className="container mx-auto px-8 space-y-12">
                        {/* Values Section */}
                        <section id="degerlerimiz">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Bizi Biz Yapan Değerler</h2>
                                <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                    Tüm çalışmalarımızın temelinde bu ilkeler yer alır.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {values.map(value => (
                                    <div key={value.title} className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col text-center items-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                                            <i className={`${value.icon} text-xl text-white`}></i>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{value.title}</h3>
                                        <p className="text-slate-300 text-xs leading-relaxed font-medium flex-grow">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Mission & Vision Section */}
                        <section id="misyon-vizyon">
                            <div className="grid md:grid-cols-2 gap-4 text-center text-white">
                                <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl px-4 py-8 md:px-6 md:py-10 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col items-center flex-1 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <i className="fas fa-rocket text-xl text-white"></i>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Misyonumuz</h3>
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                                        İşletmelerin en kritik operasyonlarını yapay zeka destekli otonom sistemlerle entegre ederek, zaman kaybını sıfırlamak, maliyetleri minimize etmek ve pazar rekabetinde kusursuz dijital performans sergilemelerini sağlamak. İş ortaklarımızın sadece süreçlerini değil, büyüme stratejilerini de teknolojiyle yeniden tasarlıyoruz.
                                    </p>
                                </div>
                                
                                <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl px-4 py-8 md:px-6 md:py-10 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-blue-500/40 hover:border-blue-400 flex flex-col items-center flex-1 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:-translate-y-2 relative overflow-hidden ring-4 ring-blue-500/5 hover:ring-blue-500/15">
                                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 border border-blue-400/20 shadow-lg shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <i className="fas fa-eye text-xl text-white"></i>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Vizyonumuz</h3>
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                                        Yapay zeka devrimini yalnızca takip eden değil, Türkiye'den başlayarak tüm dünyaya ihraç eden global bir akıllı otomasyon mühendislik ekosistemi yaratmak. Şirketlerin hiçbir manuel operasyona ihtiyaç duymadan, %100 otonom dijital beyinlerle yönetildiği bir geleceği inşa etmek istiyoruz.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                {/* Team Section */}
                <section id="ekibimiz" className="bg-gradient-to-br from-slate-900 to-indigo-900 py-16 rounded-2xl relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
                    <div className="absolute top-[80%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none"></div>
                    <div className="container mx-auto px-8 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Ekibimizle <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">Tanışın</span></h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                                Başarımızın arkasındaki tutkulu ve uzman ekibimiz.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {TEAM_MEMBERS.map(member => (
                                <TeamMemberCard key={member.name} member={member} />
                            ))}
                        </div>
                    </div>
                </section>

                 {/* CTA Section */}
                <section className="container mx-auto px-8">
                    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-12 text-center shadow-[0_0_40px_rgba(59,130,246,0.15)] border-2 border-blue-500/40 relative overflow-hidden ring-4 ring-blue-500/5">
                        <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>
                        
                        <div className="relative z-10">
                             <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Dönüşüme Hazır <span className="text-blue-400">mısınız?</span></h2>
                             <p className="max-w-2xl mx-auto mb-10 text-slate-300 text-lg leading-relaxed">
                                İşletmenizi yapay zeka ile bir sonraki seviyeye nasıl taşıyabileceğimizi öğrenmek için bizimle iletişime geçin. Uzman ekibimiz, size özel çözümler sunmak için hazır.
                             </p>
                             <Link to="/kurumsal#iletisim" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] inline-block text-lg border border-blue-400/30">
                                Bize Ulaşın <i className="fas fa-arrow-right ml-2 opacity-80"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;