import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface Urun {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  video?: string;
  features: string[];
  automationSlug?: string;
}

export const URUNLER_DATA: Record<string, { categoryTitle: string; products: Urun[] }> = {
  media: {
    categoryTitle: 'Mortanas Media Paketleri',
    products: [
      {
        id: 'media-1',
        title: '15 Saniyelik Video',
        description: 'İşletmenize özel kısa, etkili ve dikkat çekici video paketi.',
        price: '2.500 ₺ + KDV / Adet',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1397050636/tr/video/background-with-technological-multi-screen-wall-with-tv-sets-and-computer-displays-playing.mp4?s=mp4-640x640-is&k=20&c=0fvn8RtWvbsEk0S1aYWSryySERiab3fodY1ovgW7sdA=',
        features: [
          'Tekli Alım: 2.500 ₺ + KDV', 
          '3\'lü Paket (%10 İndirim): 6.750 ₺ + KDV', 
          '6\'lı Paket (%15 İndirim): 12.750 ₺ + KDV', 
          '10\'lu Paket (%25 İndirim): 18.750 ₺ + KDV'
        ]
      },
      {
        id: 'media-2',
        title: '30 Saniyelik Video',
        description: 'Hikayenizi daha iyi anlatabileceğiniz, ideal uzunlukta video paketi.',
        price: '4.500 ₺ + KDV / Adet',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2199601251/tr/video/digital-world-map-background-4k-stock-video.mp4?s=mp4-640x640-is&k=20&c=YO5CH3M6pyHiz9mw33dSgqCpI5j4ZnD4ybMaDUF2f9w=',
        features: [
          'Tekli Alım: 4.500 ₺ + KDV',
          '3\'lü Paket (%10 İndirim): 12.150 ₺ + KDV',
          '6\'lı Paket (%15 İndirim): 22.950 ₺ + KDV',
          '10\'lu Paket (%25 İndirim): 33.750 ₺ + KDV'
        ]
      },
      {
        id: 'media-3',
        title: '45 Saniyelik Video',
        description: 'Ürün ve hizmetlerinizi detaylıca tanıtabileceğiniz kapsamlı video paketi.',
        price: '6.000 ₺ + KDV / Adet',
        image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1412702715/tr/video/asian-sports-event-crew-working-at-backstage-with-control-panel-on-stage-lighting-sound.mp4?s=mp4-640x640-is&k=20&c=86yBQhZoe6_Eol49nhFuwXRXaAgh0mjIXY1mDZtU0Uk=',
        features: [
          'Tekli Alım: 6.000 ₺ + KDV',
          '3\'lü Paket (%10 İndirim): 16.200 ₺ + KDV',
          '6\'lı Paket (%15 İndirim): 30.600 ₺ + KDV',
          '10\'lu Paket (%25 İndirim): 45.000 ₺ + KDV'
        ]
      },
      {
        id: 'media-4',
        title: '60 Saniyelik Video',
        description: 'Tam teşekküllü, senaryolu ve yönetmenli reklam filmi standartlarında.',
        price: '8.500 ₺ + KDV / Adet',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
        features: [
          'Tekli Alım: 8.500 ₺ + KDV',
          '3\'lü Paket (%10 İndirim): 22.950 ₺ + KDV',
          '6\'lı Paket (%15 İndirim): 43.350 ₺ + KDV',
          '10\'lu Paket (%25 İndirim): 63.750 ₺ + KDV'
        ]
      },
      {
        id: 'media-5',
        title: 'Ultra Kurumsal Tanıtım Filmi',
        description: 'Ultra kurumsal gerçeklikte, 1 dakikalık profesyonel kısa tanıtım filmi.',
        price: '15.000 ₺ + KDV / Adet',
        image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop',
        features: [
          'Tekli Alım: 15.000 ₺ + KDV',
          '3\'lü Paket (Tane 10.000 ₺ + KDV): 30.000 ₺ + KDV',
          '6\'lı Paket (Tane 7.500 ₺ + KDV): 45.000 ₺ + KDV',
          'Kurgu, Montaj ve AI Seslendirme Dahil'
        ]
      },
      {
        id: 'media-6',
        title: 'Kurumsal Prestij Haber Hizmeti',
        description: 'Google News kayıtlı, işletme adınızla aramalarda üst sıralara çıkan sitelerde firmanıza özel prestij haberi.',
        price: '2.000 ₺ + KDV / Haber',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
        features: [
          '1 Haber (News Kayıtlı): 2.000 ₺ + KDV',
          '3 Haber Paketi: 5.000 ₺ + KDV',
          '10 Haber Paketi: 10.000 ₺ + KDV',
          'Google aramalarında üst sıralara çıkma'
        ]
      }
    ]
  },
  digital: {
    categoryTitle: 'Mortanas Digital Paketleri',
    products: [
      {
        id: 'digital-1',
        title: 'Kurumsal Web Sitesi Tasarımı',
        description: 'Kurumsal tanıtım siteleri ve landing page tasarımları. (Sadece tasarım, gelişmiş web yazılımı içermez)',
        price: '20.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2199601251/tr/video/digital-world-map-background-4k-stock-video.mp4?s=mp4-640x640-is&k=20&c=YO5CH3M6pyHiz9mw33dSgqCpI5j4ZnD4ybMaDUF2f9w=',
        features: ['Toplam 10 Sayfa Tasarımı', 'Özel UI/UX Landing Page', 'Mobil (Responsive) Uyum', 'SEO Uyumlu Temel Altyapı']
      },
      {
        id: 'digital-2',
        title: 'E-Ticaret Platformu',
        description: 'Ürünlerinizi çevrimiçi satabileceğiniz tam donanımlı, güvenli e-ticaret siteleri.',
        price: '80.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1338950858/tr/video/high-tech-startup-concept-innovative-male-software-engineer-standing-doing-big-data-analysis.mp4?s=mp4-640x640-is&k=20&c=PBlJ5pbA6X-0MNw7mKz6qsE3-ecIraEr3_fOQkUAgZI=',
        features: ['Güvenli Ödeme Altyapısı', 'Stok Yönetimi', 'Kargo Entegrasyonları', 'Sipariş Takip Paneli']
      },
      {
        id: 'digital-3',
        title: 'Sektörel Özel Yazılım (CRM)',
        description: '20+ sektöre özel hazır yazılım, her yazılımda 50\'den fazla modül. İşletmenizi tek merkezden yönetin.',
        price: '40.000 ₺ + KDV (Lisans)',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1046965704/tr/video/programlama-kaynak-kodu-arka-plan.mp4?s=mp4-640x640-is&k=20&c=V9wfkyEFVCp1ckPFKtEKgPLyrfBr61lgc4MXR0lf7_g=',
        features: ['20+ Sektöre Özel Çözüm', '50+ Gelişmiş Modül', 'Müşteri Veri Takibi (CRM)', 'Tek Seferlik Lisans Ücreti']
      },
      {
        id: 'digital-4',
        title: 'Gelişmiş Web Yazılım',
        description: 'İnternet sitesine entegre yazılımlar ve modüller. Web paneli olan gelişmiş sistemler.',
        price: '50.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/843864124/tr/video/avrupa-%C3%BCzerinden-ba%C4%9Flant%C4%B1-k%C3%BCresel-ileti%C5%9Fim-a%C4%9F%C4%B1-%C3%BCzerinden.mp4?s=mp4-640x640-is&k=20&c=6ED3owniB_YO4nHQJNVn_-fgLNbM4cWldhxdwCKoTsE=',
        features: ['Gelişmiş Yönetim Paneli', 'Özel Entegrasyonlar', 'Özel Modül Geliştirme', 'Ölçeklenebilir Altyapı']
      },
      {
        id: 'digital-5',
        title: 'Temel SEO Paketi',
        description: 'Web siteniz için temel düzeyde SEO çalışmaları ve yapılandırmaları.',
        price: '15.000 ₺ + KDV / 1 Ay',
        image: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1433115458/tr/video/social-media-growing-chart.mp4?s=mp4-640x640-is&k=20&c=meMFzl0tls3BITTNDk1tBLV6_qon-rpb_xt7RXKd3Fs=',
        features: [
          '1 Aylık (Başlangıç): 15.000 ₺ + KDV',
          '3 Aylık Paket: 35.000 ₺ + KDV',
          '6 Aylık Paket: 60.000 ₺ + KDV',
          'Temel SEO Yapılandırmaları'
        ]
      },
      {
        id: 'digital-6',
        title: 'Gelişmiş SEO Paketi',
        description: 'Gelişmiş SEO + premium backlinkler, aylık minimum +50 backlink garantisi ve makale otomasyonu.',
        price: '25.000 ₺ + KDV / 1 Ay',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/483547297/tr/video/mobile-apps-seamless-background-loop.mp4?s=mp4-640x640-is&k=20&c=CmkqHNRFGRl3vHBz6vz24Bo9Aqe-nLeZ5VFDocy-U-s=',
        features: [
          '1 Aylık: 25.000 ₺ + KDV',
          '3 Aylık Paket: 60.000 ₺ + KDV',
          '6 Aylık Paket: 90.000 ₺ + KDV',
          'Premium Backlink & Makale Otomasyonu'
        ]
      },
      {
        id: 'digital-7',
        title: 'Mobil Uygulama Geliştirme (Android)',
        description: 'İşletmeniz veya yenilikçi fikriniz için sadece Android platformuna özel mobil uygulama geliştirme.',
        price: 'Tek Seferlik: 50.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1316274253/tr/video/big-city-i%C5%9Fadam%C4%B1-ak%C4%B1ll%C4%B1-telefon-kullan%C4%B1yor-kalabal%C4%B1k-sokakta-duruyor-cep-telefonundan-global.mp4?s=mp4-640x640-is&k=20&c=fsicn3f_bpYufp4m_1h_2FyyZlHmVhUCe8zwZ1HZXTA=',
        features: ['Modern UI/UX', 'Google Play Store Yayını', 'Gelişmiş Yönetim Paneli', 'Özel Entegrasyonlar']
      },
      {
        id: 'digital-8',
        title: 'Mobil Uygulama Geliştirme (iOS)',
        description: 'İşletmeniz veya yenilikçi fikriniz için hedef kitlenize ulaşacak sadece iOS platformuna özel mobil uygulama.',
        price: 'Tek Seferlik: 70.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
        features: ['Modern UI/UX', 'App Store Yayını', 'Gelişmiş Yönetim Paneli', 'Özel Entegrasyonlar']
      },
      {
        id: 'digital-9',
        title: 'Mobil Uygulama Geliştirme (iOS + Android)',
        description: 'Hem iOS hem de Android için ortak altyapıya veya native kodlamaya sahip çift platform uygulama.',
        price: 'Tek Seferlik: 90.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop',
        features: ['Tüm Platformlarda Uyum', 'Store Yayın Departmanı', 'Çapraz Platform (React Native/Flutter vb.)', 'Tek Merkezden Yönetim']
      }
    ]
  },
  flow: {
    categoryTitle: 'Mortanas Flow Paketleri',
    products: [
      {
        id: 'flow-1',
        title: 'Yapay Zeka Chatbot (WhatsApp & IG)',
        description: 'Müşterilerinizin sorularını 7/24 anında yanıtlayan akıllı yapay zeka botları.',
        price: 'Tek Seferlik Lisans: 20.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1648869084/tr/video/automated-pcb-assembly-line-conveyor-with-advanced-high-precision-robot-arms-at-electronics.mp4?s=mp4-640x640-is&k=20&c=FPWUJGngFwExA3Ry8lHPos1eiok0sQr8Wwpu4oQw09k=',
        features: ['Ortalama <5sn Yanıt', 'Geçmişi Hatırlama', 'İnsan Temsilciye Aktarma', 'Çoklu Dil Desteği'],
        automationSlug: 'yapay-zeka-chatbot'
      },
      {
        id: 'flow-2',
        title: 'Çağrı Karşılama (Voice AI)',
        description: 'Müşteri telefonlarınızı insan sesiyle karşılayan ve randevu alabilen sesli yapay zeka.',
        price: 'Tek Seferlik Lisans: 30.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1581447109200-bf2769116351?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2220054148/tr/video/agentic-ai-system.mp4?s=mp4-640x640-is&k=20&c=a6_HSrWD_maYLGdysKlSziHjcRtpmjJ0biM_tyPZzvg=',
        features: ['Doğal İnsan Sesi', 'Randevu Entegrasyonu', 'Otomatik Arama (Outbound)', '%90 Maliyet Tasarrufu'],
        automationSlug: 'cagri-karsilama-voice-ai'
      },
      {
        id: 'flow-3',
        title: 'İş Akışı Otomasyonu (RPA)',
        description: 'Faturalama, veri girişi gibi tekrarlayan işleri insansız olarak hatasız otomatize edin.',
        price: 'Tek Seferlik Lisans: 40.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2224123273/tr/video/workflow-diagram-illustrating-an-ai-agent-handling-customer-response-order-management-and.mp4?s=mp4-640x640-is&k=20&c=W_-KpjUv9SyVovRDgO1ADkkNDky-twWGiDbn0YUHHZk=',
        features: ['Sıfır Hata Payı', 'API Entegrasyonları', 'Günlük/Aylık Raporlama', '24 Saat Kesintisiz Çalışma'],
        automationSlug: 'is-akisi-otomasyonu-rpa'
      },
      {
        id: 'flow-4',
        title: 'Akıllı Sosyal Medya Otomasyonu',
        description: 'Markanıza uygun görsel ve metinleri yapay zeka ile üretip tüm platformlarda otomatik paylaşın.',
        price: 'Tek Seferlik Lisans: 40.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2228596165/tr/video/businessman-interacting-with-ai-agent-interface-using-futuristic-holographic-icons.mp4?s=mp4-640x640-is&k=20&c=PSw8PHvxRyKHaJ7MwZIYenDDZShupXXFA49gsH-NGF8=',
        features: ['Otomatik İçerik Üretimi', 'Zamanlanmış Paylaşım', 'Rakip Analizi', 'Trend Takibi'],
        automationSlug: 'sosyal-medya-otomasyonu'
      },
      {
        id: 'flow-5',
        title: 'İK ve İşe Alım Asistanı',
        description: 'CV\'leri otomatik olarak tarayan, yetenekleri puanlayan ve ön görüşmeleri planlayan akıllı sistem.',
        price: 'Tek Seferlik Lisans: 30.000 ₺ + KDV',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2239970078/tr/video/artificial-intelligence-people-technology-automated-futuristic-talking-discussion-online.mp4?s=mp4-640x640-is&k=20&c=z-KdQDr9DtJ8qcC-igMmdfTTstSEStwbjwlPA1VllQc=',
        features: ['Otomatik CV Analizi', 'Aday Derecelendirme', 'Mülakat Planlama', 'Otomatik E-posta Akışı'],
        automationSlug: 'ik-ve-ise-alim-asistani'
      },
      {
        id: 'flow-6',
        title: 'Dinamik Fiyatlandırma & Stok (E-Ticaret)',
        description: 'Rakipleri ve piyasa verisini analiz ederek ürün fiyatlarınızı otomatik optimize eden akıllı otomasyon.',
        price: 'Tek Seferlik Lisans: 40.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2221356647/tr/video/ai-agent-system.mp4?s=mp4-640x640-is&k=20&c=EyAoY0YRCFTSPsDmyOCKkC_n0yiPiJvAEVVkaniXy5k=',
        features: ['Anlık Fiyat Güncelleme', 'Rakip Fiyat Takibi', 'Stok Analizi & Uyarı', 'Kar Marjı Optimizasyonu'],
        automationSlug: 'dinamik-fiyatlandirma-stok'
      },
      {
        id: 'flow-7',
        title: 'Kişiselleştirilmiş E-Posta Pazarlama',
        description: 'Müşteri davranışlarına göre kişiselleştirilmiş dönüşüm odaklı satış maillerini otomatik oluşturup gönderin.',
        price: 'Tek Seferlik Lisans: 40.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
        features: ['Müşteri Segmentasyonu', 'AI Metin Yazarlığı', 'Düşük Spam Skoru', 'A/B Test Otomasyonu'],
        automationSlug: 'kisisellestirilmis-e-posta-pazarlama'
      },
      {
        id: 'flow-8',
        title: 'Müşteri İtibar ve Yorum Yönetimi',
        description: 'Google, Trendyol ve sosyal medyadaki tüm yorumları sentiment analizi ile inceleyip markanıza uygun otomatik yanıtlar verin.',
        price: 'Tek Seferlik Lisans: 30.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop',
        features: ['Duygu Analizi (Sentiment)', 'Otomatik AI Yanıtları', 'Kriz Durumu Uyarıları', 'Çoklu Platform Tek Ekran'],
        automationSlug: 'musteri-itibar-yorum-yonetimi'
      },
      {
        id: 'flow-9',
        title: 'Akıllı Toplantı ve Transkript Asistanı',
        description: 'Zoom ve Teams toplantılarınıza katılıp not tutan, özetleyen ve alınacak aksiyonları otomatik çalışanlara atayan asistan.',
        price: 'Tek Seferlik Lisans: 30.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
        features: ['Anlık Sesli Transkript', 'Otomatik Özet Çıkarma', 'Görev Atama', 'Tüm Dillerde Destek'],
        automationSlug: 'akilli-toplanti-transkript-asistani'
      },
      {
        id: 'flow-10',
        title: 'Haber Otomasyonu',
        description: 'Farklı kaynaklardan sektörünüzle ilgili haberleri tarayıp sitenize veya bülteninize uygun formatta yeniden yazan otomasyon.',
        price: 'Tek Seferlik Lisans: 35.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/1433115458/tr/video/social-media-growing-chart.mp4?s=mp4-640x640-is&k=20&c=meMFzl0tls3BITTNDk1tBLV6_qon-rpb_xt7RXKd3Fs=',
        features: ['Çoklu Kaynak Tarama', 'Özgün İçerik Üretimi', 'Otomatik Yayınlama', 'Trend Başlık Üretimi'],
        automationSlug: 'haber-otomasyonu'
      },
      {
        id: 'flow-11',
        title: 'Emlak Otomasyonu',
        description: 'İlanları otomatik oluşturma, potansiyel alıcılara uygun gayrimenkulleri eşleştirme ve portföy yönetimini yapay zeka ile otomatikleştirme.',
        price: 'Tek Seferlik Lisans: 45.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
        features: ['İlan Entegrasyonu', 'Otomatik Açıklama Yazımı', 'Talep/Arz Eşleştirme', 'Randevu Takvimi Otomasyonu'],
        automationSlug: 'emlak-otomasyonu'
      },
      {
        id: 'flow-12',
        title: 'Stok Yönetimi Otomasyonu',
        description: 'Tedarik zinciri, raf ömrü ve talep tahmini gibi stok faaliyetlerini otonom bir şekilde yöneten tahminleme sistemi.',
        price: 'Tek Seferlik Lisans: 50.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop',
        features: ['Geleceğe Yönelik Talep Tahmini', 'Sipariş Otomasyonu', 'Gerçek Zamanlı Takip', 'Tedarikçi Uyarı Sistemi'],
        automationSlug: 'stok-yonetimi-otomasyonu'
      },
      {
        id: 'flow-13',
        title: 'Sesli Chatbot Otomasyonu',
        description: 'Web sitenizde veya mobil uygulamanızda müşterilerinizle yazışarak değil, doğal akışta sesli konuşarak destek sağlayan asistan.',
        price: 'Tek Seferlik Lisans: 35.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
        video: 'https://media.istockphoto.com/id/2220054148/tr/video/agentic-ai-system.mp4?s=mp4-640x640-is&k=20&c=a6_HSrWD_maYLGdysKlSziHjcRtpmjJ0biM_tyPZzvg=',
        features: ['Gerçek Zamanlı Sesli İletişim', 'Duygu Tanıma', 'Birden Fazla Dil Desteği', 'Kurum Veritabanı ile Entegre'],
        automationSlug: 'sesli-chatbot'
      },
      {
        id: 'flow-14',
        title: 'Akıllı Ön Muhasebe Otomasyonu',
        description: 'Fatura, irsaliye ve fişleri otomatik okuyup sınıflandıran ve muhasebe programınıza eksiksiz aktaran yapay zeka sistemi.',
        price: 'Tek Seferlik Lisans: 55.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026&auto=format&fit=crop',
        features: ['OCR ve Görüntü Tanıma', 'Otomatik Fatura Sınıflandırma', 'Banka Mutabakatı', 'Mevzuat Uyumlu Raporlama'],
        automationSlug: 'akilli-on-muhasebe-otomasyonu'
      },
      {
        id: 'flow-15',
        title: 'Bayi / Saha Satış Otomasyonu',
        description: 'Saha ekiplerinin rotalarını, ziyaret sıklığını ve müşteri verilerini yapay zeka tahminleriyle en karlı şekilde planlayan otomasyon.',
        price: 'Tek Seferlik Lisans: 60.000 ₺ + KDV (+ Aylık API)',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
        features: ['Akıllı Rota Optimizasyonu', 'Performans Analizi', 'Otomatik Ziyaret Planlama', 'Gelişmiş Saha Raporu'],
        automationSlug: 'bayi-saha-satis-otomasyonu'
      }
    ]
  }
};

const PaketUrunlerPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const categoryData = categoryId && URUNLER_DATA[categoryId] 
    ? URUNLER_DATA[categoryId] 
    : { categoryTitle: 'Paketler Bulunamadı', products: [] };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pb-20">
        
        {/* Full-width Category Slider */}
        {categoryData.products.length > 0 && (
          <div className="w-full relative bg-slate-900 border-b border-white/10">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full h-[45vh] md:h-[55vh] min-h-[400px]"
            >
              {categoryData.products.slice(0, 7).map((paket) => (
                <SwiperSlide key={`slide-${paket.id}`}>
                  <div className="relative w-full h-full">
                    {paket.video ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      >
                        <source src={paket.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={paket.image}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        alt={paket.title}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-10 pt-16 md:pt-24 mt-8 md:mt-0 gap-2 md:gap-4">
                      <h2 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl tracking-tight leading-tight max-w-5xl mx-auto animate-fade-in-up"
                      >
                        {paket.title}
                      </h2>
                      <p
                        className="text-base sm:text-lg md:text-2xl text-blue-200 max-w-4xl mx-auto font-medium drop-shadow-lg leading-relaxed mt-2 animate-fade-in-up"
                        style={{ animationDelay: '100ms' }}
                      >
                        {paket.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="container mx-auto max-w-7xl px-8 mt-16">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
            >
              {categoryData.categoryTitle.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-blue-600"> {word}</span> : <React.Fragment key={i}>{word} </React.Fragment>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              {categoryData.products.length > 0 
                ? 'İhtiyaçlarınıza özel olarak hazırlanan profesyonel yapay zeka ve dijital dönüşüm çözümlerimizle tanışın.'
                : 'Bu kategoriye ait paket bulunamadı veya geçersiz bir kategori seçtiniz.'}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryData.products.map((paket, index) => (
              <motion.div
                key={paket.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 group hover:shadow-blue-500/20 transition-all duration-500 flex flex-col h-full"
              >
                {/* Header Bar */}
                <div className="bg-[#003865] py-2 lg:py-2.5 px-4 text-center border-b border-white/10 shrink-0">
                  <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-wider leading-snug truncate">
                    {paket.title}
                  </h3>
                </div>

                {/* Preview Image Area */}
                <div className="relative h-28 md:h-32 p-2 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10" />
                  <img 
                    src={paket.image} 
                    alt={paket.title}
                    className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content / Description Area */}
                <div className="py-3 px-4 flex-1 bg-white flex flex-col min-h-0">
                  <p className="text-slate-700 font-bold text-xs md:text-[13px] leading-relaxed text-center italic mb-2 shrink-0">
                    "{paket.description}"
                  </p>
                  
                  <div className="flex flex-col gap-1.5 py-2 border-y border-slate-100 italic shrink-0">
                    {paket.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-xs md:text-[13px] text-slate-700 font-semibold justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mr-2 mt-1" />
                        <span className="text-left leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 pb-1 flex flex-col sm:flex-row gap-2 justify-center shrink-0 w-full">
                    <Link 
                      to={paket.automationSlug ? `/otomasyon/${paket.automationSlug}` : `/paket-detay/${categoryId}/${paket.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-2 rounded-sm font-bold text-[11px] tracking-widest transition-all duration-300 uppercase shadow-md active:scale-95 text-center flex items-center justify-center"
                    >
                      Detaylı Bilgi
                    </Link>
                    <Link 
                      to="/kurumsal#iletisim"
                      className="w-full sm:flex-1 bg-blue-600 hover:bg-[#003865] text-white px-2 py-2 rounded-sm font-bold text-[11px] tracking-widest transition-all duration-300 uppercase shadow-md active:scale-95 text-center flex items-center justify-center"
                    >
                      Teklif Al
                    </Link>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-[#003865] py-2.5 px-4 text-center mt-auto border-t border-white/10 shrink-0">
                  <div className="text-white font-bold text-[11px] mb-0.5 truncate">{paket.title}</div>
                  <div className="text-blue-300 font-black text-[10px] sm:text-xs md:text-[10px] lg:text-[10px] xl:text-xs tracking-tighter whitespace-nowrap">{paket.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {categoryData.products.length > 0 && (
            <div className="mt-20 bg-white rounded-3xl p-10 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Hangi paket size uygun?</h2>
                <p className="text-slate-600">Uzmanlarımızla görüşerek işletmeniz için en verimli stratejiyi belirleyelim.</p>
                </div>
                <Link to="/kurumsal#iletisim" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-500/25">
                Hemen İletişime Geçin
                </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaketUrunlerPage;
