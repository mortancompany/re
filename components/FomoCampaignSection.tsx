import React from 'react';
import { Link } from 'react-router-dom';

const FomoCampaignSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-slate-900 via-indigo-900/30 to-slate-900 text-white py-24">
            <div className="container mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-sm font-bold tracking-wider text-yellow-300 bg-yellow-500/10 px-4 py-2 rounded-full">HAREKETE GEÇİN</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
                            Rakipleriniz Dijitalleşirken <br /> Siz Geride Kalmayın
                        </h2>
                        <p className="mt-6 text-lg text-slate-300">
                            Dijital dönüşümü ertelemek, sadece bir fırsatı kaçırmak değil, aynı zamanda her geçen gün artan maliyetlere katlanmaktır. İşte harekete geçmemenin somut maliyetleri:
                        </p>
                        <div className="mt-10 space-y-6">
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <h3 className="font-bold text-xl text-white">Kaçan Satış Fırsatları</h3>
                                <p className="mt-2 text-slate-300">Anında yanıt alamayan müşterilerin <strong className="text-yellow-400">85%</strong>'i rakip firmalara yöneliyor.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <h3 className="font-bold text-xl text-white">Artan Operasyonel Maliyetler</h3>
                                <p className="mt-2 text-slate-300">Otomasyon kullanmayan işletmeler, müşteri hizmetleri için <strong className="text-yellow-400">60%</strong>'a varan daha fazla harcama yapıyor.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <h3 className="font-bold text-xl text-white">Düşen Müşteri Sadakati</h3>
                                <p className="mt-2 text-slate-300">Kötü bir müşteri deneyimi yaşayanların <strong className="text-yellow-400">90%</strong>'ı bir daha o markayı tercih etmiyor.</p>
                            </div>
                        </div>
                        <div className="mt-12">
                            <Link to="/kurumsal#iletisim" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-3">
                                <span>Dijital Dönüşüme Şimdi Başla</span>
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <img src="https://mortanas.com/resim/z.png" alt="Dijital Dönüşüm" className="rounded-2xl shadow-2xl ring-2 ring-slate-700 max-w-lg mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FomoCampaignSection;
