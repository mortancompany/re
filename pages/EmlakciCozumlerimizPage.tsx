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

const EmlakciCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const features = [
        { icon: 'fas fa-comments-dollar', title: 'Chatbot ile 7/24 Müşteri İletişimi', description: 'Kullanıcılar günün her saatinde sisteme bağlanarak fiyat, oda sayısı, konum veya ilan detaylarını öğrenebilir. Danışmanların iş yükünü azaltır.' },
        { icon: 'fas fa-search-location', title: 'İlan Eşleştirme ve Akıllı Öneriler', description: 'Müşteri kriterlerini analiz ederek uygun ilanları otomatik öne çıkarır. İlgisiz ilanlarla uğraşılmaz, satış süreci hızlanır.' },
        { icon: 'fas fa-cogs', title: 'Otomasyon ile Süreç Kolaylığı', description: 'Randevu planlama, evrak bilgilendirmeleri, hatırlatma mesajları veya onay adımları otomatik şekilde yapılır. Hata riski azalır.' },
        { icon: 'fas fa-user-shield', title: 'Satış Sonrası Destek ve Takip', description: 'Tapu işlemleri, abonelik başvuruları, kredi süreçleri veya taşınma adımlarında müşteriye otomatik bilgilendirme yapılır, sadakat güçlenir.' },
        { icon: 'fas fa-chart-pie', title: 'Veri Analizi ve Stratejik Raporlama', description: 'Hangi bölgelerin daha çok ilgi gördüğünü, hangi fiyat aralıklarının öne çıktığını analiz ederek reklam yatırımlarını doğru yönlendirir.' },
        { icon: 'fas fa-handshake', title: 'Müşteri İlişkileri ve Sürekli İletişim', description: 'Fiyat değişiklikleri, yeni ilanlar veya portföy güncellemeleri olduğunda otomatik bildirim gönderir. Müşteriyle bağ kuvvetlenir.' }
    ];

    const faqs = [
        { question: "Mortanas AI nedir?", answer: "Mortanas AI, yapay zeka destekli chatbot, otomasyon, form yönetimi, takvim gibi iş süreçlerini tek bir platformda toplayan kapsamlı bir dijital asistan ve otomasyon çözümüdür." },
        { question: "Mortanas AI chatbotu 7/24 hizmet veriyor mu?", answer: "Evet, yapay zeka destekli chatbotlarımız 7/24 aktiftir ve potansiyel müşterilerinizin sorularına anında yanıt verir." },
        { question: "Randevu ve takvim yönetimi nasıl çalışıyor?", answer: "Entegre takvim sistemi, danışmanlarınızın uygunluk durumuna göre müşterilerin online olarak ev gösterimi randevusu almasını sağlar ve çakışmaları otomatik olarak önler." },
        { question: "Mortanas AI’yı kullanmak için teknik bilgi gerekiyor mu?", answer: "Hayır, platformumuz kullanıcı dostu bir arayüze sahiptir ve tüm kurulumu biz yönetiriz." }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">EMLAKÇI ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Emlak Chatbotu ile
                         <br/><span className="text-blue-400">7/24 Potansiyel Müşteri Yönetimi</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI, emlak ofisleri için geliştirilmiş yapay zeka sohbet robotu ile müşteri iletişimini anında kurar, potansiyel alıcıları 7/24 yönetir ve danışmanlarınızın iş yükünü hafifletir.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1560518883-ce09059ee41F?q=80&w=1973&auto=format&fit=crop" alt="Emlak Sektörü Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Temel Özellikler</h2>
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
          
            <ProblemSolutionGoalSection
                problem="7/24 ilan sorularını yanıtlayamamak, ciddi alıcıları filtreleyememek ve randevu organizasyonu zaman kaybına yol açar."
                solution="AI asistanı ile 7/24 potansiyel müşteri taleplerini karşılar, alıcı kriterlerine göre ilan önerir ve randevuları otomatik planlar."
                goal="Danışmanların zamanını sadece nitelikli alıcılara ayırmasını sağlamak, satış süreçlerini hızlandırmak ve portföy yönetimini verimli hale getirmek."
            />
            
            <FomoCampaignSection />

          <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın potansiyel alıcıları nasıl karşıladığını, onlara nasıl uygun ilanlar sunduğunu ve randevu aldığını görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, Beşiktaş\'ta 3+1 kiralık daire arıyorum.' },
                    { sender: 'bot', message: 'Merhaba! Elbette yardımcı olabilirim. Bütçeniz ne kadar? Beşiktaş\'ta şu an portföyümüzde 3 adet 3+1 daire mevcut.' },
                    { sender: 'user', message: '40.000 TL civarı.' },
                    { sender: 'bot', message: 'Anladım. Bütçenize uygun 2 dairemiz var. Bir tanesi Akaretler\'de, diğeri Ihlamur\'da. Daireleri görmek için bir randevu oluşturalım mı?' }
                ]}
                themeColor="blue"
            />
            
            <WhyMortanasSection
                title="Neden Emlakçılar için Mortanas AI?"
                subtitle="Daha fazla potansiyel müşteri, daha hızlı satışlar ve daha verimli danışmanlar için geliştirilmiş akıllı çözüm ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Potansiyel Müşteri Avcısı', description: 'Web sitenizden ve sosyal medyadan gelen ilan taleplerini 7/24 karşılayarak hiçbir alıcı veya kiracı adayını kaçırmayın.' },
                    { icon: 'fa-search-location', title: 'Akıllı İlan Eşleştirme', description: 'Müşterinin aradığı kriterleri (oda sayısı, metrekare, konum vb.) anlayarak en uygun ilanları portföyünüzden anında önerin.' },
                    { icon: 'fa-calendar-check', title: 'Otomatik Randevu Planlama', description: 'Danışmanlarınızın takvimleriyle entegre çalışarak, mülk gösterme randevularını otomatik olarak ve çakışma olmadan ayarlayın.' },
                    { icon: 'fa-user-clock', title: 'Danışmanlara Zaman Kazandırın', description: 'Tekrarlayan soruları ve ön eleme sürecini otomatize ederek danışmanlarınızın sadece ciddi alıcılara odaklanmasını sağlayın.' }
                ]}
                themeColor="blue"
            />

          <CustomerRetentionSection />
          
            <CampaignSection
                title="Kazançlı Yatırım Fırsatı"
                description="'Ofis' paketimizle potansiyel müşteri ve portföy yönetimini birleştirin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={280}
                discountedPrice={235}
                themeColor="blue"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="emlakci-cozumlerimiz" />

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
                   <h2 className="text-3xl font-bold mb-4">Emlak İşinizi Dijitalleştirin</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın emlak ofisinizi nasıl daha verimli ve kârlı hale getirebileceğini görmek için uzmanlarımızdan ücretsiz bir demo talep edin.
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

export default EmlakciCozumlerimizPage;
