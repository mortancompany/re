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

const BenefitItem: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <div className="flex-shrink-0 h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-5">
            <i className={`${icon} text-green-400 text-2xl`}></i>
        </div>
        <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
    </div>
);


const ETicaretCozumlerimizPage: React.FC = () => {
    
    const features = [
        { icon: 'fas fa-headset', title: '7/24 Chatbot Destek', description: 'Gelişmiş chatbot otomasyonu, müşterilerin sıkça sorduğu soruları anında yanıtlayarak satış sürecini hızlandırır ve destek ekibinizin yükünü hafifletir.' },
        { icon: 'fas fa-truck-fast', title: 'Yapay Zeka ile Sipariş Takibi', description: 'Sipariş durumu ve kargo bilgileri müşterilere otomatik olarak iletilir. Müşterileriniz siparişlerini gerçek zamanlı takip eder, memnuniyet artar.' },
        { icon: 'fas fa-file-signature', title: 'Hızlı Form Yönetimi', description: 'İade, değişim veya özel talepler için kolayca form oluşturun ve yönetim süreçlerinizi otomatikleştirin. Destek ekibiniz hızlı ve etkili yanıtlar verir.' },
        { icon: 'fas fa-calendar-alt', title: 'Dinamik Takvim Planlama', description: 'Kampanya başlangıç/bitiş tarihleri, stok yenileme gibi önemli süreçleri takvim üzerinde yönetin ve otomatik hatırlatmalarla operasyonel hataları önleyin.' },
        { icon: 'fas fa-boxes-stacked', title: 'Gerçek Zamanlı Stok Takibi', description: 'Stok seviyeleri gerçek zamanlı olarak takip edilir ve kritik seviyeye düştüğünde anında bildirim gönderilir, böylece satış kayıpları önlenir.' },
        { icon: 'fas fa-search-dollar', title: 'Anında Ürün Sorgulama', description: 'Müşterileriniz, fiyat, stok durumu ve teknik özellikler gibi ürün bilgilerini chatbot üzerinden anında öğrenerek satın alma kararlarını hızlandırır.' }
    ];
    
    const benefits = [
        { icon: 'fas fa-dollar-sign', title: 'Operasyonel Maliyetlerin Düşürülmesi', description: 'Manuel işleri otomatikleştirerek zaman ve kaynak tasarrufu sağlar.' },
        { icon: 'fas fa-smile', title: 'Müşteri Memnuniyetinin Artırılması', description: 'Hızlı ve doğru yanıtlarla müşteri deneyimini geliştirir.' },
        { icon: 'fas fa-chart-line', title: 'Satış Dönüşüm Oranlarının Yükseltilmesi', description: 'Otomasyon sayesinde müşterilere doğru zamanda doğru hizmet sunulur.' },
        { icon: 'fas fa-bolt', title: 'İş Süreçlerinin Hızlandırılması', description: 'Tek platform üzerinden tüm operasyonlarınızı kolayca yönetirsiniz.' },
        { icon: 'fas fa-shield-halved', title: 'Hataların ve Gecikmelerin Minimizasyonu', description: 'İnsan hatalarını azaltarak kesintisiz ve sorunsuz hizmet sağlar.' }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">E-TİCARET ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Yapay Zeka ile E-Ticarette <br/><span className="text-blue-400">Operasyonel Mükemmellik</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI e-ticaret yazılımıyla, chatbot otomasyonu, yapay zeka destekli asistan, stok kontrolü ve ürün sorgulamayı tek bir platformda birleştirin. İşlerinizi kolaylaştırın, müşteri memnuniyetinizi artırın.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="E-Ticaret Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          
          <section className="container mx-auto px-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-sm font-bold tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full uppercase">
                           PERFORMANS ODAKLI
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-4 mt-4">Geliştirilmiş Destek Performansı İçin <span className="text-blue-400">Yapay Zeka Desteği</span></h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                Mortanas AI, tüm iletişim kanallarınızı (WhatsApp, Instagram, Messenger, Telegram, web siteniz vb.) tek bir platformda birleştiren işlevsel bir çözümdür. ChatGPT-4 teknolojisi ile güçlendirilmiş yapay zeka sistemi, müşterilerinizden gelen mesajları hızlı, doğru ve kesintisiz bir şekilde yanıtlar.
                            </p>
                            <p>
                                Manuel süreçlerin gerektirdiği pek çok işi otomatikleştirerek, işletmenizin destek performansını ve iletişim kalitesini en üst seviyeye taşır.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://i.imgur.com/G5g2fA1.png" alt="Omnichannel İletişim" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">E-Ticaret Platformumuzun Temel Özellikleri</h2>
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

           <section className="bg-slate-800/50 py-24">
             <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">İşletmenize Sağladığı <span className="text-green-400">Faydalar</span></h2>
                     <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                       Platformumuz, operasyonel süreçlerdeki karmaşıklığı azaltarak zaman ve maliyet tasarrufu sağlar.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-6">
                    {benefits.map(benefit => (
                        <BenefitItem key={benefit.title} {...benefit} />
                    ))}
                </div>
             </div>
          </section>

            <ProblemSolutionGoalSection
                problem="Cevapsız kalan müşteri soruları, terk edilen sepetler ve 7/24 destek eksikliği doğrudan satış kaybına neden olur."
                solution="AI Chatbot ile anında ürün bilgisi sunar, terk edilmiş sepetleri hatırlatır ve 7/24 sipariş desteği sağlar."
                goal="Her ziyaretçiyi potansiyel bir müşteriye dönüştürmek, müşteri sadakatini artırmak ve satış dönüşüm oranlarını maksimize etmek."
            />
            
            <FomoCampaignSection />
          
           <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın sipariş takibi, ürün bilgisi ve iade süreçleri gibi konularda müşterilerinize nasıl yardımcı olduğunu görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, 12345 nolu siparişimin durumunu öğrenebilir miyim?' },
                    { sender: 'bot', message: 'Elbette, hemen kontrol ediyorum... Siparişiniz dün kargoya verilmiş ve şu anda yolda. Tahmini teslimat tarihi yarın.' },
                    { sender: 'user', message: 'Harika, teşekkürler!' },
                    { sender: 'bot', message: 'Rica ederim, başka bir konuda yardımcı olabilir miyim?' }
                ]}
                themeColor="green"
            />
            
            <WhyMortanasSection
                title="Neden E-Ticaret için Mortanas AI?"
                subtitle="Satışlarınızı artırırken operasyonel yükünüzü hafifleten, 7/24 çalışan akıllı satış ve destek asistanınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Kesintisiz Destek', description: 'Müşteri sorularını (sipariş durumu, iade, ürün bilgisi) anında yanıtlayarak destek ekibinizin yükünü %60\'a kadar azaltın.' },
                    { icon: 'fa-shopping-cart-arrow-down', title: 'Terk Edilmiş Sepet Kurtarma', description: 'Sepetini terk eden müşterilere WhatsApp veya e-posta üzerinden otomatik hatırlatmalar göndererek satışlarınızı %15\'e kadar artırın.' },
                    { icon: 'fa-wand-magic-sparkles', title: 'Akıllı Ürün Önerileri', description: 'Müşteri davranışlarını analiz ederek kişiselleştirilmiş ürün önerileri sunun, çapraz satış ve sepet ortalamasını yükseltin.' },
                    { icon: 'fa-comments-dollar', title: 'Tüm Kanallar Tek Yerde', description: 'WhatsApp, Instagram, web sitesi ve pazar yerlerinden gelen tüm müşteri iletişimini tek bir panelden yöneterek hiçbir fırsatı kaçırmayın.' }
                ]}
                themeColor="green"
            />

          <CustomerRetentionSection />

            <CampaignSection
                title="E-Ticarette Yılın Fırsatı"
                description="'Profesyonel' paketimizle 7/24 satış yapın, müşteri sadakatini artırın ve operasyonel yükünüzü hafifletin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={380}
                discountedPrice={320}
                themeColor="green"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="eticaret-cozumlerimiz" />

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">E-Ticaret İşletmenizi Geleceğe Taşıyın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın e-ticaret operasyonlarınızı nasıl dönüştürebileceğini görmek için uzman ekibimizden ücretsiz bir demo ve strateji danışmanlığı talep edin.
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

export default ETicaretCozumlerimizPage;
