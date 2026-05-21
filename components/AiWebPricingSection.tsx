import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface AiWebPricingSectionProps {
  planName: string;
  themeColor: 'blue' | 'green';
}

const PricingCard: React.FC<{
  plan: {
    title: string;
    cycle: 'monthly' | 'annually' | 'lifetime';
    price: number;
    originalPrice?: number;
    description: string;
    popular?: boolean;
    savings?: string;
  };
  planName: string;
  theme: any;
}> = ({ plan, planName, theme }) => {
    const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    
    let priceForPayment = 0;
    if (plan.cycle === 'monthly') priceForPayment = plan.price;
    if (plan.cycle === 'annually') priceForPayment = plan.price * 12;
    if (plan.cycle === 'lifetime') priceForPayment = plan.price;

    const paymentSearchParams = new URLSearchParams({
        plan: planName,
        price: priceForPayment.toString(),
        type: 'application',
        cycle: plan.cycle,
        currency: 'USD',
    }).toString();

    const cardClasses = plan.popular
        ? `bg-slate-800 text-white rounded-2xl shadow-2xl transform lg:scale-105 ring-4 ${theme.ring} z-10`
        : 'bg-slate-800/50 backdrop-blur-sm text-slate-200 rounded-2xl shadow-lg border border-slate-700';
    
    const buttonClasses = plan.popular
        ? `bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold hover:from-blue-600 hover:to-cyan-500`
        : `${theme.bg} ${theme.hoverBg} text-white font-semibold`;

    return (
        <div className={`flex flex-col p-8 h-full relative ${cardClasses}`}>
            {plan.popular && (
                <div className={`absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg`}>
                    <i className="fas fa-star text-yellow-300 mr-2"></i>EN AVANTAJLI
                </div>
            )}
            <h3 className="text-2xl font-bold">{plan.title}</h3>
            <p className={`mt-1 text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-400'}`}>{plan.description}</p>
            
            <div className="mt-6">
                {plan.originalPrice && (
                    <del className={`text-xl font-semibold ${plan.popular ? 'text-red-400' : 'text-red-400'}`}>
                        {usdFormatter.format(plan.originalPrice)}
                    </del>
                )}
                <p className="text-5xl font-extrabold text-white">
                    {usdFormatter.format(plan.price)}
                    {plan.cycle !== 'lifetime' && <span className={`text-lg font-medium ${plan.popular ? 'text-slate-300' : 'text-slate-400'}`}> /aylık</span>}
                </p>
                 {plan.savings && <p className={`text-sm mt-1 font-semibold ${theme.text}`}>{plan.savings}</p>}
            </div>

            <Link to={`/odeme?${paymentSearchParams}`} className={`mt-6 w-full text-center py-3 rounded-lg transition-all transform hover:scale-105 text-lg ${buttonClasses}`}>
                { plan.cycle === 'lifetime' ? 'Ömür Boyu Satın Al' : 'Aboneliği Başlat' }
            </Link>
            
            <div className={`mt-6 pt-6 border-t ${plan.popular ? 'border-slate-700' : 'border-slate-700'} text-left text-sm`}>
                <p className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mr-3 mt-1 flex-shrink-0"></i>
                    <span>Tüm Yapay Zeka Web özelliklerine tam erişim.</span>
                </p>
                {plan.cycle === 'lifetime' ? (
                     <p className="flex items-start mt-2">
                        <i className="fas fa-check-circle text-green-400 mr-3 mt-1 flex-shrink-0"></i>
                        <span><strong className={theme.text}>Ömür boyu</strong> alan adı & hosting <strong className={theme.text}>ücretsiz</strong>.</span>
                    </p>
                ) : (
                    <p className="flex items-start mt-2">
                        <i className="fas fa-check-circle text-green-400 mr-3 mt-1 flex-shrink-0"></i>
                        <span>Alan adı, hosting ve bakım abonelik süresince dahildir.</span>
                    </p>
                )}
            </div>
        </div>
    );
};


const AiWebPricingSection: React.FC<AiWebPricingSectionProps> = ({ planName, themeColor }) => {
    const [offerEndDate] = useState(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent(`Merhaba, "${planName}" için ücretsiz bir demo talep etmek istiyorum. Bana yardımcı olabilir misiniz?`)}`;

    const themeClasses = {
        blue: {
            gradient: 'from-slate-900 to-slate-800',
            bg: 'bg-blue-600',
            hoverBg: 'hover:bg-blue-700',
            text: 'text-blue-400',
            ring: 'ring-blue-500',
            accentBg: 'bg-blue-500/10',
            accentText: 'text-blue-300',
        },
        green: {
            gradient: 'from-slate-900 to-slate-800',
            bg: 'bg-green-600',
            hoverBg: 'hover:bg-green-700',
            text: 'text-green-400',
            ring: 'ring-green-500',
            accentBg: 'bg-green-500/10',
            accentText: 'text-green-300',
        }
    };
    const currentTheme = themeClasses[themeColor];
    
    const plans = [
        {
            title: "Aylık Esnek Plan",
            cycle: 'monthly' as const,
            price: 100,
            description: "Taahhütsüz, esnek başlangıç.",
        },
        {
            title: "Yıllık Avantajlı Plan",
            cycle: 'annually' as const,
            price: 70,
            originalPrice: 100,
            description: "Uzun vadeli büyüme için en iyi değer.",
            popular: true,
            savings: "Yıllık ödemede %30 tasarruf edin!",
        },
        {
            title: "Ömür Boyu Lisans",
            cycle: 'lifetime' as const,
            price: 1500,
            description: "Tek seferlik ödeme ile sonsuza dek sizin.",
        }
    ];

    const includedFeatures = [
        { icon: "fas fa-robot", title: "Yapay Zeka Asistanı" },
        { icon: "fas fa-mobile-alt", title: "Mobil Uyumlu Tasarım" },
        { icon: "fas fa-search-dollar", title: "SEO Altyapısı" },
        { icon: "fas fa-sitemap", title: "CRM Entegrasyonu" },
        { icon: "fas fa-headset", title: "7/24 Teknik Destek" },
        { icon: "fas fa-shield-alt", title: "Güvenli Altyapı (SSL)" },
    ];
    
    const comparisonFeatures = [
        { feature: "Ödeme Periyodu", monthly: "Aylık", annually: "Yıllık", lifetime: "Tek Seferlik" },
        { feature: "Toplam Tasarruf", monthly: "Standart Fiyat", annually: <span className="font-bold text-green-400">%30 İndirim</span>, lifetime: <span className="font-bold text-green-400">En Yüksek Değer</span> },
        { feature: "Hosting & Alan Adı", monthly: "Dahil", annually: "Dahil", lifetime: <span className="font-bold">Ömür Boyu Ücretsiz</span> },
        { feature: "Güncellemeler", monthly: "Dahil", annually: "Dahil", lifetime: "Ömür Boyu Dahil" },
        { feature: "Öncelikli Destek", monthly: <i className="fas fa-times text-red-500"></i>, annually: <i className="fas fa-check text-green-400"></i>, lifetime: <i className="fas fa-check text-green-400"></i> },
    ];

    return (
        <section className={`bg-gradient-to-b ${currentTheme.gradient} rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-700`}>
            <div className={`absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 ${currentTheme.accentBg} rounded-full opacity-30`}></div>
            <div className={`absolute bottom-0 left-0 -mb-16 -ml-16 w-40 h-40 ${currentTheme.accentBg} rounded-full opacity-30`}></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-2">İşletmeniz İçin En Uygun Plan</h2>
                 <p className={`text-center ${currentTheme.text} font-semibold text-lg mb-4 animate-pulse`}>
                    <i className="fas fa-fire mr-2"></i>Sınırlı Süreli Lansman Fiyatları<i className="fas fa-fire ml-2"></i>
                </p>
                <p className="text-center text-slate-300 max-w-2xl mx-auto mb-8">
                    Esnek ödeme seçeneklerimizle dijital dönüşümünüzü bugün başlatın.
                </p>

                {/* Countdown Timer */}
                <div className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-12 shadow-lg border border-slate-700">
                    <p className="text-center font-semibold text-slate-200 mb-2">Bu Teklifin Sona Ermesine Kalan Süre:</p>
                    <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center">
                        {isOfferActive ? (
                            <>
                                <div className="bg-slate-900 rounded-lg p-3 w-20 shadow-inner"><span className={`text-3xl font-bold ${currentTheme.text}`}>{String(timeLeft.days).padStart(2, '0')}</span><span className="block text-xs text-slate-400">Gün</span></div>
                                <div className="bg-slate-900 rounded-lg p-3 w-20 shadow-inner"><span className={`text-3xl font-bold ${currentTheme.text}`}>{String(timeLeft.hours).padStart(2, '0')}</span><span className="block text-xs text-slate-400">Saat</span></div>
                                <div className="bg-slate-900 rounded-lg p-3 w-20 shadow-inner"><span className={`text-3xl font-bold ${currentTheme.text}`}>{String(timeLeft.minutes).padStart(2, '0')}</span><span className="block text-xs text-slate-400">Dakika</span></div>
                                <div className="bg-slate-900 rounded-lg p-3 w-20 shadow-inner"><span className={`text-3xl font-bold ${currentTheme.text}`}>{String(timeLeft.seconds).padStart(2, '0')}</span><span className="block text-xs text-slate-400">Saniye</span></div>
                            </>
                        ) : (
                            <p className="text-xl font-bold text-red-400">Teklif Sona Erdi!</p>
                        )}
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
                    {plans.map(plan => (
                        <PricingCard key={plan.cycle} plan={plan} planName={planName} theme={currentTheme} />
                    ))}
                </div>
                
                {/* All Plans Include Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-white mb-8">Tüm Planlara Dahil Olan Standart Özellikler</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center max-w-5xl mx-auto">
                        {includedFeatures.map(feature => (
                            <div key={feature.title} className="flex flex-col items-center">
                                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-3 ${currentTheme.accentBg}`}>
                                    <i className={`${feature.icon} text-2xl ${currentTheme.text}`}></i>
                                </div>
                                <p className="font-semibold text-slate-300 text-sm">{feature.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Table Section */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-center text-white mb-8">Plan Karşılaştırması</h3>
                    <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                        <div className="hidden md:grid grid-cols-4 items-center font-bold text-slate-200 bg-slate-700/50 p-4 border-b border-slate-600">
                            <div className="col-span-1">Özellik</div>
                            <div className="col-span-1 text-center">Aylık Plan</div>
                            <div className={`col-span-1 text-center ${currentTheme.text}`}>Yıllık Plan</div>
                            <div className="col-span-1 text-center">Tek Seferlik</div>
                        </div>
                        {comparisonFeatures.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 md:grid-cols-4 items-center p-4 border-b border-slate-700 last:border-b-0">
                                <div className="col-span-2 md:col-span-1 font-semibold text-slate-200">{item.feature}</div>
                                <div className="col-span-1 text-right md:text-center text-slate-300"><span className="md:hidden font-bold mr-2">Aylık:</span>{item.monthly}</div>
                                <div className={`col-span-1 text-right md:text-center text-slate-300`}><span className="md:hidden font-bold mr-2">Yıllık:</span>{item.annually}</div>
                                <div className="col-span-2 mt-2 pt-2 border-t border-slate-700 md:border-t-0 md:mt-0 md:pt-0 md:col-span-1 text-right md:text-center text-slate-300"><span className="md:hidden font-bold mr-2">Tek Seferlik:</span>{item.lifetime}</div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Final Demo CTA */}
                <div className="text-center mt-20 pt-10 border-t border-slate-700">
                     <h4 className="text-xl font-semibold text-slate-100">Satın Almadan Önce İncelemek İster misiniz?</h4>
                     <p className="text-slate-400 mt-2 max-w-md mx-auto">
                        Uzman ekibimizle canlı bir demo seansı planlayın ve yapay zeka web sitesinin potansiyelini ilk elden görün.
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
                    >
                        <i className="fab fa-whatsapp text-2xl"></i>
                        <span>WhatsApp'tan Demo Talep Et</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default AiWebPricingSection;