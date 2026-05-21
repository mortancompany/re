import React, { useState, useEffect, useMemo } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import type { Talep } from '../../types';

const TALEPLER_STORAGE_KEY = 'mortanasTalepler';

const getInitialTalepler = (): Talep[] => {
    try {
        const stored = localStorage.getItem(TALEPLER_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Talepler localStorage'dan alınamadı", e);
        return [];
    }
};

const saveTalepler = (talepler: Talep[]) => {
    try {
        localStorage.setItem(TALEPLER_STORAGE_KEY, JSON.stringify(talepler));
    } catch (e) {
        console.error("Talepler localStorage'a kaydedilemedi", e);
    }
};

const DetailModal: React.FC<{ talep: Talep; onClose: () => void }> = ({ talep, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in text-slate-300">
            <h3 className="text-xl font-bold text-white mb-4">Talep Detayları ({talep.name})</h3>
            <div className="space-y-3 bg-slate-900 p-4 rounded-md text-sm">
                <p><strong>Şirket:</strong> {talep.companyName}</p>
                <p><strong>Website:</strong> <a href={talep.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{talep.website}</a></p>
                <p><strong>Telefon:</strong> {talep.phone}</p>
                <p><strong>Yardım Konusu:</strong> {talep.helpTopic}</p>
                <p><strong>Çalışan Sayısı:</strong> {talep.employeeCount}</p>
                <p><strong>Gönderim Zamanı:</strong> {new Date(talep.submittedAt).toLocaleString('tr-TR')}</p>
                <div className="pt-3 mt-3 border-t border-slate-700">
                    <p className="font-semibold">Ek Notlar:</p>
                    <p className="whitespace-pre-wrap mt-1">{talep.notes || 'Ek not bulunmuyor.'}</p>
                </div>
            </div>
            <div className="text-right mt-4">
                <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-5 rounded-lg">Kapat</button>
            </div>
        </div>
    </div>
);

const AdminTaleplerPage: React.FC = () => {
    const [talepler, setTalepler] = useState<Talep[]>(getInitialTalepler);
    const [selectedTalep, setSelectedTalep] = useState<Talep | null>(null);

    useEffect(() => {
        saveTalepler(talepler);
    }, [talepler]);

    const handleStatusChange = (id: string, newStatus: Talep['status']) => {
        setTalepler(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Bu talebi silmek istediğinizden emin misiniz?")) {
            setTalepler(prev => prev.filter(t => t.id !== id));
        }
    };
    
    const statusColors: Record<Talep['status'], string> = {
        'Yeni': 'bg-blue-500/20 text-blue-300',
        'İncelendi': 'bg-yellow-500/20 text-yellow-300',
        'İletişime Geçildi': 'bg-green-500/20 text-green-300',
    };
    
    const statusOptions: Talep['status'][] = ['Yeni', 'İncelendi', 'İletişime Geçildi'];

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <AdminHeader title="Ücretsiz Deneme Talepleri" />

            <div className="mt-8 bg-slate-900 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Tarih</th>
                            <th className="p-4">İsim</th>
                            <th className="p-4">Şirket</th>
                            <th className="p-4">Konu</th>
                            <th className="p-4">Telefon</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 text-right">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talepler.map(talep => (
                            <tr key={talep.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                <td className="p-4 text-slate-400">{new Date(talep.submittedAt).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4 font-semibold">{talep.name}</td>
                                <td className="p-4 text-slate-300">{talep.companyName}</td>
                                <td className="p-4 text-slate-400">{talep.helpTopic}</td>
                                <td className="p-4 text-slate-300">{talep.phone}</td>
                                <td className="p-4">
                                    <select 
                                        value={talep.status} 
                                        onChange={(e) => handleStatusChange(talep.id, e.target.value as Talep['status'])}
                                        className={`w-full text-xs font-semibold rounded-md p-1 border-none focus:ring-0 ${statusColors[talep.status].replace('text-', 'bg-').replace('-300', '/80 text-white')}`}
                                    >
                                        {statusOptions.map(opt => <option key={opt} value={opt} className="bg-slate-800 text-white">{opt}</option>)}
                                    </select>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-4">
                                        <button onClick={() => setSelectedTalep(talep)} className="text-slate-400 hover:text-white" title="Detayları Gör">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button onClick={() => handleDelete(talep.id)} className="text-slate-400 hover:text-red-400" title="Sil">
                                            <i className="fas fa-trash-can"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {talepler.length === 0 && (
                    <div className="text-center p-8 text-slate-500">
                        Henüz bir talep bulunmuyor.
                    </div>
                )}
            </div>
            
            {selectedTalep && <DetailModal talep={selectedTalep} onClose={() => setSelectedTalep(null)} />}
        </div>
    );
};

export default AdminTaleplerPage;