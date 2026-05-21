import React, { useState, useMemo, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import type { FinancialRecord } from '../../types';

// --- PERSISTENCE & MOCK DATA ---
const FINANCE_STORAGE_KEY = 'mortanasFinancialRecords';

const getInitialRecords = (): FinancialRecord[] => {
    try {
        const stored = localStorage.getItem(FINANCE_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        
        const mockData: FinancialRecord[] = [
            { id: 'fin-1', type: 'Gelir', amount: 35000, date: new Date(Date.now() - 25 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Web Sitesi Geliştirme Projesi', category: 'Proje Geliri' },
            { id: 'fin-2', type: 'Gelir', amount: 12000, date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], status: 'Beklemede', description: 'Aylık Danışmanlık Ücreti', category: 'Danışmanlık' },
            { id: 'fin-3', type: 'Gider', amount: 3500, date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Sunucu Maliyetleri', category: 'Operasyonel Gider' },
            { id: 'fin-4', type: 'Gider', amount: 5000, date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Ofis Kirası', category: 'Sabit Gider' },
            { id: 'fin-5', type: 'Gelir', amount: 8000, date: new Date(Date.now() - 40 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Sosyal Medya Otomasyonu Kurulum', category: 'Proje Geliri' },
            { id: 'fin-6', type: 'Gider', amount: 2000, date: new Date(Date.now() - 35 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Yazılım Lisansları', category: 'Yazılım Lisansları' },
            { id: 'fin-7', type: 'Gider', amount: 1500, date: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0], status: 'Tamamlandı', description: 'Reklam Harcaması', category: 'Pazarlama' },
        ];
        localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) {
        return [];
    }
};

const saveRecords = (records: FinancialRecord[]) => {
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(records));
};

const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

// --- SUB-COMPONENTS ---
const StatCard: React.FC<{ icon: string; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">{title}</p><p className={`text-2xl font-bold ${color}`}>{value}</p></div>
);

const TransactionModal: React.FC<{ record: Partial<FinancialRecord> | null; onClose: () => void; onSave: (data: any) => void; categories: string[] }> = ({ record, onClose, onSave, categories }) => {
    const [formData, setFormData] = useState({
        id: record?.id,
        type: record?.type || 'Gelir',
        description: record?.description || '',
        amount: record?.amount || '',
        date: record?.date || new Date().toISOString().split('T')[0],
        category: record?.category || '',
        status: record?.status || 'Tamamlandı',
    });
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    useEffect(() => {
        if (record?.category && !categories.includes(record.category)) {
            setIsCustomCategory(true);
            setCustomCategory(record.category);
        }
    }, [record, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        const finalCategory = isCustomCategory ? customCategory : formData.category;
        if (!finalCategory) {
            alert('Lütfen bir kategori seçin veya girin.');
            return;
        }
        onSave({ ...formData, category: finalCategory }); 
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 text-slate-300">
                <h3 className="text-xl font-bold text-white mb-4">{record?.id ? 'İşlemi Düzenle' : 'Yeni İşlem Ekle'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">İşlem Tipi</label><select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option value="Gelir">Gelir</option><option value="Gider">Gider</option></select></div>
                        <div><label className="text-sm">Durum</label><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option value="Tamamlandı">Tamamlandı</option><option value="Beklemede">Beklemede</option></select></div>
                    </div>
                    <div><label className="text-sm">Açıklama</label><input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Tutar (₺)</label><input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                        <div>
                            <label className="text-sm">Kategori</label>
                            <select
                                name="category"
                                value={isCustomCategory ? 'other' : formData.category}
                                onChange={(e) => {
                                    if (e.target.value === 'other') {
                                        setIsCustomCategory(true);
                                        setFormData(p => ({ ...p, category: '' }));
                                    } else {
                                        setIsCustomCategory(false);
                                        handleChange(e);
                                    }
                                }}
                                className="w-full bg-slate-700 p-2 rounded-md mt-1"
                            >
                                <option value="" disabled>Kategori Seçin</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                <option value="other">Diğer...</option>
                            </select>
                        </div>
                    </div>
                    {isCustomCategory && (
                        <div>
                            <label className="text-sm">Yeni Kategori Adı</label>
                            <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full bg-slate-700 p-2 rounded-md mt-1" placeholder="örn: Personel Gideri" required/>
                        </div>
                    )}
                    <div><label className="text-sm">Tarih</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={onClose} className="bg-slate-600 px-4 py-2 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{ record: FinancialRecord; onCancel: () => void; onConfirm: () => void; }> = ({ record, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center">
            <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>
            <h3 className="text-lg font-bold text-white mt-4">Silme Onayı</h3>
            <p className="text-sm text-slate-400 mt-2">
                "{record.description}" işlemini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
);

const MonthlyChart: React.FC<{ records: FinancialRecord[] }> = ({ records }) => {
    const monthlyData = useMemo(() => {
        const data: { [key: string]: { income: number; expense: number } } = {};
        records.forEach(rec => {
            const month = new Date(rec.date).toLocaleString('tr-TR', { month: 'short', year: '2-digit' });
            if (!data[month]) data[month] = { income: 0, expense: 0 };
            if (rec.type === 'Gelir') data[month].income += rec.amount;
            else data[month].expense += rec.amount;
        });
        
        return Object.entries(data)
            .sort(([a], [b]) => new Date(`01 ${a.replace("'", " 20")}`).getTime() - new Date(`01 ${b.replace("'", " 20")}`).getTime())
            .slice(-6);

    }, [records]);

    const maxVal = Math.max(...monthlyData.map(d => Math.max(d[1].income, d[1].expense)), 1);

    return (
        <div className="bg-slate-900 p-6 rounded-xl h-full">
            <h3 className="text-lg font-semibold">Aylık Gelir & Gider</h3>
            <div className="mt-4 h-64 flex items-end space-x-4">
                {monthlyData.map(([month, data]) => (
                    <div key={month} className="flex-1 flex flex-col items-center space-y-1">
                        <div className="relative w-full h-full flex items-end justify-center gap-1">
                            <div title={`Gelir: ${currencyFormatter.format(data.income)}`} className="w-1/2 bg-green-500 rounded-t-md hover:opacity-80 transition-opacity" style={{ height: `${(data.income / maxVal) * 100}%` }}></div>
                            <div title={`Gider: ${currencyFormatter.format(data.expense)}`} className="w-1/2 bg-red-500 rounded-t-md hover:opacity-80 transition-opacity" style={{ height: `${(data.expense / maxVal) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-400">{month}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ExpensePieChart: React.FC<{ records: FinancialRecord[] }> = ({ records }) => {
    const categoryExpenses = useMemo(() => {
        const expenses = records.filter(r => r.type === 'Gider');
        const categoryMap: { [key: string]: number } = {};
        expenses.forEach(rec => {
            categoryMap[rec.category] = (categoryMap[rec.category] || 0) + rec.amount;
        });
        const total = Object.values(categoryMap).reduce((sum, val) => sum + val, 0) || 1;
        return Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value, percentage: (value / total) * 100 }))
            .sort((a, b) => b.value - a.value);
    }, [records]);

    const colors = ['#8b5cf6', '#ec4899', '#f97316', '#10b981', '#3b82f6'];
    
    let cumulativePercentage = 0;
    const conicGradient = categoryExpenses.map((category, index) => {
        const color = colors[index % colors.length];
        const start = cumulativePercentage;
        cumulativePercentage += category.percentage;
        const end = cumulativePercentage;
        return `${color} ${start}% ${end}%`;
    }).join(', ');

    return (
        <div className="bg-slate-900 p-6 rounded-xl h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Gider Kategorileri</h3>
            {categoryExpenses.length > 0 ? (
                <div className="flex-grow flex flex-col md:flex-row items-center gap-6">
                    <div className="w-40 h-40 rounded-full flex-shrink-0" style={{ background: `conic-gradient(${conicGradient})` }}></div>
                    <ul className="space-y-2 text-sm w-full">
                        {categoryExpenses.slice(0, 5).map((cat, index) => (
                            <li key={cat.name} className="flex items-center">
                                <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[index % colors.length] }}></span>
                                <span className="flex-grow text-slate-300 truncate">{cat.name}</span>
                                <span className="font-semibold text-white ml-2">{cat.percentage.toFixed(1)}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : <p className="text-slate-500 text-center flex-grow flex items-center justify-center">Gider kaydı bulunmuyor.</p>}
        </div>
    );
};

// --- MAIN COMPONENT ---
const AdminFinansYonetimiPage: React.FC = () => {
    const [records, setRecords] = useState<FinancialRecord[]>(getInitialRecords);
    // FIX: Changed type to allow for partial new records
    const [editingRecord, setEditingRecord] = useState<Partial<FinancialRecord> | null>(null);
    const [deletingRecord, setDeletingRecord] = useState<FinancialRecord | null>(null);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'Gelir' | 'Gider'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'Tamamlandı' | 'Beklemede'>('all');
    const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

    useEffect(() => { saveRecords(records); }, [records]);

    const stats = useMemo(() => {
        const totalIncome = records.filter(r => r.type === 'Gelir').reduce((sum, r) => sum + r.amount, 0);
        const totalExpense = records.filter(r => r.type === 'Gider').reduce((sum, r) => sum + r.amount, 0);
        const netProfit = totalIncome - totalExpense;
        const pendingReceivables = records.filter(r => r.type === 'Gelir' && r.status === 'Beklemede').reduce((sum, r) => sum + r.amount, 0);
        return { totalIncome, totalExpense, netProfit, pendingReceivables };
    }, [records]);
    
    const filteredRecords = useMemo(() => {
        return records
            .filter(r => typeFilter === 'all' || r.type === typeFilter)
            .filter(r => statusFilter === 'all' || r.status === statusFilter)
            .filter(r => !dateFilter.start || r.date >= dateFilter.start)
            .filter(r => !dateFilter.end || r.date <= dateFilter.end)
            .filter(r => r.description.toLowerCase().includes(searchTerm.toLowerCase()) || r.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [records, searchTerm, typeFilter, statusFilter, dateFilter]);

    const handleOpenModal = (record: Partial<FinancialRecord> | null, type?: 'Gelir' | 'Gider') => {
        setEditingRecord(record ? record : (type ? { type } : {}));
    };

    const handleSave = (data: Omit<FinancialRecord, 'id'> & {id?: string}) => {
        if (data.id) {
            setRecords(prev => prev.map(r => r.id === data.id ? { ...r, ...data, amount: Number(data.amount) } as FinancialRecord : r));
        } else {
            const newRecord: FinancialRecord = { ...data as Omit<FinancialRecord, 'id'>, id: `fin-${Date.now()}`, amount: Number(data.amount) };
            setRecords(prev => [newRecord, ...prev]);
        }
        setEditingRecord(null);
    };

    const handleDelete = () => {
        if(deletingRecord) {
            setRecords(prev => prev.filter(r => r.id !== deletingRecord.id));
            setDeletingRecord(null);
        }
    };

    const handleExport = () => {
        const headers = ["Tarih", "Açıklama", "Kategori", "Tip", "Tutar", "Durum"];
        const rows = filteredRecords.map(rec => [
            rec.date,
            `"${rec.description.replace(/"/g, '""')}"`, // Handle quotes
            rec.category,
            rec.type,
            rec.amount,
            rec.status
        ].join(','));
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `finans_raporu_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const clearFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setStatusFilter('all');
        setDateFilter({ start: '', end: '' });
    };

    const recentRecords = useMemo(() => [...records].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [records]);
    const uniqueCategories = useMemo(() => [...new Set(records.map(r => r.category).filter(Boolean))], [records]);
    
    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <AdminHeader title="Finans Yönetimi" />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Toplam Gelir" value={currencyFormatter.format(stats.totalIncome)} color="text-green-400" icon="fa-arrow-up" />
                <StatCard title="Toplam Gider" value={currencyFormatter.format(stats.totalExpense)} color="text-red-400" icon="fa-arrow-down" />
                <StatCard title="Net Kâr" value={currencyFormatter.format(stats.netProfit)} color={stats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'} icon="fa-balance-scale" />
                <StatCard title="Bekleyen Alacaklar" value={currencyFormatter.format(stats.pendingReceivables)} color="text-yellow-400" icon="fa-hourglass-half" />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-slate-900 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Son İşlemler Akışı</h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {recentRecords.slice(0, 10).map(rec => (
                             <div key={rec.id} className="flex items-center space-x-4 p-3 bg-slate-800 rounded-lg">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${rec.type === 'Gelir' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    <i className={`fas ${rec.type === 'Gelir' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm text-slate-100">{rec.description}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-slate-400">{rec.category}</p>
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <div className={`w-2 h-2 rounded-full ${rec.status === 'Tamamlandı' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            {rec.status}
                                        </div>
                                    </div>
                                </div>
                                 <p className={`font-bold text-sm flex-shrink-0 ${rec.type === 'Gelir' ? 'text-green-400' : 'text-red-400'}`}>{currencyFormatter.format(rec.amount)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1"><MonthlyChart records={records} /></div>
                <div className="lg:col-span-1"><ExpensePieChart records={records} /></div>
            </div>

            <div className="mt-6 bg-slate-900 rounded-lg overflow-hidden">
                <div className="p-4 bg-slate-800/50 flex flex-wrap gap-4 items-center border-b border-slate-700">
                    <input type="text" placeholder="Açıklama veya kategori ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-700 border-slate-600 rounded-md p-2 text-sm flex-grow min-w-[200px]"/>
                    <div className="flex gap-2 items-center"><label className="text-xs">Tarih:</label><input type="date" value={dateFilter.start} onChange={e => setDateFilter(p => ({...p, start: e.target.value}))} className="bg-slate-700 border-slate-600 rounded-md p-2 text-sm" /><span className="text-slate-500">-</span><input type="date" value={dateFilter.end} onChange={e => setDateFilter(p => ({...p, end: e.target.value}))} className="bg-slate-700 border-slate-600 rounded-md p-2 text-sm" /></div>
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)} className="bg-slate-700 border-slate-600 rounded-md p-2 text-sm"><option value="all">Tüm Tipler</option><option value="Gelir">Gelir</option><option value="Gider">Gider</option></select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-700 border-slate-600 rounded-md p-2 text-sm"><option value="all">Tüm Durumlar</option><option value="Tamamlandı">Tamamlandı</option><option value="Beklemede">Beklemede</option></select>
                    <button onClick={clearFilters} className="text-sm text-slate-400 hover:text-white">Temizle</button>
                </div>
                <div className="p-6 flex flex-wrap gap-4 justify-between items-center border-b border-slate-700">
                    <h3 className="text-lg font-semibold">Tüm İşlemler ({filteredRecords.length})</h3>
                    <div className="flex items-center gap-2">
                         <button onClick={handleExport} className="bg-slate-700 hover:bg-slate-600 font-semibold py-2 px-3 rounded-md text-sm"><i className="fas fa-download mr-2"></i>CSV</button>
                        <button onClick={() => handleOpenModal({ type: 'Gelir' })} className="bg-green-600/80 hover:bg-green-700 font-semibold py-2 px-3 rounded-md text-sm"><i className="fas fa-plus"></i> Gelir</button>
                        <button onClick={() => handleOpenModal({ type: 'Gider' })} className="bg-red-600/80 hover:bg-red-700 font-semibold py-2 px-3 rounded-md text-sm"><i className="fas fa-minus"></i> Gider</button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                            <tr>
                                <th className="p-4">Tarih</th><th className="p-4">Açıklama</th><th className="p-4">Kategori</th>
                                <th className="p-4">Tip</th><th className="p-4">Tutar</th><th className="p-4">Durum</th><th className="p-4">Eylemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(rec => (
                                <tr key={rec.id} className="border-t border-slate-800 hover:bg-slate-800/40 group">
                                    <td className="p-4">{new Date(rec.date).toLocaleDateString('tr-TR')}</td>
                                    <td className="p-4 font-semibold">{rec.description}</td>
                                    <td className="p-4 text-slate-400">{rec.category}</td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${rec.type === 'Gelir' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>{rec.type}</span></td>
                                    <td className={`p-4 font-bold ${rec.type === 'Gelir' ? 'text-green-400' : 'text-red-400'}`}>{currencyFormatter.format(rec.amount)}</td>
                                    <td className="p-4"><span className={`text-xs font-semibold ${rec.status === 'Tamamlandı' ? 'text-slate-400' : 'text-yellow-400'}`}>{rec.status}</span></td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity space-x-4">
                                            <button onClick={() => handleOpenModal(rec)} className="text-slate-400 hover:text-white">Düzenle</button>
                                            <button onClick={() => setDeletingRecord(rec)} className="text-slate-400 hover:text-red-400">Sil</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredRecords.length === 0 && <p className="text-center text-slate-500 p-8">Filtrelerle eşleşen kayıt bulunamadı.</p>}
                </div>
            </div>
            {editingRecord && <TransactionModal record={editingRecord} onClose={() => setEditingRecord(null)} onSave={handleSave} categories={uniqueCategories} />}
            {deletingRecord && <DeleteConfirmModal record={deletingRecord} onCancel={() => setDeletingRecord(null)} onConfirm={handleDelete} />}
        </div>
    );
};

export default AdminFinansYonetimiPage;