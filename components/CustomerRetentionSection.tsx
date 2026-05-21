import React from 'react';

const CustomerRetentionSection: React.FC = () => {
    return (
        <section className="container mx-auto px-8">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900/50 rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 border border-indigo-500/30">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -inset-8 bg-indigo-500/10 rounded-full blur-3xl opacity-60"></div>
                        <img 
                            src="https://mortanas.com/resim/sosyal.png"
                            alt="Yapay Zeka Sosyal Medya Ajani"
                            className="relative rounded-2xl shadow-2xl ring-2 ring-slate-700 max-w-md mx-auto"
                        />
                    </div>
                    <div>
                        <span className="text-sm font-bold tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1.5 rounded-full uppercase">
                            MÜŞTERİ KAYBETMEYİ DURDURUN
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mt-4 text-white">
                            Cevapsız Kalan Her Mesaj, <span className="text-indigo-400">Kaybedilmiş Bir Müşteridir</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                            Yoğunluktan, mesai saatleri dışından veya tatillerden dolayı müşterilerinize anında dönemiyor musunuz? Potansiyel müşterilerinizin %80'i, ilk 5 dakika içinde yanıt alamazsa rakibinize gider.
                        </p>
                        <p className="mt-4 text-lg text-slate-200 font-semibold">
                            İşte bu noktada, sizin için özel olarak eğittiğimiz Yapay Zeka Sosyal Medya Ajani devreye giriyor.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start bg-white/5 p-4 rounded-lg">
                                <i className="fas fa-brain text-xl text-indigo-400 mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-bold text-white">Size Özel Eğitim</h4>
                                    <p className="text-sm text-slate-400">Yapay zekayı, işletmenizin ürünleri, hizmetleri ve iletişim diliyle eğitiyoruz. Müşterileriniz bir robotla değil, sizinle konuştuklarını hisseder.</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-white/5 p-4 rounded-lg">
                                <i className="fas fa-comments-dollar text-xl text-indigo-400 mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-bold text-white">7/24 Satış ve Destek</h4>
                                    <p className="text-sm text-slate-400">Ajanınız asla uyumaz. Rezervasyon alır, satış yapar, işletmeniz hakkında bilgi verir ve tüm bunları siz meşgulken bile anlık olarak gerçekleştirir.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerRetentionSection;
