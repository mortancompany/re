import React, { useState, useEffect } from 'react';

interface CampaignSectionProps {
    title: string;
    description: string;
    offerDetails: string;
    originalPrice: number;
    discountedPrice: number;
    themeColor?: 'blue' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange';
    pricingSectionId: string;
}

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

const CampaignSection: React.FC<CampaignSectionProps> = ({
    title,
    description,
    offerDetails,
    originalPrice,
    discountedPrice,
    themeColor = 'blue',
    pricingSectionId,
}) => {
    const [offerEndDate] = useState(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000)); // ~2.5 days
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

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

    const themeClasses = {
        blue: { text: 'text-blue-400', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600' },
        green: { text: 'text-green-400', bg: 'bg-green-500', hoverBg: 'hover:bg-green-600' },
        pink: { text: 'text-pink-400', bg: 'bg-pink-500', hoverBg: 'hover:bg-pink-600' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-600' },
        cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500', hoverBg: 'hover:bg-cyan-600' },
        orange: { text: 'text-orange-400', bg: 'bg-orange-500', hoverBg: 'hover:bg-orange-600' },
    };

    const currentTheme = themeClasses[themeColor];

    return (
        <section id="ozel-teklif" className="container mx-auto px-8">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-700">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-yellow-500/10 rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                    <div className="lg:col-span-3 text-center lg:text-left text-white">
                        <span className="inline-flex items-center text-sm font-bold tracking-wider text-yellow-900 bg-yellow-400 px-4 py-2 rounded-full uppercase shadow">
                            <i className="fas fa-fire-alt mr-2"></i>
                            Sınırlı Süreli Teklif
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
                            {title}
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
                            {description}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 text-center">
                                <p className="text-sm text-slate-400">{offerDetails}</p>
                                <div className="flex items-baseline justify-center gap-2">
                                    <del className="text-2xl text-red-400 font-semibold">{usdFormatter.format(originalPrice)}</del>
                                    <span className="text-4xl font-extrabold text-yellow-400 tracking-wider">{usdFormatter.format(discountedPrice)}</span>
                                </div>
                            </div>
                            <a href={`#${pricingSectionId}`} className={`${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg`}>
                                <span>Fırsatı Yakala</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
                            <p className="text-center font-semibold text-slate-200 mb-6 text-lg">Teklifin Sona Ermesine Kalan Süre:</p>
                            <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center text-white">
                                <div className="bg-slate-900/50 rounded-lg p-4 w-full shadow-inner"><span className="text-5xl font-bold tracking-tight">{timeLeft.days}</span><span className="block text-sm text-slate-300 mt-1">Gün</span></div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-full shadow-inner"><span className="text-5xl font-bold tracking-tight">{timeLeft.hours}</span><span className="block text-sm text-slate-300 mt-1">Saat</span></div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-full shadow-inner"><span className="text-5xl font-bold tracking-tight">{timeLeft.minutes}</span><span className="block text-sm text-slate-300 mt-1">Dakika</span></div>
                                <div className="bg-slate-900/50 rounded-lg p-4 w-full shadow-inner"><span className="text-5xl font-bold tracking-tight">{timeLeft.seconds}</span><span className="block text-sm text-slate-300 mt-1">Saniye</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampaignSection;
