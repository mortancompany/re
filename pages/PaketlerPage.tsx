import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const PAKETLER = [
  {
    id: 'media',
    title: 'Mortanas Media',
    description: 'İşletmenize özel içerikler ve yapay zeka destekli video reklam üretimi.',
    price: 'İletişime Geçin',
    link: '/paketler/media',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Yapay Zeka Destekli Video Kırpma',
      'Otomatik Altyazı ve Düzenleme',
      'Marka Kimliğine Uygun İçerikler',
      'Sosyal Medya Optimizasyonu'
    ]
  },
  {
    id: 'digital',
    title: 'Mortanas Digital',
    description: 'İşletmenize özel modern web yazılım ve dijital altyapı çözümleri.',
    price: 'İletişime Geçin',
    link: '/paketler/digital',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    features: [
      'Özel UI/UX Tasarımı',
      'SEO Uyumlu Altyapı',
      'Mobil Uyumlu Yazılımlar',
      'Yönetim Paneli Desteği'
    ]
  },
  {
    id: 'flow',
    title: 'Mortanas Flow',
    description: 'İşletmenize özel yapay zeka otomasyonları ve akıllı iş akışları.',
    price: 'İletişime Geçin',
    link: '/paketler/flow',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    features: [
      'WhatsApp & Instagram Botları',
      'CRM Entegrasyonu',
      '7/24 Teknik Destek',
      'Veri Analitiği Raporlama'
    ]
  }
];

const PaketlerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <main className="pt-32 pb-20 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
            >
              Fiyatlandırma ve <span className="text-blue-600">Paketler</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              İhtiyaçlarınıza özel olarak hazırlanan profesyonel yapay zeka ve dijital dönüşüm çözümlerimizle tanışın.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PAKETLER.map((paket, index) => (
              <motion.div
                key={paket.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 group hover:shadow-blue-500/20 transition-all duration-500 flex flex-col h-full"
              >
                {/* Header Bar - Like the screenshot */}
                <div className="bg-[#003865] py-2 lg:py-2.5 px-4 text-center border-b border-white/10 shrink-0">
                  <h3 className="text-white font-bold text-sm md:text-[15px] uppercase tracking-wider leading-snug">{paket.title}</h3>
                </div>

                {/* Preview Image Area */}
                <div className="relative h-40 p-2 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10" />
                  <img 
                    src={paket.image} 
                    alt={paket.title}
                    className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content / Description Area */}
                <div className="py-3 px-4 flex-1 bg-white flex flex-col min-h-0">
                  <p className="text-slate-700 font-bold text-xs md:text-[13px] leading-relaxed text-center italic mb-2 shrink-0">
                    "{paket.description}"
                  </p>
                  
                  <div className="flex flex-col gap-1.5 py-2 border-y border-slate-100 italic shrink-0">
                    {paket.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-xs md:text-[13px] text-slate-700 font-semibold justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mr-2 mt-1" />
                        <span className="text-left leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 pb-1 text-center shrink-0">
                    <Link 
                      to={paket.link}
                      className="inline-block bg-blue-600 hover:bg-[#003865] text-white px-8 py-2 rounded-sm font-bold text-[11px] tracking-widest transition-all duration-300 uppercase shadow-md active:scale-95"
                    >
                      Paketler
                    </Link>
                  </div>
                </div>

                {/* Footer Bar - Like the screenshot */}
                <div className="bg-[#003865] py-2 lg:py-2.5 px-4 text-center mt-auto border-t border-white/10 shrink-0">
                  <div className="text-white font-bold text-[11px] mb-0.5 truncate">{paket.title} Çözümü</div>
                  <div className="text-blue-300 font-black text-xs sm:text-sm md:text-xs lg:text-[11px] xl:text-[13px] tracking-tighter whitespace-nowrap">{paket.price}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-white rounded-3xl p-10 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Hangi paket size uygun?</h2>
              <p className="text-slate-600">Uzmanlarımızla görüşerek işletmeniz için en verimli stratejiyi belirleyelim.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-500/25">
              Hemen Teklif Alın
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaketlerPage;
