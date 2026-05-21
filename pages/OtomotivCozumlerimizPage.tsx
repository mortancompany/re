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


const OtomotivCozumlerimizPage: React.FC = () => {
    
    const whatWeOffer = [
        { icon: 'fas fa-headset', title: 'Satış Sonrası Servis Hatırlatmaları', description: 'Müşterilere periyodik bakım, araç muayenesi ve garanti süresi bitiş tarihleri otomatik olarak hatırlatılır. Böylece servis randevuları aksatılmaz ve müşteri sadakati güçlenir.' },
        { icon: 'fas fa-car', title: 'Test Sürüşü Randevu Yönetimi', description: 'Potansiyel müşteriler, web sitesi veya yapay zeka destekli sohbet robotu üzerinden hızlıca test sürüşü randevusu alabilir. Sistem, uygun tarih ve saatleri otomatik olarak sunar.' },
        { icon: 'fas fa-bullhorn', title: 'Kampanya ve Lansman Duyuruları', description: 'Yeni araç modelleri, sezon indirimleri veya özel kampanyalar anında hedef kitleye iletilir. Böylece marka farkındalığı ve satış hacmi yükselir.' },
        { icon: 'fas fa-globe', title: 'Çok Dilli Müşteri Desteği', description: 'Yabancı müşteriler, kendi dillerinde araç bilgisi alabilir ve destek alabilir. Bu sayede uluslararası müşteri memnuniyeti artar.' },
        { icon: 'fas fa-truck', title: 'Araç Teslimat Süreci Takibi', description: 'Satın alınan araçların teslimat aşamaları hakkında müşterilere düzenli bildirimler gönderilir. Teslim tarihleri ve evrak durumları şeffaf şekilde paylaşılır.' },
        { icon: 'fas fa-comments', title: 'Müşteri Geri Bildirimi Toplama', description: 'Servis, satış veya araç teslimatı sonrası otomatik memnuniyet anketleri gönderilir. Toplanan geri bildirimler analiz edilerek hizmet kalitesi sürekli geliştirilir.' }
    ];
    
    const idealFor = [
        { icon: 'fas fa-car-side', name: 'Otomotiv Bayileri' },
        { icon: 'fas fa-key', name: 'Araç Kiralama Şirketleri' },
        { icon: 'fas fa-tools', name: 'Yetkili Servis Merkezleri' },
        { icon: 'fas fa-cogs', name: 'Yedek Parça Tedarikçileri' },
    ];
    
    const logos = [
        { name: "Ford", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png"},
        { name: "Mercedes-Benz", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png"},
        { name: "BMW", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"},
        { name: "Toyota", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_car_logo.svg/2560px-Toyota_car_logo.svg.png"},
        { name: "Volkswagen", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png"},
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">OTOMOTİV ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Otomotiv Sektörü için <br/><span className="text-blue-400">Yapay Zeka Sohbet Robotu</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Yapay zeka sohbet robotu, otomotiv müşterilerine 7/24 hızlı ve doğru yanıt vererek araç tanıtımı, test sürüşü randevusu ve servis işlemlerini kolayca yönetir.
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
                      <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" alt="Otomotiv Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          
           <section className="container mx-auto px-8">
            <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Bu Yenilikçi Otomotiv <br/> Organizasyonlarına Katılın</h2>
              </div>
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                    {logos.map(logo => (
                        <img key={logo.name} src={logo.url} alt={logo.name} className="h-12 md:h-16 object-contain filter grayscale hover:grayscale-0 brightness-0 invert hover:brightness-100 transition-all duration-300"/>
                    ))}
                </div>
           </section>

          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Size Neler Sunuyoruz?</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {whatWeOffer.map(service => (
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
                        <h2 className="text-3xl font-bold text-white mb-4"><span className="text-blue-400">Sorunsuz Entegrasyon</span> ve Akıllı Otomasyon</h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                               Mortanas AI, otomotiv sektöründeki satış, servis ve müşteri ilişkileri süreçlerini tek bir akıllı platformda birleştirerek işletmelere yüksek verimlilik sağlar. Mevcut CRM, servis randevu, test sürüşü planlama ve canlı destek sistemleriyle sorunsuz entegre olur.
                            </p>
                            <p>
                               Bu sayede müşterilere araç tanıtımı, bakım hatırlatmaları ve kampanya bilgilendirmeleri otomatik olarak iletilir. Yapay zeka destekli analizler sayesinde talep tahminleri yapılabilir, stok yönetimi optimize edilir ve müşteri memnuniyeti her temas noktasında artırılır.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://i.imgur.com/G5g2fA1.png" alt="Entegrasyon ve Otomasyon" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
          </section>

          <section className="container mx-auto px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Kimler Faydalanabilir?</h2>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {idealFor.map((target) => (
                    <div key={target.name} className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-transparent hover:border-blue-500 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex-shrink-0 h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                 <i className={`${target.icon} text-blue-400 text-4xl`}></i>
                            </div>
                            <h4 className="font-bold text-white mt-6 text-lg">{target.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
          </section>

            <ProblemSolutionGoalSection
                problem="Test sürüşü randevularını organize etmek, servis hatırlatmalarını manuel yapmak ve müşteri sorularını anlık yanıtlayamamak fırsat kaybına yol açar."
                solution="Otomatik test sürüşü planlaması, proaktif servis hatırlatmaları ve 7/24 çalışan AI asistanı ile tüm süreci dijitalleştirir."
                goal="Satış ve servis süreçlerini hızlandırarak müşteri memnuniyetini artırmak ve marka sadakatini güçlendirmek."
            />
            
            <FomoCampaignSection />
          
            <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın test sürüşü randevusu planlama, araç bilgisi verme ve servis süreçlerini nasıl yönettiğini görün."
                qrCodeUrl="https://i.imgur.com/S6MhH7J.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, yeni X modeli için test sürüşü randevusu almak istiyorum.' },
                    { sender: 'bot', message: 'Harika bir seçim! Test sürüşü için bu hafta içi her gün 10:00-16:00 arası, hafta sonu ise 11:00-15:00 arası müsaittir. Sizin için uygun bir zaman var mı?' },
                    { sender: 'user', message: 'Cumartesi 14:00 uygun.' },
                    { sender: 'bot', message: 'Randevunuz Cumartesi 14:00 olarak oluşturulmuştur. Bayimize bekliyoruz. İyi günler!' }
                ]}
                themeColor="blue"
            />

            <WhyMortanasSection
                title="Neden Otomotiv Sektörü için Mortanas AI?"
                subtitle="Satış fırsatlarını artırırken, servis sadakatini güçlendiren ve operasyonel verimliliği maksimize eden akıllı çözüm ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Potansiyel Müşteri Yönetimi', description: 'Web sitenizden veya sosyal medyadan gelen test sürüşü ve bilgi taleplerini 7/24 karşılayarak hiçbir satış fırsatını kaçırmayın.' },
                    { icon: 'fa-tools', title: 'Proaktif Servis Hatırlatmaları', description: 'Periyodik bakım ve muayene zamanlarını otomatik olarak hatırlatarak servis doluluğunuzu ve müşteri sadakatinizi artırın.' },
                    { icon: 'fa-car-side', title: 'Akıllı Araç Eşleştirme', description: 'Müşterinin ihtiyaçlarını (bütçe, model, yakıt tipi) anlayarak portföyünüzdeki en uygun araçları proaktif olarak önerin.' },
                    { icon: 'fa-comments-dollar', title: 'Entegre İletişim', description: 'Satış, servis, sigorta ve finans departmanları arasındaki iletişimi tek bir platformda birleştirerek kusursuz bir müşteri deneyimi sunun.' }
                ]}
                themeColor="blue"
            />
          
          <CustomerRetentionSection />
          
            <CampaignSection
                title="Otomotiv Sektörüne Özel Teklif"
                description="'Profesyonel' paket ile müşteri ilişkilerini ve servis randevularını dijitalleştirin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={400}
                discountedPrice={340}
                themeColor="blue"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="otomotiv-cozumlerimiz" />

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Otomotivde Dijital Devrime Katılın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                     Mortanas AI'ın otomotiv işletmenizi nasıl dönüştürebileceğini görmek için uzman ekibimizden ücretsiz bir demo ve strateji danışmanlığı talep edin.
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

export default OtomotivCozumlerimizPage;
