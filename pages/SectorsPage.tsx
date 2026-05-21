import React from 'react';
import { Link } from 'react-router-dom';
import { SECTORS } from '../constants';

const SectorsPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Sektörel Uzmanlığımız: <span className="text-blue-600">Turizm ve Otelcilik</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            İşletmenizin ihtiyaçlarına özel olarak geliştirdiğimiz yapay zeka otomasyonları ile verimliliğinizi artırın ve rekabette öne geçin.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {SECTORS.map((sector, index) => (
            <Link to={`/sektorler/${sector.slug}`} key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 block">
              <img src={sector.imageUrl} alt={sector.name} className="w-full h-56 object-cover" />
              <div className="p-8 bg-white text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{sector.name}</h3>
                <p className="text-gray-600 text-lg">{sector.description}</p>
                 <span className="mt-6 inline-block font-bold text-blue-600 group-hover:underline decoration-2 underline-offset-4">
                  Detayları İncele <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorsPage;