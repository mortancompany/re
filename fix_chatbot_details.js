import fs from 'fs';

let content = fs.readFileSync('constants.tsx', 'utf8');

const featuresArray = `    features: [
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
    ],`;

const benefitsArray = `    benefits: [
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
    ],`;

const aiFeaturesObj = `    aiFeatures: {
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
    },`;

const targetAudienceArray = `    targetAudience: [
      { name: "E-Ticaret Firmaları", icon: "fas fa-shopping-cart" },
      { name: "Oteller ve Restoranlar", icon: "fas fa-hospitality" },
      { name: "Sağlık Merkezleri", icon: "fas fa-heartbeat" },
      { name: "Emlak Ajansları", icon: "fas fa-building" },
      { name: "Danışmanlık Şirketleri", icon: "fas fa-handshake" },
      { name: "Güzellik ve Spa Tesisleri", icon: "fas fa-spa" }
    ],`;

content = content.replace('    features: [],', featuresArray);
content = content.replace('    benefits: [],', benefitsArray);
content = content.replace('    aiFeatures: { title: "Yapay Zeka Destekli Chatbot Özellikleri", subtitle: "Müşterilerinizi anında karşılayın", features: [] },', aiFeaturesObj);
content = content.replace('    targetAudience: [],', targetAudienceArray);

fs.writeFileSync('constants.tsx', content);
