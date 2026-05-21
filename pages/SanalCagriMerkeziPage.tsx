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

const SanalCagriMerkeziPage: React.FC = () => {
    
    const features = [
        { icon: 'fas fa-headset', title: 'Sohbet Penceresinden Çağrılar', description: 'Web sitenizdeki sohbet penceresi üzerinden ziyaretçilerle doğrudan sesli görüşme başlatın, ikna süreçlerinizi hızlandırın.' },
        { icon: 'fas fa-users-cog', title: 'Kullanıcı Dahili Eşleştirme', description: 'Ekipler arası koordinasyonu güçlendirin, çağrıları otomatik olarak doğru kişilere yönlendirin ve iç iletişimde şeffaflık sağlayın.' },
        { icon: 'fas fa-phone-alt', title: 'Çoklu Web Telefonu Desteği', description: 'Büyük ekipler için ideal! Birden fazla kullanıcı, aynı anda kendi web telefonlarını kullanarak çağrı yapabilir ve alabilir.' },
        { icon: 'fas fa-robot', title: 'Webphone Otomasyonları', description: 'İş süreçlerinizi optimize eden otomasyonlarla müşteri taleplerine anında yanıt verin ve personel verimliliğini artırın.' },
        { icon: 'fas fa-history', title: 'Genel Arama Kayıtları', description: 'Tüm kullanıcıların geçmiş çağrılarına merkezi bir ekrandan ulaşın, hiçbir detayı kaçırmayın.' },
        { icon: 'fas fa-mouse-pointer', title: 'Click to Call (Tıkla ve Ara)', description: 'Mortanas AI panelinizde bir numaraya tıklayın ve aramanın anında başlamasını sağlayın. Hız ve pratiklik bir arada.' },
        { icon: 'fas fa-list-alt', title: 'Dahili Listeleme ve Arama', description: 'İç iletişimde hız kazanın. Çalışanlarınızı numaralarını manuel olarak aramadan, hızlı bir arama ile bulun ve ulaşın.' },
        { icon: 'fas fa-id-card', title: 'Çağrı Anında Profil Gösterme', description: 'Bir çağrı geldiğinde, arayan kişinin tüm profil bilgileri (geçmiş görüşmeler, tercihler vb.) otomatik olarak ekranda belirir.' },
        { icon: 'fas fa-save', title: 'Ses Kaydı Saklama', description: 'Tüm görüşmeleri güvenli bir şekilde saklayın. Müşteri memnuniyeti analizi, eğitim ve kalite kontrol süreçleri için kullanın.' },
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">SANAL ÇAĞRI MERKEZİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Müşteri Deneyiminde <br/><span className="text-blue-400">Yeni Bir Dönem</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         İşletmenizin iletişim gücünü bir üst seviyeye taşıyın! Web tabanlı sanal çağrı merkezi çözümümüz ile hem ekibinizin verimliliğini artırın, hem de müşterilerinize hızlı, kesintisiz ve profesyonel bir iletişim deneyimi yaşatın.
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
                      <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" alt="Sanal Çağrı Merkezi" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Temel Özellikler</h2>
                  <p className="mt-4 text-slate-400">Donanım ve kurulum maliyeti olmadan, hemen kullanmaya başlayın.</p>
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

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Mortanas AI’yi 7 Gün Ücretsiz Kullanın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Tüm iletişim kanallarınızı tek bir yerden 360° yönetin. Denemek için kredi kartı gerekmez.
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

export default SanalCagriMerkeziPage;
