// Custom details data providers for Mortanas Automation Detail Pages
// Each helper provides tailored high-converting copy based on the automation slug.

export interface BusinessBenefit {
    title: string;
    desc: string;
    icon: string;
    color: string;
}

export interface JourneyStep {
    icon: string;
    time: string;
    title: string;
    description: string;
}

export interface TargetAudience {
    icon: string;
    name: string;
}

export interface SuccessStory {
    title: string;
    subtitle: string;
    before: { title: string; desc: string; }[];
    stats: { value: number; label: string; prefix?: string; suffix?: string; }[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export const getBusinessBenefits = (slug: string): BusinessBenefit[] => {
    switch (slug) {
        case 'yapay-zeka-chatbot':
            return [
                { title: "7/24 Aktif Satış Ruhu", desc: "Gece yarısı bile gelen soruları anında yanıtlayıp satışı kapatın.", icon: "fas fa-moon", color: "blue" },
                { title: "İnsan Maliyetini Azaltın", desc: "Yüzlerce mesajı saniyeler içinde cevaplayın, canlı destek yükünüzü %85 oranında düşürün.", icon: "fas fa-users-slash", color: "red" },
                { title: "Duygu (Sentiment) Analizi", desc: "Müşterinin kızgın mı, memnun mu olduğunu anlayıp en uygun tonla cevap veren akıllı yapı.", icon: "fas fa-heart-pulse", color: "purple" },
                { title: "Sınırsız Dil Özgürlüğü", desc: "Dünyanın her yerinden gelen müşterilerle onların kendi dilinde akıcı ve hatasız konuşun.", icon: "fas fa-language", color: "green" }
            ];
        case 'sesli-musteri-hizmetleri':
        case 'cagri-karsilama-voice-ai':
        case 'sesli-chatbot':
            return [
                { title: "Telefonları Kaçırmayın", desc: "Aynı anda gelen onlarca çağrıyı sıfır bekleme süresiyle yanıtlayın, sipariş ve randevuları her an toplayın.", icon: "fas fa-phone-volume", color: "green" },
                { title: "Operasyonu Küçültün", desc: "Geleneksel çağrı merkezi ve personel giderlerinizi %70'e varan oranda düşürerek kârlılığınızı fırlatın.", icon: "fas fa-shield-halved", color: "blue" },
                { title: "7/24 Kesintisiz Hizmet", desc: "Gece, hafta sonu veya resmi tatil fark etmeksizin müşterilerinize her saniye anında destek ulaştırın.", icon: "fas fa-clock", color: "red" },
                { title: "%100 Tutarlı Kalite", desc: "Hiç yorulmayan, her aramaya aynı güler yüzlü, kurumsal ve profesyonel tonda yanıt veren yapay zekaya sahip olun.", icon: "fas fa-award", color: "purple" }
            ];
        case 'stok-yonetimi-otomasyonu':
        case 'dinamik-fiyatlandirma-stok':
            return [
                { title: "Kârlılığı Fırlatın", desc: "Rakipleri saniyeler içinde analiz edip en doğru kâr oranlarıyla anında Buybox ve pazar payı kazanın.", icon: "fas fa-arrow-trend-up", color: "green" },
                { title: "Sıfır Stok Hatası", desc: "Fazla ürün tutma maliyetlerinden veya çok satan ürünlerin aniden bitmesi riskinden tamamen kurutulun.", icon: "fas fa-calculator", color: "blue" },
                { title: "Zaman Tasarrufu", desc: "Pazaryerlerindeki yüzlerce kalem fiyatı manuel güncellemek yerine yapay zekayla tam otonom yönetin.", icon: "fas fa-clock", color: "red" },
                { title: "Mükemmel Senkronizasyon", desc: "Tüm online pazaryerlerinizi, e-ticaret sitelerinizi ve fiziksel envanter merkezlerinizi anlık eşleştirin.", icon: "fas fa-link", color: "purple" }
            ];
        case 'is-akisi-otomasyonu-rpa':
        case 'akilli-on-muhasebe-otomasyonu':
            return [
                { title: "Sıfır İnsan Hatası", desc: "Belge transferleri, fatura girişleri veya mutabakatlardaki manuel kaynaklı tüm hataları tamamen hayatınızdan çıkarın.", icon: "fas fa-circle-check", color: "green" },
                { title: "Hızı 10 Katına Çıkarın", desc: "Günlerce sürecek evrak ve muhasebe kayıt işlemlerini yapay zeka entegreli robotlarla dakikalar içinde tamamlayın.", icon: "fas fa-bolt", color: "blue" },
                { title: "Stratejik Odaklanma", desc: "Sıkıcı ve tekrarlayan işleri yapay zekaya devrederek, ekibinizin asıl büyüme stratejilerine vakit harcamasını sağlayın.", icon: "fas fa-lightbulb", color: "red" },
                { title: "7/24 Kesintisiz Akış", desc: "Saatlerce aralıksız, duraksamadan çalışan akıllı RPA robotlarıyla ofis verimliliğinizi gece gündüz sürdürün.", icon: "fas fa-gears", color: "purple" }
            ];
        default:
            return [
                { title: "Satışları Artırın", desc: "Hiçbir satış fırsatını kaçırmayın. 7/24 çalışan yapay zeka ile dönüşüm oranlarınızı %30'a varan oranda yükseltin.", icon: "fas fa-arrow-trend-up", color: "green" },
                { title: "Maliyetleri Düşürün", desc: "Müşteri hizmetleri operasyonel yükünü %70'e kadar azaltın. Personelinizin daha stratejik işlere odaklanmasını sağlayın.", icon: "fas fa-lira-sign", color: "blue" },
                { title: "Müşteri Sadakati Yaratın", desc: "Müşterilerinize anında ve tutarlı yanıtlar vererek memnuniyeti artırın. Mutlu müşteriler, sadık müşterilere dönüşür.", icon: "fas fa-heart", color: "red" },
                { title: "Zamandan Tasarruf Edin", desc: "Tekrarlayan ve manuel görevleri otomatize ederek yönetimsel işlere harcadığınız zamanı %50'ye kadar azaltın.", icon: "fas fa-clock", color: "purple" }
            ];
    }
};

export const getCustomerJourney = (slug: string): JourneyStep[] => {
    switch (slug) {
        case 'yapay-zeka-chatbot':
            return [
                { icon: 'fab fa-instagram', time: '23:45', title: 'Mesaj Gelir', description: 'Müşteri, Instagram DM veya WhatsApp üzerinden ürünle ilgili saniyesinde mesaj atar.' },
                { icon: 'fas fa-bolt', time: '23:45', title: 'Anında Yanıt', description: 'Yapay zeka 1 saniyeden kısa sürede, ürün özelliklerini ve fiyatını doğal bir dille aktarır.' },
                { icon: 'fas fa-link', time: '23:47', title: 'Satışa Yönlendirme', description: 'Müşterinin ilgisine göre sepete ekleme linki veya rezervasyon takvimi gönderilir.' },
                { icon: 'fas fa-hand-holding-dollar', time: '23:50', title: 'Başarılı Kapanış', description: 'Canlı desteğe hiç bağlanmadan ödeme alınır, satış 7/24 tamamlanır.' }
            ];
        case 'sesli-musteri-hizmetleri':
        case 'cagri-karsilama-voice-ai':
        case 'sesli-chatbot':
            return [
                { icon: 'fas fa-phone-volume', time: '14:00', title: 'Çağrı Başlangıcı', description: 'Müşteri randevu almak veya bilgi almak için telefon numaranızı arar.' },
                { icon: 'fas fa-user-tie', time: '14:01', title: 'Akıllı Karşılama', description: 'Sesli asistan telefonu anında açar, markanızın sesiyle ve doğal diksiyonuyla selamlar.' },
                { icon: 'fas fa-calendar-check', time: '14:03', title: 'Randevu & Onay', description: 'Sistem üzerinden uygun takvim saatini sorgulayarak randevuyu oluşturur ve onaylar.' },
                { icon: 'fas fa-message', time: '14:04', title: 'SMS Bilgilendirmesi', description: 'Randevu detayları ve yol tarifi müşterinin telefonuna anında SMS olarak gönderilir.' }
            ];
        case 'stok-yonetimi-otomasyonu':
        case 'dinamik-fiyatlandirma-stok':
            return [
                { icon: 'fas fa-cart-shopping', time: '09:00', title: 'Sipariş Alınması', description: 'Herhangi bir pazaryerinden (Trendyol, Amazon vb.) mağazanıza sipariş düşer.' },
                { icon: 'fas fa-arrows-rotate', time: '09:01', title: 'Anlık Güncelleme', description: 'Tüm online satış kanallarındaki ortak envanter havuzu saniyeler içinde güncellenir.' },
                { icon: 'fas fa-shield-halved', time: '09:05', title: 'Kritik Stok Takibi', description: 'Hızlı satılan ürünün stoğu kritik seviyeye indiğinde sistem otomatik bildirim üretir.' },
                { icon: 'fas fa-truck-ramp-box', time: '09:10', title: 'Tedarikçi Siparişi', description: 'AI sistemi, tedarikçinize otomatik olarak yeni hammadde veya ürün siparişi formu gönderir.' }
            ];
        case 'is-akisi-otomasyonu-rpa':
        case 'akilli-on-muhasebe-otomasyonu':
            return [
                { icon: 'fas fa-envelope-open-text', time: '11:00', title: 'Fatura Girişi', description: 'Tedarikçiden e-posta ile yeni bir e-fatura veya cari fiş görüntüsü gelir.' },
                { icon: 'fas fa-eye', time: '11:01', title: 'Görüntü İşleme / OCR', description: 'Akıllı robot faturayı açıp firma unvanını, KDV oranını ve genel tutarını yüksek doğrulukla okur.' },
                { icon: 'fas fa-server', time: '11:03', title: 'ERP Kaydetme', description: 'Okunan tüm bilgiler insan müdahalesi olmadan kullanılan muhasebe programına otomatik yazılır.' },
                { icon: 'fas fa-clipboard-check', time: '11:05', title: 'Onay ve Bildirim', description: 'Gün sonu cari mutabakat raporu otomatik olarak yöneticinin onay ekranına ve e-postasına gönderilir.' }
            ];
        case 'emlak-otomasyonu':
            return [
                { icon: 'fas fa-house-chimney', time: '18:00', title: 'İlan Sorgusu', description: 'Potansiyel alıcı, WhatsApp veya emlak sitelerinden bir ilan için mesaj gönderir.' },
                { icon: 'fas fa-diagram-project', time: '18:01', title: 'Portföy Eşleştirme', description: 'Yapay zeka aranan kriterleri eşleştirerek portföydeki en uygun 3 mülkü sunar.' },
                { icon: 'fas fa-calendar-days', time: '18:05', title: 'Mülk Randevusu', description: 'AI, takvime göre mülk gösterme randevusu ayarlar ve danışmanı uyarır.' },
                { icon: 'fas fa-check-double', time: '18:07', title: 'Onay ve Hatırlatıcı', description: 'Hem müşteriye hem de danışmana detayları içeren bilgilendirme ve konum mesajı gider.' }
            ];
        case 'haber-otomasyonu':
            return [
                { icon: 'fas fa-globe', time: '02:00', title: 'Gündem İzleme', description: 'Yapay zeka binlerce ajans, blog, sosyal medya ve haber portalını anlık olarak izler.' },
                { icon: 'fas fa-triangle-exclamation', time: '02:02', title: 'Flaş Haber Alımı', description: 'Önemli kilit kelimeler içeren bir sıcak gelişmeyi algılar ve editörü uyarır.' },
                { icon: 'fas fa-pen-fancy', time: '02:05', title: 'Özgün Taslak Yazımı', description: 'Farklı kaynakları birleştirerek özgün bir haber metni ve ilgi çekici başlık alternatifleri hazırlar.' },
                { icon: 'fas fa-rss', time: '02:08', title: 'Çok Kanallı Dağıtım', description: 'Editör onayından geçen haber anında sitede, e-posta bülteninde ve sosyal medyada yayınlanır.' }
            ];
        case 'ik-ve-ise-alim-asistani':
            return [
                { icon: 'fas fa-user-plus', time: '10:00', title: 'Yeni Başvuru', description: 'İlanınıza career platformlarından yüzlerce özgeçmiş başvurusu gelir.' },
                { icon: 'fas fa-brain', time: '10:02', title: 'Derin Filtreleme', description: 'İK asistanı CV\'leri inceleyip ilan nitelikleriyle semantik olarak eşleştirir, puanlar.' },
                { icon: 'fas fa-comments', time: '10:05', title: 'Hızlı WhatsApp Soru-Cevap', description: 'Uygun adaylara WhatsApp üzerinden kısa bir chatbot aday tanıma testi gönderilir.' },
                { icon: 'fas fa-calendar-check', time: '10:10', title: 'Mülkat Takvimi', description: 'Başarılı adayların mülakat randevuları İK ekibinin takvimine saniyeler içinde işlenir.' }
            ];
        default:
            return [
                { icon: 'fab fa-instagram', time: '23:00', title: 'İlk Temas', description: 'Müşteri, sosyal medyadan veya mesajlaşma kanallarından ürün hakkında soru sorar.' },
                { icon: 'fas fa-robot', time: '23:01', title: 'Anında Yanıt', description: 'Yapay zeka, saniyeler içinde ürün bilgilerini, stok durumunu ve fiyatını paylaşır.' },
                { icon: 'fas fa-shopping-cart', time: '23:05', title: 'Sipariş Alma', description: 'Müşteri satın almak istediğini belirtir. AI, sohbet üzerinden adres ve iletişim bilgilerini alır.' },
                { icon: 'fas fa-credit-card', time: '23:07', title: 'Ödeme & Onay', description: 'AI, güvenli bir ödeme linki oluşturup gönderir. Ödeme sonrası siparişi onaylar ve kargo bilgisini verir.' }
            ];
    }
};

export const getTargetAudience = (slug: string): TargetAudience[] => {
    switch (slug) {
        case 'yapay-zeka-chatbot':
            return [
                { icon: 'fas fa-shopping-bag', name: 'E-Ticaret Markaları' },
                { icon: 'fas fa-heartbeat', name: 'Klinik ve Doktorlar' },
                { icon: 'fas fa-hotel', name: 'Oteller ve Turizm' },
                { icon: 'fas fa-building', name: 'Emlak & Gayrimenkul' },
                { icon: 'fas fa-dumbbell', name: 'Spor & Güzellik Merkezleri' }
            ];
        case 'sesli-musteri-hizmetleri':
        case 'cagri-karsilama-voice-ai':
        case 'sesli-chatbot':
            return [
                { icon: 'fas fa-headset', name: 'Çağrı Merkezleri' },
                { icon: 'fas fa-hospital', name: 'Klinik & Hastaneler' },
                { icon: 'fas fa-hotel', name: 'Oteller & Seyahat' },
                { icon: 'fas fa-taxi', name: 'Rent a Car & Lojistik' },
                { icon: 'fas fa-graduation-cap', name: 'Eğitim Kurumları' }
            ];
        case 'stok-yonetimi-otomasyonu':
        case 'dinamik-fiyatlandirma-stok':
            return [
                { icon: 'fas fa-store', name: 'Büyük E-Ticaret Markaları' },
                { icon: 'fas fa-warehouse', name: 'Distribütör & Toptancılar' },
                { icon: 'fas fa-boxes-stacked', name: 'Perakende Mağazaları' },
                { icon: 'fas fa-cart-shopping', name: 'Pazar Yeri Satıcıları' },
                { icon: 'fas fa-truck', name: 'Lojistik & Tedarik Zinciri' }
            ];
        case 'is-akisi-otomasyonu-rpa':
        case 'akilli-on-muhasebe-otomasyonu':
            return [
                { icon: 'fas fa-calculator', name: 'Ön Muhasebe & Mali Müşavirler' },
                { icon: 'fas fa-briefcase', name: 'Hukuk & Danışmanlık Firmaları' },
                { icon: 'fas fa-building', name: 'Hizmet & İnşaat Sektörü' },
                { icon: 'fas fa-landmark', name: 'Büyük Holdingler & KOBİ\'ler' },
                { icon: 'fas fa-receipt', name: 'Gümrük & Denetim Firmaları' }
            ];
        case 'emlak-otomasyonu':
            return [
                { icon: 'fas fa-house', name: 'Bağımsız Emlak Danışmanları' },
                { icon: 'fas fa-city', name: 'Emlak Ofisleri & Franchise\'lar' },
                { icon: 'fas fa-gavel', name: 'Gayrimenkul Değerleme Şirketleri' },
                { icon: 'fas fa-hammer', name: 'İnşaat & Proje Geliştiricileri' },
                { icon: 'fas fa-key', name: 'Mülk Yönetim Şirketleri' }
            ];
        case 'haber-otomasyonu':
            return [
                { icon: 'fas fa-newspaper', name: 'Dijital Haber Portalları' },
                { icon: 'fas fa-microphone', name: 'Yerel & Ulusal Basın' },
                { icon: 'fas fa-rss', name: 'Haber Ajansları' },
                { icon: 'fas fa-pen-nib', name: 'İçerik Editörleri & Blog Yazarları' },
                { icon: 'fas fa-bullhorn', name: 'PR & Medya Takip Ajansları' }
            ];
        case 'ik-ve-ise-alim-asistani':
            return [
                { icon: 'fas fa-users-viewfinder', name: 'İK Departmanları' },
                { icon: 'fas fa-briefcase', name: 'Danışmanlık & Headhunterlar' },
                { icon: 'fas fa-laptop-code', name: 'Yazılım & Teknoloji Şirketleri' },
                { icon: 'fas fa-ranking-star', name: 'Büyüyen Şirketler' },
                { icon: 'fas fa-rocket', name: 'Hızlı Büyüyen Startup\'lar' }
            ];
        default:
            return [
                { icon: 'fas fa-store', name: 'E-Ticaret Mağazaları' },
                { icon: 'fas fa-utensils', name: 'Restoran & Kafeler' },
                { icon: 'fas fa-hotel', name: 'Oteller & Turizm' },
                { icon: 'fas fa-cut', name: 'Güzellik & Sağlık' },
                { icon: 'fas fa-home', name: 'Emlak Danışmanları' }
            ];
    }
};

export const getSuccessStory = (slug: string): SuccessStory => {
    switch (slug) {
        case 'sesli-musteri-hizmetleri':
        case 'cagri-karsilama-voice-ai':
        case 'sesli-chatbot':
            return {
                title: "Başarı Hikayesi: Global Çağrı Merkezinde Devrim",
                subtitle: "\"AeroGlobal\" seyahat acentesinin, Mortanas Voice AI ile sadece 30 günde elde ettiği olağanüstü başarıyı inceleyin.",
                before: [
                    { title: "Uzun Bekleme Süreleri", desc: "Yoğun sezonlarda müşteriler telefonda ortalama 8 dakika bekliyordu." },
                    { title: "Cevapsız Aramalar", desc: "Mesai saatleri dışında gelen aramaların %35'i tamamen kaçırılıyordu." },
                    { title: "Yüksek Çağrı Maliyetleri", desc: "Ekstra çağrı merkezi personeli istihdamı bütçeyi zorluyordu." },
                    { title: "Değişken Hizmet Kalitesi", desc: "Farklı personellerin anlık moduna göre müşteri memnuniyeti sallantıdaydı." }
                ],
                stats: [
                    { value: 98, label: "Aramayı Cevaplama Oranı", prefix: "%" },
                    { value: 120, label: "Saat/Ay Personel Tasarrufu", prefix: "+" },
                    { value: 92, label: "Müşteri Memnuniyeti (CSAT)", prefix: "%" },
                    { value: 24, label: "Kesintisiz Hizmet (Saat)", suffix: "/7" }
                ]
            };
        case 'stok-yonetimi-otomasyonu':
        case 'dinamik-fiyatlandirma-stok':
            return {
                title: "Başarı Hikayesi: Pazaryerlerinde Buybox Şampiyonluğu",
                subtitle: "\"TeknoDepo\" e-ticaret markasının, Mortanas Akıllı Fiyatlandırma ve Stok otomasyonu ile yakaladığı agresif büyüme.",
                before: [
                    { title: "Fiyat Takip Güçlüğü", desc: "Rakipler fiyat kırdığında saatler sonra fark ediliyordu." },
                    { title: "Yüksek Stok Maliyeti", desc: "Gereğinden fazla stok tutulması sebebiyle nakit akışı tıkanıyordu." },
                    { title: "Zararına Satışlar", desc: "Fiyat savaşlarında minimum kâr marjının altına inen siparişler geliyordu." },
                    { title: "Buybox Kayıpları", desc: "Fiyat gecikmesi nedeniyle en çok satan ilanlarda Buybox kaybediliyordu." }
                ],
                stats: [
                    { value: 45, label: "Ciro Artışı", prefix: "%" },
                    { value: 25, label: "Stok Maliyeti Düşüşü", prefix: "%" },
                    { value: 85, label: "Buybox Sahipliği Artışı", prefix: "%" },
                    { value: 10, label: "Fiyat Güncelleme Periyodu", suffix: " dk" }
                ]
            };
        case 'is-akisi-otomasyonu-rpa':
        case 'akilli-on-muhasebe-otomasyonu':
            return {
                title: "Başarı Hikayesi: Finansal İşlemlerde Kusursuz Hız",
                subtitle: "\"Yolcuİnşaat\" holdinginin, Mortanas RPA Muhasebe Botu ile yakaladığı operasyonel mükemmellik.",
                before: [
                    { title: "Fatura Giriş Gecikmeleri", desc: "Gelen faturalar elle sisteme girilirken günlerce bekliyordu." },
                    { title: "Fatura Giriş Hataları", desc: "KDV oranları veya matrahlar yazılırken insan kaynaklı hatalar oluyordu." },
                    { title: "Geciken Ödemeler", desc: "Cari takipleri aksadığı için tedarikçilere ödemeler gecikiyordu." },
                    { title: "Raporlama Zaman Kaybı", desc: "Nakit akış tablolarını derlemek finans ekibinin günlerini alıyordu." }
                ],
                stats: [
                    { value: 10, label: "İşlem Hızı Artışı", suffix: "x" },
                    { value: 0, label: "Veri Giriş Hatası", suffix: "%" },
                    { value: 80, label: "Operasyonel Zaman Kazanımı", prefix: "%" },
                    { value: 24, label: "Arka Planda Güvenli Çalışma", suffix: " saat" }
                ]
            };
        case 'emlak-otomasyonu':
            return {
                title: "Başarı Hikayesi: Portföylerde Sıcak Satış",
                subtitle: "\"EliteGayrimenkul\" ofisinin, Mortanas Emlak Otomasyonu ile ulaştığı rekor randevu sayısı.",
                before: [
                    { title: "Dağınık Portal İstekleri", desc: "Farklı sitelerden gelen talepler e-posta kutusunda kayboluyordu." },
                    { title: "Gece Gelen Sorular", desc: "Gece saatlerinde yazan alıcılara sabah dönüldüğünde ilgi dağılmış oluyordu." },
                    { title: "Takvim Çakışmaları", desc: "Randevular ayarlanırken danışmanlar arasında çakışmalar yaşanıyordu." },
                    { title: "Mülk Eşleştirme Yavaşlığı", desc: "Müşterinin istediği kriterde mülkü önermek saatler alıyordu." }
                ],
                stats: [
                    { value: 65, label: "Ziyaret Randevusu Artışı", prefix: "%" },
                    { value: 90, label: "Mesaj Yanıtlama Hızı Tasarrufu", prefix: "%" },
                    { value: 50, label: "Dönüşüm Oranı Artışı", prefix: "%" },
                    { value: 24, label: "Kesintisiz Destek Hizmeti", suffix: " saat" }
                ]
            };
        default:
            return {
                title: "Başarı Hikayesi: E-Ticarette Devrim",
                subtitle: "\"ModaButik\" markasının, Mortanas AI ile sadece 60 günde elde ettiği inanılmaz dönüşümü inceleyin.",
                before: [
                    { title: "Cevapsız Mesajlar", desc: "Mesai saatleri dışında gelen sorular tamamen yanıtsız kalıyordu." },
                    { title: "Kaçan Satışlar", desc: "Anında yanıt alamayan sabırsız müşteriler hemen rakiplere gidiyordu." },
                    { title: "Yüksek İş Yükü", desc: "Destek personeli, sürekli tekrarlayan soruları yanıtlamaktan yorulmuştu." },
                    { title: "Düşük Dönüşüm Oranı", desc: "Sosyal medya ve web sitesi trafiği eyleme ve satışa yeterince dönmüyordu." }
                ],
                stats: [
                    { value: 40, label: "Ciro Artışı", prefix: "%" },
                    { value: 70, label: "Saat/Ay Personel Tasarrufu", prefix: "+" },
                    { value: 95, label: "Müşteri Memnuniyeti", prefix: "%" },
                    { value: 24, label: "Otomatik Satış Gücü (Saat)", suffix: " saat" }
                ]
            };
    }
};

export const getSolutionFAQs = (slug: string, solutionTitle: string): FAQ[] => {
    switch (slug) {
        case 'sesli-musteri-hizmetleri':
        case 'cagri-karsilama-voice-ai':
        case 'sesli-chatbot':
            return [
                { question: 'Kurulum ne kadar sürer ve teknik bilgi gerekir mi?', answer: 'Standart kurulum 1-2 iş günü içinde tamamlanır ve hiçbir teknik bilgi gerektirmez. Tüm süreci uzman ekibimiz yönetir.' },
                { question: 'Mevcut santral sistemimle entegre olabilir mi?', answer: 'Evet, Voice Agent çözümümüz, bulut tabanlı veya yerel birçok popüler santral (PBX) ve çağrı merkezi sistemiyle sorunsuz entegre olabilir.' },
                { question: 'Markamıza özel seslendirme kullanabilir miyiz?', answer: 'Kesinlikle. Markanızın kimliğini yansıtan, size özel olarak tasarlanmış benzersiz ve doğal konuşan bir ses tonu ile hizmet verebiliriz.' },
                { question: 'Dakika aşımında ne olur? Görüşmeler kesilir mi?', answer: 'Paketinizdeki dakikalar dolduğunda görüşmeleriniz kesilmez. Ay sonunda, paket aşımında kullanılan her ek dakika için, önceden belirlenen tarife üzerinden faturalandırma yapılır.' },
                { question: 'Müşteri verilerinin güvenliği nasıl sağlanıyor?', answer: 'Veri güvenliği en büyük önceliğimizdir. Tüm görüşmeler ve veriler, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda şifrelenerek saklanır.' },
                { question: 'Voice Agent bir soruyu anlayamazsa ne olur?', answer: 'Anlayamadığı veya yetki alanı dışındaki bir taleple karşılaştığında, görüşmeyi anında belirlediğiniz departmandaki canlı bir operatöre tüm konuşma geçmişiyle birlikte akıllıca devreder.' }
            ];
        case 'stok-yonetimi-otomasyonu':
        case 'dinamik-fiyatlandirma-stok':
            return [
                { question: 'Fiyat güncellemeleri pazar yerlerinde ne kadar sürede yansır?', answer: 'Yapay zeka motorumuz rakiplerinizi sürekli tarar ve saniyeler içinde yeni fiyatınızı pazaryeri APIleri vasıtasıyla canlıya alır.' },
                { question: 'Sistem yanlışlıkla çok düşük fiyata ürün satar mı?', answer: 'Kesinlikle hayır. Her ürün için belirleyeceğiniz minimum kâr limiti sizin koruma sınırınızdır. Algoritma bu sınırın altına asla inmez.' },
                { question: 'Çoklu depo ve farklı envanterleri ayrı ayrı yönetebilir miyiz?', answer: 'Evet. Sistemimiz gelişmiş çoklu depo yönetimini destekler. Fiziksel depolarınızı ve online stoklarınızı ayrı kurallarla birbirine entegre edebilirsiniz.' },
                { question: 'Hangi e-ticaret siteleri ve pazaryerleri destekleniyor?', answer: 'Trendyol, Hepsiburada, Amazon, n11, Pazarama ile Shopify, WooCommerce, IdeaSoft ve Ticimax altyapılı kendi sitelerinizi doğrudan bağlayabilirsiniz.' },
                { question: 'Geriye dönük satış raporlarını kendimiz de inceleyebilir miyiz?', answer: 'Evet, akıllı analitik panelimiz üzerinden satış eğilimlerinizi, kâr marjı değişimlerini ve optimal envanter seviyelerini grafiklerle anlık izleyebilirsiniz.' },
                { question: 'Sisteme entegre olurken XML veya Excel desteği var mı?', answer: 'Evet. İster API aracılığıyla, ister XML yedekleriyle, isterseniz de Excel tablolarıyla toplu olarak ürün ve maliyet verilerinizi saniyeler içinde sisteme aktarabilirsiniz.' }
            ];
        case 'is-akisi-otomasyonu-rpa':
        case 'akilli-on-muhasebe-otomasyonu':
            return [
                { question: 'Yazılımsal robotlar (RPA) hangi programlarla çalışabilir?', answer: 'Masaüstü, bulut veya web tabanlı olması fark etmeksizin; SAP, Logo, Mikro, Zirve, Excel, Salesforce ve hatta firmanıza özel tüm eski yazılımlarla tıpkı bir insan gibi sorunsuz çalışır.' },
                { question: 'Süreçlerde bir hata oluşursa nasıl haberdar oluruz?', answer: 'Sistem bir beklenmedik senaryo veya uyuşmazlık algıladığında, işlemi durdurup ilgili personele hata nedenini, ekran görüntüsü ve detaylarıyla anında e-posta veya WhatsApp üzerinden bildirir.' },
                { question: 'Mevcut çalışanlarımızın yerini tamamen mi alıyor?', answer: 'RPA robotlarının amacı çalışanları işten çıkarmak değil; onları her gün saatler süren, katma değersiz kopyala-yapıştır işlerinden kurtarıp şirkete katkı sağlayacak stratejik alanlara yönlendirmektir.' },
                { question: 'Robotların hızı ve işlem limiti nedir?', answer: 'Robotlar tanımlanan görevleri milisaniyeler bazında tamamlar ve insanlardan ortalama 10 kat daha hızlıdır. 7/24 kesintisiz çalışarak sınırsız işlem hacmi sağlayabilirler.' },
                { question: 'Bilgilerimizin ve ticari verilerimizin güvenliği nasıl korunuyor?', answer: 'Tüm robot işlemleri yerel veya buluttaki şifrelenmiş kendi sunucularınızda çalışır. Bankacılık düzeyinde güvenlik protokolleri kullanılır ve veriler asla üçüncü taraflarla paylaşılmaz.' },
                { question: 'Kurulum ve yeni bir süreç eklemek ne kadar vaktimizi alır?', answer: 'Mevcut bir süreci robotlaştırmak, karmaşıklığına bağlı olarak 1 ila 2 hafta sürer. Uzman analistlerimiz tüm adımları çıkarıp anahtar teslim tamamlar.' }
            ];
        default: // sosyal-medya-otomasyonu vb.
            return [
                { question: 'Kurulum ne kadar sürer ve teknik bilgi gerektirir mi?', answer: `Kurulumu 24-48 saat içinde tamamlıyoruz. Hiçbir teknik bilgiye ihtiyacınız yok. Uzman ekibimiz tüm entegrasyonları sizin için yapar ve size platformu nasıl kullanacağınıza dair bir eğitim verir.` },
                { question: 'Hangi entegrasyon kanallarını destekliyorsunuz?', answer: `${solutionTitle} kapsamında WhatsApp Business API, Instagram DM ve Facebook Messenger başta olmak üzere en popüler iletişim ve CRM altyapılarını destekliyoruz.` },
                { question: 'Yapay zekayı kendi işletmemiz için nasıl eğitiyoruz?', answer: 'Ürünlerinizi, hizmetlerinizi ve sıkça sorulan sorularınızı sisteme yüklüyoruz. Sonrasında, kolay panelimiz üzerinden dilediğiniz zaman yeni bilgiler ekleyebilir ve cevapları güncelleyebilirsiniz.' },
                { question: 'Müşteri bir insanla/canlı temsilciyle konuşmak isterse ne olur?', answer: 'Yapay zeka, bir konuyu çözemediğinde veya müşteri talep ettiğinde, sohbeti anında belirlediğiniz departmandaki canlı bir operatöre tüm konuşma geçmişiyle birlikte akıllıca devreder.' },
                { question: 'Fiyatlandırma nasıl çalışıyor? Gizli ücretler var mı?', answer: 'Fiyatlandırmamız şeffaftır. Seçtiğiniz paketin aylık/yıllık ücreti ve tek seferlik kurulum ücreti dışında hiçbir gizli maliyet yoktur. Paketler, etkileşim limitlerine göre şekillenir.' },
                { question: 'Toplanan veriler güvende mi? KVKK uyumlu musunuz?', answer: 'Evet. Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda şifrelenerek saklanır.' }
            ];
    }
};
