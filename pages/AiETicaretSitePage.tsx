import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AiWebPricingSection from '../components/AiWebPricingSection';
import type { FAQ } from '../types';

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-start text-left p-6"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-minus rotate-180' : 'fa-plus'}`}></i>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-300">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string; color?: 'blue' | 'green' }> = ({ icon, title, description, color = 'blue' }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
        green: { bg: 'bg-green-500/10', text: 'text-green-400' },
    };
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full border border-slate-700">
            <div className={`flex-shrink-0 h-16 w-16 ${colorClasses[color].bg} rounded-xl flex items-center justify-center mb-5`}>
                <i className={`${icon} ${colorClasses[color].text} text-3xl`}></i>
            </div>
            <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
            <p className="text-slate-300">{description}</p>
        </div>
    );
};

const ProblemSolutionCard: React.FC<{ problem: string; solution: string; }> = ({ problem, solution }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-700">
        <div className="p-6">
            <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                </div>
                <h4 className="font-bold text-lg text-red-400">Sorun</h4>
            </div>
            <p className="text-slate-300">{problem}</p>
        </div>
        <div className="bg-green-900/20 p-6 border-t border-green-500/30">
             <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check-circle text-green-400"></i>
                </div>
                <h4 className="font-bold text-lg text-green-400">Çözüm</h4>
            </div>
            <p className="text-slate-200 font-medium">{solution}</p>
        </div>
    </div>
);

const FomoSection: React.FC = () => (
    <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-3xl opacity-40"></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
                <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">
                    Rekabette Öne Çıkın
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                    Terk Edilmiş Sepetleri Geri Kazanın
                </h2>
                <p className="mt-6 text-lg text-slate-300">
                    E-ticaretteki en büyük sorunlardan biri terk edilmiş sepetlerdir. Yapay zeka destekli bir site ile elde edeceğiniz somut avantajlar:
                </p>
                <Link to="/kurumsal" className="mt-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 text-lg">
                    <span>Hemen Harekete Geçin</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">25%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Fazla Dönüşüm</h3>
                        <p className="text-slate-300 text-sm">Kişiselleştirilmiş ürün önerileri, dönüşüm oranlarını %25'e kadar artırabilir.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">15%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Yüksek Sepet Değeri</h3>
                        <p className="text-slate-300 text-sm">AI, akıllı çapraz satış ve ek satış önerileriyle ortalama sepet değerini %15 artırır.</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center space-x-5">
                    <div className="flex-shrink-0 text-5xl font-bold text-blue-400">30%</div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Daha Az Destek Yükü</h3>
                        <p className="text-slate-300 text-sm">AI asistanı, müşteri destek taleplerini %30 oranında azaltarak ekibinize zaman kazandırır.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const AiETicaretSitePage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs: FAQ[] = [
        { 
            question: "Yapay Zeka E-Ticaret Sitesi, Shopify veya WooCommerce gibi platformlarla çalışır mı?",
            answer: "Evet! Çözümümüz, mevcut Shopify, WooCommerce, Magento ve diğer popüler e-ticaret platformlarınızla tam entegre çalışır. Ürün kataloğunuzu, siparişlerinizi ve müşteri verilerinizi sorunsuz bir şekilde senkronize eder."
        },
        { 
            question: "AI Ürün Öneri motoru nasıl çalışıyor?",
            answer: "Yapay zeka, ziyaretçinin gezdiği ürünleri, sepetine eklediklerini ve benzer müşteri davranışlarını analiz eder. Bu verilere dayanarak, her kullanıcıya özel 'Bunlar da ilginizi çekebilir' veya 'Bunu alanlar bunu da aldı' gibi kişiselleştirilmiş öneriler sunar."
        },
        { 
            question: "Terk edilmiş sepet kurtarma özelliği nasıl işliyor?",
            answer: "Bir müşteri sepetine ürün ekleyip siteyi terk ettiğinde, AI asistanımız devreye girer. Belirli bir süre sonra müşteriye WhatsApp veya e-posta üzerinden, sepetindeki ürünleri hatırlatan ve belki de küçük bir indirim sunan kişiselleştirilmiş bir mesaj gönderir."
        },
        { 
            question: "Kurulum süreci ne kadar sürer ve karmaşık mıdır?",
            answer: "Kurulum oldukça basittir. Mevcut e-ticaret platformunuzla entegrasyonu ve yapay zekanın ürünleriniz hakkında eğitilmesi dahil, anahtar teslim projemiz genellikle 3-5 iş günü içinde tamamlanır."
        },
        { 
            question: "Hangi ödeme altyapılarıyla entegrasyon sağlıyorsunuz?",
            answer: "Stripe, iyzico, PayTR gibi Türkiye'de ve dünyada yaygın olarak kullanılan tüm güvenli ödeme altyapılarıyla tam entegrasyon sağlıyoruz."
        },
        { 
            question: "AI asistanı hangi dilleri destekliyor?",
            answer: "Asistanımız, Türkçe ve İngilizce başta olmak üzere 10'dan fazla dilde hizmet verebilir. Bu, global pazarlara açılmak isteyen markalar için büyük bir avantajdır."
        }
    ];

    const whatsappLink = `https://wa.me/905540118888?text=${encodeURIComponent("Merhaba, Yapay Zeka E-Ticaret Sitesi hakkında bilgi almak istiyorum.")}`;
    const aiAssistantFeatures = [
        { icon: "fas fa-search", title: "Doğal Dilde Ürün Arama", description: "Müşteriler, 'kırmızı spor ayakkabı' gibi doğal ifadelerle arama yapabilir. AI, en uygun ürünleri anında bulur." },
        { icon: "fas fa-shipping-fast", title: "Sipariş Takibi ve Destek", description: "Müşteriler, sohbet penceresinden ayrılmadan siparişlerinin durumunu öğrenebilir ve iade/değişim gibi taleplerini başlatabilir." },
        { icon: "fas fa-arrow-up-right-dots", title: "Proaktif Ek Satış ve Çapraz Satış", description: "Müşteri bir ürünü sepetine eklediğinde, AI o ürünle uyumlu tamamlayıcı ürünleri (örn: telefon kılıfı) akıllıca önerir." }
    ];
    const howItWorksSteps = [
        {
            icon: 'fa-plug',
            title: '1. Mağazanızı Bağlayın',
            description: 'Mevcut e-ticaret platformunuzu (Shopify, WooCommerce vb.) ve ürün kataloğunuzu sisteme sadece birkaç tıkla entegre ediyoruz.'
        },
        {
            icon: 'fa-brain',
            title: '2. Yapay Zekayı Eğitin',
            description: 'Yapay zekayı; ürünleriniz, marka diliniz ve müşteri hizmetleri senaryolarınızla eğitiyoruz. Asistanınız, markanızın bir uzmanı haline geliyor.'
        },
        {
            icon: 'fa-rocket',
            title: '3. Satışları Otomata Alın',
            description: 'Akıllı siteniz yayına girer. 7/24 satış yapmaya, müşteri sorularını yanıtlamaya ve dönüşüm oranlarınızı artırmaya başlarsınız.'
        },
    ];

    return (
        <div className="bg-slate-900 text-slate-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 text-white pt-24 pb-16">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full uppercase">YAPAY ZEKA WEB SİTESİ</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                                Satışlarınızı Otomata Alan <span className="text-blue-400">Akıllı E-Ticaret Siteniz</span>
                            </h1>
                            <p className="mt-6 text-lg text-blue-200">
                                Sadece ürün listeleyen bir vitrinden çok daha fazlası. Mortanas Yapay Zeka Web, her müşteriye kişiselleştirilmiş bir alışveriş deneyimi sunar, 7/24 satış yapar ve terk edilmiş sepetleri geri kazanır.
                            </p>
                            <div className="mt-8">
                                <Link to="/kurumsal" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block">
                                    Teklif Alın
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="AI E-Commerce Website Mockup" className="rounded-2xl shadow-2xl ring-4 ring-blue-500/30" />
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-8 py-24 space-y-24">
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl py-20 -mx-8 px-8 border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Neden Yapay Zeka Destekli Bir E-Ticaret Sitesi?</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           Dönüşüm oranlarını artırın, müşteri sadakatini güçlendirin ve operasyonel yükünüzü hafifletin.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="fas fa-wand-magic-sparkles"
                            title="AI Destekli Ürün Önerileri"
                            description="Ziyaretçinin davranışlarını analiz ederek kişiselleştirilmiş ürünler sunar, çapraz satış ve ek satış fırsatları yaratır."
                        />
                        <FeatureCard 
                            icon="fas fa-robot"
                            title="7/24 AI Satış Asistanı"
                            description="Sipariş takibi, ürün bilgisi, iade süreçleri gibi konularda müşterilerinize anında yanıt vererek destek ekibinizin yükünü azaltır."
                        />
                         <FeatureCard 
                            icon="fas fa-sync-alt"
                            title="Otomatik Stok Senkronizasyonu"
                            description="Tüm satış kanallarınızdaki (mağaza, web sitesi, pazar yerleri) stokları anlık olarak senkronize eder, 'stokta yok' sürprizlerini önler."
                        />
                        <FeatureCard 
                            icon="fas fa-tags"
                            title="Dinamik Fiyatlandırma ve Promosyonlar"
                            description="Piyasa talebine, rakip fiyatlarına ve müşteri segmentlerine göre AI, en etkili kampanya ve indirimleri önerir."
                        />
                        <FeatureCard 
                            icon="fas fa-shopping-cart-arrow-down"
                            title="Terk Edilmiş Sepet Kurtarma"
                            description="Sepetini terk eden müşterilere WhatsApp veya e-posta üzerinden otomatik ve kişiselleştirilmiş hatırlatmalar göndererek satışı tamamlar."
                        />
                         <FeatureCard 
                            icon="fas fa-chart-line"
                            title="Kişiselleştirilmiş Müşteri Yolculuğu"
                            description="Her müşteriye özel ana sayfa düzenleri, teklifler ve içerikler sunarak alışveriş deneyimini benzersiz kılar."
                        />
                    </div>
                </section>
                
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-inner border border-slate-700">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Klasik Mağazaların Yarattığı Fırsat Kayıpları</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                           E-ticarette sıkça karşılaşılan ve gelirinizi düşüren sorunlara getirdiğimiz akıllı çözümler.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                       <ProblemSolutionCard
                            problem="Ziyaretçilerin %70'i sepetlerini bir daha geri dönmemek üzere terk eder."
                            solution="AI, terk edilmiş sepetleri proaktif olarak takip eder, kişiselleştirilmiş hatırlatmalarla müşteriyi geri kazanır."
                       />
                       <ProblemSolutionCard
                            problem="Standart siteler, her müşteriye aynı ürünleri gösterir, bu da düşük dönüşüm oranlarına yol açar."
                            solution="AI, her müşterinin zevkine ve davranışına göre vitrini yeniden düzenler, dönüşüm oranlarını artırır."
                       />
                       <ProblemSolutionCard
                            problem="Sipariş durumu, iade politikası gibi basit sorular müşteri hizmetleri ekibinizin zamanının %60'ını alır."
                            solution="AI Satış Asistanı, bu tür soruları 7/24 anında yanıtlayarak ekibinizin daha karmaşık sorunlara odaklanmasını sağlar."
                       />
                    </div>
                </section>

                <section className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Mağazanızın Yeni Çalışanı: <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">7/24 AI Satış Asistanı</span></h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                               Bu asistan uyumaz, yorulmaz ve her müşterinizle aynı anda ilgilenerek satışlarınızı artırır.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {aiAssistantFeatures.map((feature, index) => (
                                <div key={index} className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">
                                    <div className="flex-shrink-0 h-16 w-16 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                                        <i className={`${feature.icon} text-3xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-300">{feature.description}</p>
                                </div>
                           ))}
                        </div>
                    </div>
                </section>
                
                <FomoSection />

                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">3 Adımda <span className="text-blue-400">Akıllı Mağazanız</span> Hazır</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Karmaşık teknik süreçleri unutun. Anahtar teslim yaklaşımımızla e-ticaret sitenizi hızla ve zahmetsizce dönüştürüyoruz.
                        </p>
                    </div>
                    <div className="relative container mx-auto px-6">
                        <div className="absolute left-6 md:left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-800 rounded-full"></div>
                        <div className="space-y-16">
                            {howItWorksSteps.map((step, index) => (
                                <div key={index} className={`relative flex items-center group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-blue-600 rounded-full items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-blue-400`}></i>
                                    </div>
                                    <div className="md:hidden absolute top-0 -left-6 w-12 h-12 bg-slate-900 border-4 border-blue-600 rounded-full flex items-center justify-center z-10">
                                        <i className={`fas ${step.icon} text-xl text-blue-400`}></i>
                                    </div>
                                    <div className="md:w-1/2">
                                        <div className={`w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700 transform ${index % 2 !== 0 ? 'md:ml-auto md:group-hover:translate-x-2' : 'md:group-hover:-translate-x-2'} transition-transform duration-300 ml-10 md:ml-0`}>
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <p className="mt-2 text-slate-300">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <AiWebPricingSection planName="Yapay Zeka E-Ticaret Sitesi" themeColor="blue" />

                <section id="faq" className="bg-slate-800/50 backdrop-blur-sm py-24 rounded-2xl border border-slate-700">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan <span className="text-blue-400">Sorular</span></h2>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} faq={faq} isOpen={openFaqIndex === index} onClick={() => handleFaqClick(index)} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto">
                    <div className="bg-slate-900 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 items-center">
                            <div className="p-8 md:p-12 lg:p-16 text-center lg:text-left z-10">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">E-Ticarette Devrim</span><br /> Yapmaya Hazır mısınız?
                                </h2>
                                <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto lg:mx-0">
                                   Yapay zekanın gücüyle satışlarınızı nasıl artırabileceğinizi, müşteri sadakatini nasıl güçlendirebileceğinizi ve operasyonlarınızı nasıl otomatikleştirebileceğinizi öğrenmek için bugün bizimle iletişime geçin.
                                </p>
                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                  <Link to="/kurumsal" className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fas fa-calendar-check mr-3"></i>
                                    Ücretsiz Strateji Görüşmesi
                                  </Link>
                                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                                    <i className="fab fa-whatsapp mr-3"></i>
                                    WhatsApp'tan Sor
                                  </a>
                                </div>
                            </div>
                            <div className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden">
                                 <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="E-Ticaret Arayüzü" className="relative w-4/5 lg:absolute lg:w-full lg:max-w-xl lg:-right-10 rounded-xl shadow-2xl ring-2 ring-white/10 transform lg:rotate-6" />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AiETicaretSitePage;
