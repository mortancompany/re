import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import type { Quote, QuoteStatus, LineItem, Customer } from '../../types';
import { GoogleGenAI } from '@google/genai';
import { AUTOMATION_SOLUTIONS, APPLICATIONS } from '../../constants';

// --- PERSISTENCE & MOCK DATA ---
const QUOTES_STORAGE_KEY = 'mortanasQuotes';
const CUSTOMERS_STORAGE_KEY = 'mortanasCustomers_v2';

const getInitialQuotes = (): Quote[] => {
    try {
        const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        const mockData: Quote[] = [
            { id: 'q-1', quoteNumber: 'T-2024-001', clientId: 'cust-1', clientName: 'Ahmet Yılmaz', clientCompany: 'İnovasyon A.Ş.', issueDate: new Date(Date.now() - 5 * 86400000).toISOString(), expiryDate: new Date(Date.now() + 25 * 86400000).toISOString(), items: [{id: 'li-1', description: 'Web Sitesi Geliştirme', quantity: 1, unitPrice: 35000}], subtotal: 35000, discount: 0, tax: 20, total: 42000, introText: 'Ahmet Bey merhaba, talebiniz üzerine hazırladığımız web sitesi geliştirme teklifimizi aşağıda bulabilirsiniz.', closingText: 'Sorularınız olursa çekinmeden bize ulaşabilirsiniz. Sizinle çalışmayı dört gözle bekliyoruz.', status: 'Kabul Edildi' },
            { id: 'q-2', quoteNumber: 'T-2024-002', clientId: 'cust-3', clientName: 'Mehmet Öztürk', clientCompany: 'Teknoloji Çözümleri', issueDate: new Date().toISOString(), expiryDate: new Date(Date.now() + 30 * 86400000).toISOString(), items: [{id: 'li-2', description: 'CRM Kurulumu', quantity: 1, unitPrice: 15000}, {id: 'li-3', description: 'Aylık Bakım', quantity: 6, unitPrice: 1000}], subtotal: 21000, discount: 1000, tax: 20, total: 24000, introText: 'Mehmet Bey, görüşmemize istinaden CRM kurulum ve bakım teklifimiz ekteki gibidir.', closingText: 'Teklifimizi değerlendirip geri dönüşünüzü bekleriz. İyi çalışmalar.', status: 'Gönderildi' },
        ];
        localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) { return []; }
};

const getCustomers = (): Customer[] => {
    try {
        const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

const saveQuotes = (quotes: Quote[]) => localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));

const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

// --- MODAL COMPONENT ---
const QuoteModal: React.FC<{
    quote: Partial<Quote> | null;
    customers: Customer[];
    onClose: () => void;
    onSave: (data: any) => void;
}> = ({ quote, customers, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Quote>>({
        id: quote?.id,
        quoteNumber: quote?.quoteNumber || `T-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
        clientId: quote?.clientId || '',
        clientName: quote?.clientName || '',
        clientCompany: quote?.clientCompany || '',
        issueDate: quote?.issueDate?.split('T')[0] || new Date().toISOString().split('T')[0],
        expiryDate: quote?.expiryDate?.split('T')[0] || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        items: quote?.items && quote.items.length > 0 ? quote.items : [{ id: `li-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }],
        introText: quote?.introText || '',
        closingText: quote?.closingText || 'Teklifimizle ilgili sorularınız için bizimle iletişime geçmekten çekinmeyin.\n\nSaygılarımızla,\nMortanas Ekibi',
        status: quote?.status || 'Taslak',
        discount: quote?.discount || 0,
        tax: quote?.tax || 20,
    });
    
    const [aiLoading, setAiLoading] = useState<'intro' | 'closing' | null>(null);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const productList = useMemo(() => [...AUTOMATION_SOLUTIONS, ...APPLICATIONS], []);


    const totals = useMemo(() => {
        const subtotal = formData.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0;
        const total = (subtotal - (formData.discount || 0)) * (1 + (formData.tax || 0) / 100);
        return { subtotal, total };
    }, [formData.items, formData.discount, formData.tax]);

    const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items?.map(item => {
                if (item.id === id) {
                    let processedValue = value;
                    if (field === 'quantity' || field === 'unitPrice') {
                        processedValue = parseFloat(value) || 0;
                    }
                    return { ...item, [field]: processedValue };
                }
                return item;
            })
        }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...(prev.items || []), { id: `li-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }]
        }));
    };
    
    const handleAddProduct = (product: {name: string, description: string, price: number}) => {
        const newItem: LineItem = {
            id: `li-${Date.now()}`,
            description: `${product.name} - ${product.description}`,
            quantity: 1,
            unitPrice: product.price,
        };
        // Remove placeholder if it's the only item
        const currentItems = formData.items?.length === 1 && formData.items[0].description === '' ? [] : formData.items || [];
        setFormData(prev => ({ ...prev, items: [...currentItems, newItem] }));
        setIsProductDropdownOpen(false);
    };

    const handleRemoveItem = (id: string) => {
        if (formData.items && formData.items.length > 1) {
            setFormData(prev => ({ ...prev, items: prev.items?.filter(item => item.id !== id) }));
        }
    };
    
    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCustomer = customers.find(c => c.id === e.target.value);
        setFormData(prev => ({ ...prev, clientId: e.target.value, clientName: selectedCustomer?.name || '', clientCompany: selectedCustomer?.company || '' }));
    };

    const handleGenerateAiText = async (part: 'intro' | 'closing') => {
        if (!formData.clientName || !formData.items?.length) {
            alert("Lütfen önce müşteri ve en az bir hizmet seçin.");
            return;
        }
        setAiLoading(part);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const services = formData.items.map(i => i.description).join(', ');
            let prompt = '';
            if (part === 'intro') {
                prompt = `Müşteri Adı: ${formData.clientName}. Sunulan Hizmetler: ${services}. Bu bilgilere göre, müşteriye hitap eden, samimi ama profesyonel bir dille, bu hizmetlerin onlara nasıl fayda sağlayacağını ima eden kısa bir giriş paragrafı yaz. Cevabı sadece paragraf metni olarak ver.`;
            } else {
                prompt = `Müşteri Adı: ${formData.clientName}. Teklifin toplam tutarı: ${currencyFormatter.format(totals.total)}. Bu bilgilere göre, müşteriyi bir sonraki adıma (örneğin bir toplantı planlama veya sorularını yanıtlama) davet eden, profesyonel bir kapanış paragrafı yaz. Cevabı sadece paragraf metni olarak ver.`;
            }

            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const text = response.text;
            
            if (part === 'intro') {
                setFormData(prev => ({ ...prev, introText: text }));
            } else {
                setFormData(prev => ({ ...prev, closingText: text }));
            }
        } catch (error) {
            console.error("AI text generation error:", error);
            alert("Metin oluşturulurken bir hata oluştu.");
        } finally {
            setAiLoading(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, subtotal: totals.subtotal, total: totals.total });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col p-6 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">{quote?.id ? 'Teklifi Düzenle' : 'Yeni Teklif Oluştur'}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow overflow-hidden">
                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden space-y-4">
                        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                            {/* Client & Dates */}
                            <fieldset className="p-4 border border-slate-700 rounded-lg">
                                <legend className="px-2 font-semibold text-slate-400">Müşteri Bilgileri</legend>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div><label className="text-sm">Müşteri</label><select name="clientId" value={formData.clientId} onChange={handleClientChange} className="w-full bg-slate-700 p-2 rounded-md mt-1" required><option value="" disabled>Müşteri Seçin</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}</select></div>
                                    <div><label className="text-sm">Teklif Tarihi</label><input type="date" name="issueDate" value={formData.issueDate} onChange={e => setFormData(p=>({...p, issueDate: e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                                    <div><label className="text-sm">Geçerlilik Tarihi</label><input type="date" name="expiryDate" value={formData.expiryDate} onChange={e => setFormData(p=>({...p, expiryDate: e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                                </div>
                            </fieldset>

                            {/* Body Text */}
                             <fieldset className="p-4 border border-slate-700 rounded-lg">
                                <legend className="px-2 font-semibold text-slate-400">Teklif Metni</legend>
                                <div className="relative"><label className="text-sm">Giriş Metni</label><textarea name="introText" value={formData.introText} onChange={e => setFormData(p=>({...p, introText: e.target.value}))} rows={3} className="w-full bg-slate-700 p-2 rounded-md mt-1"></textarea><button type="button" onClick={() => handleGenerateAiText('intro')} disabled={!!aiLoading} className="absolute top-7 right-2 text-purple-400 hover:text-purple-300 p-1">{aiLoading === 'intro' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}</button></div>
                                <div className="relative mt-2"><label className="text-sm">Kapanış Metni</label><textarea name="closingText" value={formData.closingText} onChange={e => setFormData(p=>({...p, closingText: e.target.value}))} rows={3} className="w-full bg-slate-700 p-2 rounded-md mt-1"></textarea><button type="button" onClick={() => handleGenerateAiText('closing')} disabled={!!aiLoading} className="absolute top-7 right-2 text-purple-400 hover:text-purple-300 p-1">{aiLoading === 'closing' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}</button></div>
                            </fieldset>
                            
                            {/* Line Items */}
                             <fieldset className="p-4 border border-slate-700 rounded-lg">
                                <legend className="px-2 font-semibold text-slate-400">Teklif Kalemleri</legend>
                                <div className="space-y-3">
                                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-semibold px-1"><div className="flex-1">AÇIKLAMA</div><div className="w-24 text-center">MİKTAR</div><div className="w-32 text-center">BİRİM FİYAT</div><div className="w-32 text-right">TOPLAM</div><div className="w-8"></div></div>
                                    {formData.items?.map((item) => (
                                        <div key={item.id} className="flex flex-col md:flex-row items-center gap-2">
                                            <textarea rows={2} placeholder="Hizmet veya ürün açıklaması" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} className="flex-1 bg-slate-700 p-2 rounded-md w-full md:w-auto"/>
                                            <div className="flex w-full md:w-auto gap-2">
                                                <input type="number" placeholder="1" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="w-24 bg-slate-700 p-2 rounded-md text-center"/>
                                                <input type="number" step="0.01" placeholder="0.00" value={item.unitPrice} onChange={e => handleItemChange(item.id, 'unitPrice', e.target.value)} className="w-32 bg-slate-700 p-2 rounded-md text-right"/>
                                                <div className="w-32 text-right font-semibold text-slate-200 px-2 flex items-center justify-end">{currencyFormatter.format(item.quantity * item.unitPrice)}</div>
                                                <button type="button" onClick={() => handleRemoveItem(item.id)} disabled={formData.items && formData.items.length <= 1} className="w-8 text-red-400 hover:text-red-300 disabled:text-slate-600"><i className="fas fa-trash-can"></i></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button type="button" onClick={handleAddItem} className="text-sm text-blue-400 font-semibold">+ Özel Kalem Ekle</button>
                                    <div className="relative">
                                         <button type="button" onClick={() => setIsProductDropdownOpen(p => !p)} className="text-sm text-purple-400 font-semibold">+ Hazır Ürün Ekle</button>
                                         {isProductDropdownOpen && (
                                            <div className="absolute bottom-full mb-2 bg-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 w-80">
                                                {productList.map(p => {
                                                    const price = (p as any).pricingPlans?.[1]?.prices.monthly || (p as any).pricing?.monthly || 0;
                                                    return (
                                                        <div key={p.slug} onClick={() => handleAddProduct({name: p.name, description: (p as any).shortDescription || p.description, price})} className="p-2 hover:bg-slate-500 cursor-pointer">
                                                            <p className="font-semibold text-sm text-white">{p.name}</p>
                                                            <p className="text-xs text-slate-300">{(p as any).shortDescription || p.description}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                         )}
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-700 flex-shrink-0">
                            <div><label className="text-sm">Durum</label><select value={formData.status} onChange={e => setFormData(p=>({...p, status: e.target.value as QuoteStatus}))} className="bg-slate-700 p-2 rounded-md mt-1"><option>Taslak</option><option>Gönderildi</option><option>Kabul Edildi</option><option>Reddedildi</option></select></div>
                            <div className="flex gap-4"><button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button><button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button></div>
                        </div>
                    </form>

                    {/* Preview Section */}
                    <div className="bg-slate-900 rounded-lg p-4 flex flex-col overflow-hidden h-[calc(100vh-250px)]">
                        <QuotePreview quoteData={formData} totals={totals}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuotePreview: React.FC<{ quoteData: Partial<Quote>, totals: { subtotal: number, total: number } }> = ({ quoteData, totals }) => {
    const previewRef = React.useRef<HTMLDivElement>(null);
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = () => {
        if (previewRef.current) {
            navigator.clipboard.writeText(previewRef.current.innerText).then(() => {
                setCopySuccess('Kopyalandı!');
                setTimeout(() => setCopySuccess(''), 2000);
            }, () => {
                setCopySuccess('Hata!');
            });
        }
    };
    
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
                 <h3 className="text-lg font-bold text-white">Canlı Önizleme</h3>
                 <button onClick={copyToClipboard} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md">{copySuccess || 'İçeriği Kopyala'}</button>
            </div>
            <div ref={previewRef} className="bg-white text-gray-900 rounded-md p-6 flex-grow overflow-y-auto text-sm">
                 <div className="flex justify-between items-start border-b pb-4">
                     <div>
                        <h1 className="text-2xl font-bold text-black">MORTANAS</h1>
                        <p className="text-xs text-gray-600">Yapay Zeka Otomasyon Çözümleri</p>
                    </div>
                     <div className="text-right">
                         <h2 className="text-xl font-bold text-gray-700">TEKLİF</h2>
                         <p><strong>No:</strong> {quoteData.quoteNumber}</p>
                         <p><strong>Tarih:</strong> {new Date(quoteData.issueDate || Date.now()).toLocaleDateString('tr-TR')}</p>
                     </div>
                 </div>
                 <div className="mt-6">
                    <p className="font-bold text-gray-600 text-xs">MÜŞTERİ</p>
                    <p className="font-bold">{quoteData.clientName}</p>
                    <p>{quoteData.clientCompany}</p>
                 </div>
                 <div className="mt-6 whitespace-pre-wrap">{quoteData.introText || `Sayın ${quoteData.clientName || '[Müşteri Adı]'}, görüşmemize istinaden hazırladığımız teklifimizi aşağıda bulabilirsiniz.`}</div>
                 <table className="w-full my-6 text-left">
                     <thead className="bg-slate-100 text-gray-700"><tr className="text-xs"><th className="p-2">AÇIKLAMA</th><th className="p-2 text-center">MİKTAR</th><th className="p-2 text-right">BİRİM FİYAT</th><th className="p-2 text-right">TOPLAM</th></tr></thead>
                     <tbody>{quoteData.items?.map(item => (<tr key={item.id} className="border-b border-gray-200"><td className="p-2">{item.description}</td><td className="p-2 text-center">{item.quantity}</td><td className="p-2 text-right">{currencyFormatter.format(item.unitPrice)}</td><td className="p-2 text-right font-semibold">{currencyFormatter.format(item.quantity * item.unitPrice)}</td></tr>))}</tbody>
                 </table>
                 <div className="flex justify-end mt-6"><div className="w-1/2 space-y-1 text-gray-800">
                    <div className="flex justify-between"><p>Ara Toplam:</p><p>{currencyFormatter.format(totals.subtotal)}</p></div>
                    {quoteData.discount! > 0 && <div className="flex justify-between"><p>İndirim:</p><p>-{currencyFormatter.format(quoteData.discount || 0)}</p></div>}
                    <div className="flex justify-between"><p>KDV (%{quoteData.tax}):</p><p>{currencyFormatter.format((totals.subtotal - (quoteData.discount || 0)) * ((quoteData.tax || 0)/100))}</p></div>
                    <div className="flex justify-between font-bold text-lg mt-2 border-t border-gray-300 pt-2 text-black"><p>GENEL TOPLAM:</p><p>{currencyFormatter.format(totals.total)}</p></div>
                 </div></div>
                 <div className="mt-6 whitespace-pre-wrap">{quoteData.closingText}</div>
            </div>
        </div>
    );
};


const AdminTeklifOlusturucuPage: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>(getInitialQuotes);
    const [customers] = useState<Customer[]>(getCustomers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | QuoteStatus>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => { saveQuotes(quotes); }, [quotes]);

    useEffect(() => {
        if (location.state?.action === 'add_new') {
            const customer = location.state.customer as Customer;
            if (customer) {
                // Open modal with pre-filled customer info
                handleOpenModal({ 
                    clientId: customer.id, 
                    clientName: customer.name,
                    clientCompany: customer.company,
                 } as Partial<Quote>);
            } else {
                 handleOpenModal(null);
            }
            // Clear state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const stats = useMemo(() => ({
        draft: quotes.filter(q => q.status === 'Taslak').length,
        sent: quotes.filter(q => q.status === 'Gönderildi').length,
        accepted: quotes.filter(q => q.status === 'Kabul Edildi').length,
    }), [quotes]);

    const filteredQuotes = useMemo(() => {
        return quotes
            .filter(q => statusFilter === 'all' || q.status === statusFilter)
            .filter(q => q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
    }, [quotes, statusFilter, searchTerm]);

    const handleOpenModal = (quote: Partial<Quote> | null) => {
        setEditingQuote(quote as Quote | null);
        setIsModalOpen(true);
    };

    const handleSaveQuote = (data: Omit<Quote, 'id'> & { id?: string }) => {
        if (data.id) {
            setQuotes(prev => prev.map(q => q.id === data.id ? { ...q, ...data } as Quote : q));
        } else {
            const newQuote: Quote = { ...data as Omit<Quote, 'id'>, id: `q-${Date.now()}` };
            setQuotes(prev => [newQuote, ...prev]);
        }
        setIsModalOpen(false);
    };
    
    const handleDeleteQuote = (id: string) => {
        if(window.confirm("Bu teklifi silmek istediğinizden emin misiniz?")) {
            setQuotes(prev => prev.filter(q => q.id !== id));
        }
    };

    const handleConvertToInvoice = (quote: Quote) => {
        navigate('/admin/fatura-yonetimi', { state: { action: 'convert_from_quote', quoteData: quote } });
    };
    
    const statusColors: Record<QuoteStatus, string> = { 'Taslak': 'bg-slate-500/20 text-slate-300', 'Gönderildi': 'bg-blue-500/20 text-blue-300', 'Kabul Edildi': 'bg-green-500/20 text-green-300', 'Reddedildi': 'bg-red-500/20 text-red-300' };

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <AdminHeader title="Teklif Oluşturucu" />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Taslak Teklifler</p><p className="text-2xl font-bold">{stats.draft}</p></div>
                <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Gönderilmiş Teklifler</p><p className="text-2xl font-bold">{stats.sent}</p></div>
                <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Kabul Edilen Teklifler</p><p className="text-2xl font-bold text-green-400">{stats.accepted}</p></div>
            </div>

            <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4 flex-wrap">
                    <input type="text" placeholder="Müşteri veya teklif no ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm w-64"/>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm">
                        <option value="all">Tüm Durumlar</option><option>Taslak</option><option>Gönderildi</option><option>Kabul Edildi</option><option>Reddedildi</option>
                    </select>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md text-sm">Yeni Teklif Oluştur</button>
            </div>

            <div className="mt-6 bg-slate-900 rounded-lg overflow-x-auto">
               <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Teklif No</th><th className="p-4">Müşteri</th><th className="p-4">Tarih</th><th className="p-4">Tutar</th><th className="p-4">Durum</th><th className="p-4 text-right">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuotes.map(q => (
                            <tr key={q.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                <td className="p-4 font-mono">{q.quoteNumber}</td>
                                <td className="p-4 font-semibold">{q.clientName}</td>
                                <td className="p-4 text-slate-400">{new Date(q.issueDate).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4 font-bold">{currencyFormatter.format(q.total)}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[q.status]}`}>{q.status}</span></td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-4">
                                        <button onClick={() => handleConvertToInvoice(q)} className="text-slate-400 hover:text-green-400" title="Faturaya Dönüştür">
                                            <i className="fas fa-file-invoice-dollar"></i>
                                        </button>
                                        <button onClick={() => handleOpenModal(q)} className="text-slate-400 hover:text-white" title="Düzenle"><i className="fas fa-pencil"></i></button>
                                        <button onClick={() => handleDeleteQuote(q.id)} className="text-slate-400 hover:text-red-400" title="Sil"><i className="fas fa-trash-can"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
               </table>
                {filteredQuotes.length === 0 && <p className="text-center p-8 text-slate-500">Teklif bulunamadı.</p>}
            </div>

            {isModalOpen && <QuoteModal quote={editingQuote} customers={customers} onClose={() => setIsModalOpen(false)} onSave={handleSaveQuote} />}
        </div>
    );
};

export default AdminTeklifOlusturucuPage;