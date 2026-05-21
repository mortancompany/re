import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import type { Invoice, ExpenseInvoice, Talep } from '../../types';

// --- PERSISTENCE & MOCK DATA ---
const INVOICES_STORAGE_KEY = 'mortanasInvoices_v2';
const EXPENSE_INVOICES_STORAGE_KEY = 'mortanasExpenseInvoices';
const TALEPLER_STORAGE_KEY = 'mortanasTalepler';

const getInitialInvoices = (): Invoice[] => {
    try {
        const stored = localStorage.getItem(INVOICES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to retrieve invoices from localStorage", e);
        return [];
    }
};

const getInitialExpenseInvoices = (): ExpenseInvoice[] => {
    try {
        const stored = localStorage.getItem(EXPENSE_INVOICES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to retrieve expense invoices from localStorage", e);
        return [];
    }
};

const getInitialTalepler = (): Talep[] => {
    try {
        const stored = localStorage.getItem(TALEPLER_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

const DashboardCard: React.FC<{ icon: string; title: string; value: string; color: string; link?: string }> = ({ icon, title, value, color, link }) => {
    const content = (
        <div className="bg-slate-900 p-5 rounded-xl flex items-center space-x-4 h-full">
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${color}`}>
                <i className={`${icon} text-2xl`}></i>
            </div>
            <div>
                <p className="text-sm text-slate-400">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );

    return link ? <Link to={link} className="hover:scale-105 transition-transform">{content}</Link> : content;
};

const AdminDashboardPage: React.FC = () => {
    
    const [invoices] = useState<Invoice[]>(getInitialInvoices);
    const [expenseInvoices] = useState<ExpenseInvoice[]>(getInitialExpenseInvoices);
    const [talepler] = useState<Talep[]>(getInitialTalepler);
    
    const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 });

    const { totalIncome, totalExpense } = useMemo(() => {
        const currentYear = new Date().getFullYear();
        
        const totalIncome = invoices
            .filter(inv => inv.status === 'Ödendi' && new Date(inv.issueDate).getFullYear() === currentYear)
            .reduce((sum, inv) => sum + inv.total, 0);
            
        const totalExpense = expenseInvoices
            .filter(exp => new Date(exp.date).getFullYear() === currentYear)
            .reduce((sum, exp) => sum + exp.amount, 0);

        return { totalIncome, totalExpense };
    }, [invoices, expenseInvoices]);

    const yeniTalepCount = useMemo(() => {
        return talepler.filter(t => t.status === 'Yeni').length;
    }, [talepler]);

    const monthlyData = useMemo(() => {
        const data: { [key: string]: { income: number; expense: number } } = {};
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = d.toLocaleString('tr-TR', { month: 'short' });
            data[monthKey] = { income: 0, expense: 0 };
        }

        invoices.forEach(inv => {
            if (inv.status !== 'Ödendi') return;
            const invDate = new Date(inv.issueDate);
            const monthDiff = (today.getFullYear() - invDate.getFullYear()) * 12 + (today.getMonth() - invDate.getMonth());
            if (monthDiff >= 0 && monthDiff < 7) {
                const monthKey = invDate.toLocaleString('tr-TR', { month: 'short' });
                if (data[monthKey]) {
                    data[monthKey].income += inv.total;
                }
            }
        });

        expenseInvoices.forEach(exp => {
            const expDate = new Date(exp.date);
            const monthDiff = (today.getFullYear() - expDate.getFullYear()) * 12 + (today.getMonth() - expDate.getMonth());
            if (monthDiff >= 0 && monthDiff < 7) {
                const monthKey = expDate.toLocaleString('tr-TR', { month: 'short' });
                if (data[monthKey]) {
                    data[monthKey].expense += exp.amount;
                }
            }
        });

        return Object.entries(data).map(([month, values]) => ({ month, ...values }));
    }, [invoices, expenseInvoices]);

    const maxFinancialValue = useMemo(() => {
        if (monthlyData.length === 0) return 10000;
        const max = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
        return Math.ceil(max / 5000) * 5000 || 5000;
    }, [monthlyData]);
    
    const teamWorkload = [
        { name: 'Ayşe Yılmaz', projects: 3 },
        { name: 'Mehmet Kaya', projects: 2 },
        { name: 'Fatma Demir', projects: 2 },
        { name: 'Canberk Öz', projects: 1 },
        { name: 'Diğer', projects: 1.8 }
    ];

    const contracts = [
        { title: 'Veri Analiz Platformu', company: 'İnovasyon A.Ş', value: 35000, icon: 'fa-solid fa-server' },
        { title: 'Yıllık Sunucu Desteği', company: 'Global Web Servisleri', value: 12000, icon: 'fa-solid fa-cloud' },
        { title: 'Aylık AI Model Bakımı', company: 'Teknoloji Çözümleri A.Ş.', value: 2500, per: 'ay', icon: 'fa-solid fa-brain' }
    ];

    return (
        <div className="flex-1 p-8 text-white overflow-y-auto h-screen">
            <AdminHeader title="Dashboard" />
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <Link to="/admin/randevular" state={{ action: 'add_new' }} className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-calendar-plus text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Randevu</p>
                </Link>
                <Link to="/admin/projeler" className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-diagram-project text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Proje</p>
                </Link>
                <Link to="/admin/musteriler" state={{ action: 'add_new' }} className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-user-plus text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Müşteri</p>
                </Link>
                <Link to="/admin/fatura-yonetimi" state={{ action: 'add_expense' }} className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-wallet text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Harcama</p>
                </Link>
                <Link to="/admin/gorevler" state={{ action: 'add_new' }} className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-list-check text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Görev</p>
                </Link>
                <Link to="/admin/teklif-olusturucu" state={{ action: 'add_new' }} className="bg-slate-900 p-4 rounded-xl text-center hover:bg-slate-800 transition-colors">
                    <i className="fa-solid fa-file-alt text-2xl text-purple-400"></i>
                    <p className="mt-2 text-sm font-semibold">Yeni Teklif</p>
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard icon="fa-solid fa-coins" title="Toplam Gelir (YTD)" value={currencyFormatter.format(totalIncome)} color="bg-purple-600/30 text-purple-300" />
                <DashboardCard icon="fa-solid fa-money-bill-transfer" title="Toplam Gider (YTD)" value={currencyFormatter.format(totalExpense)} color="bg-red-600/30 text-red-300" />
                <DashboardCard icon="fa-solid fa-inbox" title="Yeni Gelen Talepler" value={yeniTalepCount.toString()} color="bg-cyan-600/30 text-cyan-300" link="/admin/talepler" />
                <DashboardCard icon="fa-solid fa-calendar-check" title="Yaklaşan Randevular" value="3" color="bg-yellow-600/30 text-yellow-300" link="/admin/randevular" />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold">Aylık Finansal Özet (Son 7 Ay)</h3>
                     <div className="mt-4 h-64 flex items-end relative pr-4 pl-12">
                        {/* Y-Axis Labels */}
                        <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-slate-400 py-1">
                            <span>{currencyFormatter.format(maxFinancialValue)}</span>
                            <span>{currencyFormatter.format(maxFinancialValue / 2)}</span>
                            <span>{currencyFormatter.format(0)}</span>
                        </div>
                        <div className="absolute top-0 left-10 h-full w-px bg-slate-700"></div>
                        <div className="absolute bottom-6 left-10 w-full h-px bg-slate-700"></div>

                        {/* Chart Bars */}
                        <div className="w-full h-full flex items-end space-x-4">
                             {monthlyData.map(data => (
                                <div key={data.month} className="flex-1 flex flex-col items-center space-y-1 group relative h-full">
                                    <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-700 p-2 rounded-md text-xs whitespace-nowrap shadow-lg z-10">
                                        <p className="font-bold">{data.month}</p>
                                        <p className="text-purple-300">Gelir: {currencyFormatter.format(data.income)}</p>
                                        <p className="text-red-400">Gider: {currencyFormatter.format(data.expense)}</p>
                                    </div>
                                    <div className="w-full h-full flex items-end justify-center gap-1">
                                        <div 
                                            className="w-1/2 bg-purple-500 rounded-t-md hover:bg-purple-400 transition-colors"
                                            style={{ height: `${(data.income / maxFinancialValue) * 100}%` }}
                                        ></div>
                                        <div 
                                            className="w-1/2 bg-red-500 rounded-t-md hover:bg-red-400 transition-colors"
                                            style={{ height: `${(data.expense / maxFinancialValue) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-slate-400">{data.month}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="flex justify-end space-x-4 mt-4 text-sm">
                        <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></span>Gelir</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-sm mr-2"></span>Gider</div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-3">Bugünkü Görevlerim</h3>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="h-5 w-5 rounded bg-slate-700 border-slate-600 focus:ring-purple-500" />
                            <p className="text-slate-300">Yeni müşteri sunumunu hazırla</p>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold">Yaklaşan Ödemeler ve Tahsilatlar</h3>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Değerli Sözleşmeler</h3>
                        <div className="space-y-4">
                            {contracts.map(contract => (
                                <div key={contract.title} className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-3">
                                        <i className={`${contract.icon} text-purple-400`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{contract.title}</p>
                                        <p className="text-xs text-slate-400">{contract.company}</p>
                                    </div>
                                    <p className="font-bold text-green-400">{currencyFormatter.format(contract.value)} {contract.per && `/${contract.per}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl flex flex-col items-center">
                    <h3 className="text-lg font-semibold self-start mb-4">Proje Durumları</h3>
                    <div className="relative w-48 h-48">
                        <div className="w-full h-full rounded-full" style={{background: 'conic-gradient(#6366f1 0% 35%, #a855f7 35% 60%, #10b981 60% 80%, #f97316 80% 100%)'}}></div>
                        <div className="absolute inset-5 bg-slate-900 rounded-full"></div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl">
                     <h3 className="text-lg font-semibold">Ekip Yük Dağılımı (Proje Sayısı)</h3>
                     <div className="mt-4 space-y-4">
                        {teamWorkload.map(member => (
                            <div key={member.name} className="flex items-center">
                                <p className="w-28 text-sm text-slate-400">{member.name}</p>
                                <div className="flex-1 bg-slate-800 rounded-full h-4">
                                    <div className="bg-purple-500 h-4 rounded-full" style={{width: `${(member.projects / 3) * 100}%`}}></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboardPage;