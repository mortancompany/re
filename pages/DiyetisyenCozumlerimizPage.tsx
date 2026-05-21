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
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-green-400">
        <div className="flex-shrink-0 h-16 w-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-green-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
    </div>
);

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-green-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-5"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
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

const DiyetisyenCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const features = [
        { icon: 'fas fa-comments', title: 'Etkili Danışan İletişimi', description: 'Yapay zeka chatbot ile 7/24 soruları yanıtlayın, randevu hatırlatmaları ve beslenme önerileriyle iletişimi sürekli kılın.' },
        { icon: 'fas fa-calendar-alt', title: 'Kolay Randevu ve Takvim Yönetimi', description: 'Entegre takvimle randevuları hızla planlayın, otomatik hatırlatmalarla iptalleri azaltın ve zamanınızı verimli kullanın.' },
        { icon: 'fas fa-bell', title: 'Motivasyonu Artıran Otomatik Hatırlatmalar', description: 'Su tüketimi, öğün saatleri ve sağlıklı yaşam ipuçları gibi otomatik bildirimlerle danışanların programa bağlılığını artırın.' },
        { icon: 'fas fa-file-alt', title: 'Dijital Form ve Veri Yönetimi', description: 'Kağıt formlar yerine dijital formlarla danışan bilgilerini (sağlık geçmişi, alerjiler vb.) pratik ve güvenli bir şekilde toplayın.' },
        { icon: 'fas fa-walking', title: 'Egzersiz ve Aktivite Takibi', description: 'Danışanların günlük aktivite verilerini entegre edin, hareket alışkanlıklarını analiz ederek kişiye özel öneriler sunun.' },
        { icon: 'fas fa-sitemap', title: 'Çoklu Kanal Desteği', description: 'SMS, e-posta, WhatsApp ve sosyal medya üzerinden otomatik mesajlar göndererek danışanlarınıza en çok kullandıkları kanallardan ulaşın.' }
    ];

    const benefits = [
        'Operasyonel süreçlerin otomasyonu sayesinde manuel işleri azaltır, böylece hem zaman hem de maliyet tasarrufu sağlar.',
        'Entegre takvim sistemiyle randevularınızı kolayca planlayabilir, iptallerin önüne geçebilirsiniz.',
        'Otomatik sistemlerle insan kaynaklı hataları en aza indirir, işlerin daha hızlı ve düzenli ilerlemesini destekler.',
        'Chatbot ve otomatik mesajlaşma ile danışan taleplerine anında yanıt verilir, bağlılık artırılır.'
    ];

    const faqs = [
        { question: "Mortanas AI nedir?", answer: "Mortanas AI, yapay zeka destekli chatbot, otomasyon, form yönetimi, takvim gibi iş süreçlerini tek bir platformda toplayan kapsamlı bir dijital asistan ve otomasyon çözümüdür." },
        { question: "Mortanas AI chatbotu 7/24 hizmet veriyor mu?", answer: "Evet, yapay zeka destekli chatbotlarımız 7/24 aktiftir ve danışanlarınızın genel sorularına anında yanıt verir." },
        { question: "Randevu ve takvim yönetimi nasıl çalışıyor?", answer: "Entegre takvim sistemi, sizin uygunluk durumunuza göre danışanların online olarak randevu almasını sağlar ve çakışmaları otomatik olarak önler." },
        { question: "Mortanas AI’yı kullanmak için teknik bilgi gerekiyor mu?", answer: "Hayır, platformumuz kullanıcı dostu bir arayüze sahiptir. Kurulum ve eğitim süreçlerinde uzman ekibimiz size tam destek sağlar." }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-green-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-green-300 bg-green-500/20 px-3 py-1.5 rounded-full uppercase">DİYETİSYEN ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Yapay Zeka Destekli <span className="text-green-400">Diyetisyen Programı</span>
                      </h1>
                      <p className="mt-6 text-lg text-green-200">
                         Mortanas AI, diyetisyenlerin iş yükünü azaltmak için tasarlanmış yapay zeka destekli bir çözümdür. Randevu yönetiminden iletişim otomasyonuna kadar tüm süreçleri tek bir platformda kolaylaştırır.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-block">
                              7 Gün Ücretsiz Deneyin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-green-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop" alt="Diyetisyen Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Dijital Dönüşümün Gücü Diyetisyenlerde</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map(service => (
                     <div key={service.title} className="group">
                        <FeatureCard {...service} />
                     </div>
                  ))}
              </div>
          </section>

           <section className="container mx-auto px-8">
                <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-slate-700 text-center">
                    <h2 className="text-3xl font-bold text-white">Neden Mortanas AI?</h2>
                     <p className="mt-4 text-lg text-slate-300">
                        Dijital dönüşüm yolculuğunuzda Mortanas AI diyetisyen programı ile, yanınızda güçlü bir iş ortağı olarak, hem sizin hem de danışanlarınızın hayatını kolaylaştırır. Rekabette fark yaratmak ve sektörde öncü olmak isteyen tüm diyetisyenler için ideal çözümdür.
                    </p>
                </div>
          </section>
          
           <section className="bg-slate-800/50 py-24">
             <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Elde Edeceğiniz Başlıca <span className="text-green-400">Faydalar</span></h2>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                         <div key={index} className="flex items-start bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <i className="fas fa-check-circle text-green-400 mr-4 mt-1 text-xl"></i>
                            <p className="text-slate-300">{benefit}</p>
                        </div>
                    ))}
                </div>
             </div>
          </section>

            <ProblemSolutionGoalSection
                problem="Randevu planlama, danışan takibi ve motivasyon mesajları gibi tekrarlayan görevler diyetisyenlerin zamanını alır."
                solution="Online randevu sistemi, otomatik öğün ve su hatırlatmaları ve ilerleme takibi formları ile tüm süreci dijitalleştirir."
                goal="Diyetisyenlerin idari yükünü hafifleterek danışanlarına daha fazla odaklanmasını sağlamak ve danışan başarısını ve motivasyonunu artırmak."
            />
            
            <FomoCampaignSection />

            <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın yeni danışanları nasıl karşıladığını, hizmetler hakkında bilgi verdiğini ve randevu aldığını görün."
                qrCodeUrl="https://i.imgur.com/GHYp627.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, online diyet programlarınız hakkında bilgi alabilir miyim?' },
                    { sender: 'bot', message: 'Merhaba! Elbette. Bireysel beslenme danışmanlığı, sporcu beslenmesi ve kilo yönetimi gibi çeşitli online programlarımız mevcut. Hangisiyle ilgileniyorsunuz?' },
                    { sender: 'user', message: 'Kilo yönetimi.' },
                    { sender: 'bot', message: 'Harika bir seçim! Diyetisyenimizle ücretsiz bir ön görüşme yaparak size en uygun programı belirleyebiliriz. Yarın 16:00 sizin için uygun mu?' }
                ]}
                themeColor="green"
            />
            
            <WhyMortanasSection
                title="Neden Diyetisyenler için Mortanas AI?"
                subtitle="Danışan motivasyonunu ve bağlılığını artırırken, idari yükünüzü hafifleten sağlıklı teknoloji ortağınız."
                points={[
                    { icon: 'fa-calendar-check', title: '7/24 Randevu ve Bilgi', description: 'Potansiyel danışanların size 7/24 ulaşmasını, hizmetleriniz hakkında bilgi almasını ve online randevu oluşturmasını sağlayarak yeni danışan kazanımını kolaylaştırın.' },
                    { icon: 'fa-bell', title: 'Otomatik Motivasyon ve Takip', description: 'Danışanlarınıza öğün saatleri, su tüketimi ve motivasyon mesajlarını otomatik göndererek programa bağlılıklarını ve başarı oranlarını artırın.' },
                    { icon: 'fa-file-medical', title: 'Dijital Danışan Yönetimi', description: 'Beslenme alışkanlıkları, sağlık geçmişi ve ilerleme raporları gibi tüm danışan verilerini tek bir güvenli panelde toplayın ve kolayca yönetin.' },
                    { icon: 'fa-comments', title: 'Kesintisiz İletişim', description: 'WhatsApp, Instagram ve web sitenizden gelen tüm danışan iletişimini tek bir yerden yöneterek zaman kazanın ve hiçbir soruyu yanıtsız bırakmayın.' }
                ]}
                themeColor="green"
            />

            <CustomerRetentionSection />

            <CampaignSection
                title="Sağlıklı Bir Başlangıç Fırsatı"
                description="'Klinik' paketimizle danışan takibini ve randevuları dijitalleştirin. Yıllık abonelikteki büyük indirimi kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={180}
                discountedPrice={150}
                themeColor="green"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="diyetisyen-cozumlerimiz" />

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
              <div className="bg-green-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Danışanlarınıza Daha Fazla Zaman Ayırın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-green-100">
                      Rutin işleri Mortanas AI'a bırakın, siz de danışanlarınızın sağlık hedeflerine ulaşmasına odaklanın.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/kurumsal#iletisim" className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
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

export default DiyetisyenCozumlerimizPage;
