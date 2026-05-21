import React from 'react';
// FIX: Imported PricingPlan type
import type { NavLink, Feature, Sector, Integration, Testimonial, AutomationSolution, Application, Reference, TeamMember, PricingPlan, Article, Milestone, ValueProposition, FAQ, PressMention, SectorPricingPlan } from './types';

export const AUTOMATION_SOLUTIONS: AutomationSolution[] = [
  {
    name: 'Sosyal Medya Otomasyonu',
    slug: 'sosyal-medya-otomasyonu',
    shortDescription: 'Tüm sosyal medya kanallarınızı tek yerden yönetin.',
    title: 'Akıllı Sosyal Medya Yönetim Platformu',
    description: 'WhatsApp, Instagram, Facebook, Twitter ve E-ticaret platformlarınızı tek bir akıllı panelde birleştirin. İşletmenize özel olarak eğittiğimiz yapay zeka, müşterilerinizle aynı sizin gibi yazışır, 7/24 otomatik olarak sipariş alır, rezervasyon yapar ve tüm müşteri iletişimini kesintisiz yönetir.',
    imageUrl: 'https://mortanas.com/resim/sosyal.png',
    socialProof: {
        count: 300,
        label: 'Başarılı Kurulum'
    },
    keyFeatures: [], // This is now replaced by whyChooseUs
    problemSolution: [
        {
            problem: "Farklı platformlardan (WhatsApp, Instagram, Facebook vb.) gelen mesajları takip etmek karmaşık ve zaman alıcıdır.",
            solution: "Tüm mesajlaşma kanallarınızı tek bir birleşik gelen kutusunda toplayarak tam kontrol ve kolay yönetim sağlıyoruz."
        },
        {
            problem: "Mesai saatleri dışında veya yoğun anlarda müşterilere anında yanıt verememek, satış ve sadakat kaybına yol açar.",
            solution: "İşletmenize özel eğitimli yapay zeka, 7/24 çalışarak her soruya anında yanıt verir, sipariş ve rezervasyonları kaçırmaz."
        },
        {
            problem: "Her müşteri sorusu için personel ayırmak, yüksek operasyonel maliyetler ve verimsizlik yaratır.",
            solution: "Yapay zeka asistanı, müşteri iletişiminin %90'ını otomatikleştirerek personelinizin daha stratejik işlere odaklanmasını sağlar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-brain",
            title: "İşletmeye Özel Yapay Zeka",
            description: "Yapay zekamızı sizin işletmenizin ürünleri, hizmetleri ve iletişim diliyle eğitiyoruz. Müşterileriniz bir robotla değil, markanızın uzman bir temsilcisiyle konuştuğunu hisseder."
        },
        {
            icon: "fas fa-boxes-stacked",
            title: "Tüm Kanallar Tek Yerde",
            description: "WhatsApp, Instagram, Facebook, Twitter ve daha fazlasını tek bir panelden yönetin. Dağınıklığa son verin, hiçbir mesajı veya fırsatı gözden kaçırmayın."
        },
        {
            icon: "fas fa-comments",
            title: "İnsan Gibi İletişim",
            description: "Yapay zekamız, sadece yanıt vermekle kalmaz; doğal, akıcı ve samimi bir dille diyalog kurar, müşteri taleplerini anlar ve çözüm üretir."
        },
        {
            icon: "fas fa-robot",
            title: "Uçtan Uca Otomasyon",
            description: "Otomatik olarak sipariş alır, rezervasyon yapar, kargo takibi bilgisi verir, konum atar ve sıkça sorulan tüm soruları yanıtlar. İşletmeniz siz uyurken bile çalışır."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-plug",
          title: "1. Kanalları Bağla",
          description: "WhatsApp, Instagram, Facebook ve diğer platformlarınızı sadece birkaç tıklama ile Mortanas paneline kolayca entegre edin."
      },
      {
          icon: "fas fa-graduation-cap",
          title: "2. Yapay Zekayı Eğit",
          description: "Ürünleriniz, hizmetleriniz ve sıkça sorulan sorular hakkında bilgi yükleyerek yapay zekanın işletmenizin bir uzmanı olmasını sağlayın."
      },
      {
          icon: "fas fa-rocket",
          title: "3. Otomata Al & Büyü",
          description: "Arkanıza yaslanın ve yapay zekanın müşteri iletişimini yönetmesini, satışları artırmasını ve size zaman kazandırmasını izleyin."
      }
    ],
    integrations: {
        title: "Tüm Ekosisteminizle Bütünleşin",
        description: "İster e-ticaret platformunuz, ister CRM'iniz, isterse pazarlama araçlarınız olsun, Mortanas yüzlerce popüler uygulama ile sorunsuz bir şekilde entegre olarak iş akışlarınızı birleştirir ve verimliliğinizi en üst düzeye çıkarır.",
        logos: [
            { name: "WhatsApp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" },
            { name: "Instagram", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/512px-Instagram_icon.png" },
            { name: "Facebook", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png" },
            { name: "Shopify", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png" },
            { name: "WooCommerce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/512px-WooCommerce_logo.svg.png" },
            { name: "Trendyol", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Trendyol_logo.svg/512px-Trendyol_logo.svg.png" },
            { name: "Hepsiburada", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Hepsiburada_logo_2023.svg" },
            { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" },
            { name: "Magento", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Magento_logo.svg/512px-Magento_logo.svg.png" },
            { name: "X (Twitter)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/512px-X_logo_2023.svg.png" },
            { name: "LinkedIn", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/512px-LinkedIn_icon.svg.png" },
            { name: "Telegram", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png" },
            { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" },
            { name: "HubSpot", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png" },
            { name: "Slack", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png" },
            { name: "Zapier", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zapier_logo.svg/512px-Zapier_logo.svg.png" },
            { name: "Stripe", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png" },
        ]
    },
    ourGoal: {
        title: "Amacımız: İletişimi Gelire Dönüştürmek",
        description: "Her bir müşteri etkileşimini, değerli bir satış fırsatına ve kalıcı bir müşteri sadakatine dönüştürmek için teknolojiyi hizmetinize sunuyoruz. Amacımız, operasyonel yükünüzü hafifletirken kârlılığınızı en üst düzeye çıkarmaktır."
    },
    setupFee: {
      original: 1000,
      discounted: 600,
    },
    pricingPlans: [
        {
            name: "Başlangıç",
            prices: { monthly: 100, sixMonths: 90, annually: 80 },
            originalPrices: { monthly: 200, sixMonths: 180, annually: 160 },
            features: [
                "2 Sosyal Medya Kanalı",
                "1,000 Aylık Müşteri Etkileşimi",
                "Temel AI Yanıtlama",
                "Otomatik Sipariş Alma",
                "Standart Raporlama"
            ],
            paymentLink: "https://mortanas.com/market/akilli-sosyal-medya-yonetim-platformu"
        },
        {
            name: "İşletme",
            prices: { monthly: 150, sixMonths: 135, annually: 120 },
            originalPrices: { monthly: 300, sixMonths: 270, annually: 240 },
            popular: true,
            features: [
                "5 Sosyal Medya Kanalı",
                "5,000 Aylık Müşteri Etkileşimi",
                "Gelişmiş AI Yanıtlama",
                "Sipariş ve Rezervasyon Yönetimi",
                "Detaylı Raporlama ve Analitik"
            ]
        },
        {
            name: "Profesyonel",
            prices: { monthly: 250, sixMonths: 225, annually: 200 },
            originalPrices: { monthly: 500, sixMonths: 450, annually: 400 },
            features: [
                "Sınırsız Sosyal Medya Kanalı",
                "Sınırsız Müşteri Etkileşimi",
                "Özelleştirilmiş AI Modeli",
                "CRM Entegrasyonu",
                "Öncelikli Destek"
            ]
        }
    ]
  },
  {
    name: 'Sesli Müşteri Hizmetleri',
    slug: 'sesli-musteri-hizmetleri',
    shortDescription: 'Yapay zeka sesli asistanı ile müşteri iletişimini 7/24 otomatikleştirin.',
    title: 'Mortanas Voice Agent: Sesli Yapay Zeka Asistanı',
    description: 'İşletmelerin telefon veya çevrimiçi aramalar yoluyla müşterileriyle insan benzeri bir şekilde iletişim kurmasını sağlayan yapay zeka tabanlı bir sistemdir.',
    imageUrl: 'https://mortanas.com/resim/sesli.png',
    socialProof: {
        count: 300,
        label: 'Mutlu İşletme'
    },
    keyFeatures: [], // Kept for type consistency, but the new page uses detailed fields.
    problemSolution: [
        {
            problem: "Yoğun saatlerde veya mesai dışı aramalarda telefonların kaçırılması doğrudan ciro ve müşteri kaybına sebep oluyor.",
            solution: "Eş zamanlı yüzlerce çağrıyı sıfır bekleme süresiyle yanıtlayarak tüm müşterilere anında profesyonel asistanlık sunar."
        },
        {
            problem: "Randevu koordinasyonu telefon trafiği içinde kayboluyor ve manuel planlama hataları meydana geliyor.",
            solution: "Yapay zeka asistanı, işletmenizin takvimiyle canlı entegre çalışarak randevuları doğrudan oluşturur ve onaylar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-microchip",
            title: "Yüksek Kaliteli Ses Sentezi",
            description: "Gerçeğe en yakın, akıcı ve doğal insan sesi tonuyla müşterilerinize kusursuz deneyim sunuyoruz. Sizi bir robot değil, özel asistan destekler."
        },
        {
            icon: "fas fa-bolt",
            title: "Sıfır Gecikme (Low Latency)",
            description: "Saniyeden çok daha kısa sürede yanıt verme özelliğiyle telefon görüşmelerinde arka plan sessizliği veya bekleme boşlukları oluşturmaz."
        },
        {
            icon: "fas fa-diagram-project",
            title: "Dinamik Diyalog Yönetimi",
            description: "Senaryo dışına çıkan, karmaşık ve iç içe geçmiş soruları kolaylıkla anlar, sohbetin bağlamını kaybetmeden doğrudan çözüme odaklanır."
        },
        {
            icon: "fas fa-users-viewfinder",
            title: "Sınırsız Kapasite",
            description: "Aynı saniye içerisinde gelen binlerce farklı çağrıyı bile tek bir cevapsıza düşürmeden paralel olarak karşılar ve başarıyla sonuçlandırır."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-headphones-simple",
          title: "1. Santral Yönlendirmesi",
          description: "Mevcut numaranızı veya santral hatlarınızı özel tahsis ettiğimiz akıllı VOIP veya yönlendirme sistemlerine saniyeler içinde bağlayın."
      },
      {
          icon: "fas fa-brain",
          title: "2. Sesli Doğal Dil Eğitimi",
          description: "Sesli yapay zekamıza firmanızın çalışma saatlerini, hizmetlerini ve takvim entegrasyonu bilgilerini verin, sizin yerinize anında öğrensin."
      },
      {
          icon: "fas fa-chart-line",
          title: "3. Akıllı Yanıt ve Raporlama",
          description: "Gereken tüm telefon trafiğini 7/24 yapay zeka yönetsin. Her çağrının anlık özetine, duygu analizine ve ses kayıtlarına anında ulaşın."
      }
    ],
    integrations: {
        title: "Tüm Ekosisteminizle Bütünleşin",
        description: "Mevcut CRM sistemleriniz, santral altyapılarınız ve mesajlaşma servisleriniz ile kusursuz entegrasyon kurarak çağrı merkezi verimliliğinizi katlayın.",
        logos: [
            { name: "WhatsApp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" },
            { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" },
            { name: "HubSpot", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png" },
            { name: "Zendesk", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Zendesk_logo.svg/512px-Zendesk_logo.svg.png" },
            { name: "Slack", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png" },
            { name: "Zapier", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zapier_logo.svg/512px-Zapier_logo.svg.png" },
            { name: "Google Calendar", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/512px-Google_Calendar_icon_%282020%29.svg.png" },
            { name: "Twilio", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Twilio-logo.png/512px-Twilio-logo.png" },
            { name: "Shopify", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png" }
        ]
    },
    whatIsIt: {
        title: "Voice Agent: Sesli Yapay Zeka Asistanı",
        description: "İşletmelerin telefon veya çevrimiçi aramalar yoluyla müşterileriyle insan benzeri bir şekilde iletişim kurmasını sağlayan yapay zeka tabanlı bir sistemdir. Mortanas AI çatısı altında geliştirilen Voice Agent, işletmelere özel akıllı asistan çözümleri ile müşteri iletişimini güçlendirir, iş süreçlerini hızlandırır ve dijital dönüşümü kolaylaştırır.",
        mainFeatures: [
            "7/24 kesintisiz hizmet sunar.",
            "Gerçekçi ve doğal ses tonuyla iletişim kurar.",
            "Aynı anda birden fazla çağrıyı yönetebilir.",
            "Müşteri taleplerini anlayarak doğru ve net bilgilendirme yapar.",
            "Çoklu dil desteği ile global ölçekte erişim imkanı sunar.",
            "Rezervasyon, randevu ve sipariş işlemlerini eksiksiz tamamlar.",
            "Görüşme özetlerini çıkararak işletmeye detaylı raporlar sunar."
        ],
        benefits: [
            "Müşteri memnuniyetini artırır.",
            "Çağrı merkezlerinin iş yükünü azaltır.",
            "İş süreçlerini hızlandırır ve maliyetleri düşürür.",
            "7/24 Kesintisiz Hizmet ile Müşteri Kaybını Önler",
            "Satış ve Pazarlama Kampanyalarını Destekler",
            "Marka İmajını Güçlendirir ve Modernleştirir",
            "Değerli Veri ve İçgörüler Sunarak Strateji Geliştirir"
        ]
    },
    packageScope: {
        title: "Paket Kapsamı ve İlave Hizmetler",
        included: {
            title: "Pakete Dahil Temel Unsurlar",
            items: [
                "7/24 Hizmet",
                "Özelleştirilmiş Gerçekçi Ses",
                "Eş Zamanlı Konuşma",
                "Standart Bilgi Aktarımı (Sms, E-posta, Whatsapp, Telegram)",
                "Santral Üzerinden Çağrı Aktarımı",
                "Görüşme özetleri",
                "Kullanıcı Bilgi Paneli Erişimi"
            ]
        },
        projectBased: {
            title: "İsteğe Bağlı Proje Kapsamı",
            items: [
                "Yazılım Entegrasyonu (CRM, E-ticaret, Web Sitesi)",
                "Gelişmiş Whatsapp Entegrasyonu",
                "Sosyal Medya Entegrasyonu",
                "Doküman Okuma, Analiz ve Raporlama",
                "Sektöre Özel Otomasyonlar"
            ]
        },
        note: "İstenilen proje hizmetleri firmaya özel çözümler ile fiyatlandırılacaktır."
    },
    selectionCriteria: {
        title: "Paket Seçim Kriterleri",
        criteria: [
            { title: "Günlük Arama Sayısı", description: "Beklenen ortalama çağrı miktarı" },
            { title: "Hafta İçi / Hafta Sonu Farkı", description: "Beklenen ortalama çağrı miktarı" },
            { title: "Ortalama Görüşme Süresi", description: "Tahmini" },
            { title: "Yoğun Dönemler", description: "Sezon, kampanya ve özel tarihler" }
        ]
    },
    individualPricing: {
        title: "Sesli Asistan Bireysel Fiyat Listesi",
        plans: [
            { name: "Temel Paket", minutes: 200, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 99, annualPrice: 990 },
            { name: "Standart Paket", minutes: 500, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 229, annualPrice: 2290, popular: true },
            { name: "Pro Paket", minutes: 1000, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 399, annualPrice: 3990 }
        ],
        notes: [
            "Tüm paketler için tek seferlik $1000 kurulum ücreti alınmaktadır.",
            "Fiyatlarımıza KDV dahil değildir.",
            "İstenilen proje hizmetleri paket fiyatları içerisine dahil değildir.",
            "Paket aşımı durumunda, kullanılan her ek dakika için dakika başına ücretlendirme yapılacaktır."
        ]
    },
    corporatePricing: {
        title: "Sesli Asistan Kurumsal Fiyat Listesi",
        plans: [
            { name: "Temel Paket", minutes: 2000, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 754, originalMonthlyPrice: 990, annualBillingText: "$8,145 / yıllık peşin" },
            { name: "Standart Paket", minutes: 5000, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 1744, originalMonthlyPrice: 2290, annualBillingText: "$18,835 / yıllık peşin", popular: true },
            { name: "Pro Paket", minutes: 10000, features: ["100+ dil desteği", "Otomasyon", "Raporlama", "Aynı anda 10 kişiye kadar eşzamanlı yanıt", "Özelleştirilmiş ses", "LLM dahil"], monthlyPrice: 3192, originalMonthlyPrice: 3990, annualBillingText: "$34,475 / yıllık peşin" }
        ],
        notes: [
            "Tüm paketler için tek seferlik $1000 kurulum ücreti alınmaktadır.",
            "Fiyatlarımıza KDV dahil değildir.",
            "İndirimli fiyatlarımız 6 ve 12 aylık aboneliklerde geçerlidir.",
            "İstenilen proje hizmetleri paket fiyatları içerisine dahil değildir.",
            "Paket aşımı durumunda, kullanılan her ek dakika için dakika başına ücretlendirme yapılacaktır."
        ]
    }
  },
  {
    name: 'Sesli Chatbot Otomasyonu',
    slug: 'sesli-chatbot',
    shortDescription: 'Web sitenizde ve uygulamalarınızda sesli komutlarla çalışan akıllı chatbot.',
    title: 'Etkileşimli Sesli Chatbot Deneyimi',
    description: 'Müşterilerinizin metin yazmak yerine konuşarak etkileşim kurmasını sağlayan, yeni nesil bir yapay zeka chatbot çözümüdür. Web sitenize, mobil uygulamanıza veya kiosklarınıza entegre olarak 7/24 sesli destek ve satış asistanlığı yapar.',
    imageUrl: 'https://www.mortanas.com/resim/sesli1.png',
    socialProof: {
        count: 100,
        label: 'Aktif Kurulum'
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Kullanıcılar mobil cihazlarda veya meşgulken metin yazmaktan hoşlanmaz, bu da etkileşimi düşürür.",
            solution: "Sesli Chatbot, kullanıcıların doğal bir şekilde konuşarak soru sormasını ve işlem yapmasını sağlar, böylece daha akıcı bir deneyim sunar."
        },
        {
            problem: "Standart metin tabanlı chatbot'lar, görme engelli veya okuma zorluğu çeken kullanıcılar için erişilebilirlik sorunları yaratır.",
            solution: "Sesli arayüz, dijital hizmetlerinizi daha geniş bir kitle için erişilebilir hale getirir ve kapsayıcılığı artırır."
        },
        {
            problem: "Müşteri hizmetleri sadece metinle sınırlı kaldığında, markanın kişiliğini ve sıcaklığını yansıtmak zorlaşır.",
            solution: "Markanıza özel bir ses tonu ile tasarlanan Sesli Chatbot, müşterilerinizle daha kişisel ve samimi bir bağ kurmanızı sağlar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-microphone-alt",
            title: "Doğal Konuşma Deneyimi",
            description: "Gelişmiş doğal dil anlama (NLU) teknolojisi sayesinde, kullanıcıların komutlarını ve sorularını bir insan gibi anlar ve yanıtlar."
        },
        {
            icon: "fas fa-cogs",
            title: "Çok Kanallı Entegrasyon",
            description: "Web sitenize, mobil uygulamanıza, kiosklarınıza ve hatta IVR sistemlerinize kolayca entegre ederek tutarlı bir deneyim sunun."
        },
        {
            icon: "fas fa-tasks",
            title: "Görev Odaklı Eylemler",
            description: "Sadece bilgi vermekle kalmaz; form doldurma, ürün arama, sipariş verme gibi eylemleri sesli komutlarla gerçekleştirir."
        },
        {
            icon: "fas fa-user-astronaut",
            title: "Kişiselleştirilebilir Ses ve Kişilik",
            description: "Markanızın kimliğine uygun olarak tasarlanmış benzersiz bir ses tonu ve kişilik ile müşterilerinize unutulmaz bir deneyim yaşatın."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-bullseye",
          title: "1. Senaryoları Belirle",
          description: "Müşterilerinizin sesli olarak hangi işlemleri yapmasını istediğinizi (bilgi alma, sipariş, randevu vb.) tanımlayın."
      },
      {
          icon: "fas fa-volume-up",
          title: "2. Sesi ve Kişiliği Tasarla",
          description: "Markanıza en uygun ses tonunu ve chatbot'un konuşma tarzını birlikte tasarlayarak yapay zekayı markanızın bir parçası yapın."
      },
      {
          icon: "fas fa-rocket",
          title: "3. Entegre Et ve Başla",
          description: "Web sitenize veya uygulamanıza ekleyeceğimiz basit bir kod parçasıyla Sesli Chatbot'u aktif edin ve müşterilerinizle konuşmaya başlayın."
      }
    ],
    integrations: {
        title: "Tüm Dijital Varlıklarınızla Uyumlu",
        description: "Web, mobil ve fiziksel kanallarınızda sorunsuz bir şekilde çalışarak bütünsel bir sesli deneyim sunar.",
        logos: [
            { name: "Web Sitesi", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/W3C_HTML5_logo.svg/512px-W3C_HTML5_logo.svg.png" },
            { name: "iOS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1920px-Apple_logo_black.svg.png" },
            { name: "Android", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/512px-Android_robot.svg.png" },
            { name: "Kiosk", logoUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063820.png" },
            { name: "IVR", logoUrl: "https://cdn-icons-png.flaticon.com/512/1531/1531392.png" },
            { name: "Zapier", logoUrl: "https://1000logos.net/wp-content/uploads/2022/09/Zapier-Symbol.png" },
        ]
    },
    ourGoal: {
        title: "Amacımız: Etkileşimi Kolaylaştırmak, Erişilebilirliği Artırmak",
        description: "Teknolojiyi kullanarak, kullanıcıların dijital dünyayla en doğal yolla, yani konuşarak etkileşim kurmasını sağlıyoruz. Amacımız, markanızla müşterileriniz arasında daha hızlı, kolay ve insani bir köprü kurmaktır."
    },
    setupFee: {
      original: 1500,
      discounted: 900,
    },
    pricingPlans: [
        {
            name: "Web Başlangıç",
            prices: { monthly: 150, sixMonths: 135, annually: 120 },
            originalPrices: { monthly: 300, sixMonths: 270, annually: 240 },
            features: [
                "1 Web Sitesi Entegrasyonu",
                "Aylık 2,000 Sesli Etkileşim",
                "Temel Senaryo Akışları",
                "Standart Raporlama"
            ]
        },
        {
            name: "Mobil & Web Pro",
            prices: { monthly: 300, sixMonths: 270, annually: 240 },
            originalPrices: { monthly: 600, sixMonths: 540, annually: 480 },
            popular: true,
            features: [
                "Web & Mobil Uygulama Entegrasyonu",
                "Aylık 10,000 Sesli Etkileşim",
                "Gelişmiş Görev Otomasyonu",
                "Detaylı Analitikler",
                "API Erişimi"
            ]
        },
        {
            name: "Kurumsal Omni-Channel",
            prices: { monthly: 600, sixMonths: 540, annually: 480 },
            originalPrices: { monthly: 1200, sixMonths: 1080, annually: 960 },
            features: [
                "Sınırsız Kanal Entegrasyonu (Web, Mobil, Kiosk)",
                "Sınırsız Sesli Etkileşim",
                "Özelleştirilmiş AI Modeli ve Ses",
                "CRM & IVR Entegrasyonu",
                "Özel Müşteri Temsilcisi"
            ]
        }
    ]
  },
  {
    name: 'Haber Otomasyonu',
    slug: 'haber-otomasyonu',
    shortDescription: 'Haber akışınızı otomatikleştirin, kaynakları izleyin ve içerik üretiminizi hızlandırın.',
    title: 'Gazeteciler ve Basın Kuruluşları için Akıllı Haber Otomasyonu',
    description: 'Gündemi anlık olarak takip eden, binlerce kaynağı tarayan ve size özel haber özetleri sunan yapay zeka destekli platform. Araştırma süreçlerinizi kısaltın, özel haberler üretmeye odaklanın ve içeriklerinizi anında hedef kitlenize ulaştırın.',
    imageUrl: 'https://www.mortanas.com/resim/haberotomasyon.png',
    socialProof: {
        count: 50,
        label: 'Haber Ajansı Kullanıyor'
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Binlerce haber kaynağını (ajanslar, sosyal medya, web siteleri) manuel olarak takip etmek imkansızdır ve önemli gelişmeler gözden kaçabilir.",
            solution: "Yapay zeka, belirlediğiniz anahtar kelimeler ve konularla ilgili binlerce kaynağı 7/24 tarar ve önemli haberleri anında size bildirir."
        },
        {
            problem: "Haber metni yazmak, özet çıkarmak ve farklı formatlara (sosyal medya, web) uyarlamak ciddi zaman ve efor gerektirir.",
            solution: "Gelişmiş dil modelleri, gelen bültenlerden veya uzun metinlerden saniyeler içinde haber metinleri, başlık önerileri ve sosyal medya paylaşımları üretir."
        },
        {
            problem: "Rakiplerin ve sektördeki gelişmelerin takibi, stratejik planlama için kritik olmasına rağmen genellikle ihmal edilir.",
            solution: "Platform, rakip yayınları ve belirli sektörlerdeki trendleri sürekli izleyerek size düzenli rekabet analizi ve trend raporları sunar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-rss",
            title: "Gerçek Zamanlı Gündem Takibi",
            description: "Ajanslar, sosyal medya ve binlerce haber sitesini anlık olarak izleyerek hiçbir gelişmeyi kaçırmamanızı sağlar."
        },
        {
            icon: "fas fa-pen-nib",
            title: "Yapay Zeka Destekli İçerik Üretimi",
            description: "Basın bültenlerinden, uzun raporlardan veya bir dizi bilgiden saniyeler içinde özgün haber metinleri ve özetler oluşturur."
        },
        {
            icon: "fas fa-magnifying-glass-chart",
            title: "Derinlemesine Kaynak Analizi",
            description: "Bir haberin veya konunun farklı kaynaklarda nasıl işlendiğini analiz eder, size karşılaştırmalı bir perspektif sunar."
        },
        {
            icon: "fas fa-share-alt",
            title: "Çok Kanallı Dağıtım Otomasyonu",
            description: "Ürettiğiniz haberleri tek tıkla web sitenizde, sosyal medya hesaplarınızda ve e-posta bültenlerinizde otomatik olarak yayınlar."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-bullseye",
          title: "1. Kaynakları Belirle",
          description: "Takip etmek istediğiniz haber ajanslarını, anahtar kelimeleri, sosyal medya hesaplarını ve sektörleri sisteme tanımlayın."
      },
      {
          icon: "fas fa-robot",
          title: "2. Yapay Zekayı Çalıştır",
          description: "Yapay zeka, belirlediğiniz kaynakları taramaya başlar, içerikleri analiz eder ve size özel haber akışları oluşturur."
      },
      {
          icon: "fas fa-newspaper",
          title: "3. Üret & Yayınla",
          description: "AI tarafından oluşturulan taslakları düzenleyin veya doğrudan kullanın. Tek tıkla içeriğinizi tüm kanallarınızda yayınlayın."
      }
    ],
    integrations: {
        title: "İş Akışınıza Sorunsuz Uyum",
        description: "İçerik yönetim sistemleri, sosyal medya planlama araçları ve iletişim platformları ile tam entegrasyon.",
        logos: [
            { name: "WordPress", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/1200px-WordPress_blue_logo.svg.png" },
            { name: "X", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1200px-X_logo_2023.svg.png" },
            { name: "Telegram", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png" },
            { name: "Slack", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" },
            { name: "Google News", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Google_News_icon.svg/2048px-Google_News_icon.svg.png" },
            { name: "Feedly", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Feedly.svg/2560px-Feedly.svg.png" },
        ]
    },
    ourGoal: {
        title: "Amacımız: Haberciliği Hızlandırmak, Gazeteciliği Güçlendirmek",
        description: "Teknolojiyi, gazetecilerin ve basın mensuplarının tekrarlayan araştırma ve yazım süreçlerinden kurtulup, kamuoyunu bilgilendirme ve özel haberler üretme gibi temel görevlerine daha fazla odaklanabilmeleri için bir araç olarak sunuyoruz."
    },
    setupFee: {
      original: 800,
      discounted: 400,
    },
    pricingPlans: [
        {
            name: "Serbest Gazeteci",
            prices: { monthly: 80, sixMonths: 70, annually: 60 },
            originalPrices: { monthly: 160, sixMonths: 140, annually: 120 },
            features: [
                "50 Anahtar Kelime Takibi",
                "100 Haber Kaynağı İzleme",
                "Aylık 50 AI İçerik Üretimi",
                "Temel Raporlama"
            ]
        },
        {
            name: "Haber Ajansı",
            prices: { monthly: 200, sixMonths: 180, annually: 160 },
            originalPrices: { monthly: 400, sixMonths: 360, annually: 320 },
            popular: true,
            features: [
                "250 Anahtar Kelime Takibi",
                "Sınırsız Haber Kaynağı İzleme",
                "Aylık 200 AI İçerik Üretimi",
                "WordPress & Sosyal Medya Entegrasyonu",
                "Gelişmiş Analitikler"
            ]
        },
        {
            name: "Medya Grubu",
            prices: { monthly: 450, sixMonths: 400, annually: 350 },
            originalPrices: { monthly: 900, sixMonths: 800, annually: 700 },
            features: [
                "Sınırsız Anahtar Kelime Takibi",
                "Sınırsız Haber Kaynağı İzleme",
                "Sınırsız AI İçerik Üretimi",
                "Tüm Entegrasyonlar",
                "Özel API Erişimi",
                "Öncelikli Destek"
            ]
        }
    ]
  },
  {
    name: 'Emlak Otomasyonu',
    slug: 'emlak-otomasyonu',
    shortDescription: 'Potansiyel alıcı ve kiracıları yönetin, randevuları otomatikleştirin ve portföyünüzü tek yerden kontrol edin.',
    title: 'Emlak Danışmanları ve Ofisleri için Akıllı Otomasyon Platformu',
    description: 'Web sitenizden, sosyal medyadan ve emlak portallarından gelen potansiyel müşteri taleplerini tek bir akıllı panelde toplayın. Yapay zeka, 7/24 müşteri sorularını yanıtlar, uygun mülkleri önerir ve danışmanlarınız için randevuları otomatik olarak planlar.',
    imageUrl: 'https://www.mortanas.com/resim/emlakotomasyon.png',
    socialProof: {
        count: 150,
        label: 'Emlak Ofisi Kullanıyor'
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Farklı emlak portalları, web sitesi ve sosyal medyadan gelen talepleri takip etmek dağınık ve verimsizdir.",
            solution: "Tüm potansiyel müşteri (lead) kanallarınızı tek bir akıllı gelen kutusunda birleştirerek hiçbir fırsatı kaçırmamanızı sağlıyoruz."
        },
        {
            problem: "Mesai saatleri dışında veya yoğunluktan dolayı taleplere anında dönememek, potansiyel müşterilerin rakiplere gitmesine neden olur.",
            solution: "Yapay zeka, 7/24 çalışarak mülkler hakkında temel soruları yanıtlar, müşteri bilgilerini alır ve danışmanları bilgilendirir."
        },
        {
            problem: "Mülk gösterme randevularını ayarlamak, telefon ve e-posta trafiğiyle çok fazla zaman alır.",
            solution: "Müşteriler, danışmanların takvimine göre uygun zamanları online olarak görüp, yapay zeka yardımıyla otomatik randevu oluşturabilir."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-sitemap",
            title: "Tüm Kanallar Tek Yerde",
            description: "Sahibinden.com, Hepsiemlak, web siteniz ve WhatsApp'tan gelen tüm müşteri taleplerini tek bir panelden yönetin."
        },
        {
            icon: "fas fa-robot",
            title: "7/24 Otomatik Karşılama",
            description: "Yapay zeka, siz meşgulken bile her yeni talebi anında karşılar, ilk bilgileri verir ve müşteriyi sıcak tutar."
        },
        {
            icon: "fas fa-calendar-check",
            title: "Akıllı Randevu Planlama",
            description: "Danışmanlarınızın takvimleriyle entegre çalışarak, mülk gösterme randevularını otomatik olarak ve çakışma olmadan ayarlar."
        },
        {
            icon: "fas fa-house-user",
            title: "Akıllı Mülk Eşleştirme",
            description: "Yapay zeka, müşterinin aradığı kriterlere (oda sayısı, metrekare, konum vb.) en uygun mülkleri portföyünüzden bularak önerir."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-plug",
          title: "1. Kanalları Bağlayın",
          description: "Emlak portallarınızı, web sitenizi ve WhatsApp numaranızı sisteme kolayca entegre edin."
      },
      {
          icon: "fas fa-building-user",
          title: "2. Portföyünüzü Yükleyin",
          description: "Mevcut mülk ilanlarınızı sisteme yükleyerek yapay zekanın portföyünüzü öğrenmesini sağlayın."
      },
      {
          icon: "fas fa-rocket",
          title: "3. Otomasyonu Başlatın",
          description: "Arkanıza yaslanın ve yapay zekanın sizin için müşteri adaylarını yönetmesini ve randevuları organize etmesini izleyin."
      }
    ],
    integrations: {
        title: "Sektörün Liderleriyle Tam Entegrasyon",
        description: "En popüler emlak portalları ve iletişim kanallarıyla sorunsuz bir şekilde çalışarak iş akışınızı kolaylaştırın.",
        logos: [
            { name: "Sahibinden.com", logoUrl: "https://i.imgur.com/R3aB5N7.png" },
            { name: "Hepsiemlak", logoUrl: "https://i.imgur.com/GHYp627.png" },
            { name: "Emlakjet", logoUrl: "https://i.imgur.com/4q6XyJ2.png" },
            { name: "Zingat", logoUrl: "https://i.imgur.com/U8tJ8Y3.png" },
            { name: "WhatsApp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" },
            { name: "Instagram", logoUrl: "https://i.hizliresim.com/l1o40i2.png" },
        ]
    },
    ourGoal: {
        title: "Amacımız: Danışmanlara Zaman Kazandırmak, Satışları Hızlandırmak",
        description: "Teknolojiyi kullanarak emlak danışmanlarının tekrarlayan ve zaman alan işlerden kurtulmasını, böylece asıl odaklanmaları gereken şeye, yani mülk satmaya ve kiralamaya daha fazla zaman ayırmalarını sağlamayı hedefliyoruz."
    },
    setupFee: {
      original: 900,
      discounted: 500,
    },
    pricingPlans: [
        {
            name: "Bireysel Danışman",
            prices: { monthly: 90, sixMonths: 80, annually: 70 },
            originalPrices: { monthly: 180, sixMonths: 160, annually: 140 },
            features: [
                "1 Kullanıcı (Danışman)",
                "50 Mülk Yönetimi",
                "2 Portal Entegrasyonu",
                "Temel AI Yanıtlama",
                "Otomatik Randevu Takvimi"
            ]
        },
        {
            name: "Emlak Ofisi",
            prices: { monthly: 220, sixMonths: 200, annually: 180 },
            originalPrices: { monthly: 440, sixMonths: 400, annually: 360 },
            popular: true,
            features: [
                "5 Kullanıcıya Kadar",
                "250 Mülk Yönetimi",
                "5 Portal Entegrasyonu",
                "Gelişmiş AI Eşleştirme",
                "Detaylı Raporlama ve Analitik"
            ]
        },
        {
            name: "Zincir Ofis",
            prices: { monthly: 480, sixMonths: 430, annually: 390 },
            originalPrices: { monthly: 960, sixMonths: 860, annually: 780 },
            features: [
                "Sınırsız Kullanıcı",
                "Sınırsız Mülk Yönetimi",
                "Sınırsız Portal Entegrasyonu",
                "Özelleştirilmiş AI Modeli",
                "Öncelikli Destek ve API Erişimi"
            ]
        }
    ]
  },
  {
    name: 'Stok Yönetimi Otomasyonu',
    slug: 'stok-yonetimi-otomasyonu',
    shortDescription: 'Envanterinizi anlık takip edin, siparişleri otomatikleştirin ve stok maliyetlerinizi düşürün.',
    title: 'Akıllı Stok ve Envanter Yönetim Otomasyonu',
    description: 'E-ticaret siteniz, pazar yerleri ve fiziksel mağazalarınızdaki stok seviyelerini tek bir merkezden yönetin. Yapay zeka, satış trendlerini analiz ederek minimum stok seviyelerini belirler, tedarikçilere otomatik sipariş geçer ve stok fazlası veya stok tükenmesi riskini ortadan kaldırır.',
    imageUrl: 'https://www.mortanas.com/resim/stokotomasyon.png',
    socialProof: {
        count: 200,
        label: 'Perakendeci Kullanıyor'
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Farklı satış kanallarındaki (mağaza, web sitesi, pazar yerleri) stokları manuel olarak takip etmek, hatalara ve zaman kaybına yol açar.",
            solution: "Tüm satış kanallarınızdaki envanteri tek bir panelde birleştirerek, stok seviyelerini gerçek zamanlı ve hatasız bir şekilde senkronize ediyoruz."
        },
        {
            problem: "Popüler ürünlerin stoklarının tükenmesi (stockout), hem satış kaybına hem de müşteri memnuniyetsizliğine neden olur.",
            solution: "Yapay zeka, satış verilerinizi ve trendleri analiz ederek kritik stok seviyelerini belirler ve tükenmeden önce otomatik olarak tedarikçiye sipariş geçer."
        },
        {
            problem: "Fazla stok (overstock) tutmak, depolama maliyetlerini artırır ve sermayenizi gereksiz yere bağlar.",
            solution: "Talep tahminleme algoritmalarımız, hangi üründen ne kadar stok tutmanız gerektiğini optimize eder, böylece gereksiz maliyetlerden kurtulursunuz."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-sync-alt",
            title: "Gerçek Zamanlı Senkronizasyon",
            description: "Tüm online ve offline kanallarınızdaki stok hareketlerini anlık olarak tek bir merkezden izleyin. Bir kanalda satılan ürün, anında diğer tüm kanallarda güncellenir."
        },
        {
            icon: "fas fa-brain",
            title: "AI Destekli Talep Tahmini",
            description: "Yapay zeka, geçmiş satış verilerini, mevsimselliği ve trendleri analiz ederek gelecekteki talebi tahmin eder ve size en doğru stok seviyelerini önerir."
        },
        {
            icon: "fas fa-truck-loading",
            title: "Otomatik Sipariş Yönetimi",
            description: "Belirlediğiniz kurallara göre, stoklar kritik seviyeye düştüğünde sistem otomatik olarak tedarikçilerinize sipariş oluşturur ve gönderir."
        },
        {
            icon: "fas fa-store",
            title: "Çok Kanallı Entegrasyon",
            description: "Shopify, WooCommerce, Trendyol, Hepsiburada gibi popüler e-ticaret platformları ve pazar yerleriyle tam entegre çalışır."
        }
    ],
    howItWorks: [
      {
          icon: "fas fa-plug",
          title: "1. Kanallarınızı Entegre Edin",
          description: "E-ticaret sitenizi, pazar yeri mağazalarınızı ve fiziksel POS sistemlerinizi platformumuza kolayca bağlayın."
      },
      {
          icon: "fas fa-chart-bar",
          title: "2. Yapay Zeka Analiz Etsin",
          description: "Yapay zeka, satış verilerinizi analiz ederek ürünleriniz için talep tahminleri ve ideal stok seviyeleri oluşturur."
      },
      {
          icon: "fas fa-cogs",
          title: "3. Otomasyonu Ayarlayın",
          description: "Otomatik sipariş kurallarını belirleyin ve sistemin envanterinizi sizin için optimize etmesini izleyin."
      }
    ],
    integrations: {
        title: "Tüm Satış Ekosisteminizle Uyumlu",
        description: "En popüler e-ticaret platformları, pazar yerleri ve ERP sistemleri ile sorunsuz entegrasyon.",
        logos: [
            { name: "Shopify", logoUrl: "https://www.freepnglogos.com/uploads/shopify-logo-png/ecommerce-shopify-logo-hd-1.png" },
            { name: "WooCommerce", logoUrl: "https://1000logos.net/wp-content/uploads/2020/08/WooCommerce-Logo.jpg" },
            { name: "Trendyol", logoUrl: "https://cdn.webrazzi.com/uploads/2019/09/trendyol-240_hd.jpeg" },
            { name: "Hepsiburada", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Hepsiburada_logo_2023.svg" },
            { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
            { name: "SAP", logoUrl: "https://1000logos.net/wp-content/uploads/2017/03/SAP-Logo.png" },
            { name: "Netsuite", logoUrl: "https://www.logo.wine/a/logo/NetSuite/NetSuite-Logo.wine.svg" },
        ]
    },
    ourGoal: {
        title: "Amacımız: Sıfır Stok Hatası, Maksimum Kârlılık",
        description: "Doğru ürünün, doğru zamanda, doğru miktarda stokta olmasını sağlayarak operasyonel mükemmelliğe ulaşmanızı hedefliyoruz. Amacımız, envanter maliyetlerinizi düşürürken satış potansiyelinizi en üst düzeye çıkarmaktır."
    },
    setupFee: {
      original: 1200,
      discounted: 700,
    },
    pricingPlans: [
        {
            name: "Küçük İşletme",
            prices: { monthly: 120, sixMonths: 108, annually: 96 },
            originalPrices: { monthly: 240, sixMonths: 216, annually: 192 },
            features: [
                "1 Satış Kanalı Entegrasyonu",
                "500 Ürüne Kadar (SKU)",
                "Temel Talep Tahmini",
                "Manuel Sipariş Oluşturma"
            ]
        },
        {
            name: "Büyüyen Mağaza",
            prices: { monthly: 250, sixMonths: 225, annually: 200 },
            originalPrices: { monthly: 500, sixMonths: 450, annually: 400 },
            popular: true,
            features: [
                "5 Satış Kanalı Entegrasyonu",
                "5,000 Ürüne Kadar (SKU)",
                "AI Destekli Talep Tahmini",
                "Otomatik Sipariş Oluşturma",
                "Detaylı Raporlama"
            ]
        },
        {
            name: "Kurumsal",
            prices: { monthly: 550, sixMonths: 495, annually: 440 },
            originalPrices: { monthly: 1100, sixMonths: 990, annually: 880 },
            features: [
                "Sınırsız Satış Kanalı",
                "Sınırsız Ürün (SKU)",
                "Gelişmiş AI Analizi",
                "ERP Entegrasyonu",
                "Özel Müşteri Temsilcisi"
            ]
        }
    ]
  },
  {
    name: "Yapay Zeka Chatbot (WhatsApp & IG)",
    slug: "yapay-zeka-chatbot", // changed from yapay-zeka-chatbot-whatsapp-ig
    features: [
      {
        icon: "fas fa-robot",
        title: "Doğal Dil İşleme (NLP)",
        description: "Müşterilerin sorularını insan gibi anlar ve doğal, sohbet havasında akıcı yanıtlar verir.",
        category: "Temel Özellikler"
      },
      {
        icon: "fas fa-bolt",
        title: "Anında Yanıt",
        description: "Gelen tüm mesajlara 1 saniyeden kısa sürede yanıt vererek müşteri memnuniyetini zirveye çıkarır.",
        category: "Temel Özellikler"
      },
      {
        icon: "fas fa-language",
        title: "Çoklu Dil Desteği",
        description: "Dünyanın her yerinden gelen müşterilere, onların ana dilinde otomatik ve kusursuz yanıt verir.",
        category: "Müşteri Deneyimi"
      },
      {
        icon: "fas fa-user-tie",
        title: "İnsan Temsilciye Aktarım",
        description: "Karmaşık veya özel konularda yapay zeka, görüşmeyi tüm geçmişiyle birlikte yetkili kişiye devreder.",
        category: "Müşteri Deneyimi"
      },
      {
        icon: "fas fa-file-invoice-dollar",
        title: "Sipariş ve Rezervasyon Alımı",
        description: "WhatsApp üzerinden doğrudan sipariş kaydı veya rezervasyon taleplerini alıp sisteminize işler.",
        category: "Satış ve Dönüşüm"
      }
    ],
    benefits: [
      {
        icon: "fas fa-chart-line",
        title: "Artan Dönüşüm Oranları",
        description: "Müşterilerinizin anında yanıt alması, satın alma kararlarını hızlandırır ve sıcak fırsatların kaçmasını engeller."
      },
      {
        icon: "fas fa-piggy-bank",
        title: "Düşük Operasyon Maliyetleri",
        description: "Büyük bir canlı destek ekibi kurmak yerine, binlerce görüşmeyi tek bir sistem üzerinden yöneterek maliyetleri azaltın."
      },
      {
        icon: "fas fa-face-smile-wink",
        title: "Yüksek Müşteri Memnuniyeti",
        description: "Müşteriler saatlerce bekletilmek yerine 7/24 istedikleri an saniyeler içinde çözüme kavuşurlar."
      },
      {
        icon: "fas fa-clock",
        title: "7/24 Kesintisiz Hizmet",
        description: "İşletmeniz kapalıyken bile satış yapmaya, bilgi vermeye ve müşteri taleplerini toplayama devam edersiniz."
      }
    ],
    aiFeatures: {
      title: "Gelişmiş Yapay Zeka Özellikleri",
      subtitle: "Müşteri iletişimini bir üst seviyeye taşıyan akıllı teknolojiler.",
      features: [
        {
          icon: "fas fa-brain",
          title: "Sürekli Öğrenen Algoritma",
          description: "Müşterilerinizle ne kadar çok konuşursa, sektörel standartlarda o kadar isabetli ve kaliteli yanıtlar üretir."
        },
        {
          icon: "fas fa-heart-crack",
          title: "Duygu (Sentiment) Analizi",
          description: "Müşterinin kızgın, memnun veya kararsız olduğunu anlayarak üslubunu otomatik olarak ona göre ayarlar."
        },
        {
          icon: "fas fa-tags",
          title: "Akıllı Etiketleme ve Segmentasyon",
          description: "Görüşme içeriğine göre müşterileri potansiyel alıcı, şikayet veya teknik destek olarak otomatik etiketler."
        }
      ]
    },
    targetAudience: [
      { name: "E-Ticaret Firmaları", icon: "fas fa-shopping-cart" },
      { name: "Oteller ve Restoranlar", icon: "fas fa-hospitality" },
      { name: "Sağlık Merkezleri", icon: "fas fa-heartbeat" },
      { name: "Emlak Ajansları", icon: "fas fa-building" },
      { name: "Danışmanlık Şirketleri", icon: "fas fa-handshake" },
      { name: "Güzellik ve Spa Tesisleri", icon: "fas fa-spa" }
    ],
    shortDescription: "WhatsApp ve Instagram DM üzerindeki tüm mesajları 7/24 otomatik ve akıllıca yanıtlayın.",
    title: "Yapay Zeka Destekli Hibrit Mesajlaşma & Hub Chatbot",
    description: "Satış ve destek süreçlerinizin hızını ve dönüşümünü en üst düzeye çıkarmak için WhatsApp ve Instagram platformlarında müşterilerinizle insan benzeri bir akıcılıkla etkileşime geçen gelişmiş yapay zeka entegrasyonu.",
    imageUrl: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 420,
        label: "Aktif Chatbot"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Gece saatlerinde veya yoğunluk anında gelen mesajlar cevapsız kalıyor ve potansiyel müşteriler rakiplere yöneliyor.",
            solution: "7/24 anında yanıt veren yapay zeka asistanı, müşterilerinizi saniyeler içinde karşılayarak sıcak satışı canlı tutar."
        },
        {
            problem: "Sıkça sorulan tekrarlayan sorular, canlı destek ekibinin zamanını boşa harcıyor ve operasyon yoruyor.",
            solution: "Müşteri sorularının %85'ini insan desteğine ihtiyaç duymadan çözer, karmaşık talepleri yetkililere akıllıca devreder."
        },
        {
            problem: "Sosyal medyada geç dönülen ve takip edilmeyen yorumlar sıcak satış fırsatlarının kaçmasına neden oluyor.",
            solution: "Yorum yazan kullanıcıları saniyeler içinde tespit edip DM yoluyla otomatik bir diyalog ve teklif akışına dönüştürür."
        }
    ],
    whyChooseUs: [
        {
            icon: "fab fa-whatsapp",
            title: "Resmi WhatsApp & Cloud API",
            description: "Meta kurumsal iş ortaklığı standartlarında, numara engellenmesi riski olmadan resmi ve güvenli bulut API altyapısı."
        },
        {
            icon: "fab fa-instagram",
            title: "Instagram DM & Yorum Otomasyonu",
            description: "Post ve Story yorumlarına saniyeler içinde yanıt vererek kullanıcıları otomatik olarak DM üzerinden satış hunisine yönlendirir."
        },
        {
            icon: "fas fa-shield-halved",
            title: "KVKK & %100 Güvenli Altyapı",
            description: "Müşteri yazışmaları ve verileri tam uyumlu şifreli sunucularda saklanır, kurumsal gizlilik standartlarını tam karşılar."
        },
        {
            icon: "fas fa-chart-pie",
            title: "Gelişmiş Conversational Analytics",
            description: "Ziyaretçilerin en çok sorduğu soruları, taleplerini ve satış oranlarını anlık görselleştirilmiş panolarla raporlar."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-plug",
          title: "1. Kanalları Entegre Et",
          description: "WhatsApp ve Instagram hesaplarınızı güvenli Meta kurumsal Cloud API ile sisteme bağlayın."
      },
      {
          icon: "fas fa-brain",
          title: "2. Satış Dilini Öğret",
          description: "Ürünlerinizi, fiyat listelerinizi ve kurumsal iletişim üslubunuzu sisteme yükleyerek yapay zekayı eğitin."
      },
      {
          icon: "fas fa-rocket",
          title: "3. Satışları Otomatize Et",
          description: "Müşterilerinizle iletişimi anında yapay zekaya devredin ve artan müşteri memnuniyetinin ve cironun keyfini çıkarın."
      }
    ],
    integrations: {
        title: "Kusursuz Ekosistem",
        description: "En popüler CRM, ERP ve ödeme sistemleriyle tam uyumlu bir mesajlaşma deneyimi yaşatır.",
        logos: [
            { name: "WhatsApp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" },
            { name: "Instagram", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/512px-Instagram_icon.png" },
            { name: "Shopify", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png" },
            { name: "Trendyol", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Trendyol_logo.svg/512px-Trendyol_logo.svg.png" },
            { name: "HubSpot", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: 7/24 Kesintisiz Satış Motoru Kurmak",
        description: "Sosyal medya ve mesajlaşma kanallarınızdaki anlık fırsatları kaçırmamanız için insan zekası esnekliğinde ama robot hızında çalışan bir sistem oluşturmayı hedefliyoruz."
    },
    setupFee: {
        original: 800,
        discounted: 450
    },
    pricingPlans: [
        {
            name: "Start",
            prices: { monthly: 79, sixMonths: 69, annually: 59 },
            originalPrices: { monthly: 120, sixMonths: 100, annually: 85 },
            features: [
                "2 Kanal Entegrasyonu",
                "Aylık 2.500 Ücretsiz Mesaj",
                "Bilgi Dağarcığı Eğitimi",
                "Yorumdan DM'e Yönlendirme"
            ]
        },
        {
            name: "Enterprise",
            prices: { monthly: 149, sixMonths: 129, annually: 109 },
            originalPrices: { monthly: 220, sixMonths: 190, annually: 160 },
            features: [
                "Sınırsız Kanal Entegrasyonu",
                "Aylık 15.000 Mesaj",
                "Gelişmiş Raporlama & Duygu Analizi",
                "Sipariş & CRM Entegrasyonları"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Çağrı Karşılama (Voice AI)",
    slug: "cagri-karsilama-voice-ai",
    shortDescription: "Gelen aramaları sıfır gecikmeyle, insan benzeri ses kalitesiyle karşılayan yapay zeka telefon asistanı.",
    title: "Akıllı Çağrı Karşılama & Randevu Otomasyonu",
    description: "Gelen çağrıları karşılamak, randevuları organize etmek, rezervasyon almak ve müşteriyi anında bilgilendirmek için tasarlanmış gerçekçi ve anlık sesli yapay zeka çözümü.",
    imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 280,
        label: "Entegre Santral"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Yoğun saatlerde veya mesai dışı aramalarda telefonların kaçırılması doğrudan ciro ve müşteri kaybına sebep oluyor.",
            solution: "Eş zamanlı yüzlerce çağrıyı sıfır bekleme süresiyle yanıtlayarak tüm müşterilere anında profesyonel asistanlık sunar."
        },
        {
            problem: "Randevu koordinasyonu telefon trafiği içinde kayboluyor ve manuel planlama hataları meydana geliyor.",
            solution: "Yapay zeka asistanı, işletmenizin takvimiyle canlı entegre çalışarak randevuları doğrudan oluşturur ve onaylar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-volume-up",
            title: "Ultra Gerçekçi Ses Tonları",
            description: "Robotik olmayan, doğal nefes alma sesleri ve kusursuz Türkçe diksiyonla entegre edilmiş insan benzeri ses teknolojisi."
        },
        {
            icon: "fas fa-calendar-check",
            title: "Takvim Entegrasyonu",
            description: "Google Calendar ve özel CRM sistemlerinizle eş zamanlı randevu oluşturma ve takvim çakışmalarını önleme."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-phone",
          title: "1. Santral Yönlendirmesi",
          description: "Şirketinizin telefon hattını veya sanal numarasını doğrudan yapay zeka santralimize yönlendirin."
      },
      {
          icon: "fas fa-cogs",
          title: "2. Ses ve Senaryo Ayarı",
          description: "Markanıza uygun ses tonunu seçin, randevu alma ve karşılama senaryolarını ihtiyaçlarınıza göre kurgulayın."
      },
      {
          icon: "fas fa-headphones",
          title: "3. Akıllı Yanıtlama",
          description: "Artık tüm gelen aramalar ilk zil sesinde açılır ve randevu ile bilgi verme işlemleri otonom hale gelir."
      }
    ],
    integrations: {
        title: "Randevu ve Takvim Entegrasyonları",
        description: "Randevular doğrudan takviminize işlenirken müşteri kayıtları CRM sisteminize aktarılır.",
        logos: [
            { name: "Google Calendar", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/512px-Google_Calendar_icon_%282020%29.svg.png" },
            { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" },
            { name: "HubSpot", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png" },
            { name: "Calendly", logoUrl: "https://cdn.icon-icons.com/icons2/2699/PNG/512/calendly_logo_icon_168051.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Profesyonel İmkanlarla Sıfır Gecikme",
        description: "Hiçbir müşterinizin bekletilmediği, ilk saniyede yüksek bir profesyonellikle karşılandığı ve randevusunun saniyeler içinde oluşturulduğu bir telefon deneyimi sağlamak ana misyonumuzdur."
    },
    setupFee: {
        original: 1000,
        discounted: 600
    },
    pricingPlans: [
        {
            name: "Hafif Çağrı",
            prices: { monthly: 119, sixMonths: 99, annually: 89 },
            originalPrices: { monthly: 180, sixMonths: 150, annually: 130 },
            features: [
                "300 Görüşme Dakikası/Ay",
                "Canlı Randevu Rezervasyonu",
                "Arayan Kimliği Analizi",
                "Görüşme Özeti & SMS Gönderimi"
            ]
        },
        {
            name: "Yoğun Çağrı",
            prices: { monthly: 249, sixMonths: 219, annually: 199 },
            originalPrices: { monthly: 380, sixMonths: 330, annually: 290 },
            features: [
                "1.000 Görüşme Dakikası/Ay",
                "Eş Zamanlı 10 Görüşme",
                "Özel Bilgi Entegrasyonu",
                "API ve Veri Aktarımı"
            ],
            popular: true
        }
    ]
  },
  {
    name: "İş Akışı Otomasyonu (RPA)",
    slug: "is-akisi-otomasyonu-rpa",
    shortDescription: "Yazılımsal robotlarla tekrarlayan manuel süreçleri otomatiğe alarak insan hatasını sıfıra indirin.",
    title: "Yapay Zeka Destekli RPA & Süreç Otomasyonu",
    description: "Veri girişi, rapor hazırlama, mutabakat ve dosya transferi gibi rutin iş süreçlerinizi insan müdahalesi olmadan 7/24 hatasız yürüten akıllı yazılım robotları.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 180,
        label: "Süreç Otomatikleştirildi"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Ekiplerin saatlerini harcadığı Excel kopyalama, veri taşıma ve manuel fatura kontrolleri iş verimini baltalıyor.",
            solution: "Sonsuz hızda çalışan RPA robotlarımız, verileri sistemler arasında saniyeler içinde aktararak personeli yaratıcı işlere yönlendirir."
        },
        {
            problem: "Veri transferlerindeki insan kaynaklı dikkatsizlik ve hatalar ciddi finansal kayıplara sebep oluyor.",
            solution: "Robotlar tanımlı algoritmalarla çalışarak işlemleri sıfır hata toleransıyla yürütür ve her adımı kayıt altında tutar."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-shield-halved",
            title: "Kurumsal Güvenlik ve Uyumluluk",
            description: "Tüm faaliyetleri şifrelenmiş güvenli sanal makinelerde çalıştırır ve lokal mevzuatlara %100 uyum sağlar."
        },
        {
            icon: "fas fa-bezier-curve",
            title: "Sistemler Arası Köprü",
            description: "API desteği olmayan en eski masaüstü uygulamaları dahi tıpkı bir insan gibi ekranı okuyarak birbiriyle entegre eder."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-eye",
          title: "1. Süreç Analizi",
          description: "Şirketinizdeki tekrarlayan, manuel ve hataya açık operasyonel iş akışlarını ekiplerimizle analiz edin."
      },
      {
          icon: "fas fa-robot",
          title: "2. Bot Geliştirme",
          description: "Veri aktarımı, fatura işleme ve mutabakat yapacak RPA robotlarını tasarlayalım."
      },
      {
          icon: "fas fa-chart-line",
          title: "3. Devreye Alma",
          description: "Hatasız çalışan botlarla operasyon maliyetlerinizi %70 azaltıp daha stratejik işlere odaklanın."
      }
    ],
    integrations: {
        title: "Tüm Programlarla Çalışabilen Yapı",
        description: "RPA robotlarımız, API olmasa bile ekrandaki verileri okuyarak her türlü ERP ve yazılımla uyumlu çalışabilir.",
        logos: [
            { name: "SAP", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/512px-SAP_2011_logo.svg.png" },
            { name: "Microsoft Excel", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png" },
            { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: İşgücünü Manuel Yükten Kurtarmak",
        description: "Ekibinizin değerli zamanını kopyala-yapıştır gibi rutin işlemlerle harcamak yerine, yaratıcılık ve analiz gerektiren stratejik hedeflere yönlendirmeyi amaçlıyoruz."
    },
    setupFee: {
        original: 1500,
        discounted: 950
    },
    pricingPlans: [
        {
            name: "Tekli Robot",
            prices: { monthly: 199, sixMonths: 179, annually: 159 },
            originalPrices: { monthly: 300, sixMonths: 270, annually: 240 },
            features: [
                "1 Aktif Süreç Robotu",
                "Aylık 10.000 İşlem Sınırı",
                "Hata Bildirim Raporları",
                "Çalışma Saatleri Planlama"
            ]
        },
        {
            name: "Çoklu Robot",
            prices: { monthly: 449, sixMonths: 399, annually: 349 },
            originalPrices: { monthly: 650, sixMonths: 580, annually: 500 },
            features: [
                "3 Aktif Süreç Robotu",
                "Sınırsız İşlem Sayısı",
                "7/24 Canlı İzleme Paneli",
                "Akıllı AI Belge Okuma (OCR)"
            ],
            popular: true
        }
    ]
  },
  {
    name: "İK ve İşe Alım Asistanı",
    slug: "ik-ve-ise-alim-asistani",
    shortDescription: "CV tarama, ön mülakat planlama ve aday değerlendirme süreçlerini yapay zeka ile %80 hızlandırın.",
    title: "Akıllı İK, CV Tarama ve Aday Sıralama Asistanı",
    description: "İş başvurusu yapan yüzlerce aday arasından aradığınız kriterlere en uygun yetenekleri saniyeler içinde tespit eden, ön elemeleri otomatik gerçekleştiren İK asistanı.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 120,
        label: "İK Departmanı Kullanıyor"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Yüzlerce başvuru arasından doğru özgeçmişleri seçmek İK departmanının günlerce vaktini ve enerjisini alıyor.",
            solution: "Yapay zeka, adayların yetkinliklerini pozisyon gereksinimleriyle anlık karşılaştırarak en uyumlu %10'u önünüze sıralar."
        },
        {
            problem: "Adaylarla ilk mülakat randevusu ayarlama süreci e-posta trafiğinde çok uzuyor veya aksıyor.",
            solution: "Seçilen adaylara otomatik olarak takvim önerilir, adayın seçtiği saate mülakat daveti anında ulaştırılır."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-folder-open",
            title: "Semantik CV Analizi ve Puanlama",
            description: "Sadece anahtar kelimelere bakmakla kalmaz; projenin, şirketlerin ve adayın genel deneyiminin derin semantik analizini gerçekleştirir."
        },
        {
            icon: "fas fa-user-check",
            title: "Yapay Zeka Ön Süzgeç Mülakatları",
            description: "Adaylara WhatsApp veya e-posta üzerinden yönlendirilen akıllı sorularla, başvurunun samimiyeti ve heyecanı önceden ölçülür."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-file-upload",
          title: "1. CV'leri Sisteme Yükle",
          description: "İş ilanlarınıza gelen yüzlerce CV'yi veya kariyer portallarındaki havuzunuzu sisteme otomatik bağlayın."
      },
      {
          icon: "fas fa-filter",
          title: "2. Kriterleri Belirle",
          description: "Adaylarda aradığınız yetkinlikleri, deneyimi ve beklentileri yapay zekaya bir kez tanımlayın."
      },
      {
          icon: "fas fa-user-check",
          title: "3. En İyileri Keşfet",
          description: "Yapay zeka tüm havuzu analiz eder ve sadece istenen nitelikleri taşıyan adayları size puanlanmış olarak sunar."
      }
    ],
    integrations: {
        title: "İnsan Kaynakları Entegrasyonu",
        description: "En popüler iş ilan portalları ve şirket içi İK yönetim yazılımlarıyla kesintisiz entegre.",
        logos: [
            { name: "LinkedIn", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/512px-LinkedIn_icon.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Doğru Yeteneği Hızla Bulmak",
        description: "Yanlış işe alımların şirketlere yarattığı büyük maliyeti önleyip, yetenek tarama sürecini en aza indirgeyerek gerçek yeteneklere odaklanmanızı sağlamak."
    },
    setupFee: {
        original: 800,
        discounted: 500
    },
    pricingPlans: [
        {
            name: "Start-up İK",
            prices: { monthly: 89, sixMonths: 79, annually: 69 },
            originalPrices: { monthly: 150, sixMonths: 130, annually: 110 },
            features: [
                "Aylık 100 CV Tarama",
                "3 Aktif İlan Yönetimi",
                "Otomatik Aday Puanlama",
                "WhatsApp Davetiye Gönderme"
            ]
        },
        {
            name: "Profesyonel İK",
            prices: { monthly: 199, sixMonths: 179, annually: 159 },
            originalPrices: { monthly: 300, sixMonths: 270, annually: 240 },
            features: [
                "Sınırsız CV Tarama",
                "15 Aktif İlan Yönetimi",
                "ATS (Aday Takip Sistemi) Entegrasyonu",
                "AI Telefon Mülakat Planlama"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Dinamik Fiyatlandırma & Stok (E-Ticaret)",
    slug: "dinamik-fiyatlandirma-stok",
    shortDescription: "Pazaryerlerindeki rakip fiyatlarını ve stoklarını anlık izleyerek kârlılığınızı ve satışlarınızı akıllıca maksimuma çıkarın.",
    title: "Akıllı Dinamik Fiyatlandırma & Envanter Optimizayson Sistemi",
    description: "Trendyol, Hepsiburada, Amazon ve Shopify mağazalarınızda rakiplerin fiyat dalgalanmalarını ve stok seviyelerini canlı tarayarak, en yüksek kâr marjıyla Buybox kazanmanızı sağlayan yapay zeka algoritması.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 320,
        label: "E-Ticaret Mağazası"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Rakipler fiyat kırdığında veya stok tükettiğinde bunu geç fark etmek kar kaybına veya aşırı düşük fiyattan satışa yol açıyor.",
            solution: "Sistem rakipleri 10 dakikada bir tarar, belirlediğiniz kurallar dahilinde fiyatınızı otomatik olarak yukarı veya aşağı revize eder."
        },
        {
            problem: "Pazaryerlerinde Buybox pozisyonunu kaybetmek reklam bütçenizi boşa harcıyor ve satışları durma noktasına getiriyor.",
            solution: "Akıllı algoritmalarımız sayesinde Buybox kazanırken kâr marjınızı en yüksek sınırda koruyarak maksimum kazanç sağlarız."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-bolt",
            title: "10 Dakikalık Periyotlar",
            description: "Sektördeki en hızlı tarama ve fiyat güncelleme altyapısıyla rakiplerinizin hamlelerine anında karşılık verin."
        },
        {
            icon: "fas fa-scale-balanced",
            title: "Kâr Marjı Koruyucu Sistemi",
            description: "Minimum kâr limitlerinizin altına asla inmeden, akıllıca ve güvenle rekabet etmenizi sağlar."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-link",
          title: "1. Mağazaları Bağla",
          description: "Pazaryeri dükkanlarınızı ve e-ticaret sitenizi API aracılığıyla fiyatlandırma motoruna tanımlayın."
      },
      {
          icon: "fas fa-sliders-h",
          title: "2. Kâr Kurallarını Koy",
          description: "Satış stratejinizdeki minimum kâr marjını ve stok seviyesi alarmlarını özel panoda belirleyin."
      },
      {
          icon: "fas fa-chart-line",
          title: "3. Buybox Kazan",
          description: "Rakipler fiyat kırdıkça ya da fiyat artırdıkça, motorunuz otomatik algoritmasıyla en optimum fiyatı vererek satışı alır."
      }
    ],
    integrations: {
        title: "E-Ticaret Platformlarıyla Anında Senkron",
        description: "Tüm popüler pazar yerlerinde fiyatları anlık güncel tutan geniş e-ticaret entegrasyonu.",
        logos: [
            { name: "Trendyol", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Trendyol_logo.svg/512px-Trendyol_logo.svg.png" },
            { name: "Hepsiburada", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Hepsiburada_logo_2023.svg" },
            { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" },
            { name: "Shopify", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Tüm Pazar Yerlerinde Avantaj Sağlamak",
        description: "Uyuyan stoklarınızı veya rekabette geri kalan ürünlerinizi akıllı fiyatlandırma manevraları ile sektördeki en büyük oyuncular seviyesine yükseltmek."
    },
    setupFee: {
        original: 1100,
        discounted: 650
    },
    pricingPlans: [
        {
            name: "Küçük Ölçek",
            prices: { monthly: 129, sixMonths: 109, annually: 99 },
            originalPrices: { monthly: 200, sixMonths: 170, annually: 150 },
            features: [
                "500 Aktif Ürün (SKU) İzleme",
                "2 Pazaryeri Bağlantısı",
                "Saatlik Fiyat Güncelleme",
                "Stok Kritik Uyarıları"
            ]
        },
        {
            name: "Profesyonel Satıcı",
            prices: { monthly: 279, sixMonths: 249, annually: 229 },
            originalPrices: { monthly: 420, sixMonths: 370, annually: 330 },
            features: [
                "5.000 Aktif Ürün (SKU) İzleme",
                "Tüm Pazaryerleri & Shopify",
                "10 Dakikalık Anlık Fiyat Revizesi",
                "Buybox Takip Algoritması"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Kişiselleştirilmiş E-Posta Pazarlama",
    slug: "kisisellestirilmis-e-posta-pazarlama",
    shortDescription: "Yapay zekanın hazırlayacağı kişiselleştirilmiş bülten ve otomasyon senaryolarıyla e-posta cirosunu %300 artırın.",
    title: "Yapay Zeka Destekli Akıllı E-Posta Otomasyon Entegrasyonu",
    description: "Kullanıcıların web sitenizde veya uygulamanızda gerçekleştirdikleri hareketlere göre otomatik bültenler hazırlayan, kişiye özel indirimler kurgulayan ve açılma oranlarını ölçen pazarlama motoru.",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 180,
        label: "Kurumsal Marka"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Tüm veri tabanına aynı e-postayı göndermek düşük açılma oranlarına ve yüksek çıkış (unsubscribe) oranlarına neden oluyor.",
            solution: "Sistem her kullanıcının ilgi alanlarına, geçmiş alışverişlerine ve tıklama alışkanlıklarına göre özel ürün bültenleri üretir."
        },
        {
            problem: "Terk edilmiş sepetleri ve hoş geldin serilerini yönetmek zaman alıyor ve statik mailler müşteriyi tetiklemiyor.",
            solution: "Sistem, dinamik içerik üreticisiyle sepette kalan tam ürün görsellerini, özel üretilmiş bir ikna metniyle birleştirip otomatik iletir."
        },
        {
            problem: "Manuel kampanya tasarlamak, test etmek ve e-posta başlıklarını optimize etmek ekiplerinizin saatlerini eritiyor.",
            solution: "Gelişmiş AI sistemi, otomatik A/B testleriyle en çok dönüşüm alan başlığı bulur ve teslimat akışlarını kendi kendine optimize eder."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-magic",
            title: "Yapay Zeka Konu Başlığı & İçerik Üreticisi",
            description: "Sektörünüzü analiz eden AI, en yüksek dönüşüm getiren e-posta konu başlıklarını ve gövde metinlerini saniyeler içinde yazar."
        },
        {
            icon: "fas fa-chart-line",
            title: "Akıllı Gönderim Zamanlama",
            description: "Alıcının geçmiş davranışlarından mail kutusunu en sık kontrol ettiği saatleri belirleyerek her kişiye farklı vakitlerde gönderir."
        },
        {
            icon: "fas fa-tags",
            title: "Dinamik Kupon Kurguları",
            description: "Alıcıya özel, süreli ve benzersiz indirim kuponlarını e-postalara otomatik ekleyerek aciliyet hissi yaratır ve satışı hızlandırır."
        },
        {
            icon: "fas fa-envelope-open-text",
            title: "%99.9 Inbox Ulaşım Garantisi",
            description: "Spam filtrelerini aşan, temiz SMTP sunucu havuzumuz ve dedicated IP desteğimizle maillerinizin tanıtım sekmesinde kaybolmasını önler."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-database",
          title: "1. Veri Entegrasyonu",
          description: "Müşteri veritabanınızı ve site ziyaret hareketlerini CRM üzerinden AI e-posta motoruna bağlayın."
      },
      {
          icon: "fas fa-pencil-alt",
          title: "2. Kampanya Taslağı",
          description: "Hedeflediğiniz ürünleri veya kampanyayı belirtin; AI hem metni hem de görselleri hazırlasın."
      },
      {
          icon: "fas fa-paper-plane",
          title: "3. Otomatik Gönderim",
          description: "Sistemi aktive ettiğinizde e-postalar müşterilerin sepetteki hareketlerine veya okuma eğilimlerine göre optimum saatte gönderilir."
      }
    ],
    integrations: {
        title: "Pazarlama ve CRM Uyumu",
        description: "Mevcut e-posta sağlayıcılarınızla köprü kuran esnek entegrasyon yapısı.",
        logos: [
            { name: "Shopify", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png" },
            { name: "HubSpot", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Gelen Kutusu İçerisinden Sadakat Yaratmak",
        description: "Klasik ve herkese aynı giden sıkıcı bültenlerin devrini kapatıp, müşteriye adı, ihtiyaçları ve geçmişiyle seslenen %300 verimli mail kurguları yaratmak."
    },
    setupFee: {
        original: 700,
        discounted: 400
    },
    pricingPlans: [
        {
            name: "Start-up Pazarlama",
            prices: { monthly: 69, sixMonths: 59, annually: 49 },
            originalPrices: { monthly: 110, sixMonths: 95, annually: 80 },
            features: [
                "5.000 Abone Sınırı",
                "Aylık 25.000 E-posta Gönderimi",
                "Temel Hoş Geldin & Sepet Akışı",
                "AI Konu Başlığı Önerileri"
            ]
        },
        {
            name: "Enterprise Pro",
            prices: { monthly: 159, sixMonths: 139, annually: 119 },
            originalPrices: { monthly: 240, sixMonths: 210, annually: 180 },
            features: [
                "Sınırsız Abone Sayısı",
                "Aylık 250.000 E-posta Gönderimi",
                "Gelişmiş Davranışsal Segmentasyon",
                "Özel SMTP & Dedicated IP Kurulumu"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Müşteri İtibar ve Yorum Yönetimi",
    slug: "musteri-itibar-yorum-yonetimi",
    shortDescription: "Google, TripAdvisor, Şikayetvar ve sosyal medyadaki müşteri geri bildirimlerini anlık yönetip yapay zekayla yanıtlayın.",
    title: "Yapay Zeka Destekli Online İtibar & Yorum Yanıtlama Asistanı",
    description: "İşletmeniz hakkında internetteki tüm platformlarda yazılan yorumları, şikayetleri ve puanları tek bir merkezde toplayıp kurumsal dilinize uygun, markanızı koruyacak şekilde otomatik yanıtlayan akıllı platform.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 240,
        label: "Otel & Restoran"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Yüzlerce Google veya TripAdvisor yorumunu gözden kaçırmak veya yanıtsız bırakmak dijital puanınızı ve marka imajınızı düşürüyor.",
            solution: "Sistem gelen her yorumu anlık algılar, duygu analizini yapar ve kurumsal tonunuza sadık kalarak 10 saniye içinde yanıt taslağı sunar."
        },
        {
            problem: "Olumsuz yorumlar ve kriz anlarında hızlı ve yapıcı bir cevap üretememek ciddi itibar ve rezervasyon kaybına sebep oluyor.",
            solution: "Kritik derecedeki negatif yorumlar için yapay zeka özel kriz yatıştırıcı cevaplar kurgulayarak şikayetleri müşteri memnuniyetine çevirir."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-face-smile",
            title: "Duygu Analizi (Sentiment)",
            description: "Yorumların altındaki memnuniyet, öfke veya öneri tonunu otomatik çözümler ve detaylı analitik tablosuna dökerek strateji sunar."
        },
        {
            icon: "fas fa-language",
            title: "Çok Dilli Profesyonel Yanıt",
            description: "Almanca, Rusça, İngilizce veya Arapça gelen yabancı yorumları anında kendi dillerinde mükemmel dil kalitesiyle yanıtlar."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-search",
          title: "1. Kaynakları Belirle",
          description: "Google Maps, TripAdvisor, Şikayetvar veya Trendyol mağazanızı panoya bağlayın."
      },
      {
          icon: "fas fa-comment-dots",
          title: "2. Ses Tonu Kurgusu",
          description: "Olumlu yorumlara veya sert eleştirilere verilecek kurumsal, empatik yapay zeka tonunu belirleyin."
      },
      {
          icon: "fas fa-magic",
          title: "3. Otomatik Yanıtla",
          description: "Her yeni yoruma saniyeler içinde markanızın özenli üslubuyla dönüş yapılsın, marka algısı zirveye taşınsın."
      }
    ],
    integrations: {
        title: "Rehber & Harita Entegrasyonları",
        description: "Müşterinin doğrudan aradığı yerel ve küresel değerlendirme portallarını bir araya getirir.",
        logos: [
            { name: "Google Maps", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Google_Maps_icon.svg/512px-Google_Maps_icon.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Pozitif İtibar Ekonomisi Kurmak",
        description: "Bir yorum yüzünden potansiyel yüzlerce müşteriyi kaybetmenizi önlemek ve anında aksiyon alarak markanın değerini ve güvenirliğini herkese göstermek."
    },
    setupFee: {
        original: 600,
        discounted: 350
    },
    pricingPlans: [
        {
            name: "Tek Lokasyon",
            prices: { monthly: 59, sixMonths: 49, annually: 39 },
            originalPrices: { monthly: 90, sixMonths: 75, annually: 60 },
            features: [
                "1 Google & 1 TripAdvisor Entegrasyonu",
                "Aylık 200 Yorum Yanıtlama",
                "Anlık Bildirim Altyapısı",
                "Temel Raporlama"
            ]
        },
        {
            name: "Çoklu Şube",
            prices: { monthly: 129, sixMonths: 109, annually: 99 },
            originalPrices: { monthly: 190, sixMonths: 160, annually: 140 },
            features: [
                "Sınırsız Entegrasyon (Şikayetvar dahil)",
                "Sınırsız Yorum Yanıtlama",
                "Detaylı Duygu Analizi & Rakip Takibi",
                "Çoklu Dil Desteği"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Akıllı Toplantı ve Transkript Asistanı",
    slug: "akilli-toplanti-transkript-asistani",
    shortDescription: "Toplantılarınızı kaydedin, sesleri yazıya dökün, toplantı içi önemli kararları ve iş atamalarını otomatik raporlayın.",
    title: "Yapay Zeka Destekli Toplantı Transkript & Aksiyon Planlama Sistemi",
    description: "Zoom, Teams veya Google Meet üzerinden gerçekleşen tüm görüşmelerinizi, ses kayıtlarınızı saniyeler içinde eksiksiz yazıya döken, özet çıkaran ve görev dağılımlarını belirleyen yapay zeka arkadaşınız.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 150,
        label: "Şirket Kullanıyor"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Toplantılarda konuşulan kritik kararlar, görevler ve detaylar sonrasında unutuluyor veya yanlış hatırlanıp havada kalıyor.",
            solution: "Her kelimeyi %98 doğruluk payıyla arşivler ve toplantı akabinde yapılması gereken işleri PDF rapor halinde ekibe sunar."
        },
        {
            problem: "Toplantı notu tutmak ve özet derlemek katılımcıların dikkatinin dağılmasına ve zaman kaybına yol açıyor.",
            solution: "Siz sadece konunuza odaklanın. Asistanımız tüm konuşmaları pürüzsüzce ses analizinden geçirerek konuşmacı bazlı bölümlendirir."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-user-friends",
            title: "Konuşmacı Çözümleme (Diarization)",
            description: "Kimin hangi cümleyi söylediğini ses frekanslarına göre ayırt ederek tutanakları kusursuz şekilde yapılandırır."
        },
        {
            icon: "fas fa-file-export",
            title: "Saniyeler İçinde Özet & PDF",
            description: "Saatler süren kurumsal toplantıları 1 dakikada özetleyerek aksiyon maddelerini e-postayla tüm çalışma arkadaşlarınıza iletir."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-video",
          title: "1. Toplantıya Davet Et",
          description: "Yapay zeka asistanını Zoom, Teams veya Meet odasına katılımcı olarak ekleyin."
      },
      {
          icon: "fas fa-ear-listen",
          title: "2. Dinle ve Yazıya Dök",
          description: "Toplantı boyunca asistan, kimin konuştuğunu ayırarak kesintisiz bir yazılı döküm hazırlar."
      },
      {
          icon: "fas fa-file-contract",
          title: "3. Özet & Görev Listesi",
          description: "Toplantı bitiminde akıllı asistan, konuşulan kritik konuları bir taslak halinde hazırlar ve kişilere görevlerini otomatik listeler."
      }
    ],
    integrations: {
        title: "Video Konferans Destekleri",
        description: "En yoğun kullandığınız iletişim kanallarıyla güvenli ve şifreli veri aktarımı yapan bot entegrasyonu.",
        logos: [
            { name: "Microsoft Teams", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/512px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png" },
            { name: "Google Meet", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/512px-Google_Meet_icon_%282020%29.svg.png" },
            { name: "Slack", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Karar Alma Süreçlerini Modernleştirmek",
        description: "Defter veya belge tutma zorunluluğunu bitirip ekibinizin yalnızca karşılıklı fikir üretimine odaklanabildiği, yüksek verimliliğe sahip şirket içi ekosistemler oluşturmak."
    },
    setupFee: {
        original: 500,
        discounted: 300
    },
    pricingPlans: [
        {
            name: "Profesyonel",
            prices: { monthly: 49, sixMonths: 39, annually: 29 },
            originalPrices: { monthly: 80, sixMonths: 65, annually: 50 },
            features: [
                "Aylık 1.000 Toplantı Dakikası",
                "Kişisel Kullanım",
                "Konuşmacı Analizi",
                "Trello & Slack Entegrasyonları"
            ]
        },
        {
            name: "Kurumsal Ekip",
            prices: { monthly: 119, sixMonths: 99, annually: 89 },
            originalPrices: { monthly: 180, sixMonths: 150, annually: 130 },
            features: [
                "Aylık 10.000 Toplantı Dakikası",
                "10 Kullanıcıya Kadar",
                "Markaya Özel AI Özet Şablonları",
                "API Entegrasyonu"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Akıllı Ön Muhasebe Otomasyonu",
    slug: "akilli-on-muhasebe-otomasyonu",
    shortDescription: "Yapay zeka ile fatura tarama, gelir-gider analizi ve cari takipleri sıfır hata ile arşivleyip yönetin.",
    title: "Yapay Zeka Destekli Akıllı Ön Muhasebe & Finans Otomasyonu",
    description: "Gelen faturaları görsel ve PDF formatlarından otomatik okuyarak sisteme işleyen, cari ödemelerinizi takip eden ve size özel finansal durum raporları sunan akıllı muhasebe entegrasyonu.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 310,
        label: "KOBİ Tercih Etti"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Elden veya e-postayla gelen yüzlerce faturayı ön muhasebe sistemine manuel girmek aşırı yavaş ve hataya çok açıktır.",
            solution: "Gelişmiş AI OCR algoritmamız, faturanın üzerindeki firma adı, KDV oranı, matrah gibi verileri saniyeler içinde okur ve otomatik muhasebeye kaydeder."
        },
        {
            problem: "Vadesi gelen alacakları ve ödemeleri manuel Excel dosyalarından izlemek gecikmelere ve nakit akışı aksamalarına yol açıyor.",
            solution: "Sistem, ödeme günleri yaklaşan carilere WhatsApp veya e-posta ile nazik ödeme hatırlatmalarını otomatik olarak ulaştırır."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-receipt",
            title: "Yüksek Başarı Oranlı AI OCR",
            description: "Kırışık veya eğri fişler, kalitesiz fatura taramaları dahil olmak üzere verileri yüksek doğrulukla dijital ortama aktarır."
        },
        {
            icon: "fas fa-shield",
            title: "Maliyestandart Güvenli Koruma",
            description: "Tüm finansal veri saklama ve e-fatura senkronizasyon protokollerini kurumsal e-fatura entegratörleri standartlarında korur."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-file-invoice",
          title: "1. Belgeleri İlet",
          description: "Faturalarınızı ve gider evraklarınızı e-posta ile, WhatsApp ile veya panelden yapay zekaya yükleyin."
      },
      {
          icon: "fas fa-crosshairs",
          title: "2. Optik Veri Ayıklama",
          description: "Asistan karmaşık fişlerde ve PDF faturalarında yer alan vergi dairesi, VKN ve tutar gibi verileri OCR ile eksiksiz ayıklar."
      },
      {
          icon: "fas fa-coins",
          title: "3. Otomatik Muhasebeleştirme",
          description: "Hatasız veriler doğrudan muhasebe programınızda eşleştirilir ve cari kayıtlarınıza yansıtılır."
      }
    ],
    integrations: {
        title: "Popüler Muhasebe Yazılımları",
        description: "Mali müşavirlerin ve KOBİ'lerin yerel-küresel pazar ihtiyaçlarına uygun popüler muhasebe köprüleri.",
        logos: [
            { name: "Excel", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Finansal Verilerde Sıfır Hata",
        description: "Manuel girişlerdeki bir sıfır hatasının yaratacağı mali cezaları önlemek, muhasebe tarafını şeffaf, güvenilir ve hızlandırılmış bir yapıya kavuşturmak."
    },
    setupFee: {
        original: 1200,
        discounted: 750
    },
    pricingPlans: [
        {
            name: "Küçük İşletme",
            prices: { monthly: 99, sixMonths: 89, annually: 79 },
            originalPrices: { monthly: 150, sixMonths: 130, annually: 110 },
            features: [
                "Aylık 250 Belge Okuma (OCR)",
                "Temel Cari Takip Modülü",
                "Nakit Akış Grafikleri",
                "Otomatik Ödeme Hatırlatmaları"
            ]
        },
        {
            name: "Büyüyen KOBİ",
            prices: { monthly: 219, sixMonths: 199, annually: 179 },
            originalPrices: { monthly: 320, sixMonths: 290, annually: 260 },
            features: [
                "Sınırsız Belge Okuma",
                "Gelişmiş ERP & Muhasebe Entegrasyonları",
                "Yolculuk & Harcırah Gider Entegrasyonu",
                "AI Nakit Akış Öngörü Analizi"
            ],
            popular: true
        }
    ]
  },
  {
    name: "Bayi / Saha Satış Otomasyonu",
    slug: "bayi-saha-satis-otomasyonu",
    shortDescription: "Saha ekiplerinizin ziyaret akışlarını, bayi siparişlerini ve lojistik rotalarını akıllı yapay zeka ile otomatik yönetin.",
    title: "Akıllı B2B Bayi Portalı & Saha Satış Rota Optimizasyonu",
    description: "Saha satış temsilcilerinizin günlük ziyaret rotalarını trafik oranlarına göre optimize eden, bayilerinizin sipariş süreçlerini hızlandıran ve stok seviyelerini koruyan akıllı otomasyon sistemi.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    socialProof: {
        count: 160,
        label: "Distribütör Tercihi"
    },
    keyFeatures: [],
    problemSolution: [
        {
            problem: "Saha temsilcilerinin düzensiz rotaları nedeniyle yakıt ve zaman israfı yaşanıyor, bayi ziyaret sayıları düşük kalıyor.",
            solution: "Saha ekiplerinin takvimlerini ve harita konumlarını analiz eden yapay zeka, en az kilometreyle en yüksek verim alacakları rotaları çizer."
        },
        {
            problem: "Bayilerden sipariş toplarken yaşanan gecikmeler ve manuel aktarımlar teslimat aksaklıklarına yol açıyor.",
            solution: "B2B modülümüz ile bayiler sipariş taleplerini anında sisteme girer, stok kontrolleri saniyeler içinde otomatik olarak ERP'ye akar ve tamamlanır."
        }
    ],
    whyChooseUs: [
        {
            icon: "fas fa-map-location-dot",
            title: "Yapay Zeka Destekli Rota Planlama",
            description: "Canlı trafik durumu, mesafe ve öncelikli bayi verilerini inceleyerek en karlı günlük ziyaret sıralamalarını akıllıca planlar."
        },
        {
            icon: "fas fa-store-slash",
            title: "Bayi Stok Tahminleme Altyapısı",
            description: "Bayinin geçmiş satış trendlerini ölçerek, raflarındaki ürünler tükenmeden önce saha temsilcisini yeni sipariş fırsatı için uyarır."
        }
    ],
    
    howItWorks: [
      {
          icon: "fas fa-map-marked-alt",
          title: "1. Rotayı Belirle",
          description: "Sahadaki satış uzmanlarının müşteri ve bayi adreslerini sisteme girin, yapay zeka en optimal harita rotasını çıkarsın."
      },
      {
          icon: "fas fa-store",
          title: "2. Akıllı Sipariş Uygulaması",
          description: "Ziyaret esnasında müşterinin veya bayinin sipariş geçmişini inceleyen temsilcinize AI üzerinden en doğru upsell ürünleri otomatik sunulsun."
      },
      {
          icon: "fas fa-truck-loading",
          title: "3. Depo & Lojistik Senkronu",
          description: "Satışın işlemi kapattığı an merkeze sipariş geçilir ve depodan teslimata kadar geçen tüm süreç otonom şekilde işlemeye başlar."
      }
    ],
    integrations: {
        title: "ERP & Harita Ekosistemi",
        description: "Lojistik süreçleri, harita rotalamaları ve büyük ERP sistemleriyle bütünleşik.",
        logos: [
            { name: "Google Maps", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Google_Maps_icon.svg/512px-Google_Maps_icon.svg.png" },
            { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" },
            { name: "SAP", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/512px-SAP_2011_logo.svg.png" }
        ]
    },
    ourGoal: {
        title: "Amacımız: Saha Satışını Maksimum Verime Ulaştırmak",
        description: "Yakıt masraflarından tasarruf etmek, gereksiz ziyaretleri kaldırarak satış personelinin enerjisini sıcak satış yapabileceği, gerçek potansiyel müşterilere odaklamak."
    },
    setupFee: {
        original: 1800,
        discounted: 1100
    },
    pricingPlans: [
        {
            name: "Saha Başlangıç",
            prices: { monthly: 149, sixMonths: 129, annually: 119 },
            originalPrices: { monthly: 220, sixMonths: 190, annually: 170 },
            features: [
                "5 Saha Personeli Takibi",
                "Temel Rota Planlama Modülü",
                "Mobil Sipariş Giriş Uygulaması",
                "Standart Stok Entegrasyonu"
            ]
        },
        {
            name: "Saha & Bayi Pro",
            prices: { monthly: 349, sixMonths: 299, annually: 269 },
            originalPrices: { monthly: 500, sixMonths: 440, annually: 390 },
            features: [
                "Sınırsız Saha Personeli",
                "AI Saha Rota Optimizasyonu",
                "B2B Bayi Sipariş Portalı",
                "Gelişmiş Stok & Muhasebe Entegrasyonu"
            ],
            popular: true
        }
    ]
  }
];

// FIX: Moved the 'APPLICATIONS' constant before 'NAV_LINKS' to resolve the "used before its declaration" error.
export const APPLICATIONS: Application[] = [
    {
        name: 'Otel Yönetimi (CRM)',
        slug: 'otel-yonetimi-crm',
        sector: 'Turizm',
        description: 'Tüm otel operasyonlarınızı tek bir yerden yönetin. Rezervasyonlar, oda durumu, misafir ilişkileri ve daha fazlası.',
        imageUrl: 'https://mortanas.com/resim/otel.png',
        title: 'Akıllı Otel Yönetim Platformu',
        longDescription: 'Otelinizin tüm operasyonel süreçlerini dijitalleştiren, verimliliği artıran ve misafir memnuniyetini en üst düzeye çıkaran hepsi bir arada yönetim çözümüdür. Rezervasyonlardan faturalandırmaya, oda takibinden personel yönetimine kadar her şeyi tek bir panelden kontrol edin.',
        problem: "Yüksek OTA komisyonları kârlılığı düşürüyor, operasyonel karmaşıklık zaman kaybettiriyor ve misafirlere standart bir deneyim sunmak sadakat oluşturmuyor.",
        solution: "Otel Yönetimi (CRM) platformumuz, komisyonları ortadan kaldıran doğrudan rezervasyon motoru, operasyonları otomatikleştiren merkezi bir panel ve yapay zeka destekli kişiselleştirme araçları ile bu sorunları kökünden çözer.",
        goal: "Amacımız, otelinizin operasyonel verimliliğini artırırken, doğrudan rezervasyonları maksimize etmek ve her misafiriniz için unutulmaz, kişiselleştirilmiş bir konaklama deneyimi sunarak marka sadakati yaratmaktır.",
        whyChooseUs: [
            { icon: 'fa-solid fa-hotel', title: 'Sektörel Uzmanlık', description: 'Platformumuz, sadece otelcilik sektörünün dinamikleri ve ihtiyaçları göz önünde bulundurularak tasarlanmıştır.' },
            { icon: 'fa-solid fa-sitemap', title: 'Hepsi Bir Arada Çözüm', description: 'Rezervasyondan faturalandırmaya, misafir ilişkilerinden operasyon yönetimine kadar her şeyi tek bir yerden kontrol edin.' },
            { icon: 'fa-solid fa-brain', title: 'Yapay Zeka Gücü', description: 'Misafir verilerini analiz eden yapay zeka ile kişiselleştirilmiş teklifler sunun ve gelirlerinizi artırın.' },
            { icon: 'fa-solid fa-headset', title: '7/24 Yerel Destek', description: 'İhtiyaç duyduğunuz her an size yardımcı olmaya hazır, Türkiye\'deki uzman ekibimizle güvendesiniz.' }
        ],
        features: [
            { icon: 'fa-solid fa-calendar-check', title: 'Rezervasyon Yönetimi', description: 'Tüm kanallardan gelen rezervasyonları anlık olarak görüntüleyin ve yönetin.', imageUrl: 'https://i.imgur.com/A6fXzKk.png' },
            { icon: 'fa-solid fa-bed', title: 'Oda Yönetimi ve Durumu', description: 'Dolu, boş, temizlikte veya bakımda olan odaları anlık olarak takip edin.', imageUrl: 'https://i.imgur.com/M8aG7vQ.png' },
            { icon: 'fa-solid fa-users', title: 'Misafir İlişkileri (CRM)', description: 'Misafirlerinizin tercihlerini kaydedin ve kişiselleştirilmiş deneyimler sunun.', imageUrl: 'https://i.imgur.com/gKj3eXo.png' },
            { icon: 'fa-solid fa-tasks', title: 'Kat Hizmetleri Görevleri', description: 'Temizlik ve bakım görevlerini personele atayın ve takibini yapın.', imageUrl: 'https://i.imgur.com/tYp4aLp.png' },
            { icon: 'fa-solid fa-chart-pie', title: 'Finansal Raporlama', description: 'Gelir, doluluk oranı ve hasılat gibi önemli metrikleri anlık olarak izleyin.', imageUrl: 'https://i.imgur.com/zWbV9qP.png' },
            { icon: 'fa-solid fa-boxes-stacked', title: 'Envanter ve Stok Yönetimi', description: 'Otelinizdeki tüm envanteri ve stokları (minibar, temizlik malzemeleri vb.) yönetin.', imageUrl: 'https://i.imgur.com/uR4fD9s.png' },
            { icon: 'fa-solid fa-star-half-alt', title: 'Online İtibar ve Yorum Yönetimi', description: 'Booking, Google, TripAdvisor gibi platformlardaki yorumları tek panelden takip edin, yapay zeka ile anında yanıtlar oluşturun.' },
            { icon: 'fa-solid fa-globe', title: 'Komisyonsuz Rezervasyon Motoru', description: 'Kendi web sitenize entegre çalışan rezervasyon motoru ile OTA\'lara ödediğiniz komisyonlardan kurtulun, kârlılığınızı artırın.' },
            { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Gelişmiş Analitik ve İş Zekası', description: 'Misafir demografisi, rezervasyon trendleri ve gelir akışları hakkında derinlemesine analizler elde edin. Veriye dayalı stratejik kararlar alarak otelinizin performansını zirveye taşıyın.'}
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka Otel Asistanınız",
            subtitle: "Tüm otel operasyonlarınızı, kendi verilerinizle eğitilmiş akıllı bir asistanla yönetin. Yapay zeka, gelirlerinizi artırmak ve misafir deneyimini mükemmelleirmek için 7/24 çalışır.",
            features: [
                { icon: 'fa-solid fa-user-astronaut', title: 'Kişiselleştirilmiş Misafir Deneyimi', description: 'Yapay zeka, misafir verilerini analiz ederek kişiselleştirilmiş ek satış (spa paketleri, oda yükseltmeleri vb.) fırsatları sunar.' },
                { icon: 'fa-solid fa-dollar-sign', title: 'Dinamik Fiyatlandırma Stratejileri', description: 'Piyasa trendlerini, rakip fiyatlarını ve yerel etkinlikleri izleyerek en uygun oda fiyatlarını gerçek zamanlı olarak önerir.' },
                { icon: 'fa-solid fa-chart-line', title: 'Tahmine Dayalı Doluluk Yönetimi', description: 'Gelecekteki rezervasyon eğilimlerini tahmin ederek proaktif pazarlama kampanyaları ve personel planlaması yapmanızı sağlar.' },
                { icon: 'fa-solid fa-cogs', title: 'Akıllı Operasyon Yönetimi', description: 'Çıkış saatlerine ve oda durumuna göre kat hizmetleri için görev atamalarını otomatikleştirerek verimliliği optimize eder.' }
            ]
        },
        benefits: [
            { icon: 'fa-solid fa-chart-line', title: 'Verimliliği Artırın', description: 'Manuel işlemleri otomatikleştirerek zamandan tasarruf edin ve operasyonel verimliliği maksimize edin.' },
            { icon: 'fa-solid fa-lira-sign', title: 'Gelirleri Yükseltin', description: 'Dinamik fiyatlandırma ve kanal yönetimi ile doluluk oranınızı ve gelirinizi artırın.' },
            { icon: 'fa-solid fa-smile', title: 'Misafir Memnuniyetini Mükemmelleştirin', description: 'Kişiselleştirilmiş hizmetler ve hızlı yanıt süreleri ile unutulmaz bir konaklama deneyimi sunun.' },
            { icon: 'fa-solid fa-lightbulb', title: 'Veriye Dayalı Kararlar Alın', description: 'Gelişmiş raporlama ve analitik araçları sayesinde işletmeniz için en doğru stratejik kararları verin.' }
        ],
        targetAudience: [
            { icon: 'fas fa-hotel', name: 'Butik Oteller' },
            { icon: 'fas fa-building', name: 'Şehir Otelleri' },
            { icon: 'fas fa-umbrella-beach', name: 'Tatil Köyleri' },
            { icon: 'fas fa-key', name: 'Apart Oteller' },
            { icon: 'fas fa-home', name: 'Pansiyonlar' }
        ],
        testimonials: [
            { quote: 'Mortanas Otel CRM\'i sayesinde rezervasyon sürecimiz %40 hızlandı ve manuel hatalar neredeyse sıfıra indi. Misafir memnuniyetimizdeki artış gözle görülür düzeyde.', name: 'Ahmet Yılmaz', title: 'Otel Müdürü, Ege Palace', avatarUrl: 'https://randomuser.me/api/portraits/men/44.jpg' },
            { quote: 'Online yorum yönetimi ve komisyonsuz rezervasyon motoru özellikleri bizim için oyun değiştirici oldu. OTA maliyetlerimiz %25 azaldı!', name: 'Elif Kaya', title: 'İşletme Sahibi, Boutique Hotel İstanbul', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' }
        ],
        faqs: [
            { question: 'Mevcut rezervasyon sistemimle entegre olabilir mi?', answer: 'Evet, platformumuz birçok popüler kanal yöneticisi ve rezervasyon sistemi ile sorunsuz bir şekilde entegre olabilmektedir. Mevcut sisteminizi inceleyip size özel bir entegrasyon planı sunabiliriz.' },
            { question: 'Veri güvenliği nasıl sağlanıyor?', answer: 'Tüm verileriniz, en yüksek güvenlik standartlarına sahip bulut sunucularında şifrelenerek saklanır. Veri güvenliği ve gizliliği en önemli önceliğimizdir.' },
            { question: 'Kurulum ve eğitim süreci ne kadar sürüyor?', answer: 'Otelinizin büyüklüğüne ve mevcut sistemlerinize bağlı olarak kurulum genellikle 3-5 iş günü içinde tamamlanır. Sonrasında ekibimize özel online eğitimler düzenleyerek platformu en verimli şekilde kullanmanızı sağlıyoruz.' },
            { question: 'Fiyatlandırma nasıl çalışıyor? Kullanıcı başına mı yoksa oda başına mı?', answer: 'Fiyatlandırma modelimiz, otelinizin oda sayısına ve ihtiyaç duyduğunuz modüllere göre esneklik gösterir. Kullanıcı sayısı sınırlaması yoktur. Size en uygun teklifi almak için bizimle iletişime geçebilirsiniz.' },
            { question: 'Personelime platformu kullanmaları için eğitim veriyor musunuz?', answer: 'Evet. Kurulum sürecinin bir parçası olarak tüm ekibinize (resepsiyon, kat hizmetleri, yönetim vb.) özel online eğitimler sunuyoruz. Ayrıca sürekli olarak video eğitim materyalleri ve destek sağlıyoruz.' },
            { question: 'Platform hangi dilleri destekliyor?', answer: 'Yönetim paneli şu anda Türkçe ve İngilizce dillerini desteklemektedir. Misafirlerinizin kullandığı rezervasyon motoru ise 10\'dan fazla dilde (İngilizce, Almanca, Rusça vb.) hizmet verebilmektedir.' },
            { question: 'Kanal yöneticisi (channel manager) ile entegrasyon sağlıyor musunuz?', answer: 'Evet, platformumuz HotelRunner, ChannelRUSH ve Siteminder gibi sektörün önde gelen kanal yöneticileriyle tam entegre çalışır. Bu sayede tüm online satış kanallarınızdaki (Booking, Expedia, Airbnb vb.) oda müsaitliğiniz ve fiyatlarınız anlık olarak senkronize olur.' },
            { question: 'Birden fazla oteli tek bir hesaptan yönetebilir miyim?', answer: 'Evet, platformumuz çoklu tesis (multi-property) yönetimini desteklemektedir. Zincir veya grup otelleri, tüm mülklerinin rezervasyonlarını, doluluk oranlarını ve finansal raporlarını tek bir merkezi panelden kolayca yönetebilir.' },
            { question: 'Yapay zeka destekli dinamik fiyatlandırma nasıl çalışıyor?', answer: 'Yapay zeka motorumuz; otelinizin geçmiş doluluk verilerini, bölgedeki etkinlik takvimini, rakip otellerin fiyatlarını ve piyasa talebini sürekli olarak analiz eder. Bu verilere dayanarak, kârlılığınızı maksimize edecek en uygun oda fiyatlarını size önerir veya isteğe bağlı olarak otomatik olarak günceller.' },
            { question: 'Otel personeli için bir mobil uygulama var mı?', answer: 'Evet, hem iOS hem de Android için geliştirdiğimiz mobil uygulama sayesinde kat hizmetleri personeliniz temizlik görevlerini anlık olarak takip edebilir, resepsiyon ekibiniz check-in/check-out işlemlerini tabletten yapabilir ve yöneticiler otel performansını cepten izleyebilir.' }
        ],
        references: [
            { name: "Booking.com", logoUrl: "https://i.imgur.com/logo-booking.png" },
            { name: "Airbnb", logoUrl: "https://i.imgur.com/logo-airbnb.png" },
            { name: "Expedia", logoUrl: "https://i.imgur.com/logo-expedia.png" },
            { name: "TripAdvisor", logoUrl: "https://i.imgur.com/logo-tripadvisor.png" },
            { name: "Google Hotel Ads", logoUrl: "https://i.imgur.com/logo-google.png" },
        ],
        pricing: { monthly: 450, annually: 4500, lifetime: 12000 }
    },
    {
        name: 'Masaj & Wellness Yönetimi',
        slug: 'masaj-wellness-yonetimi',
        sector: 'Sağlık & Güzellik',
        description: 'Randevu takibi, müşteri yönetimi, personel planlaması ve pazarlama otomasyonları ile spa ve wellness merkezinizi dijitalleştirin.',
        imageUrl: 'https://mortanas.com/resim/spa.png',
        title: 'Akıllı Spa & Wellness Yönetim Platformu',
        longDescription: 'Spa, masaj salonu veya wellness merkezinizin tüm operasyonel yükünü hafifleten, müşteri deneyimini zenginleştiren ve randevu doluluğunuzu artıran hepsi bir arada bir çözümdür. Randevu takibinden, personel prim hesaplamalarına, müşteri sadakat programlarından pazarlama otomasyonlarına kadar her şeyi tek bir yerden yönetin.',
        problem: "Sürekli çalan telefonlar, manuel randevu takibi, yüksek 'no-show' oranları ve müşteri sadakatini sağlayamamak, merkezinizin büyümesini engelliyor.",
        solution: "Platformumuz, 7/24 online randevu, otomatik SMS hatırlatmaları, personel yönetimi ve sadakat programları ile operasyonel yükünüzü hafifletir ve müşteri bağlılığını artırır.",
        goal: "Amacımız, spa ve wellness merkezinizin randevu doluluğunu en üst seviyeye çıkarmak, operasyonel verimliliği sağlamak ve her müşteriyi sadık bir müdavime dönüştürmektir.",
        whyChooseUs: [
            { icon: 'fa-solid fa-spa', title: 'Wellness Odaklı Tasarım', description: 'Randevu tabanlı çalışan spa ve güzellik merkezlerinin tüm ihtiyaçlarına yönelik özel modüller sunar.' },
            { icon: 'fa-solid fa-sms', title: 'Otomatik İletişim', description: 'Randevu hatırlatmaları ve pazarlama mesajları ile hem \'no-show\'ları azaltır hem de tekrar ziyaretleri artırırsınız.' },
            { icon: 'fa-solid fa-chart-pie', title: 'Performans Analizi', description: 'En popüler hizmetlerinizden en verimli personelinize kadar tüm kritik verileri anlık olarak takip edin.' },
            { icon: 'fa-solid fa-mobile-alt', title: 'Kolay Kullanım', description: 'Karmaşık menüler olmadan, personelinizin hızla adapte olabileceği kullanıcı dostu bir arayüze sahiptir.' }
        ],
        features: [
            { icon: 'fa-solid fa-calendar-alt', title: 'Online Randevu ve Takvim', description: 'Müşterilerinizin web sitenizden 7/24 online randevu almasını sağlayın. Terapistlerin ve odaların takvimlerini anlık olarak yönetin.' },
            { icon: 'fa-solid fa-users-cog', title: 'Müşteri Yönetimi (CRM)', description: 'Müşterilerinizin geçmiş randevularını, tercihlerini ve notlarını tek bir yerde tutun. Kişiselleştirilmiş hizmetler sunarak sadakatlerini artırın.' },
            { icon: 'fa-solid fa-user-tie', title: 'Personel Yönetimi ve Prim', description: 'Personelinizin çalışma programlarını, izinlerini ve gerçekleştirdikleri seanslara göre primlerini otomatik olarak hesaplayın.' },
            { icon: 'fa-solid fa-sms', title: 'Otomatik SMS & E-posta Hatırlatmaları', description: 'Randevu hatırlatmaları, özel gün kutlamaları veya kampanya duyurularını otomatik olarak göndererek "no-show" oranını düşürün ve satışları artırın.' },
            { icon: 'fa-solid fa-gift', title: 'Paket Satışı ve Hediye Kartları', description: 'Çoklu seans paketleri veya hediye kartları oluşturup satın. Müşteri sadakatini ve nakit akışınızı güçlendirin.' },
            { icon: 'fa-solid fa-chart-bar', title: 'Gelir ve Performans Raporları', description: 'En popüler hizmetleriniz, en çok kazandıran terapistleriniz ve genel gelir durumunuz hakkında detaylı raporlar alın.' },
            { icon: 'fa-solid fa-hand-holding-heart', title: 'Müşteri Sadakat Programları', description: 'Puan veya indirim sistemleri oluşturarak müşterilerinizin tekrar gelmesini teşvik edin.' },
            { icon: 'fa-solid fa-credit-card', title: 'Online Ödeme Entegrasyonu', description: 'Randevu sırasında online olarak ön ödeme veya tam ödeme alarak nakit akışınızı güvence altına alın.' },
            { icon: 'fa-solid fa-user-chart', title: 'Personel Performans Raporları', description: 'Terapistlerinizin doluluk oranlarını ve en çok hangi hizmetlerde başarılı olduklarını analiz edin.' }
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka Spa Asistanınız",
            subtitle: "Tüm spa operasyonlarınızı, kendi verilerinizle eğitilmiş akıllı bir asistanla yönetin. Yapay zeka, randevu doluluğunuzu artırmak ve müşteri deneyimini mükemmelleştirmek için 7/24 çalışır.",
            features: [
                { icon: 'fa-solid fa-user-nurse', title: 'Kişiselleştirilmiş Terapi Önerileri', description: 'Yapay zeka, müşterinizin geçmiş randevularını ve tercihlerini analiz ederek en uygun terapi veya bakım paketini önerir.' },
                { icon: 'fa-solid fa-calendar-day', title: 'Akıllı Randevu Optimizasyonu', description: 'Yoğun saatleri tahmin eder, boşlukları doldurmak için özel indirimler sunar ve personel takvimlerini en verimli şekilde düzenler.' },
                { icon: 'fa-solid fa-repeat', title: 'Tahmine Dayalı Müşteri Takibi', description: 'Bir müşterinin ne zaman tekrar randevu alması gerektiğini tahmin ederek proaktif, kişiselleştirilmiş hatırlatmalar gönderir.' },
                { icon: 'fa-solid fa-arrow-up-right-dots', title: 'Otomatik Ek Satış (Upsell)', description: 'Randevu sırasında müşteriye, seçtiği hizmeti tamamlayıcı ek hizmetler (aromaterapi, özel yağlar vb.) sunarak sepet ortalamasını artırır.' }
            ]
        },
        benefits: [
            { icon: 'fa-solid fa-calendar-days', title: 'Randevu Doluluğunu Artırın', description: '7/24 online randevu sistemi ile boş saatlerinizi doldurun ve gelir potansiyelinizi maksimize edin.' },
            { icon: 'fa-solid fa-clock-rotate-left', title: 'Operasyonel Yükü Azaltın', description: 'Telefon trafiğini ve manuel planlamayı azaltarak personelinizin misafir memnuniyetine odaklanmasını sağlayın.' },
            { icon: 'fa-solid fa-hand-holding-heart', title: 'Müşteri Sadakatini Güçlendirin', description: 'Kişiselleştirilmiş hizmetler, paketler ve sadakat programları ile müşterilerinizin tekrar gelmesini sağlayın.' },
            { icon: 'fa-solid fa-user-slash', title: '"No-Show" Oranını Düşürün', description: 'Otomatik SMS ve e-posta hatırlatmaları ile randevuya gelmeme oranını %70\'e varan oranda azaltın.' }
        ],
        targetAudience: [
            { icon: 'fas fa-spa', name: 'Spa Merkezleri' },
            { icon: 'fas fa-hand-sparkles', name: 'Masaj Salonları' },
            { icon: 'fas fa-cut', name: 'Güzellik Merkezleri' },
            { icon: 'fas fa-om', name: 'Wellness & Retreat Merkezleri' },
            { icon: 'fas fa-clinic-medical', name: 'Fizyoterapi Klinikleri' }
        ],
        testimonials: [
            { quote: 'Online randevu sistemi sayesinde telefon trafiğimiz yarı yarıya azaldı. Müşterilerimiz de 7/24 randevu alabilmekten çok memnun. Mortanas\'a teşekkürler!', name: 'Seda Kurtuluş', title: 'İşletme Sahibi, Serenity Spa', avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg' },
            { quote: 'Personel ve prim yönetimi modülü işimizi inanılmaz kolaylaştırdı. Otomatik hatırlatmalar sayesinde randevuya gelmeme oranımız neredeyse sıfırlandı.', name: 'Barış Arslan', title: 'Yönetici, Zen Wellness', avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg' }
        ],
        faqs: [
            { question: 'Mevcut müşteri listemi sisteme aktarabilir miyim?', answer: 'Evet, mevcut müşteri verilerinizi Excel formatında bize ilettiğinizde, tüm bilgileri sizin için sisteme toplu olarak aktarıyoruz.' },
            { question: 'Online ödeme altyapısı var mı?', answer: 'Evet, platformumuz popüler ve güvenli ödeme altyapıları ile entegre çalışır. Müşterilerinizden randevu sırasında ön ödeme veya tam ödeme alabilirsiniz.' },
            { question: 'Personelime eğitim veriyor musunuz?', answer: 'Elbette. Kurulum tamamlandıktan sonra tüm ekibinize platformun nasıl kullanılacağına dair detaylı bir online eğitim veriyoruz ve her zaman destek sağlıyoruz.' },
            { question: 'Birden fazla şubem var, hepsini tek bir hesaptan yönetebilir miyim?', answer: 'Evet, platformumuz çoklu şube yönetimini desteklemektedir. Tüm şubelerinizin takvimlerini, personelini ve gelirlerini tek bir panelden merkezi olarak yönetebilirsiniz.' },
            { question: 'Müşterilerim online randevu alırken kapora bırakabilir mi?', answer: 'Evet, online ödeme entegrasyonumuz sayesinde randevu sırasında sabit bir tutar veya hizmet bedelinin belirli bir yüzdesi kadar kapora (ön ödeme) alarak "no-show" riskini azaltabilirsiniz.' },
            { question: 'Sistem, hediye kartı ve sadakat programlarını destekliyor mu?', answer: 'Kesinlikle. Müşterilerinize özel hediye kartları oluşturabilir, çoklu seans paketleri satabilir ve puan bazlı sadakat programları ile müşteri bağlılığını artırabilirsiniz.' }
        ],
        references: [
            { name: "Treatwell", logoUrl: "https://i.imgur.com/logo-treatwell.png" },
            { name: "Google", logoUrl: "https://i.imgur.com/logo-google.png" },
            { name: "Stripe", logoUrl: "https://i.imgur.com/logo-stripe.png" },
            { name: "Instagram", logoUrl: "https://i.imgur.com/logo-instagram.png" },
            { name: "WhatsApp", logoUrl: "https://i.imgur.com/logo-whatsapp.png" },
        ],
        pricing: { monthly: 250, annually: 2500, lifetime: 7000 }
    },
    {
        name: 'Spor & Fitness Yazılımı',
        slug: 'spor-fitness-yazilimi',
        sector: 'Sağlık & Güzellik',
        description: 'Üye takibi, ders planlaması, ödeme yönetimi ve pazarlama otomasyonları ile spor merkezinizi bir sonraki seviyeye taşıyın.',
        imageUrl: 'https://www.mortanas.com/resim/spor.png',
        title: 'Akıllı Spor & Fitness Merkezi Yönetim Platformu',
        longDescription: 'Spor salonunuz, fitness stüdyonuz veya kişisel antrenman merkeziniz için geliştirilmiş hepsi bir arada yönetim çözümüdür. Üye kayıtlarından ders programlamaya, online ödemelerden performans takibine kadar tüm operasyonlarınızı tek bir platformdan kolayca yönetin.',
        problem: "Manuel üye takibi, karmaşık ders programları, tahsilat sorunları ve düşük üye motivasyonu gibi operasyonel zorluklar, merkezinizin büyümesini yavaşlatır ve kârlılığını düşürür.",
        solution: "Platformumuz, 7/24 online ders rezervasyonu, otomatik üyelik yenileme hatırlatmaları, entegre ödeme sistemleri ve kişiselleştirilmiş antrenman programları ile hem yönetimsel yükünüzü azaltır hem de üye bağlılığını artırır.",
        goal: "Amacımız, spor merkezinizin operasyonel verimliliğini maksimize etmek, üye memnuniyetini ve sadakatini en üst düzeye çıkarmak ve sürdürülebilir bir gelir modeli oluşturmanıza yardımcı olmaktır.",
        whyChooseUs: [
            { icon: 'fa-solid fa-dumbbell', title: 'Fitness Odaklı Altyapı', description: 'Platform, spor salonları ve stüdyoların dinamiklerine özel olarak geliştirilmiş modüller içerir.' },
            { icon: 'fa-solid fa-mobile-screen-button', title: 'Üye Mobil Uygulaması', description: 'Üyelerinizin dersleri takip edebileceği, rezervasyon yapabileceği ve kendi gelişimlerini görebileceği markanıza özel bir mobil uygulama sunar.' },
            { icon: 'fa-solid fa-chart-line', title: 'Performans Odaklı Raporlama', description: 'En popüler dersler, en çok tercih edilen antrenörler ve üye devamlılığı gibi kritik verileri analiz ederek doğru kararlar alın.' },
            { icon: 'fa-solid fa-bolt', title: 'Hızlı ve Kolay Kurulum', description: 'Karmaşık süreçler olmadan, birkaç gün içinde tüm sisteminizi dijitalleştirip kullanıma hazır hale getiriyoruz.' }
        ],
        features: [
            { icon: 'fa-solid fa-calendar-plus', title: 'Online Ders ve Seans Rezervasyonu', description: 'Üyeleriniz, web siteniz veya mobil uygulamanız üzerinden grup derslerine veya kişisel antrenmanlara 7/24 rezervasyon yapabilir.' },
            { icon: 'fa-solid fa-address-card', title: 'Üye Yönetimi (CRM)', description: 'Tüm üyelerinizin bilgilerini, üyelik durumlarını, katılım geçmişlerini ve notlarını tek bir yerden takip edin.' },
            { icon: 'fa-solid fa-users', title: 'Antrenör Yönetimi ve Programlama', description: 'Antrenörlerinizin çalışma takvimlerini, derslerini ve sorumlu oldukları üyeleri kolayca yönetin. Prim ve performanslarını takip edin.' },
            { icon: 'fa-solid fa-door-open', title: 'Turnike ve Giriş Kontrol Entegrasyonu', description: 'Üyelik durumu aktif olmayanların girişini engelleyen, salonunuza özel turnike sistemleri ile tam entegrasyon sağlayın.' },
            { icon: 'fa-solid fa-credit-card', title: 'Üyelik Paketi ve Online Ödeme', description: 'Farklı üyelik tipleri (aylık, 3 aylık, yıllık) oluşturun ve online olarak güvenli bir şekilde tahsilat yapın. Otomatik yenileme hatırlatmaları gönderin.' },
            { icon: 'fa-solid fa-clipboard-list', title: 'Kişisel Antrenman Programı', description: 'Antrenörlerin, üyelere özel dijital antrenman ve egzerisiz programları oluşturup atamasına olanak tanıyın.' },
            { icon: 'fa-solid fa-chart-pie', title: 'Doluluk ve Gelir Raporları', description: 'Hangi derslerin daha popüler olduğunu, hangi saatlerin yoğun geçtiğini ve finansal durumunuzu detaylı raporlarla analiz edin.' },
            { icon: 'fa-solid fa-mobile-alt', title: 'Markanıza Özel Mobil Uygulama', description: 'Üyelerinizin ders programlarını, kendi ilerlemelerini ve duyuruları takip edebileceği, size özel tasarlanmış bir mobil uygulama.' },
            { icon: 'fa-solid fa-apple-whole', title: 'Beslenme Takibi Modülü', description: 'Üyelerinize özel beslenme programları oluşturun ve ilerlemelerini takip ederek onlara bütünsel bir wellness deneyimi sunun.' }
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka Fitness Koçunuz",
            subtitle: "Tüm spor merkezi operasyonlarınızı, üyelerinizin verileriyle eğitilmiş akıllı bir asistanla yönetin. Yapay zeka, üye sadakatini artırmak ve gelirinizi optimize etmek için 7/24 çalışır.",
            features: [
                { icon: 'fa-solid fa-robot', title: 'Kişiselleştirilmiş Antrenman Programları', description: 'Yapay zeka, üyelerin hedeflerini, ilerlemelerini ve vücut tiplerini analiz ederek onlara özel antrenman programları oluşturur.' },
                { icon: 'fa-solid fa-users-line', title: 'Dinamik Ders Yönetimi', description: 'Ders doluluk oranlarını tahmin ederek en popüler saatleri belirler ve yeni dersler için en uygun zamanları önerir.' },
                { icon: 'fa-solid fa-user-xmark', title: 'Üye Kayıp Riski (Churn) Analizi', description: 'Salona gelme sıklığı azalan üyeleri proaktif olarak tespit eder ve onları geri kazanmak için özel teklifler ve motivasyon mesajları gönderir.' },
                { icon: 'fa-solid fa-chart-simple', title: 'Akıllı Performans Takibi', description: 'Üyelerin antrenman verilerini analiz ederek gelişimlerini raporlar, hedeflerine ulaşmaları için motive edici bildirimler gönderir.' }
            ]
        },
        benefits: [
          { icon: 'fa-solid fa-arrows-spin', title: 'Operasyonel Verimlilik', description: 'Rezervasyon ve ödeme gibi manuel işlemleri otomatikleştirerek yönetimsel yükünüzü azaltın.' },
          { icon: 'fa-solid fa-user-plus', title: 'Artan Üye Sadakati', description: 'Kişiselleştirilmiş programlar ve kolay erişim ile üyelerinizin motivasyonunu ve merkezinize olan bağlılığını artırın.' },
          { icon: 'fa-solid fa-sack-dollar', title: 'Nakit Akışını Güçlendirin', description: 'Online ödeme ve otomatik yenileme özellikleri ile tahsilat süreçlerinizi hızlandırın ve güvence altına alın.' },
          { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Veriye Dayalı Büyüme', description: 'Hangi hizmetlerin popüler olduğunu anlayarak ve kaynaklarınızı doğru yönlendirerek stratejik büyüme sağlayın.' }
        ],
        targetAudience: [
            { icon: 'fas fa-dumbbell', name: 'Fitness Salonları' },
            { icon: 'fas fa-running', name: 'CrossFit Stüdyoları' },
            { icon: 'fas fa-child-reaching', name: 'Yoga ve Pilates Stüdyoları' },
            { icon: 'fas fa-user-ninja', name: 'Kişisel Antrenörler (PT)' },
            { icon: 'fas fa-users', name: 'Butik Spor Stüdyoları' }
        ],
        testimonials: [
            { quote: 'Mortanas Fitness Yazılımı sayesinde ders programlarımızı yönetmek ve üye takibi yapmak inanılmaz kolaylaştı. Mobil uygulama üyelerimiz tarafından çok sevildi!', name: 'Caner Öztürk', title: 'Kurucu, PowerFit Gym', avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg' },
            { quote: 'Online ödeme ve otomatik hatırlatmalar sayesinde tahsilat sorunlarımız tamamen ortadan kalktı. İşletmemizin finansal sağlığı için harika bir yatırım oldu.', name: 'Selin Aksoy', title: 'Stüdyo Yöneticisi, Zen Pilates', avatarUrl: 'https://randomuser.me/api/portraits/women/52.jpg' }
        ],
        faqs: [
            { question: 'Mevcut üye listemi sisteme aktarabilir miyim?', answer: 'Evet, mevcut üye listenizi Excel formatında bize iletmeniz durumunda tüm verilerinizi sizin için sisteme toplu olarak aktarıyoruz.' },
            { question: 'Üyeler mobil uygulamayı ücretsiz mi kullanacak?', answer: 'Evet, markanıza özel hazırlanan mobil uygulama, tüm aktif üyeleriniz tarafından App Store ve Google Play üzerinden ücretsiz olarak indirilebilir.' },
            { question: 'Turnike sistemi entegrasyonu için ek ücret gerekiyor mu?', answer: 'Yazılımımız, birçok popüler turnike ve kart okuyucu sistemiyle uyumludur. Entegrasyon, standart kurulum paketimize dahildir. Donanım maliyetleri size aittir.' },
            { question: 'Üyeler kendi antrenman ve beslenme programlarını uygulama üzerinden takip edebilir mi?', answer: 'Evet, antrenörler tarafından atanan kişisel antrenman ve beslenme programları üyeler tarafından mobil uygulama üzerinden görüntülenebilir ve ilerlemeleri takip edilebilir.' },
            { question: 'Sistem, turnike ve geçiş kontrol sistemleriyle entegre çalışıyor mu?', answer: 'Evet, platformumuz birçok popüler turnike ve kart okuyucu markasıyla tam entegrasyon sunar. Üyelik durumu geçerli olmayanların tesise girişi otomatik olarak engellenir.' },
            { question: 'Farklı üyelik tipleri (aylık, yıllık, ders paketleri) oluşturabilir miyim?', answer: 'Kesinlikle. Sınırsız sayıda esnek üyelik paketi (örn: "10 Derslik Pilates Paketi", "Sınırsız Aylık Üyelik") oluşturabilir ve bunları online olarak satabilirsiniz.' }
        ],
        references: [
            { name: "Technogym", logoUrl: "https://i.imgur.com/logo-technogym.png" },
            { name: "ClassPass", logoUrl: "https://i.imgur.com/logo-classpass.png" },
            { name: "Google Fit", logoUrl: "https://i.imgur.com/logo-google-fit.png" },
            { name: "Apple Health", logoUrl: "https://i.imgur.com/logo-apple-health.png" },
            { name: "Stripe", logoUrl: "https://i.imgur.com/logo-stripe.png" },
        ],
        pricing: { monthly: 220, annually: 2200, lifetime: 6500 }
    },
    {
        name: 'Emlak Yönetimi (CRM)',
        slug: 'emlak-yonetimi-crm',
        sector: 'Gayrimenkul',
        description: 'Portföy, müşteri ilişkileri (CRM), satış süreçleri ve pazarlama otomasyonları ile emlak işinizi dijitalleştirin.',
        imageUrl: 'https://www.mortanas.com/resim/moremlak.png',
        title: 'Akıllı Emlak Yönetim Platformu (CRM)',
        longDescription: 'Emlak danışmanları ve ofisleri için geliştirilmiş hepsi bir arada yönetim platformudur. Portallardan, web sitenizden ve sosyal medyadan gelen tüm potansiyel müşterileri tek bir yerde toplayın, satış süreçlerinizi otomatikleştirin ve portföyünüzü en verimli şekilde yönetin.',
        problem: "Farklı kanallardan gelen dağınık müşteri adayları (lead), manuel takip süreçleri, randevu karmaşası ve etkisiz pazarlama, hem zaman hem de gelir kaybına neden oluyor.",
        solution: "Platformumuz, tüm potansiyel müşteri kanallarını merkezileştirir, yapay zeka ile müşteri adaylarını puanlar, randevuları otomatikleştirir ve kişiselleştirilmiş pazarlama kampanyaları ile satış dönüşüm oranlarınızı artırır.",
        goal: "Amacımız, emlak danışmanlarının tekrarlayan idari işlerden kurtulup asıl odaklanmaları gereken şeye, yani mülk satmaya ve müşteri ilişkileri kurmaya daha fazla zaman ayırmalarını sağlamak ve bu sayede işletme kârlılığını maksimize etmektir.",
        whyChooseUs: [
            { icon: 'fa-solid fa-users-viewfinder', title: 'Merkezi Müşteri Yönetimi', description: 'Tüm portallardan ve kanallardan gelen potansiyel müşterileri tek bir akıllı panelde toplayın, hiçbir fırsatı kaçırmayın.' },
            { icon: 'fa-solid fa-robot', title: 'Yapay Zeka Destekli Satış', description: 'AI, potansiyel müşterileri puanlar, en uygun mülkleri eşleştirir ve danışmanlarınıza öncelikli hedefler sunar.' },
            { icon: 'fa-solid fa-calendar-check', title: 'Otomatik Randevu ve Takip', description: 'Müşteri takipleri ve mülk gösterme randevularını otomatikleştirerek danışmanlarınızın verimliliğini artırın.' },
            { icon: 'fa-solid fa-chart-pie', title: 'Performans Analitiği', description: 'Hangi kanaldan ne kadar müşteri geldiğini, en başarılı danışmanınızı ve en kârlı mülklerinizi anlık raporlarla takip edin.' }
        ],
        features: [
            // Satış & Pazarlama
            { icon: 'fa-solid fa-funnel-dollar', title: 'Potansiyel Müşteri (Lead) Yönetimi', description: 'Tüm kanallardan gelen müşteri adaylarını otomatik olarak toplayın ve satış hunisinin her aşamasında takip edin.', category: 'Müşteri & Lead Yönetimi' },
            { icon: 'fa-solid fa-address-book', title: 'Gelişmiş Müşteri Veritabanı', description: 'Müşterilerinizin aradığı kriterleri, bütçelerini ve geçmiş iletişimlerini tek bir yerde saklayın.', category: 'Müşteri & Lead Yönetimi' },
            { icon: 'fa-solid fa-star', title: 'Yapay Zeka Lead Puanlama', description: 'AI, hangi müşterinin satın almaya daha yakın olduğunu analiz ederek danışmanlarınıza önceliklendirme yapar.', category: 'Müşteri & Lead Yönetimi' },
            { icon: 'fa-solid fa-building', title: 'Detaylı Portföy Yönetimi', description: 'Tüm mülklerinizi fotoğrafları, belgeleri ve özellikleriyle birlikte sisteme kaydedin ve kolayca yönetin.', category: 'Portföy & İlan Yönetimi' },
            { icon: 'fa-solid fa-share-square', title: 'Otomatik Portal Entegrasyonu', description: 'Yeni eklediğiniz ilanları tek tıkla Sahibinden, Hepsiemlak gibi popüler portallarda otomatik olarak yayınlayın.', category: 'Portföy & İlan Yönetimi' },
            { icon: 'fa-solid fa-map-marked-alt', title: 'Akıllı Eşleştirme', description: 'Müşteri kriterlerine en uygun mülkleri portföyünüzden saniyeler içinde bulun ve müşterilerinize sunun.', category: 'Portföy & İlan Yönetimi' },
            { icon: 'fa-solid fa-tasks', title: 'Satış Süreci Otomasyonu', description: 'Teklif hazırlama, sözleşme takibi ve tapu işlemleri gibi adımları dijitalleştirerek süreci hızlandırın.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-envelope', title: 'Otomatik E-posta & SMS Pazarlama', description: 'Müşteri segmentlerinize özel yeni ilanları, fiyatı düşen mülkleri veya kampanyaları otomatik olarak duyurun.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-calendar-alt', title: 'Entegre Takvim ve Görev Yönetimi', description: 'Danışmanlarınızın randevularını, müşteri takiplerini ve görevlerini tek bir takvim üzerinden yönetin.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-chart-bar', title: 'Danışman Performans Raporları', description: 'Her danışmanın ne kadar satış yaptığını, ne kadar potansiyel müşteriyle görüştüğünü ve başarı oranlarını takip edin.', category: 'Raporlama & Analitik' },
            { icon: 'fa-solid fa-bullseye', title: 'Kaynak Analizi', description: 'Hangi portalın veya pazarlama kanalının size en çok müşteri getirdiğini analiz ederek pazarlama bütçenizi optimize edin.', category: 'Raporlama & Analitik' },
            { icon: 'fa-solid fa-file-invoice-dollar', title: 'Gelir ve Komisyon Takibi', description: 'Yapılan satışlardan elde edilen gelirleri ve danışmanların komisyonlarını otomatik olarak hesaplayın.', category: 'Raporlama & Analitik' },
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka Emlak Asistanınız",
            subtitle: "AI asistanınız, potansiyel müşterileri bulur, nitelendirir ve danışmanlarınız için en sıcak fırsatları hazırlar.",
            features: [
                { icon: 'fa-solid fa-user-check', title: 'Akıllı Müşteri Adayı Puanlama', description: 'AI, web sitesi davranışları ve iletişim geçmişine göre hangi müşteri adayının satın almaya en yakın olduğunu %90 doğrulukla tahmin eder.' },
                { icon: 'fa-solid fa-magnifying-glass-location', title: 'Piyasa ve Fiyat Analizi', description: 'Bölgedeki benzer mülklerin fiyatlarını, satış hızlarını ve pazar trendlerini analiz ederek portföyünüz için en doğru fiyatlandırmayı önerir.' },
                { icon: 'fa-solid fa-comments', title: 'Otomatik Müşteri Takibi', description: 'Uzun süredir iletişim kurulmayan potansiyel müşterilere, onların ilgisini çekebilecek yeni ilanlarla kişiselleştirilmiş e-postalar gönderir.' },
                { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Otomatik İlan Açıklaması Yazma', description: 'Mülkün temel özelliklerini girdiğinizde, AI saniyeler içinde SEO uyumlu ve ilgi çekici ilan metinleri oluşturur.' }
            ]
        },
        benefits: [
            { icon: 'fa-solid fa-arrow-up-right-dots', title: 'Satışları Artırın', description: 'Nitelikli potansiyel müşterilere odaklanarak ve takip süreçlerini otomatikleştirerek satış dönüşüm oranlarınızı artırın.' },
            { icon: 'fa-solid fa-clock-rotate-left', title: 'Zamandan Tasarruf Edin', description: 'Manuel veri girişi, raporlama ve takip gibi zaman alan işleri otomatize ederek danışmanlarınıza zaman kazandırın.' },
            { icon: 'fa-solid fa-users-cog', title: 'Müşteri İlişkilerini Güçlendirin', description: 'Tüm müşteri bilgilerini tek yerde tutarak ve zamanında takipler yaparak profesyonel bir hizmet sunun.' },
            { icon: 'fa-solid fa-lightbulb', title: 'Veriye Dayalı Kararlar Alın', description: 'Pazarlama bütçenizi ve satış stratejilerinizi, somut verilere dayalı analizlerle en doğru şekilde yönetin.' }
        ],
        targetAudience: [
            { icon: 'fas fa-building', name: 'Emlak Ofisleri' },
            { icon: 'fas fa-user-tie', name: 'Bireysel Emlak Danışmanları' },
            { icon: 'fas fa-city', name: 'İnşaat ve Proje Satış Ofisleri' },
            { icon: 'fas fa-key', name: 'Gayrimenkul Yatırım Danışmanları' }
        ],
        testimonials: [
            { quote: 'Mortanas Emlak CRM\'i sayesinde tüm portallardan gelen müşterileri tek bir yerden yönetmek işimizi inanılmaz kolaylaştırdı. Artık hiçbir fırsatı kaçırmıyoruz!', name: 'Serkan Öztürk', title: 'Kurucu, Lüks Konut Emlak', avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg' },
            { quote: 'Yapay zeka destekli müşteri puanlama ve otomatik takip özellikleri sayesinde, satış ekibimiz zamanını sadece ciddi alıcılara ayırıyor. Verimliliğimiz %60 arttı.', name: 'Derya Yılmaz', title: 'Satış Müdürü, Proje Gayrimenkul A.Ş.', avatarUrl: 'https://randomuser.me/api/portraits/women/78.jpg' }
        ],
        faqs: [
            { question: 'Mevcut ilanlarımı ve müşteri listemi sisteme aktarabilir miyim?', answer: 'Evet, mevcut portföyünüzü ve müşteri verilerinizi popüler emlak portallarından veya Excel formatından sisteme kolayca ve toplu olarak aktarabiliyoruz.' },
            { question: 'Platform, mobil cihazlarla uyumlu mu?', answer: 'Evet, platformumuz tamamen mobil uyumludur. Danışmanlarınız sahadayken bile cepten veya tabletten tüm müşteri ve portföy bilgilerine erişebilir, randevularını yönetebilir.' },
            { question: 'Hangi emlak portalları ile entegrasyon sağlıyorsunuz?', answer: 'Sahibinden.com, Hepsiemlak, Emlakjet, Zingat gibi Türkiye\'nin önde gelen tüm emlak portalları ile tam entegrasyon sunuyoruz.' },
            { question: 'Veri güvenliği nasıl sağlanıyor?', answer: 'Tüm verileriniz, KVKK uyumlu, yüksek güvenlikli bulut sunucularda şifrelenerek saklanır. Veri güvenliği ve gizliliği en önemli önceliğimizdir.' }
        ],
        references: [
            { name: "Sahibinden.com", logoUrl: "https://i.imgur.com/R3aB5N7.png" },
            { name: "Hepsiemlak", logoUrl: "https://i.imgur.com/GHYp627.png" },
            { name: "Emlakjet", logoUrl: "https://i.imgur.com/4q6XyJ2.png" },
            { name: "Zingat", logoUrl: "https://i.imgur.com/U8tJ8Y3.png" },
            { name: "WhatsApp", logoUrl: "https://i.imgur.com/logo-whatsapp.png" },
        ],
        pricing: { monthly: 320, annually: 3200, lifetime: 8500 }
    },
    {
        name: 'Şirket Yönetimi (CRM)',
        slug: 'sirket-yonitimi-crm',
        sector: 'Profesyonel Hizmetler',
        description: 'Satış, pazarlama, proje yönetimi ve finans operasyonlarınızı tek bir platformda birleştirerek 360 derece kontrol sağlayın.',
        imageUrl: 'https://www.mortanas.com/resim/compa.png',
        title: 'Hepsi Bir Arada Şirket Yönetim Platformu',
        longDescription: 'İşletmenizin tüm departmanlarını tek bir çatı altında toplayan, veri akışını merkezileştiren ve karar alma süreçlerinizi veriye dayalı hale getiren bütünsel bir CRM ve ERP çözümüdür. Müşteri ilişkilerinden proje takibine, teklif hazırlamadan faturalandırmaya kadar tüm iş akışlarınızı dijitalleştirin.',
        problem: "Departmanlar arası kopukluk, veri siloları, verimsiz iş akışları ve müşteri verilerinin dağınıklığı, büyümenin önündeki en büyük engellerdir.",
        solution: "Satış, pazarlama, proje yönetimi ve finansı tek bir çatı altında toplayan platformumuz, 360 derece bir müşteri ve operasyon görünümü sunarak verimliliği artırır.",
        goal: "Amacımız, işletmenizin tüm departmanlarını uyum içinde çalıştırarak veri odaklı kararlar almanızı sağlamak, operasyonel mükemmelliğe ulaştırmak ve sürdürülebilir bir büyüme altyapısı kurmaktır.",
        whyChooseUs: [
            { icon: 'fa-solid fa-cubes-stacked', title: 'Modüler ve Esnek Yapı', description: 'İşletmeniz büyüdükçe ihtiyaçlarınıza göre yeni modüller ekleyebileceğiniz ölçeklenebilir bir mimari sunar.' },
            { icon: 'fa-solid fa-arrows-spin', title: 'Uçtan Uca Otomasyon', description: 'Teklif hazırlamadan faturalandırmaya kadar tüm iş akışlarınızı otomatikleştirerek zamandan tasarruf edin.' },
            { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Derinlemesine Raporlama', description: 'İşletmenizin sağlığı hakkında kritik içgörüler sunan özelleştirilebilir raporlar ve analiz panelleri.' },
            { icon: 'fa-solid fa-cogs', title: 'Özelleştirilebilir Alanlar', description: 'Kendi iş süreçlerinize tam uyum sağlaması için platformu özel alanlar ve modüllerle kişiselleştirin.' }
        ],
        features: [
            // Satış & Pazarlama
            { icon: 'fa-solid fa-funnel-dollar', title: 'Satış Fırsatı Yönetimi', description: 'Potansiyel müşterilerinizi (lead) satış hunisinin her aşamasında takip edin ve satışa dönüştürme oranınızı artırın.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-file-invoice-dollar', title: 'Teklif ve Sözleşme Yönetimi', description: 'Profesyonel teklif şablonları oluşturun, müşterilerinize gönderin ve online olarak onay alın.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-bullhorn', title: 'Pazarlama Otomasyonu', description: 'E-posta ve SMS kampanyaları oluşturun, müşteri segmentasyonu yapın ve kampanya performansını ölçün.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-users-viewfinder', title: 'Müşteri Segmentasyonu', description: 'Müşterilerinizi satın alma davranışlarına göre dinamik gruplara ayırarak hedefli pazarlama yapın.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-binoculars', title: 'Rakip Analizi Modülü', description: 'Piyasadaki rakiplerinizin aktivitelerini takip ederek stratejik avantaj elde edin.', category: 'Satış & Pazarlama' },
            { icon: 'fa-solid fa-envelope-circle-check', title: 'E-posta Pazarlama Entegrasyonu', description: 'Popüler e-posta araçları ile tam entegrasyon sağlayın, kampanyalarınızı CRM üzerinden yönetin.', category: 'Satış & Pazarlama' },
            
            // Proje & Operasyon
            { icon: 'fa-solid fa-tasks', title: 'Proje Yönetimi', description: 'Projelerinizi oluşturun, görevler atayın, zaman çizelgeleri belirleyin ve ilerlemeyi anlık olarak takip edin.', category: 'Proje & Operasyon' },
            { icon: 'fa-solid fa-check-double', title: 'Görev Takibi', description: 'Ekip üyelerinize görevler atayın, son teslim tarihlerini belirleyin ve görev durumlarını izleyin.', category: 'Proje & Operasyon' },
            { icon: 'fa-solid fa-hourglass-half', title: 'Zaman Çizelgesi (Timesheet)', description: 'Personelinizin projelerde harcadığı zamanı kaydedin ve proje maliyetlerini doğru bir şekilde hesaplayın.', category: 'Proje & Operasyon' },
            { icon: 'fa-solid fa-file-signature', title: 'Doküman Yönetimi', description: 'Tüm kurumsal belgelerinizi güvenli bir şekilde depolayın ve yetkilendirilmiş kişilerle paylaşın.', category: 'Proje & Operasyon' },
            { icon: 'fa-solid fa-people-carry-box', title: 'Kaynak Yönetimi', description: 'Proje bazında personel, ekipman ve bütçe atamaları yaparak verimli bir planlama sağlayın.', category: 'Proje & Operasyon' },
            { icon: 'fa-solid fa-shield-halved', title: 'Risk Yönetimi', description: 'Projelerinizdeki potansiyel riskleri önceden tanımlayın ve önleyici aksiyon planları oluşturun.', category: 'Proje & Operasyon' },

            // Finans & Muhasebe
            { icon: 'fa-solid fa-file-invoice', title: 'Faturalandırma ve Ödeme Takibi', description: 'Müşterilerinize faturalar oluşturun, ödeme durumlarını takip edin ve otomatik hatırlatmalar gönderin.', category: 'Finans & Muhasebe' },
            { icon: 'fa-solid fa-calculator', title: 'Gider Yönetimi', description: 'Şirket masraflarını kaydedin, fişleri dijital olarak ekleyin ve onay süreçlerini yönetin.', category: 'Finans & Muhasebe' },
            { icon: 'fa-solid fa-chart-pie', title: 'Finansal Raporlama', description: 'Gelir-gider, nakit akışı ve kârlılık analizleri gibi kritik finansal raporlara anında ulaşın.', category: 'Finans & Muhasebe' },
            { icon: 'fa-solid fa-piggy-bank', title: 'Bütçe Yönetimi', description: 'Departman veya proje bazında bütçeler oluşturun, gerçekleşen harcamaları anlık olarak karşılaştırın.', category: 'Finans & Muhasebe' },
            { icon: 'fa-solid fa-water', title: 'Nakit Akışı Tahminlemesi', description: 'Gelecekteki gelir ve giderlerinizi tahmin ederek finansal planlamanızı daha sağlam temellere oturtun.', category: 'Finans & Muhasebe' },
            { icon: 'fa-solid fa-dolly', title: 'Tedarikçi Yönetimi ve Ödemeler', description: 'Tedarikçilerinizle ilgili tüm bilgileri, sözleşmeleri ve faturaları tek bir yerde yönetin.', category: 'Finans & Muhasebe' },

            // Müşteri & İK
            { icon: 'fa-solid fa-headset', title: 'Destek Talebi (Ticket) Sistemi', description: 'Müşteri taleplerini merkezi bir sistemde toplayın, ilgili departmanlara atayın ve çözüm süreçlerini takip edin.', category: 'Müşteri & İK' },
            { icon: 'fa-solid fa-users', title: 'İnsan Kaynakları (İK) Yönetimi', description: 'Personel özlük bilgilerini, izinlerini ve performans değerlendirmelerini tek bir yerden yönetin.', category: 'Müşteri & İK' },
            { icon: 'fa-solid fa-user-check', title: 'Performans Değerlendirme Sistemi', description: 'Personeliniz için hedefler belirleyin ve 360 derece geri bildirim süreçlerini dijitalleştirin.', category: 'Müşteri & İK' },
            { icon: 'fa-solid fa-user-plus', title: 'İşe Alım (ATS)', description: 'Açık pozisyonlar oluşturun, başvuruları toplayın ve adayları değerlendirme aşamalarında takip edin.', category: 'Müşteri & İK' },
            { icon: 'fa-solid fa-graduation-cap', title: 'Eğitim Yönetimi (LMS)', description: 'Personelinize özel eğitimler atayın, tamamlanma durumlarını takip edin ve yetkinliklerini geliştirin.', category: 'Müşteri & İK' },
            { icon: 'fa-solid fa-laptop', title: 'Kurumsal Varlık Yönetimi', description: 'Personele zimmetlenen bilgisayar, telefon gibi kurumsal varlıkları takip edin.', category: 'Müşteri & İK' },
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka İş Asistanınız",
            subtitle: "Tüm şirket operasyonlarınızı, kendi verilerinizle eğitilmiş akıllı bir asistanla yönetin. Yapay zeka, kârlılığı artırmak ve stratejik kararlar almanızı sağlamak için 7/24 çalışır.",
            features: [
                { icon: 'fa-solid fa-lightbulb', title: 'Akıllı Satış Fırsatı Tahmini', description: 'Yapay zeka, geçmiş verileri analiz ederek hangi potansiyel müşterinin satışa dönüşme olasılığının en yüksek olduğunu tahmin eder ve satış ekibinizi yönlendirir.' },
                { icon: 'fa-solid fa-folder-tree', title: 'Otomatik Proje Risk Analizi', description: 'Proje ilerlemelerini ve kaynak kullanımını izleyerek potansiyel gecikmeleri veya bütçe aşımlarını proaktif olarak tespit eder ve uyarır.' },
                { icon: 'fa-solid fa-cash-register', title: 'Veriye Dayalı Finansal Öngörüler', description: 'Nakit akışınızı, gelir-gider dengenizi ve kârlılık oranlarınızı tahmin ederek geleceğe yönelik daha sağlam finansal kararlar almanızı sağlar.' },
                { icon: 'fa-solid fa-headset', title: 'Akıllı Destek Yönetimi', description: 'Müşteri destek taleplerini (ticket) otomatik olarak analiz eder, aciliyetlerine göre önceliklendirir ve doğru departmana atayarak çözüm sürelerini kısaltır.' }
            ]
        },
        benefits: [
            { icon: 'fa-solid fa-sitemap', title: 'Merkezi Kontrol', description: 'Tüm iş süreçlerinizi tek bir platformdan yöneterek dağınıklığı ortadan kaldırın ve tam kontrol sağlayın.' },
            { icon: 'fa-solid fa-arrows-spin', title: 'Verimlilik Artışı', description: 'Tekrarlayan görevleri otomatikleştirin, departmanlar arası işbirliğini güçlendirin ve zamandan tasarruf edin.' },
            { icon: 'fa-solid fa-brain', title: 'Stratejik Kararlar', description: 'Anlık ve doğru verilere dayalı raporlar sayesinde işletmeniz için en doğru kararları hızla alın.' },
            { icon: 'fa-solid fa-expand', title: 'Ölçeklenebilir Büyüme', description: 'İşletmeniz büyüdükçe ihtiyaçlarınıza uyum sağlayan modüler yapısı ile sürdürülebilir bir büyüme altyapısı oluşturun.' }
        ],
        targetAudience: [
            { icon: 'fas fa-building', name: 'KOBİ\'ler ve Büyüyen İşletmeler' },
            { icon: 'fas fa-concierge-bell', name: 'Hizmet Sektörü Firmaları' },
            { icon: 'fas fa-bullseye', name: 'Satış Odaklı Ekipler' },
            { icon: 'fas fa-project-diagram', name: 'Proje Bazlı Şirketler' },
            { icon: 'fas fa-rocket', name: 'Start-up\'lar ve Girişimler' }
        ],
        testimonials: [
            { quote: 'Tüm departmanlarımızı tek bir çatı altında toplamak verimliliğimizi inanılmaz artırdı. Satış ve proje ekipleri arasındaki iletişim hiç bu kadar güçlü olmamıştı.', name: 'Emre Güler', title: 'CEO, Dijital Ajans Co.', avatarUrl: 'https://randomuser.me/api/portraits/men/58.jpg' },
            { quote: 'Mortanas CRM sayesinde tekliften faturalandırmaya kadar tüm süreci otomatikleştirdik. Bu bize hem zaman hem de para kazandırdı. Raporlama özellikleri harika!', name: 'Fatma Şahin', title: 'Operasyon Direktörü, B2B Tech', avatarUrl: 'https://randomuser.me/api/portraits/women/58.jpg' }
        ],
        faqs: [
            { question: 'Platformu kendi iş süreçlerimize göre özelleştirebilir miyiz?', answer: 'Evet, platformumuz son derece esnektir. Kendi iş akışlarınıza uygun özel alanlar, modüller ve otomasyon kuralları oluşturabilirsiniz.' },
            { question: 'Mevcut verilerimizi (müşteri, ürün vb.) sisteme nasıl aktarabiliriz?', answer: 'Ekibimiz, mevcut verilerinizi Excel veya diğer formatlardan güvenli bir şekilde sisteme aktarmanız için size tam destek sağlar. Bu süreçte veri kaybı yaşanmaz.' },
            { question: 'Kullanıcı başına mı ücretlendiriliyor?', answer: 'Fiyatlandırma modelimiz esnektir. Hem kullanıcı bazlı hem de paket bazlı seçeneklerimiz mevcuttur. İşletmenizin büyüklüğüne ve ihtiyacınıza en uygun planı birlikte belirleyebiliriz.' },
            { question: 'Platform bulut tabanlı mı, yoksa kendi sunucularımıza mı kurmamız gerekiyor?', answer: 'Platformumuz tamamen bulut tabanlıdır (SaaS). Bu sayede herhangi bir sunucu veya bakım maliyetiyle uğraşmazsınız. Verilerinize internet olan her yerden güvenli bir şekilde erişebilirsiniz.' },
            { question: 'Mobil uygulaması var mı? Saha ekiplerimiz kullanabilir mi?', answer: 'Evet, hem iOS hem de Android için geliştirilmiş mobil uygulamalarımız mevcuttur. Saha satış veya teknik servis ekipleriniz, müşteri bilgilerine, görevlere ve projelere anlık olarak cepten ulaşabilir.' },
            { question: 'Veri güvenliği ve yedekleme nasıl sağlanıyor?', answer: 'Tüm verileriniz GDPR ve KVKK uyumlu, yüksek güvenlikli sunucularda şifrelenerek saklanır. Günlük olarak otomatik yedeklemeler alınır, böylece veri kaybı riskiniz ortadan kalkar.' }
        ],
        references: [
            { name: "Zapier", logoUrl: "https://i.imgur.com/logo-zapier.png" },
            { name: "Slack", logoUrl: "https://i.imgur.com/logo-slack.png" },
            { name: "Google Workspace", logoUrl: "https://i.imgur.com/logo-google-workspace.png" },
            { name: "Microsoft 365", logoUrl: "https://i.imgur.com/logo-microsoft-365.png" },
            { name: "Stripe", logoUrl: "https://i.imgur.com/logo-stripe.png" },
        ],
        pricing: { monthly: 180, annually: 1320, lifetime: 900 }
    },
    {
        name: 'Yapay Zeka Chatbot',
        slug: 'yapay-zeka-chatbot',
        sector: 'Müşteri Hizmetleri & Satış',
        description: 'Web sitenizde 7/24 çalışan akıllı bir asistan ile müşteri sorularını yanıtlayın, potansiyel müşterileri yakalayın ve satışlarınızı artırın.',
        imageUrl: 'https://www.mortanas.com/resim/bot.png',
        title: 'Akıllı Yapay Zeka Chatbot Çözümü',
        longDescription: 'Web sitenizin ziyaretçilerini potansiyel müşterilere dönüştüren, 7/24 çalışan, yapay zeka destekli bir sohbet asistanıdır. Ziyaretçilerinizin sorularını anında yanıtlar, onları doğru ürün veya hizmete yönlendirir, iletişim bilgilerini toplar ve satış ekibiniz için nitelikli potansiyel müşteriler oluşturur.',
        problem: "Web sitesi ziyaretçilerinin %95'i, aradıkları cevabı anında bulamadıkları için siteyi terk ediyor. Bu durum, potansiyel müşteri ve satış kaybı anlamına geliyor.",
        solution: "Yapay Zeka Chatbot, her ziyaretçiyi anında karşılar, sorularını 7/24 yanıtlar ve onlara kişiselleştirilmiş bir deneyim sunar. Böylece ziyaretçilerinizi sitede tutar ve onları müşteriye dönüştürme oranınızı artırırsınız.",
        goal: "Amacımız, web sitenizi pasif bir bilgi kaynağından, 7/24 aktif olarak potansiyel müşteri üreten ve satış yapan akıllı bir dijital çalışana dönüştürmektir.",
        whyChooseUs: [
            { icon: 'fa-solid fa-brain', title: 'İşletmenize Özel Eğitim', description: 'Chatbot\'u sizin ürünleriniz, hizmetleriniz ve sıkça sorulan sorularınızla eğitiyoruz. Böylece markanızın dilini konuşan bir uzman gibi davranır.' },
            { icon: 'fa-solid fa-funnel-dollar', title: 'Potensiyel Müşteri Toplama', description: 'Sadece soruları yanıtlamakla kalmaz, ziyaretçilerin e-posta ve telefon gibi bilgilerini stratejik olarak toplayarak satış huninizi besler.' },
            { icon: 'fa-solid fa-sync-alt', title: 'CRM Entegrasyonu', description: 'Toplanan tüm potansiyel müşteri bilgilerini ve sohbet kayıtlarını otomatik olarak mevcut CRM sisteminize aktarır.' },
            { icon: 'fa-solid fa-chart-line', title: 'Anlık Raporlama', description: 'En çok sorulan sorular, ziyaretçi talepleri ve chatbot performansı hakkında detaylı raporlar alarak müşteri içgörüleri kazanın.' }
        ],
        features: [
            { icon: 'fa-solid fa-comments', title: '7/24 Canlı Sohbet', description: 'Ziyaretçilerinize mesai saatleri dışında bile anında yanıt vererek müşteri memnuniyetini artırın.' },
            { icon: 'fa-solid fa-user-plus', title: 'Otomatik Lead Yakalama', description: 'Form doldurmaya gerek kalmadan, sohbet esnasında potensiyel müşterilerin iletişim bilgilerini toplayın.' },
            { icon: 'fa-solid fa-calendar-check', title: 'Randevu ve Demo Planlama', description: 'Chatbot, uygun zamanları kontrol ederek sizin için otomatik olarak toplantı veya demo randevuları oluşturur.' },
            { icon: 'fa-solid fa-globe', title: 'Çok Dilli Destek', description: 'Farklı dillerdeki ziyaretçilerinizle kendi dillerinde iletişim kurarak global erişiminizi genişletin.' },
            { icon: 'fa-solid fa-cogs', title: 'Özelleştirilebilir Senaryolar', description: 'Belirli sayfalarda veya belirli ziyaretçi davranışlarına göre tetiklenecek özel sohbet akışları tasarlayın.' },
            { icon: 'fa-solid fa-headset', title: 'Canlı Temsilciye Aktarma', description: 'Yapay zekanın çözemediği karmaşık durumlarda, sohbeti tek bir tıkla canlı bir müşteri temsilcisine sorunsuz bir şekilde devreder.' }
        ],
        aiFeatures: {
            title: "Size Özel Yapay Zeka Satış Asistanınız",
            subtitle: "Chatbot, sadece yanıt vermez; öğrenir, analiz eder ve satış fırsatları yaratır.",
            features: [
                { icon: 'fa-solid fa-robot', title: 'Doğal Dil Anlama (NLU)', description: 'Yapay zeka, karmaşık ve günlük konuşma dilini anlayarak, ziyaretçilerinize bir insanla sohbet ediyormuş gibi hissettirir.' },
                { icon: 'fa-solid fa-lightbulb', title: 'Niyet Tespiti', description: 'Ziyaretçinin yazdıklarından "satın alma", "bilgi isteme" veya "destek" gibi niyetlerini analiz ederek en doğru yanıtı ve aksiyonu tetikler.' },
                { icon: 'fa-solid fa-user-check', title: 'Potenansiyel Müşteri Puanlama', description: 'Sohbetin içeriğine göre hangi ziyaretçinin satın almaya daha yakın olduğunu anlayarak satış ekibinize öncelikli hedefler sunar.' },
                { icon: 'fa-solid fa-arrow-up-right-dots', title: 'Akıllı Ürün Önerisi', description: 'Ziyaretçinin sorduğu sorulara ve gezdiği sayfalara göre onlara en uygun ürün veya hizmetleri proaktif olarak önerir.' }
            ]
        },
        benefits: [
            { icon: 'fa-solid fa-arrow-trend-up', title: 'Dönüşüm Oranını Artırın', description: 'Web sitenizdeki ziyaretçileri, proaktif ve kişiselleştirilmiş iletişimle potansiyel müşterilere dönüştürün.' },
            { icon: 'fa-solid fa-clock-rotate-left', title: 'Satış Ekibine Zaman Kazandırın', description: 'Yapay zeka, ilk teması ve ön elemeyi yaparak satış ekibinizin sadece nitelikli potansiyel müşterilere odaklanmasını sağlar.' },
            { icon: 'fa-solid fa-smile-beam', title: 'Müşteri Deneyimini İyileştirin', description: 'Ziyaretçilerinize beklemeden, anında ve 7/24 doğru bilgi sunarak marka imajınızı güçlendirin.' },
            { icon: 'fa-solid fa-database', title: 'Değerli Veri Toplayın', description: 'Müşterilerinizin ne sorduğunu, neye ihtiyaç duyduğunu anlayarak pazarlama ve ürün geliştirme stratejilerinize yön verin.' }
        ],
        targetAudience: [
            { icon: 'fas fa-building', name: 'KOBİ\'ler ve Kurumsal Firmalar' },
            { icon: 'fas fa-store', name: 'E-Ticaret Siteleri' },
            { icon: 'fas fa-concierge-bell', name: 'Hizmet Sektörü (Otel, Klinik vb.)' },
            { icon: 'fas fa-chalkboard-teacher', name: 'Eğitim Kurumları' },
            { icon: 'fas fa-landmark', name: 'Emlak ve Danışmanlık Firmaları' }
        ],
        testimonials: [
            { quote: 'Web sitemize eklediğimiz Yapay Zeka Chatbot sayesinde potansiyel müşteri formlarımızın sayısı ilk ayda %200 arttı. Satış ekibimiz artık çok daha nitelikli müşterilerle görüşüyor.', name: 'Ozan Tekin', title: 'Pazarlama Müdürü, B2B Yazılım A.Ş.', avatarUrl: 'https://randomuser.me/api/portraits/men/60.jpg' },
            { quote: 'Geceleri ve hafta sonları gelen sorular cevapsız kalıyordu. Chatbot sayesinde 7/24 hizmet veriyoruz ve müşteri memnuniyetimiz gözle görülür şekilde arttı.', name: 'Leyla Erçetin', title: 'Kurucu, Online Danışmanlık Platformu', avatarUrl: 'https://randomuser.me/api/portraits/women/60.jpg' }
        ],
        faqs: [
            { question: 'Chatbot\'u web siteme entegre etmek zor mu?', answer: 'Hayır, çok kolay. Size vereceğimiz tek bir kod satırını web sitenize eklemeniz yeterlidir. Tüm teknik süreci biz yönetiyoruz.' },
            { question: 'Chatbot, kendi kendine yeni soruları öğrenebilir mi?', answer: 'Evet, yapay zeka altyapısı sayesinde chatbot, zamanla yeni soruları ve cevapları öğrenerek kendini sürekli geliştirir. Ayrıca panelden yeni bilgiler ekleyebilirsiniz.' },
            { question: 'Chatbot\'un konuşma tarzını kendi markama göre özelleştirebilir miyim?', answer: 'Kesinlikle. Kurulum aşamasında, chatbot\'un samimi, profesyonel veya esprili gibi hangi tonda konuşmasını istediğinizi belirleyerek markanızın kimliğine tam uyum sağlamasını sağlıyoruz.' },
            { question: 'Chatbot\'u sosyal medya hesaplarımıza (Instagram, Facebook) entegre edebilir miyiz?', answer: 'Evet, bu çözümümüzün bir parçasıdır. Chatbot\'u web sitenizin yanı sıra Instagram DM ve Facebook Messenger gibi kanallarda da çalıştırarak tüm platformlarda tutarlı bir müşteri deneyimi sunabilirsiniz.' },
            { question: 'Chatbot\'un performansını nasıl takip edebilirim? Raporlama özellikleri nelerdir?', answer: 'Size özel bir yönetim panelinden chatbot\'un yaptığı tüm görüşmeleri, en çok sorulan soruları, topladığı potansiyel müşteri sayısını ve dönüşüm oranlarını anlık olarak takip edebilirsiniz.' },
            { question: 'Chatbot, karmaşık bir soruyla karşılaştığında ne yapıyor? Canlı bir operatöre aktarabilir mi?', answer: 'Evet. Chatbot, kendi yetkinliğini aşan bir soruyla karşılaştığında veya ziyaretçi talep ettiğinde, sohbeti tüm geçmişiyle birlikte belirlediğiniz departmandaki canlı bir operatöre akıllıca devredebilir.' }
        ],
        references: [
            { name: "Zapier", logoUrl: "https://i.imgur.com/logo-zapier.png" },
            { name: "Slack", logoUrl: "https://i.imgur.com/logo-slack.png" },
            { name: "Google", logoUrl: "https://i.imgur.com/logo-google.png" },
            { name: "Stripe", logoUrl: "https://i.imgur.com/logo-stripe.png" },
            { name: "Salesforce", logoUrl: "https://i.imgur.com/Salesforce-Logo.png" },
        ],
        pricing: { monthly: 60, annually: 600, lifetime: 700 }
    }
];

// FIX: Added missing constants to resolve import errors.
export const SECTORS: Sector[] = [
  {
    name: 'Turizm ve Otelcilik',
    slug: 'turizm-otelcilik',
    description: 'Otel yönetimi, misafir ilişkileri ve rezervasyon süreçlerinizi yapay zeka ile optimize edin.',
    imageUrl: 'https://mortanas.com/resim/m2.png',
    details: {
      title: 'Turizm Sektöründe Dijital Dönüşüm',
      subtitle: 'Misafir memnuniyetini artırın, operasyonel verimliliği maksimize edin ve komisyon maliyetlerini düşürün.',
      use_cases: [
        { title: '7/24 Rezervasyon Asistanı', description: 'Web sitenizde ve sosyal medyada potansiyel misafirlerin sorularını anında yanıtlayarak rezervasyonları artırın.' },
        { title: 'Kişiselleştirilmiş Misafir Deneyimi', description: 'Misafir verilerini analiz ederek onlara özel paketler, oda yükseltmeleri ve ek hizmetler sunun.' },
        { title: 'Akıllı Yorum Yönetimi', description: 'Booking, Google gibi platformlardaki yorumları tek panelden takip edin ve yapay zeka ile saniyeler içinde yanıtlayın.' },
        { title: 'Dinamik Fiyatlandırma', description: 'Piyasa talebine, doluluk oranına ve rakip fiyatlarına göre oda fiyatlarınızı anlık olarak optimize edin.' },
        { title: 'Operasyonel Verimlilik', description: 'Kat hizmetleri, bakım ve personel görevlerini otomatikleştirerek zamandan ve maliyetten tasarruf edin.' }
      ],
      featured_capabilities: [
        {
          title: 'Komisyonsuz Doğrudan Rezervasyon',
          description: 'Kendi web siteniz ve sosyal medya kanallarınız üzerinden doğrudan rezervasyon alarak OTA\'lara ödediğiniz yüksek komisyonlardan kurtulun. Mortanas Akıllı Otel CRM\'i, size özel rezervasyon motoru ile tam entegre çalışır.',
          imageUrl: 'https://i.imgur.com/gKj3eXo.png'
        },
        {
          title: 'Yapay Zeka Destekli Gelir Yönetimi',
          description: 'Sadece rezervasyon almakla kalmayın, her misafirden elde ettiğiniz geliri maksimize edin. Yapay zeka, doğru zamanda doğru misafire doğru ek hizmeti (upsell/cross-sell) sunarak otelinizin kârlılığını artırır.',
          imageUrl: 'https://i.imgur.com/zWbV9qP.png'
        }
      ]
    }
  }
];

export const NAV_LINKS: NavLink[] = [
  {
    name: 'Yapay Zeka Otomasyonları',
    path: '/yapay-zeka-otomasyonlari',
    children: [
      { name: 'Sosyal Medya Otomasyonu', path: '/otomasyon/sosyal-medya-otomasyonu' },
      { name: 'Sesli Müşteri Hizmetleri', path: '/otomasyon/sesli-musteri-hizmetleri' },
      { name: 'Sesli Chatbot Otomasyonu', path: '/otomasyon/sesli-chatbot' },
      { name: 'Haber Otomasyonu', path: '/otomasyon/haber-otomasyonu' },
      { name: 'Emlak Otomasyonu', path: '/otomasyon/emlak-otomasyonu' },
      { name: 'Stok Yönetimi Otomasyonu', path: '/otomasyon/stok-yonetimi-otomasyonu' },
      { name: 'Yapay Zeka Chatbot (WhatsApp & IG)', path: '/otomasyon/yapay-zeka-chatbot' },
      { name: 'Çağrı Karşılama (Voice AI)', path: '/otomasyon/cagri-karsilama-voice-ai' },
      { name: 'İş Akışı Otomasyonu (RPA)', path: '/otomasyon/is-akisi-otomasyonu-rpa' },
      { name: 'İK ve İşe Alım Asistanı', path: '/otomasyon/ik-ve-ise-alim-asistani' },
      { name: 'Dinamik Fiyatlandırma & Stok (E-Ticaret)', path: '/otomasyon/dinamik-fiyatlandirma-stok' },
      { name: 'Kişiselleştirilmiş E-Posta Pazarlama', path: '/otomasyon/kisisellestirilmis-e-posta-pazarlama' },
      { name: 'Müşteri İtibar ve Yorum Yönetimi', path: '/otomasyon/musteri-itibar-yorum-yonetimi' },
      { name: 'Akıllı Toplantı ve Transkript Asistanı', path: '/otomasyon/akilli-toplanti-transkript-asistani' },
      { name: 'Akıllı Ön Muhasebe Otomasyonu', path: '/otomasyon/akilli-on-muhasebe-otomasyonu' },
      { name: 'Bayi / Saha Satış Otomasyonu', path: '/otomasyon/bayi-saha-satis-otomasyonu' },
    ]
  },
  {
    name: 'Yapay Zeka CRM Uygulamaları',
    path: '/yapay-zeka-uygulamalar',
    children: [
      { name: 'Otel Yönetimi (CRM)', path: '/uygulama/otel-yonetimi-crm' },
      { name: 'Masaj & Wellness Yönetimi', path: '/uygulama/masaj-wellness-yonetimi' },
      { name: 'Spor & Fitness Yazılımı', path: '/uygulama/spor-fitness-yazilimi' },
      { name: 'Emlak Yönetimi (CRM)', path: '/uygulama/emlak-yonetimi-crm' },
      { name: 'Şirket Yönetimi (CRM)', path: '/uygulama/sirket-yonitimi-crm' },
      { name: 'Yapay Zeka Chatbot', path: '/uygulama/yapay-zeka-chatbot' },
    ]
  },
  {
    name: 'Sektör Çözümlerimiz',
    path: '/sektor-cozumlerimiz',
    children: [
      { name: 'Otel Çözümlerimiz', path: '/sektorler/otel-cozumlerimiz' },
      { name: 'Sağlık Çözümlerimiz', path: '/sektorler/saglik-cozumlerimiz' },
      { name: 'Eğitim Çözümlerimiz', path: '/sektorler/egitim-cozumlerimiz' },
      { name: 'E-Ticaret Çözümlerimiz', path: '/sektorler/eticaret-cozumlerimiz' },
      { name: 'Otomotiv Çözümlerimiz', path: '/sektorler/otomotiv-cozumlerimiz' },
      { name: 'Hukuk Çözümlerimiz', path: '/sektorler/hukuk-cozumlerimiz' },
      { name: 'Restoran Çözümlerimiz', path: '/sektorler/restoran-cozumlerimiz' },
      { name: 'Fitness Çözümlerimiz', path: '/sektorler/fitness-cozumlerimiz' },
      { name: 'Sigorta Çözümlerimiz', path: '/sektorler/sigorta-cozumlerimiz' },
      { name: 'Güzellik Salonu Çözümlerimiz', path: '/sektorler/guzellik-salonu-cozumlerimiz' },
      { name: 'Diyetisyen Çözümlerimiz', path: '/sektorler/diyetisyen-cozumlerimiz' },
      { name: 'Emlakçı Çözümlerimiz', path: '/sektorler/emlakci-cozumlerimiz' }
    ]
  },
  {
    name: 'Mortanas',
    path: '#',
    children: [
      { name: 'Mortanas Market', path: 'https://www.mortanas.com/market' },
      { name: 'Mortanas Akademi', path: 'https://www.mortanas.com/akademi' },
      { name: 'Mortanas Medya', path: 'https://www.mortanas.com/medya' },
      { name: 'Mortanas Create', path: 'https://www.mortanas.com/create' },
      { name: 'Mortanas Djital', path: 'https://www.mortanas.com/dijital' },
      { name: 'Mortanas Company', path: 'https://www.mortanas.com/kurumsal' },
      { name: 'Savaş Zekası', path: '/savas-zekasi' },
    ]
  },
  {
    name: 'Kurumsal',
    path: '#',
    children: [
      { name: 'Hakkımızda', path: '/hakkimizda' },
      { name: 'Sıkça Sorulan Sorular', path: '/sss' },
      { name: 'Kurumsal Sayfası', path: '/kurumsal' },
      { name: 'Referanslar', path: '/kurumsal#kurumsal-referanslar' },
      { name: 'Entegrasyonlar', path: '/entegrasyonlar' },
      { name: 'İletişim', path: '/kurumsal#iletisim' },
      { name: 'Makaleler', path: '/makaleler' },
    ]
  },
];

export const INTEGRATIONS: Integration[] = [
  // E-Ticaret
  { name: 'Shopify', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fab fa-shopify text-4xl text-green-600"></i>, features: ['Sipariş takibi ve yönetimi', 'Müşteri bilgilerini senkronize etme', 'Terk edilmiş sepet otomasyonu'] },
  { name: 'WooCommerce', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fab fa-wordpress text-4xl text-purple-600"></i>, features: ['WordPress sitenizle tam entegrasyon', 'Ürün ve stok bilgilerini çekme', 'Otomatik müşteri desteği'] },
  { name: 'Trendyol', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fas fa-store text-4xl text-orange-500"></i>, features: ['Sipariş bilgilerini CRM\'e aktarma', 'Müşteri sorularını otomatik yanıtlama', 'Stok durumu senkronizasyonu'] },
  { name: 'Magento', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fab fa-magento text-4xl text-red-600"></i>, features: ['Gelişmiş e-ticaret otomasyonu', 'Ürün katalogu senkronizasyonu', 'Müşteri segmentasyonu'] },
  { name: 'Amazon', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fab fa-amazon text-4xl text-yellow-500"></i>, features: ['Satıcı hesabı yönetimi', 'Envanter takibi', 'Müşteri yorumları yönetimi'] },
  { name: 'Hepsiburada', category: 'E-Ticaret & Pazaryerleri', icon: <i className="fas fa-shopping-bag text-4xl text-orange-600"></i>, features: ['Pazaryeri sipariş entegrasyonu', 'Soru-cevap otomasyonu', 'Kampanya yönetimi'] },

  // Sosyal Medya
  { name: 'WhatsApp Business', category: 'Sosyal Medya', icon: <i className="fab fa-whatsapp text-4xl text-green-500"></i>, features: ['Gelen mesajları otomatik yanıtlama', 'Sipariş alma ve ödeme entegrasyonu', 'Toplu pazarlama mesajları gönderme'] },
  { name: 'Instagram', category: 'Sosyal Medya', icon: <i className="fab fa-instagram text-4xl text-pink-500"></i>, features: ['Direct Message (DM) otomasyonu', 'Yorumlara otomatik yanıt verme', 'Hikaye (Story) etkileşimleri'] },
  { name: 'Facebook Messenger', category: 'Sosyal Medya', icon: <i className="fab fa-facebook-messenger text-4xl text-blue-500"></i>, features: ['Chatbot ile 7/24 müşteri hizmetleri', 'Reklam kampanyaları ile entegrasyon', 'Satış ve pazarlama hunisi oluşturma'] },
  { name: 'Twitter (X)', category: 'Sosyal Medya', icon: <i className="fab fa-twitter text-4xl text-sky-500"></i>, features: ['Mention ve DM takibi', 'Otomatik tweet yanıtlama', 'Trend analizi'] },
  { name: 'LinkedIn', category: 'Sosyal Medya', icon: <i className="fab fa-linkedin text-4xl text-blue-700"></i>, features: ['B2B lead yönetimi', 'InMail otomasyonu', 'Şirket sayfası yönetimi'] },
  { name: 'Telegram', category: 'Sosyal Medya', icon: <i className="fab fa-telegram-plane text-4xl text-sky-600"></i>, features: ['Grup ve kanal yönetimi', 'Özelleştirilebilir botlar', 'Toplu bildirim gönderme'] },
  
  // CRM & İş Yönetimi
  { name: 'Salesforce', category: 'CRM & İş Yönetimi', icon: <i className="fab fa-salesforce text-4xl text-blue-400"></i>, features: ['Potansiyel müşteri (lead) senkronizasyonu', 'Müşteri verilerini zenginleştirme', 'Satış süreçlerini otomatikleştirme'] },
  { name: 'HubSpot', category: 'CRM & İş Yönetimi', icon: <i className="fab fa-hubspot text-4xl text-orange-600"></i>, features: ['Pazarlama otomasyonu entegrasyonu', 'Müşteri destek taleplerini (ticket) yönetme', 'Detaylı raporlama ve analiz'] },
  { name: 'Slack', category: 'CRM & İş Yönetimi', icon: <i className="fab fa-slack text-4xl text-purple-700"></i>, features: ['Önemli bildirimleri Slack kanallarına gönderme', 'Ekip içi anlık bilgilendirme', 'Müşteri taleplerini ekibe atama'] },
  { name: 'Zoho CRM', category: 'CRM & İş Yönetimi', icon: <i className="fas fa-cogs text-4xl text-red-500"></i>, features: ['Müşteri veritabanı yönetimi', 'Satış hunisi takibi', 'Pazarlama kampanyaları'] },
  { name: 'Trello', category: 'CRM & İş Yönetimi', icon: <i className="fab fa-trello text-4xl text-blue-600"></i>, features: ['Görev kartları oluşturma', 'Proje panolarını senkronize etme'] },
  { name: 'Google Workspace', category: 'CRM & İş Yönetimi', icon: <i className="fab fa-google-drive text-4xl text-yellow-400"></i>, features: ['Takvim, E-posta ve Drive entegrasyonu', 'Otomatik döküman oluşturma', 'Toplantı planlama'] },

  // Yardımcı Araçlar
  { name: 'Zapier', category: 'Yardımcı Araçlar', icon: <i className="fas fa-plug text-4xl text-orange-500"></i>, features: ['Binlerce uygulama ile bağlantı kurma', 'Kod yazmadan iş akışları oluşturma', 'Veri transferini otomatikleştirme'] },
  { name: 'Stripe', category: 'Yardımcı Araçlar', icon: <i className="fab fa-stripe text-4xl text-indigo-500"></i>, features: ['Sohbet üzerinden güvenli ödeme alma', 'Abonelik ve tek seferlik ödemeler', 'Otomatik faturalandırma'] },
  { name: 'Twilio', category: 'Yardımcı Araçlar', icon: <i className="fas fa-sms text-4xl text-red-500"></i>, features: ['Otomatik SMS ve arama yapma', 'İki faktörlü doğrulama (2FA)', 'Pazarlama ve bildirim mesajları'] },
  { name: 'Google Analytics', category: 'Yardımcı Araçlar', icon: <i className="fab fa-google-analytics text-4xl text-orange-500"></i>, features: ['Web sitesi trafiğini izleme', 'Dönüşüm hunisi analizi', 'Kullanıcı davranışlarını anlama'] },
  { name: 'Mailchimp', category: 'Yardımcı Araçlar', icon: <i className="fab fa-mailchimp text-4xl text-yellow-600"></i>, features: ['E-posta listelerini senkronize etme', 'Otomatik e-posta kampanyaları', 'Müşteri segmentasyonu'] },
  { name: 'Calendly', category: 'Yardımcı Araçlar', icon: <i className="fas fa-calendar-alt text-4xl text-blue-500"></i>, features: ['Otomatik toplantı ve demo planlama', 'Takvim senkronizasyonu', 'Randevu hatırlatmaları'] },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Mortanas'ın sosyal medya otomasyonu sayesinde, müşteri taleplerine 7/24 yanıt verebiliyoruz. Satışlarımız ilk ayda %30 arttı!",
    name: 'Ayşe Kaya',
    title: 'E-Ticaret Yöneticisi, ModaTrend',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote: "Otelimiz için geliştirdikleri CRM çözümü operasyonel verimliliğimizi inanılmaz artırdı. Artık tüm rezervasyon ve misafir yönetimini tek bir yerden yapabiliyoruz.",
    name: 'Mehmet Öztürk',
    title: 'Otel Müdürü, Ege Palace',
    avatarUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
  },
  {
    quote: "Sesli yapay zeka asistanı, çağrı merkezimizin yükünü büyük ölçüde hafifletti. Müşteri memnuniyetimiz hiç bu kadar yüksek olmamıştı.",
    name: 'Fatma Şahin',
    title: 'Müşteri Hizmetleri Direktörü, TeknoDestek',
    avatarUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
  },
  {
    quote: "Mortanas'ın emlak otomasyonu ile potansiyel müşteri takibimiz inanılmaz kolaylaştı. Danışmanlarımız artık sadece ciddi alıcılarda ilgileniyor, verimliliğimiz %60 arttı.",
    name: 'Serkan Demir',
    title: 'Emlak Ofisi Sahibi, Lüks Konut',
    avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
  },
  {
    quote: "Online randevu sistemi ve otomatik hatırlatmalar sayesinde randevuya gelmeme oranımız neredeyse sıfırlandı. Müşterilerimiz 7/24 randevu alabilmekten çok memnun.",
    name: 'Zeynep Arslan',
    title: 'Spa Yöneticisi, Serenity Wellness',
    avatarUrl: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    quote: "Haber otomasyonu, yüzlerce kaynağı anlık olarak tarayarak bize saatler kazandırıyor. Artık özel haberlere daha fazla odaklanabiliyoruz.",
    name: 'Caner Akın',
    title: 'Haber Editörü, Gündem Haber',
    avatarUrl: 'https://randomuser.me/api/portraits/men/80.jpg',
  },
  {
    quote: "Tüm şirket operasyonlarımızı tek bir CRM'de toplamak, departmanlar arası iletişimi ve verimliliği inanılmaz artırdı. Satış ve proje ekiplerimiz artık tam bir uyum içinde.",
    name: 'Ozan Yılmaz',
    title: 'CEO, B2B Çözümler A.Ş.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    quote: "Hukuk büromuz için geliştirdikleri Şirket Yönetimi (CRM) platformu, dava takibini ve müvekkil iletişimini inanılmaz kolaylaştırdı. Evrak yönetimi artık kabus olmaktan çıktı.",
    name: 'Av. Elif Güneş',
    title: 'Kurucu Ortak, Güneş Hukuk Bürosu',
    avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    quote: "Mortanas'ın proje yönetim otomasyonu sayesinde, yaratıcı ekibimiz idari işlerle daha az, tasarımla daha çok vakit geçiriyor. Proje teslim sürelerimiz %25 kısaldı.",
    name: 'Barış Ceylan',
    title: 'Yaratıcı Direktör, Fikri Harika Ajans',
    avatarUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
  },
];

export const ARTICLES: Article[] = [
  {
    slug: 'otonom-yapay-zeka-ajanlarinin-yukselisi',
    title: 'Otonom Yapay Zeka Ajanlarının Yükselişi: Otomasyonun Yeni Sınırı',
    category: 'Gelecek Teknolojileri',
    imageUrl: 'https://www.mortanas.com/resim/mm.png',
    excerpt: 'Artık sadece komutları yerine getirmeyen, kendi başına hedefler belirleyip strateji kurabilen otonom AI ajanları, iş dünyasından bilime kadar her alanda devrim yaratmaya hazırlanıyor. Bu yeni teknoloji dalgasını ve potansiyel etkilerini mercek altına alıyoruz.',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '05 Temmuz 2024',
    content: (
      <div>
        <p>Yapay zeka dünyası, "otonom ajanlar" olarak bilinen yeni bir kavramla sarsılıyor. ChatGPT gibi komut bekleyen modellerin aksine, bu yeni nesil yapay zekalar, onlara verilen bir hedef doğrultusunda kendi kendilerine görevler oluşturup, interneti kullanarak veya diğer araçlarla etkileşime geçerek bu hedeflere ulaşabiliyorlar.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Otonom Ajanlar Nasıl Çalışır?</h3>
        <p>Bir otonom ajana, "Bana Ege bölgesinde, denize sıfır, lüks bir tatil için en iyi 5 oteli bul ve ön rezervasyon yap" gibi genel bir hedef verdiğinizde, ajan şu adımları izleyebilir:</p>
        <ol className="list-decimal list-inside space-y-2 mt-4">
            <li>"Ege bölgesi lüks tatil otelleri" gibi bir arama sorgusu oluşturur.</li>
            <li>Arama sonuçlarını analiz eder, otel web sitelerini ziyaret eder.</li>
            <li>Yorum sitelerinden (TripAdvisor, Booking vb.) puanları ve yorumları okuyarak bir kısa liste oluşturur.</li>
            <li>Otellerin kendi rezervasyon sistemleriyle etkileşime geçerek uygun tarihleri ve fiyatları kontrol eder.</li>
            <li>Bulduğu en iyi 5 seçeneği size bir rapor halinde sunar ve onayınızla ön rezervasyon işlemlerini tamamlar.</li>
        </ol>
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
          <p className="text-xl italic text-gray-700">"Otonom ajanlar, yapay zekayı pasif bir araç olmaktan çıkarıp, proaktif bir dijital iş gücüne dönüştürüyor."</p>
        </blockquote>
        <h3 className="text-2xl font-bold mt-8 mb-4">İş Dünyası İçin Potansiyel Etkileri</h3>
        <p>Bu teknoloji, pazar araştırması, potansiyel müşteri yaratma, karmaşık seyahat planlaması ve hatta yazılım geliştirme gibi birçok beyaz yaka işini kökten değiştirme potansiyeline sahip. Şirketler, tekrarlayan ve zaman alan görevler için dijital "ajan" orduları kurarak, çalışanlarının daha yaratıcı ve stratejik alanlara odaklanmasını sağlayabilir. Bu devrim, sadece bir verimlilik artışı değil, aynı zamanda iş yapış şekillerimizin temelden yeniden tanımlanması anlamına geliyor.</p>
      </div>
    ),
  },
  {
    slug: 'is-dunyasinda-prompt-muhendisligi-yeni-kritik-yetkinlik',
    title: 'İş Dünyasında "Prompt Mühendisliği": Yeni ve Kritik Bir Yetkinlik',
    category: 'İş Dünyası',
    imageUrl: 'https://www.mortanas.com/resim/ed.png',
    excerpt: 'Üretken yapay zekadan en iyi verimi almanın anahtarı olan prompt mühendisliği nedir? Şirketler neden bu yetkinliğe sahip çalışanlar arıyor ve nasıl geliştirilir?',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '25 Haziran 2024',
    content: (
      <div>
        <p>ChatGPT, Midjourney ve diğer üretken yapay zeka modellerinin hayatımıza girmesiyle birlikte, bu araçlardan doğru ve etkili sonuçlar alabilme becerisi de kritik bir önem kazandı. İşte bu noktada "prompt mühendisliği" devreye giriyor.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Prompt Mühendisliği Nedir?</h3>
        <p>En basit tanımıyla prompt mühendisliği, bir yapay zeka modeline, istenen çıktıyı en doğru, en kapsamlı ve en verimli şekilde üretmesi için doğru komutları (prompt) tasarlama sanatıdır. Bu, sadece soru sormak değil, aynı zamanda yapay zekanın düşünme biçimini anlayarak onu doğru yönde yönlendirmektir.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">İşletmeler İçin Neden Önemli?</h3>
        <p>İyi bir prompt mühendisi, pazarlama metinleri üreten bir yapay zekadan daha yaratıcı sonuçlar alabilir, veri analizi yapan bir modelden daha derinlemesine içgörüler çıkarabilir veya müşteri hizmetleri chatbot'unun daha empatik yanıtlar vermesini sağlayabilir. Bu yetkinlik, yapay zeka yatırımının geri dönüşünü (ROI) doğrudan etkiler. Bu nedenle şirketler, yapay zekadan maksimum verim alabilecek "prompt mühendisi" veya bu yetkinliğe sahip çalışanları işe almak için bir yarışa girmiş durumda.</p>
      </div>
    ),
  },
  {
    slug: 'otonom-araclar-ve-sehirlerin-gelecegi',
    title: 'Otonom Araçlar ve Şehirlerin Geleceği: Sadece Bir Ulaşım Devrimi Değil',
    category: 'Gelecek Teknolojileri',
    imageUrl: 'https://www.mortanas.com/resim/otonom.png',
    excerpt: 'Sürücüsüz arabalar yaygınlaştığında şehirlerimiz nasıl değişecek? Park alanlarından, trafik akışına ve emlak değerlerine kadar beklenen büyük dönüşümler.',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '20 Haziran 2024',
    content: (
      <div>
        <p>Otonom araçlar genellikle bir ulaşım teknolojisi olarak düşünülse de, etkileri çok daha derin ve kapsamlı olacak. Sürücüsüz otomobillerin yaygınlaşması, şehirlerimizin fiziksel yapısını, ekonomisini ve sosyal yaşamını kökten değiştirme potansiyeline sahip.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Park Alanlarının Yeşil Alanlara Dönüşümü</h3>
        <p>Günümüz şehirlerinde araçların %95'i zamanlarının büyük bir kısmını park halinde geçiriyor ve bu da devasa park alanlarına ihtiyaç duyulmasına neden oluyor. Otonom araçlar ise sürekli hareket halinde olabilecekleri veya ihtiyaç duyulmadığında şehir dışındaki merkezlere gidebilecekleri için, şehir merkezlerindeki değerli park alanları; parklara, konutlara veya ticari alanlara dönüştürülebilir.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Trafik ve Emlak Piyasasına Etkileri</h3>
        <p>Otonom araçlar birbirleriyle iletişim kurarak trafik akışını optimize edebilir, kazaları azaltabilir ve trafik sıkışıklığını büyük ölçüde ortadan kaldırabilir. Bu durum, insanların şehir merkezinden daha uzakta yaşamayı tercih etmesine neden olabilir. Uzun ve stresli yolculuklar, otonom araç içinde çalışma veya dinlenme zamanına dönüşeceği için, şehir dışındaki bölgelerin emlak değerleri artabilir.</p>
      </div>
    ),
  },
  {
    slug: 'yapay-zeka-otomasyonunun-isletmelere-faydalari',
    title: 'Yapay Zeka Otomasyonunun İşletmelere Sağladığı 5 Temel Fayda',
    category: 'Yapay Zeka',
    imageUrl: 'https://www.mortanas.com/resim/fayda.png',
    excerpt: 'Yapay zeka otomasyonu, sadece büyük şirketler için değil, KOBİ\'ler için de oyunun kurallarını değiştiriyor. Verimlilikten müşteri memnuniyetine kadar...',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '15 Mayıs 2024',
    content: (
      <div>
        <p>Yapay zeka (AI) otomasyonu, iş dünyasında bir devrim yaratıyor. Tekrarlayan görevleri otomatikleştirmekten, karmaşık veri setlerini analiz etmeye kadar, AI işletmelerin daha akıllı, daha hızlı ve daha verimli çalışmalarını sağlıyor. Peki, bu teknoloji sizin işletmenize ne gibi somut faydalar sağlayabilir? İşte 5 temel fayda:</p>
        
        <h3 className="text-2xl font-bold mt-8 mb-4">1. Artan Verimlilik ve Azalan Maliyetler</h3>
        <p>Yapay zeka, faturalandırma, veri girişi, müşteri hizmetleri gibi zaman alıcı ve tekrarlayan görevleri 7/24 kesintisiz bir şekilde yapabilir. Bu, çalışanlarınızın daha stratejik ve yaratıcı işlere odaklanmasını sağlar. Sonuç olarak, operasyonel verimlilik artar ve personel maliyetleri düşer.</p>

        <h3 className="text-2xl font-bold mt-8 mb-4">2. Gelişmiş Müşteri Deneyimi</h3>
        <p>AI destekli chatbot'lar ve sesli asistanlar, müşterilerinize anında yanıt vererek bekleme sürelerini ortadan kaldırır. Müşteri verilerini analiz ederek kişiselleştirilmiş ürün önerileri ve hizmetler sunabilirler. 7/24 ulaşılabilir olmak, müşteri memnuniyetini ve sadakatini önemli ölçüde artırır.</p>

        <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
          <p className="text-xl italic text-gray-700">"Gelecekte, en başarılı şirketler yapay zekayı işlerinin her alanına entegre edenler olacak."</p>
        </blockquote>

        <h3 className="text-2xl font-bold mt-8 mb-4">3. Veriye Dayalı Karar Alma</h3>
        <p>Yapay zeka, büyük veri (big data) setlerini insanlardan çok daha hızlı ve doğru bir şekilde analiz edebilir. Pazar trendlerini, müşteri davranışlarını ve operasyonel verimsizlikleri tespit ederek, yöneticilere stratejik kararlar almalarında yardımcı olan değerli içgörüler sunar.</p>

        <h3 className="text-2xl font-bold mt-8 mb-4">4. Satış ve Pazarlama Süreçlerinin Optimizasyonu</h3>
        <p>AI, potansiyel müşteri (lead) değerlendirmesi, müşteri segmentasyonu ve kişiselleştirilmiş pazarlama kampanyaları gibi süreçleri otomatikleştirebilir. Hangi müşterinin satın almaya daha yakın olduğunu tahmin edebilir, terk edilmiş sepetleri geri kazanmak için otomatik e-postalar gönderebilir. Bu da doğrudan satışların artmasını sağlar.</p>

        <h3 className="text-2xl font-bold mt-8 mb-4">5. İnsan Hatalarının Azalması</h3>
        <p>Manuel olarak yapılan işlerde hata payı her zaman vardır. Yapay zeka otomasyonu, özellikle veri girişi ve finansal işlemler gibi hassas alanlarda insan kaynaklı hataları minimuma indirir. Bu da işletmenizi olası finansal kayıplardan ve itibar zedelenmesinden korur.</p>

        <p className="mt-8">Sonuç olarak, yapay zeka otomasyonu artık bir lüks değil, rekabetçi kalabilmek için bir zorunluluktur. İşletmenizi geleceğe taşımak ve bu faydalardan yararlanmak için bugün bir adım atın.</p>
      </div>
    ),
  },
  {
    slug: 'sohbet-ticareti-whatsapp-ve-instagramda-satis-nasil-yapilir',
    title: 'Sohbet Ticareti: WhatsApp ve Instagram\'da Nasıl Satış Yapılır?',
    category: 'E-Ticaret',
    imageUrl: 'https://i.imgur.com/xT8dC4Y.png',
    excerpt: 'Müşterileriniz zaten sosyal medyada. Peki, onlara alıştıkları platformdan ayrılmadan alışveriş yapma imkanı sunuyor musunuz? İşte sohbet ticaretinin sırları...',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '22 Nisan 2024',
     content: (
      <div>
        <p>Sohbet ticareti (conversational commerce), müşterilerle mesajlaşma uygulamaları üzerinden doğrudan etkileşim kurarak satış yapma sürecidir. Bu yöntem, e-ticarette kişiselleştirme ve kolaylığı bir araya getirerek müşteri deneyimini yeniden şekillendiriyor.</p>
      </div>
    ),
  },
  {
    slug: 'otelcilikte-dijital-donusum-ota-komisyonlarindan-nasil-kurtulunur',
    title: 'Otelcilikte Dijital Dönüşüm: OTA Komisyonlarından Nasıl Kurtulunur?',
    category: 'Turizm',
    imageUrl: 'https://i.imgur.com/dF9tB8e.png',
    excerpt: 'Booking, Expedia gibi Online Seyahat Acentelerine (OTA) ödenen yüksek komisyonlar, otellerin kârlılığını önemli ölçüde düşürüyor. Peki, bu bağımlılıktan kurtulmak mümkün mü?',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '05 Nisan 2024',
     content: (
      <div>
        <p>Online Seyahat Acenteleri (OTA), oteller için önemli bir müşteri kaynağı olsa da, %15 ila %25 arasında değişen komisyon oranları kârlılığı ciddi şekilde etkiliyor. Mortanas CRM gibi akıllı otel yönetim sistemleri, doğrudan rezervasyonları artırarak bu soruna çözüm sunuyor.</p>
      </div>
    ),
  },
   {
    slug: 'sesli-asistanlar-musteri-hizmetlerinin-gelecegi-mi',
    title: 'Sesli Asistanlar Müşteri Hizmetlerinin Geleceği mi?',
    category: 'Teknoloji',
    imageUrl: 'https://i.imgur.com/vHqJ5zL.png',
    excerpt: 'Yapay zeka destekli sesli asistanlar, sadece telefon çağrılarını yanıtlamanın ötesine geçerek, müşteri hizmetleri anlayışını kökten değiştiriyor. İşte bu teknolojinin getirdiği yenilikler...',
    authorName: 'Eren Talha Altun',
    authorAvatarUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    publishedDate: '18 Mart 2024',
     content: (
      <div>
        <p>Mortanas Voice Agent gibi yapay zeka tabanlı sesli asistanlar, 7/24 kesintisiz hizmet, insan benzeri diyalog yetenekleri ve aynı anda birden fazla çağrıyı yönetme kapasitesi ile çağrı merkezlerinin verimliliğini artırıyor ve maliyetlerini düşürüyor.</p>
      </div>
    ),
  },
];


export const REFERENCES: Reference[] = [
  { name: "TechCrunch", logoUrl: "https://i.imgur.com/logo-techcrunch.png" },
  { name: "Forbes", logoUrl: "https://i.imgur.com/logo-forbes.png" },
  { name: "Fast Company", logoUrl: "https://i.imgur.com/logo-fast-company.png" },
  { name: "Wired", logoUrl: "https://i.imgur.com/logo-wired.png" },
  { name: "The Verge", logoUrl: "https://i.imgur.com/logo-the-verge.png" },
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: 'Eren Talha Altun', title: 'Kurucu & CEO', imageUrl: 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg', bio: 'Yapay zeka ve otomasyon alanında 10+ yıllık deneyime sahip vizyoner lider.' },
    { name: 'Dr. Elif Yılmaz', title: 'Baş Teknoloji Sorumlusu (CTO)', imageUrl: 'https://randomuser.me/api/portraits/women/75.jpg', bio: 'Makine öğrenmesi ve doğal dil işleme üzerine doktoralı, yenilikçi teknoloji yöneticisi.' },
    { name: 'Caner Öztürk', title: 'Satış & Pazarlama Direktörü', imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg', bio: 'B2B teknoloji satışında 15 yıllık tecrübesiyle büyüme stratejilerine liderlik ediyor.' },
    { name: 'Selin Demir', title: 'Ürün Yöneticisi', imageUrl: 'https://randomuser.me/api/portraits/women/76.jpg', bio: 'Kullanıcı odaklı ürün geliştirme ve strateji belirlemede uzman.' }
];

export const MILESTONES: Milestone[] = [
    { year: '2020', title: 'Kuruluş', description: 'Yapay zeka otomasyonu vizyonuyla İstanbul\'da kurulduk.', icon: 'fas fa-flag' },
    { year: '2021', title: 'İlk Müşteri Başarısı', description: 'İlk kurumsal müşterimizle %50 operasyonel verimlilik artışı sağladık.', icon: 'fas fa-rocket' },
    { year: '2022', title: 'AR-GE Merkezi', description: 'Teknopark İstanbul\'da AR-GE merkezimizi açtık ve ekibimizi genişlettik.', icon: 'fas fa-flask' },
    { year: '2023', title: 'Globalleşme', description: 'Londra ofisimizi açarak global pazara ilk adımı attık.', icon: 'fas fa-globe' },
    { year: '2024', title: 'Sektör Liderliği', description: '+500 kurumsal müşteri ve yeni yapay zeka ürünleriyle Türkiye\'de sektör lideri olduk.', icon: 'fas fa-trophy' }
];

export const WHY_MORTANAS_POINTS: ValueProposition[] = [
    { icon: 'fas fa-brain', title: 'Derin Sektör Uzmanlığı', description: 'Sadece teknoloji üretmiyoruz; turizmden e-ticarete kadar farklı sektörlerin dinamiklerini anlıyor ve buna özel çözümler geliştiriyoruz.' },
    { icon: 'fas fa-cogs', title: 'Uçtan Uca Çözüm', description: 'Danışmanlıktan, özel yazılım geliştirmeye, entegrasyondan 7/24 teknik desteğe kadar tüm dijital dönüşüm sürecinizde yanınızdayız.' },
    { icon: 'fas fa-sync-alt', title: 'Sürekli İnovasyon', description: 'AR-GE merkezimizde sürekli olarak en yeni yapay zeka teknolojilerini araştırıyor ve platformlarımızı güncel tutarak sizi rekabette daima bir adım önde tutuyoruz.' },
    { icon: 'fas fa-handshake-angle', title: 'Stratejik Ortaklık', description: 'Size sadece bir ürün satmıyor, işletmenizin hedeflerine ulaşması için teknoloji ortağınız olarak hareket ediyoruz. Başarınız, bizim başarımızdır.' },
];

export const FAQS: FAQ[] = [
    { question: 'Mortanas çözümleri her ölçekteki işletme için uygun mu?', answer: 'Evet. Hem küçük ve orta ölçekli işletmelerin (KOBİ) hem de büyük kurumsal firmaların ihtiyaçlarına yönelik esnek ve ölçeklenebilir çözümler sunuyoruz.' },
    { question: 'Mevcut yazılımlarımızla (CRM, ERP vb.) entegrasyon mümkün mü?', answer: 'Kesinlikle. Platformlarımız, API desteği sayesinde mevcut birçok popüler CRM, ERP ve diğer iş yönetimi yazılımlarıyla sorunsuz bir şekilde entegre olabilmektedir.' },
    { question: 'Yapay zekayı eğitmek için teknik bilgiye sahip olmam gerekiyor mu?', answer: 'Hayır. Kurulum sürecinde uzman ekibimiz, yapay zekayı sizin işletmenizin verileriyle eğitir. Sonrasında kullanımı son derece kolay bir panel üzerinden yeni bilgiler ekleyebilirsiniz.' },
    { question: 'Veri güvenliği nasıl sağlanıyor?', answer: 'Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda şifrelenerek saklanır.' },
];

export const PRESS_MENTIONS: PressMention[] = [
    { publicationLogoUrl: 'https://i.imgur.com/logo-webrazzi.png', title: 'Yerli girişim Mortanas, yapay zeka otomasyonu ile KOBİ\'leri dijitalleştiriyor.', link: '#', date: 'Mayıs 2024' },
    { publicationLogoUrl: 'https://i.imgur.com/logo-forbes.png', title: 'Geleceğin 10 Teknoloji Şirketi Arasında Mortanas da Yer Aldı.', link: '#', date: 'Mart 2024' },
    { publicationLogoUrl: 'https://i.imgur.com/logo-techcrunch.png', title: 'Mortanas raises $2M to expand its AI-powered customer service platform globally.', link: '#', date: 'Ocak 2024' }
];


export const CORPORATE_REFERENCES: Reference[] = [
    { name: "T.C. Sanayi ve Teknoloji Bakanlığı", logoUrl: "https://i.imgur.com/ref-sanayi.png" },
    { name: "TÜBİTAK", logoUrl: "https://i.imgur.com/ref-tubitak.png" },
    { name: "KOSGEB", logoUrl: "https://i.imgur.com/ref-kosgeb.png" },
    { name: "Teknopark İstanbul", logoUrl: "https://i.imgur.com/ref-teknopark.png" },
    { name: "Google for Startups", logoUrl: "https://i.imgur.com/ref-google.png" },
    { name: "Microsoft for Startups", logoUrl: "https://i.imgur.com/ref-microsoft.png" },
];

export const FEATURES: Feature[] = [
  {
    icon: <i className="fas fa-comments-dollar text-4xl text-blue-500"></i>,
    title: 'Sohbet Ticareti',
    description: 'WhatsApp, Instagram ve Facebook üzerinden 7/24 otomatik satış yapın.',
  },
  {
    icon: <i className="fas fa-headset text-4xl text-green-500"></i>,
    title: 'Akıllı Müşteri Hizmetleri',
    description: 'Yapay zeka sesli asistanı ile çağrı merkezinizi otomatikleştirin.',
  },
  {
    icon: <i className="fas fa-cogs text-4xl text-purple-500"></i>,
    title: 'Sektörel CRM Çözümleri',
    description: 'Otel, spa, spor salonu gibi sektörlere özel yönetim yazılımları.',
  },
  {
    icon: <i className="fas fa-chart-line text-4xl text-orange-500"></i>,
    title: 'Pazarlama Otomasyonu',
    description: 'Müşteri verilerini analiz ederek kişiselleştirilmiş kampanyalar oluşturun.',
  },
  {
    icon: <i className="fas fa-tasks text-4xl text-indigo-500"></i>,
    title: 'İş Akışı Otomasyonu',
    description: 'Tekrarlayan görevleri ve iş akışlarını otomatikleştirerek zaman kazanın.',
  },
  {
    icon: <i className="fas fa-file-invoice-dollar text-4xl text-red-500"></i>,
    title: 'Finansal Otomasyon',
    description: 'Fatura takibi, ödeme hatırlatmaları ve raporlama süreçlerini hızlandırın.',
  },
];


// FIX: This constant was missing.
export const AUTOMATION_PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Başlangıç',
        price: { monthly: 50, annually: 500, lifetime: 1200 },
        features: [
            "1 Otomasyon Çözümü",
            "2 Sosyal Medya Kanalı",
            "Temel Raporlama",
            "E-posta Desteği"
        ]
    },
    {
        name: 'İşletme',
        popular: true,
        price: { monthly: 150, annually: 1500, lifetime: 3500 },
        features: [
            "3 Otomasyon Çözümü",
            "5 Sosyal Medya Kanalı",
            "Gelişmiş Raporlama",
            "WhatsApp & Telefon Desteği"
        ]
    },
    {
        name: 'Profesyonel',
        price: { monthly: 350, annually: 3500, lifetime: 8000 },
        features: [
            "Sınırsız Otomasyon Çözümü",
            "Sınırsız Sosyal Medya Kanalı",
            "Özelleştirilmiş Raporlar",
            "Öncelikli Destek"
        ]
    },
    {
        name: 'Kurumsal',
        price: 'Teklif Alın',
        features: [
            "Özel Çözüm Geliştirme",
            "Yerinde Kurulum & Eğitim",
            "API Erişimi",
            "Özel Müşteri Temsilcisi"
        ]
    }
];

// FIX: This constant was missing.
export const APPLICATION_PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Otel Yönetimi (CRM)',
        price: { monthly: 450, annually: 4500, lifetime: 12000 },
        features: [
            "Rezervasyon Yönetimi",
            "Oda ve Kat Hizmetleri",
            "Misafir İlişkileri",
            "Online Yorum Takibi"
        ]
    },
    {
        name: 'Masaj & Wellness',
        popular: true,
        price: { monthly: 250, annually: 2500, lifetime: 7000 },
        features: [
            "Online Randevu Takvimi",
            "Müşteri & Personel Yönetimi",
            "Otomatik SMS Hatırlatmaları",
            "Paket Satışı ve Hediye Kartı"
        ]
    },
    {
        name: 'Spor & Fitness',
        price: { monthly: 220, annually: 2200, lifetime: 6500 },
        features: [
            "Üye & Ders Yönetimi",
            "Online Ödeme ve Tahsilat",
            "Turnike Entegrasyonu",
            "Markaya Özel Mobil Uygulama"
        ]
    },
    {
        name: 'Emlak Yönetimi (CRM)',
        price: { monthly: 320, annually: 3200, lifetime: 8500 },
        features: [
            "Potansiyel Müşteri Yönetimi",
            "Akıllı Portföy & İlan Yönetimi",
            "Satış & Pazarlama Otomasyonu",
            "Performans Raporları"
        ]
    },
    {
        name: 'Şirket Yönetimi (CRM)',
        price: { monthly: 180, annually: 1320, lifetime: 900 },
        features: [
            "Satış & Pazarlama Modülleri",
            "Proje & Görev Yönetimi",
            "Finans & Faturalandırma",
            "İnsan Kaynakları"
        ]
    }
];

export const TRAINING_PARTNER_LOGOS: Reference[] = [
    { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png' },
    { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
    { name: 'Amazon Web Services', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png' },
    { name: 'Meta', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.svg/512px-Meta-Logo.svg.png' },
    { name: 'NVIDIA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png' },
    { name: 'OpenAI', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/512px-OpenAI_Logo.svg.png' },
    { name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png' },
    { name: 'IBM', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png' },
    { name: 'Intel', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/512px-Intel-logo.svg.png' },
    { name: 'Tesla', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/512px-Tesla_logo.png' },
];

export const HOME_FAQS: FAQ[] = [
    { question: 'Mortanas tam olarak ne yapıyor?', answer: 'Mortanas, yapay zeka ve otomasyon teknolojilerini kullanarak işletmelerin müşteri hizmetleri, pazarlama ve satış gibi operasyonel süreçlerini daha verimli hale getiren akıllı yazılım çözümleri sunar.' },
    { question: 'Verilerimin güvenliği nasıl sağlanıyor?', answer: 'Veri güvenliği en büyük önceliğimizdir. Tüm verileriniz, KVKK ve GDPR uyumlu, yüksek güvenlikli bulut sunucularda uçtan uca şifrelenerek saklanır.' },
    { question: 'Yapay zeka otomasyonu işletmeme nasıl fayda sağlar?', answer: 'Otomasyon, tekrarlayan görevleri 7/24 insan hatası olmadan yaparak maliyetlerinizi düşürür, personelinizin daha stratejik işlere odaklanmasını sağlar ve müşteri memnuniyetini artırır.' },
    { question: 'Sosyal medya otomasyonu hangi kanalları destekliyor?', answer: 'Başta WhatsApp Business API, Instagram ve Facebook Messenger olmak üzere, web sitenizdeki canlı sohbet gibi birçok kanalı tek bir platformda birleştiriyoruz.' },
    { question: 'Hangi sektörler için çözümleriniz var?', answer: 'Turizm, e-ticaret, sağlık, emlak ve daha birçok sektöre özel, ihtiyaçlarına göre tasarlanmış otomasyon ve CRM çözümleri sunuyoruz.' },
    { question: 'Sesli yapay zeka asistanı insan sesinden ayırt edilebilir mi?', answer: 'Evet, kullandığımız en son teknoloji ses sentezleme (TTS) ve doğal dil anlama (NLU) sayesinde, yapay zeka asistanlarımız insan kadar doğal ve akıcı bir diyalog kurabilir.' },
    { question: 'Kurulum süreci ne kadar sürer ve teknik bilgi gerektirir mi?', answer: 'Hiçbir teknik bilgiye ihtiyacınız yok. Anahtar teslim kurulum sürecimiz, otomasyonun karmaşıklığına bağlı olarak genellikle birkaç iş günü içinde tamamlanır. Tüm süreci uzman ekibimiz yönetir.' },
    { question: 'Küçük işletmeler (KOBİ) için de uygun çözümleriniz var mı?', answer: 'Kesinlikle. Çözümlerimiz her ölçekteki işletmenin bütçesine ve ihtiyaçlarına uyacak şekilde esnek ve ölçeklenebilir olarak tasarlanmıştır.' },
    { question: 'Mevcut yazılımlarımla (CRM, e-ticaret vb.) entegrasyon mümkün mü?', answer: 'Evet, platformlarımız API desteği sayesinde mevcut birçok popüler CRM, e-ticaret altyapısı ve iş yönetimi yazılımlarıyla sorunsuz bir şekilde entegre olabilir.' },
    { question: 'Yapay zekayı kendi işletmemize göre özelleştirebiliyor muyuz?', answer: 'Evet, en büyük gücümüz bu. Yapay zeka modellerini sizin işletmenizin ürünleri, hizmetleri, iletişim dili ve sıkça sorulan soruları ile özel olarak eğitiyoruz.' },
    { question: 'Fiyatlandırma modeliniz nasıl?', answer: 'Fiyatlandırmamız, seçtiğiniz çözüm, kullanım hacmi ve ihtiyaç duyduğunuz özelliklere göre değişen esnek abonelik modellerine dayanmaktadır. Her bütçeye uygun bir çözümümüz mevcuttur.' },
    { question: 'Destek hizmetleriniz neleri kapsıyor?', answer: 'Kurulum, eğitim ve sonrasında 7/24 teknik desteği içeren kapsamlı bir hizmet sunuyoruz. Uzman ekibimiz, her zaman size yardımcı olmak için hazırdır.' },
    { question: 'Farklı dillerde destek var mı?', answer: 'Evet, yapay zeka çözümlerimiz 50+ dilde hizmet verebilmektedir. İşletmenizin global pazarlara açılmasına yardımcı olur.' },
    { question: 'Kampanya yönetimi nasıl yapılıyor?', answer: 'Yapay zeka, müşterilerinizin davranışlarını analiz ederek kişiselleştirilmiş kampanya mesajları oluşturur ve doğru zamanda doğru kitleye iletir.' },
    { question: 'Kullanımı zor mu?', answer: 'Kesinlikle hayır. Tüm çözümlerimiz kullanıcı dostu bir arayüze sahiptir. Herhangi bir kodlama bilmeden de kolaylıkla yönetim sağlayabilirsiniz.' },
    { question: 'Güncellemeler ücretsiz mi?', answer: 'Aboneliğiniz süresince sistemdeki tüm altyapı güncellemelerinden ve yeni standart özelliklerden ücretsiz olarak faydalanırsınız.' },
    { question: 'Personel eğitimine gerek var mı?', answer: 'Sistemlerimiz otonom çalışacak şekilde tasarlansa da, yönetim paneli kullanımı için ekibinize ücretsiz eğitimler sağlıyoruz.' },
    { question: 'Ödeme entegrasyonları destekleniyor mu?', answer: 'Evet, Stripe, Iyzico, PayTR gibi önde gelen güvenli ödeme sağlayıcılarıyla entegrasyon seçeneklerimiz mevcuttur.' },
    { question: 'Kişisel Verileri Koruma Kanununa (KVKK) uyumlu mu?', answer: 'Tüm iş süreçlerimiz ve altyapımız KVKK ve GDPR yönetmeliklerine %100 uyumlu şekilde çalışmaktadır.' },
    { question: 'Sistem çökerse ne olur?', answer: 'Yüksek bulunabilirlik prensibiyle çalışan global sunucu altyapımız sayesinde %99.9 çalışma süresi (uptime) garantisi veriyoruz.' }
];

export const SECTOR_PRICING_PLANS: SectorPricingPlan[] = [
    {
        sectorSlug: 'saglik-cozumlerimiz',
        setupFee: 750,
        tiers: [
            { name: 'Başlangıç', description: "Küçük klinikler ve muayenehaneler için ideal.", prices: { monthly: 150, threeMonths: 140, sixMonths: 130, annually: 120 }, features: ["Tüm 8 Çözüm Modülü", "HBYS Entegrasyonu (Standart)", "500 Aktif Hasta Yönetimi", "Standart Raporlama"] },
            { name: 'Profesyonel', description: "Büyüyen klinikler ve tıp merkezleri için.", prices: { monthly: 450, threeMonths: 425, sixMonths: 400, annually: 375 }, features: ["Tüm 8 Çözüm Modülü", "Gelişmiş HBYS Entegrasyonu", "5,000 Aktif Hasta Yönetimi", "Detaylı Raporlama ve Analitik", "Öncelikli Destek"], popular: true },
            { name: 'Kurumsal', description: "Hastaneler ve zincir klinikler için ölçeklenebilir çözüm.", prices: { monthly: 950, threeMonths: 900, sixMonths: 850, annually: 800 }, features: ["Tüm 8 Çözüm Modülü", "Özel Entegrasyonlar", "Sınırsız Hasta Yönetimi", "Özelleştirilebilir Raporlar", "Özel Müşteri Temsilcisi"] }
        ]
    },
    {
        sectorSlug: 'egitim-cozumlerimiz',
        setupFee: 500,
        tiers: [
            { name: 'Başlangıç', description: "Butik kurslar ve özel ders merkezleri için.", prices: { monthly: 120, threeMonths: 110, sixMonths: 105, annually: 100 }, features: ["Temel İletişim Modülleri", "500 Aktif Öğrenci", "Otomatik Duyurular"] },
            { name: 'Profesyonel', description: "Kolejler ve büyük eğitim kurumları için.", prices: { monthly: 350, threeMonths: 330, sixMonths: 310, annually: 290 }, features: ["Tüm İletişim Modülleri", "ÖBS Entegrasyonu", "5,000 Aktif Öğrenci", "Veli & Öğrenci Portalı"], popular: true },
            { name: 'Kurumsal', description: "Üniversiteler ve zincir okullar için.", prices: { monthly: 800, threeMonths: 750, sixMonths: 710, annually: 670 }, features: ["Tüm Profesyonel Özellikleri", "Sınırsız Öğrenci", "Özel API Erişimi", "Yerinde Eğitim"] }
        ]
    },
    {
        sectorSlug: 'eticaret-cozumlerimiz',
        setupFee: 600,
        tiers: [
            { name: 'Başlangıç', description: "Yeni başlayan e-ticaret girişimleri için.", prices: { monthly: 130, threeMonths: 120, sixMonths: 115, annually: 110 }, features: ["Omnichannel İletişim", "Temel Chatbot", "500 Müşteri Etkileşimi/ay"] },
            { name: 'Profesyonel', description: "Büyüyen markalar ve KOBİ'ler için.", prices: { monthly: 380, threeMonths: 360, sixMonths: 340, annually: 320 }, features: ["Tüm Özellikler", "Stok Takibi Entegrasyonu", "5,000 Müşteri Etkileşimi/ay", "Detaylı Raporlama"], popular: true },
            { name: 'Kurumsal', description: "Yüksek hacimli e-ticaret operasyonları için.", prices: { monthly: 850, threeMonths: 800, sixMonths: 760, annually: 720 }, features: ["Tüm Özellikler", "Sınırsız Etkileşim", "ERP Entegrasyonu", "Özel Müşteri Temsilcisi"] }
        ]
    },
    {
        sectorSlug: 'otomotiv-cozumlerimiz',
        setupFee: 700,
        tiers: [
            { name: 'Başlangıç', description: "Küçük galeriler ve servisler için.", prices: { monthly: 140, threeMonths: 130, sixMonths: 125, annually: 115 }, features: ["Servis Hatırlatmaları", "Temel Chatbot", "Test Sürüşü Randevuları"] },
            { name: 'Profesyonel', description: "Yetkili bayiler ve büyük servisler için.", prices: { monthly: 400, threeMonths: 380, sixMonths: 360, annually: 340 }, features: ["Tüm Özellikler", "CRM Entegrasyonu", "Kampanya Yönetimi", "Detaylı Raporlama"], popular: true },
            { name: 'Kurumsal', description: "Distribütörler ve zincir bayiler için.", prices: { monthly: 900, threeMonths: 850, sixMonths: 800, annually: 760 }, features: ["Tüm Özellikler", "Özel Entegrasyonlar", "Çoklu Lokasyon Yönetimi", "Özel Müşteri Temsilcisi"] }
        ]
    },
     {
        sectorSlug: 'hukuk-cozumlerimiz',
        setupFee: 800,
        tiers: [
            { name: 'Bireysel Avukat', description: "Tek avukatlar ve butik ofisler için.", prices: { monthly: 160, threeMonths: 150, sixMonths: 140, annually: 130 }, features: ["Müvekkil İletişimi", "Randevu Planlama", "Temel Dava Takibi"] },
            { name: 'Hukuk Bürosu', description: "Orta ve büyük ölçekli bürolar için.", prices: { monthly: 480, threeMonths: 450, sixMonths: 425, annually: 400 }, features: ["Tüm Özellikler", "Belge Yönetimi Entegrasyonu", "Otomatik Hatırlatmalar", "Ekip Yönetimi"], popular: true },
            { name: 'Kurumsal', description: "Büyük hukuk firmaları ve kurumsal hukuk departmanları için.", prices: { monthly: 1100, threeMonths: 1040, sixMonths: 980, annually: 920 }, features: ["Tüm Özellikler", "Özel Raporlama", "API Erişimi", "Uçtan Uca Şifreleme"] }
        ]
    },
    {
        sectorSlug: 'restoran-cozumlerimiz',
        setupFee: 450,
        tiers: [
            { name: 'Başlangıç', description: "Küçük kafe ve restoranlar için.", prices: { monthly: 90, threeMonths: 85, sixMonths: 80, annually: 75 }, features: ["Online Rezervasyon", "Temel Chatbot", "Menü Bilgilendirme"] },
            { name: 'Profesyonel', description: "Yoğun restoranlar ve zincirler için.", prices: { monthly: 250, threeMonths: 235, sixMonths: 220, annually: 210 }, features: ["Tüm Özellikler", "Sipariş Takibi", "Geri Bildirim Toplama", "Kampanya Yönetimi"], popular: true },
            { name: 'Kurumsal', description: "Büyük restoran grupları için.", prices: { monthly: 600, threeMonths: 570, sixMonths: 540, annually: 510 }, features: ["Tüm Özellikler", "POS Entegrasyonu", "Merkezi Yönetim", "Özel Raporlama"] }
        ]
    },
     {
        sectorSlug: 'fitness-cozumlerimiz',
        setupFee: 400,
        tiers: [
            { name: 'Stüdyo', description: "Butik stüdyolar ve kişisel antrenörler için.", prices: { monthly: 80, threeMonths: 75, sixMonths: 70, annually: 65 }, features: ["Üyelik Yönetimi (50 Üye)", "Randevu Yönetimi", "Temel İletişim"] },
            { name: 'Spor Salonu', description: "Orta ölçekli spor salonları için.", prices: { monthly: 220, threeMonths: 205, sixMonths: 195, annually: 185 }, features: ["Üyelik Yönetimi (500 Üye)", "Tüm İletişim Modülleri", "Grup Ders Yönetimi", "Raporlama"], popular: true },
            { name: 'Zincir Kulüp', description: "Çok şubeli spor merkezleri için.", prices: { monthly: 550, threeMonths: 520, sixMonths: 490, annually: 460 }, features: ["Sınırsız Üye", "Tüm Özellikler", "Merkezi Yönetim", "Özel Entegrasyonlar"] }
        ]
    },
    {
        sectorSlug: 'sigorta-cozumlerimiz',
        setupFee: 650,
        tiers: [
            { name: 'Acente', description: "Bireysel acenteler ve küçük ofisler için.", prices: { monthly: 130, threeMonths: 120, sixMonths: 115, annually: 110 }, features: ["Poliçe Sorgulama Chatbotu", "Teklif Hazırlama Desteği", "Müşteri İletişimi"] },
            { name: 'Bölge', description: "Bölge müdürlükleri ve büyük acenteler için.", prices: { monthly: 380, threeMonths: 360, sixMonths: 340, annually: 320 }, features: ["Tüm Özellikler", "Hasar Dosyası Takibi", "Otomatik Hatırlatmalar", "Performans Raporları"], popular: true },
            { name: 'Şirket', description: "Sigorta şirketleri için merkezi çözüm.", prices: { monthly: 950, threeMonths: 900, sixMonths: 850, annually: 800 }, features: ["Tüm Özellikler", "CRM Entegrasyonu", "Risk Analizi Desteği", "Özel Müşteri Temsilcisi"] }
        ]
    },
     {
        sectorSlug: 'guzellik-salonu-cozumlerimiz',
        setupFee: 350,
        tiers: [
            { name: 'Başlangıç', description: "Tek kişilik veya küçük salonlar için.", prices: { monthly: 70, threeMonths: 65, sixMonths: 60, annually: 55 }, features: ["Randevu Yönetimi", "Temel Chatbot", "Otomatik Hatırlatmalar"] },
            { name: 'Profesyonel', description: "Büyüyen salonlar ve estetik merkezleri için.", prices: { monthly: 190, threeMonths: 180, sixMonths: 170, annually: 160 }, features: ["Tüm Özellikler", "Paket Satışı Yönetimi", "Toplu Kampanya Mesajları", "Personel Performans Takibi"], popular: true },
            { name: 'Zincir', description: "Çok şubeli güzellik merkezleri için.", prices: { monthly: 450, threeMonths: 425, sixMonths: 400, annually: 380 }, features: ["Tüm Özellikler", "Merkezi Müşteri Yönetimi", "Stok Takibi Entegrasyonu", "Özel Raporlama"] }
        ]
    },
    {
        sectorSlug: 'diyetisyen-cozumlerimiz',
        setupFee: 300,
        tiers: [
            { name: 'Bireysel', description: "Bireysel çalışan diyetisyenler için.", prices: { monthly: 60, threeMonths: 55, sixMonths: 50, annually: 45 }, features: ["Randevu Yönetimi", "Danışan İletişimi", "Otomatik Hatırlatmalar"] },
            { name: 'Klinik', description: "Diyet ve beslenme klinikleri için.", prices: { monthly: 180, threeMonths: 170, sixMonths: 160, annually: 150 }, features: ["Tüm Özellikler", "Dijital Form Yönetimi", "Grup Mesajlaşmaları", "Detaylı Raporlama"], popular: true },
            { name: 'Merkez', description: "Büyük beslenme danışmanlık merkezleri için.", prices: { monthly: 400, threeMonths: 380, sixMonths: 360, annually: 340 }, features: ["Tüm Özellikler", "Çoklu Diyetisyen Yönetimi", "API Erişimi", "Özel Entegrasyonlar"] }
        ]
    },
     {
        sectorSlug: 'emlakci-cozumlerimiz',
        setupFee: 550,
        tiers: [
            { name: 'Danışman', description: "Bireysel emlak danışmanları için.", prices: { monthly: 100, threeMonths: 95, sixMonths: 90, annually: 85 }, features: ["7/24 Müşteri Karşılama", "İlan Eşleştirme", "Randevu Planlama"] },
            { name: 'Ofis', description: "Emlak ofisleri için merkezi çözüm.", prices: { monthly: 280, threeMonths: 265, sixMonths: 250, annually: 235 }, features: ["Tüm Özellikler", "Portal Entegrasyonu", "Otomatik Takip Mesajları", "Danışman Performans Raporları"], popular: true },
            { name: 'Zincir', description: "Çok şubeli emlak zincirleri için.", prices: { monthly: 700, threeMonths: 660, sixMonths: 620, annually: 590 }, features: ["Tüm Özellikler", "Merkezi Portföy Yönetimi", "Gelişmiş Analitikler", "Özel Müşteri Temsilcisi"] }
        ]
    }
];