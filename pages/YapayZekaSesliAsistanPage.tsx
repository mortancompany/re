import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-blue-400">
        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-blue-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
    </div>
);


const YapayZekaSesliAsistanPage: React.FC = () => {
    
  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">YAPAY ZEKA SESLİ ASİSTAN</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Ziyaretçilerinizle Yazmadan Konuşun: <span className="text-blue-400">Sesli AI Asistan Şimdi Web Sitenizde!</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Ziyaretçileriniz artık yazmakla uğraşmadan, tek tıkla sesli olarak sizinle iletişime geçebiliyor. Gelişmiş yapay zeka ajanlarıyla gerçek zamanlı konuşmalar başlatın, müşteri deneyimini bir üst seviyeye taşıyın.
                      </p>
                       <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Dene
                          </Link>
                           <Link to="/kurumsal#iletisim" className="bg-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-all inline-block">
                              Satış Ekibine Ulaş
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1587560699334-cc426240aE6f?q=80&w=2070&auto=format&fit=crop" alt="Yapay Zeka Sesli Asistan" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="container mx-auto px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <i className="fas fa-headset text-4xl text-blue-400 mb-3"></i>
                      <h3 className="font-bold text-lg text-white">Her An Hazır Bir Temsilci</h3>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <i className="fas fa-volume-up text-4xl text-blue-400 mb-3"></i>
                      <h3 className="font-bold text-lg text-white">Doğal Ses. Gerçek His.</h3>
                  </div>
                   <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <i className="fas fa-clock text-4xl text-blue-400 mb-3"></i>
                      <h3 className="font-bold text-lg text-white">Sürekli Aktif Destek Deneyimi</h3>
                  </div>
              </div>
          </section>

          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Temel Özellikler</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard icon="fas fa-user-clock" title="Web Sitenizde 7/24 Aktif Dijital Asistan" description="Müşterileriniz ne zaman gelirse gelsin, onları karşılayan bir yapay zeka temsilciniz olur. Tüm gün boyunca otomatik olarak soruları yanıtlar, yönlendirme yapar ve bilgi verir."/>
                <FeatureCard icon="fas fa-sitemap" title="Her Sektöre Uyumlu Akıllı Kurgular" description="İster e-ticaret, ister turizm, ister eğitim… Yapay zeka asistanları, sizin iş modelinize göre özel olarak senaryolaştırılır ve özelleştirilir."/>
                <FeatureCard icon="fas fa-microphone" title="Konuşarak Anında İletişim" description="Ziyaretçileriniz yazmak yerine sesli olarak konuşur. 'Canlı destek nerede?' diye aramak yok, sadece bir tıkla konuşmaya başlayabilirler."/>
                <FeatureCard icon="fas fa-volume-up" title="Gerçek İnsan Gibi Ses Deneyimi" description="Robotik sesler geride kaldı. ElevenLabs ve Reetell AI altyapısı sayesinde tıpkı gerçek bir insan gibi konuşan sesli AI asistanlar kullanıcıya profesyonel bir deneyim sunar."/>
                <FeatureCard icon="fas fa-code" title="Web Sitenize Sorunsuz Entegrasyon" description="Sesli AI Asistan sistemi, WordPress başta olmak üzere tüm modern web altyapılarına tam uyumludur. Yalnızca tek satır kod ile sitenize entegre edilir."/>
                <FeatureCard icon="fas fa-database" title="Müşteri Verilerini Akıllıca Toplar" description="Yapay zeka asistanları stratejik olarak müşteri verilerini toplar ve işleme alır. Örneğin 'Pantolon almak istiyorum' diyen bir kullanıcıya renk, beden gibi detayları sorar."/>
              </div>
            </div>
          </section>
          
          <section className="container mx-auto px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Müşteri Memnuniyetini Artırır</h2>
                 <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                    Sesli yapay zeka sistemleri, kullanıcıları bekletmeden anında karşılayarak profesyonel bir ilk izlenim sunar. Sorulara hızlı ve doğru cevaplar verildiğinde, ziyaretçiler web sitenizde daha uzun süre kalır ve tekrar gelme olasılıkları artar.
                </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <div>
                     <img src="https://i.imgur.com/G5g2fA1.png" alt="Mortanas AI Panel" className="rounded-xl shadow-lg"/>
                </div>
                 <div>
                    <h3 className="font-bold text-2xl text-white">İnsan Gibi Etkileşim</h3>
                     <p className="mt-4 text-slate-300">
                        İnsanlarla etkileşim kuruyormuş hissi veren doğal sesli yapılar sayesinde markanız daha samimi ve etkileyici bir deneyim sunar.
                    </p>
                </div>
            </div>
          </section>

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Mortanas AI’yi 7 Gün Ücretsiz Kullanın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Tüm iletişim kanallarınızı tek bir yerden 360° yönetin.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/kurumsal#iletisim" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                            Ücretsiz Demo Hesabı!
                        </Link>
                    </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default YapayZekaSesliAsistanPage;
