import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';
import { getPricingData } from '../utils/pricingStorage';
import { 
    getBusinessBenefits, 
    getCustomerJourney, 
    getTargetAudience, 
    getSuccessStory, 
    getSolutionFAQs 
} from '../utils/customPageContent';
import TestimonialCard from '../components/TestimonialCard';
import type { PricingTier, SocialMediaPricingPlan, HowItWorksStep, AutomationSolution } from '../types';

type BillingCycle = 'monthly' | 'sixMonths' | 'annually';

// FAQItem component for the accordion
const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 rounded-3xl shadow-[0_0_15px_rgba(99,102,241,0.05)] border-2 border-indigo-500/25 hover:border-indigo-400/50 transition-all duration-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-305 ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-sm text-slate-300 leading-relaxed font-semibold">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

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

const VoicePricingCard: React.FC<{ plan: PricingTier, isCorporate: boolean }> = ({ plan, isCorporate }) => {
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const cardClasses = plan.popular
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/95 text-white rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.25),_0_15px_40px_rgba(0,0,0,0.8)] border-2 border-indigo-400 ring-8 ring-indigo-500/10 z-10 scale-102 transform lg:scale-105 -translate-y-1'
        : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/85 text-white rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.05),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 hover:-translate-y-1';
    
    const buttonClasses = plan.popular
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold'
        : 'bg-indigo-650/20 text-indigo-300 font-semibold border-2 border-indigo-500/30 hover:bg-indigo-600 hover:text-white';

    const paymentSearchParams = new URLSearchParams({
        plan: plan.name,
        price: plan.monthlyPrice.toString(),
        type: 'automation',
        cycle: 'monthly',
        currency: 'USD',
        setupFee: '1000',
    }).toString();

    return (
        <div className={`flex flex-col p-5 md:p-6 h-full relative overflow-hidden ${cardClasses}`}>
            {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                     En Popüler
                </div>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className={`text-sm font-semibold mt-1 ${plan.popular ? 'text-indigo-200' : 'text-indigo-400'}`}>{plan.minutes} dakika görüşme</p>
            
            <div className="mt-4">
                {isCorporate && plan.originalMonthlyPrice && (
                    <del className={`text-lg font-semibold ${plan.popular ? 'text-red-350' : 'text-red-400'}`}>
                        {usdFormatter.format(plan.originalMonthlyPrice)}
                    </del>
                )}
                <p className="text-3xl font-extrabold">
                    {usdFormatter.format(plan.monthlyPrice)}
                    <span className={`text-base font-medium ${plan.popular ? 'text-indigo-200' : 'text-slate-400'}`}>/aylık</span>
                </p>
                {plan.annualPrice && (
                    <p className={`text-xs mt-0.5 ${plan.popular ? 'text-indigo-200' : 'text-slate-450'}`}>
                        {usdFormatter.format(plan.annualPrice)} / yıllık peşin
                    </p>
                )}
            </div>
            
            <p className={`text-center text-xs font-semibold mt-3 pt-3 border-t ${plan.popular ? 'border-amber-500/30' : 'border-dashed border-slate-800'}`}>
                + {usdFormatter.format(1000)} <span className={`font-normal ${plan.popular ? 'text-indigo-200' : 'text-slate-450'}`}>tek seferlik kurulum</span>
            </p>

            <Link to={`/odeme?${paymentSearchParams}`} className={`mt-4 block text-center w-full py-2 rounded-lg transition-all transform hover:scale-105 text-sm ${buttonClasses}`}>
                Paketi Seç
            </Link>
            
            <ul className="mt-4 space-y-2 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-[13px] leading-tight">
                        <i className={`fa-solid fa-check mr-2 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-yellow-400' : 'text-teal-400'}`}></i>
                        <span className={plan.popular ? 'text-indigo-100' : 'text-slate-300'}>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SocialMediaPricingCard: React.FC<{ plan: SocialMediaPricingPlan, cycle: BillingCycle, setupFee: number }> = ({ plan, cycle, setupFee }) => {
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const cardClasses = plan.popular
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/95 text-white rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.25),_0_15px_40px_rgba(0,0,0,0.8)] border-2 border-indigo-400 ring-8 ring-indigo-500/10 z-10 scale-102 transform -translate-y-1'
        : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/85 text-white rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.05),_0_10px_30px_rgba(0,0,0,0.6)] border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 hover:-translate-y-1';

    const buttonClasses = plan.popular
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold'
        : 'bg-indigo-650/20 text-indigo-300 font-semibold border-2 border-indigo-500/30 hover:bg-indigo-650 hover:text-white';
    
    const price = plan.prices[cycle];
    const originalPrice = plan.originalPrices[cycle];
    
    const periodMultipliers = { monthly: 1, sixMonths: 6, annually: 12 };
    const totalPrice = price * periodMultipliers[cycle];
    
    const paymentSearchParams = new URLSearchParams({
        plan: plan.name,
        price: totalPrice.toString(),
        type: 'automation',
        cycle: cycle,
        currency: 'USD',
        setupFee: setupFee.toString(),
    }).toString();

    const cycleTextMap = {
      monthly: "/aylık",
      sixMonths: "/aylık (6 ay)",
      annually: "/aylık (yıllık)"
    }
    const totalTextMap = {
        monthly: "",
        sixMonths: `Toplam ${usdFormatter.format(totalPrice)} faturalandırılır`,
        annually: `Toplam ${usdFormatter.format(totalPrice)} faturalandırılır`
    }

    const renderPaymentButton = () => {
        const buttonContent = "İndirimle Başla";
        const buttonClass = `mt-6 w-full text-center py-2.5 rounded-lg transition-all transform hover:scale-105 font-bold text-sm ${buttonClasses}`;

        if (plan.paymentLink) {
            return (
                <a
                    href={plan.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                >
                    {buttonContent}
                </a>
            );
        }

        return (
            <Link to={`/odeme?${paymentSearchParams}`} className={buttonClass}>
                {buttonContent}
            </Link>
        );
    };

    return (
        <div className={`flex flex-col p-5 md:p-6 h-full relative overflow-hidden ${cardClasses}`}>
            {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    <i className="fas fa-star text-indigo-200 mr-1.5"></i>EN POPÜLER
                </div>
            )}
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            
            <div className="mt-4">
                <del className={`text-sm font-semibold ${plan.popular ? 'text-red-400/80' : 'text-slate-500'}`}>
                    {usdFormatter.format(originalPrice)}
                </del>
                <p className="text-3xl font-extrabold leading-none mt-1 text-white">
                    {usdFormatter.format(price)}
                    <span className={`text-xs font-medium ${plan.popular ? 'text-indigo-200' : 'text-slate-400'} ml-1`}>{cycleTextMap[cycle]}</span>
                </p>
                 {totalTextMap[cycle] && <p className={`text-[10px] mt-1.5 font-semibold ${plan.popular ? 'text-teal-400' : 'text-indigo-400'}`}>{totalTextMap[cycle]}</p>}
            </div>

            {renderPaymentButton()}

             <div className={`mt-4 pt-4 border-t text-center ${plan.popular ? 'border-amber-500/30' : 'border-slate-850'}`}>
                <p className="text-[10px] font-semibold text-slate-400">
                    + {usdFormatter.format(setupFee)} tek seferlik kurulum ücreti
                </p>
            </div>
            
            <ul className="mt-4 space-y-2 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs text-slate-300">
                        <i className={`fa-solid fa-check mr-2 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-teal-405'}`}></i>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ProblemSolutionCard: React.FC<{ problem: string; solution: string; index?: number }> = ({ problem, solution, index = 0 }) => {
    const styles = [
      {
        border: "border-blue-500/30 hover:border-blue-400",
        ring: "ring-blue-500/5 hover:ring-blue-500/15",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
        glow: "bg-blue-500/15 group-hover:bg-blue-500/25",
        line: "via-blue-400",
        title: "group-hover:text-blue-300"
      },
      {
        border: "border-purple-500/30 hover:border-purple-400",
        ring: "ring-purple-500/5 hover:ring-purple-500/15",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
        glow: "bg-purple-500/15 group-hover:bg-purple-500/25",
        line: "via-purple-400",
        title: "group-hover:text-purple-300"
      },
      {
        border: "border-cyan-500/30 hover:border-cyan-400",
        ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
        glow: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
        line: "via-cyan-400",
        title: "group-hover:text-cyan-300"
      }
    ];
    const style = styles[index % styles.length];
    return (
     <div className={`relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden group border-2 ${style.border} ${style.shadow} ${style.ring}`}>
        <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${style.glow}`}></div>
        <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent ${style.line} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        <div className="relative h-full flex flex-col pt-1">
            {/* Problem Section */}
            <div className="p-5 border-b border-white/5 bg-slate-1050/40 relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-red-505 to-rose-600 flex items-center justify-center border border-red-450/20 shadow-lg">
                        <i className="fas fa-exclamation-triangle text-white text-xs"></i>
                    </div>
                    <h4 className="font-extrabold text-[11px] text-red-400 tracking-widest uppercase">Karşılaşılan Sorun</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-semibold">{problem}</p>
            </div>
            {/* Solution Section */}
            <div className="p-5 flex-grow relative z-10 flex flex-col justify-center bg-slate-900/10">
                <div className="flex items-center space-x-3 mb-2">
                     <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-650 flex items-center justify-center border border-emerald-450/20 shadow-lg">
                        <i className="fas fa-lightbulb text-white text-xs"></i>
                    </div>
                    <h4 className={`font-extrabold text-[11px] text-emerald-400 tracking-widest uppercase ${style.title}`}>Mortanas Çözümü</h4>
                </div>
                <p className="text-white text-[13px] font-semibold leading-relaxed">{solution}</p>
            </div>
        </div>
    </div>
    );
};

const WhyChooseUsCard: React.FC<{ icon: string; title: string; description: string; index?: number }> = ({ icon, title, description, index = 0 }) => {
    const styles = [
      {
        border: "border-blue-500/30 hover:border-blue-400",
        ring: "ring-blue-500/5 hover:ring-blue-500/15",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
        glow: "bg-blue-500/15 group-hover:bg-blue-500/25",
        line: "via-blue-400",
        gradient: "from-blue-500 to-indigo-600",
        title: "group-hover:text-blue-300"
      },
      {
        border: "border-purple-500/30 hover:border-purple-400",
        ring: "ring-purple-500/5 hover:ring-purple-500/15",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
        glow: "bg-purple-500/15 group-hover:bg-purple-500/25",
        line: "via-purple-400",
        gradient: "from-purple-500 to-pink-650",
        title: "group-hover:text-purple-300"
      },
      {
        border: "border-cyan-500/30 hover:border-cyan-400",
        ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
        glow: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
        line: "via-cyan-400",
        gradient: "from-cyan-500 to-teal-600",
        title: "group-hover:text-cyan-300"
      },
      {
        border: "border-rose-500/30 hover:border-rose-450",
        ring: "ring-rose-500/5 hover:ring-rose-500/15",
        shadow: "shadow-[0_0_20px_rgba(244,63,94,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]",
        glow: "bg-rose-500/15 group-hover:bg-rose-500/25",
        line: "via-rose-455",
        gradient: "from-rose-500 to-red-650",
        title: "group-hover:text-rose-300"
      }
    ];
    const style = styles[index % styles.length];
    return (
        <div className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-6 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 h-full relative overflow-hidden border-2 ${style.border} ${style.shadow} ${style.ring}`}>
            <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${style.glow}`}></div>
            <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent ${style.line} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-505`}></div>
            
            <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center border border-white/10 shadow-lg text-white`}>
                    <i className={`${icon} text-base`}></i>
                </div>
                <div>
                     <h3 className={`text-base font-bold text-white leading-tight transition-colors duration-300 ${style.title}`}>{title}</h3>
                </div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold relative z-10">{description}</p>
        </div>
    );
};

const HowItWorksCard: React.FC<{ step: HowItWorksStep, index: number }> = ({ step, index }) => {
    const styles = [
      {
        border: "border-blue-500/30 hover:border-blue-400",
        ring: "ring-blue-500/5 hover:ring-blue-500/15",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
        glow: "bg-blue-500/15 group-hover:bg-blue-500/25",
        line: "via-blue-400",
        gradient: "from-blue-500 to-indigo-650",
        title: "group-hover:text-blue-300"
      },
      {
        border: "border-purple-500/30 hover:border-purple-400",
        ring: "ring-purple-500/5 hover:ring-purple-500/15",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
        glow: "bg-purple-500/15 group-hover:bg-purple-500/25",
        line: "via-purple-400",
        gradient: "from-purple-500 to-pink-650",
        title: "group-hover:text-purple-300"
      },
      {
        border: "border-cyan-500/30 hover:border-cyan-400",
        ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
        glow: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
        line: "via-cyan-400",
        gradient: "from-cyan-500 to-teal-600",
        title: "group-hover:text-cyan-300"
      }
    ];
    const style = styles[index % styles.length];
    return (
        <div className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-6 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 h-full relative overflow-hidden border-2 ${style.border} ${style.shadow} ${style.ring}`}>
            <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${style.glow}`}></div>
            <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent ${style.line} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative flex flex-col items-center text-left">
                <div className="flex items-center justify-between w-full mb-4 relative z-10">
                    <div className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center border border-white/10 shadow-lg text-white`}>
                        <i className={`${step.icon} text-base`}></i>
                    </div>
                    <span className="font-mono text-2xl font-black text-white/10 group-hover:text-white/20 transition-all duration-300">0{index + 1}</span>
                </div>
                 <div className="relative z-10 w-full">
                     <h3 className={`text-base font-bold text-white transition-all duration-300 ${style.title}`}>{step.title}</h3>
                     <p className="text-slate-300 text-xs mt-2 leading-relaxed font-semibold">{step.description}</p>
                 </div>
            </div>
        </div>
    );
};

const AutomationDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [solutions, setSolutions] = useState<AutomationSolution[]>([]);
    const [pricingTab, setPricingTab] = useState<'individual' | 'corporate'>('individual');
    
    useEffect(() => {
        setSolutions(getPricingData());
    }, []);

    const solution = solutions.find(s => s.slug === slug);

    const [offerEndDate] = useState(() => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

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

    if (!solution) {
        return (
            <div className="text-center py-32 container mx-auto px-8 bg-[#030712] min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4 text-white">Çözüm Bulunamadı</h1>
                <p className="text-lg text-slate-400 mb-8 max-w-sm">Aradığınız akıllı otomasyon çözümünü bulamadık.</p>
                <Link to="/" className="bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-indigo-700 transition-all font-sans">
                    Anasayfaya Geri Dön
                </Link>
            </div>
        );
    }

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent(`Merhaba, "${solution.title}" otomasyonu hakkında detaylı bilgi almak istiyorum.`)}`;
    
    // Dynamic lookups using helper functions
    const activeBenefits = getBusinessBenefits(solution.slug);
    const activeJourney = getCustomerJourney(solution.slug);
    const activeAudience = getTargetAudience(solution.slug);
    const activeSuccessStory = getSuccessStory(solution.slug);
    const activeFaqs = getSolutionFAQs(solution.slug, solution.title);

    return (
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 text-slate-300 min-h-screen selection:bg-indigo-500/35 selection:text-white relative font-sans overflow-hidden">
            {/* Ambient background glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/5 rounded-full blur-3xl"></div>
                <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    
                    <div className="container mx-auto px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1.5 rounded-full uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                    {solution.name}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-white leading-tight tracking-tight">
                                    {solution.title}
                                </h1>
                                <p className="mt-6 text-lg text-slate-350 leading-relaxed font-light">
                                    {solution.description}
                                </p>
                                {solution.socialProof && (
                                    <div className="mt-8 inline-flex items-center space-x-5 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/95 border-2 border-indigo-400/50 px-6 py-4 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.15),_0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden group transition-all duration-300 hover:border-indigo-300 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] hover:-translate-y-1">
                                        <div className="absolute inset-0 background-grid pointer-events-none z-0 opacity-40"></div>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.2)_0,_transparent_65%)]"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
                                        <div className="flex -space-x-3.5 relative z-10">
                                            <div className="relative">
                                                <img className="w-11 h-11 rounded-full object-cover border-2 border-slate-950 shadow-md transform hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Müşteri" referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="relative">
                                                <img className="w-11 h-11 rounded-full object-cover border-2 border-slate-950 shadow-md transform hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" alt="Yönetici" referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="relative">
                                                <img className="w-11 h-11 rounded-full object-cover border-2 border-slate-950 shadow-md transform hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Yatırımcı" referrerPolicy="no-referrer" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 flex flex-col justify-center">
                                            <p className="font-black text-2xl text-white tracking-tight flex items-center">
                                                +{solution.socialProof.count}
                                                <span className="flex h-2.5 w-2.5 relative ml-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d2ff] opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d2ff]"></span>
                                                </span>
                                            </p>
                                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-0.5">{solution.socialProof.label}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/0 to-pink-500/10 rounded-2xl blur-3xl opacity-60"></div>
                                <img src={solution.imageUrl} alt={solution.title} className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/5 ring-1 ring-white/5" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-8 py-4 space-y-6">
                    
                    {/* Business Benefits Section (Somut Faydalar) - Premium Gradients inside Cards */}
                    <section className="bg-gradient-to-br from-indigo-950/20 via-[#0a0f1d] to-purple-950/20 rounded-3xl shadow-[0_0_20px_rgba(99,102,241,0.05)] py-12 md:py-16 px-6 md:px-10 relative overflow-hidden border-2 border-indigo-500/15">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.06)_0,_rgba(99,102,241,0)_60%)]"></div>
                         <div className="relative z-10">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">İşletmeniz İçin Somut Faydalar</h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">
                                    Mortanas otomasyon gücüyle elde edeceğiniz net ve ölçülebilir sonuçlar.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {activeBenefits.map((benefit, bIdx) => {
                                    const styles = [
                                      {
                                        border: "border-blue-500/20 hover:border-blue-400",
                                        gradient: "from-blue-500 to-indigo-650",
                                        shadow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
                                        text: "group-hover:text-blue-300"
                                      },
                                      {
                                        border: "border-purple-500/20 hover:border-purple-400",
                                        gradient: "from-purple-500 to-pink-650",
                                        shadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
                                        text: "group-hover:text-purple-300"
                                      },
                                      {
                                        border: "border-cyan-500/20 hover:border-cyan-400",
                                        gradient: "from-cyan-500 to-teal-600",
                                        shadow: "hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
                                        text: "group-hover:text-cyan-300"
                                      },
                                      {
                                        border: "border-rose-500/20 hover:border-rose-450",
                                        gradient: "from-rose-500 to-red-650",
                                        shadow: "hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]",
                                        text: "group-hover:text-rose-300"
                                      }
                                    ];
                                    const cardStyle = styles[bIdx % styles.length];
                                    return (
                                        <div key={bIdx} className={`group p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-1.5 ${cardStyle.border} ${cardStyle.shadow}`}>
                                            <div className={`mb-4 inline-flex p-3 rounded-2xl bg-gradient-to-br ${cardStyle.gradient} text-white shadow-lg border border-white/10 transition-transform duration-500 group-hover:scale-105`}>
                                                <i className={`${benefit.icon} text-xl`}></i>
                                            </div>
                                            <h3 className={`text-base font-bold text-white transition-colors duration-300 ${cardStyle.text}`}>{benefit.title}</h3>
                                            <p className="text-slate-300 text-xs mt-2 leading-relaxed font-semibold">{benefit.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                         </div>
                    </section>

                    {/* Customer Journey Section (Müşteri Yolculuğu) - Padding Reduced */}
                    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 border-2 border-indigo-500/20 rounded-3xl px-6 md:px-10 py-10 shadow-[0_0_20px_rgba(99,102,241,0.05)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.01]"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-sans">
                                    Bir Müşteri Yolculuğu: <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">Yapay Zekanın Gücü</span>
                                </h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">
                                    Yapay zeka sistemimizin, kritik bir süreci mesai saatleri dışında dahi nasıl kusursuzca çözüme kavuşturduğunu izleyin.
                                </p>
                            </div>
                            <div className="relative font-sans">
                                <div className="absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 hidden md:block" aria-hidden="true"></div>
                                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {activeJourney.map((step, index) => {
                                        const styles = [
                                          { border: "border-blue-500/20 hover:border-blue-400", text: "text-blue-400" },
                                          { border: "border-purple-500/20 hover:border-purple-400", text: "text-purple-400" },
                                          { border: "border-cyan-500/20 hover:border-cyan-400", text: "text-cyan-400" },
                                          { border: "border-emerald-500/20 hover:border-emerald-450", text: "text-emerald-400" }
                                        ];
                                        const stepStyle = styles[index % styles.length];
                                        return (
                                            <div key={index} className="flex flex-col items-center text-center group">
                                                <div className="relative flex-shrink-0 h-16 w-16 bg-[#030712] rounded-full flex items-center justify-center ring-6 ring-slate-950 border-2 border-indigo-500/60 shadow-xl z-20 transition-transform duration-300 group-hover:scale-110">
                                                    <i className={`${step.icon} text-xl text-indigo-400`}></i>
                                                </div>
                                                <div className={`bg-slate-950/95 p-5 rounded-3xl border-2 shadow-lg -mt-8 pt-10 h-full w-full backdrop-blur-sm transition-all duration-500 ${stepStyle.border} hover:-translate-y-1`}>
                                                    <p className={`font-bold text-[11px] uppercase tracking-widest ${stepStyle.text}`}>{step.time}</p>
                                                    <h4 className="font-bold text-sm text-white mt-1.5">{step.title}</h4>
                                                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-semibold">{step.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Problem & Solution Section */}
                    {solution.problemSolution && (
                        <section className="bg-gradient-to-br from-purple-950/10 via-[#030712] to-indigo-950/10 rounded-3xl shadow-[0_0_20px_rgba(99,102,241,0.05)] py-12 px-6 md:px-10 relative overflow-hidden border-2 border-indigo-500/10">
                            <div className="absolute inset-0 bg-grid-white/[0.01]"></div>
                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Dağınık İletişim, Kaçan Fırsatlar</h2>
                                    <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">
                                        İşletmelerin her gün karşılaştığı kritik operasyonel problemleri, akıllı otomasyon çözümlerimizle nasıl kökünden çözüyoruz?
                                    </p>
                                </div>
                                <div className={
                                    solution.problemSolution.length === 2 
                                        ? "grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto" 
                                        : solution.problemSolution.length === 1
                                            ? "grid grid-cols-1 gap-6 items-stretch max-w-2xl mx-auto"
                                            : "grid md:grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
                                }>
                                    {solution.problemSolution.map((ps, psIdx) => (
                                        <ProblemSolutionCard key={psIdx} problem={ps.problem} solution={ps.solution} index={psIdx} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* How It Works Section */}
                    {solution.howItWorks && (
                        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-955/20 border-2 border-indigo-500/15 rounded-3xl py-12 px-6 md:px-10 shadow-inner">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">3 Adımda Kolay Kurulum</h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">
                                    Platformumuzu ve otomasyon senaryonuzu devreye almak hiç bu kadar zahmetsiz olmamıştı.
                                </p>
                            </div>
                            <div className="relative">
                                 <div className="absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 hidden md:block" aria-hidden="true"></div>
                                 <div className={
                                     solution.howItWorks.length === 2
                                         ? "relative grid md:grid-cols-2 gap-6 font-sans max-w-4xl mx-auto"
                                         : solution.howItWorks.length === 1
                                             ? "relative grid grid-cols-1 gap-6 font-sans max-w-md mx-auto"
                                             : "relative grid md:grid-cols-3 gap-6 font-sans"
                                 }>
                                    {solution.howItWorks.map((step, index) => (
                                        <HowItWorksCard key={index} step={step} index={index} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Why Choose Us Section - 5% Padding Expansion */}
                    {solution.whyChooseUs && (
                        <section className="bg-gradient-to-br from-indigo-950/20 via-[#040814] to-purple-950/20 rounded-3xl py-12 md:py-16 px-6 md:px-10 border-2 border-indigo-500/15 shadow-2xl">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Neden Mortanas {solution.name}?</h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">
                                    Bizi diğer bütün geleneksel alternatiflerden ve standart kurgulardan ayıran kilit avantajlarımız.
                                </p>
                            </div>
                            <div className={
                                solution.whyChooseUs.length === 2
                                    ? "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                                    : solution.whyChooseUs.length === 3
                                        ? "grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
                                        : solution.whyChooseUs.length === 1
                                            ? "grid grid-cols-1 gap-6 max-w-md mx-auto"
                                            : "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                            }>
                                {solution.whyChooseUs.map((item, index) => (
                                    <WhyChooseUsCard key={index} icon={item.icon} title={item.title} description={item.description} index={index} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Who is it for Section */}
                    <section className="bg-gradient-to-br from-indigo-950/20 via-[#040814] to-purple-950/20 rounded-3xl py-12 md:py-16 px-6 md:px-10 border-2 border-indigo-500/15 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.01]"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Kimler İçin İdeal?</h2>
                                <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto font-medium">Bu çözüm, operasyonel süreçlerini otomatiğe alıp kârlılık rekoru kırmak isteyen her modern işletme için mükemmeldir.</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {activeAudience.map((target, idx) => {
                                    const styles = [
                                      {
                                        border: "border-blue-500/20 hover:border-blue-400",
                                        ring: "ring-blue-500/5 hover:ring-blue-500/15",
                                        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
                                        gradient: "from-blue-500 to-indigo-650"
                                      },
                                      {
                                        border: "border-purple-500/20 hover:border-purple-400",
                                        ring: "ring-purple-500/5 hover:ring-purple-500/15",
                                        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
                                        gradient: "from-purple-500 to-pink-650"
                                      },
                                      {
                                        border: "border-cyan-500/20 hover:border-cyan-400",
                                        ring: "ring-cyan-500/5 hover:ring-cyan-500/15",
                                        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
                                        gradient: "from-cyan-500 to-teal-600"
                                      },
                                      {
                                        border: "border-rose-500/20 hover:border-rose-450",
                                        ring: "ring-rose-500/5 hover:ring-rose-500/15",
                                        shadow: "shadow-[0_0_20px_rgba(244,63,94,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]",
                                        gradient: "from-rose-500 to-red-650"
                                      },
                                      {
                                        border: "border-emerald-500/20 hover:border-emerald-450",
                                        ring: "ring-emerald-500/5 hover:ring-emerald-500/15",
                                        shadow: "shadow-[0_0_20px_rgba(16,185,129,0.1),_0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
                                        gradient: "from-emerald-500 to-teal-600"
                                      }
                                    ];
                                    const cardStyle = styles[idx % styles.length];
                                    return (
                                        <div key={idx} className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-5 rounded-3xl text-center flex flex-col items-center justify-center border-2 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden ${cardStyle.border} ${cardStyle.shadow} ${cardStyle.ring}`}>
                                            <div className={`flex-shrink-0 h-11 w-11 rounded-full bg-gradient-to-br ${cardStyle.gradient} flex items-center justify-center mb-3 shadow-lg border border-white/10 text-white`}>
                                                <i className={`${target.icon} text-base`}></i>
                                            </div>
                                            <h4 className="font-bold text-xs text-white leading-normal">{target.name}</h4>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Success Story Section - Restyled with premium gradients */}
                    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-955/90 text-white rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.12),_0_15px_40px_rgba(0,0,0,0.6)] py-12 px-6 md:px-10 border-2 border-indigo-500/30 relative overflow-hidden ring-4 ring-indigo-500/5">
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-[45px] transition-all duration-700 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-40"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-10">
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">BAŞARI HİKAYESİ</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-4">{activeSuccessStory.title}</h2>
                                <p className="mt-2 text-sm text-slate-300 max-w-3xl mx-auto font-medium">{activeSuccessStory.subtitle}</p>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                                {/* Before Card */}
                                <div className="group bg-slate-950/95 p-6 rounded-3xl border-2 border-red-500/20 hover:border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.05)] transition-all duration-400 flex flex-col relative overflow-hidden animate-none">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                                    <h3 className="text-base font-bold text-red-400 mb-5 flex items-center relative z-10"><i className="fas fa-triangle-exclamation mr-2 text-md"></i> Mortanas'tan Önce</h3>
                                    <ul className="space-y-4 flex-grow relative z-10">
                                        {activeSuccessStory.before.map((b, bIdx) => (
                                            <li key={bIdx} className="flex items-start text-xs text-slate-350">
                                                <i className="fas fa-times-circle text-red-500/80 mr-2.5 mt-0.5 flex-shrink-0"></i>
                                                <span><strong className="text-white font-bold">{b.title}:</strong> {b.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* After Card */}
                                <div className="group bg-slate-950/95 p-6 rounded-3xl border-2 border-emerald-500/20 hover:border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-400 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h3 className="text-base font-bold text-emerald-400 mb-5 flex items-center relative z-10"><i className="fas fa-rocket mr-2 text-md"></i> Mortanas'tan Sonra</h3>
                                    <div className="grid grid-cols-2 gap-4 text-center relative z-10">
                                        {activeSuccessStory.stats.map((stat, sIdx) => {
                                            const colors = ["text-indigo-400", "text-emerald-400", "text-purple-400", "text-cyan-400"];
                                            const selectedColor = colors[sIdx % colors.length];
                                            return (
                                                <div key={sIdx} className="bg-[#030712]/80 p-4 rounded-2xl shadow-md border border-white/5 hover:border-white/10 transition-all">
                                                    <p className={`text-2xl md:text-3xl font-black ${selectedColor}`}>
                                                        {stat.prefix || ''}
                                                        <AnimatedCounter target={stat.value} />
                                                        {stat.suffix || ''}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-300 mt-2 leading-snug">{stat.label}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Competitor Comparison Section - Padding Reduced */}
                    <section className="bg-gradient-to-br from-slate-950 via-[#030712] to-slate-950 rounded-2xl shadow-2xl py-8 px-6 md:px-10 border border-slate-900">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Piyasadaki Farkımız: <span className="text-indigo-400">Neden Mortanas?</span></h2>
                            <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">Sıradan, kısıtlı araçlarla yetinmeyin. İşletmenize özel, akıllı ve her tarafa entegre çalışan çözümler sunuyoruz.</p>
                        </div>
                        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {/* Manual */}
                            <div className="bg-slate-900/10 p-6 rounded-2xl border border-slate-900 hover:border-slate-850 transition-all flex flex-col shadow-lg">
                                <h3 className="text-base font-bold text-slate-400 text-center mb-5 uppercase tracking-wide">Manuel Süreçler</h3>
                                <ul className="space-y-4 flex-grow">
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>7/24 Kesintisiz Faaliyet</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-check text-green-500/70 mr-2.5 w-4 text-center"></i><span>İşletmeye Özel Bilgi</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>Hatasız İşlem Akışı</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>Anlık CRM Senkronizasyonu</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>Düşük Operasyon Maliyeti</span></li>
                                </ul>
                            </div>

                            {/* Mortanas AI */}
                            <div className="bg-gradient-to-b from-indigo-950/40 via-[#060b18] to-purple-950/40 p-6 rounded-2xl border-2 border-indigo-500/60 ring-8 ring-indigo-500/5 transform lg:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.12)] transition-all flex flex-col z-10 font-sans">
                                <h3 className="text-base font-extrabold text-indigo-400 text-center mb-5 flex items-center justify-center tracking-wide uppercase"><i className="fas fa-bolt text-yellow-500 mr-2 animate-pulse"></i>Mortanas Yapay Zeka</h3>
                                 <ul className="space-y-4 flex-grow">
                                    <li className="flex items-center text-xs text-white font-semibold"><i className="fas fa-check text-green-450 mr-2.5 w-4 text-center"></i><span>7/24 Kesintisiz Faaliyet</span></li>
                                    <li className="flex items-center text-xs text-white font-semibold"><i className="fas fa-check text-green-450 mr-2.5 w-4 text-center"></i><span>İşletmeye Özel Bilgi</span></li>
                                    <li className="flex items-center text-xs text-white font-semibold"><i className="fas fa-check text-green-450 mr-2.5 w-4 text-center"></i><span>Hatasız İşlem Akışı</span></li>
                                    <li className="flex items-center text-xs text-white font-semibold"><i className="fas fa-check text-green-450 mr-2.5 w-4 text-center"></i><span>Anlık CRM Senkronizasyonu</span></li>
                                    <li className="flex items-center text-xs text-white font-semibold"><i className="fas fa-check text-green-450 mr-2.5 w-4 text-center"></i><span>Düşük Operasyon Maliyeti</span></li>
                                </ul>
                            </div>
                            
                            {/* Standard Tools */}
                            <div className="bg-slate-900/10 p-6 rounded-2xl border border-slate-900 hover:border-slate-850 transition-all flex flex-col shadow-lg">
                                <h3 className="text-base font-bold text-slate-400 text-center mb-5 uppercase tracking-wide">Hazır Standart Araçlar</h3>
                                 <ul className="space-y-4 flex-grow">
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-check text-green-500/70 mr-2.5 w-4 text-center"></i><span>7/24 Kesintisiz Faaliyet</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>İşletmeye Özel Bilgi</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>Hatasız İşlem Akışı</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-times text-red-500/70 mr-2.5 w-4 text-center"></i><span>Anlık CRM Senkronizasyonu</span></li>
                                    <li className="flex items-center text-xs text-slate-400"><i className="fas fa-check text-green-500/70 mr-2.5 w-4 text-center"></i><span>Düşük Operasyon Maliyeti</span></li>
                                 </ul>
                            </div>
                        </div>
                    </section>

                    {/* FOMO Section */}
                    <section className="bg-gradient-to-br from-[#0c1223] to-[#040815] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/5 font-sans">
                        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl opacity-40"></div>
                        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl opacity-40"></div>
                        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="text-center lg:text-left">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-400/20 px-3 py-1.5 rounded-full uppercase">
                                    <i className="fas fa-fire animate-pulse text-amber-500"></i>
                                    Lansmana Özel Dev Kampanya
                                </span>
                                <h2 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
                                    Bu Dijital Fırsatı Kaçırmayın!
                                </h2>
                                <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
                                    Yapay zeka otomasyonu ile 7/24 kesintisiz çalışarak işlerinizi büyütün, iş gücü ve ciro kaybını sıfırlayın. <span className="text-amber-400 font-bold">Kampanyalı fiyatlar sınırlı bir süre için geçerlidir!</span>
                                </p>
                                <a href="#pricing" className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg hover:from-indigo-600 hover:to-cyan-500 transition-all transform hover:scale-105 inline-flex items-center space-x-2 text-base">
                                    <span>Paketleri İncele</span>
                                    <i className="fas fa-arrow-right"></i>
                                </a>
                            </div>
                            <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
                                <p className="text-center font-semibold text-slate-300 mb-5 text-sm uppercase tracking-wider">Teklifin Sona Ermesine Kalan Süre:</p>
                                <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
                                    <div className="bg-[#030712]/70 rounded-xl p-3 border border-slate-800 shadow-md">
                                        <span className="text-2xl md:text-4xl font-extrabold text-white leading-none">{timeLeft.days}</span>
                                        <span className="block text-[10px] text-slate-400 mt-2 font-medium">Gün</span>
                                    </div>
                                    <div className="bg-[#030712]/70 rounded-xl p-3 border border-slate-800 shadow-md">
                                        <span className="text-2xl md:text-4xl font-extrabold text-white leading-none">{timeLeft.hours}</span>
                                        <span className="block text-[10px] text-slate-400 mt-2 font-medium">Saat</span>
                                    </div>
                                    <div className="bg-[#030712]/70 rounded-xl p-3 border border-slate-800 shadow-md">
                                        <span className="text-2xl md:text-4xl font-extrabold text-white leading-none">{timeLeft.minutes}</span>
                                        <span className="block text-[10px] text-slate-400 mt-2 font-medium">Dakika</span>
                                    </div>
                                    <div className="bg-[#030712]/70 rounded-xl p-3 border border-slate-800 shadow-md">
                                        <span className="text-2xl md:text-4xl font-extrabold text-white leading-none">{timeLeft.seconds}</span>
                                        <span className="block text-[10px] text-slate-400 mt-2 font-medium">Saniye</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Integrated dynamic Pricing Section */}
                    {solution.pricingPlans && solution.setupFee ? (
                        <section id="pricing" className="bg-gradient-to-br from-indigo-950/20 via-[#080c16] to-[#040815] rounded-2xl py-10 px-6 md:px-10 border border-indigo-500/10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">İşletmenize Uygun Esnek Paketler</h2>
                                 <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">
                                   Uzun vadeli paketleri seçerek dijital tasarrufunuzu %20'ye varan oranda artırın.
                                </p>
                            </div>
                            
                            {/* Billing Cycle Toggle */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center space-x-1.5">
                                    <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-white'}`}>Aylık</button>
                                    <button onClick={() => setBillingCycle('sixMonths')} className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 flex items-center ${billingCycle === 'sixMonths' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-white'}`}>6 Aylık <span className="ml-1.5 text-[9px] font-bold bg-[#10b981]/25 text-[#34d399] border border-emerald-500/10 px-1.5 py-0.5 rounded-full">%10 İndirim</span></button>
                                    <button onClick={() => setBillingCycle('annually')} className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-305 flex items-center ${billingCycle === 'annually' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-white'}`}>Yıllık <span className="ml-1.5 text-[9px] font-bold bg-[#10b981]/25 text-[#34d399] border border-emerald-500/10 px-1.5 py-0.5 rounded-full">%20 İndirim</span></button>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                                {solution.pricingPlans.map((plan, planIdx) => (
                                    <SocialMediaPricingCard key={planIdx} plan={plan} cycle={billingCycle} setupFee={solution.setupFee!.discounted} />
                                ))}
                            </div>
                        </section>
                    ) : (solution.individualPricing || solution.corporatePricing) && (
                        <section id="pricing" className="bg-gradient-to-br from-indigo-950/20 via-[#080c16] to-[#040815] rounded-2xl py-8 px-5 md:px-8 border border-indigo-500/10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">İşletmenize Uygun Esnek Paketler</h2>
                                <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">
                                    Size en uygun kullanım tipini seçerek hemen başlayın.
                                </p>
                            </div>
                            
                            {/* Individual/Corporate Toggle */}
                            {solution.individualPricing && solution.corporatePricing && (
                                <div className="flex justify-center mb-8">
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center space-x-1.5">
                                        <button onClick={() => setPricingTab('individual')} className={`px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${pricingTab === 'individual' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-white'}`}>
                                            Bireysel Kullanım
                                        </button>
                                        <button onClick={() => setPricingTab('corporate')} className={`px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${pricingTab === 'corporate' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-white'}`}>
                                            Kurumsal Kullanım
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-10">
                                {pricingTab === 'individual' && solution.individualPricing && (
                                    <div className="animate-fade-in">
                                        {!(solution.individualPricing && solution.corporatePricing) && (
                                            <div className="text-center mb-6">
                                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{solution.individualPricing.title}</h2>
                                                <p className="mt-2 text-sm text-slate-400 max-w-3xl mx-auto">
                                                   Bireysel kullanım ve hafif operasyonlar için esnek paketlerimiz.
                                                </p>
                                            </div>
                                        )}
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                                            {solution.individualPricing.plans.map((plan, planIdx) => (
                                                <VoicePricingCard key={planIdx} plan={plan} isCorporate={false} />
                                            ))}
                                        </div>
                                        <div className="mt-4 space-y-1 text-center text-xs text-slate-500">
                                            {solution.individualPricing.notes.map((note, index) => (
                                                <p key={index} className="flex items-center justify-center gap-1"><i className="fas fa-info-circle text-indigo-400"></i>{note}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {pricingTab === 'corporate' && solution.corporatePricing && (
                                    <div className="animate-fade-in">
                                        {!(solution.individualPricing && solution.corporatePricing) && (
                                            <div className="text-center mb-6 px-4">
                                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{solution.corporatePricing.title}</h2>
                                                <p className="mt-2 text-sm text-slate-400 max-w-3xl mx-auto">
                                                   Kurumsal operasyonlar için yüksek kapasiteli, ekonomik ses çözümleri.
                                                </p>
                                            </div>
                                        )}
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                                            {solution.corporatePricing.plans.map((plan, planIdx) => (
                                                <VoicePricingCard key={planIdx} plan={plan} isCorporate={true} />
                                            ))}
                                        </div>
                                        <div className="mt-4 space-y-1 text-center text-xs text-slate-500">
                                            {solution.corporatePricing.notes.map((note, index) => (
                                                <p key={index} className="flex items-center justify-center gap-1"><i className="fas fa-info-circle text-indigo-400"></i>{note}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Testimonials Section */}
                    <section className="bg-gradient-to-br from-[#0c1325] via-slate-900/40 to-slate-950 border border-slate-850 py-10 px-6 md:px-10 rounded-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Kullanıcılarımız Ne Diyor?</h2>
                            <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">
                                Mortanas yapay zeka otomasyon sistemlerini kullanan lider markaların yorumları.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                            <TestimonialCard testimonial={TESTIMONIALS[0]} />
                            <TestimonialCard testimonial={TESTIMONIALS[3]} />
                            <TestimonialCard testimonial={TESTIMONIALS[4]} />
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-12 bg-gradient-to-b from-[#060b13] to-[#030712] rounded-2xl max-w-7xl mx-auto px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Sıkça Sorulan Sorular</h2>
                            <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">
                                Aklınızdaki soruların cevaplarını burada bulabilirsiniz.
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-y-4 gap-x-6">
                            <div className="space-y-4">
                                {activeFaqs.slice(0, Math.ceil(activeFaqs.length / 2)).map((faq, index) => (
                                    <FAQItem key={index} faq={faq} isOpen={openFaqIndex === index} onClick={() => handleFaqClick(index)} />
                                ))}
                            </div>
                            <div className="space-y-4">
                                {activeFaqs.slice(Math.ceil(activeFaqs.length / 2)).map((faq, index) => {
                                    const originalIdx = index + Math.ceil(activeFaqs.length / 2);
                                    return (
                                        <FAQItem key={originalIdx} faq={faq} isOpen={openFaqIndex === originalIdx} onClick={() => handleFaqClick(originalIdx)} />
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Guarantee Section */}
                    <section className="bg-gradient-to-br from-[#0c1223] to-[#040815] rounded-3xl shadow-2xl border border-white/5 p-8 md:p-12">
                        <div className="grid lg:grid-cols-3 gap-8 items-center text-center lg:text-left">
                            <div className="lg:col-span-1">
                                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=200&auto=format&fit=crop" alt="Memnuniyet Garantisi" className="mx-auto h-32 w-auto object-contain filter brightness-0 invert opacity-60"/>
                            </div>
                            <div className="lg:col-span-2">
                                 <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">Risksiz Başlayın: 14 Gün Memnuniyet Garantisi</h2>
                                <p className="text-base text-slate-400 leading-relaxed font-light">
                                   Geliştirdiğimiz çözümlere o kadar güveniyoruz ki, ilk 14 gün içinde herhangi bir nedenle memnun kalmazsanız sorgusuz sualsiz tam para iadesi yapıyoruz. Hiçbir finansal riske girmeden işletmenizin verimliliğini patlatın!
                                </p>
                                <div className="mt-6">
                                    <a href="#pricing" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 inline-block text-sm">
                                        Hemen Başla
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Integrations Section */}
                    {solution.integrations && (
                        <section className="py-12">
                            <style>
                              {`
                                @keyframes scroll-logos {
                                  0% { transform: translateX(0); }
                                  100% { transform: translateX(-50%); }
                                }
                                .animate-scroll-logos {
                                  animation: scroll-logos 45s linear infinite;
                                }
                                .logo-scroller:hover .animate-scroll-logos {
                                  animation-play-state: paused;
                                }
                              `}
                            </style>
                            <div className="bg-gradient-to-br from-[#060b14] via-indigo-950/5 to-[#040813] rounded-3xl p-8 md:p-12 border border-slate-850 shadow-2xl overflow-hidden relative">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{solution.integrations.title}</h2>
                                    <p className="mt-2 text-base text-slate-400 max-w-3xl mx-auto">{solution.integrations.description}</p>
                                </div>
                                <div className="logo-scroller w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)' }}>
                                    <div className="flex w-max animate-scroll-logos">
                                        {[...solution.integrations.logos, ...solution.integrations.logos].map((logo, index) => (
                                            <div key={index} className="flex-shrink-0 mx-10 flex items-center h-16" title={logo.name}>
                                                <img 
                                                    src={logo.logoUrl} 
                                                    alt={logo.name} 
                                                    className="max-h-9 max-w-full object-contain filter grayscale brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-350" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
            
            {/* Common CTA Section */}
            <div className="container mx-auto px-8 pb-24 relative z-10">
                 <section className="bg-gradient-to-r from-indigo-950/40 via-[#0e162a]/90 to-purple-950/30 rounded-3xl p-10 md:p-14 text-center shadow-2xl border border-indigo-500/10">
                     <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Otomasyon ile Geleceğe Geçiş Yapın</h2>
                     <p className="max-w-2xl mx-auto mb-8 text-slate-450 text-sm md:text-base font-light">
                        İş süreçlerinizi yapay zeka ile otomatikleştirerek operasyon maliyetlerinizi %70 azaltıp büyümenizi %30 hızlandırın. Hemen ücretsiz strateji mülakatı planlayın!
                     </p>
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 font-bold py-3.5 px-8 rounded-xl shadow-xl hover:bg-indigo-700 transition-all transform hover:scale-105 inline-block text-white"
                     >
                        Ücretsiz Strateji Görüşmesi Talep Et
                    </a>
                </section>
            </div>
        </div>
    );
};

export default AutomationDetailPage;
