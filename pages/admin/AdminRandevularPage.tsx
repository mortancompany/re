import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI } from '@google/genai';
import type { Appointment, AppointmentStatus } from '../../types';

// --- PERSISTENCE & MOCK DATA ---
const APPOINTMENTS_STORAGE_KEY = 'mortanasAppointments';

const getFutureDate = (daysToAdd: number) => new Date(Date.now() + daysToAdd * 86400000).toISOString().split('T')[0];
const getPastDate = (daysToSubtract: number) => new Date(Date.now() - daysToSubtract * 86400000).toISOString().split('T')[0];
const getTodayDate = () => new Date().toISOString().split('T')[0];

const mockAppointments: Appointment[] = [
    { id: 1, clientName: 'Ahmet Yılmaz', date: getTodayDate(), time: '10:00', service: 'Yeni Proje Teklifi', status: 'Yaklaşan', isConfirmed: true, aiBriefing: 'Ahmet Bey ile yapılacak toplantı, yeni web sitesi projesinin detaylarını ve bütçesini görüşmek üzerinedir. Potansiyel konuşma konuları: Proje takvimi, beklentiler ve ödeme koşulları. Müşterinin daha önceki projelerini inceleyip hazırlıklı olmak faydalı olacaktır.', reminderSent: true },
    { id: 2, clientName: 'Ayşe Kaya', date: getTodayDate(), time: '14:30', service: 'CRM Demo Sunumu', status: 'Yaklaşan', isConfirmed: false, reminderSent: false },
    { id: 3, clientName: 'Mehmet Öztürk', date: getFutureDate(2), time: '11:00', service: 'Entegrasyon Toplantısı', status: 'Yaklaşan', isConfirmed: true, reminderSent: false },
    { id: 4, clientName: 'Fatma Demir', date: getPastDate(2), time: '16:00', service: 'Yapay Zeka Danışmanlığı', status: 'Tamamlandı', isConfirmed: true, reminderSent: true },
    { id: 5, clientName: 'Can Tekin', date: getPastDate(5), time: '09:30', service: 'İlk Tanışma Toplantısı', status: 'İptal Edildi', isConfirmed: false, reminderSent: false },
    { id: 6, clientName: 'Zeynep Arslan', date: getPastDate(10), time: '13:00', service: 'Proje Gözden Geçirme', status: 'Tamamlandı', isConfirmed: true, reminderSent: true },
    { id: 7, clientName: 'Ozan Kurt', date: getFutureDate(5), time: '15:00', service: 'Sosyal Medya Stratejisi', status: 'Yaklaşan', isConfirmed: false, reminderSent: false },
    { id: 8, clientName: 'Ahmet Yılmaz', date: getPastDate(20), time: '14:00', service: 'Proje Başlangıç Toplantısı', status: 'Tamamlandı', isConfirmed: true, reminderSent: true },
];

const getInitialAppointments = (): Appointment[] => {
    try {
        const storedAppointments = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
        if (storedAppointments) {
            return JSON.parse(storedAppointments);
        } else {
            localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(mockAppointments));
            return mockAppointments;
        }
    } catch (error) {
        console.error("Failed to retrieve appointments from localStorage", error);
        return mockAppointments;
    }
};

const saveAppointments = (appointments: Appointment[]): void => {
    try {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
        console.error("Failed to save appointments to localStorage", error);
    }
};

// --- UI ICONS ---
const LightbulbIcon = () => <i className="fas fa-lightbulb"></i>;
const EditIcon = () => <i className="fas fa-pencil"></i>;
const DeleteIcon = () => <i className="fas fa-trash-can"></i>;
const PaperPlaneIcon = () => <i className="fas fa-paper-plane"></i>;
const HistoryIcon = () => <i className="fas fa-history"></i>;
const CheckBadgeIcon: React.FC<{isConfirmed: boolean}> = ({isConfirmed}) => <i className={`fas fa-check-circle ${isConfirmed ? 'text-green-400' : 'text-slate-600'}`}></i>;
const ExclamationTriangleIcon = () => <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>;

// --- MAIN COMPONENT ---
const AdminRandevularPage: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [appointments, setAppointments] = useState<Appointment[]>(getInitialAppointments);
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    
    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    // Data for Modals
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
    const [deletingAppointmentIds, setDeletingAppointmentIds] = useState<number[] | null>(null);
    const [briefingData, setBriefingData] = useState<{ appointment: Appointment | null, content: string | null, isLoading: boolean }>({ appointment: null, content: null, isLoading: false });
    const [historyClientName, setHistoryClientName] = useState<string | null>(null);

    // Filters & Search
    const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Bulk Actions
    const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<number[]>([]);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // UI State
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const location = useLocation();

    // --- HOOKS ---
     useEffect(() => {
        saveAppointments(appointments);
    }, [appointments]);

    useEffect(() => {
        if (location.state?.action === 'add_new') {
            handleOpenModal();
            window.history.replaceState({}, document.title)
        }
    }, [location.state]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const filteredAppointments = useMemo(() => {
        return appointments
            .filter(app => statusFilter === 'all' || app.status === statusFilter)
            .filter(app => 
                app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                app.service.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [appointments, statusFilter, searchTerm]);

    useEffect(() => {
        setSelectedAppointmentIds([]);
    }, [view, statusFilter, searchTerm]);

    const stats = useMemo(() => {
        const upcoming = appointments.filter(a => new Date(a.date) >= new Date(getTodayDate()) && a.status === 'Yaklaşan');
        const todayApps = upcoming.filter(a => a.date === getTodayDate());
        const confirmedCount = upcoming.filter(a => a.isConfirmed).length;
        const confirmationRate = upcoming.length > 0 ? Math.round((confirmedCount / upcoming.length) * 100) : 0;
        return { totalUpcoming: upcoming.length, todayCount: todayApps.length, confirmationRate };
    }, [appointments]);

    // --- HANDLER FUNCTIONS ---
    const handleOpenModal = (appointment: Appointment | null = null) => {
        setEditingAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleSaveAppointment = (data: Omit<Appointment, 'id'> & { id?: number }) => {
        if (data.id) {
            setAppointments(apps => apps.map(app => app.id === data.id ? { ...app, ...data } as Appointment : app));
            setToastMessage("Randevu başarıyla güncellendi.");
        } else {
            const newId = Math.max(0, ...appointments.map(a => a.id)) + 1;
            setAppointments(apps => [...apps, { id: newId, ...data as Omit<Appointment, 'id'>, reminderSent: false } as Appointment]);
            setToastMessage("Yeni randevu başarıyla eklendi.");
        }
        setIsModalOpen(false);
        setEditingAppointment(null);
    };
    
    const handleDeleteAppointment = () => {
        if (deletingAppointmentIds) {
            setAppointments(apps => apps.filter(app => !deletingAppointmentIds.includes(app.id)));
            setToastMessage(`${deletingAppointmentIds.length} randevu silindi.`);
            setIsDeleteModalOpen(false);
            setDeletingAppointmentIds(null);
            setSelectedAppointmentIds([]);
        }
    };
    
    const handleToggleConfirm = (id: number) => {
        setAppointments(apps => apps.map(app => app.id === id ? { ...app, isConfirmed: !app.isConfirmed } : app));
    };

    const handleGenerateBriefing = async (appointment: Appointment) => {
        setBriefingData({ appointment, content: null, isLoading: true });
        setIsBriefingModalOpen(true);
        if (appointment.aiBriefing) {
            setBriefingData({ appointment, content: appointment.aiBriefing, isLoading: false });
            return;
        }
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `"${appointment.clientName}" adlı müşteri ile "${appointment.service}" konusunda ${appointment.date} tarihinde saat ${appointment.time}'da yapılacak toplantı için kısa bir hazırlık özeti oluştur. Özet, toplantının amacını, potansiyel konuşma konularını ve müşteriye özel notları içermelidir.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const briefingText = response.text;
            setAppointments(apps => apps.map(app => app.id === appointment.id ? { ...app, aiBriefing: briefingText } : app));
            setBriefingData({ appointment, content: briefingText, isLoading: false });
        } catch (error) {
            console.error("Gemini Briefing Error:", error);
            setBriefingData({ appointment, content: "Özet oluşturulurken bir hata oluştu.", isLoading: false });
        }
    };

    const handleSendReminder = (id: number) => {
        const appointment = appointments.find(a => a.id === id);
        if (appointment) {
            setAppointments(apps => apps.map(app => app.id === id ? { ...app, reminderSent: true } : app));
            setToastMessage(`Hatırlatma "${appointment.clientName}" kişisine gönderildi.`);
        }
    };

    const handleShowHistory = (clientName: string) => {
        setHistoryClientName(clientName);
        setIsHistoryModalOpen(true);
    };

    // --- BULK ACTION HANDLERS ---
    const handleSelectOne = (id: number) => {
        setSelectedAppointmentIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedAppointmentIds(filteredAppointments.map(a => a.id));
        } else {
            setSelectedAppointmentIds([]);
        }
    };

    const handleBulkConfirm = () => {
        setAppointments(apps => apps.map(app => 
            selectedAppointmentIds.includes(app.id) ? { ...app, isConfirmed: true } : app
        ));
        setToastMessage(`${selectedAppointmentIds.length} randevu onaylandı.`);
        setSelectedAppointmentIds([]);
    };

    // --- RENDER ---
    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto animate-fade-in">
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
                input[type="date"]::-webkit-calendar-picker-indicator,
                input[type="time"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    filter: invert(0.6) brightness(1.5);
                }
                .animate-toast-in-out { animation: toast-in 0.5s ease-out forwards, toast-out 0.5s 2.5s ease-in forwards; }
                @keyframes toast-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes toast-out { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(20px); } }
                
                /* New Calendar Styles */
                .day-cell { position: relative; transition: background-color 0.2s ease-out; }
                .appointment-badge {
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #3b82f6; /* blue-500 */
                    color: white;
                    font-size: 11px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #1f2937; /* slate-800 */
                }
                .day-today { background-color: #3b82f6 !important; color: white; }
                .day-selected { background-color: #4338ca !important; color: white; border-color: #a78bfa !important; }
            `}</style>

            <AdminHeader title="Randevular" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon="fa-calendar-alt" title="Yaklaşan Toplam Randevu" value={stats.totalUpcoming.toString()} color="text-blue-400" />
                <StatCard icon="fa-calendar-day" title="Bugünkü Randevu Sayısı" value={stats.todayCount.toString()} color="text-purple-400" />
                <StatCard icon="fa-check-double" title="Onaylanma Oranı" value={`%${stats.confirmationRate}`} color="text-green-400" />
            </div>

            <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="bg-slate-800 p-1 rounded-md flex items-center">
                        <button onClick={() => setView('calendar')} className={`px-3 py-1 text-sm font-semibold rounded ${view === 'calendar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>Takvim</button>
                        <button onClick={() => setView('list')} className={`px-3 py-1 text-sm font-semibold rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>Liste</button>
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-white focus:ring-blue-500 focus:border-blue-500">
                        <option value="all">Tüm Durumlar</option>
                        <option value="Yaklaşan">Yaklaşan</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                        <option value="İptal Edildi">İptal Edildi</option>
                    </select>
                    <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                        <input type="text" placeholder="Müşteri veya hizmet ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-md p-2 pl-9 text-sm text-white focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64" />
                    </div>
                </div>
                <div>
                     <button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                        <i className="fas fa-plus"></i> Ekle
                    </button>
                </div>
            </div>

            {selectedAppointmentIds.length > 0 && view === 'list' && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg flex items-center gap-4 animate-fade-in">
                    <span className="text-sm font-semibold">{selectedAppointmentIds.length} randevu seçildi</span>
                    <button onClick={handleBulkConfirm} className="text-sm font-semibold flex items-center gap-2 text-slate-300 hover:text-white"><i className="fas fa-check-double"></i> Onayla</button>
                    <button onClick={() => { setDeletingAppointmentIds(selectedAppointmentIds); setIsDeleteModalOpen(true); }} className="text-sm font-semibold flex items-center gap-2 text-red-400 hover:text-red-300"><DeleteIcon /> Sil</button>
                    <button onClick={() => setSelectedAppointmentIds([])} className="text-sm font-semibold ml-auto text-slate-400 hover:text-white">Temizle</button>
                </div>
            )}

            <div className="mt-6">
                {view === 'calendar' ? (
                    <CalendarView 
                        appointments={filteredAppointments} 
                        currentDate={currentDate} setCurrentDate={setCurrentDate}
                        selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                        onEdit={handleOpenModal} onDelete={(id) => { setDeletingAppointmentIds([id]); setIsDeleteModalOpen(true); }}
                        onGenerateBriefing={handleGenerateBriefing} onToggleConfirm={handleToggleConfirm}
                        onSendReminder={handleSendReminder} onShowHistory={handleShowHistory}
                    />
                ) : (
                    <ListView
                        appointments={filteredAppointments}
                        selectedIds={selectedAppointmentIds} onSelectOne={handleSelectOne} onSelectAll={handleSelectAll}
                        onEdit={handleOpenModal} onDelete={(id) => { setDeletingAppointmentIds([id]); setIsDeleteModalOpen(true); }}
                        onGenerateBriefing={handleGenerateBriefing} onToggleConfirm={handleToggleConfirm}
                        onSendReminder={handleSendReminder} onShowHistory={handleShowHistory}
                    />
                )}
            </div>
            
            {/* Modals & Toasts */}
            {isModalOpen && <AppointmentModal appointment={editingAppointment} onClose={() => setIsModalOpen(false)} onSave={handleSaveAppointment} />}
            {isDeleteModalOpen && <DeleteConfirmModal onCancel={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteAppointment} count={deletingAppointmentIds?.length || 0} />}
            {isBriefingModalOpen && <AiBriefingModal data={briefingData} onClose={() => setIsBriefingModalOpen(false)} />}
            {isHistoryModalOpen && <ClientHistoryModal clientName={historyClientName} allAppointments={appointments} onClose={() => setIsHistoryModalOpen(false)} />}
            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
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

const CalendarView: React.FC<{
    appointments: Appointment[]; currentDate: Date; setCurrentDate: (date: Date) => void;
    selectedDate: Date; setSelectedDate: (date: Date) => void;
    onEdit: (app: Appointment) => void; onDelete: (id: number) => void; onGenerateBriefing: (app: Appointment) => void;
    onToggleConfirm: (id: number) => void; onSendReminder: (id: number) => void; onShowHistory: (clientName: string) => void;
}> = ({ appointments, currentDate, setCurrentDate, selectedDate, setSelectedDate, ...cardActions }) => {
    
    const MONTH_NAMES = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const DAY_NAMES = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };
    
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    }

    const calendarDays = useMemo(() => {
        const days = [];
        const startingDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Adjust to Monday start
        for (let i = 0; i < startingDay; i++) { days.push({ key: `pad-start-${i}`, isEmpty: true }); }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const appsForDay = appointments.filter(a => a.date === dateString);
            days.push({ key: dateString, day, date, appointments: appsForDay });
        }
        return days;
    }, [currentDate, appointments, firstDayOfMonth, daysInMonth]);

    const selectedDayAppointments = useMemo(() => {
        const dateString = selectedDate.toISOString().split('T')[0];
        return appointments.filter(a => a.date === dateString).sort((a,b) => a.time.localeCompare(b.time));
    }, [selectedDate, appointments]);
    
    const todayAppointments = useMemo(() => {
        const dateString = getTodayDate();
        return appointments.filter(a => a.date === dateString).sort((a,b) => a.time.localeCompare(b.time));
    }, [appointments]);

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{`${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
                    <div className="flex space-x-2">
                        <button onClick={goToToday} className="px-3 py-1 text-sm rounded-md border border-slate-600 hover:bg-slate-700">Bugün</button>
                        <button onClick={() => changeMonth(-1)} className="w-8 h-8 rounded-md hover:bg-slate-700"><i className="fas fa-chevron-left"></i></button>
                        <button onClick={() => changeMonth(1)} className="w-8 h-8 rounded-md hover:bg-slate-700"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-2">
                    {DAY_NAMES.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((dayInfo) => {
                        if (dayInfo.isEmpty) return <div key={dayInfo.key}></div>;
                        const isSelected = dayInfo.date?.toDateString() === selectedDate.toDateString();
                        const isToday = dayInfo.date?.toDateString() === new Date().toDateString();
                        const hasAppointments = dayInfo.appointments && dayInfo.appointments.length > 0;
                        
                        let dayClasses = 'day-cell p-2 h-24 rounded-md cursor-pointer flex flex-col items-start justify-between hover:bg-slate-700/50 border-2 border-transparent';
                        if (isToday) dayClasses += ' day-today';
                        if (isSelected) dayClasses += ' day-selected';

                        return (
                            <div key={dayInfo.key} onClick={() => dayInfo.date && setSelectedDate(dayInfo.date)} className={dayClasses}>
                                <span className="font-semibold text-sm">{dayInfo.day}</span>
                                {hasAppointments && (
                                    <div className="appointment-badge">
                                        {dayInfo.appointments?.length}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="space-y-6">
                <div className="bg-slate-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Günün Ajandası ({todayAppointments.length})</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                        {todayAppointments.length > 0 ? todayAppointments.map(app => ( <AppointmentCard key={app.id} appointment={app} {...cardActions} /> )) : <p className="text-sm text-slate-500">Bugün için randevu yok.</p>}
                    </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2"> {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} Ajandası ({selectedDayAppointments.length}) </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                         {selectedDayAppointments.length > 0 ? selectedDayAppointments.map(app => ( <AppointmentCard key={app.id} appointment={app} {...cardActions} /> )) : <p className="text-sm text-slate-500">Seçili gün için randevu yok.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppointmentCard: React.FC<{
    appointment: Appointment; onEdit: (app: Appointment) => void; onDelete: (id: number) => void;
    onGenerateBriefing: (app: Appointment) => void; onToggleConfirm: (id: number) => void;
    onSendReminder: (id: number) => void; onShowHistory: (clientName: string) => void;
}> = ({ appointment, onEdit, onDelete, onGenerateBriefing, onToggleConfirm, onSendReminder, onShowHistory }) => {
    const statusColors = { 'Yaklaşan': 'border-blue-500', 'Tamamlandı': 'border-green-500', 'İptal Edildi': 'border-red-500' };
    return (
        <div className={`group bg-slate-800 p-3 rounded-md border-l-4 ${statusColors[appointment.status]}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-sm">{appointment.time} - {appointment.clientName}</p>
                    <p className="text-xs text-slate-400">{appointment.service}</p>
                </div>
                <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onShowHistory(appointment.clientName)} title="Müşteri Geçmişi" className="text-slate-400 hover:text-blue-400"><HistoryIcon /></button>
                    <button onClick={() => onSendReminder(appointment.id)} title="Hatırlatma Gönder" disabled={appointment.reminderSent} className="text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed"> <PaperPlaneIcon /> </button>
                    <button onClick={() => onGenerateBriefing(appointment)} title="AI Toplantı Özeti" className="text-slate-400 hover:text-yellow-400"><LightbulbIcon /></button>
                    <button onClick={() => onEdit(appointment)} title="Düzenle" className="text-slate-400 hover:text-purple-400"><EditIcon /></button>
                    <button onClick={() => onDelete(appointment.id)} title="Sil" className="text-slate-400 hover:text-red-400"><DeleteIcon /></button>
                </div>
                <button onClick={() => onToggleConfirm(appointment.id)} className="text-lg" title={appointment.isConfirmed ? 'Onaylandı' : 'Onay Bekliyor'}>
                    <CheckBadgeIcon isConfirmed={appointment.isConfirmed} />
                </button>
            </div>
        </div>
    );
};

const ListView: React.FC<{
    appointments: Appointment[]; selectedIds: number[];
    onSelectOne: (id: number) => void; onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEdit: (app: Appointment) => void; onDelete: (id: number) => void; onGenerateBriefing: (app: Appointment) => void;
    onToggleConfirm: (id: number) => void; onSendReminder: (id: number) => void; onShowHistory: (clientName: string) => void;
}> = ({ appointments, selectedIds, onSelectOne, onSelectAll, ...rowActions }) => {
    const statusColors: { [key in AppointmentStatus]: string } = { 'Yaklaşan': 'bg-blue-500/20 text-blue-300', 'Tamamlandı': 'bg-green-500/20 text-green-300', 'İptal Edildi': 'bg-red-500/20 text-red-300' };
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
    const isAllSelected = appointments.length > 0 && selectedIds.length === appointments.length;

    return (
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                    <tr>
                        <th className="p-4 w-12 text-center"><input type="checkbox" onChange={onSelectAll} checked={isAllSelected} className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" /></th>
                        <th className="p-4 w-12 text-center">Onay</th>
                        <th className="p-4">Müşteri</th>
                        <th className="p-4">Tarih & Saat</th>
                        <th className="p-4">Hizmet</th>
                        <th className="p-4 text-center">Durum</th>
                        <th className="p-4 text-right">Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.id} className={`border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50 ${selectedIds.includes(app.id) ? 'bg-blue-900/30' : ''}`}>
                            <td className="p-4 text-center"><input type="checkbox" checked={selectedIds.includes(app.id)} onChange={() => onSelectOne(app.id)} className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" /></td>
                            <td className="p-4 text-center"><button onClick={() => rowActions.onToggleConfirm(app.id)} className="text-xl" title={app.isConfirmed ? 'Onaylandı' : 'Onay Bekliyor'}><CheckBadgeIcon isConfirmed={app.isConfirmed} /></button></td>
                            <td className="p-4 font-semibold text-white">{app.clientName}</td>
                            <td className="p-4 text-slate-300">{formatDate(app.date)} - {app.time}</td>
                            <td className="p-4 text-slate-300">{app.service}</td>
                            <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>{app.status}</span></td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => rowActions.onShowHistory(app.clientName)} title="Müşteri Geçmişi" className="text-slate-400 hover:text-blue-400"><HistoryIcon /></button>
                                    <button onClick={() => rowActions.onSendReminder(app.id)} title="Hatırlatma Gönder" disabled={app.reminderSent} className="text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed"><PaperPlaneIcon /></button>
                                    <button onClick={() => rowActions.onGenerateBriefing(app)} title="AI Toplantı Özeti" className="text-slate-400 hover:text-yellow-400"><LightbulbIcon /></button>
                                    <button onClick={() => rowActions.onEdit(app)} title="Düzenle" className="text-slate-400 hover:text-purple-400"><EditIcon /></button>
                                    <button onClick={() => rowActions.onDelete(app.id)} title="Sil" className="text-slate-400 hover:text-red-400"><DeleteIcon /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {appointments.length === 0 && ( <div className="text-center p-8 text-slate-500">Filtrelerle eşleşen randevu bulunamadı.</div> )}
        </div>
    );
};

const AppointmentModal: React.FC<{ appointment: Partial<Appointment> | null; onClose: () => void; onSave: (appointment: Omit<Appointment, 'id'> & { id?: number }) => void; }> = ({ appointment, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: appointment?.id, clientName: appointment?.clientName || '', date: appointment?.date || getTodayDate(),
        time: appointment?.time || '', service: appointment?.service || '', status: appointment?.status || 'Yaklaşan' as AppointmentStatus,
        isConfirmed: appointment?.isConfirmed || false, reminderNote: appointment?.reminderNote || '',
    });
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleGenerateReminder = async () => {
        setIsAiLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `"${formData.clientName}" adlı müşteri için "${formData.service}" konusundaki ${formData.date} tarihli ve ${formData.time} saatli randevusu için nazik, profesyonel ve kısa bir hatırlatma metni oluştur.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setFormData(prev => ({ ...prev, reminderNote: response.text }));
        } catch (error) {
            console.error("Gemini Reminder Error:", error);
            alert("Hatırlatma notu oluşturulurken bir hata oluştu.");
        } finally { setIsAiLoading(false); }
    };

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-8 animate-scale-in text-slate-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{formData.id ? 'Randevu Düzenle' : 'Yeni Randevu Ekle'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl font-light">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div><label htmlFor="clientName" className="block text-sm font-medium mb-1">Müşteri Adı</label><input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500" required /></div>
                    <div><label htmlFor="service" className="block text-sm font-medium mb-1">Hizmet</label><input type="text" id="service" name="service" value={formData.service} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label htmlFor="date" className="block text-sm font-medium mb-1">Tarih</label><input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white" required /></div>
                        <div><label htmlFor="time" className="block text-sm font-medium mb-1">Saat</label><input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white" required /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-end">
                        <div><label htmlFor="status" className="block text-sm font-medium mb-1">Durum</label><select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white"><option value="Yaklaşan">Yaklaşan</option><option value="Tamamlandı">Tamamlandı</option><option value="İptal Edildi">İptal Edildi</option></select></div>
                        <div className="flex items-center pb-3"><input type="checkbox" id="isConfirmed" name="isConfirmed" checked={formData.isConfirmed} onChange={handleChange} className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-orange-500 focus:ring-orange-500 accent-orange-500"/><label htmlFor="isConfirmed" className="ml-3 text-sm">Randevu Onaylandı</label></div>
                    </div>
                    <div className="border-t border-slate-700 !mt-6 !mb-5"></div>
                    <div><label htmlFor="reminderNote" className="block text-sm font-medium mb-1">Hatırlatma Notu</label><textarea id="reminderNote" name="reminderNote" value={formData.reminderNote} onChange={handleChange} placeholder="Müşteriye gönderilecek hatırlatma metni..." rows={4} className="w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white"></textarea></div>
                    <div className="flex items-stretch gap-3">
                        <button type="button" onClick={handleGenerateReminder} disabled={isAiLoading} className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">{isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}{isAiLoading ? 'Oluşturuluyor...' : 'Yapay Zeka ile Oluştur'}</button>
                        <button type="button" title="Notu gönder (devre dışı)" className="w-12 h-auto flex-shrink-0 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg flex items-center justify-center disabled:opacity-50" disabled><PaperPlaneIcon /></button>
                    </div>
                    <div className="flex justify-end gap-4 pt-6">
                        <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-6 rounded-lg">İptal</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{ onCancel: () => void; onConfirm: () => void; count: number; }> = ({ onCancel, onConfirm, count }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
            <ExclamationTriangleIcon />
            <h3 className="text-lg font-bold text-white mt-4">Emin misiniz?</h3>
            <p className="text-sm text-slate-400 mt-2">Seçili {count} randevuyu kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
);

const AiBriefingModal: React.FC<{ data: { appointment: Appointment | null, content: string | null, isLoading: boolean }, onClose: () => void }> = ({ data, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 animate-scale-in">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center"><i className="fas fa-lightbulb text-yellow-400 mr-3"></i>AI Toplantı Özeti</h3>
            <div className="bg-slate-900 rounded-md p-4 min-h-[200px] text-slate-300 text-sm whitespace-pre-wrap">
                {data.isLoading ? <p>Analiz ediliyor, lütfen bekleyin...</p> : data.content}
            </div>
            <div className="text-right mt-4">
                <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg">Kapat</button>
            </div>
        </div>
    </div>
);

const ClientHistoryModal: React.FC<{ clientName: string | null; allAppointments: Appointment[]; onClose: () => void }> = ({ clientName, allAppointments, onClose }) => {
    const history = useMemo(() => {
        if (!clientName) return [];
        return allAppointments.filter(a => a.clientName === clientName).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [clientName, allAppointments]);

    const statusColors: { [key in AppointmentStatus]: string } = { 'Yaklaşan': 'text-blue-400', 'Tamamlandı': 'text-green-400', 'İptal Edildi': 'text-red-400' };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center"><HistoryIcon /> <span className="ml-3">"{clientName}" Müşteri Geçmişi</span></h3>
                <div className="bg-slate-900 rounded-md p-4 max-h-[60vh] overflow-y-auto">
                    {history.length > 0 ? (
                        <ul className="space-y-3">
                            {history.map(app => (
                                <li key={app.id} className="p-3 bg-slate-800 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{new Date(app.date).toLocaleDateString('tr-TR')} - {app.time}</p>
                                        <p className="text-sm text-slate-400">{app.service}</p>
                                    </div>
                                    <span className={`font-bold text-sm ${statusColors[app.status]}`}>{app.status}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-center">Bu müşteri için geçmiş randevu bulunamadı.</p>
                    )}
                </div>
                <div className="text-right mt-4">
                    <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg">Kapat</button>
                </div>
            </div>
        </div>
    );
};

const Toast: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-toast-in-out z-50">
        <i className="fas fa-check-circle mr-2"></i>{message}
    </div>
);

export default AdminRandevularPage;