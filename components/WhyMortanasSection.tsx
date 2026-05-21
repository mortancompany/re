import React from 'react';

interface Point {
    icon: string;
    title: string;
    description: string;
}

interface WhyMortanasSectionProps {
    title: string;
    subtitle: string;
    points: Point[];
    themeColor?: 'blue' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange';
}

const WhyMortanasSection: React.FC<WhyMortanasSectionProps> = ({ title, subtitle, points, themeColor = 'blue' }) => {
    const themeClasses = {
        blue: { text: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' },
        green: { text: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500/10' },
        pink: { text: 'text-pink-400', border: 'border-pink-500', bg: 'bg-pink-500/10' },
        purple: { text: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/10' },
        cyan: { text: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10' },
        orange: { text: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-500/10' },
    };

    const currentTheme = themeClasses[themeColor];

    return (
        <section className="container mx-auto px-8">
            <div className={`bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border ${currentTheme.border}/30`}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {title.split(' ').slice(0, -1).join(' ')} <span className={currentTheme.text}>{title.split(' ').slice(-1)[0]}</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {points.map((point, index) => (
                        <div key={index} className="flex items-start bg-white/5 p-6 rounded-xl border border-white/10">
                            <div className={`flex-shrink-0 h-14 w-14 ${currentTheme.bg} rounded-lg flex items-center justify-center mr-6`}>
                                <i className={`${point.icon} text-2xl ${currentTheme.text}`}></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                                <p className="text-slate-400">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyMortanasSection;
