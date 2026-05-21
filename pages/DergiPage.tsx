import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../constants';
import type { Article } from '../types';

// A custom card for the magazine style
const MagazineArticleCard: React.FC<{ article: Article, layout?: 'vertical' | 'horizontal' }> = ({ article, layout = 'vertical' }) => {
    
    if (layout === 'horizontal') {
        return (
            <article className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border border-slate-700 hover:border-blue-500">
                <Link to={`/makaleler/${article.slug}`} className="block overflow-hidden rounded-lg">
                    <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src={article.imageUrl} alt={article.title} />
                </Link>
                <div>
                    <p className="text-sm font-medium text-blue-400 mb-2">{article.category}</p>
                    <Link to={`/makaleler/${article.slug}`}>
                        <h3 className="text-2xl font-bold font-serif text-slate-100 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                    </Link>
                    <p className="mt-3 text-slate-400 text-sm line-clamp-3">{article.excerpt}</p>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                        <img className="h-8 w-8 rounded-full mr-2" src={article.authorAvatarUrl} alt={article.authorName} />
                        <span>{article.authorName} &middot; {article.publishedDate}</span>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="group flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full hover:-translate-y-1 hover:border-blue-500">
            <Link to={`/makaleler/${article.slug}`} className="block overflow-hidden h-48">
                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src={article.imageUrl} alt={article.title} />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-medium text-blue-400 mb-2">{article.category}</p>
                <Link to={`/makaleler/${article.slug}`} className="flex-grow">
                    <h3 className="text-xl font-bold font-serif text-slate-100 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                </Link>
                <div className="mt-4 flex items-center text-xs text-slate-400">
                    <span>{article.authorName} &middot; {article.publishedDate}</span>
                </div>
            </div>
        </article>
    );
};

const AnimatedStat: React.FC<{
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  duration?: number;
}> = ({ target, decimals = 0, prefix = '', suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = target;
          if (start === end) {
            setCount(end);
            return;
          }

          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          const increment = (end - start) / totalFrames;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, frameRate);
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [target, duration]);

  const formattedCount = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};


const DergiPage: React.FC = () => {
    const featuredArticle = ARTICLES[0];
    const editorsPickArticle = ARTICLES[1];
    const analysisMainArticle = ARTICLES[2];
    const otherArticles = ARTICLES.slice(3);
    
    const [language, setLanguage] = useState<'tr' | 'en'>('tr');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

     const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth;
            container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); 
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const techRadarItems = {
        tr: [
            { icon: 'fas fa-brain', title: 'Üretken Video Modelleri', text: 'Sora ve Veo gibi yeni nesil AI modelleri, video üretimini kökten değiştiriyor.' },
            { icon: 'fas fa-microchip', title: 'Nöromorfik Çipler', text: 'İnsan beyninden ilham alan çipler, enerji verimliliğinde çığır açmaya hazırlanıyor.' },
            { icon: 'fas fa-satellite-dish', title: 'Doğrudan Cihaza Uydu İletişimi', text: 'Starlink ve Apple, standart akıllı telefonlar için uydu bağlantısını test ediyor.' },
            { icon: 'fas fa-dna', title: 'Genom Düzenlemede Yapay Zeka', text: 'CRISPR teknolojisi, AI algoritmaları ile birleşerek genetik hastalıkların tedavisinde yeni umutlar sunuyor.' }
        ],
        en: [
            { icon: 'fas fa-brain', title: 'Generative Video Models', text: 'Next-gen AI models like Sora and Veo are revolutionizing video production.' },
            { icon: 'fas fa-microchip', title: 'Neuromorphic Chips', text: 'Chips inspired by the human brain are set to break new ground in energy efficiency.' },
            { icon: 'fas fa-satellite-dish', title: 'Direct-to-Device Satellite Comms', text: 'Starlink and Apple are testing satellite connectivity for standard smartphones.' },
            { icon: 'fas fa-dna', title: 'AI in Genome Editing', text: 'CRISPR technology combined with AI algorithms offers new hope for treating genetic diseases.' }
        ]
    };

    const translations = {
        tr: {
            mainTitle: "MORTANAS AI",
            subTitle: "Yapay Zeka & İnovasyon Dergisi • 3 Aylık Yayın",
            issue: "Yaz 2024 Sayısı",
            coverStory: "Kapak Konusu",
            readMore: "Okumaya Devam Et",
            aboutTitle: "Global Bir Yapay Zeka Dergisi",
            aboutSub: "Mortanas AI, yapay zeka ve teknoloji dünyasının nabzını tutan, global bir vizyonla hazırlanan öncü bir yayındır. Bünyesinde teknoloji devleriyle özel röportajlar, çığır açan AI gelişmeleri hakkında derinlemesine analizler ve sektörün geleceğine yön veren uzman görüşlerini barındırır.",
            letterFromEditorTitle: "Editörden Notlar",
            editorTitle: "Genel Yayın Yönetmeni & Mortanas CEO",
            letterFromEditorText: [
                "Yapay zeka devriminin tam ortasındayken, Mortanas AI Dergisi'nin Güz 2025 sayısıyla karşınızdayız. Bu sayıda, üretken yapay zekanın kodlama dünyasından şehir planlamasına kadar uzanan baş döndürücü etkilerini inceliyoruz.",
                "Sektörün en parlak beyinleriyle yaptığımız özel röportajlar, teknolojinin yarınını bugünden anlamanız için size bir pusula olacak. Amacımız, en karmaşık konuları bile anlaşılır ve ilham verici bir dille sizlere sunmak.",
                "Geleceği birlikte keşfetmeye hazır mısınız? Keyifli okumalar dilerim."
            ],
            signature: "Eren Talha Altun",
            stats: {
                countries: "Ulaşılan Ülke",
                readers: "Aylık Okur",
                authors: "Uzman Yazar"
            },
            aiByNumbers: "Yapay Zeka Dünyasından Rakamlar",
            statsCards: {
                modelParams: "En Büyük Dil Modeli",
                modelParamsDesc: "Modelin karmaşıklığını ve öğrenme kapasitesini gösteren bu rakam, yapay zekanın ne kadar gelişmiş olduğunun bir kanıtıdır.",
                marketGrowth: "AI Pazar Büyümesi (2030)",
                marketGrowthDesc: "Yapay zekanın küresel ekonomide yaratacağı devrimsel etkiyi ve endüstrileri nasıl dönüştüreceğini gösteriyor.",
                dataGenerated: "Günlük Üretilen Veri",
                dataGeneratedDesc: "AI modellerinin öğrenmesi için hayati olan bu devasa veri akışı, dijital evrenin ne kadar hızlı büyüdüğünü kanıtlıyor.",
                automationImpact: "Otomasyonun Etkileyeceği İş Gücü",
                automationImpactDesc: "Tekrarlayan görevlerin otomasyonu, iş gücünü daha stratejik ve yaratıcı rollere yönlendirerek verimliliği artıracaktır.",
                aiInvestment: "2023 AI Yatırımı",
                aiInvestmentDesc: "Teknoloji devlerinin ve ülkelerin yapay zekayı stratejik bir öncelik olarak gördüğünü ve geleceği bu alanda şekillendirdiğini gösteriyor.",
                adoptionRate: "Şirketlerin AI Benimseme Oranı",
                adoptionRateDesc: "Yapay zekanın artık niş bir teknoloji olmadığını, rekabette kalmak için ana akım bir iş aracı haline geldiğini kanıtlıyor.",
                paramSuffix: " Trilyon Parametre",
                trillion: " Trilyon",
                millionTb: " Milyon Terabayt",
                billion: " Milyar"
            },
            editorsPick: "Editörün Seçimi",
            interviewsTitle: "Özel Röportajlar & Mülakatlar",
            interviews: [
                { name: "Mira Murati", title: "CTO, OpenAI", quote: "Yapay genel zekanın (AGI) güvenli ve insanlık yararına geliştirilmesi, teknolojik ilerlemeden daha önemlidir.", avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
                { name: "Dr. Werner Vogels", title: "CTO, Amazon", quote: "Geleceğin altyapısı, ölçeklenebilir, dayanıklı ve olay güdümlü mimariler üzerine kuruludur. Her şey her an bozulabilir.", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
                { name: "Joelle Pineau", title: "VP, AI Research, Meta", quote: "Açık bilim ve tekrarlanabilir araştırma, yapay zeka alanında sorumlu ve hızlı ilerlemenin anahtarıdır.", avatar: "https://randomuser.me/api/portraits/women/42.jpg" },
                { name: "Demis Hassabis", title: "CEO, Google DeepMind", quote: "Amaç, önce zekayı çözmek ve sonra onu diğer her şeyi çözmek için kullanmaktır. Yapay genel zeka, bilimsel keşif için nihai araçtır.", avatar: "https://randomuser.me/api/portraits/men/43.jpg" },
                { name: "Andrew Ng", title: "Kurucu, Coursera & DeepLearning.AI", quote: "Yapay zeka yeni elektriktir. Tıpkı 100 yıl önce elektriğin neredeyse her şeyi dönüştürdüğü gibi, bugün yapay zekanın dönüştürmeyeceği bir endüstri düşünemiyorum.", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
                { name: "Yann LeCun", title: "Baş Yapay Zeka Bilimcisi, Meta", quote: "Kendi kendine denetimli öğrenme, yapay zekanın geleceğidir çünkü modellerin, tıpkı insanlar gibi, etiketlenmemiş büyük veri yığınlarından öğrenmesini sağlar.", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
                { name: "Jensen Huang", title: "CEO, NVIDIA", quote: "Hızlandırılmış bilişim, sürdürülebilir bilişimin ileriye giden yoludur. Biz sadece çip üretmiyoruz; yapay zeka devrimine güç verecek geleceğin veri merkezlerini inşa ediyoruz.", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
                { name: "Fei-Fei Li", title: "Profesör, Stanford University", quote: "Yapay zeka adının sizi yanıltmasına izin vermeyin - bunda yapay olan hiçbir şey yoktur. Beyinden ilham alınmıştır ve insanlığa yardım etmek için buradadır.", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
                { name: "Satya Nadella", title: "CEO, Microsoft", quote: "Misyonumuz, gezegendeki her bireyi ve her kurumu daha fazlasını başarmaları için güçlendirmektir. Yapay zeka, bu yeni insan potansiyeli seviyesini açmanın anahtarıdır.", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
                { name: "Elon Musk", title: "CEO, Tesla & xAI", quote: "Yapay zeka ile şeytanı çağırıyoruz. Yapay zekayı nasıl geliştirdiğimiz ve düzenlediğimiz konusunda çok dikkatli olmalıyız.", avatar: "https://randomuser.me/api/portraits/men/48.jpg" },
                { name: "Sundar Pichai", title: "CEO, Alphabet", quote: "Yapay zeka, insanlığın üzerinde çalıştığı en önemli şeylerden biridir. Elektrik veya ateşten daha derin bir etkiye sahip.", avatar: "https://randomuser.me/api/portraits/men/49.jpg" },
                { name: "Geoffrey Hinton", title: "Yapay Zekanın Babası", quote: "Derin öğrenmenin ardındaki fikir, çok katmanlı doğrusal olmayan dönüşümlerle algı sorununu çözmektir.", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
                { name: "Reid Hoffman", title: "Kurucu Ortak, LinkedIn", quote: "Yapay zeka, insan zekası ve yaratıcılığının güçlü bir yükselticisi olabilir. 'Kobetler' - yani işbirlikçi robotlar - yaratmaya odaklanmalıyız.", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
            ],
            techRadar: "Teknoloji Radarı",
            inDepthAnalysis: "Derinlemesine Analiz",
            trending: "Trend Konular",
            startupSpotlight: "Gelecek Vadeden Girişimler",
            startupSpotlightSub: "Yapay zeka dünyasını şekillendiren yenilikçi startup'ları mercek altına alıyoruz.",
            startups: [
                { name: "SynthMed", logo: "fas fa-pills", description: "İlaç keşfini hızlandıran ve kişiselleştirilmiş tıp için genomik verileri analiz eden yapay zeka platformu.", founded: "Kuruluş: 2022", metric: "Fonlama: $50M" },
                { name: "CodeWeaver", logo: "fas fa-file-code", description: "Kurumsal düzeyde uygulamalar için otonom olarak kod yazan, test eden ve dağıtan yapay zeka geliştirici.", founded: "Kuruluş: 2023", metric: "Verimlilik Artışı: %40" },
                { name: "AgriBot", logo: "fas fa-tractor", description: "Tarımsal verimliliği artırmak için uydu görüntülerini ve sensör verilerini analiz eden otonom drone çözümleri.", founded: "Kuruluş: 2021", metric: "Mahsul Verimi: +%25" }
            ],
            aiArtGallery: "Yapay Zeka Sanatı Galerisi",
            aiArtGallerySub: "Algoritmaların fırçasından çıkan, hayal gücünün sınırlarını zorlayan eserler.",
            artworks: [
                { imageUrl: 'https://i.imgur.com/b8K7dF5.png', prompt: 'Bir devin sırtında kurulmuş, saat mekanizmasıyla işleyen bir şehir, dijital sanat, hiperrealist.' },
                { imageUrl: 'https://i.imgur.com/sW9gD8L.png', prompt: 'Cyberpunk İstanbul, ıslak sokaklara yansıyan neon ışıklar, sinematik.' },
                { imageUrl: 'https://i.imgur.com/dF9tB8e.png', prompt: 'Mars\'ta antik bir kütüphane keşfeden bir astronot, empresyonist resim tarzı.' },
                { imageUrl: 'https://i.imgur.com/3Z6fJ5c.png', prompt: 'Kristal bir ormanda parlayan biyolüminesan mantarlar, fantezi sanatı.' },
                { imageUrl: 'https://i.imgur.com/xT8dC4Y.png', prompt: 'Gelecekteki bir metropolün üzerinde uçan retro-fütüristik arabalar, vintage poster stili.' },
                { imageUrl: 'https://i.imgur.com/vHqJ5zL.png', prompt: 'Sualtı dünyasının gizemli bir kraliçesinin portresi, art nouveau tarzı.' }
            ],
            subscribeTitle: "Abonelik Paketleri",
            subscribeSub: "Yapay zeka dünyasındaki en son trendlere, analizlere ve özel içeriklere erişmek için size en uygun planı seçin.",
            monthly: "Aylık",
            annually: "Yıllık",
            save2Months: "2 Ay Ücretsiz",
            plans: [
                { 
                    name: "Dijital Abonelik", 
                    price: { monthly: "$20", annually: "$200" }, 
                    period: { monthly: "/ay", annually: "/yıl"}, 
                    features: {
                        monthly: ["Sadece güncel sayıya dijital erişim", "Haftalık özel bülten"],
                        annually: ["Tüm dijital makalelere anında erişim", "Tüm dergi arşivine tam erişim", "Haftalık özel bülten"]
                    },
                    popular: false 
                },
                { 
                    name: "Basılı + Dijital", 
                    price: { monthly: "$40", annually: "$400" }, 
                    period: { monthly: "/ay", annually: "/yıl"}, 
                    features: {
                        monthly: ["Güncel sayının basılı kopyası kapınızda", "Sadece güncel sayıya dijital erişim", "Reklamsız okuma deneyimi"],
                        annually: ["Her yeni sayının basılı kopyası kapınızda", "Tüm dijital arşive tam erişim", "Yazarlarla özel Soru-Cevap etkinlikleri", "Reklamsız okuma deneyimi"]
                    },
                    popular: true 
                },
                { 
                    name: "Kurumsal", 
                    price: "Teklif Alın", 
                    period: "", 
                    features: {
                        monthly: ["Ekibiniz için çoklu lisans", "Özelleştirilmiş içerik ve raporlar", "Kurumsal atölye çalışmaları", "Özel hesap yöneticisi"],
                        annually: ["Ekibiniz için çoklu lisans", "Özelleştirilmiş içerik ve raporlar", "Kurumsal atölye çalışmaları", "Özel hesap yöneticisi"]
                    },
                    popular: false 
                }
            ],
            choosePlan: "Planı Seç",
            contactUs: "İletişime Geç"
        },
        en: {
            mainTitle: "MORTANAS AI",
            subTitle: "AI & Innovation Review • Quarterly Publication",
            issue: "Summer 2024 Issue",
            coverStory: "Cover Story",
            readMore: "Continue Reading",
            aboutTitle: "A Global AI Magazine",
            aboutSub: "Mortanas AI is a pioneering publication with a global vision, capturing the pulse of the AI and technology world. It features exclusive interviews with tech giants, in-depth analyses of groundbreaking AI developments, and expert opinions shaping the future of the industry.",
            letterFromEditorTitle: "Letter from the Editor",
            editorTitle: "Editor-in-Chief & Mortanas CEO",
            letterFromEditorText: [
                "As we stand in the midst of the AI revolution, we are thrilled to present the Autumn 2025 issue of Mortanas AI Review. In this edition, we explore the breathtaking impacts of generative AI, from the world of coding to the future of urban planning.",
                "Our exclusive interviews with the brightest minds in the industry will serve as a compass for understanding the technology of tomorrow, today. Our goal is to present even the most complex topics in an accessible and inspiring language.",
                "Are you ready to discover the future with us? Happy reading."
            ],
            signature: "Eren Talha Altun",
            stats: {
                countries: "Countries Reached",
                readers: "Monthly Readers",
                authors: "Expert Contributors"
            },
            aiByNumbers: "AI by the Numbers",
            statsCards: {
                modelParams: "Largest Language Model",
                modelParamsDesc: "This figure, indicating the model's complexity and learning capacity, is proof of how advanced artificial intelligence has become.",
                marketGrowth: "AI Market Growth (2030)",
                marketGrowthDesc: "Illustrates the revolutionary impact AI will have on the global economy and how it will transform industries.",
                dataGenerated: "Daily Data Generation",
                dataGeneratedDesc: "This massive data stream, vital for AI models to learn and improve, proves how rapidly the digital universe is expanding.",
                automationImpact: "Workforce Impacted by Automation",
                automationImpactDesc: "The automation of repetitive tasks will increase efficiency by shifting the workforce towards more strategic and creative roles.",
                aiInvestment: "2023 AI Investment",
                aiInvestmentDesc: "Shows that tech giants and nations view AI as a strategic priority and are shaping the future in this domain.",
                adoptionRate: "AI Adoption Rate by Companies",
                adoptionRateDesc: "Proves that AI is no longer a niche technology but has become a mainstream business tool, essential for staying competitive.",
                paramSuffix: " Trillion Parameters",
                trillion: " Trillion",
                millionTb: " Million Terabytes",
                billion: " Billion"
            },
            editorsPick: "Editor's Pick",
            interviewsTitle: "Exclusive Interviews & Conversations",
            interviews: [
                { name: "Mira Murati", title: "CTO, OpenAI", quote: "Developing Artificial General Intelligence (AGI) safely and for the benefit of humanity is more important than the technological race itself.", avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
                { name: "Dr. Werner Vogels", title: "CTO, Amazon", quote: "The future of infrastructure is built on scalable, resilient, and event-driven architectures. Everything fails, all the time.", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
                { name: "Joelle Pineau", title: "VP, AI Research, Meta", quote: "Open science and reproducible research are key to responsible and rapid progress in the field of artificial intelligence.", avatar: "https://randomuser.me/api/portraits/women/42.jpg" },
                { name: "Demis Hassabis", title: "CEO, Google DeepMind", quote: "The goal is to solve intelligence, and then use that to solve everything else. AGI is the ultimate tool for scientific discovery.", avatar: "https://randomuser.me/api/portraits/men/43.jpg" },
                { name: "Andrew Ng", title: "Founder, Coursera & DeepLearning.AI", quote: "AI is the new electricity. Just as electricity transformed almost everything 100 years ago, today I have a hard time thinking of an industry that AI will not transform.", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
                { name: "Yann LeCun", title: "Chief AI Scientist, Meta", quote: "Self-supervised learning is the future of AI because it allows models to learn from vast amounts of unlabeled data, much like humans do.", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
                { name: "Jensen Huang", title: "CEO, NVIDIA", quote: "Accelerated computing is the path forward to sustainable computing. We're not just building chips; we're building the data centers of the future.", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
                { name: "Fei-Fei Li", title: "Professor, Stanford University", quote: "I often tell my students not to be misled by the name 'artificial intelligence' – there is nothing artificial about it. It’s inspired by the brain and created by humans.", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
                { name: "Satya Nadella", title: "CEO, Microsoft", quote: "Our mission is to empower every person and every organization on the planet to achieve more. AI is the key to unlocking this next level of human potential.", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
                { name: "Elon Musk", title: "CEO, Tesla & xAI", quote: "With AI, we are summoning the demon. We need to be very careful with how we develop and regulate artificial intelligence.", avatar: "https://randomuser.me/api/portraits/men/48.jpg" },
                { name: "Sundar Pichai", title: "CEO, Alphabet", quote: "AI is one of the most important things humanity is working on. It is more profound than, I dunno, electricity or fire.", avatar: "https://randomuser.me/api/portraits/men/49.jpg" },
                { name: "Geoffrey Hinton", title: "Godfather of AI", quote: "The idea of deep learning is to solve the problem of perception by having many layers of non-linear transformations.", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
                { name: "Reid Hoffman", title: "Co-founder, LinkedIn", quote: "AI can be a powerful amplifier of human intellect and creativity. We should focus on creating 'cobots' - collaborative robots.", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
            ],
            techRadar: "Technology Radar",
            inDepthAnalysis: "In-Depth Analysis",
            trending: "Trending Topics",
            startupSpotlight: "Promising Startups",
            startupSpotlightSub: "We are highlighting innovative startups shaping the world of artificial intelligence.",
            startups: [
                { name: "SynthMed", logo: "fas fa-pills", description: "An AI platform that accelerates drug discovery and analyzes genomic data for personalized medicine.", founded: "Founded: 2022", metric: "Funding: $50M" },
                { name: "CodeWeaver", logo: "fas fa-file-code", description: "An AI developer that autonomously writes, tests, and deploys code for enterprise-level applications.", founded: "Founded: 2023", metric: "Productivity Boost: 40%" },
                { name: "AgriBot", logo: "fas fa-tractor", description: "Autonomous drone solutions that analyze satellite imagery and sensor data to increase agricultural productivity.", founded: "Founded: 2021", metric: "Crop Yield: +25%" }
            ],
            aiArtGallery: "AI Art Gallery",
            aiArtGallerySub: "Artworks from the brush of algorithms, pushing the boundaries of imagination.",
            artworks: [
                { imageUrl: 'https://i.imgur.com/b8K7dF5.png', prompt: 'A clockwork city built on the back of a giant tortoise, digital art, hyperrealistic.' },
                { imageUrl: 'https://i.imgur.com/sW9gD8L.png', prompt: 'Cyberpunk Istanbul, neon lights reflecting on wet streets, cinematic.' },
                { imageUrl: 'https://i.imgur.com/dF9tB8e.png', prompt: 'An astronaut discovering an ancient library on Mars, impressionist painting style.' },
                { imageUrl: 'https://i.imgur.com/3Z6fJ5c.png', prompt: 'Bioluminescent mushrooms glowing in a crystal forest, fantasy art.' },
                { imageUrl: 'https://i.imgur.com/xT8dC4Y.png', prompt: 'Retro-futuristic cars flying over a future metropolis, vintage poster style.' },
                { imageUrl: 'https://i.imgur.com/vHqJ5zL.png', prompt: 'Portrait of a mysterious queen of the underwater world, art nouveau style.' }
            ],
            subscribeTitle: "Subscription Plans",
            subscribeSub: "Choose the plan that's right for you to access the latest trends, analysis, and exclusive content in the world of AI.",
            monthly: "Monthly",
            annually: "Annually",
            save2Months: "Save 2 Months",
            plans: [
                { 
                    name: "Digital Subscription", 
                    price: { monthly: "$20", annually: "$200" }, 
                    period: { monthly: "/mo", annually: "/yr"}, 
                    features: {
                        monthly: ["Digital access to the current issue only", "Exclusive weekly newsletter"],
                        annually: ["Instant access to all digital articles", "Full access to the magazine archive", "Exclusive weekly newsletter"]
                    },
                    popular: false 
                },
                { 
                    name: "Print + Digital", 
                    price: { monthly: "$40", annually: "$400" }, 
                    period: { monthly: "/mo", annually: "/yr"}, 
                    features: {
                        monthly: ["Printed copy of the current issue", "Digital access to the current issue only", "Ad-free reading experience"],
                        annually: ["Printed copy of each new issue", "All Digital benefits", "Exclusive Q&A events with authors", "Ad-free reading experience"]
                    },
                    popular: true 
                },
                { 
                    name: "Corporate", 
                    price: "Get a Quote", 
                    period: "", 
                    features: {
                        monthly: ["Multi-license for your team", "Customized content and reports", "Corporate workshops", "Dedicated account manager"],
                        annually: ["Multi-license for your team", "Customized content and reports", "Corporate workshops", "Dedicated account manager"]
                    },
                    popular: false 
                }
            ],
            choosePlan: "Choose Plan",
            contactUs: "Contact Us"
        }
    };

    const t = translations[language];
    const currentTechRadarItems = techRadarItems[language];
    const interviews = t.interviews;

    const interviewPairs = [];
    for (let i = 0; i < interviews.length; i += 2) {
        interviewPairs.push(interviews.slice(i, i + 2));
    }
    
    const startupColors = [
        { bg: 'bg-teal-500/10', text: 'text-teal-400', ring: 'ring-teal-500/20' },
        { bg: 'bg-purple-500/10', text: 'text-purple-400', ring: 'ring-purple-500/20' },
        { bg: 'bg-lime-500/10', text: 'text-lime-400', ring: 'ring-lime-500/20' }
    ];


    return (
        <div className="bg-slate-900 text-slate-200 font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
                .font-serif {
                    font-family: 'Lora', serif;
                }
                .font-display {
                    font-family: "Playfair Display", serif;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                 .bg-grid-white\\[\\[0\\.05\\]\\] {
                    background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px);
                    background-size: 4rem 4rem;
                    opacity: 0.05;
                }
                `}
            </style>

            {/* Masthead */}
            <header className="relative bg-slate-900 border-b border-slate-700 py-6 z-10">
                <div className="container mx-auto px-6 text-center">
                     <div className="absolute top-4 right-6 flex justify-center items-center gap-4">
                        <button onClick={() => setLanguage('tr')} className={`font-semibold transition-colors text-sm ${language === 'tr' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>TR</button>
                        <span className="text-slate-600">|</span>
                        <button onClick={() => setLanguage('en')} className={`font-semibold transition-colors text-sm ${language === 'en' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>EN</button>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-display tracking-tighter">{t.mainTitle}</h1>
                    <p className="mt-2 text-lg text-slate-400 tracking-widest uppercase font-semibold">{t.subTitle}</p>
                </div>
            </header>

            {/* Featured Story - Redesigned */}
            {featuredArticle && (
                <section
                    className="relative min-h-[60vh] md:min-h-[70vh] flex items-end bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${featuredArticle.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <div className="relative z-10 container mx-auto px-6 py-16 text-white">
                        <div className="max-w-3xl">
                             <p className="text-sm font-bold tracking-wider text-blue-300 bg-blue-500/20 px-4 py-2 rounded-full inline-block uppercase">{t.coverStory}</p>
                            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold font-display leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                                {featuredArticle.title}
                            </h2>
                            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
                                {featuredArticle.excerpt}
                            </p>
                             <div className="mt-8 flex items-center">
                                 <img className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-400" src={featuredArticle.authorAvatarUrl} alt={featuredArticle.authorName} />
                                 <div className="ml-4">
                                    <p className="font-semibold">{featuredArticle.authorName}</p>
                                    <p className="text-sm text-blue-200">{featuredArticle.publishedDate}</p>
                                 </div>
                            </div>
                            <Link to={`/makaleler/${featuredArticle.slug}`} className="mt-10 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-3">
                                <span>{t.readMore}</span>
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <main className="container mx-auto px-6 py-16 space-y-20">

                {/* About Magazine Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm text-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Text */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold font-display text-white leading-tight">{t.aboutTitle}</h2>
                            <p className="mt-6 text-lg text-slate-300">{t.aboutSub}</p>
                        </div>
                        {/* Right Column: Stats */}
                        <div className="space-y-8">
                            <div className="flex items-center space-x-6 bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                                <i className="fas fa-globe-americas text-4xl text-blue-400 flex-shrink-0 w-10 text-center"></i>
                                <div>
                                    <p className="text-4xl font-extrabold text-white">40+</p>
                                    <p className="mt-1 font-semibold text-slate-400">{t.stats.countries}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                                <i className="fas fa-users text-4xl text-blue-400 flex-shrink-0 w-10 text-center"></i>
                                <div>
                                    <p className="text-4xl font-extrabold text-white">1M+</p>
                                    <p className="mt-1 font-semibold text-slate-400">{t.stats.readers}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                                <i className="fas fa-pen-nib text-4xl text-blue-400 flex-shrink-0 w-10 text-center"></i>
                                <div>
                                    <p className="text-4xl font-extrabold text-white">50+</p>
                                    <p className="mt-1 font-semibold text-slate-400">{t.stats.authors}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Letter from the Editor Section */}
                <section className="bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-purple-900/50 backdrop-blur-md text-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-400/30">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1 text-center">
                            <img src="https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg" alt={t.signature} className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg ring-4 ring-white/20 mb-4" />
                            <h3 className="text-xl font-bold text-white">{t.signature}</h3>
                            <p className="text-blue-300 font-semibold">{t.editorTitle}</p>
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-bold font-display text-white mb-4 border-b-2 border-slate-200/30 pb-2">{t.letterFromEditorTitle}</h2>
                            <div className="space-y-4 text-slate-200 font-serif text-lg">
                                {t.letterFromEditorText.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                            <p className="font-display text-3xl text-white mt-6 text-right font-bold tracking-wider">
                                {t.signature}
                            </p>
                        </div>
                    </div>
                </section>

                {/* AI by the Numbers Section */}
                <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold font-display text-white mb-10 border-b-2 border-slate-700 pb-4 flex items-center">
                            <i className="fas fa-chart-pie text-purple-400 mr-4"></i>{t.aiByNumbers}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                            {/* Card 1 */}
                            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-brain text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={1.8} decimals={1} suffix={t.statsCards.paramSuffix} />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.modelParams}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.modelParamsDesc}</p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-chart-line text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={1.5} decimals={1} prefix="$" suffix={t.statsCards.trillion} />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.marketGrowth}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.marketGrowthDesc}</p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-database text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={328} decimals={0} suffix={t.statsCards.millionTb} />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.dataGenerated}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.dataGeneratedDesc}</p>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-robot text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={45} decimals={0} suffix="%" />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.automationImpact}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.automationImpactDesc}</p>
                                </div>
                            </div>
                            {/* Card 5 */}
                            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-dollar-sign text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={180} decimals={0} prefix="$" suffix={t.statsCards.billion} />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.aiInvestment}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.aiInvestmentDesc}</p>
                                </div>
                            </div>
                             {/* Card 6 */}
                             <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:-translate-y-2 flex flex-col">
                                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-slate-800">
                                    <i className="fas fa-building-user text-3xl text-white"></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                                        <AnimatedStat target={50} decimals={0} suffix="%" />
                                    </p>
                                    <h4 className="mt-2 font-semibold text-slate-300">{t.statsCards.adoptionRate}</h4>
                                    <p className="mt-3 text-sm text-slate-400">{t.statsCards.adoptionRateDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Editor's Pick */}
                {editorsPickArticle && (
                    <section>
                         <h3 className="text-3xl font-bold font-display text-white mb-8 border-b-2 border-slate-700 pb-4 flex items-center">
                            <i className="fas fa-star text-yellow-400 mr-4"></i>{t.editorsPick}
                        </h3>
                        <MagazineArticleCard article={editorsPickArticle} layout="horizontal" />
                    </section>
                )}
                
                {/* Interviews Section */}
                <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-2xl p-8 md:p-12 lg:-mx-6">
                    <div className="flex justify-between items-center border-b-2 border-purple-300/20 pb-4 mb-8">
                        <h3 className="text-3xl font-bold font-display text-white flex items-center">
                            <i className="fas fa-microphone-alt text-purple-400 mr-4"></i>{t.interviewsTitle}
                        </h3>
                        <div className="flex space-x-3">
                            <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"><i className="fas fa-chevron-left"></i></button>
                            <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide -m-3 p-3 snap-x snap-mandatory scroll-smooth">
                        {interviewPairs.map((pair, index) => (
                            <div key={index} className="flex-shrink-0 w-full snap-center px-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {pair.map((interview) => (
                                        <div key={interview.name} className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 hover:border-purple-400">
                                            <div className="flex-grow relative">
                                                <i className="fas fa-quote-left text-7xl text-purple-900/50 absolute -top-4 -left-4 -z-0 opacity-50"></i>
                                                <blockquote className="relative z-10 text-xl font-serif text-slate-200">
                                                    "{interview.quote}"
                                                </blockquote>
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-purple-300/20 flex items-center">
                                                <img src={interview.avatar} alt={interview.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-4 ring-purple-500/30" />
                                                <div className="ml-4">
                                                    <p className="font-bold text-white text-lg">{interview.name}</p>
                                                    <p className="text-sm font-medium text-purple-300">{interview.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Art Gallery Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-white font-display">{t.aiArtGallery}</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{t.aiArtGallerySub}</p>
                    </div>
                    <div className="columns-2 md:columns-3 gap-6 space-y-6">
                        {t.artworks.map((artwork, index) => (
                            <div key={index} className="break-inside-avoid group relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
                                <img src={artwork.imageUrl} alt={`AI Artwork ${index + 1}`} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-xs font-mono transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="font-bold text-blue-300">Prompt:</span> "{artwork.prompt}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Startup Spotlight Section */}
                <section className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-white font-display">{t.startupSpotlight}</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{t.startupSpotlightSub}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.startups.map((startup, index) => {
                            const color = startupColors[index % startupColors.length];
                            return (
                                <div key={startup.name} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-2">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className={`flex-shrink-0 h-14 w-14 ${color.bg} rounded-lg flex items-center justify-center ring-1 ring-inset ring-white/10`}>
                                            <i className={`${startup.logo} text-3xl ${color.text}`}></i>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{startup.name}</h3>
                                    </div>
                                    <p className="text-slate-300 mb-6">{startup.description}</p>
                                    <div className={`flex justify-between items-center text-sm font-semibold text-slate-400 border-t border-white/10 pt-4`}>
                                        <span>{startup.founded}</span>
                                        <span className={color.text}>{startup.metric}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* In-Depth Analysis Section - Redesigned */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
                    <h3 className="text-3xl font-bold font-display text-white mb-8 border-b-2 border-slate-700 pb-4 flex items-center">
                        <i className="fas fa-microscope text-blue-400 mr-4"></i>{t.inDepthAnalysis}
                    </h3>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                        {/* Main Analysis Article */}
                        {analysisMainArticle && (
                            <div className="lg:col-span-2">
                                <article className="group relative flex h-full min-h-[500px] flex-col justify-end overflow-hidden rounded-2xl shadow-2xl">
                                    <img src={analysisMainArticle.imageUrl} alt={analysisMainArticle.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="relative z-10 p-8 text-white">
                                        <p className="text-sm font-medium uppercase tracking-widest">{analysisMainArticle.category}</p>
                                        <h4 className="mt-2 text-4xl font-bold font-display leading-tight transition-colors group-hover:text-blue-300">
                                            {analysisMainArticle.title}
                                        </h4>
                                        <div className="mt-6 flex items-center text-sm">
                                            <img className="h-10 w-10 rounded-full mr-3" src={analysisMainArticle.authorAvatarUrl} alt={analysisMainArticle.authorName} />
                                            <div>
                                                <span className="font-semibold">{analysisMainArticle.authorName}</span>
                                                <span className="mx-2 text-slate-300">&middot;</span>
                                                <span className="text-slate-300">{analysisMainArticle.publishedDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/makaleler/${analysisMainArticle.slug}`} className="absolute inset-0">
                                        <span className="sr-only">Read full story</span>
                                    </Link>
                                </article>
                            </div>
                        )}

                        {/* Sidebar Articles */}
                        {otherArticles.length > 0 && (
                            <div className="lg:col-span-1 flex flex-col space-y-4">
                                {otherArticles.map(article => (
                                     <Link to={`/makaleler/${article.slug}`} key={article.slug} className="group flex items-start space-x-4 p-4 rounded-xl border border-slate-700 bg-slate-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
                                        <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={article.imageUrl} alt={article.title} />
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="font-bold font-serif leading-tight text-slate-200 transition-colors group-hover:text-blue-400">
                                                {article.title}
                                            </h5>
                                            <p className="mt-2 text-xs text-slate-400">{article.publishedDate}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                
                {/* Subscription Packages Section */}
                <section className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-white font-display">{t.subscribeTitle}</h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{t.subscribeSub}</p>
                    </div>
                    
                    {/* Billing Cycle Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-slate-800 rounded-lg p-1 flex items-center space-x-1">
                            <button onClick={() => setBillingCycle('monthly')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                                {t.monthly}
                            </button>
                            <button onClick={() => setBillingCycle('annually')} className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 text-sm md:text-base flex items-center ${billingCycle === 'annually' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                                {t.annually}
                                <span className="ml-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">{t.save2Months}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {t.plans.map((plan) => {
                             const isCorporate = typeof plan.price === 'string';
                             const displayPrice = !isCorporate ? plan.price[billingCycle] : plan.price;
                             const displayPeriod = !isCorporate ? plan.period[billingCycle] : plan.period;
                             const featuresToShow = !isCorporate ? plan.features[billingCycle] : plan.features.monthly;
                             
                             let priceValue = '0';
                             if (!isCorporate) {
                                const priceString = plan.price[billingCycle];
                                priceValue = priceString.replace(/\D/g, '');
                             }
                             const paymentSearchParams = new URLSearchParams({
                                plan: plan.name,
                                price: priceValue,
                                type: 'dergi-abonelik',
                                cycle: billingCycle,
                                currency: 'USD',
                             }).toString();


                            return (
                                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.popular ? 'bg-slate-900 text-white transform lg:scale-105 shadow-2xl ring-4 ring-blue-500' : 'bg-slate-800/50 backdrop-blur-sm text-slate-200 border border-slate-700'}`}>
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <div className="mt-4">
                                        <span className={`text-5xl font-extrabold ${plan.popular ? 'text-blue-400' : 'text-white'}`}>{displayPrice}</span>
                                        {displayPeriod && <span className={`text-md ml-1 ${plan.popular ? 'text-slate-400' : 'text-slate-400'}`}>{displayPeriod}</span>}
                                    </div>
                                    <ul className="mt-8 space-y-4 flex-grow">
                                        {featuresToShow.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <i className={`fa-solid fa-check mr-3 mt-1 ${plan.popular ? 'text-blue-400' : 'text-blue-500'}`}></i>
                                                <span className={plan.popular ? 'text-slate-300' : 'text-slate-300'}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={isCorporate ? '/kurumsal' : `/odeme?${paymentSearchParams}`} className={`mt-10 block w-full text-center py-3 font-semibold rounded-lg transition-colors ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                        {isCorporate ? t.contactUs : t.choosePlan}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DergiPage;