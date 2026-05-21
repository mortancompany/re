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
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-pink-400">
        <div className="flex-shrink-0 h-16 w-16 bg-pink-500/10 rounded-xl flex items-center justify-center mb-5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-pink-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
    </div>
);

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-pink-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-5"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
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

const GuzellikSalonuCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const features = [
        { icon: 'fas fa-id-card', title: 'Üyelik ve Randevu Yönetimi', description: 'Müşteri kayıtlarını kolayca oluşturun, takvim ve randevularınızı tek panelden yönetin. Otomatik hatırlatmalarla iptalleri azaltın, doluluk oranınızı artırın.' },
        { icon: 'fas fa-comments', title: 'Chatbot ve Canlı Destek', description: 'WhatsApp, Instagram ve web sitenizden gelen soruları otomatik olarak yanıtlayın. Canlı destekle müşterilerinize anında ulaşın, iletişimi hızlandırın.' },
        { icon: 'fas fa-tags', title: 'Hizmet Paketleri ve Satış Takibi', description: 'Bakım paketleri, promosyonlar ve kampanyalarınızı kolayca yönetin. Satış takibini tek panelden yapın, gelirlerinizi anlık görüntüleyin.' },
        { icon: 'fas fa-file-alt', title: 'Formlar ve Geri Bildirimler', description: 'Müşteri memnuniyet anketlerini kolayca oluşturun, hizmet sonrası geri dönüşleri takip edin ve salon deneyiminizi sürekli geliştirin.' }
    ];
    
     const detailedFeatures = [
        { icon: 'fas fa-calendar-check', title: 'Akıllı Randevu ve Hatırlatma Sistemi', description: 'WhatsApp veya web sitenizden gelen tüm randevu talepleri tek panelde toplanır, otomatik onaylanır ve hatırlatma mesajları müşterinize zamanında iletilir.' },
        { icon: 'fas fa-sitemap', title: 'Çok Kanallı Müşteri Mesaj Yönetimi', description: 'Instagram DM, WhatsApp ve Messenger üzerinden gelen tüm mesajlar tek ekranda toplanır. Hiçbir müşteri talebi gözden kaçmaz.' },
        { icon: 'fas fa-robot', title: '7/24 Chatbot ile Anında Yanıt', description: 'Chatbot, fiyat bilgisi, kampanya detayları ve hizmet açıklamalarını otomatik olarak yanıtlar. Müşterileriniz ihtiyaç duyduğu bilgiye anında ulaşır.' },
        { icon: 'fab fa-whatsapp', title: 'Toplu WhatsApp Kampanyaları', description: 'Müşterilerinize toplu fakat kişiselleştirilmiş kampanya mesajları gönderin. Bakım paketleri, yeni hizmetler ve özel indirimler tek tıkla binlerce müşteriye ulaşır.' },
    ];

    const faqs = [
        { question: "Mortanas AI Güzellik Salonu Programı hangi süreçleri otomatikleştirir?", answer: "Güzellik Salonu Programı; müşteri kayıtları, online randevu yönetimi, otomatik hatırlatma mesajları, WhatsApp ve sosyal medya entegrasyonu, kampanya bildirimi ve satış takibi gibi birçok süreci tek panelden yönetmenizi sağlar." },
        { question: "Müşterilerimle nasıl iletişim kurabilirim?", answer: "Platform, WhatsApp, Instagram, Facebook Messenger gibi popüler kanalları tek bir gelen kutusunda birleştirir. Ayrıca toplu WhatsApp ve SMS kampanyaları da oluşturabilirsiniz." },
        { question: "Chatbot neleri yapabilir?", answer: "Chatbot; 7/24 randevu alabilir, hizmetleriniz ve fiyatlarınız hakkında bilgi verebilir, sıkça sorulan soruları yanıtlayabilir ve hatta kampanya duyuruları yapabilir." },
        { question: "Otomatik bildirim sistemi nasıl çalışır?", answer: "Sistem, müşterilerinizin randevu geçmişini ve ilgi alanlarını analiz ederek yaklaşan randevuları, özel günleri veya uzun süredir gelmediklerini tespit edip kişiselleştirilmiş hatırlatma ve kampanya mesajları gönderir." },
        { question: "Programı kullanmak için teknik bilgiye ihtiyacım var mı?", answer: "Hayır, platformumuz son derece kullanıcı dostudur. Kurulumdan sonra alacağınız kısa bir eğitimle tüm özellikleri kolayca yönetmeye başlayabilirsiniz." },
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-pink-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-pink-300 bg-pink-500/20 px-3 py-1.5 rounded-full uppercase">GÜZELLİK SALONU ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Güzellik Salonu Programı: <span className="text-pink-400">Yapay Zeka ile Randevu ve Müşteri Yönetimi</span>
                      </h1>
                      <p className="mt-6 text-lg text-pink-200">
                         Yapay zeka destekli güzellik salonu programı ile randevu yönetimini kolaylaştırın, müşteri sorularına hızlı yanıt verin ve memnuniyeti artırın.
                      </p>
                       <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                          <Link to="/kurumsal#iletisim" className="bg-pink-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105 inline-block">
                              7 Gün Ücretsiz Deneyin!
                          </Link>
                           <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-block">
                              Örnek Chatbotu Test Edin
                          </a>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-pink-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1600965962102-17731765914a?q=80&w=2070&auto=format&fit=crop" alt="Güzellik Salonu Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
            <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">✨Siz Güzelliğe Odaklanın, Biz Yönetimi Halledelim✨</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(service => (
                        <div key={service.title} className="group">
                            <FeatureCard {...service} />
                        </div>
                    ))}
                </div>
            </section>
          
           <section className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Akıllı Yönetim Özellikleri</h2>
                </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {detailedFeatures.map(feature => (
                        <div key={feature.title} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border-t-4 border-pink-500 shadow-xl">
                            <div className="flex-shrink-0 h-16 w-16 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
                                <i className={`${feature.icon} text-pink-400 text-3xl`}></i>
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
                problem="Sürekli çalan randevu telefonları hizmet kalitesini düşürür, 'no-show'lar gelir kaybına neden olur ve kampanya duyuruları etkisiz kalır."
                solution="7/24 online randevu alır, otomatik hatırlatmalarla 'no-show'ları azaltır ve kişiselleştirilmiş kampanyalarla müşterileri geri kazanır."
                goal="Salon doluluğunu maksimize etmek, personelin müşteriye odaklanmasını sağlamak ve her müşteriyi sadık bir müdavime dönüştürmek."
            />
            
            <FomoCampaignSection />
          
            <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın randevu alma, hizmet bilgisi verme ve kampanya duyurma gibi süreçleri nasıl yönettiğini görün."
                qrCodeUrl="https://i.imgur.com/GHYp627.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, manikür için randevu alabilir miyim?' },
                    { sender: 'bot', message: 'Elbette! Bu hafta Cuma günü 15:00 ve 17:30\'da uygun yerimiz var. Hangisini tercih edersiniz?' },
                    { sender: 'user', message: '15:00 olsun.' },
                    { sender: 'bot', message: 'Harika! Randevunuz oluşturuldu. Bu arada, manikür ile birlikte %20 indirimli el masajı hizmetimizden faydalanmak ister misiniz?' }
                ]}
                themeColor="pink"
            />
            
            <WhyMortanasSection
                title="Neden Güzellik Salonları için Mortanas AI?"
                subtitle="Müşteri memnuniyetini artırırken, salon doluluğunu maksimize eden ve operasyonel yükünüzü hafifleten zarif çözüm ortağınız."
                points={[
                    { icon: 'fa-calendar-check', title: '7/24 Online Randevu', description: 'Müşterileriniz telefonla aramak zorunda kalmadan, Instagram veya WhatsApp üzerinden 7/24 randevu alabilsin. Telefon trafiğiniz azalsın.' },
                    { icon: 'fa-sms', title: 'Otomatik Hatırlatmalar', description: 'Randevuya gelmeme oranını ("no-show") otomatik SMS ve WhatsApp hatırlatmaları ile %80\'e kadar azaltın, gelir kaybını önleyin.' },
                    { icon: 'fa-bullhorn', title: 'Akıllı Kampanya Yönetimi', description: 'Özel günler, doğum günleri veya uzun süredir gelmeyen müşterilerinize özel, kişiselleştirilmiş kampanya mesajları göndererek sadakati artırın.' },
                    { icon: 'fa-hand-holding-heart', title: 'Kişiselleştirilmiş Deneyim', description: 'Her müşterinin geçmiş hizmetlerini ve tercihlerini tek bir yerde tutun, onlara özel paketler ve hizmetler sunarak kendilerini özel hissettirin.' }
                ]}
                themeColor="pink"
            />

            <CustomerRetentionSection />

            <CampaignSection
                title="Güzelliğinize Özel İndirim"
                description="'Profesyonel' paket ile randevu ve müşteri yönetiminizi kolaylaştırın. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={190}
                discountedPrice={160}
                themeColor="pink"
                pricingSectionId="pricing"
            />

            <SektorelPricingSection sectorSlug="guzellik-salonu-cozumlerimiz" />

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
              <div className="bg-pink-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Güzellik Salonunuzu Dijitalleştirin</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-pink-100">
                      Mortanas AI ile iş yükünüzü azaltın, müşteri memnuniyetini artırın ve salonunuzu büyütün.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/kurumsal#iletisim" className="bg-white text-pink-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
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

export default GuzellikSalonuCozumlerimizPage;
