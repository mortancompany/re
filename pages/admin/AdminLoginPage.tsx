import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logLoginAttempt } from '../../utils/logger';

const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const ATTEMPTS_STORAGE_KEY = 'loginAttempts';

interface AttemptInfo {
    count: number;
    lockoutUntil?: number;
}

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lockoutTimeLeft, setLockoutTimeLeft] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('bg-slate-800');
        return () => {
            document.body.classList.remove('bg-slate-800');
        };
    }, []);

    const getLoginAttempts = (email: string): AttemptInfo => {
        const attempts = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
        const data = attempts ? JSON.parse(attempts) : {};
        return data[email.toLowerCase()] || { count: 0 };
    };

    const setLoginAttempts = (email: string, info: AttemptInfo) => {
        const attempts = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
        const data = attempts ? JSON.parse(attempts) : {};
        data[email.toLowerCase()] = info;
        localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(data));
    };

    useEffect(() => {
        const checkLockout = () => {
            if (!email) {
                setLockoutTimeLeft('');
                return;
            }
            const attempts = getLoginAttempts(email);
            if (attempts.lockoutUntil && attempts.lockoutUntil > Date.now()) {
                const timeLeft = Math.ceil((attempts.lockoutUntil - Date.now()) / 1000);
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                setLockoutTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            } else {
                setLockoutTimeLeft('');
            }
        };

        checkLockout();
        const interval = setInterval(checkLockout, 1000);
        return () => clearInterval(interval);
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const attempts = getLoginAttempts(email);
        if (attempts.lockoutUntil && attempts.lockoutUntil > Date.now()) {
            setError(`Çok fazla hatalı deneme. Lütfen ${lockoutTimeLeft} sonra tekrar deneyin.`);
            await logLoginAttempt(email, password, 'Engellendi');
            setIsLoading(false);
            return;
        }

        if (email === 'info@mortanas.com' && password === 'mortanascompany') {
            await logLoginAttempt(email, password, 'Başarılı');
            setLoginAttempts(email, { count: 0 }); // Reset on success
            sessionStorage.setItem('isAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            const newCount = attempts.count + 1;
            let newLockoutUntil = attempts.lockoutUntil;

            if (newCount >= MAX_ATTEMPTS) {
                newLockoutUntil = Date.now() + LOCKOUT_DURATION;
                setError(`Çok fazla hatalı deneme. Giriş 15 dakika boyunca engellendi.`);
            } else {
                setError(`Geçersiz kullanıcı adı veya şifre. Kalan deneme: ${MAX_ATTEMPTS - newCount}`);
            }
            
            setLoginAttempts(email, { count: newCount, lockoutUntil: newLockoutUntil });
            await logLoginAttempt(email, password, 'Başarısız');
        }

        setIsLoading(false);
    };
    
    const isLocked = !!lockoutTimeLeft;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 bg-purple-600/20 rounded-xl mb-4">
                            <i className="fa-solid fa-cubes text-3xl text-purple-400"></i>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Mortanas Panel</h1>
                        <p className="text-slate-400 mt-2">Lütfen devam etmek için giriş yapın.</p>
                    </div>
                    
                    {isLocked && (
                         <div className="text-center bg-red-900/50 border border-red-500/50 p-4 rounded-lg mb-6">
                            <p className="font-bold text-red-300">Giriş Engellendi</p>
                            <p className="text-red-400 text-sm mt-1">Lütfen <span className="font-bold text-lg">{lockoutTimeLeft}</span> sonra tekrar deneyin.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">E-posta Adresi</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fa-solid fa-envelope text-slate-500"></i>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                    required
                                    disabled={isLocked}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Şifre</label>
                            <div className="relative">
                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fa-solid fa-lock text-slate-500"></i>
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                    required
                                    disabled={isLocked}
                                />
                            </div>
                        </div>

                        {error && !isLocked && <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}
                        
                        <div>
                            <button 
                                type="submit" 
                                disabled={isLoading || isLocked}
                                className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-right-to-bracket"></i>}
                                <span>{isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center text-xs text-slate-500 mt-6">&copy; {new Date().getFullYear()} Mortanas Company. Tüm hakları saklıdır.</p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
