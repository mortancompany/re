import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { getPricingData, savePricingData } from '../../utils/pricingStorage';
// FIX: Added SocialMediaPricingDetails to the import to use for stronger type casting.
import type { AutomationSolution, SocialMediaPricingPlan, PricingTier, SocialMediaPricingDetails } from '../../types';

// Helper to format currency
const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

const PricingEditModal: React.FC<{
    plan: SocialMediaPricingPlan | PricingTier;
    solutionSlug: string;
    planType: 'social' | 'voice-individual' | 'voice-corporate';
    onClose: () => void;
    onSave: (updatedSolutions: AutomationSolution[]) => void;
}> = ({ plan, solutionSlug, planType, onClose, onSave }) => {
    const [currentPlan, setCurrentPlan] = useState(plan);

    const handleSave = () => {
        const allSolutions = getPricingData();
        const updatedSolutions = allSolutions.map(sol => {
            if (sol.slug === solutionSlug) {
                const newSol = { ...sol };
    
                if (planType === 'social' && newSol.pricingPlans) {
                    const planIndex = newSol.pricingPlans.findIndex((p: SocialMediaPricingPlan) => p.name === currentPlan.name);
                    if (planIndex !== -1) {
                        newSol.pricingPlans = [...newSol.pricingPlans];
                        newSol.pricingPlans[planIndex] = currentPlan as SocialMediaPricingPlan;
                    }
                } else if (planType === 'voice-individual' && newSol.individualPricing?.plans) {
                    const planIndex = newSol.individualPricing.plans.findIndex((p: PricingTier) => p.name === currentPlan.name);
                    if (planIndex !== -1) {
                        newSol.individualPricing = { ...newSol.individualPricing, plans: [...newSol.individualPricing.plans] };
                        newSol.individualPricing.plans[planIndex] = currentPlan as PricingTier;
                    }
                } else if (planType === 'voice-corporate' && newSol.corporatePricing?.plans) {
                    const planIndex = newSol.corporatePricing.plans.findIndex((p: PricingTier) => p.name === currentPlan.name);
                    if (planIndex !== -1) {
                        newSol.corporatePricing = { ...newSol.corporatePricing, plans: [...newSol.corporatePricing.plans] };
                        newSol.corporatePricing.plans[planIndex] = currentPlan as PricingTier;
                    }
                }
                return newSol;
            }
            return sol;
        });
        savePricingData(updatedSolutions);
        onSave(updatedSolutions);
        onClose();
    };
    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, ...keys: string[]) => {
        const { value } = e.target;
        const numericValue = Number(value) || 0;

        setCurrentPlan(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            
            let target = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            target[keys[keys.length - 1]] = numericValue;
            
            return updated;
        });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 text-slate-300">
                <h3 className="text-xl font-bold text-white mb-4">"{plan.name}" Paketini Düzenle</h3>
                <div className="space-y-4">
                    {planType === 'social' ? (
                        <>
                            {/* FIX: Cast Object.keys to a typed array to ensure type safety for 'cycle'. */}
                            {(currentPlan as SocialMediaPricingPlan).prices && (Object.keys((currentPlan as SocialMediaPricingPlan).prices) as Array<keyof SocialMediaPricingDetails>).map(cycle => (
                                <div key={cycle}>
                                    <h4 className="font-semibold text-purple-400 capitalize">{cycle} Fiyatları</h4>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label className="text-sm">İndirimli Fiyat</label>
                                            {/* FIX: Removed internal type casting as it's now handled by the typed map iterator. */}
                                            <input type="number" value={(currentPlan as SocialMediaPricingPlan).prices[cycle]} onChange={(e) => handlePriceChange(e, 'prices', cycle)} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                                        </div>
                                         <div>
                                            <label className="text-sm">Orijinal Fiyat</label>
                                            {/* FIX: Removed internal type casting as it's now handled by the typed map iterator. */}
                                            <input type="number" value={(currentPlan as SocialMediaPricingPlan).originalPrices[cycle]} onChange={(e) => handlePriceChange(e, 'originalPrices', cycle)} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                         <>
                             <div>
                                <h4 className="font-semibold text-purple-400">Aylık Fiyat</h4>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                     <div>
                                        <label className="text-sm">İndirimli Fiyat</label>
                                        <input type="number" value={(currentPlan as PricingTier).monthlyPrice} onChange={(e) => handlePriceChange(e, 'monthlyPrice')} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                                    </div>
                                    {(currentPlan as PricingTier).originalMonthlyPrice !== undefined && (
                                         <div>
                                            <label className="text-sm">Orijinal Fiyat</label>
                                            <input type="number" value={(currentPlan as PricingTier).originalMonthlyPrice || 0} onChange={(e) => handlePriceChange(e, 'originalMonthlyPrice')} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                         </>
                    )}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onClose} className="bg-slate-600 px-4 py-2 rounded-md font-semibold">İptal</button>
                    <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded-md font-semibold">Kaydet</button>
                </div>
            </div>
        </div>
    );
};


const PricingPlanCard: React.FC<{ plan: SocialMediaPricingPlan; onEdit: () => void; }> = ({ plan, onEdit }) => {
    const cardClasses = plan.popular 
        ? 'bg-slate-800 border-2 border-purple-500 shadow-lg' 
        : 'bg-slate-900 border border-slate-700';
    
    return (
        <div className={`rounded-xl flex flex-col ${cardClasses}`}>
            {plan.popular && (
                <div className="bg-purple-500 text-white text-xs font-bold text-center py-1 rounded-t-xl">EN POPÜLER</div>
            )}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                
                <div className="mt-6 space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-slate-400">AYLIK</p>
                        <p className="text-xl font-bold text-white">
                            {usdFormatter.format(plan.prices.monthly)}
                            <del className="text-base font-normal text-red-400 ml-2">{usdFormatter.format(plan.originalPrices.monthly)}</del>
                        </p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-400">6 AYLIK (Aylık Fiyat)</p>
                        <p className="text-xl font-bold text-white">
                            {usdFormatter.format(plan.prices.sixMonths)}
                             <del className="text-base font-normal text-red-400 ml-2">{usdFormatter.format(plan.originalPrices.sixMonths)}</del>
                        </p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-400">YILLIK (Aylık Fiyat)</p>
                        <p className="text-xl font-bold text-white">
                            {usdFormatter.format(plan.prices.annually)}
                             <del className="text-base font-normal text-red-400 ml-2">{usdFormatter.format(plan.originalPrices.annually)}</del>
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-700 my-6"></div>

                <ul className="space-y-3 text-sm text-slate-300 flex-grow">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                     <button onClick={onEdit} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors">
                        Paketi Düzenle
                    </button>
                </div>
            </div>
        </div>
    );
};

const VoicePricingCard: React.FC<{ plan: PricingTier; onEdit: () => void; }> = ({ plan, onEdit }) => {
    const cardClasses = plan.popular
        ? 'bg-slate-800 border-2 border-purple-500 shadow-lg'
        : 'bg-slate-900 border border-slate-700';

    return (
        <div className={`rounded-xl flex flex-col ${cardClasses}`}>
            {plan.popular && (
                <div className="bg-purple-500 text-white text-xs font-bold text-center py-1 rounded-t-xl">EN POPÜLER</div>
            )}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.minutes} dakika görüşme</p>

                <div className="mt-6">
                    {plan.originalMonthlyPrice !== undefined && (
                         <del className="text-xl font-normal text-red-400">{usdFormatter.format(plan.originalMonthlyPrice)}</del>
                    )}
                    <p className="text-3xl font-bold text-white">
                        {usdFormatter.format(plan.monthlyPrice)}
                        <span className="text-base font-normal text-slate-400">/aylık</span>
                    </p>
                    {plan.annualPrice !== undefined && (
                        <p className="text-sm text-slate-400">{usdFormatter.format(plan.annualPrice)} / yıllık peşin</p>
                    )}
                     {plan.annualBillingText && (
                        <p className="text-sm text-slate-400">{plan.annualBillingText}</p>
                    )}
                </div>

                <div className="border-t border-slate-700 my-6"></div>

                <ul className="space-y-3 text-sm text-slate-300 flex-grow">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                    <button onClick={onEdit} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors">
                        Paketi Düzenle
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminFiyatlandirmalarPage: React.FC = () => {
    const [solutions, setSolutions] = useState<AutomationSolution[]>(getPricingData);
    const [activeTab, setActiveTab] = useState<'sosyal' | 'sesli'>('sosyal');
    const [editingPlan, setEditingPlan] = useState<{plan: SocialMediaPricingPlan | PricingTier, type: 'social' | 'voice-individual' | 'voice-corporate', slug: string} | null>(null);

    const sosyalMedyaSolution = solutions.find(s => s.slug === 'sosyal-medya-otomasyonu');
    const voiceAgentSolution = solutions.find(s => s.slug === 'sesli-musteri-hizmetleri');
    
    const renderSosyalMedyaPricing = () => {
        if (!sosyalMedyaSolution || !sosyalMedyaSolution.pricingPlans || !sosyalMedyaSolution.setupFee) {
            return <p className="text-red-400">Sosyal Medya Otomasyonu için fiyatlandırma bilgileri bulunamadı.</p>;
        }
        const { pricingPlans, setupFee } = sosyalMedyaSolution;
        return (
            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-slate-100 border-l-4 border-purple-500 pl-4">Sosyal Medya Otomasyonu</h2>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm">
                    <h3 className="text-lg font-semibold text-slate-300">Kurulum Ücreti</h3>
                     <p className="text-3xl font-bold text-white mt-2">
                        {usdFormatter.format(setupFee.discounted)}
                        <del className="text-xl font-normal text-red-400 ml-3">{usdFormatter.format(setupFee.original)}</del>
                    </p>
                    <p className="text-sm text-green-400 font-semibold">%50 İndirim Aktif</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingPlans.map(plan => (
                        <PricingPlanCard key={plan.name} plan={plan} onEdit={() => setEditingPlan({plan, type: 'social', slug: sosyalMedyaSolution.slug})} />
                    ))}
                </div>
            </div>
        );
    };
    
    const renderVoiceAgentPricing = () => {
        if (!voiceAgentSolution || (!voiceAgentSolution.individualPricing && !voiceAgentSolution.corporatePricing)) {
            return <p className="text-red-400">Sesli Müşteri Hizmetleri Otomasyonu için fiyatlandırma bilgileri bulunamadı.</p>;
        }
        
        const { individualPricing, corporatePricing } = voiceAgentSolution;

        return (
            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-slate-100 border-l-4 border-purple-500 pl-4">Sesli Müşteri Hizmetleri Otomasyonu</h2>
                
                {individualPricing && (
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-300 mb-6">{individualPricing.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {individualPricing.plans.map(plan => (
                                <VoicePricingCard key={plan.name} plan={plan} onEdit={() => setEditingPlan({plan, type: 'voice-individual', slug: voiceAgentSolution.slug})} />
                            ))}
                        </div>
                        <div className="mt-6 text-sm text-slate-400 space-y-1">
                            {individualPricing.notes.map((note, index) => <p key={index}><i className="fas fa-info-circle mr-2"></i>{note}</p>)}
                        </div>
                    </div>
                )}
                {corporatePricing && (
                     <div>
                        <h3 className="text-2xl font-semibold text-slate-300 mb-6">{corporatePricing.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {corporatePricing.plans.map(plan => (
                                <VoicePricingCard key={plan.name} plan={plan} onEdit={() => setEditingPlan({plan, type: 'voice-corporate', slug: voiceAgentSolution.slug})} />
                            ))}
                        </div>
                         <div className="mt-6 text-sm text-slate-400 space-y-1">
                            {corporatePricing.notes.map((note, index) => <p key={index}><i className="fas fa-info-circle mr-2"></i>{note}</p>)}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const getTabClass = (tabName: 'sosyal' | 'sesli') => {
        const baseClass = "py-3 px-4 font-semibold text-lg transition-colors duration-200 border-b-2 flex items-center gap-2";
        if (activeTab === tabName) {
            return `${baseClass} text-blue-400 border-blue-400`;
        }
        return `${baseClass} text-slate-400 border-transparent hover:text-white hover:border-slate-500`;
    };

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <style>{`
              .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
              @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            `}</style>
            <AdminHeader title="Fiyatlandırmalar" />
            
            <div className="mt-8">
                {/* Tab Navigation */}
                <div className="flex border-b border-slate-700 mb-8">
                    <button onClick={() => setActiveTab('sosyal')} className={getTabClass('sosyal')}>
                        <i className="fas fa-share-alt"></i>
                        <span>Sosyal Medya Otomasyonu</span>
                    </button>
                    <button onClick={() => setActiveTab('sesli')} className={getTabClass('sesli')}>
                        <i className="fas fa-headset"></i>
                        <span>Sesli Asistan</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div key={activeTab} className="animate-fade-in">
                    {activeTab === 'sosyal' && renderSosyalMedyaPricing()}
                    {activeTab === 'sesli' && renderVoiceAgentPricing()}
                </div>
            </div>
            
            {editingPlan && (
                <PricingEditModal 
                    plan={editingPlan.plan}
                    planType={editingPlan.type}
                    solutionSlug={editingPlan.slug}
                    onClose={() => setEditingPlan(null)}
                    onSave={(updatedSolutions) => setSolutions(updatedSolutions)}
                />
            )}
        </div>
    );
};

export default AdminFiyatlandirmalarPage;
