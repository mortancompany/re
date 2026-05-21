import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full border border-slate-700 flex flex-col hover:border-blue-400">
        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 transform transition-transform duration-300 hover:scale-110">
            <i className={`${icon} text-blue-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
    </div>
);

const ComparisonItem: React.FC<{ text: string, isMortanas: boolean }> = ({ text, isMortanas }) => (
    <div className="flex items-start">
        {isMortanas ? (
            <i className="fas fa-check-circle text-green-400 mr-3 mt-1 flex-shrink-0"></i>
        ) : (
            <i className="fas fa-times-circle text-red-400 mr-3 mt-1 flex-shrink-0"></i>
        )}
        <span className={isMortanas ? "text-slate-200" : "text-slate-400"}>{text}</span>
    </div>
);

const YapayZekaCagriMerkeziPage: React.FC = () => {
    const [activeUseCase, setActiveUseCase] = useState('Teknik Destek');
    const useCases = {
        'Teknik Destek': { image: 'https://i.imgur.com/your-tech-support-image.png' },
        'Müşteri Hizmetleri': { image: 'https://i.imgur.com/your-customer-service-image.png' },
        'Değerlendirme Anketi': { image: 'https://i.imgur.com/your-survey-image.png' },
        'Ürün Satış': { image: 'https://i.imgur.com/your-product-sales-image.png' },
        'Randevu Oluşturma': { image: 'https://i.imgur.com/your-appointment-image.png' },
        'Sipariş Sorgu': { image: 'https://i.imgur.com/your-order-query-image.png' }
    };

    const faqs = [
        { question: "Mortanas AI’yi satış görüşmelerinde kullanabilir miyim?", answer: "Evet, kesinlikle! Mortanas AI, potansiyel müşterilerle etkili şekilde etkileşim kurabilen, soruları yanıtlayabilen ve satış süreçlerini başarıyla yöneten yapay zekâ destekli sesli asistanlar sunar." },
        { question: "Mortanas AI müşteri desteğinde kullanılabilir mi?", answer: "Evet, müşteri destek telefonlarına anında yanıt verir, sıkça sorulan soruları cevaplar ve karmaşık durumları canlı temsilcilere aktararak müşteri memnuniyetini artırır." },
        { question: "Mortanas AI e-ticaret siteleri için uygun mu?", answer: "Evet, sipariş sorgulama, ürün bilgisi verme ve satış sonrası destek gibi e-ticaret süreçlerini otomatikleştirmek için mükemmeldir." },
        { question: "Mortanas AI temsilcilerinin davranışlarını özelleştirebilir miyim?", answer: "Evet, farklı müşteri segmentleri ve arama senaryoları için özel diyalog akışları, ses tonları ve yanıt stratejileri oluşturabilirsiniz." },
        { question: "Mortanas AI temsilcilerini eğitmek zor mu?", answer: "Hayır. Kullanıcı dostu arayüzümüz ve hazır şablonlarımız sayesinde, işletmenizin sıkça sorulan sorularını ve süreçlerini sisteme kolayca yükleyerek yapay zekayı hızla eğitebilirsiniz." }
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const handleFaqClick = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">YAPAY ZEKA ÇAĞRI MERKEZİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Geleneksel Satış ve Destek Ekipleri Artık Geçmişte Kaldı!
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                         Yüksek kaliteli etkileşimler sunun, operasyonel maliyetleri önemli ölçüde azaltın ve insan ekibinizle uyum içinde çalışan 7/24 tasarruf sağlayan, maliyet etkin bir yardımcı kazanın.
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                              Hemen Dene
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-blue-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1587560699334-cc426240aE6f?q=80&w=2070&auto=format&fit=crop" alt="Yapay Zeka Çağrı Merkezi" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl font-bold text-white mb-4">Satış Ekipleri İçin <span className="text-blue-400">Dış Arama Çözümleri</span></h2>
                      <p className="text-slate-300 mb-6">Satış ekipleri, tüm potansiyel müşterilerine zamanında ulaşmakta genellikle zorlanır. Mortanas AI’nin sesli asistan teknolojisi sayesinde, satış ekipleri adına dış aramalar otomatikleştirilebilir ve müşteriler telefon görüşmeleri sırasında kazanılabilir.</p>
                      <ul className="space-y-4">
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>24/7 otomatik müşteri aramalarıyla hiçbir satış fırsatını kaçırmayın.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Her bir potansiyel müşteriye zamanında ulaşarak dönüşüm oranlarınızı artırın.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Rutin arama görevlerini Mortanas AI’ye devrederek ekiplerinizin stratejik işlere odaklanmasını sağlayın.</span></li>
                      </ul>
                  </div>
                  <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h3 className="font-semibold text-white mb-4">Özelleştirilmiş Çözümler</h3>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-center"><i className="fas fa-arrow-right text-blue-400 mr-3"></i>Farklı müşteri segmentleri için özel arama senaryoları oluşturun.</p>
                            <p className="flex items-center"><i className="fas fa-arrow-right text-blue-400 mr-3"></i>Ekip büyütmeden satış faaliyetlerinizi ölçeklendirin.</p>
                            <p className="flex items-center"><i className="fas fa-arrow-right text-blue-400 mr-3"></i>Çağrı analizlerinden değerli içgörüler elde edin.</p>
                        </div>
                  </div>
              </div>
          </section>

          <section className="container mx-auto px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white">Mortanas AI Çağrı Merkezi Neler Yapabilir?</h2>
                  <p className="mt-4 text-slate-400">Yapay zeka destekli Mortanas AI Call Center, gelen, giden ve cevapsız çağrıları anında analiz ederek doğru yanıtlarla satışa dönüştürür.</p>
              </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard icon="fas fa-volume-up" title="Gerçek İnsan Sesi" description="Gerçek insan sesiyle konuşan yapay zeka temsilcileri ile doğal bir diyalog kurun."/>
                    <FeatureCard icon="fas fa-clock" title="7/24 Aktif Hizmet" description="Asistanınız mola vermez, hata yapmaz ve her zaman müşterileriniz için hazırdır."/>
                    <FeatureCard icon="fas fa-headset" title="Canlı Temsilciye Aktarım" description="Gerektiğinde çağrıyı, tüm konuşma geçmişiyle birlikte bir satış temsilcisine sorunsuz yönlendirir."/>
                    <FeatureCard icon="fas fa-file-alt" title="Raporlama ve Analiz" description="Her görüşmeyi kaydeder, özet çıkarır ve performansınızı artırmak için size detaylı raporlar sunar."/>
                    <FeatureCard icon="fas fa-globe" title="Çoklu Dil Desteği" description="Birden fazla dili aksansız bir şekilde destekleyerek global müşterilerinize ulaşın."/>
                    <FeatureCard icon="fas fa-calendar-check" title="Randevu ve Sipariş Yönetimi" description="Randevu alma, sipariş sorgulama ve fiyatlandırma bilgisi gibi işlemleri otomatikleştirin."/>
                </div>
          </section>
          
          <section className="bg-slate-800/50 py-24">
              <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                             <h3 className="font-semibold text-white mb-4">Gelişmiş Çözümler</h3>
                             <div className="space-y-3 text-sm">
                                <p className="flex items-center"><i className="fas fa-arrow-left text-blue-400 mr-3"></i>Mevcut takvim sisteminizle entegre çalışarak randevu yönetimini sorunsuz hale getirin.</p>
                                <p className="flex items-center"><i className="fas fa-arrow-left text-blue-400 mr-3"></i>Müşterilerinize 7/24 randevu alma imkânı sunun.</p>
                                <p className="flex items-center"><i className="fas fa-arrow-left text-blue-400 mr-3"></i>Kişiselleştirilmiş randevu onaylarını ve takip mesajlarını otomatik olarak gönderin.</p>
                            </div>
                        </div>
                        <div>
                           <h2 className="text-3xl font-bold text-white mb-4">Randevu Alma ve Hatırlatma Süreçlerini <span className="text-blue-400">Kolayca Yönetin</span></h2>
                           <p className="text-slate-300">Diş klinikleri, güzellik salonları ve diğer hizmet sağlayıcıları genellikle randevu onayları ve hatırlatmalarıyla uğraşmak zorunda kalır. Mortanas AI, bu süreci tamamen otomatik hale getirerek zaman tasarrufu sağlar, iptalleri azaltır ve müşteri memnuniyetini artırır.</p>
                        </div>
                    </div>
              </div>
          </section>

          <section className="container mx-auto px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white">Geleneksel ve Yapay Zeka Çağrı Merkezi Karşılaştırması</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <div className="bg-slate-800 p-8 rounded-2xl border border-red-500/30">
                    <h3 className="text-2xl font-bold text-red-400 mb-6">Geleneksel Çağrı Merkezi</h3>
                    <div className="space-y-4">
                        <ComparisonItem text="7/24 Ulaşılabilirlik Eksikliği" isMortanas={false} />
                        <ComparisonItem text="Yüksek Operasyonel Maliyetler" isMortanas={false} />
                        <ComparisonItem text="Kaçan Satış Fırsatları" isMortanas={false} />
                        <ComparisonItem text="Tutarsız Müşteri Deneyimi" isMortanas={false} />
                    </div>
                </div>
                 <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-400 mb-6">Mortanas AI Çağrı Merkezi</h3>
                    <div className="space-y-4">
                        <ComparisonItem text="7/24/365 Kesintisiz Hizmet" isMortanas={true} />
                        <ComparisonItem text="Maliyet Etkin Çözüm" isMortanas={true} />
                        <ComparisonItem text="Maksimum Satış Fırsatları" isMortanas={true} />
                        <ComparisonItem text="Tutarlı ve Yüksek Kaliteli Etkileşimler" isMortanas={true} />
                    </div>
                </div>
              </div>
          </section>
          
          <section className="bg-slate-900 py-24">
              <div className="container mx-auto px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                  </div>
                  <div className="max-w-4xl mx-auto space-y-4">
                      {faqs.map((faq, index) => (
                          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-blue-400">
                            <button onClick={() => handleFaqClick(index)} className="w-full flex justify-between items-center text-left p-5" aria-expanded={openFaqIndex === index}>
                                <span className="font-semibold text-white pr-4">{faq.question}</span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                    <i className={`fas fa-chevron-down transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}></i>
                                </div>
                            </button>
                            <div className={`grid transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden"><p className="px-5 pb-5 text-slate-300">{faq.answer}</p></div>
                            </div>
                        </div>
                      ))}
                  </div>
              </div>
          </section>

          <section>
            <div className="container mx-auto px-8">
              <div className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Bu Çığır Açan Teknolojiyi İlk Kullanan Siz Olun</h2>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                        <Link to="/kurumsal#iletisim" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                            Hemen Deneyin!
                        </Link>
                    </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default YapayZekaCagriMerkeziPage;
