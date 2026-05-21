import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { LoginLog } from '../../utils/logger';

const AdminLoginLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<LoginLog[]>([]);

    useEffect(() => {
        const storedLogs = localStorage.getItem('loginLogs');
        if (storedLogs) {
            setLogs(JSON.parse(storedLogs).reverse()); // Show most recent first
        }
    }, []);

    const handleClearLogs = () => {
        if (window.confirm('Tüm giriş kayıtlarını kalıcı olarak silmek istediğinizden emin misiniz?')) {
            localStorage.removeItem('loginLogs');
            setLogs([]);
        }
    };

    const formatTimestamp = (isoString: string) => {
        return new Date(isoString).toLocaleString('tr-TR', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    };

    return (
        <div className="flex-1 p-8 text-white h-screen overflow-y-auto">
            <AdminHeader title="Giriş Kayıtları (Loglar)" />
            
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={handleClearLogs}
                    className="bg-red-600/80 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2"
                >
                    <i className="fas fa-trash-can"></i>
                    Tüm Kayıtları Temizle
                </button>
            </div>

            <div className="mt-4 bg-slate-900 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Tarih & Saat</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4">IP Adresi</th>
                            <th className="p-4">Denemen E-posta</th>
                            <th className="p-4">Tarayıcı Bilgisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50">
                                <td className="p-4 text-slate-300 font-mono">{formatTimestamp(log.timestamp)}</td>
                                <td className="p-4 font-semibold">
                                    <span className={`px-2 py-1 rounded-full text-xs ${log.status === 'Başarılı' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-300 font-mono">{log.ip}</td>
                                <td className="p-4 text-slate-300">{log.emailAttempt}</td>
                                <td className="p-4 text-slate-400 text-xs truncate max-w-xs" title={log.userAgent}>{log.userAgent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && (
                     <div className="text-center p-8 text-slate-500">
                        Henüz bir giriş denemesi kaydedilmedi.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLoginLogsPage;
