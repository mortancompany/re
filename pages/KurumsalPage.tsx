import React, { useState } from 'react';
import { FAQS, WHY_MORTANAS_POINTS, TEAM_MEMBERS, PRESS_MENTIONS, CORPORATE_REFERENCES } from '../constants';
import type { FAQ, ValueProposition, TeamMember, PressMention, Reference } from '../types';

// FAQItem component for the accordion
const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
                aria-expanded={isOpen}
            >
                <span>{faq.question}</span>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pt-3 text-gray-600">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ValueCard: React.FC<{ item: ValueProposition }> = ({ item }) => (
    <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-600 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2">
        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 ring-4 ring-slate-800">
            <i className={`${item.icon} text-3xl text-blue-400`}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-slate-300">{item.description}</p>
    </div>
);


const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-400">
        <img src={member.imageUrl} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg mb-4 ring-4 ring-indigo-500/30" />
        <h3 className="text-lg font-bold text-white">{member.name}</h3>
        <p className="text-indigo-400 font-semibold text-sm">{member.title}</p>
    </div>
);

const PressItem: React.FC<{ item: PressMention }> = ({ item }) => (
    <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 flex flex-col h-full transition-all duration-300 hover:border-blue-500 hover:-translate-y-2"
    >
        <div className="flex-shrink-0 mb-6">
            <img 
                src={item.publicationLogoUrl} 
                alt={item.title}
                className="h-8 object-contain filter invert(1) grayscale(1) opacity-70 group-hover:opacity-100 transition-opacity" 
            />
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                {item.title}
            </h4>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
            <span className="font-semibold text-slate-400">{item.date}</span>
            <span className="text-blue-400 font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Devamını Oku <i className="fas fa-arrow-right ml-2"></i>
            </span>
        </div>
    </a>
);


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
                                className="h-16 md:h-20 max-w-xs object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


const KurumsalPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white pt-32 pb-24 text-center overflow-hidden">
                <div className="absolute inset-0 background-grid opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 w-[50rem] h-[50rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.15),rgba(255,255,255,0))]"></div>
                <div className="container mx-auto px-8 relative z-10">
                    <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-4 py-2 rounded-full uppercase animate-fade-in-up">KURUMSAL</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-6 leading-tight max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        İşletmenizin Dijital Dönüşüm <br className="hidden md:inline" /> <span className="text-blue-400">Ortağıyız</span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        Mortanas olarak, yapay zeka ve otomasyon teknolojileriyle işletmelerin potansiyelini en üst düzeye çıkarmalarına yardımcı oluyoruz. Sizi ve hedeflerinizi tanımak için buradayız.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-8 py-24 space-y-24">
                {/* Why Mortanas Section */}
                <section id="neden-mortanas" className="bg-slate-800 text-white rounded-2xl shadow-2xl p-8 md:p-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Bizi Seçmelisiniz?</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           İşletmenize sadece teknoloji değil, aynı zamanda stratejik bir ortaklık ve ölçülebilir değerler sunuyoruz.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {WHY_MORTANAS_POINTS.map(item => (
                            <ValueCard key={item.title} item={item} />
                        ))}
                    </div>
                </section>
                
                {/* Team Section */}
                <section id="yonetim-ekibi" className="bg-gradient-to-br from-slate-900 to-indigo-900 py-24 rounded-2xl relative overflow-hidden">
                     <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                     <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Yönetim Ekibimiz</h2>
                            <p className="mt-4 text-lg text-indigo-200 max-w-3xl mx-auto">
                               Vizyonumuzu hayata geçiren deneyimli liderlerimizle tanışın.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
                            {TEAM_MEMBERS.map(member => (
                                <TeamMemberCard key={member.name} member={member} />
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Press & Media Section */}
                <section id="basinda-biz" className="bg-slate-900 py-24 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Basında Biz</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Sektördeki etkimiz ve yeniliklerimiz hakkında yazılanlar.
                            </p>
                        </div>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                           {PRESS_MENTIONS.map(item => <PressItem key={item.title} item={item} />)}
                        </div>
                    </div>
                </section>

                {/* Corporate References Section */}
                <section id="kurumsal-referanslar">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kurumsal Referanslarımız</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Kamu ve teknoloji sektörünün önde gelen kurumları, dijital dönüşüm süreçlerinde bize güveniyor.
                        </p>
                    </div>
                    <div className="bg-white py-12 rounded-2xl shadow-lg">
                       <LogoCarousel logos={CORPORATE_REFERENCES} />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="iletisim">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Bize <span className="text-blue-600">Ulaşın</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Sorularınız, işbirliği teklifleriniz veya sadece bir merhaba demek için buradayız. Ekibimiz size yardımcı olmaktan mutluluk duyar.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Side: Info & Map */}
                        <div className="space-y-8">
                           <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">İletişim Bilgileri</h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-map-marker-alt text-blue-600 w-6 text-center mt-1"></i>
                                        <span className="ml-3"><strong>UK:</strong> 71-75 Shelton Street, Covent Garden, Londra, WC2H 9JQ</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-map-marker-alt text-blue-600 w-6 text-center mt-1"></i>
                                        <span className="ml-3"><strong>TR:</strong> Söğütözü Koç Kuleleri No:2, 06510 Çankaya/Ankara</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fab fa-whatsapp text-blue-600 w-6 text-center mt-1"></i>
                                        <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="ml-3 hover:text-blue-600 transition-colors">+90 554 011 8888 (WhatsApp)</a>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-mobile-alt text-blue-600 w-6 text-center mt-1"></i>
                                        <a href="tel:+905540139999" className="ml-3 hover:text-blue-600 transition-colors">+90 554 013 9999 (GSM)</a>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-envelope text-blue-600 w-6 text-center mt-1"></i>
                                        <a href="mailto:info@mortanas.com" className="ml-3 hover:text-blue-600 transition-colors">info@mortanas.com</a>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-clock text-blue-600 w-6 text-center mt-1"></i>
                                        <span className="ml-3">Hafta içi: 09:00 - 18:00</span>
                                    </li>
                                </ul>
                           </div>
                           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.879133649526!2d29.32048531541334!3d40.98416697930331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9d201c1f247%3A0x27233582e071a255!2sTeknopark%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1678886543210!5m2!1str!2str"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Mortanas Konum"
                                ></iframe>
                           </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">İletişim Formu</h3>
                            <p className="text-gray-600 mb-6 text-center">Sorularınızı, taleplerinizi veya geri bildirimlerinizi bize ulaştırmak için lütfen iletişim formumuzu doldurun.</p>
                            <a 
                                href="https://forms.gle/1dqY1SPQZuK3vevU7" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                            >
                                <i className="fas fa-external-link-alt"></i>
                                <span>İletişim Formunu Aç</span>
                            </a>
                            <p className="text-xs text-gray-500 mt-4 text-center">Güvenli bir Google Formu'na yönlendirileceksiniz.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="sss">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sıkça Sorulan Sorular</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                        {FAQS.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                isOpen={openFaqIndex === index}
                                onClick={() => handleFaqClick(index)}
                            />
                        ))}
                    </div>
                </section>
                
                {/* Career CTA Section */}
                <section className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                     <h2 className="text-3xl font-bold mb-4">Bize Katılın!</h2>
                     <p className="max-w-2xl mx-auto mb-8">
                        Yapay zekanın geleceğini şekillendiren dinamik ve yenilikçi bir ekibin parçası olmak ister misiniz? 
                        Sektörün en parlak zekalarıyla birlikte çalışma fırsatını kaçırmayın.
                     </p>
                     <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block">
                        Açık Pozisyonları İncele
                    </button>
                </section>
            </div>
        </div>
    );
};

export default KurumsalPage;