import React from 'react';
import { Link } from 'react-router-dom';

const OdemeBasarisizPage: React.FC = () => {
    return (
        <div className="bg-gray-50 flex items-center justify-center py-24">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500">
                    <i className="fas fa-times-circle text-6xl text-red-500 mb-6"></i>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Ödeme Başarısız</h1>
                    <p className="text-gray-600 mb-8">Ödeme işlemi sırasında bir hata oluştu veya işlem tarafınızca iptal edildi. Lütfen bilgilerinizi kontrol ederek tekrar deneyin.</p>
                    <Link to="/paketler" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                        Paketlere Geri Dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OdemeBasarisizPage;
