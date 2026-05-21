import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI, Type } from '@google/genai';
import type { Customer, CustomerStatus, Note, CrmAppointment, FinancialRecord, AppointmentStatus, Talep } from '../../types';

// --- MOCK DATA & PERSISTENCE ---
const CUSTOMERS_STORAGE_KEY = 'mortanasCustomers_v2';
const TALEPLER_STORAGE_KEY = 'mortanasTalepler';

const mockCustomers: Customer[] = [
  { 
    id: 'cust-1', 
    name: 'Ahmet Yılmaz', 
    company: 'İnovasyon A.Ş.', 
    email: 'ahmet@inovasyon.com', 
    phone: '555-111-2233', 
    status: 'Aktif', 
    totalRevenue: 47000, 
    lastInteraction: new Date(Date.now() - 3 * 86400000).toISOString(), 
    notes: [{id: 'note-1', content: 'Yeni proje teklifini olumlu karşıladı, bütçe onayı bekliyor.', timestamp: new Date().toISOString()}],
    tags: ['VIP', 'Teknoloji'],
    appointments: [
        { id: 'app-1', date: new Date().toISOString().split('T')[0], time: '10:00', service: 'Yeni Proje Teklifi', status: 'Yaklaşan'},
        { id: 'app-2', date: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0], time: '14:00', service: 'Proje Başlangıç Toplantısı', status: 'Tamamlandı'},
    ],
    financials: [
        { id: 'fin-1', type: 'Gelir', amount: 35000, date: new Date(Date.now() - 25 * 86400000).toISOString(), status: 'Tamamlandı', description: 'Web Sitesi Geliştirme', category: 'Proje Geliri' },
        { id: 'fin-2', type: 'Gelir', amount: 12000, date: new Date(Date.now() - 5 * 86400000).toISOString(), status: 'Beklemede', description: 'Aylık Danışmanlık', category: 'Danışmanlık' },
    ]
  },
  { id: 'cust-2', name: 'Ayşe Kaya', company: 'Global Web Servisleri', email: 'ayse.kaya@gws.com', phone: '555-222-3344', status: 'Aktif', totalRevenue: 12000, lastInteraction: new Date(Date.now() - 10 * 86400000).toISOString(), notes: [], tags: ['Kurumsal'], appointments: [], financials: [] },
  { id: 'cust-3', name: 'Mehmet Öztürk', company: 'Teknoloji Çözümleri', email: 'mehmet@techco.net', phone: '555-333-4455', status: 'Potansiyel', totalRevenue: 0, lastInteraction: new Date(Date.now() - 5 * 86400000).toISOString(), notes: [], tags: ['Sıcak Lead'], appointments: [], financials: [] },
  { id: 'cust-4', name: 'Fatma Demir', company: 'Dijital Ajans Co.', email: 'fatma@dijitalajans.com', phone: '555-444-5566', status: 'Pasif', totalRevenue: 5000, lastInteraction: new Date(Date.now() - 90 * 86400000).toISOString(), notes: [], tags: [], appointments: [], financials: [] },
];

const getInitialCustomers = (): Customer[] => {
    try {
        const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        } else {
            localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(mockCustomers));
            return mockCustomers;
        }
    } catch (e) {
        console.error("Müşteriler localStorage'dan alınamadı", e);
        return mockCustomers;
    }
};

const saveCustomers = (customers: Customer[]) => {
    try {
        localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
    } catch (e) {
        console.error("Müşteriler localStorage'a kaydedilemedi", e);
    }
};

const formatRelativeDate = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "az önce";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} dk önce`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} sa önce`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} gün önce`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} ay önce`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} yıl önce`;
};


// --- ICONS ---
const UserPlusIcon = () => <i className="fas fa-user-plus"></i>;
const EditIcon = () => <i className="fas fa-pencil"></i>;
const DeleteIcon = () => <i className="fas fa-trash-can"></i>;
const SparklesIcon = () => <i className="fas fa-wand-magic-sparkles"></i>;

// --- SUB-COMPONENTS (DEFINED BEFORE MAIN COMPONENT TO AVOID HOISTING ISSUES) ---

const CustomerModal: React.FC<{customer: Partial<Customer> & { fromTalepId?: string } | null; onClose: () => void; onSave: (data: any) => void}> = ({customer, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        id: customer?.id,
        name: customer?.name || '',
        company: customer?.company || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        status: customer?.status || 'Potansiyel' as CustomerStatus,
        tags: customer?.tags?.join(', ') || '',
        fromTalepId: customer?.fromTalepId,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        onSave({...formData, tags: tagsArray});
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{customer?.id ? 'Müşteriyi Düzenle' : 'Yeni Müşteri Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Ad Soyad</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Şirket</label><input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">E-posta</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Telefon</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div><label className="text-sm">Durum</label><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Aktif</option><option>Potansiyel</option><option>Pasif</option></select></div>
                    <div><label className="text-sm">Etiketler (virgülle ayırın)</label><input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AppointmentModal: React.FC<{appointment: Partial<CrmAppointment> | null; onClose: () => void; onSave: (data: any) => void}> = ({appointment, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        id: appointment?.id,
        date: appointment?.date || new Date().toISOString().split('T')[0],
        time: appointment?.time || '',
        service: appointment?.service || '',
        status: appointment?.status || 'Yaklaşan' as AppointmentStatus,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{appointment?.id ? 'Randevu Düzenle' : 'Yeni Randevu Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="text-sm">Hizmet/Konu</label><input type="text" name="service" value={formData.service} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Tarih</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                        <div><label className="text-sm">Saat</label><input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    </div>
                    <div><label className="text-sm">Durum</label><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Yaklaşan</option><option>Tamamlandı</option><option>İptal Edildi</option></select></div>
                    <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button><button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button></div>
                </form>
            </div>
        </div>
    );
};

const FinancialRecordModal: React.FC<{record: Partial<FinancialRecord> | null; onClose: () => void; onSave: (data: any) => void}> = ({record, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        id: record?.id,
        type: record?.type || ('Gelir' as 'Gelir' | 'Gider'),
        description: record?.description || '',
        amount: record?.amount || 0,
        date: record?.date || new Date().toISOString().split('T')[0],
        status: record?.status || ('Beklemede' as 'Tamamlandı' | 'Beklemede'),
        category: record?.category || '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
    };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{record ? 'Finansal İşlemi Düzenle' : 'Yeni Finansal İşlem Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="text-sm">İşlem Tipi</label><select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option value="Gelir">Gelir</option><option value="Gider">Gider</option></select></div>
                    <div><label className="text-sm">Açıklama</label><input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Tutar (TRY)</label><input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                        <div><label className="text-sm">Tarih</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Kategori</label><input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                        <div><label className="text-sm">Durum</label><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option value="Beklemede">Beklemede</option><option value="Tamamlandı">Tamamlandı</option></select></div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button><button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button></div>
                </form>
            </div>
        </div>
    );
};

const NoteModal: React.FC<{note: Partial<Note> | null; onClose: () => void; onSave: (data: any) => void}> = ({note, onClose, onSave}) => {
    const [content, setContent] = useState(note?.content || '');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...note, content, timestamp: new Date().toISOString() });
    };
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{note?.id ? 'Notu Düzenle' : 'Yeni Not Ekle'}</h2>
                <form onSubmit={handleSubmit}>
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full bg-slate-700 p-3 rounded-md border border-slate-600" required></textarea>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{itemType: string, itemName: string | undefined, onCancel: () => void, onConfirm: () => void}> = ({itemType, itemName, onCancel, onConfirm}) => {
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
                <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>
                <h3 className="text-lg font-bold text-white mt-4">Silme Onayı</h3>
                <p className="text-sm text-slate-400 mt-2">
                    "{itemName || 'Bu öğeyi'}" kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                    <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-5 rounded-lg">İptal</button>
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
                </div>
            </div>
        </div>
    );
};

const InfoCard: React.FC<{title: string, icon: string, children: React.ReactNode}> = ({title, icon, children}) => {
    return (
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
            <h4 className="font-bold text-lg text-slate-100 mb-4 flex items-center"><i className={`fas ${icon} mr-3 text-slate-400`}></i>{title}</h4>
            <div className="space-y-2 text-sm text-slate-300">
                {children}
            </div>
        </div>
    );
};

const AiSummaryCard: React.FC<{customer: Customer, onUpdate: (id: string, data: Partial<Customer>) => void}> = ({customer, onUpdate}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Şu müşteri için kısa bir yönetici özeti oluştur: ${JSON.stringify({name: customer.name, company: customer.company, status: customer.status, totalRevenue: customer.totalRevenue, lastInteraction: customer.lastInteraction, notes: customer.notes})}. Özet, müşterinin genel durumu, potansiyeli ve son etkileşimleri hakkında olmalı.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            onUpdate(customer.id, { aiSummary: response.text });
        } catch (e) { console.error(e); }
        finally { setIsLoading(false); }
    };

    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-100 flex items-center gap-2"><SparklesIcon /> AI Özet</h4>
                <button onClick={handleGenerate} disabled={isLoading} className="text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50">
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sync"></i>}
                </button>
            </div>
            <p className="text-sm text-slate-300">{customer.aiSummary || 'Henüz özet oluşturulmadı.'}</p>
        </div>
    );
};

const AiNextActionCard: React.FC<{customer: Customer, onUpdate: (id: string, data: Partial<Customer>) => void}> = ({customer, onUpdate}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Şu müşteri verilerine dayanarak bir sonraki en iyi eylemi öner: ${JSON.stringify({name: customer.name, status: customer.status, lastInteraction: customer.lastInteraction, notes: customer.notes, appointments: customer.appointments})}. Eylem önerisi kısa ve uygulanabilir olmalı.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            onUpdate(customer.id, { aiNextAction: response.text });
        } catch (e) { console.error(e); }
        finally { setIsLoading(false); }
    };
    
    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-100 flex items-center gap-2"><SparklesIcon /> AI Sonraki Eylem</h4>
                <button onClick={handleGenerate} disabled={isLoading} className="text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50">
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sync"></i>}
                </button>
            </div>
            <p className="text-sm text-slate-300">{customer.aiNextAction || 'Henüz eylem önerilmedi.'}</p>
        </div>
    );
};

const AiChurnRiskCard: React.FC<{customer: Customer, onUpdate: (id: string, data: Partial<Customer>) => void}> = ({customer, onUpdate}) => {
    const [isLoading, setIsLoading] = useState(false);
    const riskColors = { 'Düşük': 'text-green-400', 'Orta': 'text-yellow-400', 'Yüksek': 'text-red-400' };

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Şu müşteri verilerine göre kayıp (churn) riskini analiz et: ${JSON.stringify({status: customer.status, totalRevenue: customer.totalRevenue, lastInteraction: customer.lastInteraction, noteCount: customer.notes?.length || 0})}. Sonucu JSON formatında, 'risk' ('Düşük', 'Orta', 'Yüksek') ve 'reason' (kısa bir sebep) alanlarıyla döndür.`;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    risk: { type: Type.STRING },
                    reason: { type: Type.STRING },
                },
                required: ["risk", "reason"],
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: 'application/json', responseSchema: schema }
            });
            
            const result = JSON.parse(response.text);
            onUpdate(customer.id, { 
                aiChurnRisk: { 
                    risk: result.risk, 
                    reason: result.reason, 
                    analyzedDate: new Date().toISOString() 
                } 
            });
        } catch (e) { console.error("Churn Risk Error:", e); } 
        finally { setIsLoading(false); }
    }, [customer, onUpdate]);

    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-100 flex items-center gap-2"><SparklesIcon /> AI Müşteri Kayıp Riski</h4>
                <button onClick={handleGenerate} disabled={isLoading} className="text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50">
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sync"></i>}
                </button>
            </div>
            {customer.aiChurnRisk ? (
                <div>
                    <p className={`text-lg font-bold ${riskColors[customer.aiChurnRisk.risk]}`}>{customer.aiChurnRisk.risk}</p>
                    <p className="text-sm text-slate-300">{customer.aiChurnRisk.reason}</p>
                    <p className="text-xs text-slate-500 mt-1">Analiz: {new Date(customer.aiChurnRisk.analyzedDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p className="text-sm text-slate-400">Henüz risk analizi yapılmadı.</p>
            )}
        </div>
    );
};

const InteractionTimeline: React.FC<{customer: Customer}> = ({customer}) => {
    const timelineItems = useMemo(() => {
        const items: ( (Note & {itemType: 'note', date: Date}) | (Omit<CrmAppointment, 'date'> & {itemType: 'appointment', date: Date}) | (Omit<FinancialRecord, 'date'> & {itemType: 'finance', date: Date}) )[] = [];
        
        customer.appointments?.forEach(item => {
            const { date, ...rest } = item;
            items.push({ itemType: 'appointment', ...rest, date: new Date(`${date}T${item.time || '00:00'}`) });
        });
        customer.financials?.forEach(item => {
            const { date, ...rest } = item;
            items.push({ itemType: 'finance', ...rest, date: new Date(date) });
        });
        customer.notes?.forEach(item => items.push({ itemType: 'note', ...item, date: new Date(item.timestamp) }));

        return items.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [customer]);

    const getIcon = (item: (typeof timelineItems)[0]) => {
        switch (item.itemType) {
            case 'appointment': return {icon: 'fa-calendar-check', color: 'text-blue-400'};
            case 'finance': return item.type === 'Gelir' ? {icon: 'fa-file-invoice-dollar', color: 'text-yellow-400'} : {icon: 'fa-receipt', color: 'text-red-400'};
            case 'note': return {icon: 'fa-sticky-note', color: 'text-purple-400'};
            default: return {icon: 'fa-question-circle', color: 'text-slate-400'};
        }
    };
    
    return (
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 h-full">
            <h3 className="font-bold text-lg text-slate-100 mb-6">Etkileşim Zaman Tüneli</h3>
            <div className="relative pl-6 border-l-2 border-slate-700">
                {timelineItems.map((item, index) => {
                    const {icon, color} = getIcon(item);
                    return (
                        <div key={`${item.itemType}-${item.id}`} className="mb-8 last:mb-0">
                            <div className={`absolute -left-[11px] top-1 w-5 h-5 ${color.replace('text', 'bg').replace('-400', '-600')} rounded-full border-4 border-slate-800`}></div>
                            <p className="text-xs text-slate-400 font-semibold">{item.date.toLocaleString('tr-TR')}</p>
                            <div className="mt-1 bg-slate-800 p-4 rounded-lg">
                                <h4 className={`font-semibold flex items-center gap-3 ${color}`}><i className={`fas ${icon}`}></i> 
                                    {item.itemType === 'appointment' && item.service}
                                    {item.itemType === 'finance' && item.description}
                                    {item.itemType === 'note' && 'Yeni Not Eklendi'}
                                </h4>
                                {item.itemType === 'note' && <p className="text-sm text-slate-300 mt-1 italic">"{item.content}"</p>}
                            </div>
                        </div>
                    )
                })}
                {timelineItems.length === 0 && <p className="text-slate-500">Etkileşim bulunamadı.</p>}
            </div>
        </div>
    );
};

const NotesTab: React.FC<{customer: Customer, openModal: Function, onUpdate: (customerId: string, data: Partial<Customer>) => void}> = ({ customer, openModal, onUpdate }) => {
    const [newNote, setNewNote] = useState('');
    
    const handleAddNote = () => {
        if (!newNote.trim()) return;
        
        const newNoteItem: Note = { 
            id: `note-${Date.now()}`,
            content: newNote.trim(), 
            timestamp: new Date().toISOString() 
        };
        const updatedNotes = [...(customer.notes || []), newNoteItem];
        onUpdate(customer.id, { notes: updatedNotes });
        
        setNewNote('');
    };

    return (
        <div className="space-y-6">
             <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <textarea value={newNote} onChange={e => setNewNote(e.target.value)} rows={3} placeholder="Yeni bir not ekleyin..." className="w-full bg-slate-700 p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-blue-500"></textarea>
                <button onClick={handleAddNote} className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold">Not Ekle</button>
            </div>
            <div className="space-y-4">
                {[...(customer.notes || [])].reverse().map(note => (
                    <div key={note.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 group">
                        <p className="text-sm text-slate-200">{note.content}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-slate-500">{new Date(note.timestamp).toLocaleString('tr-TR')}</p>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal('note', note)} className="text-slate-400 hover:text-purple-400"><EditIcon /></button>
                                <button onClick={() => openModal('deleteNote', note, note.id)} className="text-slate-400 hover:text-red-400"><DeleteIcon /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SummaryTab: React.FC<{customer: Customer, onUpdate: (id: string, data: Partial<Customer>) => void}> = ({customer, onUpdate}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <InfoCard title="İletişim Bilgileri" icon="fa-address-card">
                    <p><strong>E-posta:</strong> {customer.email}</p>
                    <p><strong>Telefon:</strong> {customer.phone}</p>
                    <p><strong>Şirket:</strong> {customer.company}</p>
                </InfoCard>
                <InfoCard title="Finansal Durum" icon="fa-wallet">
                    <p><strong>Toplam Hasılat:</strong> {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(customer.totalRevenue)}</p>
                    <p><strong>Bekleyen Bakiye:</strong> {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(customer.financials?.filter(f => f.status === 'Beklemede').reduce((sum, f) => sum + f.amount, 0) || 0)}</p>
                </InfoCard>
            </div>
            <div className="lg:col-span-2">
                <InteractionTimeline customer={customer} />
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <AiSummaryCard customer={customer} onUpdate={onUpdate} />
                 <AiNextActionCard customer={customer} onUpdate={onUpdate} />
                 <AiChurnRiskCard customer={customer} onUpdate={onUpdate} />
            </div>
        </div>
    );
};

const AppointmentsTab: React.FC<{customer: Customer, openModal: Function}> = ({ customer, openModal }) => {
    const statusColors: { [key in AppointmentStatus]: string } = { 'Yaklaşan': 'bg-blue-500/20 text-blue-300', 'Tamamlandı': 'bg-green-500/20 text-green-300', 'İptal Edildi': 'bg-red-500/20 text-red-300' };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => openModal('appointment', null)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                    <i className="fas fa-plus"></i> Randevu Ekle
                </button>
            </div>
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Tarih & Saat</th>
                            <th className="p-4">Hizmet</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 text-right">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.appointments?.map(app => (
                            <tr key={app.id} className="border-t border-slate-800 group">
                                <td className="p-4">{new Date(`${app.date}T${app.time || '00:00'}`).toLocaleString('tr-TR')}</td>
                                <td className="p-4">{app.service}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>{app.status}</span></td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal('appointment', app)} className="text-slate-400 hover:text-purple-400"><EditIcon /></button>
                                        <button onClick={() => openModal('deleteAppointment', app, app.id)} className="text-slate-400 hover:text-red-400"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {(!customer.appointments || customer.appointments.length === 0) && <p className="text-center p-8 text-slate-500">Randevu bulunamadı.</p>}
            </div>
        </div>
    );
};

const FinanceTab: React.FC<{customer: Customer, openModal: Function}> = ({ customer, openModal }) => {
    const statusColors: { [key in 'Tamamlandı' | 'Beklemede']: string } = { 'Tamamlandı': 'bg-green-500/20 text-green-300', 'Beklemede': 'bg-yellow-500/20 text-yellow-300' };
    const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => openModal('financialRecord', null)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                    <i className="fas fa-plus"></i> Finansal İşlem Ekle
                </button>
            </div>
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Tarih</th>
                            <th className="p-4">Tip</th>
                            <th className="p-4">Açıklama</th>
                            <th className="p-4">Tutar</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 text-right">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.financials?.map(rec => (
                            <tr key={rec.id} className="border-t border-slate-800 group">
                                <td className="p-4">{new Date(rec.date).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4">{rec.type}</td>
                                <td className="p-4">{rec.description}</td>
                                <td className={`p-4 font-semibold ${rec.type === 'Gelir' ? 'text-green-400' : 'text-red-400'}`}>{currencyFormatter.format(rec.amount)}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[rec.status]}`}>{rec.status}</span></td>
                                <td className="p-4 text-right">
                                     <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal('financialRecord', rec)} className="text-slate-400 hover:text-purple-400"><EditIcon /></button>
                                        <button onClick={() => openModal('deleteFinancialRecord', rec, rec.id)} className="text-slate-400 hover:text-red-400"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!customer.financials || customer.financials.length === 0) && <p className="text-center p-8 text-slate-500">Finansal kayıt bulunamadı.</p>}
            </div>
        </div>
    );
};

const CustomerDetailPanel: React.FC<{customer: Customer, onEdit: () => void, onDelete: () => void, onUpdate: (id: string, data: Partial<Customer>) => void, openModal: Function}> = ({customer, onEdit, onDelete, onUpdate, openModal}) => {
    const [activeTab, setActiveTab] = useState<'Özet' | 'Randevular' | 'Finans' | 'Notlar'>('Özet');
    const navigate = useNavigate();

    const statusBadgeColors: Record<CustomerStatus, string> = { 'Aktif': 'bg-green-400/10 text-green-300 border border-green-400/20', 'Potansiyel': 'bg-yellow-400/10 text-yellow-300 border border-yellow-400/20', 'Pasif': 'bg-slate-500/20 text-slate-300 border border-slate-500/20' };
    const tagColors = ['bg-purple-500/20 text-purple-300 border border-purple-400/20', 'bg-teal-500/20 text-teal-300 border border-teal-400/20', 'bg-pink-500/20 text-pink-300 border border-pink-400/20'];
    const TABS: typeof activeTab[] = ['Özet', 'Randevular', 'Finans', 'Notlar'];

    useEffect(() => { setActiveTab('Özet'); }, [customer.id]);

    return (
        <div className="p-8">
            <header className="pb-6 border-b border-slate-700">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white">{customer.name}</h2>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusBadgeColors[customer.status]}`}>{customer.status}</span>
                            {customer.tags?.map((tag, i) => (
                                <span key={tag} className={`px-3 py-1 text-sm font-semibold rounded-full ${tagColors[i % tagColors.length]}`}>{tag}</span>
                            ))}
                        </div>
                    </div>
                     <div className="flex gap-3 flex-shrink-0">
                        <button onClick={onEdit} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2"><EditIcon/> Düzenle</button>
                        <button onClick={onDelete} className="bg-red-900/50 hover:bg-red-900 text-red-400 font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2"><DeleteIcon/> Sil</button>
                    </div>
                </div>
                 <div className="bg-slate-900 p-3 rounded-lg flex flex-wrap gap-3">
                    <button 
                        onClick={() => navigate('/admin/teklif-olusturucu', { state: { action: 'add_new', customer } })}
                        className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2 justify-center"
                    >
                        <i className="fas fa-file-signature text-blue-400"></i> Yeni Teklif Oluştur
                    </button>
                    <button 
                        onClick={() => navigate('/admin/fatura-yonetimi', { state: { action: 'add_new', customer } })}
                        className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2 justify-center"
                    >
                        <i className="fas fa-file-invoice-dollar text-green-400"></i> Yeni Fatura Oluştur
                    </button>
                </div>
            </header>
            <nav className="flex gap-6 my-6 border-b border-slate-700">
                {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 font-semibold text-lg transition-colors duration-200 border-b-2 ${activeTab === tab ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white hover:border-slate-500'}`}>{tab}</button>
                ))}
            </nav>
            <div className="animate-fade-in">
                {activeTab === 'Özet' && <SummaryTab customer={customer} onUpdate={onUpdate} />}
                {activeTab === 'Randevular' && <AppointmentsTab customer={customer} openModal={openModal} />}
                {activeTab === 'Finans' && <FinanceTab customer={customer} openModal={openModal} />}
                {activeTab === 'Notlar' && <NotesTab customer={customer} openModal={openModal} onUpdate={onUpdate} />}
            </div>
        </div>
    );
};

const AdminCrmPage = () => {
    const [customers, setCustomers] = useState<Customer[]>(getInitialCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers[0] || null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tagFilter, setTagFilter] = useState<string>('all');
    
    // Modals State
    const [modalState, setModalState] = useState<{type: string | null, data: any | null, id?: string}>({type: null, data: null});

    const location = useLocation();

    useEffect(() => {
        const state = location.state as { action?: string, talepData?: Talep };
        if (state?.action === 'add_new') {
            openModal('customer', null);
            window.history.replaceState({}, document.title);
        } else if (state?.action === 'create_from_talep' && state.talepData) {
            const talep = state.talepData;
            openModal('customer', {
                name: talep.name,
                company: talep.companyName,
                email: '', // Email is not in Talep form
                phone: talep.phone,
                status: 'Potansiyel',
                tags: [talep.helpTopic],
                fromTalepId: talep.id,
            });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        saveCustomers(customers);
        if (selectedCustomer && !customers.find(c => c.id === selectedCustomer.id)) {
            setSelectedCustomer(customers[0] || null);
        }
    }, [customers, selectedCustomer]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        customers.forEach(c => c.tags?.forEach(t => tags.add(t)));
        return ['all', ...Array.from(tags)];
    }, [customers]);
    
    const filteredCustomers = useMemo(() => {
        return customers
            .filter(c => searchTerm ? c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            .filter(c => tagFilter === 'all' ? true : c.tags?.includes(tagFilter))
            .sort((a,b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime());
    }, [customers, searchTerm, tagFilter]);
    
    const updateCustomerData = (customerId: string, data: Partial<Customer>) => {
        setCustomers(prev => prev.map(c => {
            if (c.id === customerId) {
                const updatedCustomer = { ...c, ...data };
                if (selectedCustomer?.id === customerId) {
                    setSelectedCustomer(updatedCustomer);
                }
                return updatedCustomer;
            }
            return c;
        }));
    };
    
    const handleSaveCustomer = (data: Omit<Customer, 'id' | 'totalRevenue' | 'lastInteraction' | 'notes' | 'appointments' | 'financials'> & { id?: string, fromTalepId?: string }) => {
        if (data.id) {
            updateCustomerData(data.id, data);
        } else {
            const newCustomer: Customer = {
                ...data,
                id: `cust-${Date.now()}`,
                totalRevenue: 0,
                lastInteraction: new Date().toISOString(),
                notes: [], appointments: [], financials: []
            };
            setCustomers(prev => [newCustomer, ...prev]);
            
            // If created from a talep, update the talep status
            if (data.fromTalepId) {
                try {
                    const taleplerRaw = localStorage.getItem(TALEPLER_STORAGE_KEY);
                    let talepler: Talep[] = taleplerRaw ? JSON.parse(taleplerRaw) : [];
                    talepler = talepler.map(t => t.id === data.fromTalepId ? {...t, status: 'İletişime Geçildi'} : t);
                    localStorage.setItem(TALEPLER_STORAGE_KEY, JSON.stringify(talepler));
                } catch(e) {
                    console.error("Talep durumu güncellenemedi:", e);
                }
            }
        }
        closeModal();
    };

    const handleDeleteCustomer = (id: string) => {
        setCustomers(prev => prev.filter(c => c.id !== id));
        closeModal();
    };
    
    const handleSaveAppointment = (customerId: string, data: Omit<CrmAppointment, 'id'> & {id?: string}) => {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;

        let updatedAppointments: CrmAppointment[];
        if (data.id) {
            updatedAppointments = (customer.appointments || []).map(a => a.id === data.id ? {...a, ...data} as CrmAppointment : a);
        } else {
            const newApp: CrmAppointment = { ...data as Omit<CrmAppointment, 'id'>, id: `app-${Date.now()}` };
            updatedAppointments = [...(customer.appointments || []), newApp];
        }
        updateCustomerData(customerId, { appointments: updatedAppointments, lastInteraction: new Date().toISOString() });
        closeModal();
    };

    const handleDeleteAppointment = (customerId: string, appointmentId: string) => {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;
        const updatedAppointments = (customer.appointments || []).filter(a => a.id !== appointmentId);
        updateCustomerData(customerId, { appointments: updatedAppointments });
        closeModal();
    };

    const handleSaveFinancialRecord = (customerId: string, data: Omit<FinancialRecord, 'id'> & {id?: string}) => {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;
        
        let updatedFinancials: FinancialRecord[];
        if(data.id) {
            updatedFinancials = (customer.financials || []).map(r => r.id === data.id ? {...r, ...data} as FinancialRecord : r);
        } else {
            const newRec: FinancialRecord = {...data as Omit<FinancialRecord, 'id'>, id: `fin-${Date.now()}`};
            updatedFinancials = [...(customer.financials || []), newRec];
        }
        updateCustomerData(customerId, { financials: updatedFinancials, lastInteraction: new Date().toISOString() });
        closeModal();
    };

    const handleDeleteFinancialRecord = (customerId: string, recordId: string) => {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;
        const updatedFinancials = (customer.financials || []).filter(r => r.id !== recordId);
        updateCustomerData(customerId, { financials: updatedFinancials });
        closeModal();
    };

    const handleSaveNote = (customerId: string, data: Omit<Note, 'id'> & {id?: string}) => {
        const customer = customers.find(c => c.id === customerId);
        if(!customer) return;
        
        let updatedNotes: Note[];
        if(data.id){
            updatedNotes = (customer.notes || []).map(n => n.id === data.id ? {...n, ...data} as Note : n);
        } else {
            const newNote: Note = {...data as Omit<Note, 'id'>, id: `note-${Date.now()}`};
            updatedNotes = [...(customer.notes || []), newNote];
        }
        updateCustomerData(customerId, { notes: updatedNotes, lastInteraction: new Date().toISOString() });
        closeModal();
    };
    
    const handleDeleteNote = (customerId: string, noteId: string) => {
        const customer = customers.find(c => c.id === customerId);
        if(!customer) return;
        const updatedNotes = (customer.notes || []).filter(n => n.id !== noteId);
        updateCustomerData(customerId, { notes: updatedNotes });
        closeModal();
    };

    const openModal = (type: string, data: any = null, id?: string) => {
        setModalState({ type, data, id });
    };

    const closeModal = () => {
        setModalState({ type: null, data: null });
    };
    
    const statusColors: Record<CustomerStatus, string> = { 'Aktif': 'bg-green-400', 'Potansiyel': 'bg-yellow-400', 'Pasif': 'bg-slate-500' };

    return (
        <div className="flex h-screen bg-slate-800 text-white animate-fade-in">
             <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
            `}</style>
            
            {/* Sidebar */}
            <aside className="w-1/3 max-w-sm flex flex-col bg-slate-900 h-full border-r border-slate-700">
                <div className="p-4 border-b border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Müşteriler ({filteredCustomers.length})</h3>
                        <button onClick={() => openModal('customer', null)} className="p-2 rounded-md hover:bg-slate-700"><UserPlusIcon /></button>
                    </div>
                    <input type="text" placeholder="Müşteri ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-800 p-2 rounded-md border border-slate-600"/>
                    <div className="mt-2">
                        <select value={tagFilter} onChange={e => setTagFilter(e.target.value)} className="w-full bg-slate-800 p-2 rounded-md border border-slate-600 text-sm">
                            {allTags.map(tag => <option key={tag} value={tag}>{tag === 'all' ? 'Tüm Etiketler' : tag}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {filteredCustomers.map(c => (
                        <div
                            key={c.id}
                            onClick={() => setSelectedCustomer(c)}
                            className={`flex items-center p-3 border-b border-slate-800 cursor-pointer transition-colors duration-200 ${
                                selectedCustomer?.id === c.id
                                    ? 'bg-slate-700/50 border-l-4 border-blue-500'
                                    : 'hover:bg-slate-800/60 border-l-4 border-transparent'
                            }`}
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center font-bold text-purple-300 text-lg mr-4">
                                {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusColors[c.status]}`} title={c.status}></span>
                                    <h3 className="font-bold text-white truncate">{c.name}</h3>
                                </div>
                                <p className="text-sm text-slate-400 truncate">{c.company}</p>
                            </div>
                            <div className="flex-shrink-0 text-right ml-2">
                                <p className="text-xs text-slate-500 font-medium">{formatRelativeDate(c.lastInteraction)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            
            {/* Main Panel */}
            <main className="flex-1 overflow-y-auto">
                <AdminHeader title="Müşteri Yönetimi (CRM)" />
                {selectedCustomer ? (
                    <CustomerDetailPanel 
                        customer={selectedCustomer} 
                        onEdit={() => openModal('customer', selectedCustomer)} 
                        onDelete={() => openModal('deleteCustomer', selectedCustomer, selectedCustomer.id)}
                        onUpdate={updateCustomerData}
                        openModal={(type, data, id) => openModal(type, data, id)}
                    />
                ) : (
                    <div className="p-8 text-center text-slate-400 h-full flex flex-col justify-center items-center">
                        <i className="fas fa-users text-5xl mb-4"></i>
                        <p className="text-lg">Başlamak için bir müşteri seçin veya yeni bir tane ekleyin.</p>
                    </div>
                )}
            </main>

            {/* Modals */}
            {modalState.type === 'customer' && <CustomerModal customer={modalState.data} onClose={closeModal} onSave={handleSaveCustomer} />}
            {modalState.type === 'appointment' && selectedCustomer && <AppointmentModal appointment={modalState.data} onClose={closeModal} onSave={(data) => handleSaveAppointment(selectedCustomer.id, data)} />}
            {modalState.type === 'financialRecord' && selectedCustomer && <FinancialRecordModal record={modalState.data} onClose={closeModal} onSave={(data) => handleSaveFinancialRecord(selectedCustomer.id, data)} />}
            {modalState.type === 'note' && selectedCustomer && <NoteModal note={modalState.data} onClose={closeModal} onSave={(data) => handleSaveNote(selectedCustomer.id, data)} />}
            
            {modalState.type?.startsWith('delete') && (
                <DeleteConfirmModal
                    itemType={modalState.type.replace('delete', '')}
                    itemName={modalState.data?.name || modalState.data?.service || modalState.data?.description || 'not'}
                    onCancel={closeModal}
                    onConfirm={() => {
                        if (modalState.type === 'deleteCustomer') handleDeleteCustomer(modalState.id!);
                        if (modalState.type === 'deleteAppointment') handleDeleteAppointment(selectedCustomer!.id, modalState.id!);
                        if (modalState.type === 'deleteFinancialRecord') handleDeleteFinancialRecord(selectedCustomer!.id, modalState.id!);
                        if (modalState.type === 'deleteNote') handleDeleteNote(selectedCustomer!.id, modalState.id!);
                    }}
                />
            )}
        </div>
    );
};

export default AdminCrmPage;