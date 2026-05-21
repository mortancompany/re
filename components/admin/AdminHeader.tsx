import React from 'react';

interface AdminHeaderProps {
    title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
    return (
        <header className="flex justify-between items-center pb-4 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <div className="flex items-center space-x-6">
                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <i className="fas fa-bell text-xl"></i>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                </button>
                <div className="flex items-center space-x-3">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Admin" className="w-10 h-10 rounded-full ring-2 ring-slate-600" />
                    <div>
                        <p className="text-sm font-semibold text-white">Yönetici</p>
                        <p className="text-xs text-slate-400">admin@mortanas.ai</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
