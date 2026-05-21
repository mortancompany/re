import React from 'react';
import { Link } from 'react-router-dom';
import SektorelPricingSection from '../components/SektorelPricingSection';
import CampaignSection from '../components/CampaignSection';
import CustomerRetentionSection from '../components/CustomerRetentionSection';
import WhyMortanasSection from '../components/WhyMortanasSection';
import ChatbotFlowSection from '../components/ChatbotFlowSection';
import ProblemSolutionGoalSection from '../components/ProblemSolutionGoalSection';
import FomoCampaignSection from '../components/FomoCampaignSection';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-blue-400">
        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-blue-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
    </div>
);

const FitnessCozumlerimizPage: React.FC = () => {
    
    const features = [
        { icon: 'fas fa-id-card', title: 'Üyelik ve Randevu Yönetimi', description: 'Müşteri kayıtlarını kolayca oluşturun, takvim ve randevularınızı tek panelden yönetin. Otomatik hatırlatmalarla iptalleri azaltın, doluluk oranınızı artırın.' },
        { icon: 'fas fa-comments', title: 'Chatbot ve Canlı Destek', description: 'WhatsApp, Instagram ve web sitenizden gelen soruları otomatik olarak yanıtlayın. Canlı destekle müşterilerinize anında ulaşın, iletişimi hızlandırın.' },
        { icon: 'fas fa-dumbbell', title: 'Antrenman ve Program Takibi', description: 'Antrenman planlarınızı ve programlarınızı kolayca optimize edin. Promosyonlar ve kampanyalarınızı tek bir yerden yönetin, satışlarınızı ve gelirlerinizi anlık olarak takip edin.' },
        { icon: 'fas fa-file-alt', title: 'Formlar ve Geri Bildirimler', description: 'Yeni üyeler için değerlendirme, mevcut üyeler için ilerleme ve memnuniyet formları kolayca toplanır ve analiz edilir.' }
    ];
    
    const detailedFeatures = [
        { icon: 'fas fa-calendar-check', title: 'Otomatik Randevu Yönetimi', description: 'WhatsApp veya web üzerinden gelen antrenman randevu taleplerine Mortanas AI anında yanıt verir ve rezervasyonu otomatik oluşturur.' },
        { icon: 'fas fa-sync-alt', title: 'Üyelik Yenileme Hatırlatmaları', description: 'Sistem, süresi dolmak üzere olan üyelikleri tespit eder ve SMS ile e-posta göndererek üyeleri bilgilendirir.' },
        { icon: 'fas fa-users-cog', title: 'Eğitmen-Etkinlik Atama', description: 'Yeni dersler veya özel etkinlikler sisteme eklendiğinde ilgili tüm üyelere otomatik bildirim gönderilir.' },
        { icon: 'fas fa-sitemap', title: 'Çok Kanallı İletişim Takibi', description: 'Instagram, WhatsApp, Messenger ve e-posta gibi farklı platformlardan gelen mesajlar tek panelde toplanır.' },
        { icon: 'fas fa-star', title: 'Otomatik Geri Bildirim', description: 'Ders sonrası üyelere otomatik memnuniyet formları gönderilir. Toplanan verilerle eğitmen performansı ve hizmet kalitesi ölçülür.' },
        { icon: 'fas fa-chart-bar', title: 'Eğitmen Performansını Anlık Takip', description: 'Yanıt süreleri, seans yoğunluğu ve birebir etkileşimler gibi verilerle ekip içi verimliliği artırın.' }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">FITNESS ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Fitness Merkezleri için Yapay Zeka Destekli <span className="text-blue-400">Yönetim Programı</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Üyelik, randevu, antrenman ve iletişim süreçlerinizi tek panelden yönetin. Eğitmenler, stüdyolar ve spor salonları için dijital altyapı.
                      </p>
                       <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Demo Talep Edin!
                          </Link>
                           <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-block">
                              Chatbotu Deneyin!
                          </a>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop" alt="Fitness Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map(service => (
                     <div key={service.title} className="group">
                        <FeatureCard {...service} />
                     </div>
                  ))}
              </div>
            </div>
          </section>

          <section className="container mx-auto px-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">MERKEZİ BİLGİ AKIŞI: <span className="text-blue-400">Tüm Üye Etkileşimleri Tek Ekranda</span></h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                Eğitmenler, danışmanlar ve yöneticiler için iletişim artık daha düzenli. Mortanas AI, üyelerinizin tüm etkileşim geçmişini tek bir yerde toplar: kayıtlar, sorular, satın alımlar ve bildirimler sade bir zaman akışıyla sunulur. Böylece hiçbir detay gözden kaçmaz, iletişim daha hızlı ve şeffaf ilerler.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://i.imgur.com/G5g2fA1.png" alt="Merkezi Yönetim Paneli" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
          </section>

           <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Otomasyon Altyapısı</h2>
                </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {detailedFeatures.map(feature => (
                        <div key={feature.title} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border-t-4 border-blue-500 shadow-xl">
                            <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                <i className={`${feature.icon} text-blue-400 text-3xl`}></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-white">{feature.title}</h3>
                                <p className="text-slate-300">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            <ProblemSolutionGoalSection
                problem="Üyelik yenileme takibi, ders programı hakkında bilgi verme ve yeni üye kayıtları gibi idari işler zaman alır."
                solution="Üyelik yenilemelerini otomatik hatırlatır, ders programlarını anlık sunar ve online üyelik kaydı alarak tüm süreci kolaylaştırır."
                goal="İdari yükü azaltarak antrenörlerin üyelere odaklanmasını sağlamak, üye devamlılığını ve memnuniyetini artırmak."
            />

            <FomoCampaignSection />

            <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın üyelik bilgisi verdiğini, ders programını paylaştığını ve kişisel antrenör randevusu aldığını görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, aylık üyelik ücretiniz nedir?' },
                    { sender: 'bot', message: 'Merhaba! Aylık sınırsız üyelik paketimiz 1500 TL\'dir. Ayrıca 3, 6 ve 12 aylık avantajlı paketlerimiz de mevcut. İlgilenir misiniz?' },
                    { sender: 'user', message: 'Harika. Can Hoca\'dan özel ders alabilir miyim?' },
                    { sender: 'bot', message: 'Elbette. Can Hoca için en yakın uygun tarih yarın 18:00. Sizin için rezerve edeyim mi?' }
                ]}
                themeColor="blue"
            />
            
            <WhyMortanasSection
                title="Neden Fitness Sektörü için Mortanas AI?"
                subtitle="Üye memnuniyetini artırırken, operasyonel verimliliği en üst düzeye çıkaran ve doluluğunuzu optimize eden enerjik çözüm ortağınız."
                points={[
                    { icon: 'fa-calendar-check', title: '7/24 Randevu ve Kayıt', description: 'Potansiyel üyelerinize 7/24 online kayıt ve ders rezervasyonu imkanı sunarak hiçbir fırsatı kaçırmayın. Telefon trafiğiniz azalsın.' },
                    { icon: 'fa-sync-alt', title: 'Otomatik Üyelik Yönetimi', description: 'Üyelik bitiş tarihlerini otomatik olarak takip edin ve kişiselleştirilmiş yenileme hatırlatmaları ile üye kaybını (churn) önleyin.' },
                    { icon: 'fa-bullhorn', title: 'Hedefli İletişim', description: 'Yeni dersleri, kampanyaları veya özel etkinlikleri doğru üye segmentlerine (örn: sadece pilates üyeleri) anında duyurun.' },
                    { icon: 'fa-comments-dollar', title: 'Tüm Kanallar Tek Yerde', description: 'WhatsApp, Instagram ve web sitenizden gelen tüm üye ve potansiyel üye iletişimini tek bir panelden yöneterek verimliliği artırın.' }
                ]}
                themeColor="blue"
            />

            <CustomerRetentionSection />

            <CampaignSection
                title="Formda Kalma Fırsatı"
                description="'Spor Salonu' paketimizle üye ve ders yönetimini dijitalleştirin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={220}
                discountedPrice={185}
                themeColor="blue"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="fitness-cozumlerimiz" />

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Spor Salonunuzu Dijitalleştirin</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın fitness merkezinizi nasıl daha verimli, üye odaklı ve kârlı hale getirebileceğini görmek için uzmanlarımızdan ücretsiz bir demo talep edin.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/kurumsal#iletisim" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                            Ücretsiz Demo Talep Et
                        </Link>
                    </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default FitnessCozumlerimizPage;
