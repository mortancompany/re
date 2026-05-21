import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Declare Stripe for TypeScript since it's loaded from a script tag
declare const Stripe: any;

const OdemePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get('plan') || 'Plan Seçilmedi';
  const planPriceString = searchParams.get('price') || '0';
  const planType = searchParams.get('type') || 'automation';
  const planCycle = searchParams.get('cycle') || 'monthly';
  const currency = (searchParams.get('currency') || 'TRY').toLowerCase();
  const setupFeeString = searchParams.get('setupFee') || '0';

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxOffice, setTaxOffice] = useState('');
  const [taxId, setTaxId] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  const numericPrice = useMemo(() => parseFloat(planPriceString) || 0, [planPriceString]);
  const numericSetupFee = useMemo(() => parseFloat(setupFeeString) || 0, [setupFeeString]);

  const currencyFormatter = useMemo(() => new Intl.NumberFormat(currency === 'usd' ? 'en-US' : 'tr-TR', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }), [currency]);

  const subtotal = numericPrice + numericSetupFee;
  const totalPrice = Math.max(0, subtotal - discountAmount);
  const paymentAmountInCents = Math.round(totalPrice * 100);

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'MORTANAS50') {
      const discountValue = subtotal * 0.50;
      setDiscountAmount(discountValue);
      setDiscountMessage('İndirim kodu başarıyla uygulandı!');
    } else {
      setDiscountMessage('Geçersiz indirim kodu.');
      setDiscountAmount(0);
    }
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !phone || !address) {
        alert('Lütfen tüm zorunlu fatura alanlarını doldurun.');
        return;
    }
    setIsLoading(true);

    if (typeof Stripe === 'undefined') {
        alert('Ödeme altyapısı yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.');
        setIsLoading(false);
        return;
    }

    try {
        const stripePublishableKey = 'pk_test_51SKsLYI4ME4m3TObzFaF8ziHO363fD5UlJYkdloFUIEuXHWLo7888QK64vzChAIRtW7LAKIPfRSIHZVoDEj3H9QX00CmmSgdlQ';
        const stripe = Stripe(stripePublishableKey);

        const success_url_path = `${window.location.origin}${window.location.pathname}#/odeme-basarili`;
        const cancel_url_path = `${window.location.origin}${window.location.pathname}#/odeme-basarisiz`;

        // FIX: Corrected parameters inside lineItems to snake_case as per Stripe.js documentation for price_data.
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price_data: {
                    currency: currency,
                    product_data: {
                        name: `${planName} (${planCycle})`,
                        description: `Mortanas AI Çözümleri - ${pageTitleMap[planType] || 'Paket'}`,
                    },
                    unit_amount: paymentAmountInCents,
                },
                quantity: 1,
            }],
            mode: 'payment',
            successUrl: success_url_path,
            cancelUrl: cancel_url_path,
            customerEmail: email,
            billingAddressCollection: 'required',
            locale: 'tr'
        });

        if (error) {
            console.error('Stripe error:', error);
            alert(`Ödeme başlatılamadı: ${error.message}`);
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Ödeme işlemi başlatılırken hata:", error);
        alert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        setIsLoading(false);
    }
  };

  const pageTitleMap: { [key: string]: string } = {
      application: 'Uygulama Paketi',
      automation: 'Otomasyon Planı',
      egitim: 'Eğitim Paketi',
      'dergi-abonelik': 'Dergi Aboneliği'
  };

  const cycleTextMap: { [key:string]: string } = {
    monthly: 'Aylık',
    annually: 'Yıllık',
    lifetime: 'Tek Seferlik',
    sixMonths: '6 Aylık',
  };

  const testimonials = [
      { quote: "Bu yatırım, işimizi 2 ayda dönüştürdü. ROI inanılmaz!", name: "Ahmet Y." },
      { quote: "Kurulum süreci çok hızlı ve profesyoneldi. Teşekkürler Mortanas!", name: "Elif K." },
      { quote: "Müşteri desteği inanılmaz. Her sorumuza anında yanıt aldık.", name: "Can T." },
  ];
  const [currentTestimonial] = useState(testimonials[Math.floor(Math.random() * testimonials.length)]);

  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-500 mr-4"></i>
                Güvenli <span className="text-blue-600 ml-3">Ödeme Ekranı</span>
            </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            İşletmenizi dönüştürmeye bir adım daha yaklaştınız. Lütfen bilgilerinizi kontrol ederek ödemeyi tamamlayın.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
            <form onSubmit={handlePaymentSubmit}>
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
                  {/* Left Column: Form */}
                  <div className="bg-white p-8 rounded-2xl shadow-xl h-fit border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Fatura Bilgileri</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="Adınız Soyadınız" />
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Şirket Adı (İsteğe Bağlı)</label>
                            <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Şirketinizin Adı" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresiniz</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="fatura@sirketiniz.com" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="5XX XXX XX XX" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Fatura Adresi</label>
                            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="Mahalle, Sokak, No, İlçe, İl"></textarea>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="taxOffice" className="block text-sm font-medium text-gray-700 mb-1">Vergi Dairesi (İsteğe Bağlı)</label>
                                <input type="text" id="taxOffice" value={taxOffice} onChange={(e) => setTaxOffice(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">Vergi No / TCKN (İsteğe Bağlı)</label>
                                <input type="text" id="taxId" value={taxId} onChange={(e) => setTaxId(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                            Stripe'ın güvenli ödeme sayfasında kart bilgilerinizi gireceksiniz.
                        </div>
                    </div>
                    
                    <button type="submit" disabled={isLoading || !email || !fullName || !phone || !address} className="mt-8 w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105">
                        {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                        <i className="fab fa-stripe-s text-2xl"></i>
                        )}
                        <span>{isLoading ? 'Yönlendiriliyor...' : 'Stripe ile Güvenli Öde'}</span>
                    </button>
                    <div className="mt-4 text-center text-xs text-gray-500 space-y-2">
                         <div className="flex items-center justify-center">
                            <i className="fas fa-lock mr-2"></i>
                            <span>Tüm işlemler 256-bit SSL ile şifrelenmektedir.</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-envelope-circle-check mr-2 text-blue-500"></i>
                            <span>Faturanızın bir kopyası info@mortanas.com adresine gönderilecektir.</span>
                        </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Order Summary */}
                  <div className="bg-white p-8 rounded-2xl shadow-xl h-fit border border-gray-200 lg:sticky lg:top-32">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sipariş Özeti</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="text-gray-600 font-medium">{pageTitleMap[planType] || 'Paket'}:</span>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{planName}</p>
                          <p className="text-sm text-gray-500">{cycleTextMap[planCycle] || 'Abonelik'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                        <div className="flex justify-between items-center text-gray-600">
                            <span>Ara Toplam:</span>
                            <span className="font-medium text-gray-900">{currencyFormatter.format(numericPrice)}</span>
                        </div>
                        {numericSetupFee > 0 && (
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Tek Seferlik Kurulum:</span>
                            <span className="font-medium text-gray-900">{currencyFormatter.format(numericSetupFee)}</span>
                          </div>
                        )}
                         {discountAmount > 0 && (
                          <div className="flex justify-between items-center text-green-600">
                            <span>İndirim (MORTANAS50):</span>
                            <span className="font-medium">-{currencyFormatter.format(discountAmount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-3 border-t-2 border-dashed border-gray-300 mt-3">
                            <span>TOPLAM:</span>
                            <span>{currencyFormatter.format(totalPrice)}</span>
                        </div>
                    </div>
                    
                    {/* Discount Code */}
                    <div className="mt-6">
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">İndirim Kodu</label>
                        <div className="flex space-x-2">
                           <input 
                                type="text" 
                                id="discount"
                                value={discountCode}
                                onChange={(e) => { setDiscountCode(e.target.value); setDiscountMessage(''); }}
                                placeholder="İndirim Kodunuz"
                                className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                           <button type="button" onClick={handleApplyDiscount} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Uygula</button>
                        </div>
                        {discountMessage && <p className={`text-sm mt-2 ${discountAmount > 0 ? 'text-green-600' : 'text-red-500'}`}>{discountMessage}</p>}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center">
                            <img src={currentTestimonial.name.includes("Ahmet") ? 'https://randomuser.me/api/portraits/men/44.jpg' : 'https://randomuser.me/api/portraits/women/44.jpg'} alt={currentTestimonial.name} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <p className="text-sm italic text-gray-700">"{currentTestimonial.quote}"</p>
                                <p className="text-sm font-bold text-gray-800 mt-1">- {currentTestimonial.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <i className="fas fa-shield-alt text-2xl text-green-500"></i>
                            <div>
                                <h4 className="font-bold text-gray-800">14 Gün Para İade Garantisi</h4>
                                <p className="text-sm text-gray-500">Memnun kalmazsanız sorgusuz sualsiz iade.</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <i className="fab fa-cc-visa text-3xl text-gray-400"></i>
                            <i className="fab fa-cc-mastercard text-3xl text-gray-400"></i>
                            <i className="fab fa-cc-amex text-3xl text-gray-400"></i>
                            <span className="text-sm text-gray-500 font-semibold">Stripe Destekli</span>
                        </div>
                    </div>
                  </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default OdemePage;