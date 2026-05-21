import React, { useState } from 'react';
import type { Talep } from '../types';

interface UcretsizDeneModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TALEPLER_STORAGE_KEY = 'mortanasTalepler';

const UcretsizDeneModal: React.FC<UcretsizDeneModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        website: '',
        helpTopic: 'Bilmiyorum' as Talep['helpTopic'],
        employeeCount: '',
        phone: '',
        notes: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleHelpTopicChange = (topic: Talep['helpTopic']) => {
        setFormData(prev => ({ ...prev, helpTopic: topic }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (parseInt(formData.employeeCount) < 5) {
            setError('Minimum 5 personel koşulu bulunmaktadır.');
            return;
        }
        
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newTalep: Talep = {
                id: `talep-${Date.now()}`,
                ...formData,
                employeeCount: formData.employeeCount,
                submittedAt: new Date().toISOString(),
                status: 'Yeni'
            };

            try {
                const existingTaleplerRaw = localStorage.getItem(TALEPLER_STORAGE_KEY);
                const existingTalepler: Talep[] = existingTaleplerRaw ? JSON.parse(existingTaleplerRaw) : [];
                const updatedTalepler = [newTalep, ...existingTalepler];
                localStorage.setItem(TALEPLER_STORAGE_KEY, JSON.stringify(updatedTalepler));
                setIsSuccess(true);
            } catch (err) {
                console.error("Talep kaydedilemedi:", err);
                setError('Talebiniz kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300" role="dialog" aria-modal="true">
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700 animate-scale-in">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white">{isSuccess ? 'Teşekkür Ederiz!' : 'İşletmenize Özel Yapay Zeka Çözümleri'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl font-light">&times;</button>
                </div>
                
                {isSuccess ? (
                    <div className="p-10 text-center flex-grow flex flex-col justify-center items-center">
                        <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6">
                            <i className="fas fa-check-circle text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white">Talebiniz Başarıyla Alındı!</h3>
                        <p className="mt-2 text-slate-300">Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                        <button onClick={onClose} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                            Kapat
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Merhaba! İsminizi öğrenebilir miyim?</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600 focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">İşletmenizin veya markanızın adı nedir?</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Web siteniz nedir?</label>
                                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600" required />
                            </div>
                        </div>

                         <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-300">Sizlere nasıl yardımcı olabiliriz?</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {(['Bilmiyorum', 'Müşteri hizmetleri', 'İçerik üretimi', 'Otomasyonlar', 'Diğer'] as Talep['helpTopic'][]).map(topic => (
                                    <button type="button" key={topic} onClick={() => handleHelpTopicChange(topic)} className={`p-3 text-sm rounded-md font-semibold transition-all duration-200 border-2 ${formData.helpTopic === topic ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'}`}>
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">İşletmenizde kaç kişi çalışıyor?</label>
                                <input type="number" name="employeeCount" value={formData.employeeCount} onChange={handleChange} min="1" className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600" required />
                                <p className="text-xs text-slate-500">Minimum 5 personel koşulu bulunmaktadır.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Telefon numaranızı paylaşabilir misiniz?</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Ek olarak belirtmek istediğiniz bir şey var mı?</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-slate-700 p-3 rounded-md text-white border border-slate-600"></textarea>
                        </div>
                        
                        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-md">{error}</p>}
                        
                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                                {isLoading ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UcretsizDeneModal;