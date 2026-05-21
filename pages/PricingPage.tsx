import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AUTOMATION_PRICING_PLANS, APPLICATION_PRICING_PLANS } from '../constants';
import PricingCard from '../components/PricingCard';

type BillingCycle = 'monthly' | 'annually' | 'lifetime';

const PricingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  const [planType, setPlanType] = useState<'automation' | 'application'>('automation');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  useEffect(() => {
    if (typeParam === 'application') {
      setPlanType('application');
    } else {
      setPlanType('automation');
    }
  }, [typeParam]);

  const plans = planType === 'automation' ? AUTOMATION_PRICING_PLANS : APPLICATION_PRICING_PLANS;
  const title = planType === 'automation' ? 'Otomasyon Paketleri' : 'Uygulama Paketleri';
  const subtitle = planType === 'automation'
    ? 'Sosyal medya, sesli müşteri hizmetleri ve pazarlama otomasyonları için en uygun planı seçin.'
    : 'Sektöre özel CRM ve yönetim uygulamalarımız için işletmenize en uygun paketi bulun.';

  const getPlanTypeButtonClass = (type: 'automation' | 'application') => {
    return planType === type
      ? 'bg-blue-600 text-white shadow-md'
      : 'bg-white text-gray-600 hover:bg-gray-100';
  };
  
  const getBillingCycleButtonClass = (cycle: BillingCycle) => {
    return billingCycle === cycle
      ? 'bg-blue-600 text-white shadow-md'
      : 'bg-white text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            İşletmeniz İçin <span className="text-blue-600">Doğru Planı</span> Seçin
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Şeffaf ve esnek fiyatlandırma seçeneklerimizle, ihtiyacınız olan özelliklere hemen sahip olun.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 rounded-lg p-1 flex items-center space-x-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${getBillingCycleButtonClass('monthly')}`}
              aria-pressed={billingCycle === 'monthly'}
            >
              Aylık
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${getBillingCycleButtonClass('annually')}`}
              aria-pressed={billingCycle === 'annually'}
            >
              Yıllık
              <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">2 Ay Ücretsiz</span>
            </button>
            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${getBillingCycleButtonClass('lifetime')}`}
              aria-pressed={billingCycle === 'lifetime'}
            >
              Tek Seferlik
            </button>
          </div>
        </div>


        {/* Plan Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => setPlanType('automation')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${getPlanTypeButtonClass('automation')}`}
              aria-pressed={planType === 'automation'}
            >
              Otomasyon Paketleri
            </button>
            <button
              onClick={() => setPlanType('application')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${getPlanTypeButtonClass('application')}`}
              aria-pressed={planType === 'application'}
            >
              Uygulama Paketleri
            </button>
          </div>
        </div>

        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="mt-2 text-md text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} type={planType} billingCycle={billingCycle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;