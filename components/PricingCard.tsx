import React from 'react';
import { Link } from 'react-router-dom';
import type { PricingPlan } from '../types';

type BillingCycle = 'monthly' | 'annually' | 'lifetime';

interface PricingCardProps {
  plan: PricingPlan;
  type: 'automation' | 'application';
  billingCycle: BillingCycle;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, type, billingCycle }) => {
  const isContactPlan = typeof plan.price === 'string';
  
  const cardClasses = plan.popular
    ? 'bg-blue-600 text-white rounded-2xl shadow-2xl transform scale-105'
    : 'bg-white text-gray-800 rounded-2xl shadow-lg';
  
  const buttonClasses = plan.popular
    ? 'bg-white text-blue-600 hover:bg-gray-100'
    : 'bg-gray-900 text-white hover:bg-gray-700';
  
  const popularBadge = plan.popular 
    ? <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase">ÇOK TERCİH EDİLEN</div>
    : null;

  const displayPrice = isContactPlan ? plan.price : plan.price[billingCycle];
  
  const currencyFormatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  });

  const formattedPrice = isContactPlan ? displayPrice : currencyFormatter.format(displayPrice as number);

  const priceSuffix = {
    monthly: '/aylık',
    annually: '/yıllık',
    lifetime: 'ömür boyu lisans'
  };
    
  const searchParams = new URLSearchParams({
      plan: plan.name,
      price: isContactPlan ? '0' : displayPrice.toString(),
      type: type,
      cycle: billingCycle,
  }).toString();

  const renderButton = () => {
    if (isContactPlan) {
      return (
        <Link to="/kurumsal" className={`mt-8 block text-center w-full py-3 font-semibold rounded-lg transition-colors ${buttonClasses}`}>
          Bize Ulaşın
        </Link>
      );
    }
    return (
      <Link to={`/odeme?${searchParams}`} className={`mt-8 block text-center w-full py-3 font-semibold rounded-lg transition-colors ${buttonClasses}`}>
        Planı Seç
      </Link>
    );
  };

  return (
    <div className={`p-8 flex flex-col relative ${cardClasses} transition-transform duration-300`}>
      {popularBadge}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <div className="mt-4">
        <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{formattedPrice}</span>
        {!isContactPlan && (
          <span className={`text-sm ml-1 ${plan.popular ? 'text-blue-200' : 'text-gray-500'}`}>{priceSuffix[billingCycle]}</span>
        )}
      </div>

      {renderButton()}
      
      <ul className="mt-8 space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <i className={`fa-solid fa-check mr-3 mt-1 ${plan.popular ? 'text-yellow-400' : 'text-green-500'}`}></i>
            <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;