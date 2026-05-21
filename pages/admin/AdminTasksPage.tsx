import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { GoogleGenAI, Type } from '@google/genai';
import type { Task, TaskStatus, TaskPriority, Subtask, Comment } from '../../types';

// --- PERSISTENCE & MOCK DATA ---
const TASKS_STORAGE_KEY = 'mortanasTasks';

const getFutureDate = (daysToAdd: number) => new Date(Date.now() + daysToAdd * 86400000).toISOString().split('T')[0];
const getTodayDate = () => new Date().toISOString().split('T')[0];

const mockUsers: { [key: string]: string } = {
    'Eren': 'https://img.cdn.haber365.com/uploads/images/news/755x390-genc-girisimciden-onemli-uyari-yapay-zekayi-kendimiz-egitmezsek-gelecegimiz-baskalarinin-algoritmalarina-teslim-olur-531.jpg',
    'Ayşe': 'https://randomuser.me/api/portraits/women/68.jpg',
    'Mehmet': 'https://randomuser.me/api/portraits/men/66.jpg',
};
const currentUser = 'Eren';
const allUsers = ['Eren', 'Ayşe', 'Mehmet'];

const mockTasks: Task[] = [
    { id: 'task-1', title: 'Pazarlama Sunumunu Hazırla', description: 'Q4 pazarlama stratejileri için yeni sunumun hazırlanması gerekiyor.', status: 'Devam Ediyor', priority: 'Yüksek', dueDate: getFutureDate(2), assignedTo: ['Eren', 'Ayşe'], subtasks: [{ id: 'sub-1', text: 'Rakip analizi yap', isCompleted: true }, { id: 'sub-2', text: 'Grafikleri oluştur', isCompleted: false }], comments: [{id: 'comment-1', author: 'Ayşe', text: 'Grafikler için veri setlerini bekliyorum.', timestamp: new Date().toISOString()}], dependencies: [], projectId: 'Proje Alpha' },
    { id: 'task-2', title: 'Yeni CRM Modülünü Geliştir', description: 'Müşteri yönetimi için yeni modülün kodlanması.', status: 'Yapılacak', priority: 'Yüksek', dueDate: getFutureDate(10), assignedTo: ['Mehmet'], subtasks: [], comments: [], dependencies: ['task-3'], projectId: 'Proje Beta' },
    { id: 'task-3', title: 'CRM API Tasarımı', description: 'Yeni modül için API endpointlerinin tasarlanması.', status: 'Tamamlandı', priority: 'Orta', assignedTo: ['Mehmet'], subtasks: [], comments: [], dependencies: [], projectId: 'Proje Beta' },
    { id: 'task-4', title: 'Sosyal Medya Paylaşımlarını Planla', description: 'Eylül ayı için içerik takvimini oluştur.', status: 'Yapılacak', priority: 'Orta', dueDate: getFutureDate(5), assignedTo: ['Ayşe'], subtasks: [], comments: [], dependencies: [], projectId: 'Proje Alpha' },
    { id: 'task-5', title: 'Sunucu Bakımını Yap', description: 'Veritabanı sunucularının haftalık bakımı yapılacak.', status: 'Tamamlandı', priority: 'Düşük', assignedTo: ['Mehmet'], subtasks: [], comments: [], dependencies: [] },
];

const getInitialTasks = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
            return JSON.parse(storedTasks);
        } else {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(mockTasks));
            return mockTasks;
        }
    } catch (error) {
        console.error("Görevler localStorage'dan alınamadı", error);
        return mockTasks;
    }
};

const saveTasks = (tasks: Task[]): void => {
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Görevler localStorage'a kaydedilemedi", error);
    }
};

// --- UI ICONS ---
const ExclamationTriangleIcon = () => <i className="fas fa-exclamation-triangle text-red-400 mr-1"></i>;
const SparklesIcon = () => <i className="fas fa-wand-magic-sparkles"></i>;

// --- MAIN COMPONENT ---
const AdminTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
    const [view, setView] = useState<'kanban' | 'list'>('kanban');
    const [myTasksOnly, setMyTasksOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTaskIds, setDeletingTaskIds] = useState<string[] | null>(null);
    const [aiSummary, setAiSummary] = useState<{ content: string, isLoading: boolean }>({ content: '', isLoading: false });
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [aiQuickTaskInput, setAiQuickTaskInput] = useState('');
    const [isQuickAddLoading, setIsQuickAddLoading] = useState(false);
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const location = useLocation();

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);
    
    useEffect(() => {
        if (location.state?.action === 'add_new') {
            handleOpenModal(null);
            window.history.replaceState({}, document.title)
        }
    }, [location.state]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const filteredTasks = useMemo(() => {
        return myTasksOnly ? tasks.filter(task => task.assignedTo.includes(currentUser)) : tasks;
    }, [tasks, myTasksOnly]);

    const stats = useMemo(() => ({
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Tamamlandı').length,
        overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Tamamlandı').length,
    }), [tasks]);

    useEffect(() => {
        setSelectedTaskIds([]);
    }, [view, myTasksOnly]);
    
    const handleOpenModal = (task: Task | null) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (taskData: Omit<Task, 'id'> & { id?: string }) => {
        if (taskData.id) {
            setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, ...taskData } as Task : t));
            setToastMessage("Görev başarıyla güncellendi.");
        } else {
            const newTask: Task = {
                id: `task-${Date.now()}`,
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                assignedTo: taskData.assignedTo,
                subtasks: taskData.subtasks,
                comments: [],
                dependencies: taskData.dependencies,
                projectId: taskData.projectId,
            };
            setTasks(prev => [newTask, ...prev]);
            setToastMessage("Yeni görev başarıyla eklendi.");
        }
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTasks = () => {
        if (deletingTaskIds) {
            setTasks(prev => prev.filter(t => !deletingTaskIds.includes(t.id)));
            setToastMessage(`${deletingTaskIds.length} görev silindi.`);
            setDeletingTaskIds(null);
            setSelectedTaskIds([]);
        }
    };
    
    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const handleSelectOne = (id: string) => {
        setSelectedTaskIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTaskIds(e.target.checked ? filteredTasks.map(t => t.id) : []);
    };
    
    const handleBulkStatusChange = (newStatus: TaskStatus) => {
        setTasks(prev => prev.map(task => selectedTaskIds.includes(task.id) ? {...task, status: newStatus} : task));
        setToastMessage(`${selectedTaskIds.length} görevin durumu güncellendi.`);
        setSelectedTaskIds([]);
    };

    const handleAiQuickAdd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && aiQuickTaskInput.trim()) {
            setIsQuickAddLoading(true);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const prompt = `Doğal dilde yazılmış şu görevi JSON formatında ayrıştır: "${aiQuickTaskInput}". JSON objesi 'title', 'assignedTo' (bir dizi olmalı, isimleri şunlardan seç: ${allUsers.join(', ')}) ve 'dueDate' (YYYY-MM-DD formatında) alanlarını içermelidir. 'dueDate' için 'yarın' gibi ifadeleri bugünün tarihine (${getTodayDate()}) göre hesapla.`;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { responseMimeType: 'application/json' }
                });
                const taskData = JSON.parse(response.text);
                
                const newTask: Task = {
                    id: `task-${Date.now()}`,
                    title: taskData.title || 'Başlıksız Görev',
                    description: '',
                    status: 'Yapılacak',
                    priority: 'Orta',
                    dueDate: taskData.dueDate,
                    assignedTo: taskData.assignedTo || [],
                    subtasks: [],
                    comments: [],
                    dependencies: [],
                };
                setTasks(prev => [newTask, ...prev]);
                setAiQuickTaskInput('');
                setToastMessage("AI ile hızlı görev eklendi.");
            } catch (error) {
                console.error("AI Quick Add Error:", error);
                alert("Yapay zeka görevi oluştururken bir hata oluştu.");
            } finally {
                setIsQuickAddLoading(false);
            }
        }
    };
    
    const handleAiSummary = async () => {
        setIsSummaryModalOpen(true);
        setAiSummary({ content: '', isLoading: true });
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const tasksForPrompt = tasks.map(({ title, status, priority, dueDate }) => ({ title, status, priority, dueDate }));
            const prompt = `Aşağıdaki görev listesini analiz et. Mevcut durum hakkında Markdown formatında bir yönetici özeti oluştur. Özet şunları içermeli: 1. **Genel İlerleme Durumu**. 2. **Kritik ve Gecikmiş Görevler** (özellikle 'Yüksek' öncelikli olanlar). 3. **Potansiyel Riskler** veya darboğazlar. 4. **Acil Eylem Önerileri**.\n\nGörev Listesi: ${JSON.stringify(tasksForPrompt)}`;
            
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setAiSummary({ content: response.text, isLoading: false });
        } catch (error) {
            console.error("AI Summary Error:", error);
            setAiSummary({ content: 'Özet oluşturulurken bir hata oluştu.', isLoading: false });
        }
    };

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto animate-fade-in">
             <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
                .animate-toast-in-out { animation: toast-in 0.5s ease-out forwards, toast-out 0.5s 2.5s ease-in forwards; }
                @keyframes toast-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes toast-out { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(20px); } }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    filter: invert(0.6) brightness(1.5);
                }
            `}</style>
            <AdminHeader title="Görevler" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon="fa-tasks" title="Toplam Görev" value={stats.total.toString()} color="text-blue-400" />
                <StatCard icon="fa-check-double" title="Tamamlanan" value={stats.completed.toString()} color="text-green-400" />
                <StatCard icon="fa-clock" title="Gecikmiş" value={stats.overdue.toString()} color="text-red-400" />
            </div>
            
            <div className="mt-8 p-4 bg-slate-900 rounded-lg flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4 flex-wrap flex-grow">
                    <div className="relative flex-grow min-w-[250px] lg:max-w-md">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-400"><SparklesIcon /></span>
                         <input
                            type="text"
                            placeholder="AI ile hızlı görev ekle (Örn: 'Pazarlama sunumunu yarına kadar hazırla')..."
                            value={aiQuickTaskInput}
                            onChange={(e) => setAiQuickTaskInput(e.target.value)}
                            onKeyDown={handleAiQuickAdd}
                            disabled={isQuickAddLoading}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 pl-11 text-sm text-white focus:ring-purple-500 focus:border-purple-500"
                        />
                        {isQuickAddLoading && <i className="fas fa-spinner fa-spin absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="my-tasks" checked={myTasksOnly} onChange={(e) => setMyTasksOnly(e.target.checked)} className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" />
                            <label htmlFor="my-tasks" className="ml-2 text-sm text-slate-300">Sadece benim görevlerim</label>
                        </div>
                        <div className="bg-slate-800 p-1 rounded-md flex items-center">
                            <button onClick={() => setView('kanban')} className={`px-3 py-1 text-sm font-semibold rounded ${view === 'kanban' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}><i className="fas fa-table-columns mr-2"></i>Pano</button>
                            <button onClick={() => setView('list')} className={`px-3 py-1 text-sm font-semibold rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}><i className="fas fa-list mr-2"></i>Liste</button>
                        </div>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <button onClick={handleAiSummary} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                        <SparklesIcon /> Durum Özeti
                    </button>
                    <button onClick={() => handleOpenModal(null)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2">
                        <i className="fas fa-plus"></i> Görev Ekle
                    </button>
                </div>
            </div>

            {selectedTaskIds.length > 0 && view === 'list' && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg flex items-center gap-4 animate-fade-in">
                    <span className="text-sm font-semibold">{selectedTaskIds.length} görev seçildi</span>
                    <button onClick={() => handleBulkStatusChange('Yapılacak')} className="text-sm font-semibold text-slate-300 hover:text-white">Yapılacak</button>
                    <button onClick={() => handleBulkStatusChange('Devam Ediyor')} className="text-sm font-semibold text-slate-300 hover:text-white">Devam Ediyor</button>
                    <button onClick={() => handleBulkStatusChange('Tamamlandı')} className="text-sm font-semibold text-slate-300 hover:text-white">Tamamlandı</button>
                    <button onClick={() => setDeletingTaskIds(selectedTaskIds)} className="text-sm font-semibold flex items-center gap-2 text-red-400 hover:text-red-300"><i className="fas fa-trash-can"></i> Sil</button>
                    <button onClick={() => setSelectedTaskIds([])} className="text-sm font-semibold ml-auto text-slate-400 hover:text-white">Temizle</button>
                </div>
            )}

            <div className="mt-6">
                {view === 'kanban' ? (
                    <KanbanView 
                        tasks={filteredTasks} 
                        onStatusChange={handleStatusChange} 
                        onOpenModal={handleOpenModal} 
                        onDelete={(id) => setDeletingTaskIds([id])}
                    />
                ) : (
                    <ListView 
                        tasks={filteredTasks} 
                        onOpenModal={handleOpenModal}
                        onDelete={(id) => setDeletingTaskIds([id])} 
                        selectedIds={selectedTaskIds}
                        onSelectOne={handleSelectOne}
                        onSelectAll={handleSelectAll}
                    />
                )}
            </div>
            
            {isModalOpen && <TaskModal task={editingTask} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} allTasks={tasks} />}
            {deletingTaskIds && <DeleteConfirmModal onCancel={() => setDeletingTaskIds(null)} onConfirm={handleDeleteTasks} count={deletingTaskIds.length} />}
            {isSummaryModalOpen && <AiSummaryModal data={aiSummary} onClose={() => setIsSummaryModalOpen(false)} />}
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

const KanbanView: React.FC<{ tasks: Task[], onStatusChange: (taskId: string, newStatus: TaskStatus) => void, onOpenModal: (task: Task) => void, onDelete: (taskId: string) => void }> = ({ tasks, onStatusChange, onOpenModal, onDelete }) => {
    const columns: TaskStatus[] = ['Yapılacak', 'Devam Ediyor', 'Tamamlandı'];
    const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        onStatusChange(taskId, status);
        setDragOverColumn(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        e.preventDefault();
        setDragOverColumn(status);
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(status => {
                const tasksInColumn = tasks.filter(t => t.status === status);
                return (
                    <div 
                        key={status} 
                        onDrop={(e) => handleDrop(e, status)} 
                        onDragOver={(e) => handleDragOver(e, status)}
                        onDragLeave={() => setDragOverColumn(null)}
                        className={`bg-slate-900 p-4 rounded-lg transition-colors ${dragOverColumn === status ? 'bg-violet-900/50' : ''}`}
                    >
                        <h3 className="font-semibold mb-4 flex justify-between items-center text-slate-300">
                            {status}
                            <span className="text-sm bg-slate-700 text-slate-300 rounded-full px-2 py-0.5">{tasksInColumn.length}</span>
                        </h3>
                        <div className="space-y-4 min-h-[200px]">
                            {tasksInColumn.map(task => (
                                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} onEdit={() => onOpenModal(task)} onDelete={() => onDelete(task.id)} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const TaskCard: React.FC<{ task: Task, onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void, onEdit: () => void, onDelete: () => void }> = ({ task, onDragStart, onEdit, onDelete }) => {
    const priorityColors: { [key in TaskPriority]: string } = { 'Yüksek': 'border-red-500', 'Orta': 'border-yellow-500', 'Düşük': 'border-slate-500' };
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Tamamlandı';
    const subtaskProgress = task.subtasks.length > 0 ? (task.subtasks.filter(st => st.isCompleted).length / task.subtasks.length) * 100 : 0;

    return (
        <div draggable onDragStart={(e) => onDragStart(e, task.id)} className={`relative group bg-slate-800 p-4 rounded-lg shadow-md cursor-grab border-l-4 ${priorityColors[task.priority]}`}>
            <div className="absolute top-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e)=>{e.stopPropagation(); onEdit();}} className="text-slate-400 hover:text-white"><i className="fas fa-pencil text-xs"></i></button>
                <button onClick={(e)=>{e.stopPropagation(); onDelete();}} className="text-slate-400 hover:text-red-400"><i className="fas fa-trash-can text-xs"></i></button>
            </div>
            <div onClick={onEdit}>
                <h4 className="font-bold text-sm text-slate-200 pr-10">{task.title}</h4>
                {task.projectId && <p className="text-xs text-purple-400 mt-1">{task.projectId}</p>}
                {task.dueDate && <p className={`text-xs mt-2 font-semibold flex items-center ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>{isOverdue && <ExclamationTriangleIcon />} {new Date(task.dueDate).toLocaleDateString('tr-TR')}</p>}
                {task.subtasks.length > 0 && (
                    <div className="mt-3">
                        <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${subtaskProgress}%` }}></div></div>
                    </div>
                )}
                <div className="mt-3 flex justify-between items-center">
                    <div className="flex text-xs text-slate-500 space-x-3">
                        {task.dependencies.length > 0 && <span title="Bağımlılıklar"><i className="fas fa-link mr-1"></i>{task.dependencies.length}</span>}
                        {task.comments.length > 0 && <span title="Yorumlar"><i className="fas fa-comment mr-1"></i>{task.comments.length}</span>}
                        {task.subtasks.length > 0 && <span title="Alt Görevler"><i className="fas fa-list-check mr-1"></i>{task.subtasks.filter(st => st.isCompleted).length}/{task.subtasks.length}</span>}
                    </div>
                    <div className="flex -space-x-2">
                        {task.assignedTo.map(name => (
                            <div key={name} className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800" title={name}>
                                {mockUsers[name] ? <img src={mockUsers[name]} className="w-full h-full object-cover rounded-full" alt={name} /> : name.charAt(0)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ListView: React.FC<{ tasks: Task[], onOpenModal: (task: Task) => void, onDelete: (taskId: string) => void, selectedIds: string[], onSelectOne: (id: string) => void, onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ tasks, onOpenModal, onDelete, selectedIds, onSelectOne, onSelectAll }) => {
     const priorityStyles: { [key in TaskPriority]: { icon: string; color: string } } = {
        'Yüksek': { icon: 'fa-angles-up', color: 'text-red-400' },
        'Orta': { icon: 'fa-equals', color: 'text-yellow-400' },
        'Düşük': { icon: 'fa-angles-down', color: 'text-slate-400' },
    };
    const isAllSelected = tasks.length > 0 && selectedIds.length === tasks.length;

    return (
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                    <tr>
                        <th className="p-4 w-12 text-center"><input type="checkbox" checked={isAllSelected} onChange={onSelectAll} className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" /></th>
                        <th className="p-4">Durum</th>
                        <th className="p-4">Görev Başlığı</th>
                        <th className="p-4">Atananlar</th>
                        <th className="p-4">Bitiş Tarihi</th>
                        <th className="p-4">Öncelik</th>
                        <th className="p-4">Proje</th>
                        <th className="p-4">Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                         <tr key={task.id} className={`border-b border-slate-800 hover:bg-slate-800/50 ${selectedIds.includes(task.id) ? 'bg-blue-900/30' : ''}`}>
                            <td className="p-4 text-center"><input type="checkbox" checked={selectedIds.includes(task.id)} onChange={() => onSelectOne(task.id)} className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" /></td>
                            <td className="p-4 text-slate-300">{task.status}</td>
                            <td className="p-4 font-semibold text-white cursor-pointer" onClick={() => onOpenModal(task)}>{task.title}</td>
                            <td className="p-4">
                                <div className="flex -space-x-2">
                                    {task.assignedTo.map(name => (
                                        <div key={name} className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold ring-2 ring-slate-900" title={name}>
                                            {mockUsers[name] ? <img src={mockUsers[name]} className="w-full h-full object-cover rounded-full" alt={name}/> : name.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="p-4 text-slate-300">{task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : '-'}</td>
                            <td className="p-4">
                                <span className={`flex items-center gap-2 font-semibold ${priorityStyles[task.priority].color}`}>
                                    <i className={`fas ${priorityStyles[task.priority].icon}`}></i> {task.priority}
                                </span>
                            </td>
                            <td className="p-4 text-purple-400 font-semibold">{task.projectId || '-'}</td>
                            <td className="p-4">
                               <div className="flex items-center space-x-3">
                                <button onClick={() => onOpenModal(task)} className="text-slate-400 hover:text-white"><i className="fas fa-pencil"></i></button>
                                <button onClick={() => onDelete(task.id)} className="text-slate-400 hover:text-red-400"><i className="fas fa-trash-can"></i></button>
                               </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {tasks.length === 0 && <div className="text-center p-8 text-slate-500">Görev bulunamadı.</div>}
        </div>
    );
};

const TaskModal: React.FC<{ task: Partial<Task> | null; onClose: () => void; onSave: (data: any) => void; allTasks: Task[] }> = ({ task, onClose, onSave, allTasks }) => { 
    const [formData, setFormData] = useState<Partial<Task>>({
        id: task?.id,
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'Yapılacak',
        priority: task?.priority || 'Orta',
        dueDate: task?.dueDate || '',
        assignedTo: task?.assignedTo || [],
        subtasks: task?.subtasks || [],
        comments: task?.comments || [],
        dependencies: task?.dependencies || [],
        projectId: task?.projectId || '',
    });
    const [newSubtask, setNewSubtask] = useState('');
    const [newComment, setNewComment] = useState('');
    const [isSubtaskLoading, setIsSubtaskLoading] = useState(false);
    const [isPriorityLoading, setIsPriorityLoading] = useState(false);

    const handleGenerateSubtasks = async () => {
        if (!formData.title) return;
        setIsSubtaskLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Birincil görevi tamamlamak için mantıksal alt görev adımlarını içeren bir string dizisi oluştur. Ana Görev Başlığı: '${formData.title}', Açıklama: '${formData.description}'. Yalnızca string dizisini JSON formatında 'subtasks' anahtarı ile döndür. Örnek: {"subtasks": ["Adım 1", "Adım 2"]}`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config: { responseMimeType: 'application/json' } });
            const result = JSON.parse(response.text);
            const newSubtasks: Subtask[] = result.subtasks.map((text: string) => ({ id: `sub-${Date.now()}-${Math.random()}`, text, isCompleted: false }));
            setFormData(prev => ({...prev, subtasks: [...(prev.subtasks || []), ...newSubtasks]}));
        } catch (e) { console.error(e); } finally { setIsSubtaskLoading(false); }
    };
    
    const handleSuggestPriority = async () => {
        if (!formData.title) return;
        setIsPriorityLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Görevin başlığına ve açıklamasına göre önceliğini belirle. Sadece 'Yüksek', 'Orta' veya 'Düşük' kelimelerinden birini döndür. Başlık: '${formData.title}', Açıklama: '${formData.description}'`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const priority = response.text.trim();
            if (['Yüksek', 'Orta', 'Düşük'].includes(priority)) {
                setFormData(prev => ({ ...prev, priority: priority as TaskPriority }));
            }
        } catch(e) { console.error(e); } finally { setIsPriorityLoading(false); }
    };

    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            const sub: Subtask = { id: `sub-${Date.now()}`, text: newSubtask.trim(), isCompleted: false };
            setFormData(prev => ({ ...prev, subtasks: [...(prev.subtasks || []), sub] }));
            setNewSubtask('');
        }
    };
    
    const handleToggleSubtask = (subId: string) => {
        setFormData(prev => ({...prev, subtasks: prev.subtasks?.map(s => s.id === subId ? {...s, isCompleted: !s.isCompleted} : s)}));
    };
    
    const handleDeleteSubtask = (subId: string) => {
        setFormData(prev => ({...prev, subtasks: prev.subtasks?.filter(s => s.id !== subId)}));
    };
    
    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = { id: `comment-${Date.now()}`, author: currentUser, text: newComment.trim(), timestamp: new Date().toISOString() };
            setFormData(prev => ({...prev, comments: [...(prev.comments || []), comment]}));
            setNewComment('');
        }
    };

    // Other handlers for comments, dependencies etc. would go here

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl p-8 animate-scale-in text-slate-300 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white">{formData.id ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl font-light">&times;</button>
                </div>
                {/* Form content */}
                <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                    <div className="grid grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="col-span-2 space-y-4">
                           <input type="text" placeholder="Görev Başlığı" value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))} className="w-full bg-slate-700 p-3 rounded-md text-white text-xl font-bold" />
                           <textarea placeholder="Açıklama ekle..." value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} className="w-full bg-slate-700 p-3 rounded-md text-white h-24" />
                            {/* Subtasks */}
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                     <h4 className="font-semibold text-slate-200">Alt Görevler</h4>
                                     <button type="button" onClick={handleGenerateSubtasks} disabled={isSubtaskLoading} className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2">
                                        {isSubtaskLoading ? <i className="fas fa-spinner fa-spin"></i> : <SparklesIcon />} {isSubtaskLoading ? 'Oluşturuluyor...' : 'AI ile Oluştur'}
                                     </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.subtasks?.map(sub => (
                                        <div key={sub.id} className="flex items-center gap-2 group">
                                            <input type="checkbox" checked={sub.isCompleted} onChange={() => handleToggleSubtask(sub.id)} className="h-4 w-4 rounded bg-slate-600 text-blue-500" />
                                            <span className={`flex-grow text-sm ${sub.isCompleted ? 'line-through text-slate-500' : ''}`}>{sub.text}</span>
                                            <button onClick={() => handleDeleteSubtask(sub.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100"><i className="fas fa-times text-xs"></i></button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <input type="text" value={newSubtask} onChange={e => setNewSubtask(e.target.value)} placeholder="Yeni alt görev..." className="w-full bg-slate-700 p-1 rounded-md text-sm" />
                                    <button type="button" onClick={handleAddSubtask} className="text-sm bg-slate-600 px-3 rounded-md">Ekle</button>
                                </div>
                            </div>
                             {/* Comments */}
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-slate-200 mb-2">Yorumlar</h4>
                                <div className="space-y-3 max-h-40 overflow-y-auto">
                                   {formData.comments?.map(c => (
                                       <div key={c.id} className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold mt-1" title={c.author}><img src={mockUsers[c.author]} className="w-full h-full object-cover rounded-full" /></div>
                                            <div className="bg-slate-700 p-2 rounded-lg flex-grow">
                                                <p className="text-sm">{c.text}</p>
                                                <p className="text-xs text-slate-400 text-right">{new Date(c.timestamp).toLocaleString('tr-TR')}</p>
                                            </div>
                                       </div>
                                   ))}
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Yorum yaz..." rows={1} className="w-full bg-slate-700 p-2 rounded-md text-sm" />
                                    <button type="button" onClick={handleAddComment} className="text-sm bg-slate-600 px-3 rounded-md self-end">Gönder</button>
                                </div>
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="col-span-1 space-y-4">
                            {/* Status */}
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <label className="text-xs font-semibold uppercase text-slate-400">Durum</label>
                                <select value={formData.status} onChange={e => setFormData(p => ({...p, status: e.target.value as TaskStatus}))} className="w-full bg-slate-700 p-2 mt-1 rounded-md">
                                    <option>Yapılacak</option><option>Devam Ediyor</option><option>Tamamlandı</option>
                                </select>
                            </div>
                            {/* Priority */}
                             <div className="bg-slate-900/50 p-4 rounded-lg">
                                 <label className="text-xs font-semibold uppercase text-slate-400">Öncelik</label>
                                 <div className="flex items-center gap-2">
                                    <select value={formData.priority} onChange={e => setFormData(p => ({...p, priority: e.target.value as TaskPriority}))} className="w-full bg-slate-700 p-2 mt-1 rounded-md">
                                        <option>Düşük</option><option>Orta</option><option>Yüksek</option>
                                    </select>
                                    <button type="button" onClick={handleSuggestPriority} disabled={isPriorityLoading} className="p-2 bg-slate-700 rounded-md text-purple-400" title="AI ile Öncelik Öner">
                                        {isPriorityLoading ? <i className="fas fa-spinner fa-spin"></i> : <SparklesIcon />}
                                    </button>
                                 </div>
                             </div>
                            {/* Other fields: Assignees, Due Date, Project, Dependencies */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-6 flex-shrink-0">
                    <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-6 rounded-lg">İptal</button>
                    <button type="button" onClick={() => onSave(formData)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">Kaydet</button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal: React.FC<{ onCancel: () => void; onConfirm: () => void; count: number }> = ({ onCancel, onConfirm, count }) => (
     <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
            <i className="fas fa-exclamation-triangle text-4xl text-yellow-400"></i>
            <h3 className="text-lg font-bold text-white mt-4">Silme Onayı</h3>
            <p className="text-sm text-slate-400 mt-2">Seçili {count} görevi kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-5 rounded-lg">İptal</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
);

const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const elements = content.split('\n').map((line, index) => {
    if (line.startsWith('### ')) return <h4 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h4>;
    if (line.startsWith('## ')) return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.substring(3)}</h3>;
    if (line.startsWith('* ')) return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
    if (line.trim() === '') return <br key={index} />;
    
    const parts = line.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>);
    return <p key={index} className="mb-2">{parts}</p>;
  });
  return <>{elements}</>;
};

const AiSummaryModal: React.FC<{ data: { content: string, isLoading: boolean }, onClose: () => void }> = ({ data, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-scale-in max-h-[80vh] flex flex-col">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0"><SparklesIcon /> <span className="ml-3">AI Durum Özeti</span></h3>
            <div className="bg-slate-900 rounded-md p-4 text-slate-300 text-sm overflow-y-auto">
                {data.isLoading ? <div className="flex items-center justify-center h-40"><i className="fas fa-spinner fa-spin text-3xl"></i></div> : <SimpleMarkdownRenderer content={data.content} />}
            </div>
            <div className="text-right mt-4 flex-shrink-0">
                <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg">Kapat</button>
            </div>
        </div>
    </div>
);

const Toast: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-toast-in-out z-50">
        <i className="fas fa-check-circle mr-2"></i>{message}
    </div>
);

export default AdminTasksPage;
