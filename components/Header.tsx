import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import UcretsizDeneModal from './UcretsizDeneModal';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDeneModalOpen, setIsDeneModalOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-2xl">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white/70 border-b border-white/5">
          <div className="container mx-auto px-4 md:px-8 py-2 flex justify-between items-center h-10">
            <div className="flex items-center text-[10px] md:text-[11px] font-bold tracking-widest">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              </span>
              TAM DESTEK HİZMETİ AKTİF
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em]">
              <Link to="/hakkimizda" className="hover:text-blue-400 transition-colors">Hakkımızda</Link>
              <Link to="/sss" className="hover:text-blue-400 transition-colors">S.S.S.</Link>
              <Link to="/yapay-zeka-uygulamalar" className="hover:text-blue-400 transition-colors">YAPAY ZEKA NEDİR?</Link>
              <Link to="/entegrasyonlar" className="hover:text-blue-400 transition-colors">ENTEGRASYONLAR</Link>
              <Link to="/kurumsal#iletisim" className="hover:text-blue-400 transition-colors">İLETİŞİM</Link>
            </nav>
            <div className="flex items-center space-x-4 md:hidden">
               <a href="mailto:info@mortanascompany.com" className="text-white hover:text-blue-400 transition-colors">
                  <i className="fas fa-envelope"></i>
               </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white text-slate-900 border-b border-slate-100 shadow-sm relative overflow-hidden group/header">
          {/* Advanced Premium Background Layering */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white/80"></div>
          
          {/* Subtle Grid Interaction Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"></div>
          
          {/* Glass Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          
          <div className="container mx-auto px-4 md:px-8 py-2 md:py-3 flex justify-between items-center gap-4 md:gap-12 relative z-10">
            {/* Logo - Redesigned as Agency */}
            <Link to="/" className="flex items-center group shrink-0" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 leading-none transition-all group-hover:scale-105">
                  MORTANAS
                </span>
                <span className="text-[9px] md:text-[11px] font-black tracking-[0.4em] text-blue-600 bg-blue-50 w-full text-center py-0.5 rounded-sm mt-0.5 uppercase">
                  AGENCY
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Yapay zeka çözümleri arasında arama yapın..." 
                  className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-2 px-6 pr-14 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-slate-600 font-medium placeholder:text-slate-400 group-hover:bg-slate-50"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>

            {/* Contact & Profile */}
            <div className="flex items-center space-x-3 md:space-x-10 shrink-0">
               {/* Contact Card */}
               <div className="hidden sm:flex items-center space-x-8">
                  <div className="flex items-center group cursor-pointer">
                    <div className="bg-blue-50 p-2.5 rounded-2xl shadow-sm text-blue-600 mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                       <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Müşteri Hizmetleri</span>
                       <a href="tel:+905540139999" className="text-sm md:text-[15px] font-black text-slate-800 transition-colors hover:text-blue-600">+90 554 013 9999</a>
                    </div>
                  </div>
                  
                  <div className="hidden xl:flex items-center group cursor-pointer border-l border-slate-100 pl-8">
                    <div className="bg-slate-50 p-2.5 rounded-2xl shadow-sm text-slate-400 mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:-rotate-12">
                       <i className="fas fa-envelope"></i>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">E-Posta Adresimiz</span>
                       <a href="mailto:info@mortanascompany.com" className="text-sm md:text-[15px] font-black text-slate-800 transition-colors hover:text-blue-600">info@mortanascompany.com</a>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center space-x-2">
                 <button className="p-2.5 md:p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-200 transition-all shadow-sm active:scale-95 group">
                    <i className="fas fa-user text-sm md:text-lg group-hover:text-blue-600"></i>
                 </button>
                 {/* Mobile Toggle */}
                 <button className="md:hidden p-3 rounded-2xl bg-slate-900 text-white shadow-lg active:scale-95" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Action Bar / Categories */}
        <div className="bg-[#002855] text-white hidden md:block border-t border-white/5">
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-14">
            <div className="h-full relative flex items-center" 
                 onMouseEnter={() => setIsCategoriesOpen(true)}
                 onMouseLeave={() => { setIsCategoriesOpen(false); setHoveredCategory(null); }}>
              <button 
                className="bg-blue-600 h-full px-8 flex items-center space-x-3 font-bold hover:bg-blue-700 transition-all uppercase tracking-[0.15em] text-xs"
              >
                <i className="fas fa-bars text-sm"></i>
                <span>TÜM KATEGORİLER</span>
              </button>

              {/* Categories Dropdown Container */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 flex z-[100] mt-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200 origin-top">
                  {/* Primary Categories */}
                  <div className="w-80 bg-gradient-to-b from-white to-slate-50 overflow-hidden py-1.5 border-r border-slate-100 flex flex-col rounded-bl-2xl">
                    {NAV_LINKS.map((link) => (
                      <div 
                        key={link.name} 
                        className={`group px-5 py-1.5 cursor-pointer transition-all duration-300 border-l-4 ${hoveredCategory === link.name ? 'bg-blue-50/80 border-blue-600 shadow-sm' : 'hover:bg-slate-100/50 border-transparent'}`}
                        onMouseEnter={() => setHoveredCategory(link.name)}
                      >
                        <Link 
                          to={link.path !== '#' ? link.path : ''} 
                          onClick={(e) => { if(link.path === '#') e.preventDefault(); setIsCategoriesOpen(false); }}
                          className={`flex items-center justify-between font-extrabold text-[12px] uppercase tracking-wider transition-colors ${hoveredCategory === link.name ? 'text-blue-700' : 'text-slate-800'}`}
                        >
                          <span className="flex items-center">
                             <i className={`fas fa-circle text-[6px] mr-4 transition-transform ${hoveredCategory === link.name ? 'scale-150 text-blue-600' : 'text-slate-300'}`}></i>
                             {link.name}
                          </span>
                          {link.children && <i className={`fas fa-chevron-right text-[10px] transition-transform ${hoveredCategory === link.name ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`}></i>}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Secondary Submenu */}
                  {hoveredCategory && NAV_LINKS.find(l => l.name === hoveredCategory)?.children && (
                    <div className="w-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-br-2xl py-3 px-6 border-l border-slate-200 animate-in fade-in slide-in-from-left-4 duration-300 max-h-[80vh] overflow-y-auto">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] bg-blue-100/50 px-3 py-1.5 rounded-full">{hoveredCategory}</span>
                        <div className="h-[1px] flex-1 bg-slate-200 ml-4"></div>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5">
                        {NAV_LINKS.find(l => l.name === hoveredCategory)?.children?.map((child) => (
                          <Link 
                            key={child.name} 
                            to={child.path} 
                            onClick={() => setIsCategoriesOpen(false)}
                            className="bg-white flex items-center justify-between px-4 py-1.5 rounded-lg hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-800 text-slate-700 hover:text-white font-bold text-[11px] uppercase tracking-wide group transition-all duration-300 shadow-sm border border-slate-100 hover:border-transparent hover:shadow-xl hover:-translate-y-0.5"
                          >
                            <span>{child.name}</span>
                            <i className="fas fa-arrow-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-400"></i>
                          </Link>
                        ))}
                      </div>
                      
                      {/* Submenu Footer Decorative Element */}
                      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                         <span>Premium Solutions</span>
                         <div className="flex space-x-1">
                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                            <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                            <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Center Navigation links in Blue Bar */}
            <nav className="flex-1 hidden lg:flex items-center ml-8 space-x-8">
              <div className="relative group">
                <Link to="#" className="text-[11px] font-bold uppercase tracking-wider text-white/90 hover:text-blue-400 transition-colors whitespace-nowrap flex items-center h-14">
                  HİZMETLERİMİZ
                  <i className="fas fa-chevron-down ml-1.5 text-[8px] opacity-70"></i>
                </Link>
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white rounded-xl shadow-xl w-64 py-2 border border-slate-100 flex flex-col mt-[-5px]">
                    <Link to="/yapay-zeka-otomasyonlari" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Yapay Zeka Otomasyon</Link>
                    <Link to="/yapay-zeka-uygulamalar" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Sektör Yazılımlarımız (CRM)</Link>
                    <Link to="/yapay-zeka-produksiyon" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Yapay Zeka Prodüksiyon</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <Link to="#" className="text-[11px] font-bold uppercase tracking-wider text-white/90 hover:text-blue-400 transition-colors whitespace-nowrap flex items-center h-14">
                  PROJELERİMİZ
                  <i className="fas fa-chevron-down ml-1.5 text-[8px] opacity-70"></i>
                </Link>
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white rounded-xl shadow-xl w-56 py-2 border border-slate-100 flex flex-col mt-[-5px]">
                    <a href="https://www.mortanas.com/create" target="_blank" rel="noopener noreferrer" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Create</a>
                    <Link to="#" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Journal</Link>
                    <Link to="#" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Social Agent</Link>
                  </div>
                </div>
              </div>
              <Link to="/sektor-cozumlerimiz" className="text-[11px] font-bold uppercase tracking-wider text-white/90 hover:text-blue-400 transition-colors whitespace-nowrap">
                SEKTÖREL ÇÖZÜMLERİMİZ
              </Link>
              <div className="relative group">
                <Link to="/paketler" className="text-[11px] font-bold uppercase tracking-wider text-white/90 hover:text-blue-400 transition-colors whitespace-nowrap flex items-center h-14">
                  FİYATLANDIRMA VE PAKETLER
                  <i className="fas fa-chevron-down ml-1.5 text-[8px] opacity-70"></i>
                </Link>
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white rounded-xl shadow-xl w-56 py-2 border border-slate-100 flex flex-col mt-[-5px]">
                    <Link to="/paketler/media" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Media</Link>
                    <Link to="/paketler/digital" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Digital</Link>
                    <Link to="/paketler/flow" className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-blue-600">Mortanas Flow</Link>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center space-x-10">
               <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Mobile Menu Expanded */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-t border-slate-100 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden z-40`}>
          <div className="p-6 flex flex-col space-y-2">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Arama yapın..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-600"
              />
            </div>
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-slate-50">
                <div 
                  className="flex items-center justify-between py-4 cursor-pointer"
                  onClick={() => {
                    if (link.children) {
                      setActiveMobileSubmenu(activeMobileSubmenu === link.name ? null : link.name);
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  <Link 
                    to={link.path !== '#' ? link.path : ''} 
                    className="text-slate-700 font-bold uppercase tracking-widest text-xs"
                    onClick={(e) => { if(link.path === '#') e.preventDefault(); if(!link.children) setIsMenuOpen(false); }}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <i className={`fas fa-chevron-down text-[10px] text-slate-400 transition-transform ${activeMobileSubmenu === link.name ? 'rotate-180' : ''}`}></i>
                  )}
                </div>
                
                {/* Mobile Submenu */}
                {link.children && activeMobileSubmenu === link.name && (
                  <div className="pl-4 pb-4 flex flex-col space-y-3 bg-slate-50 rounded-xl mb-4 p-4 mt-1">
                    {link.children.map((child) => (
                      <Link 
                        key={child.name} 
                        to={child.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-600 uppercase tracking-widest flex items-center space-x-2"
                      >
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{child.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 grid grid-cols-1 gap-4">
               <button onClick={() => { setIsDeneModalOpen(true); setIsMenuOpen(false); }} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-xs">
                  ÜCRETSİZ DENE
               </button>
               <a href="tel:+905540139999" className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-xl text-center uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2">
                  <i className="fas fa-phone-alt"></i>
                  <span>+90 554 013 9999</span>
               </a>
               <a href="mailto:info@mortanascompany.com" className="w-full bg-slate-50 text-slate-500 font-medium py-3 rounded-xl text-center text-[10px] flex items-center justify-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <span>info@mortanascompany.com</span>
               </a>
            </div>
          </div>
        </div>
      </header>
      {isDeneModalOpen && <UcretsizDeneModal isOpen={isDeneModalOpen} onClose={() => setIsDeneModalOpen(false)} />}
    </>
  );
};

export default Header;