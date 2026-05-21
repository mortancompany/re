import React from 'react';
import { Link } from 'react-router-dom';
import { INTEGRATIONS } from '../constants';
import type { Integration } from '../types';

const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        <div className="flex items-center space-x-4 mb-6">
            {integration.icon}
            <h3 className="text-2xl font-bold text-gray-900">{integration.name}</h3>
        </div>
        <ul className="space-y-3 flex-grow text-gray-600">
            {integration.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <i className="fa-solid fa-check-circle text-blue-500 mr-3 mt-1 flex-shrink-0"></i>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);


const IntegrationsPage: React.FC = () => {
    // Group integrations by category
    const groupedIntegrations = INTEGRATIONS.reduce((acc, integration) => {
        const category = integration.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(integration);
        return acc;
    }, {} as Record<string, Integration[]>);

    // Define the desired order of categories
    const categoryOrder: Integration['category'][] = [
        'E-Ticaret & Pazaryerleri',
        'Sosyal Medya',
        'CRM & İş Yönetimi',
        'Yardımcı Araçlar'
    ];
    
    const orderedCategories = categoryOrder.filter(category => groupedIntegrations[category]);

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Kullandığınız Araçlarla <span className="text-blue-600">Uyum İçinde</span> Çalışın
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mortanas, iş akışlarınızı kesintiye uğratmadan, mevcut sistemlerinizle sorunsuz bir şekilde bütünleşir. Operasyonlarınızı tek bir panelden yönetmenin keyfini çıkarın.
          </p>
        </div>

        <div className="space-y-16">
          {orderedCategories.map(category => (
            <div key={category}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupedIntegrations[category].map((integration, index) => (
                        <IntegrationCard key={index} integration={integration} />
                    ))}
                </div>
            </div>
          ))}
        </div>
        
        <section className="mt-24 text-center bg-gray-50 rounded-2xl p-12 shadow-inner">
            <h2 className="text-3xl font-bold text-gray-900">Aradığınız Entegrasyon Yok mu?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Sürekli yeni entegrasyonlar ekliyoruz. İstediğiniz bir uygulama varsa bize bildirin, sizin için entegre edelim.
            </p>
            <div className="mt-8">
                <Link 
                    to="/kurumsal" 
                    className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-block"
                >
                    Entegrasyon Öner
                </Link>
            </div>
        </section>

      </div>
    </div>
  );
};

export default IntegrationsPage;