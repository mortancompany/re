import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI } from '@google/genai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Invoice, InvoiceStatus, LineItem, Customer, Quote, ExpenseInvoice } from '../../types';

// --- ICONS ---
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-eye ${className || ''}`}></i>;
const PencilIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-pencil ${className || ''}`}></i>;
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-trash-can ${className || ''}`}></i>;
const RepeatIcon: React.FC<{ className?: string; title?: string; }> = ({ className, title }) => <i className={`fas fa-sync-alt ${className || ''}`} title={title}></i>;
const AiIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-wand-magic-sparkles ${className || ''}`}></i>;
const PdfIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-file-pdf ${className || ''}`}></i>;
const PrintIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-print ${className || ''}`}></i>;
const SendIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-paper-plane ${className || ''}`}></i>;
const PaperclipIcon: React.FC<{ className?: string; title?: string; }> = ({ className, title }) => <i className={`fas fa-paperclip ${className || ''}`} title={title}></i>;


// --- PERSISTENCE & MOCK DATA ---
const INVOICES_STORAGE_KEY = 'mortanasInvoices_v2';
const EXPENSE_INVOICES_STORAGE_KEY = 'mortanasExpenseInvoices';
const CUSTOMERS_STORAGE_KEY = 'mortanasCustomers_v2';
const QUOTES_STORAGE_KEY = 'mortanasQuotes';

const getInitialInvoices = (): Invoice[] => {
    try {
        const stored = localStorage.getItem(INVOICES_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        const mockData: Invoice[] = [
            { id: 'inv-1', invoiceNumber: 'F-2024-001', quoteId: 'q-1', clientId: 'cust-1', clientName: 'Ahmet Yılmaz', clientCompany: 'İnovasyon A.Ş.', issueDate: new Date(Date.now() - 20 * 86400000).toISOString(), dueDate: new Date(Date.now() - 5 * 86400000).toISOString(), items: [{id: 'li-1', description: 'Web Sitesi Geliştirme', quantity: 1, unitPrice: 35000}], subtotal: 35000, discount: 0, tax: 20, total: 42000, amountPaid: 0, notes: 'Ödeme vadesi 15 gündür.', status: 'Gecikti', isRecurring: false },
            { id: 'inv-2', invoiceNumber: 'F-2024-002', clientId: 'cust-2', clientName: 'Ayşe Kaya', clientCompany: 'Global Web Servisleri', issueDate: new Date(Date.now() - 30 * 86400000).toISOString(), dueDate: new Date(Date.now() - 15 * 86400000).toISOString(), items: [{id: 'li-4', description: 'Yıllık Bakım Anlaşması', quantity: 1, unitPrice: 12000}], subtotal: 12000, discount: 0, tax: 20, total: 14400, amountPaid: 14400, notes: '', status: 'Ödendi', isRecurring: true, recurrenceFrequency: 'Yıllık' },
            { id: 'inv-3', invoiceNumber: 'F-2024-003', clientId: 'cust-3', clientName: 'Mehmet Öztürk', issueDate: new Date().toISOString(), dueDate: new Date(Date.now() + 15 * 86400000).toISOString(), items: [{id: 'li-5', description: 'CRM Kurulumu', quantity: 1, unitPrice: 15000}], subtotal: 15000, discount: 0, tax: 20, total: 18000, amountPaid: 0, notes: '', status: 'Gönderildi', isRecurring: false },
        ];
        localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(mockData));
        return mockData;
    } catch (e) { return []; }
};

const getInitialExpenseInvoices = (): ExpenseInvoice[] => {
    try {
        const stored = localStorage.getItem(EXPENSE_INVOICES_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        return [];
    } catch (e) { return []; }
}

const getCustomers = (): Customer[] => { try { const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY); return stored ? JSON.parse(stored) : []; } catch (e) { return []; }};
const getQuotes = (): Quote[] => { try { const stored = localStorage.getItem(QUOTES_STORAGE_KEY); return stored ? JSON.parse(stored) : []; } catch (e) { return []; }};

const saveInvoices = (invoices: Invoice[]) => localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
const saveExpenseInvoices = (invoices: ExpenseInvoice[]) => localStorage.setItem(EXPENSE_INVOICES_STORAGE_KEY, JSON.stringify(invoices));

const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });


const AdminFaturaYonetimiPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'gelir' | 'gider'>('gelir');
    
    // Gelir State
    const [invoices, setInvoices] = useState<Invoice[]>(getInitialInvoices);
    const [customers] = useState<Customer[]>(getCustomers);
    const [quotes] = useState<Quote[]>(getQuotes);
    const [modal, setModal] = useState<{ type: 'edit' | 'preview' | 'delete' | 'ai-reminder' | null, data: any }>({ type: null, data: null });
    const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Gider State
    const [expenseInvoices, setExpenseInvoices] = useState<ExpenseInvoice[]>(getInitialExpenseInvoices);
    const [expenseModal, setExpenseModal] = useState<{type: 'edit' | 'preview' | 'delete' | null, data: any}>({ type: null, data: null });

    const location = useLocation();


    // Check for overdue invoices on component mount and when invoices change
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        let wasUpdated = false;
        const updatedInvoices = invoices.map(inv => {
            if ((inv.status === 'Gönderildi' || inv.status === 'Taslak') && inv.dueDate < today) {
                wasUpdated = true;
                return { ...inv, status: 'Gecikti' as InvoiceStatus };
            }
            return inv;
        });
        if(wasUpdated) {
            setInvoices(updatedInvoices);
        }
    }, []); 
    
    useEffect(() => { saveInvoices(invoices); }, [invoices]);
    useEffect(() => { saveExpenseInvoices(expenseInvoices); }, [expenseInvoices]);

    useEffect(() => {
        const state = location.state as { action?: string, customer?: Customer, quoteData?: Quote };

        if (state?.action) {
            if (state.action === 'add_expense') {
                setActiveTab('gider');
                setExpenseModal({ type: 'edit', data: null });
            } else if (state.action === 'add_new' && state.customer) {
                setActiveTab('gelir');
                setModal({ type: 'edit', data: { clientId: state.customer.id, clientName: state.customer.name, clientCompany: state.customer.company } });
            } else if (state.action === 'convert_from_quote' && state.quoteData) {
                setActiveTab('gelir');
                const q = state.quoteData;
                setModal({ type: 'edit', data: { 
                    quoteId: q.id, 
                    clientId: q.clientId, 
                    clientName: q.clientName,
                    clientCompany: q.clientCompany,
                    items: q.items,
                    discount: q.discount,
                    tax: q.tax,
                    // FIX: The 'Quote' type does not have a 'notes' property.
                    // Using 'closingText' as the most appropriate field to transfer to invoice notes.
                    notes: q.closingText
                }});
            }
            // Clear state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const incomeStats = useMemo(() => {
        const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
        const outstanding = invoices.filter(i => i.status === 'Gönderildi' || i.status === 'Gecikti').reduce((sum, i) => sum + (i.total - i.amountPaid), 0);
        const overdue = invoices.filter(i => i.status === 'Gecikti').reduce((sum, i) => sum + (i.total - i.amountPaid), 0);
        const paidThisMonth = invoices.filter(i => i.status === 'Ödendi' && new Date(i.issueDate).getMonth() === new Date().getMonth()).reduce((sum, i) => sum + i.amountPaid, 0);
        return { totalInvoiced, outstanding, overdue, paidThisMonth };
    }, [invoices]);

    const expenseStats = useMemo(() => {
        const totalExpense = expenseInvoices.reduce((sum, i) => sum + i.amount, 0);
        const expenseThisMonth = expenseInvoices.filter(i => new Date(i.date).getMonth() === new Date().getMonth()).reduce((sum, i) => sum + i.amount, 0);
        return { totalExpense, expenseThisMonth };
    }, [expenseInvoices]);
    
    const filteredInvoices = useMemo(() => {
        return invoices
            .filter(i => statusFilter === 'all' || i.status === statusFilter)
            .filter(i => i.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
    }, [invoices, statusFilter, searchTerm]);
    
    const filteredExpenseInvoices = useMemo(() => {
        return expenseInvoices
            .filter(i => i.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || i.description.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [expenseInvoices, searchTerm]);

    const handleSave = (data: Omit<Invoice, 'id'> & { id?: string }) => {
        if (data.id) {
            setInvoices(prev => prev.map(i => i.id === data.id ? { ...i, ...data } as Invoice : i));
        } else {
            const newInvoice: Invoice = { ...data as Omit<Invoice, 'id'>, id: `inv-${Date.now()}` };
            setInvoices(prev => [newInvoice, ...prev]);
        }
        setModal({type: null, data: null});
    };
    
    const handleDelete = () => {
        if(modal.type === 'delete' && modal.data) {
            setInvoices(prev => prev.filter(i => i.id !== modal.data.id));
        }
        setModal({type: null, data: null});
    };

    const handleSaveExpense = (data: Omit<ExpenseInvoice, 'id'> & { id?: string }) => {
        if (data.id) {
            setExpenseInvoices(prev => prev.map(i => i.id === data.id ? { ...i, ...data } as ExpenseInvoice : i));
        } else {
            const newExpense: ExpenseInvoice = { ...data as Omit<ExpenseInvoice, 'id'>, id: `exp-inv-${Date.now()}` };
            setExpenseInvoices(prev => [newExpense, ...prev]);
        }
        setExpenseModal({ type: null, data: null });
    };

    const handleDeleteExpense = () => {
        if (expenseModal.type === 'delete' && expenseModal.data) {
            setExpenseInvoices(prev => prev.filter(i => i.id !== expenseModal.data.id));
        }
        setExpenseModal({ type: null, data: null });
    };

    const handleStatusUpdate = (id: string, newStatus: InvoiceStatus) => {
        setInvoices(prev => prev.map(i => {
            if (i.id === id) {
                const updatedInvoice = { ...i, status: newStatus };
                if (newStatus === 'Ödendi') {
                    updatedInvoice.amountPaid = updatedInvoice.total;
                }
                return updatedInvoice;
            }
            return i;
        }));
    };
    
    const handleGenerateAiReminder = async (invoice: Invoice) => {
        setModal({ type: 'ai-reminder', data: { isLoading: true, content: '' } });
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Müşteri: ${invoice.clientName}, Fatura No: ${invoice.invoiceNumber}, Tutar: ${currencyFormatter.format(invoice.total)}, Vade Tarihi: ${new Date(invoice.dueDate).toLocaleDateString('tr-TR')}. Bu bilgilere dayanarak, hem profesyonel hem de nazik bir dille, gecikmiş ödemeyi hatırlatan ve ödeme yapılması için ricada bulunan bir e-posta taslağı oluştur.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setModal({ type: 'ai-reminder', data: { isLoading: false, content: response.text } });
        } catch (error) {
            console.error(error);
            setModal({ type: 'ai-reminder', data: { isLoading: false, content: 'Hata: Hatırlatma metni oluşturulamadı.' } });
        }
    };
    
    const statusColors: Record<InvoiceStatus, string> = { 'Taslak': 'bg-slate-500/20 text-slate-300', 'Gönderildi': 'bg-blue-500/20 text-blue-300', 'Ödendi': 'bg-green-500/20 text-green-300', 'Gecikti': 'bg-red-500/20 text-red-300', 'İptal Edildi': 'bg-gray-500/20 text-gray-400' };

    // --- RENDER ---
    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
             <style>{`.animate-scale-in { animation: scaleIn 0.3s ease-out; } @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } } .invoice-preview-area { font-family: 'Helvetica', 'Arial', sans-serif; } @media print { body * { visibility: hidden; } .printable-area, .printable-area * { visibility: visible; } .printable-area { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none; } }`}</style>
            <AdminHeader title="Fatura Yönetimi" />
            
            <div className="mt-8 border-b border-slate-700">
                <div className="flex space-x-6">
                    <button onClick={() => setActiveTab('gelir')} className={`py-3 px-1 font-semibold text-lg transition-colors duration-200 border-b-2 ${activeTab === 'gelir' ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white'}`}>Gelir Faturaları</button>
                    <button onClick={() => setActiveTab('gider')} className={`py-3 px-1 font-semibold text-lg transition-colors duration-200 border-b-2 ${activeTab === 'gider' ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white'}`}>Mortanas Gider Faturaları</button>
                </div>
            </div>

            {activeTab === 'gelir' ? (
                <>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Toplam Faturalanan</p><p className="text-2xl font-bold">{currencyFormatter.format(incomeStats.totalInvoiced)}</p></div>
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Ödenmemiş Bakiye</p><p className="text-2xl font-bold text-yellow-400">{currencyFormatter.format(incomeStats.outstanding)}</p></div>
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Gecikmiş Bakiye</p><p className="text-2xl font-bold text-red-400">{currencyFormatter.format(incomeStats.overdue)}</p></div>
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Bu Ay Ödenen</p><p className="text-2xl font-bold text-green-400">{currencyFormatter.format(incomeStats.paidThisMonth)}</p></div>
                    </div>
                    <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center gap-4 flex-wrap">
                            <input type="text" placeholder="Müşteri veya fatura no ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm w-64"/>
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm">
                                <option value="all">Tüm Durumlar</option><option>Taslak</option><option>Gönderildi</option><option>Ödendi</option><option>Gecikti</option><option>İptal Edildi</option>
                            </select>
                        </div>
                        <button onClick={() => setModal({ type: 'edit', data: null })} className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md text-sm">Yeni Fatura Oluştur</button>
                    </div>
                    <div className="mt-6 bg-slate-900 rounded-lg overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                                <tr>
                                    <th className="p-4">Fatura No</th><th className="p-4">Müşteri</th><th className="p-4">Düzenlenme Tarihi</th><th className="p-4">Vade Tarihi</th><th className="p-4">Toplam Tutar</th><th className="p-4">Kalan Tutar</th><th className="p-4">Durum</th><th className="p-4 text-right">Eylemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.map(inv => {
                                    const amountDue = inv.total - inv.amountPaid;
                                    return (
                                        <tr key={inv.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                            <td className="p-4 font-mono flex items-center gap-2">{inv.invoiceNumber} {inv.isRecurring && <RepeatIcon className="text-slate-500" title="Yinelenen Fatura"/>} {inv.invoiceImage && <PaperclipIcon className="text-slate-500" title="Ekli Belge Mevcut"/>}</td>
                                            <td className="p-4 font-semibold">{inv.clientName}</td><td className="p-4 text-slate-400">{new Date(inv.issueDate).toLocaleDateString('tr-TR')}</td><td className="p-4 text-slate-400">{new Date(inv.dueDate).toLocaleDateString('tr-TR')}</td><td className="p-4 font-bold">{currencyFormatter.format(inv.total)}</td><td className={`p-4 font-bold ${amountDue > 0 && inv.status !== 'Ödendi' ? 'text-yellow-400' : 'text-slate-400'}`}>{currencyFormatter.format(amountDue)}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[inv.status]}`}>{inv.status}</span></td>
                                            <td className="p-4 text-right"><div className="flex justify-end space-x-4">{inv.status === 'Gecikti' && <button onClick={() => handleGenerateAiReminder(inv)} className="text-slate-400 hover:text-purple-400" title="AI Hatırlatma Oluştur"><AiIcon /></button>}<button onClick={() => setModal({ type: 'preview', data: inv })} className="text-slate-400 hover:text-white" title="Önizle"><EyeIcon /></button><button onClick={() => setModal({ type: 'edit', data: inv })} className="text-slate-400 hover:text-white" title="Düzenle"><PencilIcon /></button><button onClick={() => setModal({ type: 'delete', data: inv })} className="text-slate-400 hover:text-red-400" title="Sil"><TrashIcon /></button></div></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {filteredInvoices.length === 0 && <p className="text-center p-8 text-slate-500">Fatura bulunamadı.</p>}
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Toplam Gider</p><p className="text-2xl font-bold text-red-400">{currencyFormatter.format(expenseStats.totalExpense)}</p></div>
                        <div className="bg-slate-900 p-5 rounded-xl"><p className="text-sm text-slate-400">Bu Ayki Gider</p><p className="text-2xl font-bold text-red-400">{currencyFormatter.format(expenseStats.expenseThisMonth)}</p></div>
                    </div>
                    <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                        <input type="text" placeholder="Tedarikçi veya açıklama ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm w-64"/>
                        <button onClick={() => setExpenseModal({ type: 'edit', data: null })} className="bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded-md text-sm">Yeni Gider Faturası Ekle</button>
                    </div>
                    <div className="mt-6 bg-slate-900 rounded-lg overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                                <tr>
                                    <th className="p-4">Tarih</th><th className="p-4">Açıklama</th><th className="p-4">Tedarikçi</th><th className="p-4">Kategori</th><th className="p-4">Tutar</th><th className="p-4 text-right">Eylemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenseInvoices.map(inv => (
                                    <tr key={inv.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                        <td className="p-4 text-slate-400">{new Date(inv.date).toLocaleDateString('tr-TR')}</td>
                                        <td className="p-4 font-semibold">{inv.description}</td>
                                        <td className="p-4 text-slate-300">{inv.vendor}</td>
                                        <td className="p-4 text-slate-400">{inv.category}</td>
                                        <td className="p-4 font-bold text-red-400">{currencyFormatter.format(inv.amount)}</td>
                                        <td className="p-4 text-right"><div className="flex justify-end space-x-4"><button onClick={() => setExpenseModal({ type: 'preview', data: inv })} className="text-slate-400 hover:text-white" title="Görseli Görüntüle"><EyeIcon /></button><button onClick={() => setExpenseModal({ type: 'edit', data: inv })} className="text-slate-400 hover:text-white" title="Düzenle"><PencilIcon /></button><button onClick={() => setExpenseModal({ type: 'delete', data: inv })} className="text-slate-400 hover:text-red-400" title="Sil"><TrashIcon /></button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         {filteredExpenseInvoices.length === 0 && <p className="text-center p-8 text-slate-500">Gider faturası bulunamadı.</p>}
                    </div>
                </>
            )}

            {modal.type === 'edit' && <InvoiceModal invoice={modal.data} customers={customers} quotes={quotes} onClose={() => setModal({type: null, data: null})} onSave={handleSave} />}
            {modal.type === 'delete' && <DeleteConfirmModal item={modal.data} onCancel={() => setModal({type:null, data:null})} onConfirm={handleDelete} />}
            {modal.type === 'preview' && <PreviewModal invoice={modal.data} onStatusUpdate={handleStatusUpdate} onClose={() => setModal({type:null, data:null})} />}
            {modal.type === 'ai-reminder' && <AiReminderModal data={modal.data} onClose={() => setModal({type:null, data:null})} />}
            {expenseModal.type === 'edit' && <ExpenseInvoiceModal expense={expenseModal.data} onClose={() => setExpenseModal({type: null, data: null})} onSave={handleSaveExpense} />}
            {expenseModal.type === 'preview' && <ExpensePreviewModal expense={expenseModal.data} onClose={() => setExpenseModal({ type: null, data: null })} />}
            {expenseModal.type === 'delete' && <ExpenseDeleteConfirmModal item={expenseModal.data} onCancel={() => setExpenseModal({type: null, data: null})} onConfirm={handleDeleteExpense} />}
        </div>
    );
};

// --- MODAL SUB-COMPONENTS ---
const InvoiceModal: React.FC<{
    invoice: Partial<Invoice> | null;
    customers: Customer[];
    quotes: Quote[];
    onClose: () => void;
    onSave: (data: any) => void;
}> = ({ invoice, customers, quotes, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Invoice>>({
        id: invoice?.id, invoiceNumber: invoice?.invoiceNumber || `F-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`, clientId: invoice?.clientId || '', clientName: invoice?.clientName || '', clientCompany: invoice?.clientCompany || '', quoteId: invoice?.quoteId || '', issueDate: invoice?.issueDate?.split('T')[0] || new Date().toISOString().split('T')[0], dueDate: invoice?.dueDate?.split('T')[0] || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0], items: invoice?.items || [{ id: `li-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }], notes: invoice?.notes || 'Ödeme 15 gün içinde yapılmalıdır.', status: invoice?.status || 'Taslak', discount: invoice?.discount || 0, tax: invoice?.tax || 20, amountPaid: invoice?.amountPaid || 0, isRecurring: invoice?.isRecurring || false, recurrenceFrequency: invoice?.recurrenceFrequency || 'Aylık', invoiceImage: invoice?.invoiceImage || '',
    });

    const totals = useMemo(() => {
        const subtotal = formData.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0;
        const total = (subtotal - (formData.discount || 0)) * (1 + (formData.tax || 0) / 100);
        return { subtotal, total };
    }, [formData.items, formData.discount, formData.tax]);

    const handleItemChange = (id: string, field: keyof LineItem, value: any) => setFormData(prev => ({ ...prev, items: prev.items?.map(item => item.id === id ? { ...item, [field]: value } : item) }));
    const handleAddItem = () => setFormData(prev => ({ ...prev, items: [...(prev.items || []), { id: `li-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }] }));
    const handleRemoveItem = (id: string) => setFormData(prev => ({ ...prev, items: prev.items?.filter(item => item.id !== id) }));
    
    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCustomer = customers.find(c => c.id === e.target.value);
        setFormData(prev => ({ ...prev, clientId: e.target.value, clientName: selectedCustomer?.name || '', clientCompany: selectedCustomer?.company || '' }));
    };

    const handleQuoteImport = (quoteId: string) => {
        const selectedQuote = quotes.find(q => q.id === quoteId);
        // FIX: The 'Quote' type does not have a 'notes' property.
        // Using 'closingText' as the most appropriate field to transfer to invoice notes.
        if (selectedQuote) setFormData(prev => ({ ...prev, quoteId: selectedQuote.id, clientId: selectedQuote.clientId, clientName: selectedQuote.clientName, clientCompany: selectedQuote.clientCompany, items: selectedQuote.items, discount: selectedQuote.discount, tax: selectedQuote.tax, notes: selectedQuote.closingText }));
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => setFormData(prev => ({ ...prev, invoiceImage: loadEvent.target?.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...formData, subtotal: totals.subtotal, total: totals.total }); };

    return (
         <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">{invoice?.id ? 'Faturayı Düzenle' : 'Yeni Fatura Oluştur'}</h2>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm">Müşteri (CRM'den)</label>
                            <select value={formData.clientId} onChange={handleClientChange} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option value="">Müşteri Seç</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                        </div>
                        <div>
                            <label className="text-sm">Tekliften Aktar</label>
                            <select onChange={e => handleQuoteImport(e.target.value)} disabled={!formData.clientId} className="w-full bg-slate-700 p-2 rounded-md mt-1 disabled:opacity-50 disabled:cursor-not-allowed"><option value="">Teklif Seç</option>{quotes.filter(q => q.clientId === formData.clientId).map(q => <option key={q.id} value={q.id}>{q.quoteNumber}</option>)}</select>
                        </div>
                        <div><label className="text-sm">Fatura Tarihi</label><input type="date" name="issueDate" value={formData.issueDate} onChange={e => setFormData(p=>({...p, issueDate: e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">Müşteri Adı (Manuel Giriş)</label>
                            <input type="text" value={formData.clientName} onChange={e => setFormData(p=>({...p, clientName: e.target.value, clientId: ''}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/>
                        </div>
                        <div>
                            <label className="text-sm">Firma Adı (Manuel Giriş)</label>
                            <input type="text" value={formData.clientCompany} onChange={e => setFormData(p=>({...p, clientCompany: e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                        </div>
                    </div>
                    {/* Items, totals etc */}
                    <div className="space-y-2 pt-4"> {formData.items?.map((item) => ( <div key={item.id} className="flex items-center gap-2"><input type="text" placeholder="Açıklama" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} className="w-1/2 bg-slate-700 p-2 rounded-md"/><input type="number" placeholder="Miktar" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} className="w-1/6 bg-slate-700 p-2 rounded-md"/><input type="number" placeholder="Birim Fiyat" value={item.unitPrice} onChange={e => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))} className="w-1/6 bg-slate-700 p-2 rounded-md"/><span className="w-1/6 text-right font-semibold">{currencyFormatter.format(item.quantity * item.unitPrice)}</span><button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon/></button></div> ))} </div>
                    <button type="button" onClick={handleAddItem} className="text-sm text-blue-400 font-semibold">+ Kalem Ekle</button>
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                        <div className="space-y-4">
                            <div> <label className="text-sm">Notlar & Şartlar</label> <textarea name="notes" value={formData.notes} onChange={e => setFormData(p=>({...p, notes: e.target.value}))} rows={2} className="w-full bg-slate-700 p-2 rounded-md mt-1"></textarea> </div>
                            <div> <label className="text-sm">Fatura Görseli Yükle</label> <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/> {formData.invoiceImage && <div className="mt-2"><img src={formData.invoiceImage} alt="Önizleme" className="max-h-20 rounded"/><button type="button" onClick={()=>setFormData(p=>({...p, invoiceImage: ''}))} className="text-xs text-red-400">Kaldır</button></div>} </div>
                            <div className="flex items-center"><input type="checkbox" id="isRecurring" name="isRecurring" checked={formData.isRecurring} onChange={e => setFormData(p=>({...p, isRecurring: e.target.checked}))} className="h-4 w-4 rounded bg-slate-600"/><label htmlFor="isRecurring" className="ml-2 text-sm">Yinelenen Fatura</label></div>
                            {formData.isRecurring && (<select name="recurrenceFrequency" value={formData.recurrenceFrequency} onChange={e => setFormData(p=>({...p, recurrenceFrequency: e.target.value as any}))} className="w-full bg-slate-700 p-2 rounded-md mt-1"><option>Aylık</option><option>3 Aylık</option><option>Yıllık</option></select>)}
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-slate-400">Ara Toplam:</span><span className="font-semibold">{currencyFormatter.format(totals.subtotal)}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">İndirim (₺):</span><input type="number" name="discount" value={formData.discount} onChange={e => setFormData(p=>({...p, discount: parseFloat(e.target.value) || 0}))} className="w-24 bg-slate-700 p-1 rounded-md text-right"/></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">KDV (%):</span><input type="number" name="tax" value={formData.tax} onChange={e => setFormData(p=>({...p, tax: parseFloat(e.target.value) || 0}))} className="w-24 bg-slate-700 p-1 rounded-md text-right"/></div>
                            <div className="flex justify-between font-bold text-xl pt-2 border-t border-slate-600 mt-2"><span className="text-white">Genel Toplam:</span><span className="text-blue-400">{currencyFormatter.format(totals.total)}</span></div>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-600 mt-2"><span className="text-slate-400">Ödenen Tutar:</span><input type="number" name="amountPaid" value={formData.amountPaid} onChange={e => setFormData(p=>({...p, amountPaid: parseFloat(e.target.value) || 0}))} className="w-24 bg-slate-700 p-1 rounded-md text-right"/></div>
                        </div>
                    </div>
                </form>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-700 flex-shrink-0">
                    <div>
                        <label className="text-sm">Durum</label>
                        <select value={formData.status} onChange={e => setFormData(p=>({...p, status: e.target.value as InvoiceStatus}))} className="w-full bg-slate-700 p-2 rounded-md mt-1">
                            <option>Taslak</option><option>Gönderildi</option><option>Ödendi</option><option>Gecikti</option><option>İptal Edildi</option>
                        </select>
                    </div>
                    <div className="flex gap-4"><button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button><button type="button" onClick={handleSubmit} className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button></div>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{ item: Invoice; onCancel: () => void; onConfirm: () => void; }> = ({ item, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"><div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in"><h3 className="text-lg font-bold text-white mt-4">Faturayı Sil?</h3><p className="text-sm text-slate-400 mt-2">"{item.invoiceNumber}" numaralı faturayı silmek istediğinizden emin misiniz?</p><div className="flex justify-center space-x-4 mt-6"><button onClick={onCancel} className="bg-slate-600 font-semibold py-2 px-5 rounded-lg">İptal</button><button onClick={onConfirm} className="bg-red-600 font-semibold py-2 px-5 rounded-lg">Evet, Sil</button></div></div></div>
);

const PreviewModal: React.FC<{ invoice: Invoice; onStatusUpdate: (id: string, status: InvoiceStatus) => void; onClose: () => void; }> = ({ invoice, onStatusUpdate, onClose }) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const handleDownloadPdf = () => { if (previewRef.current) { html2canvas(previewRef.current, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => { const imgData = canvas.toDataURL('image/png'); const pdf = new jsPDF('p', 'mm', 'a4'); const pdfWidth = pdf.internal.pageSize.getWidth(); const pdfHeight = pdf.internal.pageSize.getHeight(); const imgWidth = canvas.width; const imgHeight = canvas.height; const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight); const imgX = (pdfWidth - imgWidth * ratio) / 2; const imgY = 0; pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio); pdf.save(`${invoice.invoiceNumber}.pdf`); }); } };
    const handlePrint = () => { const printContents = previewRef.current?.innerHTML; if(printContents) { document.body.innerHTML = `<div class="invoice-preview-area">${printContents}</div>`; window.print(); window.location.reload(); } };
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"><div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6 animate-scale-in"><div className="flex-shrink-0 flex justify-between items-center mb-4 no-print"><h3 className="text-xl font-bold text-white">Fatura Önizleme: {invoice.invoiceNumber}</h3><div className="flex gap-2">{invoice.status === 'Gönderildi' && <button onClick={() => onStatusUpdate(invoice.id, 'Ödendi')} className="bg-green-600 px-3 py-2 text-sm rounded-md font-semibold">Ödendi Olarak İşaretle</button>}<button onClick={handleDownloadPdf} className="bg-red-600 px-3 py-2 text-sm rounded-md font-semibold flex items-center gap-2"><PdfIcon/> PDF</button><button onClick={handlePrint} className="bg-gray-600 px-3 py-2 text-sm rounded-md font-semibold flex items-center gap-2"><PrintIcon/> Yazdır</button><button onClick={onClose} className="text-slate-400 hover:text-white text-2xl font-light">&times;</button></div></div><div className="flex-grow overflow-y-auto bg-gray-300 p-4 rounded-md"><div ref={previewRef} className="bg-white text-black p-10 w-full max-w-3xl mx-auto printable-area invoice-preview-area"><div className="flex justify-between items-start border-b pb-4"><h1 className="text-3xl font-bold text-gray-800">MORTANAS</h1><div className="text-right"><h2 className="text-3xl font-bold text-gray-500 uppercase">FATURA</h2><p><strong>No:</strong> {invoice.invoiceNumber}</p><p><strong>Tarih:</strong> {new Date(invoice.issueDate).toLocaleDateString('tr-TR')}</p></div></div><div className="flex justify-between mt-8"><div><p className="font-bold text-gray-500">FATURA BİLGİLERİ</p><p className="font-bold">{invoice.clientName}</p><p>{invoice.clientCompany}</p></div><div className="text-right"><p><strong className="text-gray-500">Vade Tarihi:</strong> {new Date(invoice.dueDate).toLocaleDateString('tr-TR')}</p></div></div><table className="w-full mt-8 text-left"><thead><tr className="bg-gray-100 text-gray-600"><th className="p-2">Açıklama</th><th className="p-2 text-center">Miktar</th><th className="p-2 text-right">Birim Fiyat</th><th className="p-2 text-right">Toplam</th></tr></thead><tbody>{invoice.items.map(item => (<tr key={item.id} className="border-b"><td className="p-2">{item.description}</td><td className="p-2 text-center">{item.quantity}</td><td className="p-2 text-right">{currencyFormatter.format(item.unitPrice)}</td><td className="p-2 text-right">{currencyFormatter.format(item.quantity * item.unitPrice)}</td></tr>))}</tbody></table><div className="flex justify-end mt-8"><div className="w-1/2"><div className="flex justify-between text-gray-700"><p>Ara Toplam:</p><p>{currencyFormatter.format(invoice.subtotal)}</p></div>{invoice.discount > 0 && <div className="flex justify-between text-gray-700"><p>İndirim:</p><p>-{currencyFormatter.format(invoice.discount)}</p></div>}<div className="flex justify-between text-gray-700"><p>KDV (%{invoice.tax}):</p><p>{currencyFormatter.format((invoice.subtotal - invoice.discount) * (invoice.tax/100))}</p></div><div className="flex justify-between font-bold text-xl mt-2 border-t pt-2"><p>GENEL TOPLAM:</p><p>{currencyFormatter.format(invoice.total)}</p></div></div></div>{invoice.invoiceImage && <div className="mt-8 pt-4 border-t"><p className="font-bold text-sm text-gray-500 mb-2">Ekli Belge:</p><a href={invoice.invoiceImage} target="_blank" rel="noopener noreferrer"><img src={invoice.invoiceImage} alt="Fatura Görseli" className="max-w-xs border rounded"/></a></div>}<div className="mt-8 pt-4 border-t text-sm text-gray-500"><p className="font-bold mb-2">Notlar:</p><p>{invoice.notes}</p></div></div></div></div></div>
    );
};

const AiReminderModal: React.FC<{ data: { content: string; isLoading: boolean; }; onClose: () => void; }> = ({ data, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"><div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in"><h3 className="text-xl font-bold text-white mb-4 flex items-center"><AiIcon className="text-purple-400 mr-3"/> AI Hatırlatma E-postası</h3><div className="bg-slate-900 rounded-md p-4 text-slate-300 text-sm min-h-[250px] whitespace-pre-wrap overflow-y-auto">{data.isLoading ? 'Oluşturuluyor...' : data.content}</div><div className="text-right mt-4 flex gap-3 justify-end"><button onClick={() => navigator.clipboard.writeText(data.content)} className="bg-gray-600 font-semibold py-2 px-4 rounded-md">Metni Kopyala</button><button onClick={onClose} className="bg-blue-600 font-semibold py-2 px-5 rounded-lg">Kapat</button></div></div></div>
);

const ExpenseInvoiceModal: React.FC<{ expense: Partial<ExpenseInvoice> | null; onClose: () => void; onSave: (data: any) => void;}> = ({ expense, onClose, onSave }) => {
    const [formData, setFormData] = useState({ id: expense?.id, description: expense?.description || '', vendor: expense?.vendor || '', amount: expense?.amount || 0, date: expense?.date || new Date().toISOString().split('T')[0], category: expense?.category || '', invoiceImage: expense?.invoiceImage || '' });
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = (loadEvent) => setFormData(prev => ({ ...prev, invoiceImage: loadEvent.target?.result as string })); reader.readAsDataURL(file); } };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if(!formData.invoiceImage) { alert("Lütfen fatura görseli yükleyin."); return; } onSave(formData); };
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6">{expense?.id ? 'Gider Faturasını Düzenle' : 'Yeni Gider Faturası Ekle'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="text-sm">Açıklama</label><input type="text" value={formData.description} onChange={e=>setFormData(p=>({...p, description:e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Tedarikçi Firma</label><input type="text" value={formData.vendor} onChange={e=>setFormData(p=>({...p, vendor:e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Kategori</label><input type="text" value={formData.category} onChange={e=>setFormData(p=>({...p, category:e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm">Tutar (₺)</label><input type="number" value={formData.amount} onChange={e=>setFormData(p=>({...p, amount:parseFloat(e.target.value) || 0}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                        <div><label className="text-sm">Fatura Tarihi</label><input type="date" value={formData.date} onChange={e=>setFormData(p=>({...p, date:e.target.value}))} className="w-full bg-slate-700 p-2 rounded-md mt-1" required/></div>
                    </div>
                    <div><label className="text-sm">Fatura Görseli</label><input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required={!formData.invoiceImage}/>{formData.invoiceImage && <div className="mt-2"><img src={formData.invoiceImage} alt="Önizleme" className="max-h-24 rounded"/><button type="button" onClick={()=>setFormData(p=>({...p, invoiceImage: ''}))} className="text-xs text-red-400">Kaldır</button></div>}</div>
                    <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 rounded-md font-semibold">İptal</button><button type="submit" className="bg-blue-600 py-2 px-4 rounded-md font-semibold">Kaydet</button></div>
                </form>
            </div>
        </div>
    );
};

const ExpensePreviewModal: React.FC<{ expense: ExpenseInvoice; onClose: () => void; }> = ({ expense, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-white mb-4">Gider Faturası: {expense.description}</h3>
            <div className="bg-slate-900 rounded-md p-4 max-h-[70vh] overflow-y-auto">
                <img src={expense.invoiceImage} alt="Fatura Görseli" className="w-full h-auto rounded-md"/>
            </div>
            <div className="text-right mt-4"><button onClick={onClose} className="bg-blue-600 font-semibold py-2 px-5 rounded-lg">Kapat</button></div>
        </div>
    </div>
);

const ExpenseDeleteConfirmModal: React.FC<{ item: ExpenseInvoice; onCancel: () => void; onConfirm: () => void; }> = ({ item, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"><div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in"><h3 className="text-lg font-bold text-white mt-4">Gider Faturasını Sil?</h3><p className="text-sm text-slate-400 mt-2">"{item.description}" adlı gideri silmek istediğinizden emin misiniz?</p><div className="flex justify-center space-x-4 mt-6"><button onClick={onCancel} className="bg-slate-600 font-semibold py-2 px-5 rounded-lg">İptal</button><button onClick={onConfirm} className="bg-red-600 font-semibold py-2 px-5 rounded-lg">Evet, Sil</button></div></div></div>
);

export default AdminFaturaYonetimiPage;