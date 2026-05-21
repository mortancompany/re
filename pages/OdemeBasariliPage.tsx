import React from 'react';
import { Link } from 'react-router-dom';

const OdemeBasariliPage: React.FC = () => {
    return (
        <div className="bg-gray-50 flex items-center justify-center py-24">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
                    <i className="fas fa-check-circle text-6xl text-green-500 mb-6 animate-pulse"></i>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Ödeme Başarılı!</h1>
                    <p className="text-gray-600 mb-8">Siparişiniz başarıyla alındı. Detaylar ve faturanız en kısa sürede e-posta adresinize gönderilecektir.</p>
                    <Link to="/" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                        Anasayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OdemeBasariliPage;
