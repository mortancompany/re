import React, { useState, useMemo, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import type { Partner, PartnerTier, PartnerStatus, Referral } from '../../types';

// --- ICONS ---
const EditIcon = () => <i className="fas fa-pencil"></i>;
const DeleteIcon = () => <i className="fas fa-trash-can"></i>;
// FIX: Updated PayIcon to accept and apply a className prop to allow for custom styling.
const PayIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-hand-holding-dollar ${className || ''}`}></i>;
const ExclamationTriangleIcon = () => <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>;

// --- PERSISTENCE & MOCK DATA ---
const PARTNERS_STORAGE_KEY = 'mortanasPartners';
const REFERRALS_STORAGE_KEY = 'mortanasReferrals';

const getInitialPartners = (): Partner[] => {
    try {
        const stored = localStorage.getItem(PARTNERS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        const mockData: Partner[] = [
            { id: 'partner-1', name: 'Caner Öztürk', company: 'Pazarlama Ajansı A.Ş.', email: 'caner@pazarlama.com', phone: '555-100-2030', tier: 'Gold', commissionRate: 20, status: 'Aktif', referralLink: 'https://mortanas.com/?ref=partner-1', joinDate: new Date('2023-05-15').toISOString() },
            { id: 'partner-2', name: 'Selin Demir', company: 'Teknoloji Danışmanlığı', email: 'selin@techdanisman.com', phone: '555-200-3040', tier: 'Silver', commissionRate: 15, status: 'Aktif', referralLink: 'https://mortanas.com/?ref=partner-2', joinDate: new Date('2023-08-20').toISOString() },
            { id: 'partner-3', name: 'Ozan Tekin', company: 'B2B Çözümleri', email: 'ozan.tekin@b2b.com', phone: '555-300-4050', tier: 'Bronze', commissionRate: 10, status: 'Pasif', referralLink: 'https://mortanas.com/?ref=partner-3', joinDate: new Date('2024-01-10').toISOString() },
        ];
        localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) { return []; }
};

const getInitialReferrals = (): Referral[] => {
    try {
        const stored = localStorage.getItem(REFERRALS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        const mockData: Referral[] = [
            { id: 'ref-1', customerName: 'İnovasyon A.Ş.', customerId: 'cust-1', partnerId: 'partner-1', registrationDate: new Date('2023-06-01').toISOString(), totalRevenue: 47000, commissionGenerated: 9400, status: 'Ödendi' },
            { id: 'ref-2', customerName: 'Global Web Servisleri', customerId: 'cust-2', partnerId: 'partner-2', registrationDate: new Date('2023-09-10').toISOString(), totalRevenue: 12000, commissionGenerated: 1800, status: 'Beklemede' },
            { id: 'ref-3', customerName: 'Yeni Girişim Ltd.', customerId: 'cust-5', partnerId: 'partner-1', registrationDate: new Date('2024-02-15').toISOString(), totalRevenue: 8000, commissionGenerated: 1600, status: 'Beklemede' },
        ];
        localStorage.setItem(REFERRALS_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) { return []; }
};

const saveData = (key: string, data: any[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Veri kaydedilemedi: ${key}`, e);
    }
};

const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

// --- SUB-COMPONENTS ---

const StatCard: React.FC<{ icon: string; title: string; value: string; color: string; }> = ({ icon, title, value, color }) => (
    <div className="bg-slate-900 p-5 rounded-xl">
        <p className="text-sm text-slate-400 flex items-center"><i className={`fas ${icon} mr-2 ${color}`}></i>{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);


const PartnerModal: React.FC<{ partner: Partial<Partner> | null, onClose: () => void, onSave: (data: any) => void }> = ({ partner, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: partner?.id,
        name: partner?.name || '',
        company: partner?.company || '',
        email: partner?.email || '',
        phone: partner?.phone || '',
        tier: partner?.tier || 'Bronze' as PartnerTier,
        commissionRate: partner?.commissionRate || 10,
        status: partner?.status || 'Aktif' as PartnerStatus,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'commissionRate' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{partner ? 'Partneri Düzenle' : 'Yeni Partner Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Ad Soyad</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Şirket</label><input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">E-posta</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Telefon</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Seviye</label><select name="tier" value={formData.tier} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Bronze</option><option>Silver</option><option>Gold</option></select></div>
                        <div><label className="text-sm">Komisyon Oranı (%)</label><input type="number" name="commissionRate" value={formData.commissionRate} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div><label className="text-sm">Durum</label><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Aktif</option><option>Pasif</option></select></div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{ item: Partner; onCancel: () => void; onConfirm: () => void; }> = ({ item, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
            <ExclamationTriangleIcon />
            <h3 className="text-lg font-bold text-white mt-4">Partneri Sil?</h3>
            <p className="text-sm text-slate-400 mt-2">
                <strong>{item.name}</strong> adlı partneri kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
);

const PayConfirmModal: React.FC<{ item: { name: string, amount: number }; onCancel: () => void; onConfirm: () => void; }> = ({ item, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
            <PayIcon className="text-4xl text-green-400"/>
            <h3 className="text-lg font-bold text-white mt-4">Komisyon Ödemesini Onayla</h3>
            <p className="text-sm text-slate-400 mt-2">
                <strong>{item.name}</strong> adlı partnere <strong>{currencyFormatter.format(item.amount)}</strong> tutarındaki komisyonu ödemek istediğinizden emin misiniz? Bu işlem, bekleyen tüm yönlendirmeleri 'Ödendi' olarak işaretleyecektir.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg">Evet, Öde</button>
            </div>
        </div>
    </div>
);


const AdminPartnerlerPage: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>(getInitialPartners);
    const [referrals, setReferrals] = useState<Referral[]>(getInitialReferrals);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);
    const [payingPartner, setPayingPartner] = useState<{name: string, id: string, amount: number} | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [tierFilter, setTierFilter] = useState<'all' | PartnerTier>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | PartnerStatus>('all');

    useEffect(() => { saveData(PARTNERS_STORAGE_KEY, partners); }, [partners]);
    useEffect(() => { saveData(REFERRALS_STORAGE_KEY, referrals); }, [referrals]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const stats = useMemo(() => {
        const totalPartners = partners.length;
        const partnerRevenue = referrals.reduce((sum, ref) => sum + ref.totalRevenue, 0);
        const pendingCommission = referrals.filter(r => r.status === 'Beklemede').reduce((sum, ref) => sum + ref.commissionGenerated, 0);
        
        const partnerPerformance = partners.map(p => {
            const totalRefRevenue = referrals.filter(r => r.partnerId === p.id).reduce((sum, r) => sum + r.totalRevenue, 0);
            return { name: p.name, revenue: totalRefRevenue };
        }).sort((a,b) => b.revenue - a.revenue);

        const topPartner = partnerPerformance[0] ? partnerPerformance[0].name : '-';

        return { totalPartners, partnerRevenue, pendingCommission, topPartner };
    }, [partners, referrals]);
    
    const filteredPartners = useMemo(() => {
        return partners
            .filter(p => tierFilter === 'all' || p.tier === tierFilter)
            .filter(p => statusFilter === 'all' || p.status === statusFilter)
            .filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [partners, searchTerm, tierFilter, statusFilter]);

    const handleOpenModal = (partner: Partner | null) => {
        setEditingPartner(partner);
        setIsModalOpen(true);
    };

    const handleSavePartner = (data: Omit<Partner, 'id' | 'referralLink' | 'joinDate'> & { id?: string }) => {
        if (data.id) {
            setPartners(prev => prev.map(p => p.id === data.id ? { ...p, ...data } as Partner : p));
            setToastMessage("Partner bilgileri güncellendi.");
        } else {
            const newId = `partner-${Date.now()}`;
            const newPartner: Partner = {
                ...data,
                id: newId,
                referralLink: `https://mortanas.com/?ref=${newId}`,
                joinDate: new Date().toISOString(),
            };
            setPartners(prev => [newPartner, ...prev]);
            setToastMessage("Yeni partner eklendi.");
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (deletingPartner) {
            setPartners(prev => prev.filter(p => p.id !== deletingPartner.id));
            setDeletingPartner(null);
            setToastMessage("Partner silindi.");
        }
    };

    const handlePayCommission = () => {
        if (payingPartner) {
            setReferrals(prev => prev.map(ref => 
                ref.partnerId === payingPartner.id && ref.status === 'Beklemede' 
                ? { ...ref, status: 'Ödendi' } 
                : ref
            ));
            setToastMessage(`${payingPartner.name} adlı partnere ödeme yapıldı.`);
            setPayingPartner(null);
        }
    };

    const tierColors: Record<PartnerTier, string> = { 'Gold': 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30', 'Silver': 'bg-gray-400/10 text-gray-300 border-gray-400/30', 'Bronze': 'bg-orange-600/10 text-orange-400 border-orange-600/30' };

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <style>{`.animate-scale-in { animation: scaleIn 0.3s ease-out; } @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } } .animate-toast { animation: toast-in 0.5s ease forwards, toast-out 0.5s 2.5s ease forwards; } @keyframes toast-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes toast-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }`}</style>
            <AdminHeader title="Partner Yönetimi" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="fa-handshake" title="Toplam Partner" value={stats.totalPartners.toString()} color="text-blue-400" />
                <StatCard icon="fa-sack-dollar" title="Partner Geliri (Toplam)" value={currencyFormatter.format(stats.partnerRevenue)} color="text-green-400" />
                <StatCard icon="fa-trophy" title="Ayın Partneri" value={stats.topPartner} color="text-yellow-400" />
                <StatCard icon="fa-hourglass-half" title="Bekleyen Komisyon" value={currencyFormatter.format(stats.pendingCommission)} color="text-orange-400" />
            </div>

            <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4 flex-wrap">
                    <input type="text" placeholder="Partner veya şirket ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm w-64"/>
                    <select value={tierFilter} onChange={e => setTierFilter(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm">
                        <option value="all">Tüm Seviyeler</option><option>Gold</option><option>Silver</option><option>Bronze</option>
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm">
                        <option value="all">Tüm Durumlar</option><option>Aktif</option><option>Pasif</option>
                    </select>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md text-sm">Yeni Partner Ekle</button>
            </div>
            
            <div className="mt-6 bg-slate-900 rounded-lg overflow-x-auto">
               <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Partner Adı</th>
                            <th className="p-4">Seviye</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4">Getirdiği Müşteri</th>
                            <th className="p-4">Toplam Gelir</th>
                            <th className="p-4">Oluşturulan Komisyon</th>
                            <th className="p-4">Ödenecek Komisyon</th>
                            <th className="p-4 text-right">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPartners.map(p => {
                            const partnerReferrals = referrals.filter(r => r.partnerId === p.id);
                            const refCount = partnerReferrals.length;
                            const refRevenue = partnerReferrals.reduce((s, r) => s + r.totalRevenue, 0);
                            const totalCommission = partnerReferrals.reduce((s, r) => s + r.commissionGenerated, 0);
                            const pendingCommission = partnerReferrals.filter(r => r.status === 'Beklemede').reduce((s, r) => s + r.commissionGenerated, 0);

                            return (
                                <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="p-4 font-semibold">{p.name}<p className="font-normal text-xs text-slate-400">{p.company}</p></td>
                                    <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full border ${tierColors[p.tier]}`}>{p.tier}</span></td>
                                    <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.status === 'Aktif' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{p.status}</span></td>
                                    <td className="p-4 font-semibold">{refCount}</td>
                                    <td className="p-4">{currencyFormatter.format(refRevenue)}</td>
                                    <td className="p-4 text-green-400">{currencyFormatter.format(totalCommission)}</td>
                                    <td className="p-4 font-bold text-yellow-400">{currencyFormatter.format(pendingCommission)}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end space-x-4">
                                            <button onClick={() => setPayingPartner({id: p.id, name: p.name, amount: pendingCommission})} disabled={pendingCommission <= 0} className="text-slate-400 hover:text-green-400 disabled:text-slate-600 disabled:cursor-not-allowed" title="Ödeme Yap"><PayIcon /></button>
                                            <button onClick={() => handleOpenModal(p)} className="text-slate-400 hover:text-white" title="Düzenle"><EditIcon /></button>
                                            <button onClick={() => setDeletingPartner(p)} className="text-slate-400 hover:text-red-400" title="Sil"><DeleteIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
               </table>
                {filteredPartners.length === 0 && <p className="text-center p-8 text-slate-500">Filtrelerle eşleşen partner bulunamadı.</p>}
            </div>

            {isModalOpen && <PartnerModal partner={editingPartner} onClose={() => setIsModalOpen(false)} onSave={handleSavePartner} />}
            {deletingPartner && <DeleteConfirmModal item={deletingPartner} onCancel={() => setDeletingPartner(null)} onConfirm={handleDelete} />}
            {payingPartner && <PayConfirmModal item={payingPartner} onCancel={() => setPayingPartner(null)} onConfirm={handlePayCommission} />}
            {toastMessage && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-toast z-50">{toastMessage}</div>}
        </div>
    );
};

export default AdminPartnerlerPage;