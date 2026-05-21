import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SECTOR_PRICING_PLANS } from '../constants';
import type { SectorPricingTier, SectorPricingDetails } from '../types';

interface SektorelPricingSectionProps {
  sectorSlug: string;
}

type BillingCycle = keyof SectorPricingDetails;

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

const PricingCard: React.FC<{ tier: SectorPricingTier; cycle: BillingCycle; sectorSlug: string; setupFee: number }> = ({ tier, cycle, sectorSlug, setupFee }) => {
    const pricePerMonth = tier.prices[cycle];
    const cycleMultipliers: Record<BillingCycle, number> = { monthly: 1, threeMonths: 3, sixMonths: 6, annually: 12 };
    const totalPayment = pricePerMonth * cycleMultipliers[cycle];

    const paymentSearchParams = new URLSearchParams({
        plan: `${sectorSlug} - ${tier.name}`,
        price: totalPayment.toString(),
        type: 'sektor-cozumu',
        cycle: cycle,
        currency: 'USD',
        setupFee: setupFee.toString(),
    }).toString();

    const cardClasses = tier.popular
        ? 'bg-slate-800 text-white rounded-2xl shadow-2xl transform lg:scale-105 ring-4 ring-blue-500 z-10'
        : 'bg-slate-800/50 backdrop-blur-sm text-slate-300 rounded-2xl shadow-lg border border-slate-700';
    
    const buttonClasses = tier.popular
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : 'bg-slate-700 text-white hover:bg-slate-600';

    const renderPrice = () => {
        if (tier.name === 'Kurumsal') {
            return <span className="text-3xl font-bold">Teklif Alın</span>;
        }
        return (
            <>
                <span className={`text-5xl font-extrabold ${tier.popular ? 'text-white' : 'text-white'}`}>
                    {currencyFormatter.format(pricePerMonth)}
                </span>
                <span className={`text-lg font-medium ${tier.popular ? 'text-slate-400' : 'text-slate-400'}`}>/ay</span>
            </>
        )
    };
    
    const renderButton = () => {
        if (tier.name === 'Kurumsal') {
             return (
                <Link to="/kurumsal#iletisim" className={`mt-8 block w-full text-center py-3 font-semibold rounded-lg transition-colors ${buttonClasses}`}>
                    İletişime Geç
                </Link>
            );
        }
        return (
             <Link to={`/odeme?${paymentSearchParams}`} className={`mt-8 block w-full text-center py-3 font-semibold rounded-lg transition-colors ${buttonClasses}`}>
                Planı Seç
            </Link>
        )
    }

    return (
        <div className={`rounded-2xl shadow-lg flex flex-col transition-all duration-300 ${cardClasses}`}>
            {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">En Popüler</div>}
            <div className="p-8">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className={`mt-2 text-sm h-10 ${tier.popular ? 'text-slate-300' : 'text-slate-400'}`}>{tier.description}</p>
                <div className="mt-6 h-20 flex items-center justify-center">
                   {renderPrice()}
                </div>
            </div>
            <div className="p-8 mt-auto flex-grow flex flex-col rounded-b-2xl bg-slate-700/30">
                <ul className="space-y-4 flex-grow">
                    {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                            <i className={`fas fa-check-circle mr-3 mt-1 ${tier.popular ? 'text-blue-400' : 'text-blue-500'}`}></i>
                            <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-8">
                   {renderButton()}
                </div>
            </div>
        </div>
    );
};

const SektorelPricingSection: React.FC<SektorelPricingSectionProps> = ({ sectorSlug }) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const pricingPlan = SECTOR_PRICING_PLANS.find(p => p.sectorSlug === sectorSlug);

    if (!pricingPlan) {
        return null;
    }

    const cycleLabels: Record<BillingCycle, { label: string, discount?: string }> = {
        monthly: { label: "Aylık" },
        threeMonths: { label: "3 Aylık", discount: "~%5 İndirim" },
        sixMonths: { label: "6 Aylık", discount: "~%10 İndirim" },
        annually: { label: "Yıllık", discount: "~%20 İndirim" },
    };

    return (
        <section id="pricing" className="bg-gradient-to-b from-slate-900 to-indigo-900/20 py-24">
            <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">İşletmenize Özel Esnek Fiyatlandırma</h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        İhtiyaçlarınıza ve bütçenize uygun, taahhüt süresi uzadıkça avantaj sağlayan planlarımızdan birini seçin.
                    </p>
                </div>
                
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-800 rounded-lg p-1 flex flex-wrap items-center justify-center gap-1">
                        {(Object.keys(cycleLabels) as BillingCycle[]).map(cycle => (
                             <button 
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)} 
                                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm flex items-center ${billingCycle === cycle ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                            >
                                {cycleLabels[cycle].label}
                                {cycleLabels[cycle].discount && <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">{cycleLabels[cycle].discount}</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                    {pricingPlan.tiers.map((tier) => (
                        <PricingCard 
                            key={tier.name} 
                            tier={tier} 
                            cycle={billingCycle}
                            sectorSlug={pricingPlan.sectorSlug}
                            setupFee={pricingPlan.setupFee}
                        />
                    ))}
                </div>
                <p className="text-center text-sm text-slate-400 mt-8">Tüm planlara <strong className="text-white">{currencyFormatter.format(pricingPlan.setupFee)}</strong> tek seferlik kurulum ücreti dahildir.</p>
            </div>
        </section>
    );
};

export default SektorelPricingSection;