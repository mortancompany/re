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


const HukukCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const features = [
        { icon: 'fas fa-users', title: 'Müvekkil İletişimi & Ön Değerlendirme', description: 'Gelen müvekkil taleplerini anında yanıtlayarak hızlı bir ön değerlendirme süreci sunar. Müvekkiller, davalarının türü ve gereklilikleri hakkında ön bilgi alır.' },
        { icon: 'fas fa-calendar-alt', title: 'Randevu Planlama', description: 'Müvekkiller, uygun tarih ve saatleri görüntüleyerek doğrudan sistem üzerinden randevu alabilir. Takvim entegrasyonu sayesinde çakışmalar önlenir.' },
        { icon: 'fas fa-gavel', title: 'Dava Süreci Takibi', description: 'Yapay zeka sohbet robotu, müvekkillerin dava dosyalarının güncel durumunu 7/24 öğrenmesini sağlar. Mahkeme tarihleri ve evrak süreleri otomatik olarak hatırlatılır.' },
        { icon: 'fas fa-question-circle', title: 'Sık Sorulan Soru Otomasyonu', description: 'Ücret tarifeleri, dava süreçleri ve sözleşme detayları gibi sık sorulan konular anında yanıtlanır. Böylece avukatlar gereksiz telefon ve e-posta trafiğinden kurtulur.' },
        { icon: 'fas fa-folder-open', title: 'Belge Toplama ve Paylaşım', description: 'Davalar için gerekli belgelerin listesini sunar ve müvekkillere güvenli yükleme imkânı verir. Yüklenen belgeler otomatik olarak arşivlenir.' },
        { icon: 'fas fa-globe', title: 'Çok Dilli Destek', description: 'Yabancı uyruklu müvekkiller için birden fazla dilde doğru ve anlaşılır yanıtlar verir. Hukuki terimlerin doğru çevirisi ile iletişimde yanlış anlaşılmaların önüne geçilir.' }
    ];
    
     const whatWeOffer = [
        { icon: 'fas fa-comments', title: 'Omnichannel İletişim', description: 'Müvekkilleriniz ister WhatsApp, ister e-posta, ister sosyal medya üzerinden ulaşsın tüm mesajlar tek bir platformda toplanır.' },
        { icon: 'fas fa-cogs', title: 'Otomasyon İşlemleri', description: 'Duruşma hatırlatmaları, dosya güncellemeleri ve ödeme bilgilirmeleri yapay zekâ destekli otomasyon ile otomatik yapılır.' },
        { icon: 'fas fa-robot', title: 'Chatbot İşlemleri', description: 'Yapay zekâlı chatbotlar 7/24 hizmet vererek müvekkillere süreçler, ücretler ve randevu süreçleri hakkında anında bilgi sağlar.' },
        { icon: 'fas fa-headset', title: 'AI Çağrı Merkezi', description: 'Yapay zekâ çağrı merkezi, basit talepleri otomatik çözer, özel durumlar ise doğru avukata veya asistana yönlendirilir.' },
        { icon: 'fas fa-chart-bar', title: 'AI Raporlama ve Analitik', description: 'Yapay zekâ tüm verileri analiz ederek hangi dava türlerinin daha çok ilgi gördüğünü ve iletişim kanallarının performansını raporlar.' },
        { icon: 'fas fa-user-check', title: 'Kişiselleştirilmiş Deneyim', description: 'Müvekkillerin dava türü ve önceki iletişimlerine göre özel içerikler ve bilgilendirmeler sunulur, bu da müvekkilin kendini değerli hissetmesini sağlar.' }
    ];

    const faqs = [
        { question: "Mortanas AI nedir?", answer: "Mortanas AI, yapay zeka destekli chatbot, otomasyon, form yönetimi, takvim gibi iş süreçlerini tek bir platformda toplayan kapsamlı bir dijital asistan ve otomasyon çözümüdür." },
        { question: "Mortanas AI chatbotu 7/24 hizmet veriyor mu?", answer: "Evet, yapay zeka destekli chatbotlarımız 7/24 aktiftir ve müvekkillerinizin sorularına anında yanıt verir." },
        { question: "Randevu ve takvim yönetimi nasıl çalışıyor?", answer: "Entegre takvim sistemi, avukatların uygunluk durumuna göre müvekkillerin online olarak randevu almasını sağlar ve çakışmaları otomatik olarak önler." },
        { question: "Mortanas AI'yı kullanmak için teknik bilgi gerekiyor mu?", answer: "Hayır, platformumuz kullanıcı dostu bir arayüze sahiptir. Kurulum ve eğitim süreçlerinde uzman ekibimiz size tam destek sağlar." }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">HUKUK SEKTÖRÜ ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Hukuk Büroları için <br/><span className="text-blue-400">Yapay Zeka Sohbet Robotu</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI, hukuk büroları için tasarlanan yapay zeka sohbet robotu ile müvekkil iletişimini hızlandırır, dosya süreçlerini optimize eder ve 7/24 destek sunar. Soru-cevap ve randevu planlama gibi işlemleri otomatikleştirerek ekibinizin iş yükünü azaltır.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1599249302256-e827a4b0d788?q=80&w=1974&auto=format&fit=crop" alt="Hukuk Sektörü Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
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
          
           <section className="container mx-auto px-8">
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
            </section>
          
            <ProblemSolutionGoalSection
                problem="Tekrarlayan idari sorular, randevu planlama ve temel hukuki bilgilendirme talepleri avukatların değerli zamanını tüketir."
                solution="AI asistanı ile potansiyel müvekkillerin ilk sorularını filtreler, randevuları otomatik planlar ve temel süreçler hakkında 7/24 bilgi verir."
                goal="Avukatların idari yükünü hafifleterek, asıl uzmanlık alanları olan hukuki meselelere daha fazla odaklanmalarını sağlamak."
            />
            
            <FomoCampaignSection />

          <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın potansiyel müvekkil sorularını nasıl yanıtladığını ve randevu süreçlerini nasıl kolaylaştırdığını görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, boşanma davası hakkında bilgi alabilir miyim?' },
                    { sender: 'bot', message: 'Merhaba! Elbette. Boşanma davaları uzmanlık alanlarımızdandır. Anlaşmalı mı yoksa çekişmeli boşanma mı düşünüyorsunuz?' },
                    { sender: 'user', message: 'Anlaşmalı.' },
                    { sender: 'bot', message: 'Anlaşmalı boşanma süreci hakkında ön bilgi ve gerekli evrak listesini e-posta adresinize gönderebilirim. Dilerseniz, bir avukatımızla ücretsiz ön görüşme için randevu oluşturabiliriz.' }
                ]}
                themeColor="purple"
            />
            
            <WhyMortanasSection
                title="Neden Hukuk Sektörü için Mortanas AI?"
                subtitle="Müvekkil memnuniyetini artırırken, idari verimliliği en üst düzeye çıkaran ve zamanınızı kazandıran akıllı çözüm ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Müvekkil Karşılama', description: 'Potansiyel müvekkillerin ilk sorularını 7/24 yanıtlayın, temel bilgileri toplayın ve ofisiniz kapalıyken bile yeni dava fırsatlarını kaçırmayın.' },
                    { icon: 'fa-calendar-check', title: 'Otomatik Randevu ve Duruşma Takibi', description: 'Müvekkil görüşmelerini ve duruşma tarihlerini otomatik olarak planlayın ve ilgili taraflara akıllı hatırlatmalar gönderin.' },
                    { icon: 'fa-shield-halved', title: 'Veri Güvenliği ve Gizlilik', description: 'Tüm müvekkil iletişimleriniz, avukatlık meslek etiği ve KVKK standartlarına uygun, yüksek güvenlikli altyapımızda korunur.' },
                    { icon: 'fa-gavel', title: 'İdari Yükü Azaltın', description: 'Tekrarlayan idari soruları (adres, ücret, süreçler) otomatize ederek avukatların ve personelin asıl önemli olan hukuki işlere odaklanmasını sağlayın.' }
                ]}
                themeColor="purple"
            />

          <CustomerRetentionSection />

            <CampaignSection
                title="Hukukta Dijitalleşme Fırsatı"
                description="'Hukuk Bürosu' paketimiz ile müvekkil yönetimini ve dava takibini kolaylaştırın. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={480}
                discountedPrice={400}
                themeColor="purple"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="hukuk-cozumlerimiz" />

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
                   <h2 className="text-3xl font-bold mb-4">Hukukta Dijital Dönüşüme Adım Atın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın hukuk büronuzu nasıl daha verimli ve müvekkil odaklı hale getirebileceğini görmek için uzmanlarımızdan ücretsiz bir demo talep edin.
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

export default HukukCozumlerimizPage;
