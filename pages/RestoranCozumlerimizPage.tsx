import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { FAQ } from '../types';
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

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-blue-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-5"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </div>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-300">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};


const RestoranCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const whatWeOffer = [
        { icon: 'fas fa-calendar-alt', title: 'Online Rezervasyon Yönetimi', description: 'Müşteriler, web sitesi, sosyal medya veya WhatsApp üzerinden saniyeler içinde masa rezervasyonu yapabilir. Tüm talepler tek bir panelden kolayca yönetilir.' },
        { icon: 'fas fa-truck', title: 'Sipariş Takibi ve Bildirimler', description: 'Müşterilere sipariş durumu, hazırlık ve teslim süresi hakkında anlık bildirimler otomatik gönderilir. Böylece müşterilerin bekleme süreci daha şeffaf olur.' },
        { icon: 'fas fa-question-circle', title: 'Sık Sorulan Soruların Otomatik Yanıtlanması', description: 'Çalışma saatleri, konum bilgisi, menü içerikleri veya ödeme seçenekleri gibi sık sorulan sorular müşterilere anında yanıtlanır.' },
        { icon: 'fas fa-bullhorn', title: 'Kampanya ve Promosyon Duyuruları', description: 'Kampanyalar, indirimler ve özel gün fırsatları müşterilere otomatik olarak iletilir. Katılım ve satışlar artar.' },
        { icon: 'fas fa-comments', title: 'Müşteri Geri Bildirim Toplama', description: 'Yemek ve hizmet sonrası chatbot aracılığıyla kısa anketler yapılır. Toplanan veriler, hizmet kalitesini geliştirmek için analiz edilir.' },
        { icon: 'fas fa-book-open', title: 'Menü Bilgilendirme ve Öneri Sistemi', description: 'Chatbot, menüdeki ürünleri tanıtır, alerjen bilgilerini verir ve popüler yemekleri önerir. Müşteriler menüye kolayca hakim olur.' },
        { icon: 'fas fa-globe', title: 'Çok Dilli Müşteri Desteği', description: 'Yabancı turistlere menü tanıtımı ve sipariş desteği farklı dillerde sağlanır. Bu sayede uluslararası müşteri memnuniyeti artar.' },
        { icon: 'fas fa-hand-holding-heart', title: 'Sadakat Programı Entegrasyonu', description: 'Müşterilere indirim hakları ve üyelik avantajları hakkında düzenli bilgi verilir. Bu, müşteri bağlılığını güçlendirir.' }
    ];

    const faqs = [
        { question: "Mortanas AI nedir?", answer: "Mortanas AI, yapay zeka destekli chatbot, otomasyon, form yönetimi, takvim, stok kontrolü gibi iş süreçlerini tek bir platformda toplayan kapsamlı bir dijital asistan ve otomasyon çözümüdür." },
        { question: "Mortanas AI chatbotu 7/24 hizmet veriyor mu?", answer: "Evet, yapay zeka destekli chatbotlarımız 7/24 aktiftir ve müşterilerinizin sorularına anında yanıt verir." },
        { question: "Randevu ve takvim yönetimi nasıl çalışıyor?", answer: "Entegre takvim sistemi, restoranınızın uygunluk durumuna göre müşterilerin online olarak rezervasyon yapmasını sağlar ve çakışmaları otomatik olarak önler." },
        { question: "Mortanas AI’yı kullanmak için teknik bilgi gerekiyor mu?", answer: "Hayır, platformumuz kullanıcı dostu bir arayüze sahiptir. Kurulum ve eğitim süreçlerinde uzman ekibimiz size tam destek sağlar." },
        { question: "Restoran yapay zeka sohbet robotu nedir?", answer: "Restoranınız için özel olarak tasarlanmış, rezervasyon alma, menü hakkında bilgi verme, sipariş takibi gibi işlemleri otomatik olarak gerçekleştiren bir yapay zeka asistanıdır." }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">RESTORAN & KAFE ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Restoranlar İçin <br/><span className="text-blue-400">Yapay Zeka Rezervasyon Sistemi</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI, restoranların müşteri iletişimini hızlandırır, sipariş ve rezervasyon süreçlerini kolaylaştırır. Yapay zeka destekli canlı destek ile müşteri memnuniyetini artırırken operasyonel verimlilik sağlar.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Restoran Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Size Ne Katabilir?</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">İşletmeniz Mortanas AI ile güvenilir ellerde.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="text-center">
                        <i className="fas fa-qrcode text-8xl text-blue-400 mb-6"></i>
                        <h2 className="text-3xl font-bold text-white mb-4">Dijital Menü ve <span className="text-blue-400">Temassız Sipariş</span></h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                              Müşteriler, masalarındaki QR kodunu tarayarak restoran menüsüne kolayca erişebilir ve temassız sipariş verebilir. Bu dijital sistem, fiziksel menü kullanımını ortadan kaldırarak hijyenik bir deneyim sağlar. Siparişler doğrudan mutfağa iletilir, böylece hatalar azalır ve servis süresi hızlanır.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://i.imgur.com/G5g2fA1.png" alt="Dijital Menü" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
          </section>

            <ProblemSolutionGoalSection
                problem="Yoğun saatlerde rezervasyon telefonlarına cevap verememek, menü hakkında sürekli aynı soruları yanıtlamak ve paket sipariş takibi operasyonel karmaşa yaratır."
                solution="7/24 online rezervasyon alır, dijital menü sunar ve sipariş durumunu otomatik olarak bildirir."
                goal="Masa doluluğunu optimize etmek, personel verimliliğini artırmak ve kusursuz bir müşteri deneyimi sunarak tekrar ziyaretleri teşvik etmek."
            />
            
            <FomoCampaignSection />

          <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın rezervasyon aldığını, menü hakkında bilgi verdiğini ve özel talepleri nasıl yönettiğini görün."
                qrCodeUrl="https://i.imgur.com/S6MhH7J.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, bu akşam için 2 kişilik rezervasyon yaptırmak istiyorum.' },
                    { sender: 'bot', message: 'Merhaba! Elbette. Saat kaç için düşünüyorsunuz? Teras ve iç mekan seçeneklerimiz mevcuttur.' },
                    { sender: 'user', message: '20:30, teras lütfen.' },
                    { sender: 'bot', message: 'Harika! Bu akşam 20:30 için terasta 2 kişilik rezervasyonunuzu oluşturdum. Sizi ağırlamaktan mutluluk duyarız!' }
                ]}
                themeColor="orange"
            />
            
            <WhyMortanasSection
                title="Neden Restoranlar için Mortanas AI?"
                subtitle="Müşteri memnuniyetini artırırken, operasyonel verimliliği en üst düzeye çıkaran ve masa doluluğunuzu optimize eden lezzetli çözüm ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Rezervasyon Asistanı', description: 'Telefonlarınız meşgulken veya işletmeniz kapalıyken bile web siteniz ve sosyal medya üzerinden 7/24 rezervasyon alarak hiçbir müşteriyi kaçırmayın.' },
                    { icon: 'fa-motorcycle', title: 'Akıllı Paket Sipariş Yönetimi', description: 'WhatsApp ve diğer kanallardan gelen paket sipariş taleplerini otomatik olarak alın, onaylayın ve mutfağa ileterek süreci hızlandırın.' },
                    { icon: 'fa-comments', title: 'Anında Müşteri Geri Bildirimi', description: 'Yemek sonrası müşterilerinize otomatik olarak memnuniyet anketleri gönderin, hizmet kalitenizi anlık verilerle takip edin ve geliştirin.' },
                    { icon: 'fa-bullhorn', title: 'Hedefli Kampanya Yönetimi', description: 'Müşteri verilerinize göre (örn: doğum günleri, özel günler) kişiselleştirilmiş kampanya ve indirimleri otomatik olarak göndererek sadakati artırın.' }
                ]}
                themeColor="orange"
            />

            <CustomerRetentionSection />

            <CampaignSection
                title="Lezzetli Bir Teklif"
                description="'Profesyonel' paketimizle rezervasyonları ve siparişleri otomatize edin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={250}
                discountedPrice={210}
                themeColor="orange"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="restoran-cozumlerimiz" />

          <section className="bg-slate-900 py-24">
              <div className="container mx-auto px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                  </div>
                  <div className="max-w-4xl mx-auto space-y-4">
                      {faqs.map((faq, index) => (
                          <FAQItem
                              key={index}
                              faq={faq}
                              isOpen={openFaqIndex === index}
                              onClick={() => handleFaqClick(index)}
                          />
                      ))}
                  </div>
              </div>
          </section>

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Restoranınızı Dijital Çağa Taşıyın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın restoran operasyonlarınızı nasıl optimize edebileceğini ve müşteri memnuniyetini nasıl zirveye taşıyabileceğinizi öğrenmek için bugün ücretsiz bir demo talep edin.
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

export default RestoranCozumlerimizPage;
