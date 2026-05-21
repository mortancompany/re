import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Re-usable FeatureCard component
const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full border border-slate-700 hover:border-indigo-500">
        <div className="flex-shrink-0 h-16 w-16 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-5">
            <i className={`${icon} text-indigo-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

// Re-usable FAQItem component
const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm py-4 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 hover:border-indigo-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="text-slate-300 text-sm mt-1">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const YapayZekaVoiceAgentPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const [offerEndDate] = useState(() => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = +offerEndDate - +new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                });
            } else {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [offerEndDate]);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const pricing = {
        temel: { monthly: 200, annually: 180, setup: 2000, minutes: "1,000" },
        profesyonel: { monthly: 800, annually: 720, setup: 3000, minutes: "5,000" },
        kurumsal: { monthly: 1500, annually: 1350, setup: 5000, minutes: "10,000+" },
    };

    const faqs = [
        {
            question: "Voice Agent'ın kurulumu ne kadar sürer?",
            answer: "Voice Agent'ın temel kurulumu genellikle 1-2 iş günü içinde tamamlanır. Özelleştirme ihtiyaçlarınıza bağlı olarak bu süre değişebilir."
        },
        {
            question: "Voice Agent hangi dilleri destekliyor?",
            answer: "Voice Agent şu anda Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve Arapça dillerini desteklemektedir. Talep üzerine diğer diller de eklenebilir."
        },
        {
            question: "Voice Agent'ı mevcut sistemlerimizle entegre edebilir miyiz?",
            answer: "Evet, Voice Agent yaygın kullanılan CRM sistemleri, takvim uygulamaları ve telefon sistemleriyle kolayca entegre olabilir. API'lerimiz sayesinde özel entegrasyonlar da mümkündür."
        },
        {
            question: "Voice Agent'ın ses kalitesi nasıl?",
            answer: "Voice Agent, en son teknoloji ses sentezleme teknolojisini kullanarak, insan sesinden ayırt edilmesi zor, doğal ve akıcı bir ses kalitesi sunar."
        },
        {
            question: "Voice Agent'ı özelleştirebilir miyiz?",
            answer: "Evet, Voice Agent'ı işletmenizin ihtiyaçlarına göre tamamen özelleştirebilirsiniz. Ses tonu, konuşma stili, yanıt senaryoları ve daha fazlası için özelleştirme seçenekleri mevcuttur."
        },
        {
            question: "Voice Agent, acil durumlarda veya anlayamadığı bir soruda ne yapar?",
            answer: "Yapay zeka, önceden tanımlanmış senaryolar dahilinde veya bir görüşmenin karmaşıklaştığını anladığında, konuşmayı tüm geçmişiyle birlikte anında canlı bir operatöre akıllıca aktarabilir."
        },
        {
            question: "Görüşme kayıtlarına erişebilir miyim?",
            answer: "Evet, tüm sesli görüşmeler, kalite kontrol ve yasal gereklilikler için güvenli bir şekilde kayıt altına alınır. Yetkili kullanıcılar bu kayıtlara web tabanlı panel üzerinden erişebilir."
        },
        {
            question: "Voice Agent'ı giden aramalar (outbound) için de kullanabilir miyiz?",
            answer: "Evet, Voice Agent sadece gelen çağrıları karşılamakla kalmaz, aynı zamanda randevu hatırlatmaları, anketler, borç bilgilendirmeleri veya pazarlama kampanyaları gibi amaçlarla otomatik giden aramalar da yapabilir."
        },
        {
            question: "Fiyatlandırma dakika başına mı, yoksa çağrı başına mı yapılıyor?",
            answer: "Fiyatlandırmamız, aylık belirli bir konuşma dakikası içeren esnek paketlere dayanmaktadır. Paket aşımı durumunda ek dakika ücretlendirmesi yapılır. Bu model, çağrı başına ücretlendirmeye göre genellikle daha avantajlıdır."
        },
        {
            question: "Voice Agent'ın konuşma hızını ve tonunu ayarlayabilir miyiz?",
            answer: "Evet, markanızın kimliğine en uygun iletişim tarzını yaratmak için ses tonunu (örneğin, enerjik, sakin, profesyonel), konuşma hızını ve vurguları özelleştirebiliriz."
        }
    ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <span className="text-sm font-bold tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1.5 rounded-full uppercase">VOICE AGENT</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                          Sesli Yapay Zeka <span className="text-indigo-400">Asistanınız</span>
                      </h1>
                      <p className="mt-6 text-lg text-indigo-200">
                         Voice Agent, işletmeniz adına telefon görüşmeleri yapabilen, müşteri sorularını yanıtlayabilen ve randevuları yönetebilen gelişmiş bir yapay zeka çözümüdür. İnsan benzeri ses tonuyla doğal konuşma akışı sağlar ve müşterilerinize kesintisiz hizmet sunar.
                      </p>
                      <p className="mt-4 text-md text-indigo-300">
                         Gelişmiş doğal dil işleme teknolojisi sayesinde, müşterilerinizin sorularını ve taleplerini doğru şekilde anlayarak, hızlı ve tutarlı yanıtlar verir. Bu da müşteri memnuniyetini artırırken, operasyonel maliyetlerinizi düşürür.
                      </p>
                  </div>
                  <div>
                      <img src="https://i.imgur.com/vHqJ5zL.png" alt="Yapay Zeka Voice Agent" className="rounded-2xl shadow-2xl ring-4 ring-indigo-500/30" />
                  </div>
              </div>
          </div>
      </section>

      <div className="container mx-auto px-8 py-24 space-y-24">
          {/* Features Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Voice Agent'ın Sunduğu Avantajlar</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     Müşteri iletişimini otomatikleştiren ve operasyonel verimliliği artıran güçlü yetenekler.
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard 
                      icon="fas fa-phone-volume"
                      title="Otomatik Arama"
                      description="Belirlediğiniz müşteri listesini otomatik olarak arar ve görüşmeleri gerçekleştirir."
                  />
                  <FeatureCard 
                      icon="fas fa-calendar-alt"
                      title="Randevu Yönetimi"
                      description="Randevuları oluşturabilir, değiştirebilir ve iptal edebilir, takvim entegrasyonu sağlar."
                  />
                  <FeatureCard 
                      icon="fas fa-chart-pie"
                      title="Analitik Raporlama"
                      description="Görüşme süreleri, başarı oranları ve müşteri memnuniyeti hakkında detaylı raporlar sunar."
                  />
                  <FeatureCard 
                      icon="fas fa-language"
                      title="Çoklu Dil Desteği"
                      description="Birden fazla dilde hizmet vererek global müşteri kitlesine ulaşmanızı sağlar."
                  />
                  <FeatureCard 
                      icon="fas fa-user-check"
                      title="Kişiselleştirilmiş Deneyim"
                      description="Müşteri geçmişine göre kişiselleştirilmiş görüşmeler yaparak bağlılık oluşturur."
                  />
                  <FeatureCard 
                      icon="fas fa-cogs"
                      title="Kolay Entegrasyon"
                      description="CRM ve diğer iş sistemlerinizle sorunsuz entegrasyon sağlayarak veri akışını optimize eder."
                  />
              </div>
          </section>

          {/* Problem, Solution, Why Buy Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Çağrı Merkezi Maliyetlerinden Kurtulun</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                      Geleneksel çağrı yönetiminin getirdiği zorlukları ve Voice Agent'ın sunduğu akıllı çözümleri keşfedin.
                  </p>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                  {/* Sorun */}
                  <div className="bg-red-900/20 p-8 rounded-2xl border-2 border-red-500/30">
                      <div className="flex items-center space-x-4 mb-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                              <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-red-400">Sorun</h3>
                      </div>
                      <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Cevapsız kalan çağrılar nedeniyle müşteri ve gelir kaybı.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Yüksek çağrı merkezi ve personel maliyetleri.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Hizmet kalitesinde tutarsızlık ve insan hataları.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Personelin tekrarlayan telefon görüşmeleriyle zaman kaybetmesi.</span></li>
                      </ul>
                  </div>

                  {/* Çözüm */}
                  <div className="bg-green-900/20 p-8 rounded-2xl border-2 border-green-500/30">
                      <div className="flex items-center space-x-4 mb-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                              <i className="fas fa-lightbulb text-green-400 text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-green-400">Çözüm</h3>
                      </div>
                      <p className="text-slate-300 mb-4">
                          <strong>Yapay Zeka Voice Agent</strong>, 7/24 çalışan bir sanal santral gibi;
                      </p>
                      <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Gelen tüm çağrıları anında karşılar.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aynı anda yüzlerce görüşme yapabilir.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Randevu alır, bilgi verir, anket yapar.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Her görüşmede tutarlı ve profesyonel bir hizmet sunar.</span></li>
                      </ul>
                  </div>

                  {/* Neden Almalısınız? */}
                  <div className="bg-indigo-900/20 p-8 rounded-2xl border-2 border-indigo-500/30">
                      <div className="flex items-center space-x-4 mb-4">
                           <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <i className="fas fa-rocket text-indigo-400 text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-indigo-400">Neden Almalısınız?</h3>
                      </div>
                       <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-indigo-400 mr-3 mt-1"></i><span><strong>%70'e Varan Maliyet Avantajı:</strong> Çağrı merkezi maliyetlerinizi önemli ölçüde azaltın.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-indigo-400 mr-3 mt-1"></i><span><strong>%100 Çağrı Karşılama:</strong> Hiçbir potansiyel müşteriyi veya önemli telefonu kaçırmayın.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-indigo-400 mr-3 mt-1"></i><span><strong>Personel Verimliliği:</strong> Ekibiniz zamanını tekrarlayan telefon görüşmeleri yerine katma değerli işlere ayırsın.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-indigo-400 mr-3 mt-1"></i><span><strong>Ölçeklenebilir Büyüme:</strong> İşletmeniz büyüdükçe yeni personel ihtiyacı olmadan çağrı hacminizi artırın.</span></li>
                      </ul>
                  </div>
              </div>
          </section>

          {/* Use Cases Section */}
           <section className="bg-slate-900 py-24 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900 to-slate-900"></div>
              <div className="container mx-auto px-8 relative z-10">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                          Geniş <span className="text-indigo-400">Kullanım Alanları</span>
                      </h2>
                      <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                          Voice Agent çözümümüzü işletmenizin farklı departmanlarında nasıl verimli kullanabilirsiniz?
                      </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-blue-500/30 group-hover:bg-blue-500/20 group-hover:ring-blue-500">
                              <i className="fas fa-headset text-3xl text-blue-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Müşteri Hizmetleri</h3>
                          <p className="text-slate-400 text-sm">Sık sorulan soruları yanıtlayarak destek ekibinizin iş yükünü azaltır. Gerektiğinde insan temsilciye yönlendirir.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-pink-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-pink-500/30 group-hover:bg-pink-500/20 group-hover:ring-pink-500">
                              <i className="fas fa-bullhorn text-3xl text-pink-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Satış ve Pazarlama</h3>
                          <p className="text-slate-400 text-sm">Potansiyel müşterileri arayarak ürünleriniz hakkında bilgi verir, kampanyaları duyurur ve satış fırsatları yaratır.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-yellow-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-yellow-500/30 group-hover:bg-yellow-500/20 group-hover:ring-yellow-500">
                              <i className="fas fa-calendar-check text-3xl text-yellow-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Randevu Hatırlatmaları</h3>
                          <p className="text-slate-400 text-sm">Yaklaşan randevuları hatırlatarak unutmayı önler ve iptal oranlarını düşürür. Gerektiğinde değişiklik yapabilir.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-teal-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-teal-500/30 group-hover:bg-teal-500/20 group-hover:ring-teal-500">
                              <i className="fas fa-poll text-3xl text-teal-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Anket ve Geri Bildirim</h3>
                          <p className="text-slate-400 text-sm">Müşteri memnuniyeti anketleri yaparak hizmet kalitesini ölçer ve iyileştirme alanlarını belirler. Geri bildirimleri analiz eder.</p>
                      </div>
                  </div>
              </div>
          </section>
          
          {/* FOMO Section */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 background-grid"></div>
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left">
                        <span className="text-sm font-bold tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1.5 rounded-full uppercase">
                           PAZAR PAYINIZI KAPTIRMAYIN
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                            Cevapsız Her Çağrı, Kayıp Bir Müşteridir
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                            Rakipleriniz müşteri deneyimini 7/24 otomatize ederken, siz geride kalmayın. Akıllı sesli asistanlar ile verimliliğinizi artırın ve pazarın lideri olun.
                        </p>
                        <a href="#pricing" className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 inline-block">
                            Rekabette Öne Geçin
                        </a>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                            <div className="flex-shrink-0 text-5xl font-bold text-indigo-400">88%</div>
                            <div>
                                <h3 className="font-bold text-lg text-white">Müşteri Beklentisi</h3>
                                <p className="text-slate-300 text-sm">Müşterilerin %88'i, bir şirketten anında telefonla yanıt bekliyor.</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                            <div className="flex-shrink-0 text-5xl font-bold text-indigo-400">60%</div>
                            <div>
                                <h3 className="font-bold text-lg text-white">Verimlilik Artışı</h3>
                                <p className="text-slate-300 text-sm">Voice Agent kullanan firmalar operasyonel verimliliklerini ortalama %60 artırıyor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          {/* New Campaign FOMO Section */}
           <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-indigo-500/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left">
                        <span className="text-sm font-bold tracking-wider text-yellow-300 bg-yellow-500/20 px-3 py-1.5 rounded-full uppercase">
                            <i className="fas fa-fire animate-pulse mr-2"></i>
                            Lansmana Özel Kampanya
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                            Hiçbir Müşteriyi Kaçırmayın!
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                           Cevapsız çağrılar nedeniyle kaybettiğiniz geliri geri kazanmanın zamanı geldi. Voice Agent ile 7/24 hizmet verin. <strong className="text-yellow-300">Bu özel indirimler sadece kısa bir süre için geçerli!</strong>
                        </p>
                        <a href="#pricing" className="mt-10 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                            <span>İndirimden Yararlanın</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
                        <p className="text-center font-semibold text-slate-200 mb-4">Teklifin Sona Ermesine Kalan Süre:</p>
                        <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center">
                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                <span className="text-4xl font-bold text-white">{timeLeft.days}</span>
                                <span className="block text-xs text-slate-300 mt-1">Gün</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                <span className="text-4xl font-bold text-white">{timeLeft.hours}</span>
                                <span className="block text-xs text-slate-300 mt-1">Saat</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                <span className="text-4xl font-bold text-white">{timeLeft.minutes}</span>
                                <span className="block text-xs text-slate-300 mt-1">Dakika</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 w-20 shadow-inner">
                                <span className="text-4xl font-bold text-white">{timeLeft.seconds}</span>
                                <span className="block text-xs text-slate-300 mt-1">Saniye</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          {/* Pricing Section */}
          <section id="pricing">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Fiyatlandırma Paketlerimiz</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     İşletmenizin çağrı hacmine ve bütçenize en uygun çözümü seçin.
                  </p>
              </div>

              <div className="flex justify-center mb-12">
                  <div className="bg-slate-800 rounded-lg p-1 flex items-center space-x-1">
                      <button onClick={() => setBillingCycle('monthly')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Aylık</button>
                      <button onClick={() => setBillingCycle('annually')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${billingCycle === 'annually' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                          Yıllık
                          <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">%10 İndirim</span>
                      </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {/* Temel */}
                  <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Temel Paket</h3>
                          <p className="mt-2 text-slate-400">Küçük işletmeler ve başlangıçlar için.</p>
                          {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold text-white mt-6">{usdFormatter.format(pricing.temel.monthly)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold text-white">{usdFormatter.format(pricing.temel.annually)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">({usdFormatter.format(pricing.temel.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-slate-300">+ {usdFormatter.format(pricing.temel.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-slate-800 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aylık <strong>{pricing.temel.minutes}</strong> Konuşma Dakikası</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aynı Anda <strong>5</strong> Çağrı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Standart Raporlama</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>E-posta Desteği</span></li>
                          </ul>
                           <Link to={`/odeme?plan=Voice Agent Temel&price=${(billingCycle === 'monthly' ? pricing.temel.monthly : pricing.temel.annually * 12)}&type=voice-agent&cycle=${billingCycle}&currency=USD&setupFee=${pricing.temel.setup}`} className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* Profesyonel - Popular */}
                  <div className="rounded-2xl shadow-2xl flex flex-col bg-indigo-600 text-white transform lg:scale-105 ring-4 ring-yellow-400 z-10">
                      <div className="p-8 relative">
                          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-indigo-900 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">En Popüler</div>
                          <h3 className="text-2xl font-bold">Profesyonel Paket</h3>
                          <p className="mt-2 text-indigo-200">Büyüyen işletmeler ve çağrı merkezleri için.</p>
                          {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold mt-6">{usdFormatter.format(pricing.profesyonel.monthly)}<span className="text-lg font-medium text-indigo-200">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold">{usdFormatter.format(pricing.profesyonel.annually)}<span className="text-lg font-medium text-indigo-200">/aylık</span></p>
                                <p className="mt-1 text-sm text-indigo-200 font-medium">({usdFormatter.format(pricing.profesyonel.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-yellow-300">+ {usdFormatter.format(pricing.profesyonel.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-indigo-700 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Aylık <strong>{pricing.profesyonel.minutes}</strong> Konuşma Dakikası</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Aynı Anda <strong>25</strong> Çağrı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Gelişmiş Raporlama ve Analitik</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>CRM Entegrasyonu</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Öncelikli Destek</span></li>
                          </ul>
                          <Link to={`/odeme?plan=Voice Agent Profesyonel&price=${(billingCycle === 'monthly' ? pricing.profesyonel.monthly : pricing.profesyonel.annually * 12)}&type=voice-agent&cycle=${billingCycle}&currency=USD&setupFee=${pricing.profesyonel.setup}`} className="mt-8 block w-full text-center py-3 font-bold rounded-lg bg-yellow-400 text-indigo-900 hover:bg-yellow-300 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* Kurumsal */}
                   <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Kurumsal Paket</h3>
                          <p className="mt-2 text-slate-400">Yüksek hacimli ve özel ihtiyaçları olanlar için.</p>
                           {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold text-white mt-6">{usdFormatter.format(pricing.kurumsal.monthly)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold text-white">{usdFormatter.format(pricing.kurumsal.annually)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">({usdFormatter.format(pricing.kurumsal.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-slate-300">+ {usdFormatter.format(pricing.kurumsal.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-slate-800 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aylık <strong>{pricing.kurumsal.minutes}</strong> Konuşma Dakikası</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Sınırsız Eş Zamanlı Çağrı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel Raporlama ve API Erişimi</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel Entegrasyonlar</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel Müşteri Temsilcisi</span></li>
                          </ul>
                          <Link to="/kurumsal" className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                                Teklif Al
                            </Link>
                      </div>
                  </div>
              </div>
          </section>

          {/* Trial Offer */}
          <section>
              <div className="bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-violet-900/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* Left Side: Info */}
                      <div className="text-center lg:text-left">
                          <div className="inline-block bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                              <i className="fas fa-rocket mr-2"></i>
                              Risksiz Keşfedin
                          </div>
                          <h3 className="text-3xl md:text-4xl font-extrabold text-white">14 Günlük Deneme Sürümü</h3>
                          <p className="mt-4 text-lg text-slate-300">
                              Voice Agent çözümümüzün potansiyelini 14 gün boyunca canlı çağrılarla, hiçbir taahhüt altına girmeden test edin.
                          </p>
                          <div className="mt-6 text-left space-y-3">
                              <p className="flex items-start text-slate-200">
                                  <i className="fas fa-check-circle text-indigo-400 mr-3 mt-1"></i>
                                  <span>Tüm yazılım özelliklerine tam erişim.</span>
                              </p>
                              <p className="flex items-start text-slate-200">
                                  <i className="fas fa-check-circle text-indigo-400 mr-3 mt-1"></i>
                                  <span>Uzman ekibimizden kurulum ve santral entegrasyonu desteği.</span>
                              </p>
                              <p className="flex items-start text-slate-200">
                                  <i className="fas fa-check-circle text-indigo-400 mr-3 mt-1"></i>
                                  <span>Memnun kalmazsanız kolay iptal imkanı.</span>
                              </p>
                          </div>
                      </div>
                      {/* Right Side: CTA */}
                      <div className="bg-slate-800 rounded-2xl p-8 text-center shadow-xl border border-slate-700">
                          <p className="text-xl font-bold text-white">Deneme Paketi</p>
                          <p className="text-5xl font-extrabold text-indigo-400 my-4">{usdFormatter.format(100)}</p>
                          <p className="text-slate-400 font-medium mb-6">/ 14 Günlük Tam Erişim</p>
                          <Link to="/kurumsal" className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2 text-lg">
                             <i className="fas fa-paper-plane"></i>
                             <span>Denemeyi Başlat</span>
                          </Link>
                          <p className="text-xs text-slate-500 mt-4">Belirli bir dakika kullanım hakkı içerir.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                    <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto">
                        Voice Agent hakkında merak edilenler.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {faqs.slice(0, 5).map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                isOpen={openFaqIndex === index}
                                onClick={() => handleFaqClick(index)}
                            />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {faqs.slice(5, 10).map((faq, index) => (
                            <FAQItem
                                key={index + 5}
                                faq={faq}
                                isOpen={openFaqIndex === (index + 5)}
                                onClick={() => handleFaqClick(index + 5)}
                            />
                        ))}
                    </div>
                </div>
            </section>

          {/* CTA Section */}
          <section className="bg-indigo-600 text-white rounded-2xl p-12 text-center shadow-2xl">
               <h2 className="text-3xl font-bold mb-4">Voice Agent ile İşletmenizi Dönüştürün</h2>
               <p className="max-w-3xl mx-auto mb-8 text-indigo-100">
                  Müşteri hizmetlerinizi otomatikleştirin, operasyonel maliyetlerinizi düşürün ve müşteri memnuniyetini artırın. Voice Agent ile işletmenizi geleceğe taşıyın!
               </p>
               <Link to="/kurumsal" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block">
                  Teklif Alın
              </Link>
          </section>
      </div>
    </div>
  );
};

export default YapayZekaVoiceAgentPage;