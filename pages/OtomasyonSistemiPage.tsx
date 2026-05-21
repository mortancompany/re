import React from 'react';
import { Link } from 'react-router-dom';

const OtomasyonSistemiPage: React.FC = () => {

  const faqs = [
      { question: "Mortanas AI nedir?", answer: "Mortanas AI, tüm dijital ihtiyaçlarınızı karşılayan ve tüm iletişim kanallarınızı tek bir panelde birleştiren bir araçtır. Müşteri desteğine ve kaliteli iletişime odaklanır ve gelişmiş otomasyon sistemi tarafından desteklenir." },
      { question: "Mortanas AI otomasyon sistemi işinize nasıl fayda sağlar?", answer: "Rutin dijital görevleri otomatikleştirir, zaman tasarrufu sağlar, personel maliyetlerini düşürür, insan hatalarını önler ve müşteri etkileşimini artırarak verimliliği yükseltir." },
      { question: "Mortanas AI'nin otomasyon sistemini kullanmak için kodlama bilgisine ihtiyaç var mı?", answer: "Hayır, herhangi bir kodlama bilgisi gerektirmeden, kullanıcı dostu arayüzü sayesinde otomasyonlarınızı kolayca oluşturabilir ve yönetebilirsiniz." },
      { question: "Mortanas AI’nin otomasyon sistemi müşteri etkileşimini nasıl geliştirir?", answer: "Tüm iletişim kanallarında (sosyal medya, e-posta, web sitesi) etkili bir hizmet sunarak, müşteri taleplerine anında ve tutarlı yanıtlar verir, bu da müşteri memnuniyetini ve sadakatini artırır." },
      { question: "Mortanas AI'nin otomasyon sistemi karar verme süreçlerini yönetebilir mi?", answer: "Evet. Rutin süreçlerin ötesinde kararlar gerektiğinde, sistem insan onayı aramaz. Yapay zeka ile karar verme sürecini değerlendirir ve iş akışına en fazla fayda sağlayacak seçimleri yapar." }
  ];

  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const handleFaqClick = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <div className="bg-slate-900 text-slate-300">
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 text-white pt-24 pb-16">
          <div className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <span className="text-sm font-bold tracking-wider text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full uppercase">OTOMASYON SİSTEMİ</span>
                      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                         Dijital Dünyada Manuel Çabaya <span className="text-purple-400">Veda Edin</span>
                      </h1>
                      <p className="mt-6 text-lg text-purple-200">
                         Mortanas AI sizi "en iyinin en iyisi" ile tanıştırıyor! Hızlı, pratik ve hatasız otomasyon sistemimiz sizin için en iyi sonuçları getiriyor!
                      </p>
                       <div className="mt-8">
                          <Link to="/kurumsal#iletisim" className="bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-600 transition-all transform hover:scale-105 inline-block">
                              7 Gün Ücretsiz Deneyin!
                          </Link>
                      </div>
                  </div>
                  <div className="relative rounded-2xl shadow-2xl ring-4 ring-purple-500/30 overflow-hidden aspect-video">
                      <img src="https://images.unsplash.com/photo-1593349480503-64d1737e7330?q=80&w=2070&auto=format&fit=crop" alt="Otomasyon Sistemi" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      <div className="py-24 space-y-24">
          <section className="container mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl font-bold text-white mb-4">Daha Çalışkan Bir <span className="text-purple-400">Personel Yok!</span></h2>
                      <p className="text-slate-300 mb-6">
                        Mortanas AI otomasyon sistemi, çeşitli web uygulamalarını birleştirir ve iş akışınızı otomatik bir seviyeye taşır. En iyi çalışanları bile gölgede bırakarak kusursuz, sürekli hizmet sunar ve insan hatasından kaçınır. Rutin dijital görevler daha kolay ve etkili hale gelir, zaman tasarrufu sağlar ve personel maliyetlerini düşürerek daha verimli bir iş akışı sağlar.
                      </p>
                  </div>
                  <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h3 className="font-semibold text-white mb-4">Manuel Müdahaleye Elveda!</h3>
                        <p className="text-slate-400">
                           Yapay zeka dokunuşu ile dijital rutinlerinizi otomatik süreçlere dönüştüren otomasyon sistemi, herhangi bir kodlama bilgisi gerektirmeden sizin için kusursuz bir şekilde çalışır. Mortanas AI’nın kullanıcı dostu arayüzü, bu sistemi kullanmayı kolaylaştırır.
                        </p>
                  </div>
              </div>
          </section>

          <section className="bg-slate-800/50 py-24">
              <div className="container mx-auto px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div className="hidden lg:block">
                           <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop" alt="İş Akışı Otomasyonu" className="rounded-xl shadow-lg"/>
                      </div>
                      <div>
                          <h2 className="text-3xl font-bold text-white mb-4">İş Akışınızı Otomasyonla <span className="text-purple-400">Kusursuzlaştırın</span></h2>
                          <div className="space-y-4 text-slate-300">
                              <p>Çeşitli faaliyetleri otomasyona devretmek, iş akışınızın kalitesini artırmayı kolaylaştırır. Dijital süreçlerinizin içeriğinden bağımsız olarak, bu sistem görevleri hızlı ve etkili bir şekilde gerçekleştirir. Ayrıca, rutine sadık kalarak aksama yaşanmamasını sağlar.</p>
                              <p>Otomasyon, insan hatalarından kaçınır ve süreçleri en iyi şekilde ilerletmek için kusursuz, kesintisiz bir iş akışı sağlar. Görevleri belirli bir düzende hatasız bir şekilde hatırlar ve sürekli olarak yerine getirir.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

           <section className="container mx-auto px-8">
                <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-slate-700 text-center">
                    <h2 className="text-3xl font-bold text-white">Otomasyonun Karar Vermesine İzin Verin!</h2>
                     <p className="mt-4 text-lg text-slate-300">
                        Rutin süreçlerin ötesinde kararlar gerektiğinde, sistem insan onayı aramaz. Yapay zeka ile karar verme sürecini değerlendirir ve iş akışına en fazla fayda sağlayacak seçimleri yapar.
                    </p>
                </div>
          </section>
          
          <section className="bg-slate-900 py-24">
              <div className="container mx-auto px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Sıkça Sorulan Sorular</h2>
                  </div>
                  <div className="max-w-4xl mx-auto space-y-4">
                      {faqs.map((faq, index) => (
                          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 transition-all duration-300 hover:border-purple-400">
                            <button onClick={() => handleFaqClick(index)} className="w-full flex justify-between items-center text-left p-5" aria-expanded={openFaqIndex === index}>
                                <span className="font-semibold text-white pr-4">{faq.question}</span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === index ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
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
              <div className="bg-purple-600 text-white rounded-2xl p-12 text-center shadow-2xl">
                   <h2 className="text-3xl font-bold mb-4">Mortanas AI’yi 7 Gün Ücretsiz Kullanın</h2>
                   <p className="max-w-3xl mx-auto mb-8 text-purple-100">
                      Tüm iletişim kanallarınızı tek bir yerden 360° yönetin.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/kurumsal#iletisim" className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block w-full sm:w-auto">
                            Ücretsiz Demo Hesabı!
                        </Link>
                    </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default OtomasyonSistemiPage;
