import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SECTORS } from '../constants';

const SectorDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const sector = SECTORS.find(s => s.slug === slug);

    if (!sector) {
        return (
            <div className="text-center py-24 container mx-auto px-8">
                <h1 className="text-4xl font-bold mb-4">Sektör Bulunamadı</h1>
                <p className="text-lg text-gray-600 mb-8">Aradığınız sayfayı bulamadık.</p>
                <Link to="/sektorler" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                    Tüm Sektörlere Geri Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-8">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <span className="text-sm font-bold tracking-wider text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full uppercase">SEKTÖRE ÖZEL ÇÖZÜM</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">{sector.name} Sektörü İçin Otomasyonlar</h1>
                        <p className="mt-6 text-lg text-gray-600">{sector.description}</p>
                    </div>
                    <div>
                        <img src={sector.imageUrl} alt={sector.name} className="w-full h-auto object-cover rounded-2xl shadow-xl" />
                    </div>
                </div>

                {/* Use Cases Section */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">{sector.details.title}</h2>
                    <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">{sector.details.subtitle}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sector.details.use_cases.map((use_case, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:-translate-y-1">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mb-4">
                                    <i className="fas fa-check-circle text-blue-600"></i>
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-gray-800">{use_case.title}</h3>
                                <p className="text-gray-600">{use_case.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Capabilities Section */}
                {sector.details.featured_capabilities && (
                    <div className="space-y-20">
                         <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Öne Çıkan Özelliklerimiz</h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                Platformumuzun temel yetenekleri ile tanışın.
                            </p>
                        </div>
                        {sector.details.featured_capabilities.map((capability, index) => (
                            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className={index % 2 === 1 ? 'lg:order-last' : ''}>
                                    <img src={capability.imageUrl} alt={capability.title} className="rounded-2xl shadow-xl w-full" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                                    <p className="text-gray-600">{capability.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                <div className="text-center mt-20">
                     <Link to="/sektorler" className="text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Tüm Sektörlere Geri Dön
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default SectorDetailPage;