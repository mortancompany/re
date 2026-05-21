import React, { useState, useEffect, useRef } from 'react';
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

const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
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


const EgitimCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const whatWeOffer = [
        { icon: 'fas fa-comments', title: 'Çok Kanallı İletişim', description: 'Öğrenciler, veliler ve öğretim üyeleriyle e-posta, sohbet, telefon ve WhatsApp gibi tüm kanallardan kolayca iletişim kurun.' },
        { icon: 'fas fa-cogs', title: 'İşbirliği ve Otomasyon', description: 'Personel ve öğretim üyeleri arasında sorunsuz işbirliği sağlayın, otomasyon ve raporlama ile süreçleri hızlandırın.' },
        { icon: 'fas fa-database', title: 'Merkezi Bilgi Merkezi', description: 'Sıkça sorulan sorular, duyurular ve ders bilgilerini tek bir bilgi tabanında toplayın, kolayca güncelleyin ve paylaşın.' },
        { icon: 'fas fa-magic-wand-sparkles', title: 'Kolay Kullanım', description: 'BT desteğine gerek duymadan hızlı kurulum yapın, yazılımı kolayca kullanarak öğrenci ve velilerinize odaklanın.' },
        { icon: 'fas fa-headset', title: 'Güçlü Destek Deneyimi', description: 'Talepleri kolayca yönetin, içerikleri paylaşın ve her zaman bağlantıda kalarak öğrenci beklentilerini aşın.' },
        { icon: 'fas fa-chart-pie', title: 'Ölçümleme ve Gelişim', description: 'Detaylı raporlarla iletişimi analiz edin, güçlü yönlerinizi belirleyin ve geliştirilmesi gereken alanları hızla iyileştirin.' }
    ];
    
    const idealFor = [
        { icon: 'fas fa-university', name: 'Üniversiteler' },
        { icon: 'fas fa-school', name: 'Özel Okullar & Kolejler' },
        { icon: 'fas fa-chalkboard-teacher', name: 'Kurs Merkezleri' },
        { icon: 'fas fa-laptop-code', name: 'Online Eğitim Platformları' },
        { icon: 'fas fa-language', name: 'Dil Okulları' },
    ];

    const faqs = [
        { question: "Mevcut Öğrenci Bilgi Sistemi (ÖBS) ile entegrasyon mümkün mü?", answer: "Evet, platformumuz API desteği olan birçok popüler Öğrenci Bilgi Sistemi ile tam entegre çalışabilmektedir. Mevcut altyapınızı analiz ederek sorunsuz bir geçiş planı oluşturuyoruz." },
        { question: "Öğrenci ve veli verilerinin güvenliği (KVKK) nasıl sağlanıyor?", answer: "Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda uçtan uca şifrelenerek saklanır." },
        { question: "AI Chatbot, ders içerikleri ve müfredat hakkında bilgi verebilir mi?", answer: "Kesinlikle. Yapay zeka asistanını; ders katalogunuz, müfredat detayları, sınav takvimleri ve sıkça sorulan akademik sorularla eğitiyoruz. Böylece öğrencilere 7/24 doğru bilgi sağlar." },
        { question: "Velilerle iletişim için de kullanılabilir mi?", answer: "Evet, platformumuz veli iletişimini otomatikleştirmek için idealdir. Otomatik duyurular, ödeme hatırlatmaları, etkinlik bilgileri ve velilerden gelen genel soruları yönetmek için kullanılabilir." },
        { question: "Kurulum süreci ne kadar sürer ve ekibimize eğitim veriyor musunuz?", answer: "Anahtar teslim kurulum sürecimiz genellikle 5-7 iş günü sürer. Kurulum tamamlandıktan sonra tüm idari ve akademik personelinize özel online eğitimler düzenliyoruz." }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">EĞİTİM SEKTÖRÜ ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Dijital Eğitimde <br/><span className="text-blue-400">Verimlilik ve Kalite</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI, öğrencilerin bilgiye hızlı erişmesini sağlayarak öğrenme sürecini kolaylaştırır, öğretmenlerin tekrarlayan sorulara harcadığı zamanı azaltır ve kurumların öğrenci-veli iletişimini daha verimli hale getirir.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1546410531-bb4ac6661a31?q=80&w=2070&auto=format&fit=crop" alt="Eğitim Sektörü Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Size Ne Sunuyoruz?</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     Eğitim kurumunuzun her departmanını güçlendirmek için tasarlanmış entegre yapay zeka çözümleri.
                  </p>
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
                        <h2 className="text-3xl font-bold text-white mb-4">Eğitimde <span className="text-blue-400">Akıllı Dönüşüm</span></h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                Günümüzde dijitalleşmenin hızla arttığı eğitim sektöründe, iş süreçlerini kolaylaştırmak ve verimliliği artırmak kritik önem taşır. Mortanas AI, chatbot otomasyonundan öğrenci ve veli iletişimine, ders ve sınav takvim yönetiminden içerik paylaşımına kadar tüm ihtiyaçları tek bir yerde karşılar.
                            </p>
                            <p>
                                Yapay zekâ destekli chatbotlarımız, öğrencilerinizin ve velilerinizin sorularına 7/24 anında cevap verir; bu sayede hem zaman kazanır hem de memnuniyeti üst seviyeye çıkarırsınız. Entegre takvim sistemi sayesinde ders programlarını kolayca yönetir, sınav tarihlerini düzenli paylaşıp karışıklıkları minimuma indirirsiniz.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" alt="İşbirliği ve Otomasyon" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
          </section>

          <section className="container mx-auto px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Kimler İçin İdeal?</h2>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
                problem="Öğrenci ve velilerden gelen tekrarlayan sorular, idari personelin zamanını alır ve önemli duyurular kalabalıkta kaybolur."
                solution="7/24 çalışan AI asistanı ile kayıt, müfredat ve takvim sorularını otomatik yanıtlar, duyuruları hedefli olarak iletir."
                goal="İdari yükü azaltarak eğitimcilerin öğrencilere daha fazla odaklanmasını sağlamak ve öğrenci-veli iletişimini kesintisiz hale getirmek."
            />
            
            <FomoCampaignSection />

          <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın öğrenci ve veli sorularını nasıl yanıtladığını, kayıt ve ders bilgisi süreçlerini nasıl kolaylaştırdığını görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, MBA programı hakkında bilgi alabilir miyim?' },
                    { sender: 'bot', message: 'Merhaba! Elbette. MBA programımız hakkında ne öğrenmek istersiniz? Başvuru koşulları, ders içerikleri veya ücretler hakkında bilgi verebilirim.' },
                    { sender: 'user', message: 'Başvuru koşulları nelerdir?' },
                    { sender: 'bot', message: 'MBA programımıza başvurmak için lisans mezunu olmanız ve en az 2 yıl iş tecrübeniz olması gerekmektedir. Detaylı bilgi ve başvuru formuna web sitemizden ulaşabilirsiniz.' }
                ]}
                themeColor="purple"
            />
            
            <WhyMortanasSection
                title="Neden Eğitim Sektörü için Mortanas AI?"
                subtitle="Öğrenci ve veli memnuniyetini artırırken, idari verimliliği en üst düzeye çıkaran akıllı çözüm ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Kesintisiz İletişim', description: 'Kayıt dönemleri veya yoğun zamanlarda bile tüm öğrenci ve veli adaylarının sorularını anında yanıtlayarak hiçbir fırsatı kaçırmayın.' },
                    { icon: 'fa-user-graduate', title: 'Gelişmiş Öğrenci Deneyimi', description: 'Öğrencilere ders programları, sınav sonuçları ve kampüs etkinlikleri hakkında kişiselleştirilmiş, anlık bilgiler sunarak bağlılığı artırın.' },
                    { icon: 'fa-shield-halved', title: 'Veri Güvenliği ve KVKK Uyumu', description: 'Tüm öğrenci ve veli verileri, KVKK standartlarına uygun, yüksek güvenlikli altyapımızda titizlikle korunur.' },
                    { icon: 'fa-cogs', title: 'İdari Yükü Azaltın', description: 'Tekrarlayan idari soruları ve süreçleri otomatize ederek personelinizin daha stratejik ve katma değerli işlere odaklanmasını sağlayın.' }
                ]}
                themeColor="purple"
            />

          <CustomerRetentionSection />

            <CampaignSection
                title="Eğitimde Verimlilik Kampanyası"
                description="'Profesyonel' paketimizle iletişimi güçlendirin, operasyonları kolaylaştırın. Yıllık abonelikte büyük indirim fırsatını kaçırmayın!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={350}
                discountedPrice={290}
                themeColor="purple"
                pricingSectionId="pricing"
            />
          
          <SektorelPricingSection sectorSlug="egitim-cozumlerimiz" />

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
                   <h2 className="text-3xl font-bold mb-4">Eğitimde Dijital Devrime Katılın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Mortanas AI'ın eğitim kurumunuzu nasıl daha verimli ve öğrenci odaklı hale getirebileceğini görmek için uzmanlarımızdan ücretsiz bir demo talep edin.
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

export default EgitimCozumlerimizPage;
