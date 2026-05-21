import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';

// --- PERSISTENCE HOOK ---
const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing to localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
};

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

const initialDailyGoalsData = [
    { id: 'vak', name: '40dk Odaklanma', description: 'Kesintisiz, verimli çalışma/eğitim.', icon: 'fa-solid fa-brain' },
    { id: 'nfp', name: 'Sıfır NFP', description: 'Zararlı içeriklerden uzak durma.', icon: 'fa-solid fa-eye-slash' },
    { id: 'sgr', name: 'Sıfır Sigara', description: 'Sağlıklı yaşam hedefi.', icon: 'fa-solid fa-smoking-ban' },
    { id: 'alkl', name: 'Sıfır Alkol', description: 'Zihin ve beden bütünlüğü.', icon: 'fa-solid fa-martini-glass-empty' },
    { id: 'mortanasDev', name: '3 Saat Mortanas Geliştirme', description: 'Şirket için günlük 3 saatlik geliştirme çalışması.', icon: 'fa-solid fa-code' },
    { id: 'reklam', name: '50+ Reklam Mesajı', description: 'Günlük pazarlama ve büyüme hedefi.', icon: 'fa-solid fa-bullhorn' }
];

const getTodayString = () => new Date().toISOString().split('T')[0];

const DisciplineHistoryGrid: React.FC<{ history: Record<string, Record<string, boolean>>, goals: {id: string, name: string}[] }> = ({ history, goals }) => {
    const days = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(currentYear, 10, 11); // Month is 0-indexed, so 10 is November
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);

        const daysArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            daysArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return daysArray;
    }, []);

    const getColorForDay = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        const dayData = history[dateString];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date > today) return 'bg-slate-800';
        if (!dayData) return 'bg-slate-700/50';
        
        const relevantGoalIds = goals.map(g => g.id);
        const completedCount = relevantGoalIds.filter(id => dayData[id]).length;
        const totalGoals = relevantGoalIds.length;

        if (totalGoals === 0) return 'bg-slate-700/50';
        const percentage = completedCount / totalGoals;

        if (completedCount === 0) return 'bg-red-900/60';
        if (percentage < 0.4) return 'bg-red-700/70';
        if (percentage < 0.6) return 'bg-yellow-700/70';
        if (percentage < 0.9) return 'bg-lime-700/80';
        if (percentage >= 0.9) return 'bg-green-600/90';
        
        return 'bg-slate-700/50';
    };
    
    const startingDayIndex = days.length > 0 ? (days[0].getDay() + 6) % 7 : 0; // 0=Mon, 6=Sun
    const placeholders = Array.from({ length: startingDayIndex });

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mt-8">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Şirket Kuruluşundan Beri Disiplin Geçmişi</h2>
            <div className="grid grid-cols-7 gap-1.5">
                {placeholders.map((_, index) => <div key={`ph-${index}`}></div>)}
                {days.map(day => {
                    const dateString = day.toISOString().split('T')[0];
                    const dayData = history[dateString] || {};
                    const isFoundingDay = day.getDate() === 11 && day.getMonth() === 10;
                    return (
                        <div key={dateString} className="relative group aspect-square">
                            <div className={`w-full h-full rounded ${getColorForDay(day)} flex items-center justify-center text-xs font-bold text-slate-300`}>
                                {day.getDate()}
                            </div>
                            {isFoundingDay && (
                                <i className="fa-solid fa-building-flag text-yellow-400 text-xs absolute top-1 right-1" title="Şirket Kuruluş Günü"></i>
                            )}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <p className="font-bold mb-2">{day.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <ul>
                                    {goals.map(goal => (
                                        <li key={goal.id} className="flex items-center">
                                            <i className={`fas ${dayData[goal.id] ? 'fa-check-circle text-green-400' : 'fa-times-circle text-red-400'} mr-2`}></i>
                                            {goal.name}
                                        </li>
                                    ))}
                                </ul>
                                {goals.length === 0 && <p>Hedef yok</p>}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
             <div className="flex justify-end items-center gap-4 text-xs mt-4 text-slate-400">
                <span>Az</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-red-900/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-red-700/70"></div>
                    <div className="w-3 h-3 rounded-sm bg-yellow-700/70"></div>
                    <div className="w-3 h-3 rounded-sm bg-lime-700/80"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-600/90"></div>
                </div>
                <span>Çok</span>
            </div>
        </div>
    );
};

const FinancialGoalModal: React.FC<{
    currentTarget: { amount: number, deadline: string },
    onClose: () => void,
    onSave: (newTarget: { amount: number, deadline: string }) => void
}> = ({ currentTarget, onClose, onSave }) => {
    const [amount, setAmount] = useState(currentTarget.amount);
    const [deadline, setDeadline] = useState(currentTarget.deadline);

    const handleSave = () => {
        onSave({ amount, deadline });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
                <h3 className="text-xl font-bold text-white mb-4">Finansal Hedefi Düzenle</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Hedef Tutar (USD)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full bg-slate-700 p-2 rounded-md mt-1 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">Bitiş Tarihi</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full bg-slate-700 p-2 rounded-md mt-1 text-white"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onClose} className="bg-slate-600 px-4 py-2 rounded-md font-semibold">İptal</button>
                    <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded-md font-semibold">Kaydet</button>
                </div>
            </div>
        </div>
    );
};


const AdminKisiselHedeflerPage: React.FC = () => {
    // --- FINANCIAL GOAL STATE ---
    const [financialTarget, setFinancialTarget] = usePersistentState<{ amount: number, deadline: string }>('financialTarget_v2', { amount: 100000, deadline: '2026-12-31' });
    const [currentAmount, setCurrentAmount] = usePersistentState<number>('financialGoalAmount', 0);
    const [updateAmount, setUpdateAmount] = useState<string>('');
    const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);

    // --- DAILY GOALS STATE ---
    const [dailyGoals, setDailyGoals] = usePersistentState<typeof initialDailyGoalsData>('dailyGoalsList_v2', initialDailyGoalsData);
    const [disciplineHistory, setDisciplineHistory] = usePersistentState<Record<string, Record<string, boolean>>>('disciplineHistory_v2', {});
    const [newGoalName, setNewGoalName] = useState('');
    const [goalToDelete, setGoalToDelete] = useState<{id: string, name: string} | null>(null);

    const todayStr = getTodayString();
    const completedGoalsToday = disciplineHistory[todayStr] || {};

    const financialStats = useMemo(() => {
        const deadlineDate = new Date(financialTarget.deadline + 'T23:59:59');
        const progressPercentage = (currentAmount / financialTarget.amount) * 100;
        const amountRemaining = financialTarget.amount - currentAmount;
        const daysRemaining = Math.max(0, Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
        const monthsRemaining = daysRemaining > 0 ? daysRemaining / 30.44 : 0;
        const monthlySavingsRequired = monthsRemaining > 0 ? amountRemaining / monthsRemaining : 0;

        return { progressPercentage, amountRemaining, daysRemaining, monthlySavingsRequired };
    }, [currentAmount, financialTarget]);

    const handleUpdateAmount = (e: React.FormEvent) => {
        e.preventDefault();
        const newAmount = parseFloat(updateAmount);
        if (!isNaN(newAmount) && newAmount >= 0) {
            setCurrentAmount(newAmount);
            setUpdateAmount('');
        }
    };
    
    const handleGoalToggle = (goalId: string) => {
        setDisciplineHistory(prev => {
            const todayData = prev[todayStr] || {};
            const updatedTodayData = { ...todayData, [goalId]: !todayData[goalId] };
            return { ...prev, [todayStr]: updatedTodayData };
        });
    };

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoalName.trim()) return;
        const newGoal = {
            id: newGoalName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: newGoalName,
            description: 'Kullanıcı tarafından eklendi.',
            icon: 'fa-solid fa-star'
        };
        if (dailyGoals.some(g => g.id === newGoal.id)) {
            alert("Bu ID'ye sahip bir hedef zaten var.");
            return;
        }
        setDailyGoals(prev => [...prev, newGoal]);
        // Also initialize it for today in history
        setDisciplineHistory(prev => ({
            ...prev,
            [todayStr]: { ...prev[todayStr], [newGoal.id]: false }
        }));
        setNewGoalName('');
    };

    const handleDeleteGoal = () => {
        if (!goalToDelete) return;
        setDailyGoals(prev => prev.filter(g => g.id !== goalToDelete.id));
        // Note: We don't need to clean up history, it will just be ignored.
        setGoalToDelete(null);
    };

    const dailyProgress = useMemo(() => {
        const totalToday = dailyGoals.length;
        if (totalToday === 0) return { completed: 0, total: 0, percentage: 0 };
        const completedToday = dailyGoals.filter(g => completedGoalsToday[g.id]).length;
        return { completed: completedToday, total: totalToday, percentage: (completedToday / totalToday) * 100 };
    }, [dailyGoals, completedGoalsToday]);

    const streak = useMemo(() => {
        let count = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) { // Check up to a year
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayData = disciplineHistory[dateStr];

            const relevantGoalIds = dailyGoals.map(g => g.id);
            const allCompleted = dayData && relevantGoalIds.length > 0 && relevantGoalIds.every(id => dayData[id]);
            
            if (allCompleted) {
                count++;
            } else {
                // If it's today and not yet completed, don't break the streak from yesterday
                if (i === 0) continue;
                break;
            }
        }
        // If today is not complete, the streak is from yesterday backwards
        // FIX: Use goal object `g` to access its `id` property for checking completion status.
        const todayCompleted = dailyGoals.length > 0 && dailyGoals.every(g => completedGoalsToday[g.id]);
        return todayCompleted ? count : Math.max(0, count -1);

    }, [disciplineHistory, dailyGoals, todayStr, completedGoalsToday]);
    
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (dailyProgress.percentage / 100) * circumference;

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <AdminHeader title="Kişisel Hedefler" />

            {isFinancialModalOpen && (
                <FinancialGoalModal
                    currentTarget={financialTarget}
                    onClose={() => setIsFinancialModalOpen(false)}
                    onSave={(newTarget) => {
                        setFinancialTarget(newTarget);
                        setIsFinancialModalOpen(false);
                    }}
                />
            )}
             {goalToDelete && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                        <h3 className="text-lg font-bold">Hedefi Sil?</h3>
                        <p className="text-slate-400 my-2">"{goalToDelete.name}" hedefini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={() => setGoalToDelete(null)} className="bg-slate-600 px-4 py-2 rounded-md font-semibold">İptal</button>
                            <button onClick={handleDeleteGoal} className="bg-red-600 px-4 py-2 rounded-md font-semibold">Evet, Sil</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Financial Goal Section */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-1 text-purple-400">Hedef {new Date(financialTarget.deadline).getFullYear()}: {currencyFormatter.format(financialTarget.amount)}</h2>
                        <button onClick={() => setIsFinancialModalOpen(true)} className="text-slate-400 hover:text-white"><i className="fas fa-pencil"></i></button>
                    </div>
                    <p className="text-sm text-slate-400 mb-6">Finansal özgürlük yolculuğu.</p>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2 text-sm"><span className="font-semibold text-slate-300">İlerleme</span><span className="font-bold text-purple-300">{financialStats.progressPercentage.toFixed(2)}%</span></div>
                        <div className="w-full bg-slate-700 rounded-full h-4"><div className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500" style={{ width: `${Math.min(financialStats.progressPercentage, 100)}%` }}></div></div>
                        <div className="text-right mt-2 font-semibold text-lg">{currencyFormatter.format(currentAmount)} / <span className="text-slate-400">{currencyFormatter.format(financialTarget.amount)}</span></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-center">
                        <div className="bg-slate-800 p-4 rounded-lg"><p className="text-sm text-slate-400">Kalan Tutar</p><p className="text-xl font-bold text-red-400">{currencyFormatter.format(financialStats.amountRemaining)}</p></div>
                        <div className="bg-slate-800 p-4 rounded-lg"><p className="text-sm text-slate-400">Kalan Gün</p><p className="text-xl font-bold text-yellow-400">{financialStats.daysRemaining}</p></div>
                        <div className="bg-slate-800 p-4 rounded-lg"><p className="text-sm text-slate-400">Gereken Aylık Birikim</p><p className="text-xl font-bold text-green-400">{currencyFormatter.format(financialStats.monthlySavingsRequired)}</p></div>
                    </div>
                    
                    <form onSubmit={handleUpdateAmount} className="flex gap-4 items-center border-t border-slate-700 pt-6">
                        <input type="number" step="100" placeholder="Mevcut birikimi güncelle..." value={updateAmount} onChange={(e) => setUpdateAmount(e.target.value)} className="flex-grow bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md">Güncelle</button>
                    </form>
                </div>
                
                 {/* Daily Progress Section */}
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-400">Günlük İlerleme</h2>
                    <div className="grid grid-cols-2 gap-8 items-center w-full max-w-sm">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700"/>
                                <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={progressOffset}
                                    className="text-green-500 transition-all duration-500"
                                />
                            </svg>
                            <span className="absolute text-3xl font-bold text-white">{`${Math.round(dailyProgress.percentage)}%`}</span>
                        </div>
                         <div className="text-center">
                            <p className="text-sm text-slate-400">Ateş Serisi</p>
                            <div className="flex items-center justify-center gap-2 text-4xl font-bold text-white mt-2">
                                <i className={`fas fa-fire ${streak > 0 ? 'text-orange-500' : 'text-slate-600'}`}></i>
                                {streak}
                            </div>
                            <p className="text-slate-400">Gün</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Goals List Section */}
            <div className="mt-8 bg-slate-900 p-6 rounded-xl border border-slate-700">
                     <h2 className="text-2xl font-bold mb-6 text-green-400">Günlük Disiplin Takibi</h2>
                     <div className="space-y-3">
                        {dailyGoals.map(goal => (
                            // FIX: Use goal.id to access the completion status from the completedGoalsToday object.
                            <div key={goal.id} className={`group p-3 rounded-lg border flex items-center justify-between transition-all duration-300 ${completedGoalsToday[goal.id] ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800 border-slate-700'}`}>
                                <div className="flex items-center">
                                    {/* FIX: Use goal.id to access the completion status from the completedGoalsToday object. */}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${completedGoalsToday[goal.id] ? 'bg-green-500/20 text-green-300' : 'bg-slate-700 text-slate-300'}`}><i className={goal.icon}></i></div>
                                    <div><h4 className="font-semibold text-white text-sm">{goal.name}</h4></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setGoalToDelete({id: goal.id, name: goal.name})} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fas fa-times text-xs"></i></button>
                                    {/* FIX: Correctly access the completed status of a daily goal using its ID as the key instead of the entire goal object. */}
                                    <input type="checkbox" checked={completedGoalsToday[goal.id] || false} onChange={() => handleGoalToggle(goal.id)} className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-green-500 focus:ring-green-500 cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                     </div>

                     <form onSubmit={handleAddGoal} className="flex gap-2 mt-4 border-t border-slate-700 pt-4">
                        <input type="text" value={newGoalName} onChange={e => setNewGoalName(e.target.value)} placeholder="Yeni hedef ekle..." className="flex-grow bg-slate-700 p-2 rounded-md text-sm"/>
                        <button type="submit" className="bg-blue-600 px-3 rounded-md font-semibold text-sm">Ekle</button>
                     </form>
            </div>
            
            <DisciplineHistoryGrid history={disciplineHistory} goals={dailyGoals} />
        </div>
    );
};

export default AdminKisiselHedeflerPage;
