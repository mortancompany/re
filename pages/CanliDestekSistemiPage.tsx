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

const CanliDestekSistemiPage: React.FC = () => {
    
    const features = [
        { icon: 'fas fa-comments', title: 'Daha Fazla Sohbet - Daha Fazla Satış', description: 'Sitede geçirilen süre, ziyaret sayısı ve müşterinin konumuna göre tetiklenen özel sohbet davetiyeleri oluşturun. Diyalog oranlarında %50’ye varan bir artış elde edin.' },
        { icon: 'fas fa-robot', title: 'Chatbot Destekli Canlı Destek Sistemi', description: 'Mortanas AI Chatbotları, web sitenizin ziyaretçileriyle 7/24 etkileşim kurar, SSS‘leri yanıtlar, kişileri toplar ve müşteri adaylarını kaybetmemenize yardımcı olur.' },
        { icon: 'fas fa-tachometer-alt', title: 'Hızlı Yanıtlar', description: 'Temsilcileriniz, hazır yanıtlar ve akıllı öneriler sayesinde müşterilere daha hızlı ve daha doğru yanıt verir.' },
        { icon: 'fas fa-user-clock', title: 'Müşteri Bilgisini Hatırlatma', description: 'İletişim bilgileri, konum, web sitesi ziyaret bilgileri Mortanas AI uygulamasında saklanır, böylece müşterilerinize bireysel bir yaklaşım sunarsınız.' },
        { icon: 'fas fa-binoculars', title: 'Ziyaretçi İzleme', description: 'Ziyaretçileri gerçek zamanlı olarak izleyin: kim olduklarını, nereden geldiklerini ve ne aradıklarını görün. Bu bilgileri kişisel bir teklif göndermek için kullanın.' },
        { icon: 'fas fa-chart-bar', title: 'Temsilci Performans Takibi', description: 'Hedef analizi için ortalama yanıt süresini, çalışma saatlerini ve çalışan etkinliğini gözden geçirin. Hizmetinizi nasıl daha iyi hale getirebileceğinizi öneriyoruz.' },
    ];
    
    const platforms = [
        { icon: 'fab fa-instagram', name: 'Instagram Yönetimi' },
        { icon: 'fab fa-whatsapp', name: 'WhatsApp Yönetimi' },
        { icon: 'fas fa-envelope', name: 'Gmail Yönetimi' },
        { icon: 'fab fa-facebook', name: 'Facebook Yönetimi' },
        { icon: 'fab fa-telegram', name: 'Telegram Yönetimi' },
        { icon: 'fas fa-globe', name: 'Web Site Yönetimi' },
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">CANLI DESTEK SİSTEMİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         En İyi Canlı Destek Sistemi ile <span className="text-blue-400">Kimse Cevapsız Kalmasın!</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI yapay zeka destekli canlı destek modülü ile artık cevaplar daha hızlı! Chatbot ile desteklenen bu modül ile siz de tanışın! Aradığınız cevabı Destek Sistemi’miz sizin için hazırlasın!
                      </p>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop" alt="Canlı Destek Sistemi" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Çok Kanallı ve Dinamik İletişim</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map(service => (
                     <div key={service.title} className="group">
                        <FeatureCard {...service} />
                     </div>
                  ))}
              </div>
            </div>
          </section>
          
           <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Favori Platformunuzu Tercih Edin</h2>
                    <p className="mt-4 text-slate-400">Tüm bu kanalları tek bir panelden yönetmek için bizimle iletişime geçin.</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                    {platforms.map(platform => (
                        <div key={platform.name} className="text-center group">
                            <i className={`${platform.icon} text-6xl text-slate-400 group-hover:text-blue-400 transition-colors duration-300`}></i>
                            <p className="mt-3 font-semibold text-white">{platform.name}</p>
                        </div>
                    ))}
                </div>
            </section>
          
          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Mortanas AI’yi 7 Gün Ücretsiz Kullanın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Tüm iletişim kanallarınızı tek bir yerden 360° yönetin. Kredi kartı gerekmez.
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

export default CanliDestekSistemiPage;
