import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full border border-slate-700 hover:border-purple-500">
        <div className="flex-shrink-0 h-16 w-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5">
            <i className={`${icon} text-purple-400 text-3xl`}></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

const FAQItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm py-4 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 hover:border-purple-400">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
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

const YapayZekaHologramPage: React.FC = () => {
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
        baslangic: { monthly: 500, annually: 450, setup: 5000 },
        isletme: { monthly: 900, annually: 800, setup: 8000 },
        kurumsal: { monthly: 1500, annually: 1350, setup: 12000 },
    };

    const faqs = [
        {
            question: "Hologram Booth'un kurulumu ne kadar sürer?",
            answer: "Hologram Booth'un kurulumu genellikle 3-5 iş günü içinde tamamlanır. Mekan hazırlığı ve özel içerik üretimi gibi faktörlere bağlı olarak bu süre değişebilir."
        },
        {
            question: "Hologram Booth için özel bir mekan gerekiyor mu?",
            answer: "Hologram Booth'un optimal performans göstermesi için kontrollü ışık koşullarına sahip bir alan önerilir. Ancak, farklı ortamlara uyum sağlayabilen modeller de mevcuttur."
        },
        {
            question: "Hologram karakterini özelleştirebilir miyiz?",
            answer: "Evet, hologram karakterinin görünümü, sesi, kişiliği ve davranışları tamamen özelleştirilebilir. İşletmenizin kurumsal kimliğine ve ihtiyaçlarınıza uygun bir karakter oluşturulabilir."
        },
        {
            question: "Hologram Booth hangi dilleri destekliyor?",
            answer: "Hologram Booth şu anda Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve Arapça dillerini desteklemektedir. Talep üzerine diğer diller de eklenebilir."
        },
        {
            question: "Hologram Booth'u mevcut sistemlerimizle entegre edebilir miyiz?",
            answer: "Evet, Hologram Booth CRM sistemleri, rezervasyon uygulamaları ve veri tabanlarıyla entegre olabilir. API'lerimiz sayesinde özel entegrasyonlar da mümkündür."
        },
        {
            question: "Hologramın boyutu ve görünürlüğü ne kadar?",
            answer: "Standart hologramlarımız insan boyutundadır (yaklaşık 1.70m). Ancak, projenizin ihtiyacına göre farklı boyutlarda çözümler de üretebiliriz. En iyi görünürlük için doğrudan güneş ışığı almayan, kontrollü aydınlatmaya sahip alanlar idealdir."
        },
        {
            question: "Hologram karakteri olarak istediğimiz bir kişiyi modelleyebilir misiniz?",
            answer: "Evet, CEO'nuz, bir marka yüzü veya tarihi bir karakter gibi istediğiniz herhangi bir kişinin 3D modelini oluşturarak hologram asistan olarak canlandırabiliriz."
        },
        {
            question: "Hologram Booth'un elektrik tüketimi yüksek mi?",
            answer: "Hayır, kullandığımız modern LED ve projeksiyon teknolojileri sayesinde Hologram Booth, standart bir ofis ekipmanına benzer düzeyde, enerji verimli bir şekilde çalışır."
        },
        {
            question: "Hologram, ziyaretçilerin hareketlerine tepki verebilir mi?",
            answer: "Evet, opsiyonel olarak eklenen hareket sensörleri ve kameralar sayesinde hologram, yakınına gelen birini algılayıp proaktif olarak selam verebilir veya etkileşime başlayabilir."
        },
        {
            question: "Fuar veya kısa süreli etkinlikler için kiralama seçeneği var mı?",
            answer: "Kesinlikle. Donanım, yazılım, kurulum ve etkinlik süresince teknik desteği içeren esnek günlük, haftalık veya aylık kiralama paketleri sunuyoruz."
        }
    ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-gray-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <span className="text-sm font-bold tracking-wider text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full uppercase">HOLOGRAM BOOTH</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                          Holografik Yapay Zeka <span className="text-purple-400">Asistanınız</span>
                      </h1>
                      <p className="mt-6 text-lg text-purple-200">
                         Hologram Booth, gerçek insan gibi konuşan, etkileşimli hologram asistan çözümüdür. Üç boyutlu görüntü teknolojisi ile ziyaretçilerinize etkileyici ve akılda kalıcı bir deneyim sunar.
                      </p>
                      <p className="mt-4 text-md text-purple-300">
                          Gelişmiş yapay zeka ve holografik projeksiyon teknolojileri sayesinde, ziyaretçilerinizle doğal bir şekilde iletişim kurar, sorularını yanıtlar ve yönlendirmeler yapar. Bu yenilikçi çözüm, işletmenizi rakiplerinizden ayırarak, müşteri deneyimini tamamen yeni bir boyuta taşır.
                      </p>
                  </div>
                  <div>
                      <img src="https://i.imgur.com/f8dYp3g.png" alt="Yapay Zeka Hologram Booth" className="rounded-2xl shadow-2xl ring-4 ring-purple-500/30" />
                  </div>
              </div>
          </div>
      </section>

      <div className="container mx-auto px-8 py-24 space-y-24">
          {/* Features Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Hologram Booth'un Sunduğu Avantajlar</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                     Ziyaretçi deneyimini unutulmaz kılan ve markanızı geleceğe taşıyan fütüristik özellikler.
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard 
                      icon="fas fa-cube"
                      title="3D Holografik Görüntü"
                      description="Üç boyutlu holografik projeksiyon teknolojisi ile gerçekçi insan görüntüsü sunar."
                  />
                  <FeatureCard 
                      icon="fas fa-comments"
                      title="Doğal Diyalog"
                      description="Gelişmiş doğal dil işleme ile akıcı ve doğal konuşma yeteneği sağlar."
                  />
                  <FeatureCard 
                      icon="fas fa-smile"
                      title="Duygusal İfadeler"
                      description="Yüz ifadeleri ve beden dili ile duygusal bağlantı kurarak etkileşimi güçlendirir."
                  />
                  <FeatureCard 
                      icon="fas fa-language"
                      title="Çoklu Dil Desteği"
                      description="Birden fazla dilde hizmet vererek uluslararası ziyaretçilere destek sağlar."
                  />
                  <FeatureCard 
                      icon="fas fa-eye"
                      title="Görsel Tanıma"
                      description="Ziyaretçileri tanıyarak kişiselleştirilmiş karşılama ve hizmet sunar."
                  />
                  <FeatureCard 
                      icon="fas fa-cloud"
                      title="Uzaktan Yönetim"
                      description="İçerik ve davranışları bulut üzerinden kolayca güncelleyebilirsiniz."
                  />
              </div>
          </section>

          {/* Problem, Solution, Why Buy Section */}
          <section>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Sıradanlıktan Sıyrılın, Geleceği Yakalayın</h2>
                  <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                      Marka imajınızı ve ziyaretçi deneyiminizi bir üst seviyeye taşımak için geleneksel yöntemlerin ötesine geçin.
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
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Standart ekranlar ve tabelalar fark edilmiyor.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Fuar ve etkinliklerde rekabetten sıyrılmak zor.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Markanızın yenilikçi kimliğini yansıtmakta güçlük çekmek.</span></li>
                          <li className="flex items-start"><i className="fas fa-times-circle text-red-400 mr-3 mt-1"></i><span>Ziyaretçiler üzerinde kalıcı bir etki bırakamamak.</span></li>
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
                          <strong>Yapay Zeka Hologramı</strong>, fütüristik bir deneyim sunarak;
                      </p>
                      <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Tüm dikkatleri üzerine çeken 3D bir asistan sunar.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Ziyaretçilerle doğal bir dilde sohbet eder.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Markanızın hikayesini ve ürünlerinizi etkileyici bir şekilde anlatır.</span></li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Unutulmaz ve "vay be" dedirten bir anı yaratır.</span></li>
                      </ul>
                  </div>

                  {/* Neden Almalısınız? */}
                  <div className="bg-purple-900/20 p-8 rounded-2xl border-2 border-purple-500/30">
                      <div className="flex items-center space-x-4 mb-4">
                           <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <i className="fas fa-rocket text-purple-400 text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-purple-400">Neden Almalısınız?</h3>
                      </div>
                       <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-purple-400 mr-3 mt-1"></i><span><strong>Marka Prestiji:</strong> Markanızı teknoloji lideri ve yenilikçi olarak konumlandırır.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-purple-400 mr-3 mt-1"></i><span><strong>Yüksek Etkileşim:</strong> Ziyaretçi trafiğini ve standınızda/mağazanızda geçirilen süreyi artırır.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-purple-400 mr-3 mt-1"></i><span><strong>Sosyal Medya Etkisi:</strong> Ziyaretçilerin fotoğraf ve video çekip paylaşmasını teşvik ederek organik tanıtım sağlar.</span></li>
                          <li className="flex items-start"><i className="fas fa-arrow-up-right-dots text-purple-400 mr-3 mt-1"></i><span><strong>Kalıcı Hafıza:</strong> Rakipleriniz unutulurken, markanız ziyaretçilerin aklında kalır.</span></li>
                      </ul>
                  </div>
              </div>
          </section>

          {/* Use Cases Section */}
           <section className="bg-slate-900 py-24 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-900 to-slate-900"></div>
              <div className="container mx-auto px-8 relative z-10">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                          Fütüristik <span className="text-purple-400">Kullanım Alanları</span>
                      </h2>
                      <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
                          Hologram Booth çözümümüzü işletmenizin prestijini artırmak için nasıl kullanabilirsiniz?
                      </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-blue-500/30 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-500">
                              <i className="fas fa-user-tie text-3xl text-blue-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">VIP Karşılama</h3>
                          <p className="text-slate-400 text-sm">Önemli müşterilerinizi etkileyici bir şekilde karşılayarak premium bir deneyim sunar. Kişiselleştirilmiş karşılama ile VIP hissi yaratır.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-pink-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-pink-500/30 transition-all duration-300 group-hover:bg-pink-500/20 group-hover:ring-pink-500">
                              <i className="fas fa-store-alt text-3xl text-pink-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Fuar ve Etkinlikler</h3>
                          <p className="text-slate-400 text-sm">Fuarlarda ve etkinliklerde standınızı öne çıkararak ziyaretçilerin ilgisini çeker. Ürünleriniz hakkında bilgi vererek satış ekibinize destek olur.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-yellow-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-yellow-500/30 transition-all duration-300 group-hover:bg-yellow-500/20 group-hover:ring-yellow-500">
                              <i className="fas fa-landmark text-3xl text-yellow-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Müze ve Sergi Alanları</h3>
                          <p className="text-slate-400 text-sm">Müzelerde ziyaretçilere rehberlik ederek eserleri ve sergileri tanıtır. İnteraktif bir deneyim sunarak öğrenmeyi daha eğlenceli hale getirir.</p>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-teal-500 hover:-translate-y-2 group">
                          <div className="flex-shrink-0 h-16 w-16 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 ring-1 ring-teal-500/30 transition-all duration-300 group-hover:bg-teal-500/20 group-hover:ring-teal-500">
                              <i className="fas fa-gem text-3xl text-teal-400"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Lüks Perakende</h3>
                          <p className="text-slate-400 text-sm">Lüks perakende mağazalarında müşterilere özel ürün tanıtımları yaparak alışveriş deneyimini zenginleştirir. Kişiselleştirilmiş ürün önerileri ile satışları artırır.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* FOMO Section */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 background-grid"></div>
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full uppercase">
                         RAKİPLERİNİZDEN SIYRILIN
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                          Sıradanlıktan Sıkıldınız mı?
                      </h2>
                      <p className="mt-6 text-lg text-slate-300">
                          Rakipleriniz sıkıcı broşürler dağıtırken, siz ziyaretçilerinize geleceği yaşatın. Holografik asistanlar, markanızın hafızalara kazınmasını sağlar.
                      </p>
                      <a href="#pricing" className="mt-8 bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 inline-block">
                          İnovasyona Adım Atın
                      </a>
                  </div>
                  <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                          <div className="flex-shrink-0 text-5xl font-bold text-purple-400">3X</div>
                          <div>
                              <h3 className="font-bold text-lg text-white">Daha Fazla Stand Trafiği</h3>
                              <p className="text-slate-300 text-sm">Hologramlar, fuarlarda standınıza 3 kat daha fazla ziyaretçi çeker.</p>
                          </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                          <div className="flex-shrink-0 text-5xl font-bold text-purple-400">95%</div>
                          <div>
                              <h3 className="font-bold text-lg text-white">Marka Hatırlanırlığı</h3>
                              <p className="text-slate-300 text-sm">Ziyaretçilerin %95'i, hologram gördükleri markayı bir ay sonra bile hatırlar.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

           {/* New Campaign FOMO Section */}
           <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-purple-500/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[32rem] h-[32rem] bg-fuchsia-500/20 rounded-full blur-3xl opacity-50"></div>
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left">
                        <span className="text-sm font-bold tracking-wider text-yellow-300 bg-yellow-500/20 px-3 py-1.5 rounded-full uppercase">
                            <i className="fas fa-fire animate-pulse mr-2"></i>
                            Lansmana Özel Kampanya
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                            Geleceği Ertelemeyin!
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                           "Vay be" etkisi yaratmanın tam zamanı. Rakiplerinizden önce davranın ve markanızı holografik teknoloji ile geleceğe taşıyın. <strong className="text-yellow-300">%50 kurulum indirimi fırsatını kaçırmayın!</strong>
                        </p>
                        <a href="#pricing" className="mt-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                            <span>Paketleri İncele</span>
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
                     İşletmenizin prestijine ve bütçenize en uygun holografik çözümü seçin.
                  </p>
              </div>

              <div className="flex justify-center mb-12">
                  <div className="bg-slate-800 rounded-lg p-1 flex items-center space-x-1">
                      <button onClick={() => setBillingCycle('monthly')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${billingCycle === 'monthly' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Aylık</button>
                      <button onClick={() => setBillingCycle('annually')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${billingCycle === 'annually' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                          Yıllık
                          <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Tasarruf Edin</span>
                      </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {/* Başlangıç */}
                  <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Başlangıç</h3>
                          <p className="mt-2 text-slate-400">Etkinlikler ve özel tanıtımlar için.</p>
                           {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold text-white mt-6">{usdFormatter.format(pricing.baslangic.monthly)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold text-white">{usdFormatter.format(pricing.baslangic.annually)}<span className="text-lg font-medium text-slate-400">/aylık</span></p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">({usdFormatter.format(pricing.baslangic.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-slate-300">+ {usdFormatter.format(pricing.baslangic.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-slate-800 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>1 Adet Hologram Karakteri</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Aylık 10,000 Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Standart Raporlama</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>E-posta Desteği</span></li>
                          </ul>
                           <Link to={`/odeme?plan=Hologram Başlangıç&price=${(billingCycle === 'monthly' ? pricing.baslangic.monthly : pricing.baslangic.annually * 12)}&type=hologram&cycle=${billingCycle}&currency=USD&setupFee=${pricing.baslangic.setup}`} className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* İşletme - Popular */}
                  <div className="rounded-2xl shadow-2xl flex flex-col bg-purple-600 text-white transform lg:scale-105 ring-4 ring-yellow-400 z-10">
                      <div className="p-8 relative">
                          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-purple-900 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">En Popüler</div>
                          <h3 className="text-2xl font-bold">İşletme</h3>
                          <p className="mt-2 text-purple-200">Mağazalar, oteller ve kurumsal lobiler için.</p>
                          {billingCycle === 'monthly' ? (
                            <p className="text-5xl font-extrabold mt-6">{usdFormatter.format(pricing.isletme.monthly)}<span className="text-lg font-medium text-purple-200">/aylık</span></p>
                          ) : (
                            <div className="mt-6">
                                <p className="text-5xl font-extrabold">{usdFormatter.format(pricing.isletme.annually)}<span className="text-lg font-medium text-purple-200">/aylık</span></p>
                                <p className="mt-1 text-sm text-purple-200 font-medium">({usdFormatter.format(pricing.isletme.annually * 12)} yıllık faturalandırılır)</p>
                            </div>
                          )}
                          <p className="mt-2 font-semibold text-yellow-300">+ {usdFormatter.format(pricing.isletme.setup)} tek seferlik kurulum</p>
                      </div>
                      <div className="p-8 bg-purple-700 flex-grow rounded-b-2xl">
                          <ul className="space-y-4">
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>2 Adet Hologram Karakteri</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Aylık 50,000 Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Gelişmiş Raporlama ve Analitik</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mr-3 mt-1"></i><span>Öncelikli E-posta & Telefon Desteği</span></li>
                          </ul>
                          <Link to={`/odeme?plan=Hologram İşletme&price=${(billingCycle === 'monthly' ? pricing.isletme.monthly : pricing.isletme.annually * 12)}&type=hologram&cycle=${billingCycle}&currency=USD&setupFee=${pricing.isletme.setup}`} className="mt-8 block w-full text-center py-3 font-bold rounded-lg bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition-colors">
                                Planı Seç
                            </Link>
                      </div>
                  </div>

                  {/* Kurumsal */}
                   <div className="rounded-2xl shadow-lg flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <div className="p-8">
                          <h3 className="text-2xl font-bold">Kurumsal</h3>
                          <p className="mt-2 text-slate-400">Büyük ölçekli ve özel projeler için.</p>
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
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Sınırsız Hologram Karakteri</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Sınırsız Etkileşim</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel API Erişimi ve Entegrasyon</span></li>
                              <li className="flex items-start"><i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i><span>Özel Müşteri Temsilcisi</span></li>
                          </ul>
                          <Link to="/kurumsal" className="mt-8 block w-full text-center py-3 font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                                Teklif Al
                            </Link>
                      </div>
                  </div>
              </div>
          </section>

          {/* Trial Offer */}
            <section>
                <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-fuchsia-900/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Info */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                                <i className="fas fa-rocket mr-2"></i>
                                Risksiz Keşfedin
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white">14 Günlük Deneme Sürümü</h3>
                            <p className="mt-4 text-lg text-slate-300">
                                Hologram çözümümüzün potansiyelini 14 gün boyunca kendi mekanınızda, hiçbir taahhüt altına girmeden test edin.
                            </p>
                            <div className="mt-6 text-left space-y-3">
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-purple-400 mr-3 mt-1"></i>
                                    <span>Tüm yazılım özelliklerine tam erişim.</span>
                                </p>
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-purple-400 mr-3 mt-1"></i>
                                    <span>Uzman ekibimizden kurulum ve donanım kiralama desteği.</span>
                                </p>
                                <p className="flex items-start text-slate-200">
                                    <i className="fas fa-check-circle text-purple-400 mr-3 mt-1"></i>
                                    <span>Memnun kalmazsanız kolay iptal imkanı.</span>
                                </p>
                            </div>
                        </div>
                        {/* Right Side: CTA */}
                        <div className="bg-slate-800 rounded-2xl p-8 text-center shadow-xl border border-slate-700">
                            <p className="text-xl font-bold text-white">Deneme Paketi</p>
                            <p className="text-5xl font-extrabold text-purple-400 my-4">{usdFormatter.format(500)}</p>
                            <p className="text-slate-400 font-medium mb-6">/ 14 Günlük Tam Erişim</p>
                            <Link to="/kurumsal" className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2 text-lg">
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
                        Hologram Booth hakkında merak edilenler.
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
          <section className="bg-purple-600 text-white rounded-2xl p-12 text-center shadow-2xl">
               <h2 className="text-3xl font-bold mb-4">Hologram Booth ile Geleceği Bugüne Taşıyın</h2>
               <p className="max-w-3xl mx-auto mb-8 text-purple-100">
                  Holografik asistan teknolojisi ile ziyaretçilerinize unutulmaz bir deneyim sunun, işletmenizi rakiplerinizden ayırın ve geleceğin teknolojisini bugünden kullanmaya başlayın.
               </p>
               <Link to="/kurumsal" className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block">
                  Teklif Alın
              </Link>
          </section>
      </div>
    </div>
  );
};

export default YapayZekaHologramPage;