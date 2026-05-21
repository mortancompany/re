import React, { useState, useMemo, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI, Type } from '@google/genai';
import type { Customer, CustomerStatus, MailList } from '../../types';

// --- TYPES ---
interface Campaign {
    id: string;
    subject: string;
    target: string;
    sentDate: string;
    recipients: number;
    openRate: number;
    clickRate: number;
}

// --- MOCK DATA & PERSISTENCE ---
const CAMPAIGNS_STORAGE_KEY = 'mortanasCampaigns';
const CUSTOMERS_STORAGE_KEY = 'mortanasCustomers_v2';
const MAIL_LISTS_STORAGE_KEY = 'mortanasMailLists';

const getInitialCampaigns = (): Campaign[] => {
    try {
        const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
        if(stored) return JSON.parse(stored);
        const mockData: Campaign[] = [
            { id: 'camp-1', subject: 'Yeni Yapay Zeka Çözümlerimizle Tanışın!', target: 'Tüm Müşteriler', sentDate: new Date(Date.now() - 5 * 86400000).toISOString(), recipients: 4, openRate: 65.8, clickRate: 12.3 },
            { id: 'camp-2', subject: 'Potansiyel Müşterilere Özel CRM Demosu', target: 'Potansiyel', sentDate: new Date(Date.now() - 15 * 86400000).toISOString(), recipients: 1, openRate: 80.1, clickRate: 25.0 }
        ];
        localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) {
        return [];
    }
};

const getCustomers = (): Customer[] => {
     try {
        const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

const getInitialMailLists = (): MailList[] => {
    try {
        const stored = localStorage.getItem(MAIL_LISTS_STORAGE_KEY);
        if(stored) return JSON.parse(stored);
        const mockData: MailList[] = [
            { id: 'list-1', name: 'Bülten Aboneleri', emails: ['abone1@example.com', 'abone2@example.com'] },
        ];
        localStorage.setItem(MAIL_LISTS_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) {
        return [];
    }
};


const saveCampaigns = (campaigns: Campaign[]) => {
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
};

const saveMailLists = (lists: MailList[]) => {
    localStorage.setItem(MAIL_LISTS_STORAGE_KEY, JSON.stringify(lists));
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

const AiContentModal: React.FC<{ title: string; content: string[] | string; isLoading: boolean; onSelect: (selected: string) => void; onClose: () => void; }> = ({ title, content, isLoading, onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in max-h-[80vh] flex flex-col">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0"><i className="fas fa-wand-magic-sparkles text-purple-400 mr-3"></i>{title}</h3>
                <div className="bg-slate-900 rounded-md p-4 text-slate-300 text-sm overflow-y-auto">
                    {isLoading ? (
                         <div className="flex items-center justify-center h-40"><i className="fas fa-spinner fa-spin text-3xl"></i><p className="ml-4">Oluşturuluyor...</p></div>
                    ) : (
                        Array.isArray(content) ? (
                            <ul className="space-y-3">
                                {content.map((item, index) => (
                                    <li key={index} onClick={() => onSelect(item)} className="p-3 bg-slate-800 rounded-md hover:bg-slate-700 cursor-pointer transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
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

const MailListModal: React.FC<{ list: Partial<MailList> | null; onClose: () => void; onSave: (data: any) => void }> = ({ list, onClose, onSave }) => {
    const [name, setName] = useState(list?.name || '');
    const [emails, setEmails] = useState(list?.emails?.join('\n') || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailArray = emails.split(/[\n,]+/).map(e => e.trim()).filter(Boolean);
        onSave({ id: list?.id, name, emails: emailArray });
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 animate-scale-in">
                <h3 className="text-xl font-bold text-white mb-4">{list?.id ? 'Listeyi Düzenle' : 'Yeni Liste Oluştur'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Liste Adı</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-700 p-2 rounded-md mt-1" required />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">E-postalar (Her satıra bir tane veya virgülle ayırın)</label>
                        <textarea value={emails} onChange={e => setEmails(e.target.value)} rows={8} className="w-full bg-slate-700 p-2 rounded-md mt-1 font-mono text-sm"></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="bg-slate-600 px-4 py-2 rounded-md font-semibold">İptal</button>
                        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md font-semibold">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const AdminTopluEpostaPage: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>(getInitialCampaigns);
    const [customers] = useState<Customer[]>(getCustomers);
    const [mailLists, setMailLists] = useState<MailList[]>(getInitialMailLists);
    const [emailData, setEmailData] = useState({ target: 'all', subject: '', body: '' });
    const [modal, setModal] = useState<{ type: 'subject' | 'body' | null, content: string[] | string, isLoading: boolean }>({ type: null, content: '', isLoading: false });
    const [isSending, setIsSending] = useState(false);
    const [activeRightTab, setActiveRightTab] = useState<'history' | 'lists'>('history');
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [editingList, setEditingList] = useState<MailList | null>(null);
    
    useEffect(() => { saveCampaigns(campaigns); }, [campaigns]);
    useEffect(() => { saveMailLists(mailLists); }, [mailLists]);

    const stats = useMemo(() => {
        const totalCampaigns = campaigns.length;
        if (totalCampaigns === 0) return { totalCampaigns, avgOpen: '0%', avgClick: '0%', totalSubs: customers.length };
        const avgOpen = (campaigns.reduce((acc, c) => acc + c.openRate, 0) / totalCampaigns).toFixed(1) + '%';
        const avgClick = (campaigns.reduce((acc, c) => acc + c.clickRate, 0) / totalCampaigns).toFixed(1) + '%';
        return { totalCampaigns, avgOpen, avgClick, totalSubs: customers.length };
    }, [campaigns, customers]);

    const getRecipientCount = (target: string) => {
        if (target.startsWith('list:')) {
            const listId = target.split(':')[1];
            const list = mailLists.find(l => l.id === listId);
            return list ? list.emails.length : 0;
        }
        if (target === 'all') return customers.length;
        return customers.filter(c => c.status === target).length;
    };

    const handleAiGenerate = async (type: 'subject' | 'body') => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        setModal({ type, content: '', isLoading: true });
        
        try {
            if (type === 'subject') {
                if(!emailData.body) { alert('Konu önermek için lütfen önce e-posta içeriğini yazın.'); setModal({type: null, content: '', isLoading: false}); return; }
                const prompt = `Şu e-posta içeriği için 5 tane dikkat çekici, profesyonel ve kısa konu başlığı öner. Sonucu 'subjects' anahtarı altında bir string dizisi içeren JSON olarak döndür: "${emailData.body}"`;
                const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config: { responseMimeType: 'application/json' } });
                const result = JSON.parse(response.text);
                setModal({ type: 'subject', content: result.subjects, isLoading: false });
            } else { // body
                if(!emailData.subject) { alert('İçerik oluşturmak için lütfen önce konu başlığını yazın.'); setModal({type: null, content: '', isLoading: false}); return; }
                const prompt = `Konusu "${emailData.subject}" olan bir pazarlama e-postası metni yaz. Giriş, ana mesaj ve bir eylem çağrısı (call to action) içersin. Profesyonel ve ikna edici bir dil kullan.`;
                const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
                setModal({ type: 'body', content: response.text, isLoading: false });
            }
        } catch(e) {
            console.error(e);
            alert("Yapay zeka içeriği oluşturulurken bir hata oluştu.");
            setModal({ type: null, content: '', isLoading: false });
        }
    };
    
    const handleSelectAiContent = (selected: string) => {
        if(modal.type === 'subject') {
            setEmailData(prev => ({...prev, subject: selected}));
        } else if (modal.type === 'body') {
            setEmailData(prev => ({...prev, body: selected}));
        }
        setModal({type: null, content: '', isLoading: false});
    };

    const handleSendEmail = () => {
        if (!emailData.subject || !emailData.body) {
            alert('Lütfen konu ve içerik alanlarını doldurun.');
            return;
        }
        
        const recipientCount = getRecipientCount(emailData.target);
        if(!window.confirm(`${recipientCount} alıcıya e-posta göndermek istediğinizden emin misiniz?`)) return;

        setIsSending(true);
        setTimeout(() => { // Simulate sending
            let targetName = "Bilinmeyen";
            if (emailData.target.startsWith('list:')) {
                const listId = emailData.target.split(':')[1];
                targetName = mailLists.find(l => l.id === listId)?.name || "Bilinmeyen Liste";
            } else if (emailData.target === 'all') {
                targetName = 'Tüm Müşteriler';
            } else {
                targetName = emailData.target;
            }

            const newCampaign: Campaign = {
                id: `camp-${Date.now()}`,
                subject: emailData.subject,
                target: targetName,
                sentDate: new Date().toISOString(),
                recipients: recipientCount,
                openRate: 0,
                clickRate: 0,
            };
            setCampaigns(prev => [newCampaign, ...prev]);
            setEmailData({ target: 'all', subject: '', body: '' });
            setIsSending(false);
        }, 1500);
    };

    const handleOpenListModal = (list: MailList | null) => {
        setEditingList(list);
        setIsListModalOpen(true);
    };

    const handleSaveList = (data: { id?: string; name: string; emails: string[] }) => {
        if (data.id) {
            setMailLists(prev => prev.map(l => l.id === data.id ? { ...l, ...data } as MailList : l));
        } else {
            const newList: MailList = { id: `list-${Date.now()}`, name: data.name, emails: data.emails };
            setMailLists(prev => [...prev, newList]);
        }
        setIsListModalOpen(false);
        setEditingList(null);
    };

    const handleDeleteList = (listId: string) => {
        if (window.confirm("Bu listeyi silmek istediğinizden emin misiniz?")) {
            setMailLists(prev => prev.filter(l => l.id !== listId));
        }
    };


    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } } .animate-scale-in { animation: scaleIn 0.3s ease-out; } @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }`}</style>
            <AdminHeader title="Toplu E-posta" />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="fa-users" title="Toplam Abone" value={stats.totalSubs.toString()} color="text-blue-400" />
                <StatCard icon="fa-paper-plane" title="Gönderilen Kampanya" value={stats.totalCampaigns.toString()} color="text-purple-400" />
                <StatCard icon="fa-envelope-open" title="Ort. Açılma Oranı" value={stats.avgOpen} color="text-green-400" />
                <StatCard icon="fa-mouse-pointer" title="Ort. Tıklanma Oranı" value={stats.avgClick} color="text-yellow-400" />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Composer */}
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold mb-4">Yeni Kampanya Oluştur</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-400">Alıcılar</label>
                            <select value={emailData.target} onChange={e => setEmailData(p => ({...p, target: e.target.value}))} className="w-full bg-slate-800 p-2 rounded-md mt-1 border border-slate-600">
                                <optgroup label="CRM Grupları">
                                    <option value="all">Tüm Müşteriler ({getRecipientCount('all')})</option>
                                    <option value="Aktif">Aktif Müşteriler ({getRecipientCount('Aktif')})</option>
                                    <option value="Potansiyel">Potansiyel Müşteriler ({getRecipientCount('Potansiyel')})</option>
                                    <option value="Pasif">Pasif Müşteriler ({getRecipientCount('Pasif')})</option>
                                </optgroup>
                                {mailLists.length > 0 && (
                                    <optgroup label="Mail Listeleri">
                                        {mailLists.map(list => (
                                            <option key={list.id} value={`list:${list.id}`}>
                                                {list.name} ({getRecipientCount(`list:${list.id}`)})
                                            </option>
                                        ))}
                                    </optgroup>
                                )}
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-slate-400">Konu</label>
                            <div className="flex items-center gap-2 mt-1">
                                <input type="text" value={emailData.subject} onChange={e => setEmailData(p => ({...p, subject: e.target.value}))} placeholder="E-posta konusu..." className="w-full bg-slate-800 p-2 rounded-md border border-slate-600"/>
                                <button onClick={() => handleAiGenerate('subject')} title="AI ile Konu Öner" className="p-2 bg-purple-600 rounded-md hover:bg-purple-700"><i className="fas fa-wand-magic-sparkles"></i></button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-400">İçerik</label>
                            <div className="relative mt-1">
                                <textarea value={emailData.body} onChange={e => setEmailData(p => ({...p, body: e.target.value}))} placeholder="E-posta içeriğini yazın veya yapay zekadan oluşturmasını isteyin..." rows={12} className="w-full bg-slate-800 p-3 rounded-md border border-slate-600"></textarea>
                                <button onClick={() => handleAiGenerate('body')} className="absolute bottom-3 right-3 bg-purple-600 text-sm font-semibold py-1 px-3 rounded-md hover:bg-purple-700 flex items-center gap-2">
                                    <i className="fas fa-wand-magic-sparkles"></i> AI ile Yaz
                                </button>
                            </div>
                        </div>
                         <button onClick={handleSendEmail} disabled={isSending} className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-600">
                           {isSending ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                           {isSending ? 'Gönderiliyor...' : `Kampanyayı Gönder (${getRecipientCount(emailData.target)} Kişi)`}
                        </button>
                    </div>
                </div>

                {/* Right Panel: History & Lists */}
                <div className="bg-slate-900 rounded-lg border border-slate-700 flex flex-col">
                    <div className="p-2 border-b border-slate-700 flex">
                        <button onClick={() => setActiveRightTab('history')} className={`flex-1 py-2 text-sm font-semibold rounded-md ${activeRightTab === 'history' ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>Kampanya Geçmişi</button>
                        <button onClick={() => setActiveRightTab('lists')} className={`flex-1 py-2 text-sm font-semibold rounded-md ${activeRightTab === 'lists' ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>Mail Listeleri</button>
                    </div>
                    
                    {activeRightTab === 'history' ? (
                        <div className="p-4 space-y-3 overflow-y-auto">
                            {campaigns.map(camp => (
                                <div key={camp.id} className="bg-slate-800 p-4 rounded-lg border-l-4 border-slate-600">
                                    <p className="font-bold text-white">{camp.subject}</p>
                                    <p className="text-xs text-slate-400 mt-1">{new Date(camp.sentDate).toLocaleDateString('tr-TR')} - {camp.recipients} Alıcı ({camp.target})</p>
                                    <div className="flex items-center gap-4 text-sm font-semibold mt-2">
                                        <span title="Açılma Oranı" className="text-green-400"><i className="fas fa-envelope-open-text mr-1"></i>{camp.openRate}%</span>
                                        <span title="Tıklanma Oranı" className="text-yellow-400"><i className="fas fa-mouse-pointer mr-1"></i>{camp.clickRate}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="p-4 flex flex-col h-full">
                            <button onClick={() => handleOpenListModal(null)} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md text-sm flex items-center justify-center gap-2 mb-4">
                               <i className="fas fa-plus"></i> Yeni Liste Oluştur
                            </button>
                            <div className="space-y-3 overflow-y-auto">
                                {mailLists.map(list => (
                                    <div key={list.id} className="bg-slate-800 p-3 rounded-lg flex justify-between items-center group">
                                        <div>
                                            <p className="font-semibold text-white">{list.name}</p>
                                            <p className="text-xs text-slate-400">{list.emails.length} e-posta</p>
                                        </div>
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleOpenListModal(list)} className="text-slate-400 hover:text-purple-400"><i className="fas fa-pencil"></i></button>
                                            <button onClick={() => handleDeleteList(list.id)} className="text-slate-400 hover:text-red-400"><i className="fas fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modal.type && <AiContentModal title={modal.type === 'subject' ? 'AI Konu Önerileri' : 'AI İçerik Taslağı'} content={modal.content} isLoading={modal.isLoading} onSelect={handleSelectAiContent} onClose={() => setModal({type: null, content: '', isLoading: false})} />}
            {isListModalOpen && <MailListModal list={editingList} onClose={() => setIsListModalOpen(false)} onSave={handleSaveList} />}
        </div>
    );
};

export default AdminTopluEpostaPage;