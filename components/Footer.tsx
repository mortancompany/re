import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#030712] via-slate-950 to-indigo-950/10 text-slate-300 border-t border-slate-800/80 relative overflow-hidden" aria-labelledby="footer-heading">
      {/* Top subtle highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <h2 id="footer-heading" className="sr-only">Alt Bilgi</h2>
      
      <div className="container mx-auto px-8 pt-6 pb-3 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Branding & Contact Section */}
          <div className="lg:col-span-4 lg:pr-6">
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center">
              MORTANAS<span className="text-indigo-500">.</span>
            </h3>
            <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed font-medium">
              Yapay zeka ve dijital ekosistem çözümleriyle işletmenizin sınırlarını kaldırıyoruz. Geleceğin iş dünyasına bugünden adım atın.
            </p>
            
            {/* Global Partners */}
            <div className="mt-4 mb-2">
                <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Global Çözüm Ortaklarımız</h4>
                <div className="flex items-center space-x-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpT2yFo4dqRb49LVVA26PHefmlvO4hymdLkw&s" alt="Meta" referrerPolicy="no-referrer" className="h-4 object-contain rounded-sm" />
                    <img src="https://dhrp.com.au/wp-content/uploads/2023/07/microsoft-centered-logo.png" alt="Microsoft" referrerPolicy="no-referrer" className="h-4 object-contain rounded-sm" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/512px-OpenAI_Logo.svg.png" alt="OpenAI" referrerPolicy="no-referrer" className="h-4 object-contain brightness-200 invert" />
                    <img src="https://thumbor.evrimagaci.org/5FtfjU15HF5k5b3fAQj4vN0g0bY=/2000x0/filters:quality(85)/old/content_media/9ab56bbe7fde8290e225d93c065efec2.jpg" alt="Google" referrerPolicy="no-referrer" className="h-4 object-contain rounded-sm" />
                </div>
            </div>

            <div className="mt-4 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-start group cursor-default leading-tight">
                  <i className="fas fa-map-marker-alt mt-0.5 mr-2 flex-shrink-0 text-indigo-500/70 group-hover:text-indigo-400 transition-colors"></i>
                  <span><strong className="text-slate-200">UK:</strong> 71-75 Shelton Street, Covent Garden, Londra, WC2H 9JQ</span>
              </div>
              <div className="flex items-start group cursor-default leading-tight">
                  <i className="fas fa-map-marker-alt mt-0.5 mr-2 flex-shrink-0 text-indigo-500/70 group-hover:text-indigo-400 transition-colors"></i>
                  <span><strong className="text-slate-200">TR:</strong> Söğütözü Koç Kuleleri No:2, 06510 Çankaya/Ankara</span>
              </div>
            </div>

            <div className="mt-5 flex space-x-2">
              <a href="https://linkedin.com/company/mortanascompany" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 shadow-sm hover:shadow-lg text-xs"><span className="sr-only">LinkedIn</span><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com/mortanascompany" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300 shadow-sm hover:shadow-lg text-xs"><span className="sr-only">Instagram</span><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com/mortanascompany" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300 shadow-sm hover:shadow-lg text-xs"><span className="sr-only">Twitter</span><i className="fab fa-twitter"></i></a>
              <a href="https://www.youtube.com/@mortanascompany" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all duration-300 shadow-sm hover:shadow-lg text-xs"><span className="sr-only">YouTube</span><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Mortanas Ecosystem Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-white mb-2 border-b border-white/5 pb-1">MORTANAS COMPANY</h3>
                <ul role="list" className="space-y-1.5 font-medium">
                    <li><a href="https://www.mortanascompany.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-globe w-3.5 text-indigo-500/50"></i> mortanascompany.com</a></li>
                    <li><a href="/hakkimizda" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-building w-3.5 text-indigo-500/50"></i> Hakkımızda</a></li>
                    <li><a href="/kariyer" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-briefcase w-3.5 text-indigo-500/50"></i> Kariyer</a></li>
                    <li><a href="/gizlilik" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-shield-alt w-3.5 text-indigo-500/50"></i> Gizlilik Politikası</a></li>
                    <li><a href="/kosullar" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-file-contract w-3.5 text-indigo-500/50"></i> Kullanım Koşulları</a></li>
                    <li><a href="mailto:info@mortanascompany.com" className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><i className="fas fa-envelope w-3.5 text-indigo-500/50"></i> İletişim Kur</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-white mb-2 border-b border-white/5 pb-1">MORTANAS AGENCY</h3>
                <ul role="list" className="space-y-1.5 font-medium">
                    <li><a href="https://www.mortanasagency.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-purple-400 transition-colors flex items-center"><i className="fas fa-globe w-3.5 text-purple-500/50"></i> mortanasagency.com</a></li>
                    <li><a href="/urunler" className="text-[11px] text-slate-400 hover:text-purple-400 transition-colors flex items-center"><i className="fas fa-box-open w-3.5 text-purple-500/50"></i> Hizmetlerimiz</a></li>
                    <li><a href="/portfolyo" className="text-[11px] text-slate-400 hover:text-purple-400 transition-colors flex items-center"><i className="fas fa-layer-group w-3.5 text-purple-500/50"></i> Portfolyo</a></li>
                    <li><a href="mailto:info@mortanasagency.com" className="text-[11px] text-slate-400 hover:text-purple-400 transition-colors flex items-center"><i className="fas fa-envelope w-3.5 text-purple-500/50"></i> İletişim Kur</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-white mb-2 border-b border-white/5 pb-1">MORTANAS ACADEMY</h3>
                <ul role="list" className="space-y-1.5 font-medium">
                    <li><a href="https://www.mortanasacademy.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center"><i className="fas fa-globe w-3.5 text-cyan-500/50"></i> mortanasacademy.com</a></li>
                    <li><a href="/egitimler" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center"><i className="fas fa-graduation-cap w-3.5 text-cyan-500/50"></i> Eğitim Programları</a></li>
                    <li><a href="/egitmenler" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center"><i className="fas fa-chalkboard-user w-3.5 text-cyan-500/50"></i> Eğitmen Kadrosu</a></li>
                    <li><a href="mailto:info@mortanasacademy.com" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center"><i className="fas fa-envelope w-3.5 text-cyan-500/50"></i> İletişim Kur</a></li>
                </ul>
              </div>
            </div>
              
            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-white mb-2 border-b border-white/5 pb-1">MORTANAS MEDYA</h3>
                <ul role="list" className="space-y-1.5 font-medium">
                    <li><a href="https://www.mortanasmedya.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center"><i className="fas fa-globe w-3.5 text-emerald-500/50"></i> mortanasmedya.com</a></li>
                    <li><a href="/haberler" className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center"><i className="fas fa-newspaper w-3.5 text-emerald-500/50"></i> Medya & Haberler</a></li>
                    <li><a href="/basin" className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center"><i className="fas fa-microphone w-3.5 text-emerald-500/50"></i> Basın Odası</a></li>
                    <li><a href="mailto:info@mortanasmedya.com" className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center"><i className="fas fa-envelope w-3.5 text-emerald-500/50"></i> İletişim Kur</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-slate-800/80 pt-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 order-2 md:order-1 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                    <i className="fas fa-shield-alt text-indigo-500 text-[9px]"></i>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mortanas Core v4</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                    &copy; {new Date().getFullYear()} <span className="text-slate-400">MORTANAS COMPANY</span>. Tüm hakları saklıdır.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8 order-1 md:order-2">
                 <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <i className="fab fa-whatsapp text-emerald-400 text-xs"></i>
                    </div>
                    <a href="https://wa.me/905540118888" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-bold tracking-wide transition-colors">+90 554 011 8888</a>
                 </div>
                 <div className="flex items-center space-x-2 text-xs text-slate-300 hidden sm:flex">
                    <div className="w-px h-5 bg-slate-800"></div>
                 </div>
                 <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <i className="fas fa-phone-alt text-blue-400 text-[9px]"></i>
                    </div>
                    <a href="tel:+905540139999" className="hover:text-blue-400 font-bold tracking-wide transition-colors">+90 554 013 9999</a>
                 </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
