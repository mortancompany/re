import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SektorelPricingSection from '../components/SektorelPricingSection';
import CampaignSection from '../components/CampaignSection';
import CustomerRetentionSection from '../components/CustomerRetentionSection';
import WhyMortanasSection from '../components/WhyMortanasSection';
import ChatbotFlowSection from '../components/ChatbotFlowSection';
import ProblemSolutionGoalSection from '../components/ProblemSolutionGoalSection';
import FomoCampaignSection from '../components/FomoCampaignSection';


// Reusable components (copied from OtelCozumlerimizPage for simplicity as requested)

const AnimatedCounter: React.FC<{ target: number, suffix?: string, prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let start = 0;
                    const end = target;
                    if (start === end) return;

                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    let increment = end / totalFrames;
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, frameRate);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [target]);

    return (
        <span ref={ref}>
            {prefix}{new Intl.NumberFormat('tr-TR').format(count)}{suffix}
        </span>
    );
};

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

const ValueCard: React.FC<{ icon: string; target: number; suffix: string; title: string; description: string; }> = ({ icon, target, suffix, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl text-center shadow-2xl border-t-4 border-blue-500">
        <i className={`${icon} text-5xl text-blue-400 mb-4`}></i>
        <p className="text-5xl font-extrabold text-white">
            <AnimatedCounter target={target} suffix={suffix} prefix={target > 0 ? '' : ''}/>
        </p>
        <h3 className="text-xl font-bold text-slate-200 mt-3">{title}</h3>
        <p className="text-slate-400 mt-2">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatarUrl: string; }> = ({ quote, name, title, avatarUrl }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col text-center h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-slate-700">
      <img
        className="w-24 h-24 rounded-full object-cover mb-6 ring-4 ring-blue-500/30"
        src={avatarUrl}
        alt={name}
      />
      <p className="text-slate-300 italic mb-6 relative flex-grow">
        <i className="fas fa-quote-left absolute -top-2 -left-4 text-3xl text-slate-700 -z-10"></i>
        {quote}
      </p>
      <div className="mt-auto">
        <h4 className="font-bold text-lg text-white">{name}</h4>
        <p className="text-sm text-blue-400 font-medium">{title}</p>
      </div>
    </div>
  );
};


const SaglikCozumlerimizPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const includedServices = [
        { icon: 'fas fa-sitemap', title: 'İç Operasyon Yönetimi', description: 'Klinik içi süreçleri ve personel görevlerini tek bir panelden yönetin, verimliliği artırın.' },
        { icon: 'fas fa-headset', title: 'AI Destekli Müşteri Yönetimi', description: 'Hasta verilerini merkezileştirin, kişiselleştirilmiş iletişim kurun ve sadakati güçlendirin.' },
        { icon: 'fas fa-calendar-alt', title: 'Randevu Planlama & Hatırlatma', description: '7/24 online randevu alın, takviminizi optimize edin ve otomatik hatırlatmalarla "no-show" oranını düşürün.' },
        { icon: 'fas fa-share-alt', title: 'Sosyal Medya Yönetimi', description: 'WhatsApp, Instagram gibi kanallardan gelen hasta sorularını otomatik yanıtlayın ve randevuya dönüştürün.' },
        { icon: 'fas fa-database', title: 'HBYS Entegrasyonu', description: 'Mevcut Hastane Bilgi Yönetim Sisteminizle tam entegre çalışarak veri bütünlüğü sağlayın.' },
        { icon: 'fas fa-comments', title: 'Omnichannel İletişim', description: 'Tüm iletişim kanallarınızı (telefon, web, sosyal medya) tek bir platformda birleştirin.' },
        { icon: 'fas fa-bullhorn', title: 'Toplu Mesaj Kampanyaları', description: 'Yeni hizmetlerinizi, sağlık bilgilendirmelerini veya kampanyalarınızı hedefli olarak duyurun.' },
        { icon: 'fas fa-chart-pie', title: 'Detaylı Raporlama', description: 'Randevu, hasta ve pazarlama verilerinizi analiz ederek kliniğiniz için veriye dayalı kararlar alın.' }
    ];

    const detailedFeatures = [
        { icon: "fas fa-calendar-check", title: "Randevu Yönetimi Otomasyonu", description: "Hastalar, uygun tarih ve saatleri kolayca görüntüleyerek tek tıkla randevu oluşturabilir. Mortanas AI, iptalleri ve çakışmaları otomatik olarak önleyerek sağlık personelinin zaman planlamasını kolaylaştırır ve bekleme sürelerini azaltır." },
        { icon: "fas fa-user-doctor", title: "Hasta Sorularına Anında Yanıt", description: "Yapay zeka sohbet robotu, hastaların tedavi süreçleri, ücret bilgileri, klinik hizmetleri ve çalışma saatleri gibi konularda 7/24 anında yanıt verir. Böylece çağrı merkezine gelen tekrarlayan sorular azalır ve sağlık çalışanlarının iş yükü hafifler." },
        { icon: "fas fa-bell", title: "Otomatik Hatırlatmalar", description: "Randevu tarihleri, ilaç kullanım saatleri ve kontrol muayeneleri hastalara SMS veya e-posta yoluyla otomatik olarak hatırlatılır. Bu sayede unutulan randevular azalır ve tedavi süreçleri aksamadan ilerler." },
        { icon: "fas fa-globe", title: "Çok Dilli Hasta Desteği", description: "Yabancı uyruklu hastalar için birden fazla dilde doğru ve anlaşılır iletişim sağlanır. Sağlık sohbet robotu, tıbbi terimleri doğru şekilde çevirerek yanlış anlamaların önüne geçer ve uluslararası hasta memnuniyetini artırır." },
        { icon: "fas fa-book-medical", title: "Hastalık ve Tedavi Bilgilendirmesi", description: "Sık sorulan tıbbi konular, hastalık belirtileri, tedavi yöntemleri ve iyileşme süreçleri hakkında bilgilendirici içerikler anında sunulur. Böylece hastalar randevuya gelmeden önce de doğru ve güvenilir bilgiye ulaşabilir." },
        { icon: "fas fa-pills", title: "İlaç Kullanım Takibi ve Hatırlatma", description: "Hastaların reçeteli ilaçlarını doğru zamanda almasını sağlamak için otomatik hatırlatmalar gönderir. Tedavi planına uyumu artırarak iyileşme sürecini hızlandırır." }
    ];

    const faqs = [
        { question: "Sistem, mevcut Hastane Bilgi Yönetim Sistemi (HBYS) ile entegre olabiliyor mu?", answer: "Evet, platformumuz, HL7 ve FHIR gibi standartları destekleyen birçok popüler HBYS ile tam entegre çalışabilmektedir. Mevcut altyapınızı analiz ederek sorunsuz bir geçiş sağlıyoruz." },
        { question: "Hasta verilerinin gizliliği ve güvenliği (KVKK) nasıl sağlanıyor?", answer: "Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve Sağlık Bakanlığı yönetmeliklerine uygun, yüksek güvenlikli bulut sunucularda uçtan uca şifrelenerek saklanır." },
        { question: "Kurulum süreci ne kadar sürer ve ekibimize eğitim veriyor musunuz?", answer: "Anahtar teslim kurulum sürecimiz ortalama 5-7 iş günü sürer. Kurulum tamamlandıktan sonra tüm ekibinize (hasta danışmanları, sekreterlik, yönetim) özel online eğitimler düzenliyoruz." },
        { question: "Yapay zeka asistanı tıbbi tavsiye veriyor mu?", answer: "Hayır, yapay zeka asistanı kesinlikle tıbbi teşhis veya tavsiye vermez. Görevi, randevu planlama, idari bilgi sağlama ve sıkça sorulan tıbbi olmayan soruları yanıtlama ile sınırlıdır. Tıbbi sorular, doğrudan bir sağlık profesyoneline yönlendirilir." },
        { question: "Sistem, birden fazla şubesi olan klinikler veya hastaneler için uygun mu?", answer: "Evet, platformumuz çoklu şube (multi-location) yönetimini desteklemektedir. Tüm şubelerinizin randevularını, hasta iletişimini ve raporlarını tek bir merkezi panelden yönetebilirsiniz." }
    ];
    
    const testimonials = [
        { quote: "Mortanas AI'nin randevu otomasyonu sayesinde, telefon trafiğimiz %70 azaldı ve 'no-show' oranlarımız neredeyse sıfırlandı. Personelimiz artık hastalara daha fazla odaklanabiliyor.", name: 'Dr. Elif Aydın', title: 'Klinik Yöneticisi, Estetik Cerrahi Merkezi', avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg' },
        { quote: "Yurt dışından gelen hastalarımız için çok dilli destek özelliği hayat kurtarıcı oldu. İletişim bariyerlerini ortadan kaldırdık ve uluslararası hasta memnuniyetimiz tavan yaptı.", name: 'Mehmet Vural', title: 'Uluslararası Hasta Koordinatörü, Global Health Group', avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg' },
        { quote: "Tüm iletişim kanallarını tek bir platformda birleştirmek, operasyonel verimliliğimizi inanılmaz artırdı. Raporlama araçları sayesinde artık hangi kanaldan ne kadar hasta geldiğini net bir şekilde görebiliyoruz.", name: 'Ayşe Çetin', title: 'Hastane Genel Müdürü, Anadolu Hastanesi', avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg' }
    ];

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">SAĞLIK SEKTÖRÜ ÇÖZÜMLERİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Hasta Memnuniyetini Artıran <span className="text-blue-400">Sağlık Sohbet Robotları</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Mortanas AI ile sağlık sektöründe iletişiminizi saniyeler içinde güçlendirin. Hastalarınızla doğru, hızlı ve kesintisiz iletişim kurarak memnuniyeti artırın, süreçlerinizi daha verimli yönetin.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Ücretsiz Demo Talep Edin
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" alt="Sağlık Sektörü Yapay Zeka Çözümleri" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
            
            <section className="bg-gradient-to-b from-slate-900 to-indigo-900/20 py-24">
              <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Mortanas AI ile Sağlık Sektöründe <span className="text-blue-400">Ölçülebilir Sonuçlar</span></h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                       Yatırımınızın hasta memnuniyetine ve operasyonel verimliliğe nasıl dönüştüğünü somut rakamlarla görün.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValueCard icon="fas fa-headset" target={70} suffix="%" title="Çağrı Merkezi Yükü Azalması" description="Tekrarlayan soruları AI'a devredin, personeliniz kritik vakalara odaklansın." />
                    <ValueCard icon="fas fa-calendar-check" target={40} suffix="%" title="Randevu Doluluk Artışı" description="7/24 randevu alma imkanı ve otomatik hatırlatmalar ile boş kalan zamanları doldurun." />
                    <ValueCard icon="fas fa-user-slash" target={80} suffix="%" title="Randevuya Gelmeme Oranı Düşüşü" description="Akıllı hatırlatmalar sayesinde unutulan randevuları ve gelir kaybını en aza indirin." />
                    <ValueCard icon="fas fa-star" target={95} suffix="%" title="Hasta Memnuniyeti" description="Hızlı, tutarlı ve 7/24 erişilebilir hizmet ile hastalarınızın sadakatini kazanın." />
                </div>
              </div>
            </section>
          
          <section className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Sağlık Sektörüne Özel Kapsamlı Çözümler</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     Hasta yolculuğunun her adımını dijitalleştiren ve otomatikleştiren entegre modüller.
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {includedServices.map(service => (
                     <div key={service.title} className="group">
                        <FeatureCard {...service} />
                     </div>
                  ))}
              </div>
            </div>
          </section>
          
          <section className="container mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Hasta İletişimini Nasıl <span className="text-blue-400">Dönüştürüyoruz?</span></h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Mortanas AI, sağlık kuruluşlarına hız, güvenilirlik ve 7/24 hizmet imkânı sunarak tüm süreçleri dijitalleştirir.
                    </p>
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
                problem="Yoğun telefon trafiği, unutulan randevular ve manuel hasta takibi operasyonel verimsizliğe yol açar."
                solution="7/24 online randevu, otomatik hatırlatmalar ve merkezi hasta iletişimi ile iş yükünüzü hafifletir."
                goal="Operasyonel mükemmellik sağlayarak, sağlık profesyonellerinin zamandan tasarruf etmesini ve hasta memnuniyetini en üst düzeye çıkarmasını sağlamak."
            />
            
            <FomoCampaignSection />
            
            <ChatbotFlowSection
                title="Örnek Chatbot Diyaloğu"
                subtitle="Yapay zeka asistanımızın hasta sorularını nasıl yanıtladığını ve randevu süreçlerini nasıl kolaylaştırdığını canlı olarak görün."
                qrCodeUrl="https://i.imgur.com/L4uL5d0.png"
                conversation={[
                    { sender: 'user', message: 'Merhaba, Dr. Elif Aydın\'dan randevu almak istiyorum.' },
                    { sender: 'bot', message: 'Elbette! Dr. Aydın\'ın bu hafta Çarşamba 14:30 ve Cuma 11:00\'de uygun zamanları var. Hangisini tercih edersiniz?' },
                    { sender: 'user', message: 'Çarşamba 14:30 lütfen.' },
                    { sender: 'bot', message: 'Harika! Randevunuz oluşturulmuştur. Randevu öncesi SMS ile hatırlatma yapılacaktır. Sağlıklı günler dileriz!' }
                ]}
                themeColor="blue"
            />

            <WhyMortanasSection
                title="Neden Sağlık Sektörü için Mortanas AI?"
                subtitle="Hasta memnuniyetini artırırken operasyonel verimliliğinizi en üst düzeye çıkaran stratejik ortağınız."
                points={[
                    { icon: 'fa-headset', title: '7/24 Hasta Desteği', description: 'Tekrarlayan soruları (randevu, bilgi, adres) 7/24 otomatik yanıtlayarak çağrı merkezi yükünüzü %70\'e kadar azaltın.' },
                    { icon: 'fa-calendar-check', title: 'Akıllı Randevu Otomasyonu', description: 'Web, sosyal medya ve telefondan gelen randevu taleplerini otomatik planlayın, \'no-show\' oranını akıllı hatırlatmalarla düşürün.' },
                    { icon: 'fa-shield-halved', title: 'KVKK ve Veri Güvenliği', description: 'Tüm hasta verileriniz, KVKK ve Sağlık Bakanlığı yönetmeliklerine uygun, yüksek güvenlikli altyapımızda korunur.' },
                    { icon: 'fa-comments', title: 'Entegre İletişim', description: 'Tüm iletişim kanallarınızı (telefon, web, sosyal medya) tek bir platformda birleştirerek veri bütünlüğü sağlayın ve hasta takibini kolaylaştırın.' }
                ]}
                themeColor="blue"
            />

          <CustomerRetentionSection />
          
            <CampaignSection
                title="Sağlıkta Dijital Dönüşüm Fırsatı"
                description="Profesyonel paketimizle verimliliği artırın, hasta memnuniyetini zirveye taşıyın. Yıllık abonelikte büyük indirim!"
                offerDetails="Yıllık abonelikte aylık sadece"
                originalPrice={450}
                discountedPrice={375}
                themeColor="blue"
                pricingSectionId="pricing"
            />

          <SektorelPricingSection sectorSlug="saglik-cozumlerimiz" />

          <section className="py-24 bg-slate-900">
              <div className="container mx-auto px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                          Memnun Sağlık Profesyonelleri
                      </h2>
                      <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                          Çözümümüzü kullanan klinik yöneticileri ve hasta koordinatörleri ne diyor?
                      </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                      {testimonials.map((testimonial, index) => (
                          <TestimonialCard 
                              key={index} 
                              quote={testimonial.quote}
                              name={testimonial.name}
                              title={testimonial.title}
                              avatarUrl={testimonial.avatarUrl}
                          />
                      ))}
                  </div>
              </div>
          </section>
          
          <section className="bg-slate-900 py-24">
              <div className="container mx-auto px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                      <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                         Aklınızdaki soruların cevaplarını burada bulabilirsiniz.
                      </p>
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
                   <h2 className="text-3xl font-bold mb-4">Sağlıkta Dijital Dönüşüme Hazır mısınız?</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                      Uzman ekibimizle görüşerek kliniğinizin veya hastanenizin ihtiyaçlarına özel bir demo talep edin ve yapay zekanın gücünü ilk elden deneyimleyin.
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

export default SaglikCozumlerimizPage;
