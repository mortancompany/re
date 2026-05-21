import React, { useState, useMemo, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI, Type } from '@google/genai';
import type { SogukArama, SogukAramaDurum, CallLog, CallOutcome } from '../../types';

// --- ICONS ---
const SparklesIcon = () => <i className="fas fa-wand-magic-sparkles"></i>;
const PhoneIcon = () => <i className="fas fa-phone"></i>;
const EnvelopeIcon = () => <i className="fas fa-envelope"></i>;
const ExclamationTriangleIcon = () => <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>;
const HistoryIcon = () => <i className="fas fa-history"></i>;
const ForwardIcon = () => <i className="fas fa-forward"></i>;


// --- PERSISTENCE & MOCK DATA ---
const SOGUK_ARAMA_STORAGE_KEY = 'mortanasSogukArama_v2';

const getInitialData = (): SogukArama[] => {
    try {
        const stored = localStorage.getItem(SOGUK_ARAMA_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        const mockData: SogukArama[] = [
            { id: 'sa-1', firmaAdi: 'Tekno A.Ş.', yetkili: 'Ali Veli', telefon: '555-123-4567', durum: 'Aranacak', notlar: 'Web sitesi yenileme projesiyle ilgilenebilirler.', sonTemas: new Date().toISOString(), callHistory: [], sektor: 'Basın & Medya' },
            { id: 'sa-2', firmaAdi: 'Global Lojistik', yetkili: 'Ayşe Yılmaz', telefon: '555-987-6543', durum: 'Randevu Alındı', notlar: 'CRM demosu için Perşembe 14:00\'e randevu verildi.', sonTemas: new Date(Date.now() - 86400000).toISOString(), callHistory: [{ timestamp: new Date(Date.now() - 86400000).toISOString(), outcome: 'Ulaşıldı - İlgili', notes: 'Demo için anlaşıldı.'}], sektor: 'Turizm Sektörü' },
            { id: 'sa-3', firmaAdi: 'Anadolu Gıda', yetkili: 'Fatma Kaya', telefon: '555-555-1212', durum: 'İlgilenmiyor', notlar: 'Mevcut çözümlerinden memnunlar.', sonTemas: new Date(Date.now() - 2 * 86400000).toISOString(), callHistory: [], sektor: 'Sağlık Sektörü' },
            { id: 'sa-4', firmaAdi: 'İnşaat Projeleri Ltd.', yetkili: 'Mehmet Öztürk', telefon: '555-444-3322', durum: 'Geri Ara', notlar: '2 hafta sonra tekrar aranacak.', sonTemas: new Date(Date.now() - 3 * 86400000).toISOString(), callHistory: [], sektor: 'Emlak Sektörü' },
            { id: 'sa-5', firmaAdi: 'Ege Palace Hotel', yetkili: 'Serap Hanım', telefon: '555-111-2233', durum: 'Aranacak', notlar: 'Otel CRM çözümü için potansiyel.', sonTemas: new Date().toISOString(), callHistory: [], sektor: 'Otel Sektörü' },
            { id: 'sa-6', firmaAdi: 'Serenity SPA', yetkili: 'Can Bey', telefon: '555-222-3344', durum: 'Aranacak', notlar: 'Yeni açılan şubeleri için yazılım arıyorlar.', sonTemas: new Date().toISOString(), callHistory: [], sektor: 'Spa & Masaj Sektörü' },
        ];
        localStorage.setItem(SOGUK_ARAMA_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) {
        console.error("Soğuk arama verileri alınamadı.", e);
        return [];
    }
};

const saveData = (records: SogukArama[]) => {
    try {
        localStorage.setItem(SOGUK_ARAMA_STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
        console.error("Soğuk arama verileri kaydedilemedi.", e);
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
    return `${diffInDays} gün önce`;
};


// --- SUB-COMPONENTS ---
const StatCard: React.FC<{ icon: string; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-slate-900 p-5 rounded-xl flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
            <i className={`fas ${icon} text-2xl ${color}`}></i>
        </div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const RecordModal: React.FC<{ record: Partial<SogukArama> | null; onClose: () => void; onSave: (data: any) => void; sektorler: {name: string}[] }> = ({ record, onClose, onSave, sektorler }) => {
    const [formData, setFormData] = useState({
        id: record?.id,
        firmaAdi: record?.firmaAdi || '',
        yetkili: record?.yetkili || '',
        telefon: record?.telefon || '',
        durum: record?.durum || 'Aranacak' as SogukAramaDurum,
        notlar: record?.notlar || '',
        sektor: record?.sektor || '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    
    const isNewFromSektor = record && !record.id && record.sektor;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{record?.id ? 'Kaydı Düzenle' : 'Yeni Kayıt Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Firma Adı</label><input type="text" name="firmaAdi" value={formData.firmaAdi} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Yetkili</label><input type="text" name="yetkili" value={formData.yetkili} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div><label className="text-sm">Telefon</label><input type="tel" name="telefon" value={formData.telefon} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                    <div>
                        <label className="text-sm">Sektör</label>
                        <select name="sektor" value={formData.sektor} onChange={handleChange} disabled={!!isNewFromSektor} className="w-full bg-slate-700 p-2 rounded-md mt-1 disabled:opacity-50">
                            <option value="">Sektör Seçin</option>
                            {sektorler.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div><label className="text-sm">Durum</label><select name="durum" value={formData.durum} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Aranacak</option><option>Ulaşılamadı</option><option>Geri Ara</option><option>Randevu Alındı</option><option>İlgilenmiyor</option></select></div>
                    <div><label className="text-sm">Notlar</label><textarea name="notlar" value={formData.notlar} onChange={handleChange} rows={3} className="w-full bg-slate-700 p-2 rounded-md mt-1"></textarea></div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteModal: React.FC<{ onCancel: () => void; onConfirm: () => void; count: number }> = ({ onCancel, onConfirm, count }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
            <ExclamationTriangleIcon />
            <h3 className="text-lg font-bold text-white mt-4">Silme Onayı</h3>
            <p className="text-sm text-slate-400 mt-2">Seçili {count} kaydı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
);

const AiModal: React.FC<{ title: string; icon: React.ReactNode; content: any; isLoading: boolean; onClose: () => void; }> = ({ title, icon, content, isLoading, onClose }) => {
    const isEmail = typeof content === 'object' && content !== null && 'subject' in content;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in max-h-[80vh] flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0">{icon} <span className="ml-3">{title}</span></h3>
                <div className="bg-slate-900 rounded-md p-4 text-slate-300 text-sm overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40"><i className="fas fa-spinner fa-spin text-3xl"></i><p className="ml-4">Oluşturuluyor...</p></div>
                    ) : (
                        isEmail ? (
                            <div>
                                <p><strong>Konu:</strong> {content.subject}</p>
                                <hr className="my-2 border-slate-700"/>
                                <p className="whitespace-pre-wrap">{content.body}</p>
                            </div>
                        ) : <p className="whitespace-pre-wrap">{content}</p>
                    )}
                </div>
                <div className="text-right mt-4 flex-shrink-0">
                    <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-5 rounded-lg">Kapat</button>
                </div>
            </div>
        </div>
    );
};

const HistoryModal: React.FC<{ record: SogukArama; onClose: () => void; onAddLog: (log: CallLog) => void }> = ({ record, onClose, onAddLog }) => {
    const [outcome, setOutcome] = useState<CallOutcome>('Cevap Vermedi');
    const [notes, setNotes] = useState('');
    
    const outcomeColors: Record<CallOutcome, string> = {
        'Ulaşıldı - İlgili': 'text-green-400',
        'Ulaşıldı - İlgisiz': 'text-yellow-400',
        'Meşgul': 'text-orange-400',
        'Cevap Vermedi': 'text-red-400'
    };

    const handleAdd = () => {
        if (!notes.trim()) {
            alert('Lütfen görüşme notu ekleyin.');
            return;
        }
        onAddLog({ timestamp: new Date().toISOString(), outcome, notes });
        setNotes('');
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in max-h-[80vh] flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0"><HistoryIcon /> <span className="ml-3">{record.firmaAdi} - Görüşme Geçmişi</span></h3>
                <div className="bg-slate-900 rounded-md p-4 text-slate-300 text-sm overflow-y-auto mb-4 flex-grow">
                    {record.callHistory && record.callHistory.length > 0 ? (
                        <ul className="space-y-3">
                            {[...record.callHistory].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(log => (
                                <li key={log.timestamp} className="p-3 bg-slate-800 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <p className={`font-bold ${outcomeColors[log.outcome]}`}>{log.outcome}</p>
                                        <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString('tr-TR')}</p>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1">{log.notes}</p>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-slate-500 text-center">Görüşme geçmişi bulunmuyor.</p>}
                </div>
                <div className="bg-slate-800 border-t border-slate-700 p-4 rounded-b-lg flex-shrink-0">
                    <h4 className="font-semibold mb-2">Yeni Görüşme Ekle</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select value={outcome} onChange={e => setOutcome(e.target.value as CallOutcome)} className="bg-slate-700 p-2 rounded-md">
                            <option>Cevap Vermedi</option> <option>Meşgul</option> <option>Ulaşıldı - İlgili</option> <option>Ulaşıldı - İlgisiz</option>
                        </select>
                        <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Görüşme notu..." className="bg-slate-700 p-2 rounded-md" />
                    </div>
                    <button onClick={handleAdd} className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 rounded-md font-semibold">Kaydet</button>
                </div>
                <div className="text-right mt-4 flex-shrink-0"><button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 font-semibold py-2 px-5 rounded-lg">Kapat</button></div>
            </div>
        </div>
    );
};

const StatusDistributionBar: React.FC<{ data: SogukArama[] }> = ({ data }) => {
    const stats = useMemo(() => {
        const statusCounts: Record<SogukAramaDurum, number> = { 'Aranacak': 0, 'Ulaşılamadı': 0, 'Geri Ara': 0, 'Randevu Alındı': 0, 'İlgilenmiyor': 0 };
        data.forEach(item => {
            statusCounts[item.durum]++;
        });
        const total = data.length || 1;
        return Object.entries(statusCounts).map(([status, count]) => ({
            status: status as SogukAramaDurum,
            count,
            percentage: (count / total) * 100
        }));
    }, [data]);

    const colors: Record<SogukAramaDurum, string> = { 'Aranacak': '#3b82f6', 'Randevu Alındı': '#22c55e', 'Geri Ara': '#eab308', 'Ulaşılamadı': '#f97316', 'İlgilenmiyor': '#ef4444' };

    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5 flex overflow-hidden my-2" title="Durum Dağılımı">
            {stats.filter(s => s.percentage > 0).map(stat => (
                <div 
                    key={stat.status}
                    className="h-full transition-all duration-300"
                    style={{ width: `${stat.percentage}%`, backgroundColor: colors[stat.status] }}
                    title={`${stat.status}: ${stat.count} (${stat.percentage.toFixed(1)}%)`}
                ></div>
            ))}
        </div>
    );
};


// --- MAIN COMPONENT ---
const AdminSogukAramaPage: React.FC = () => {
    const [records, setRecords] = useState<SogukArama[]>(getInitialData);
    const [statusFilter, setStatusFilter] = useState<SogukAramaDurum | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState<{ type: 'edit' | 'delete' | 'aiScript' | 'aiEmail' | 'history' | null, data?: any }>({ type: null });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'liste' | 'hedef'>('liste');
    const [selectedSektor, setSelectedSektor] = useState<string | null>(null);
    
    useEffect(() => { saveData(records); }, [records]);
    useEffect(() => { setSelectedIds([]) }, [statusFilter, searchTerm, activeTab, selectedSektor]);

    const stats = useMemo(() => {
        const total = records.length;
        const randevuAlindi = records.filter(r => r.durum === 'Randevu Alındı').length;
        const aranacak = records.filter(r => r.durum === 'Aranacak').length;
        const donusumOrani = (total - aranacak) > 0 ? ((randevuAlindi / (total-aranacak)) * 100).toFixed(1) : '0.0';
        return { randevuAlindi, aranacak, donusumOrani };
    }, [records]);

    const filteredRecords = useMemo(() => {
        return records
            .filter(r => statusFilter === 'all' || r.durum === statusFilter)
            .filter(r => 
                r.firmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                r.yetkili.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [records, statusFilter, searchTerm]);

    const handleSave = (data: Omit<SogukArama, 'id'> & { id?: string }) => {
        if (data.id) {
            setRecords(prev => prev.map(r => r.id === data.id ? { ...r, ...data, sonTemas: new Date().toISOString() } as SogukArama : r));
        } else {
            const newRecord: SogukArama = { 
                ...data as Omit<SogukArama, 'id'>, 
                id: `sa-${Date.now()}`, 
                sonTemas: new Date().toISOString(), 
                callHistory: [],
                sektor: data.sektor || undefined
            };
            setRecords(prev => [newRecord, ...prev]);
        }
        setModal({ type: null });
    };

    const handleDelete = () => {
        if (modal.type === 'delete' && modal.data) {
            setRecords(prev => prev.filter(r => r.id !== modal.data.id));
        }
        setModal({ type: null });
    };

    const handleAddLog = (log: CallLog) => {
        const recordId = modal.data.id;
        const newStatusMap: Record<CallOutcome, SogukAramaDurum> = {
            'Ulaşıldı - İlgili': 'Geri Ara',
            'Ulaşıldı - İlgisiz': 'İlgilenmiyor',
            'Meşgul': 'Geri Ara',
            'Cevap Vermedi': 'Ulaşılamadı'
        };

        setRecords(prev => prev.map(r => r.id === recordId ? {
            ...r,
            callHistory: [...(r.callHistory || []), log],
            sonTemas: new Date().toISOString(),
            durum: newStatusMap[log.outcome]
        } : r));
        setModal({type:null});
    };
    
    // AI HANDLERS
    const handleAiAction = async (record: SogukArama, action: 'score' | 'script' | 'email' | 'nextStep') => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        let prompt: string;
        let config: any = { model: 'gemini-2.5-flash' };
        
        switch (action) {
            case 'score':
                prompt = `Bu potansiyel müşterinin ne kadar "sıcak" olduğunu 0-100 arası bir puanla değerlendir. Firma: "${record.firmaAdi}", Notlar: "${record.notlar}". Sadece sayıyı döndür.`;
                const scoreResponse = await ai.models.generateContent({ ...config, contents: prompt });
                const score = parseInt(scoreResponse.text, 10);
                if (!isNaN(score)) setRecords(prev => prev.map(r => r.id === record.id ? { ...r, aiScore: score } : r));
                break;
            case 'script':
                setModal({ type: 'aiScript', data: { isLoading: true } });
                prompt = `"${record.firmaAdi}" firmasıyla bir tanışma ve ihtiyaç analizi toplantısı ayarlamak için 3-4 maddelik kısa ve etkili bir soğuk arama konuşma metni oluştur. Geçmiş görüşmeler: ${JSON.stringify(record.callHistory)}`;
                const scriptResponse = await ai.models.generateContent({ ...config, contents: prompt });
                setModal({ type: 'aiScript', data: { isLoading: false, content: scriptResponse.text } });
                setRecords(prev => prev.map(r => r.id === record.id ? { ...r, aiCallScript: scriptResponse.text } : r));
                break;
            case 'email':
                setModal({ type: 'aiEmail', data: { isLoading: true } });
                prompt = `"${record.firmaAdi}" firmasındaki "${record.yetkili}" kişisine yönelik, hizmetlerimizi tanıtmak ve bir toplantı talep etmek amacıyla profesyonel bir ilk temas e-postası taslağı oluştur. Sonucu 'subject' ve 'body' alanları içeren bir JSON objesi olarak döndür. Geçmiş görüşmeler: ${JSON.stringify(record.callHistory)}`;
                config.config = { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { subject: { type: Type.STRING }, body: { type: Type.STRING } }, required: ["subject", "body"] } };
                const emailResponse = await ai.models.generateContent({ ...config, contents: prompt });
                const emailDraft = JSON.parse(emailResponse.text);
                setModal({ type: 'aiEmail', data: { isLoading: false, content: emailDraft } });
                setRecords(prev => prev.map(r => r.id === record.id ? { ...r, aiEmailDraft: emailDraft } : r));
                break;
            case 'nextStep':
                prompt = `Bu soğuk arama kaydını analiz et ve bir sonraki en iyi adımı öner. Örneğin: '2 gün sonra takip e-postası gönder', 'Farklı bir yetkiliyi ara', 'Teklif hazırla'. Kısa ve eyleme geçirilebilir bir öneri sun. Veri: ${JSON.stringify(record)}`;
                const nextStepResponse = await ai.models.generateContent({ ...config, contents: prompt });
                setRecords(prev => prev.map(r => r.id === record.id ? { ...r, aiNextStep: nextStepResponse.text.trim() } : r));
                break;
        }
    };
    
    // BULK ACTION HANDLERS
    const handleSelectOne = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const recordsToSelect = selectedSektor ? records.filter(r => r.sektor === selectedSektor) : filteredRecords;
        setSelectedIds(e.target.checked ? recordsToSelect.map(r => r.id) : []);
    };
    const handleBulkDelete = () => {
        setRecords(prev => prev.filter(r => !selectedIds.includes(r.id)));
        setSelectedIds([]);
    };
    const handleBulkStatusChange = (newStatus: SogukAramaDurum) => {
        setRecords(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, durum: newStatus } : r));
        setSelectedIds([]);
    };

    const getIsAllSelected = () => {
        const recordsToConsider = selectedSektor ? records.filter(r => r.sektor === selectedSektor) : filteredRecords;
        return recordsToConsider.length > 0 && selectedIds.length === recordsToConsider.length;
    };
    

    const durumOptions: (SogukAramaDurum | 'all')[] = ['all', 'Aranacak', 'Ulaşılamadı', 'Geri Ara', 'Randevu Alındı', 'İlgilenmiyor'];
    const durumColors: Record<SogukAramaDurum, string> = { 'Aranacak': 'bg-blue-500/20 text-blue-300', 'Randevu Alındı': 'bg-green-500/20 text-green-300', 'Geri Ara': 'bg-yellow-500/20 text-yellow-300', 'Ulaşılamadı': 'bg-orange-500/20 text-orange-300', 'İlgilenmiyor': 'bg-red-500/20 text-red-300' };

    const sektörler = [
        { name: 'Otel Sektörü', icon: 'fa-hotel' },
        { name: 'Güzellik Merkezi', icon: 'fa-spa' },
        { name: 'Sağlık Sektörü', icon: 'fa-briefcase-medical' },
        { name: 'Spa & Masaj Sektörü', icon: 'fa-hot-tub-person' },
        { name: 'Eğitim Sektörü', icon: 'fa-graduation-cap' },
        { name: 'Basın & Medya', icon: 'fa-newspaper' },
        { name: 'Turizm Sektörü', icon: 'fa-plane-departure' },
        { name: 'Emlak Sektörü', icon: 'fa-city' },
    ];

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } } .animate-scale-in { animation: scaleIn 0.3s ease-out; } @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }`}</style>
            <AdminHeader title="Soğuk Arama & Hedef Kitle" />

            <div className="mt-8 border-b border-slate-700">
                <div className="flex space-x-6">
                    <button onClick={() => { setActiveTab('liste'); setSelectedSektor(null); }} className={`py-3 px-1 font-semibold text-lg transition-colors duration-200 border-b-2 ${activeTab === 'liste' ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white'}`}>Soğuk Arama Listesi</button>
                    <button onClick={() => setActiveTab('hedef')} className={`py-3 px-1 font-semibold text-lg transition-colors duration-200 border-b-2 ${activeTab === 'hedef' ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white'}`}>Hedef Kitle</button>
                </div>
            </div>
            
            {activeTab === 'liste' && (
                <>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard icon="fa-phone" title="Aranacak Numara Sayısı" value={stats.aranacak.toString()} color="text-blue-400" />
                        <StatCard icon="fa-calendar-check" title="Alınan Randevu Sayısı" value={stats.randevuAlindi.toString()} color="text-green-400" />
                        <StatCard icon="fa-chart-line" title="Dönüşüm Oranı" value={`%${stats.donusumOrani}`} color="text-purple-400" />
                    </div>

                    <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-col gap-4">
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex items-center gap-4 flex-wrap">
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-white focus:ring-blue-500 focus:border-blue-500">
                                    {durumOptions.map(opt => <option key={opt} value={opt}>{opt === 'all' ? 'Tüm Durumlar' : opt}</option>)}
                                </select>
                                <div className="relative">
                                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                    <input type="text" placeholder="Firma veya yetkili ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-md p-2 pl-9 text-sm text-white focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64" />
                                </div>
                            </div>
                            <button onClick={() => setModal({type: 'edit', data: null})} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                                <i className="fas fa-plus"></i> Yeni Kayıt Ekle
                            </button>
                        </div>
                        <StatusDistributionBar data={records} />
                    </div>
                    
                    {selectedIds.length > 0 && (
                        <div className="mt-4 p-3 bg-slate-700 rounded-lg flex items-center gap-4 animate-fade-in">
                            <span className="text-sm font-semibold">{selectedIds.length} kayıt seçildi</span>
                            <div className="relative group">
                                <button className="text-sm font-semibold text-slate-300 hover:text-white">Toplu Durum Değiştir</button>
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 rounded-md shadow-lg py-1 z-10">
                                    {durumOptions.filter(d=>d!=='all').map(durum => <button key={durum} onClick={()=>handleBulkStatusChange(durum as SogukAramaDurum)} className="block w-full text-left px-4 py-2 hover:bg-slate-700">{durum}</button>)}
                                </div>
                            </div>
                            <button onClick={handleBulkDelete} className="text-sm font-semibold text-red-400 hover:text-red-300">Toplu Sil</button>
                            <button onClick={() => setSelectedIds([])} className="text-sm font-semibold ml-auto text-slate-400 hover:text-white">Temizle</button>
                        </div>
                    )}


                    <div className="mt-6 bg-slate-900 rounded-lg overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                                <tr>
                                    <th className="p-4 w-12"><input type="checkbox" onChange={handleSelectAll} checked={getIsAllSelected()} className="rounded bg-slate-700 border-slate-600"/></th>
                                    <th className="p-4">Firma Adı</th>
                                    <th className="p-4">Sektör</th>
                                    <th className="p-4">Durum</th>
                                    <th className="p-4">Son Temas</th>
                                    <th className="p-4">AI Puanı</th>
                                    <th className="p-4">AI Sonraki Adım</th>
                                    <th className="p-4 text-center">AI Eylemler</th>
                                    <th className="p-4 text-right">Eylemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map(rec => (
                                    <tr key={rec.id} className={`border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50 ${selectedIds.includes(rec.id) ? 'bg-blue-900/30' : ''}`}>
                                        <td className="p-4"><input type="checkbox" checked={selectedIds.includes(rec.id)} onChange={() => handleSelectOne(rec.id)} className="rounded bg-slate-700 border-slate-600"/></td>
                                        <td className="p-4 font-semibold text-white">{rec.firmaAdi}<p className="font-normal text-xs text-slate-400">{rec.yetkili}</p></td>
                                        <td className="p-4 text-slate-400">{rec.sektor || '-'}</td>
                                        <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${durumColors[rec.durum]}`}>{rec.durum}</span></td>
                                        <td className="p-4 text-slate-400">{formatRelativeDate(rec.sonTemas)}</td>
                                        <td className="p-4 font-bold text-lg" style={{color: `hsl(${rec.aiScore || 0}, 80%, 60%)`}}>{rec.aiScore ?? '-'}</td>
                                        <td className="p-4 text-slate-300 max-w-xs truncate" title={rec.aiNextStep}>{rec.aiNextStep || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex justify-center space-x-3">
                                                <button onClick={() => handleAiAction(rec, 'score')} title="Potansiyeli Analiz Et" className="text-slate-400 hover:text-purple-400"><SparklesIcon /></button>
                                                <button onClick={() => handleAiAction(rec, 'script')} title="AI Arama Metni Oluştur" className="text-slate-400 hover:text-blue-400"><PhoneIcon /></button>
                                                <button onClick={() => handleAiAction(rec, 'email')} title="AI E-posta Taslağı Oluştur" className="text-slate-400 hover:text-green-400"><EnvelopeIcon /></button>
                                                <button onClick={() => handleAiAction(rec, 'nextStep')} title="AI Sonraki Adım Öner" className="text-slate-400 hover:text-yellow-400"><ForwardIcon /></button>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end space-x-3">
                                                <button onClick={() => setModal({ type: 'history', data: rec })} title="Görüşme Geçmişi" className="text-slate-400 hover:text-white"><HistoryIcon /></button>
                                                <button onClick={() => setModal({ type: 'edit', data: rec })} title="Düzenle" className="text-slate-400 hover:text-white"><i className="fas fa-pencil"></i></button>
                                                <button onClick={() => setModal({ type: 'delete', data: rec })} title="Sil" className="text-slate-400 hover:text-red-400"><i className="fas fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredRecords.length === 0 && ( <div className="text-center p-8 text-slate-500">Kayıt bulunamadı.</div> )}
                    </div>
                </>
            )}

            {activeTab === 'hedef' && (
                <div className="mt-8 animate-fade-in">
                    {!selectedSektor ? (
                        <>
                            <h2 className="text-2xl font-bold mb-2">Hedef Kitle Sektörleri</h2>
                            <p className="text-slate-400 mb-8">Soğuk arama listelerinizi yönetmek ve gruplamak için bir sektör seçin.</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {sektörler.map(sektor => (
                                    <div key={sektor.name} onClick={() => setSelectedSektor(sektor.name)} className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                            <i className={`fas ${sektor.icon} text-3xl text-blue-400`}></i>
                                        </div>
                                        <h3 className="font-semibold text-white">{sektor.name}</h3>
                                        <p className="text-xs text-slate-400 mt-1">{records.filter(r => r.sektor === sektor.name).length} kayıt</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <button onClick={() => setSelectedSektor(null)} className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold">
                                    <i className="fas fa-arrow-left"></i> Tüm Sektörler
                                </button>
                                <button onClick={() => setModal({type: 'edit', data: { sektor: selectedSektor }})} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                                    <i className="fas fa-plus"></i> Numara Ekle
                                </button>
                            </div>
                            <h2 className="text-3xl font-bold mb-6">{selectedSektor}</h2>
                            <div className="bg-slate-900 rounded-lg overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                                        <tr>
                                            <th className="p-4">Firma Adı</th>
                                            <th className="p-4">Yetkili</th>
                                            <th className="p-4">Telefon</th>
                                            <th className="p-4">Durum</th>
                                            <th className="p-4 text-right">Eylemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.filter(r => r.sektor === selectedSektor).map(rec => (
                                            <tr key={rec.id} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50">
                                                <td className="p-4 font-semibold">{rec.firmaAdi}</td>
                                                <td className="p-4 text-slate-400">{rec.yetkili}</td>
                                                <td className="p-4 text-slate-300">{rec.telefon}</td>
                                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${durumColors[rec.durum]}`}>{rec.durum}</span></td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end space-x-3">
                                                        <button onClick={() => setModal({ type: 'edit', data: rec })} title="Düzenle" className="text-slate-400 hover:text-white"><i className="fas fa-pencil"></i></button>
                                                        <button onClick={() => setModal({ type: 'delete', data: rec })} title="Sil" className="text-slate-400 hover:text-red-400"><i className="fas fa-trash-can"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {records.filter(r => r.sektor === selectedSektor).length === 0 && <p className="text-center p-8 text-slate-500">Bu sektör için kayıt bulunamadı.</p>}
                            </div>
                        </>
                    )}
                </div>
            )}


            {modal.type === 'edit' && <RecordModal record={modal.data} onClose={() => setModal({type: null})} onSave={handleSave} sektorler={sektörler} />}
            {modal.type === 'delete' && <DeleteModal count={1} onCancel={() => setModal({type: null})} onConfirm={handleDelete} />}
            {modal.type === 'aiScript' && <AiModal title="AI Arama Metni" icon={<PhoneIcon />} content={modal.data?.content} isLoading={modal.data?.isLoading} onClose={() => setModal({type: null})} />}
            {modal.type === 'aiEmail' && <AiModal title="AI E-posta Taslağı" icon={<EnvelopeIcon />} content={modal.data?.content} isLoading={modal.data?.isLoading} onClose={() => setModal({type: null})} />}
            {modal.type === 'history' && <HistoryModal record={modal.data} onAddLog={handleAddLog} onClose={() => setModal({type: null})} />}
        </div>
    );
};

export default AdminSogukAramaPage;