import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';

interface AdminPlaceholderPageProps {
    title: string;
}

const AdminPlaceholderPage: React.FC<AdminPlaceholderPageProps> = ({ title }) => {
    return (
        <div className="flex-1 p-8 text-white">
            <AdminHeader title={title} />
            <div className="mt-8 bg-slate-900 p-8 rounded-lg">
                <h2 className="text-2xl font-bold">"{title}" Sayfası</h2>
                <p className="mt-4 text-slate-400">Bu sayfanın içeriği yapım aşamasındadır.</p>
            </div>
        </div>
    );
};

export default AdminPlaceholderPage;
