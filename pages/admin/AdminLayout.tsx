import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout: React.FC = () => {
    
    useEffect(() => {
        // Add a class to the body for admin-specific styling and remove the default one
        document.body.classList.add('bg-slate-800');
        document.body.classList.remove('bg-white');
        return () => {
            // Cleanup on component unmount
            document.body.classList.remove('bg-slate-800');
            document.body.classList.add('bg-white');
        };
    }, []);

    return (
        <div className="min-h-screen w-full flex font-sans">
            <AdminSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
