import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Main Site Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionButtons from './components/Chatbot';

// Main Site Pages
import HomePage from './pages/HomePage';
import SectorsPage from './pages/SectorsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import KurumsalPage from './pages/KurumsalPage';
import SectorDetailPage from './pages/SectorDetailPage';
import AutomationDetailPage from './pages/AutomationDetailPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import PricingPage from './pages/PricingPage';
import OdemePage from './pages/OdemePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import AiHotelSitePage from './pages/AiHotelSitePage';
import AiSpaSitePage from './pages/AiSpaSitePage';
import EgitimlerPage from './pages/EgitimlerPage';
import OdemeBasariliPage from './pages/OdemeBasariliPage';
import OdemeBasarisizPage from './pages/OdemeBasarisizPage';
import AiEmlakSitePage from './pages/AiEmlakSitePage';
import AiETicaretSitePage from './pages/AiETicaretSitePage';
import DergiPage from './pages/DergiPage';
import YapayZekaKioskPage from './pages/YapayZekaKioskPage';
import YapayZekaHologramPage from './pages/YapayZekaHologramPage';
import YapayZekaVoiceAgentPage from './pages/YapayZekaVoiceAgentPage';
import SavasZekasiPage from './pages/SavasZekasiPage';
import YapayZekaTanitimPage from './pages/YapayZekaTanitimPage';
import OtelCozumlerimizPage from './pages/OtelProjelerimizPage';
import SaglikCozumlerimizPage from './pages/SaglikCozumlerimizPage';
import EgitimCozumlerimizPage from './pages/EgitimCozumlerimizPage';
import ETicaretCozumlerimizPage from './pages/ETicaretCozumlerimizPage';
import OtomotivCozumlerimizPage from './pages/OtomotivCozumlerimizPage';
import HukukCozumlerimizPage from './pages/HukukCozumlerimizPage';
import RestoranCozumlerimizPage from './pages/RestoranCozumlerimizPage';
import FitnessCozumlerimizPage from './pages/FitnessCozumlerimizPage';
import SigortaCozumlerimizPage from './pages/SigortaCozumlerimizPage';
import GuzellikSalonuCozumlerimizPage from './pages/GuzellikSalonuCozumlerimizPage';
import DiyetisyenCozumlerimizPage from './pages/DiyetisyenCozumlerimizPage';
import EmlakciCozumlerimizPage from './pages/EmlakciCozumlerimizPage';
import YapayZekaCagriMerkeziPage from './pages/YapayZekaCagriMerkeziPage';
import SanalCagriMerkeziPage from './pages/SanalCagriMerkeziPage';
import CanliDestekSistemiPage from './pages/CanliDestekSistemiPage';
import YapayZekaSesliAsistanPage from './pages/YapayZekaSesliAsistanPage';
import OtomasyonSistemiPage from './pages/OtomasyonSistemiPage';
import YapayZekaOtomasyonlariPage from './pages/YapayZekaOtomasyonlariPage';
import YapayZekaUygulamalarPage from './pages/YapayZekaUygulamalarPage';
import PaketlerPage from './pages/PaketlerPage';
import PaketUrunlerPage from './pages/PaketUrunlerPage';
import PaketDetayPage from './pages/PaketDetayPage';
import SektorCozumlerimizPage from './pages/SektorCozumlerimizPage';
import FaqPage from './pages/FaqPage';

// Admin Panel Components
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPlaceholderPage from './pages/admin/AdminPlaceholderPage';
import AdminRandevularPage from './pages/admin/AdminRandevularPage';
import AdminTasksPage from './pages/admin/AdminTasksPage';
import AdminCrmPage from './pages/admin/AdminCrmPage';
import AdminLoginLogsPage from './pages/admin/AdminLoginLogsPage';
import AdminSogukAramaPage from './pages/admin/AdminSogukAramaPage';
import AdminTopluEpostaPage from './pages/admin/AdminTopluEpostaPage';
import AdminPartnerlerPage from './pages/admin/AdminPartnerlerPage';
import AdminFinansYonetimiPage from './pages/admin/AdminFinansYonetimiPage';
import AdminTeklifOlusturucuPage from './pages/admin/AdminTeklifOlusturucuPage';
import AdminFaturaYonetimiPage from './pages/admin/AdminFaturaYonetimiPage';
import AdminFiyatlandirmalarPage from './pages/admin/AdminFiyatlandirmalarPage';
import AdminKisiselHedeflerPage from './pages/admin/AdminKisiselHedeflerPage';
import AdminTaleplerPage from './pages/admin/AdminTaleplerPage';

const MainSiteLayout: React.FC = () => {
  return (
    <div className="bg-slate-900 font-sans text-slate-300">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/yapay-zeka-otomasyonlari" element={<YapayZekaOtomasyonlariPage />} />
          <Route path="/yapay-zeka-uygulamalar" element={<YapayZekaUygulamalarPage />} />
          <Route path="/sektor-cozumlerimiz" element={<SektorCozumlerimizPage />} />
          <Route path="/otomasyon/:slug" element={<AutomationDetailPage />} />
          <Route path="/uygulamalar/:slug" element={<ApplicationDetailPage />} />
          <Route path="/sektorler" element={<SectorsPage />} />
          <Route path="/sektorler/:slug" element={<SectorDetailPage />} />
          <Route path="/sektorler/otel-cozumlerimiz" element={<OtelCozumlerimizPage />} />
          <Route path="/sektorler/saglik-cozumlerimiz" element={<SaglikCozumlerimizPage />} />
          <Route path="/sektorler/egitim-cozumlerimiz" element={<EgitimCozumlerimizPage />} />
          <Route path="/sektorler/eticaret-cozumlerimiz" element={<ETicaretCozumlerimizPage />} />
          <Route path="/sektorler/otomotiv-cozumlerimiz" element={<OtomotivCozumlerimizPage />} />
          <Route path="/sektorler/hukuk-cozumlerimiz" element={<HukukCozumlerimizPage />} />
          <Route path="/sektorler/restoran-cozumlerimiz" element={<RestoranCozumlerimizPage />} />
          <Route path="/sektorler/fitness-cozumlerimiz" element={<FitnessCozumlerimizPage />} />
          <Route path="/sektorler/sigorta-cozumlerimiz" element={<SigortaCozumlerimizPage />} />
          <Route path="/sektorler/guzellik-salonu-cozumlerimiz" element={<GuzellikSalonuCozumlerimizPage />} />
          <Route path="/sektorler/diyetisyen-cozumlerimiz" element={<DiyetisyenCozumlerimizPage />} />
          <Route path="/sektorler/emlakci-cozumlerimiz" element={<EmlakciCozumlerimizPage />} />
          <Route path="/entegrasyonlar" element={<IntegrationsPage />} />
          <Route path="/hakkimizda" element={<AboutUsPage />} />
          <Route path="/sss" element={<FaqPage />} />
          <Route path="/kurumsal" element={<KurumsalPage />} />
          <Route path="/paketler" element={<PaketlerPage />} />
          <Route path="/paketler/:categoryId" element={<PaketUrunlerPage />} />
          <Route path="/paket-detay/:categoryId/:productId" element={<PaketDetayPage />} />
          <Route path="/dergi" element={<DergiPage />} />
          <Route path="/egitimler" element={<EgitimlerPage />} />
          <Route path="/odeme" element={<OdemePage />} />
          <Route path="/odeme-basarili" element={<OdemeBasariliPage />} />
          <Route path="/odeme-basarisiz" element={<OdemeBasarisizPage />} />
          <Route path="/makaleler" element={<BlogPage />} />
          <Route path="/makaleler/:slug" element={<ArticlePage />} />
          <Route path="/yapay-zeka-web/otel" element={<AiHotelSitePage />} />
          <Route path="/yapay-zeka-web/spa" element={<AiSpaSitePage />} />
          <Route path="/yapay-zeka-web/emlak" element={<AiEmlakSitePage />} />
          <Route path="/yapay-zeka-web/eticaret" element={<AiETicaretSitePage />} />
          <Route path="/yapay-zeka-kiosk" element={<YapayZekaKioskPage />} />
          <Route path="/yapay-zeka-hologram" element={<YapayZekaHologramPage />} />
          <Route path="/yapay-zeka-voice-agent" element={<YapayZekaVoiceAgentPage />} />
          <Route path="/savas-zekasi" element={<SavasZekasiPage />} />
          <Route path="/yapay-zeka-tanitim" element={<YapayZekaTanitimPage />} />
          <Route path="/yapay-zeka-cagri-merkezi" element={<YapayZekaCagriMerkeziPage />} />
          <Route path="/sanal-cagri-merkezi" element={<SanalCagriMerkeziPage />} />
          <Route path="/canli-destek-sistemi" element={<CanliDestekSistemiPage />} />
          <Route path="/yapay-zeka-sesli-asistan" element={<YapayZekaSesliAsistanPage />} />
          <Route path="/otomasyon-sistemi" element={<OtomasyonSistemiPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Panel Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="randevular" element={<AdminRandevularPage />} />
          <Route path="gorevler" element={<AdminTasksPage />} />
          <Route path="analitik" element={<AdminPlaceholderPage title="Analitik" />} />
          <Route path="musteriler" element={<AdminCrmPage />} />
          <Route path="talepler" element={<AdminTaleplerPage />} />
          <Route path="soguk-arama" element={<AdminSogukAramaPage />} />
          <Route path="hedef-kitle" element={<AdminPlaceholderPage title="Hedef Kitle" />} />
          <Route path="toplu-eposta" element={<AdminTopluEpostaPage />} />
          <Route path="partnerler" element={<AdminPartnerlerPage />} />
          <Route path="finans-yonetimi" element={<AdminFinansYonetimiPage />} />
          <Route path="teklif-olusturucu" element={<AdminTeklifOlusturucuPage />} />
          <Route path="fatura-yonetimi" element={<AdminFaturaYonetimiPage />} />
          <Route path="fiyatlandirmalar" element={<AdminFiyatlandirmalarPage />} />
          <Route path="abonelik-sistemi" element={<AdminPlaceholderPage title="Abonelik Sistemi" />} />
          <Route path="projeler" element={<AdminPlaceholderPage title="Projeler" />} />
          <Route path="alinan-isler" element={<AdminPlaceholderPage title="Alınan İşler" />} />
          <Route path="ekip-yonetimi" element={<AdminPlaceholderPage title="Ekip Yönetimi" />} />
          <Route path="ihtiyaclar" element={<AdminPlaceholderPage title="İhtiyaçlar" />} />
          <Route path="is-planlama" element={<AdminPlaceholderPage title="İş Planlama" />} />
          <Route path="stratejik-hedefler" element={<AdminPlaceholderPage title="Stratejik Hedefler" />} />
          <Route path="ai-destek" element={<AdminPlaceholderPage title="AI Destek" />} />
          <Route path="ai-egitim" element={<AdminPlaceholderPage title="AI Eğitim" />} />
          <Route path="kisisel-hedefler" element={<AdminKisiselHedeflerPage />} />
          <Route path="parolalar" element={<AdminPlaceholderPage title="Parolalar" />} />
          <Route path="login-logs" element={<AdminLoginLogsPage />} />
          {/* Catch-all for any other admin route to redirect to dashboard */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
        
        {/* Main Site Routes */}
        <Route path="/*" element={<MainSiteLayout />} />
      </Routes>
    </HashRouter>
  );
};

export default App;