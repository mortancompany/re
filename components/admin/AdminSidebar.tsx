import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const sidebarLinks = [
    { 
        category: 'GENEL', 
        items: [
            { name: 'Dashboard', path: '/admin/dashboard', icon: 'fa-solid fa-table-columns' },
            { name: 'Randevular', path: '/admin/randevular', icon: 'fa-solid fa-calendar-days' },
            { name: 'Görevler', path: '/admin/gorevler', icon: 'fa-solid fa-list-check' },
            { name: 'Analitik', path: '/admin/analitik', icon: 'fa-solid fa-chart-line' },
        ]
    },
    { 
        category: 'MÜŞTERİ', 
        items: [
            { name: 'Müşteriler (CRM)', path: '/admin/musteriler', icon: 'fa-solid fa-users' },
            { name: 'Talepler', path: '/admin/talepler', icon: 'fa-solid fa-inbox' },
            { name: 'Soğuk Arama', path: '/admin/soguk-arama', icon: 'fa-solid fa-phone' },
            { name: 'Hedef Kitle', path: '/admin/hedef-kitle', icon: 'fa-solid fa-bullseye' },
            { name: 'Toplu E-posta', path: '/admin/toplu-eposta', icon: 'fa-solid fa-envelope-open-text' },
            { name: 'Partnerler', path: '/admin/partnerler', icon: 'fa-solid fa-handshake' },
        ]
    },
    { 
        category: 'FİNANS', 
        items: [
            { name: 'Finans Yönetimi', path: '/admin/finans-yonetimi', icon: 'fa-solid fa-wallet' },
            { name: 'Teklif Oluşturucu', path: '/admin/teklif-olusturucu', icon: 'fa-solid fa-file-signature' },
            { name: 'Fatura Yönetimi', path: '/admin/fatura-yonetimi', icon: 'fa-solid fa-file-invoice-dollar' },
            { name: 'Fiyatlandırmalar', path: '/admin/fiyatlandirmalar', icon: 'fa-solid fa-tags' },
            { name: 'Abonelik Sistemi', path: '/admin/abonelik-sistemi', icon: 'fa-solid fa-dollar-sign' },
        ]
    },
    { 
        category: 'OPERASYON', 
        items: [
            { name: 'Projeler', path: '/admin/projeler', icon: 'fa-solid fa-diagram-project' },
            { name: 'Alınan İşler', path: '/admin/alinan-isler', icon: 'fa-solid fa-briefcase' },
            { name: 'Ekip Yönetimi', path: '/admin/ekip-yonetimi', icon: 'fa-solid fa-users-gear' },
            { name: 'İhtiyaçlar', path: '/admin/ihtiyaclar', icon: 'fa-solid fa-cart-flatbed' },
        ]
    },
    { 
        category: 'STRATEJİ', 
        items: [
            { name: 'İş Planlama', path: '/admin/is-planlama', icon: 'fa-solid fa-clipboard-list' },
            { name: 'Stratejik Hedefler', path: '/admin/stratejik-hedefler', icon: 'fa-regular fa-comment' },
        ]
    },
    { 
        category: 'YAPAY ZEKA', 
        items: [
            { name: 'AI Destek', path: '/admin/ai-destek', icon: 'fa-solid fa-wand-magic-sparkles' },
            { name: 'AI Eğitim', path: '/admin/ai-egitim', icon: 'fa-solid fa-crosshairs' },
        ]
    },
    { 
        category: 'YÖNETİCİ', 
        items: [
            { name: 'Kişisel Hedefler', path: '/admin/kisisel-hedefler', icon: 'fa-regular fa-star' },
            { name: 'Parolalar', path: '/admin/parolalar', icon: 'fa-solid fa-key' },
            { name: 'Giriş Kayıtları', path: '/admin/login-logs', icon: 'fa-solid fa-shield-halved' },
        ]
    }
];

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
    };

    const activeStyle = {
        backgroundColor: '#6D28D9', // A nice purple color
        color: 'white',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    };

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-cubes text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-white">Mortanas</span>
            </div>
            <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                {sidebarLinks.map(group => (
                    <div key={group.category}>
                        <h3 className="px-3 text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">{group.category}</h3>
                        <ul className="space-y-1">
                            {group.items.map(item => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className="flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-slate-700"
                                        style={({ isActive }) => isActive ? activeStyle : {}}
                                    >
                                        <i className={`${item.icon} w-6 text-center`}></i>
                                        <span className="ml-3 text-sm font-medium">{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg transition-colors duration-200 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white"
                >
                    <i className="fa-solid fa-right-from-bracket w-6 text-center"></i>
                    <span className="ml-3 text-sm font-semibold">Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;