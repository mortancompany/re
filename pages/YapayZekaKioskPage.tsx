import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full border border-slate-700 hover:border-blue-500">
        <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
            <i className={`${icon} text-blue-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm py-4 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 hover:border-blue-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
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

const YapayZekaKioskPage: React.FC = () => {
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
        single: { monthly: 300, annually: 250, setup: 3000 },
        triple: { monthly: 840, annually: 690, setup: 8000 },
        quintuple: { monthly: 1300, annually: 1050, setup: 12000 },
    };

    const faqs = [
        {
            question: "Video Agent / Kiosk'un kurulumu ne kadar sürer?",
            answer: "Video Agent / Kiosk'un temel kurulumu genellikle 2-3 iş günü içinde tamamlanır. İçerik özelleştirme ve entegrasyon ihtiyaçlarınıza bağlı olarak bu süre değişebilir."
        },
        {
            question: "Video Agent / Kiosk hangi dilleri destekliyor?",
            answer: "Video Agent / Kiosk şu anda Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve Arapça dillerini desteklemektedir. Talep üzerine diğer diller de eklenebilir."
        },
        {
            question: "Video Agent / Kiosk'u mevcut sistemlerimizle entegre edebilir miyiz?",
            answer: "Evet, Video Agent / Kiosk yaygın kullanılan CRM sistemleri, rezervasyon uygulamaları ve veri tabanlarıyla kolayca entegre olabilir. API'lerimiz sayesinde özel entegrasyonlar da mümkündür."
        },
        {
            question: "Video Agent / Kiosk için nasıl bir donanım gerekiyor?",
            answer: "Video Agent / Kiosk çözümümüz, standart dokunmatik ekranlı kiosk donanımlarıyla uyumludur. İsteğe bağlı olarak, donanım çözümlerini de paket olarak sunabiliyoruz."
        },
        {
            question: "Video Agent / Kiosk'u özelleştirebilir miyiz?",
            answer: "Evet, Video Agent / Kiosk'u işletmenizin kurumsal kimliğine ve ihtiyaçlarına göre tamamen özelleştirebilirsiniz. Arayüz tasarımı, içerik ve işlevsellik için özelleştirme seçenekleri mevcuttur."
        },
        {
            question: "Kiosk'un arayüzü markamızın kimliğine göre özelleştirilebilir mi?",
            answer: "Evet, arayüz renkleri, logolar ve yazı tipleri dahil olmak üzere tamamen markanızın kurumsal kimliğine uygun olarak tasarlanabilir."
        },
        {
            question: "Kiosk üzerinden ödeme alınabilir mi?",
            answer: "Evet, güvenli ödeme altyapıları (Stripe, iyzico vb.) ile entegre edilerek kredi kartı ile ödeme alma özelliği eklenebilir."
        },
        {
            question: "İnternet bağlantısı kesildiğinde Kiosk çalışmaya devam eder mi?",
            answer: "Temel bilgilendirme ve yönlendirme gibi kritik fonksiyonlar çevrimdışı modda çalışmaya devam edebilir. Ancak, canlı veri gerektiren (örn: rezervasyon) işlemler için aktif bir internet bağlantısı gereklidir."
        },
        {
            question: "Kiosk'un bakım ve teknik desteğini sağlıyor musunuz?",
            answer: "Evet, hem yazılım güncellemelerini hem de olası sorunlara karşı 7/24 teknik desteği içeren kapsamlı destek ve bakım paketleri sunuyoruz."
        },
        {
            question: "Kiosk'un topladığı verileri nasıl analiz edebilirim?",
            answer: "Size özel olarak sunulan web tabanlı analiz paneli üzerinden, en çok sorulan sorular, kullanıcı etkileşim süreleri ve popüler içerikler gibi birçok veriye anlık olarak ulaşabilirsiniz."
        }
    ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">VIDEO AGENT / KIOSK</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                          Görsel Yapay Zeka <span className="text-blue-400">Asistanınız</span>
                      </h1>
                      <p className="mt-6 text-lg text-blue-200">
                          Video Agent / Kiosk, ziyaretçilerinize görsel destekle yönlendirme ve bilgi sunan dijital bir danışman/asistan çözümüdür. İnteraktif ekran arayüzü ile müşterilerinize sezgisel ve etkileyici bir deneyim sunar.
                      </p>
                      <p className="mt-4 text-md text-blue-300">
                          Gelişmiş görüntü işleme ve doğal dil anlama teknolojileri sayesinde, ziyaretçilerinizin sorularını ve taleplerini doğru şekilde anlayarak, görsel destekli yanıtlar ve yönlendirmeler sağlar. Bu da müşteri memnuniyetini artırırken, personel iş yükünü azaltır.
                      </p>
                  </div>
                  <div>
                      <img src="https://i.imgur.com/8E8J5jW.png" alt="Yapay Zeka Kiosk Arayüzü" className="rounded-2xl shadow-2xl ring-4 ring-blue-500/30" />
                  </div>
              </div>
          </div>
      </section>

      <div className="container mx-auto px-8 py-24 space-y-24">
          {/* Features Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Video Agent / Kiosk'un Sunduğu Avantajlar</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     Ziyaretçi deneyimini zenginleştiren ve operasyonel verimliliği artıran temel özellikler.
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard 
                      icon="fas fa-hand-pointer"
                      title="İnteraktif Arayüz"
                      description="Dokunmatik ekran ve sesli komut desteği ile kullanıcı dostu bir deneyim sunar."
                  />
                  <FeatureCard 
                      icon="fas fa-route"
                      title="Yönlendirme Sistemi"
                      description="İç mekan haritaları ve yol tarifi ile ziyaretçileri doğru yere yönlendirir."
                  />
                  <FeatureCard 
                      icon="fas fa-language"
                      title="Çoklu Dil Desteği"
                      description="Birden fazla dilde hizmet vererek uluslararası ziyaretçilere destek sağlar."
                  />
                  <FeatureCard 
                      icon="fas fa-photo-film"
                      title="Görsel İçerik Sunumu"
                      description="Ürün ve hizmetlerinizi tanıtan video ve görseller ile etkileyici bir tanıtım yapar."
                  />
                  <FeatureCard 
                      icon="fas fa-user-plus"
                      title="Ziyaretçi Kaydı"
                      description="Ziyaretçi bilgilerini toplayarak, müşteri veri tabanınızı zenginleştirir."
                  />
                  <FeatureCard 
                      icon="fas fa-cloud"
                      title="Uzaktan Yönetim"
                      description="İçerik ve ayarları bulut üzerinden kolayca güncelleyebilirsiniz."
                  />
              </div>
          </section>

          {/* Problem, Solution, Why Buy Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Verimsiz Süreçlerden, Akıllı Çözümlere</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                      İşletmenizin karşılaştığı zorlukları anlıyor ve onlara özel çözümler üretiyoruz.
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
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Personelin sürekli tekrar eden sorularla meşgul olması.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Ziyaretçilerin aradıkları bilgiye ulaşmakta zorlanması.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Mesai saatleri dışında ziyaretçilere destek verilememesi.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Statik ve sıkıcı bilgilendirme panoları.</span></li>
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
                          <strong>Yapay Zeka Kiosk</strong>, 7/24 çalışan bir dijital asistan olarak;
                      </p>
                      <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Sıkça sorulan soruları anında yanıtlar.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>İnteraktif haritalarla yönlendirme yapar.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Ürün ve hizmetleri görsel olarak tanıtır.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Ziyaretçi bilgilerini ve geri bildirimlerini toplar.</span></li>
                      </ul>
                  </div>

                  {/* Neden Almalısınız? */}
                  <div className="bg-blue-900/20 p-8 rounded-2xl border-2 border-blue-500/30">
                      <div className="flex items-center space-x-4 mb-4">
                           <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <i className="fas fa-rocket text-blue-400 text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-blue-400">Neden Almalısınız?</h3>
                      </div>
                       <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-blue-400 mr-3 mt-1"></i><span><strong>Verimlilik Artışı:</strong> Personeliniz %40'a varan zaman tasarrufu sağlar.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-blue-400 mr-3 mt-1"></i><span><strong>Müşteri Memnuniyeti:</strong> Bekleme süresini azaltarak ziyaretçi deneyimini iyileştirir.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-blue-400 mr-3 mt-1"></i><span><strong>Modern Marka İmajı:</strong> Teknolojiyi kullanan yenilikçi bir marka algısı yaratır.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-blue-400 mr-3 mt-1"></i><span><strong>Veri Toplama:</strong> Ziyaretçi davranışları hakkında değerli veriler toplayarak stratejinizi güçlendirir.</span></li>
                      </ul>
                  </div>
              </div>
          </section>

          {/* Use Cases Section - Redesigned */}
          <section className="bg-slate-900 py-24 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900"></div>
              <div className="container mx-auto px-8 relative z-10">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                          Çok Yönlü <span className="text-blue-400">Kullanım Alanları</span>
                      </h2>
                      <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                          Video Agent / Kiosk çözümümüzü işletmenizin farklı noktalarında nasıl değerlendirebilirsiniz?
                      </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Card 1 */}
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-blue-500/30 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-500">
                              <i className="fas fa-hands-helping text-3xl text-blue-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Karşılama ve Yönlendirme</h3>
                          <p className="text-slate-400 text-sm">Ziyaretçileri karşılayarak, aradıkları yere veya kişiye yönlendirir. Bina içi haritalar ve yol tarifleri ile ziyaretçilerin kaybolmasını önler.</p>
                      </div>
                      {/* Card 2 */}
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-purple-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-purple-500/30 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:ring-purple-500">
                              <i className="fas fa-store text-3xl text-purple-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Ürün ve Hizmet Tanıtımı</h3>
                          <p className="text-slate-400 text-sm">Ürün ve hizmetleriniz hakkında detaylı bilgi ve görsel içerik sunarak, müşterilerin karar verme sürecini hızlandırır.</p>
                      </div>
                      {/* Card 3 */}
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-teal-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-teal-500/30 transition-all duration-300 group-hover:bg-teal-500/20 group-hover:ring-teal-500">
                              <i className="fas fa-calendar-alt text-3xl text-teal-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Etkinlik Yönetimi</h3>
                          <p className="text-slate-400 text-sm">Etkinlik programları, konuşmacı bilgileri ve salon yerleşimleri hakkında bilgi vererek, etkinlik katılımcılarına rehberlik eder.</p>
                      </div>
                      {/* Card 4 */}
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-indigo-500/30 transition-all duration-300 group-hover:bg-indigo-500/20 group-hover:ring-indigo-500">
                              <i className="fas fa-tasks text-3xl text-indigo-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Self-Servis İşlemler</h3>
                          <p className="text-slate-400 text-sm">Randevu alma, kayıt oluşturma ve form doldurma gibi işlemleri otomatikleştirerek, müşteri hizmetleri süreçlerini hızlandırır.</p>
                      </div>
                  </div>
              </div>
          </section>
          
          {/* FOMO Section */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 background-grid"></div>
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1.5 rounded-full uppercase">
                         REKABETTE GERİ KALMAYIN
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                          Dijital Deneyimde Geri Kalmayın
                      </h2>
                      <p className="mt-6 text-lg text-slate-300">
                          Müşteriler artık hızlı, interaktif ve kişiselleştirilmiş hizmet bekliyor. Rakipleriniz fiziksel mekanlarını dijitalleştirirken, siz geride kalmayın.
                      </p>
                      <a href="#pricing" className="mt-8 bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-teal-600 transition-all transform hover:scale-105 inline-block">
                          Rekabette Öne Geçin
                      </a>
                  </div>
                  <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                          <div className="flex-shrink-0 text-5xl font-bold text-teal-400">85%</div>
                          <div>
                              <h3 className="font-bold text-lg text-white">Müşteri Tercihi</h3>
                              <p className="text-slate-300 text-sm">Müşterilerin %85'i, bir insanla konuşmak yerine self-servis seçeneklerini kullanmayı tercih ediyor.</p>
                          </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                          <div className="flex-shrink-0 text-5xl font-bold text-teal-400">30%</div>
                          <div>
                              <h3 className="font-bold text-lg text-white">Maliyet Düşüşü</h3>
                              <p className="text-slate-300 text-sm">İnteraktif kiosklar, danışma ve personel maliyetlerini %30'a varan oranda düşürüyor.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* New Campaign FOMO Section */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-cyan-500/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left">
                        <span className="text-sm font-bold tracking-wider text-yellow-300 bg-yellow-500/20 px-3 py-1.5 rounded-full uppercase">
                            <i className="fas fa-fire animate-pulse mr-2"></i>
                            Lansmana Özel Kampanya
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                            Bu Fırsatı Kaçırmayın!
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                            Yapay zeka kiosk ile ziyaretçi deneyimini modernize edin, personel verimliliğini artırın ve marka imajınızı güçlendirin. <strong className="text-yellow-300">%50 kurulum indirimi sadece kısa bir süre için geçerli!</strong>
                        </p>
                        <a href="#pricing" className="mt-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
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
                     İhtiyaçlarınıza ve bütçenize en uygun çözümü seçin. Yıllık ödemelerde avantajlı fiyatlardan yararlanın.
                  </p>
              </div>

              <div className="flex justify-center mb-12">
                  <div className="bg-slate-800 rounded-lg p-1 flex items-center space-x-1">
                      <button onClick={() => setBillingCycle('monthly')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Aylık</button>
                      <button onClick={() => setBillingCycle('annually')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${billingCycle === 'annually' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                          Yıllık
                          <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Tasarruf Edin</span>
                      </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {/* 1 Kiosk */}
                  <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Tek Kiosk Paketi</h3>
                          <p className="mt-2 text-slate-400">Küçük ve orta ölçekli mekanlar için ideal başlangıç.</p>
                          {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold text-white mt-6">{usdFormatter.format(pricing.single.monthly)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold text-white">{usdFormatter.format(pricing.single.annually)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">({usdFormatter.format(pricing.single.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-slate-300">+ {usdFormatter.format(pricing.single.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-slate-800 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>1 Adet Kiosk Lisansı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aylık 5,000 Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Standart Raporlama</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>E-posta Desteği</span></li>
                          </ul>
                           <Link to={`/odeme?plan=Tek Kiosk Paketi&price=${(billingCycle === 'monthly' ? pricing.single.monthly : pricing.single.annually * 12)}&type=kiosk&cycle=${billingCycle}&currency=USD&setupFee=${pricing.single.setup}`} className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* 3 Kiosks - Popular */}
                  <div className="rounded-2xl shadow-2xl flex flex-col bg-blue-600 text-white transform lg:scale-105 ring-4 ring-yellow-400 z-10">
                      <div className="p-8 relative">
                          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">En Popüler</div>
                          <h3 className="text-2xl font-bold">Çoklu Kiosk Paketi</h3>
                          <p className="mt-2 text-blue-200">Büyük mekanlar ve birden fazla giriş noktası için.</p>
                          {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold mt-6">{usdFormatter.format(pricing.triple.monthly)}<span className="text-lg font-medium text-blue-200">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold">{usdFormatter.format(pricing.triple.annually)}<span className="text-lg font-medium text-blue-200">/aylık</span></p>
                                <p className="mt-1 text-sm text-blue-200 font-medium">({usdFormatter.format(pricing.triple.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-yellow-300">+ {usdFormatter.format(pricing.triple.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-blue-700 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>3 Adet Kiosk Lisansı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Aylık 20,000 Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Gelişmiş Raporlama ve Analitik</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Öncelikli E-posta & Telefon Desteği</span></li>
                          </ul>
                          <Link to={`/odeme?plan=Çoklu Kiosk Paketi&price=${(billingCycle === 'monthly' ? pricing.triple.monthly : pricing.triple.annually * 12)}&type=kiosk&cycle=${billingCycle}&currency=USD&setupFee=${pricing.triple.setup}`} className="mt-8 block w-full text-center py-3 font-bold rounded-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* 5 Kiosks */}
                   <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Kurumsal Paket</h3>
                          <p className="mt-2 text-slate-400">Zincir işletmeler ve geniş kampüsler için.</p>
                           {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold text-white mt-6">{usdFormatter.format(pricing.quintuple.monthly)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                          ) : (
                             <div className="mt-6">
                                <p className="text-5xl font-extrabold text-white">{usdFormatter.format(pricing.quintuple.annually)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">({usdFormatter.format(pricing.quintuple.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-slate-300">+ {usdFormatter.format(pricing.quintuple.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-slate-800 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>5 Adet Kiosk Lisansı</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Sınırsız Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özelleştirilmiş Raporlama</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel Müşteri Temsilcisi</span></li>
                          </ul>
                          <Link to={`/odeme?plan=Kurumsal Paket&price=${(billingCycle === 'monthly' ? pricing.quintuple.monthly : pricing.quintuple.annually * 12)}&type=kiosk&cycle=${billingCycle}&currency=USD&setupFee=${pricing.quintuple.setup}`} className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>
              </div>
          </section>

          {/* Trial Offer */}
            <section>
                <div className="bg-gradient-to-br from-teal-900/30 via-cyan-900/30 to-blue-900/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Info */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block bg-teal-500/10 text-teal-300 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                                <i className="fas fa-rocket mr-2"></i>
                                Risksiz Keşfedin
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white">14 Günlük Deneme Sürümü</h3>
                            <p className="mt-4 text-lg text-slate-300">
                                Kiosk çözümümüzün potansiyelini 14 gün boyunca kendi mekanınızda, hiçbir taahhüt altına girmeden test edin.
                            </p>
                            <div className="mt-6 text-left space-y-3">
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-teal-400 mr-3 mt-1"></i>
                                    <span>Tüm yazılım özelliklerine tam erişim.</span>
                                </p>
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-teal-400 mr-3 mt-1"></i>
                                    <span>Uzman ekibimizden kurulum ve donanım kiralama desteği.</span>
                                </p>
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-teal-400 mr-3 mt-1"></i>
                                    <span>Memnun kalmazsanız kolay iptal imkanı.</span>
                                </p>
                            </div>
                        </div>
                        {/* Right Side: CTA */}
                        <div className="bg-slate-800 rounded-2xl p-8 text-center shadow-xl border border-slate-700">
                            <p className="text-xl font-bold text-white">Deneme Paketi</p>
                            <p className="text-5xl font-extrabold text-teal-400 my-4">{usdFormatter.format(200)}</p>
                            <p className="text-slate-400 font-medium mb-6">/ 14 Günlük Tam Erişim</p>
                            <Link to="/kurumsal" className="w-full bg-teal-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-teal-600 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2 text-lg">
                               <i className="fas fa-paper-plane"></i>
                               <span>Denemeyi Başlat</span>
                            </Link>
                            <p className="text-xs text-slate-500 mt-4">Kurulum ve donanım kiralama dahildir.</p>
                        </div>
                    </div>
                </div>
            </section>


          {/* FAQ Section */}
          <section className="py-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                    <p className="mt-2 text-base text-slate-300 max-w-3xl mx-auto">
                        Video Agent / Kiosk hakkında merak edilenler.
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
          <section className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
               <h2 className="text-3xl font-bold mb-4">Video Agent / Kiosk ile Müşteri Deneyimini Dönüştürün</h2>
               <p className="max-w-3xl mx-auto mb-8 text-blue-100">
                  Ziyaretçi karşılama ve bilgilendirme süreçlerinizi otomatikleştirin, müşteri memnuniyetini artırın ve işletmenizi geleceğe taşıyın.
               </p>
               <Link to="/kurumsal" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block">
                  Teklif Alın
              </Link>
          </section>
      </div>
    </div>
  );
};

export default YapayZekaKioskPage;