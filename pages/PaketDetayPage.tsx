import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { URUNLER_DATA, Urun } from './PaketUrunlerPage';

const PaketDetayPage: React.FC = () => {
  const { categoryId, productId } = useParams<{ categoryId: string; productId: string }>();
  const [product, setProduct] = useState<Urun | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryId && productId && URUNLER_DATA[categoryId]) {
      const foundItem = URUNLER_DATA[categoryId].products.find(p => p.id === productId);
      setProduct(foundItem || null);
    }
  }, [categoryId, productId]);

  if (!product) {
    return (
      <div className="min-h-screen py-32 flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-800">Paket bulunamadı.</h1>
        <Link to="/paketler" className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md shadow-md text-sm font-bold uppercase tracking-wider hover:bg-blue-700 transition">Paketlere Dön</Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#101935] via-[#090d20] to-[#121c38] min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 selection:text-white pb-24">
      {/* Cinematic Header */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {product.video ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src={product.video} type="video/mp4" />
          </video>
        ) : (
          <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d20] via-[#090d20]/80 to-blue-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              Mortanas Özel Çözüm
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
              {product.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
               <div className="lg:col-span-8 space-y-16">
            {/* Açıklama */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="border-b border-white/10 pb-4 mb-6">
                 <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Detaylı Sistem Analizi</h2>
              </div>
              <div className="text-slate-300 leading-relaxed font-medium text-base md:text-lg space-y-4">
                <p>
                  <strong className="text-white font-bold">{product.title}</strong>, Mortanas'ın amiral gemisi dijital otomasyon ve yazılım çözümlerinden biridir. Sisteminizi yarına taşımak için mimariyi sıfırdan kurguluyoruz.
                </p>
                <p>
                  Geleneksel yapıların aksine, yapay zeka destekli ve modüler altyapımızla <strong className="text-white font-bold">proaktif</strong> bir yapı sunuyoruz. İşletmenizin rutin yüklerini makinelere devrediyor, müşterilerinize değer katmanızı sağlıyoruz. Hız, veri güvenliği ve maksimum operasyonel sürdürülebilirlik temel ilkelerimizdir.
                </p>
              </div>
            </motion.section>

            {/* Avantajlar */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Stratejik Avantajlar</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Maksimum Verimlilik", icon: "fa-bolt", desc: "Zaman ve iş gücü tasarrufu yaratır, ekipleri hızlandırır." },
                  { title: "Kusursuz Deneyim", icon: "fa-gem", desc: "Müşterileriniz için kesintisiz ve yüksek kaliteli bir arayüz sağlar." },
                  { title: "Finansal Optimizasyon", icon: "fa-wallet", desc: "Masraf kalemlerini iyileştirerek yatırım getirisini artırır." },
                  { title: "Askeri Düzey Güvenlik", icon: "fa-shield-check", desc: "Güçlü şifreleme ve KVKK uyumu ile tam veri güvenliği sunar." }
                ].map((adv, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#0c152a] to-[#070b16] border border-blue-500/20 py-4 px-5 flex items-start text-left hover:border-blue-400/50 hover:from-[#0d1832] hover:to-[#080d1a] transition-all rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-1">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20 shadow-inner mt-0.5">
                      <i className={`fas ${adv.icon} text-blue-400 text-lg drop-shadow-md`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs mb-1.5 uppercase tracking-wider">{adv.title}</h3>
                      <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            
            {/* Teknolojiler */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="border-b border-white/10 pb-4 mb-6">
                 <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Teknoloji Yığını</h2>
              </div>
              <p className="text-slate-300 mb-6 font-medium text-base leading-relaxed">
                Projenizde en son endüstri standartlarını ve gelecekle uyumlu altyapıları (Future-Proof) kullanıyoruz. Modern, ölçeklenebilir ve sağlam.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {['React & Next.js', 'TypeScript', 'Node.js & Python', 'LLM & RAG Modelleri', 'Cloud Native (AWS/GCP)', 'Redis & PostgreSQL'].map((tech, i) => (
                  <div key={i} className="px-4 py-4 bg-[#0b1021] border border-blue-500/20 text-blue-200 shadow-lg shadow-blue-900/10 text-xs font-bold text-center uppercase tracking-widest hover:bg-[#0d162e] rounded-xl hover:border-blue-400/50 transition-colors">
                    {tech}
                  </div>
                ))}
              </div>
            </motion.section>

          </div>
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32">
              <PremiumPricingCard product={product} />
            </div>
          </div>
          
          {/* Mobile Pricing - shows at bottom on mobile */}
          <div className="lg:hidden mt-12">
             <PremiumPricingCard product={product} />
          </div>

        </div>
      </main>
    </div>
  );
};

const PremiumPricingCard = ({ product }: { product: Urun }) => (
  <div className="bg-gradient-to-b from-[#0b1021]/90 to-[#070b16]/90 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden group">
    {/* Decorative Glow */}
    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none transition-opacity group-hover:bg-blue-500/20 duration-700"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none transition-opacity group-hover:bg-indigo-500/20 duration-700"></div>
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="text-center pb-8 border-b border-white/5 mb-8 relative z-10">
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
        <i className="fas fa-crown"></i> Lisans / Yatırım Bedeli
      </div>
      <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mt-2 tracking-tight">
        {product.price.split(' / ')[0]}
      </div>
      {product.price.includes(' / ') && (
        <div className="text-slate-500 text-sm font-medium mt-2 decoration-white/20">
          / {product.price.split(' / ')[1]}
        </div>
      )}
    </div>
    
    <div className="space-y-3 mb-10 relative z-10">
      <h3 className="font-bold text-white text-sm tracking-widest mb-6 uppercase flex items-center">
        Paket İçeriği
      </h3>
      {product.features.map((feature, i) => (
        <div key={i} className="flex items-center bg-white/5 border border-white/5 rounded-xl p-3.5 text-slate-300 font-medium group/item hover:bg-white/10 hover:border-white/10 transition-colors">
          <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mr-3 shadow-sm shadow-blue-500/10 transition-colors group-hover/item:bg-blue-500/20">
            <i className="fas fa-check text-blue-400 text-[10px]"></i>
          </div>
          <span className="text-[12px] md:text-[13px] tracking-tight truncate flex-1 leading-none" title={feature}>{feature}</span>
        </div>
      ))}
    </div>
    
    <Link 
      to="/kurumsal#iletisim"
      className="relative z-10 flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base py-4 rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all duration-300"
    >
      <span>Danışmanla Görüş</span>
      <i className="fas fa-arrow-right ml-3 text-sm"></i>
    </Link>
    
    <div className="text-center mt-6 relative z-10">
      <span className="text-[11px] text-slate-500 flex items-center justify-center font-medium">
        <i className="fas fa-shield-alt mr-2 text-blue-500/50"></i> %100 Memnuniyet Garantisi
      </span>
    </div>
  </div>
);

export default PaketDetayPage;
