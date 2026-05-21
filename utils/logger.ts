export interface LoginLog {
    timestamp: string;
    ip: string;
    userAgent: string;
    emailAttempt: string;
    passwordAttempt: string; // In a real app, NEVER log passwords. This is for simulation only.
    status: 'Başarılı' | 'Başarısız' | 'Engellendi';
}

export const logLoginAttempt = async (email: string, password: string, status: 'Başarılı' | 'Başarısız' | 'Engellendi'): Promise<void> => {
    let ipAddress = 'Bilinmiyor';
    try {
        // NOTE: This uses a third-party service to get the IP. This may have privacy implications
        // and should be used with caution in a real-world application.
        const response = await fetch('https://api.ipify.org?format=json');
        if(response.ok) {
            const data = await response.json();
            ipAddress = data.ip;
        }
    } catch (error) {
        console.error('IP adresi alınamadı:', error);
    }

    const newLog: LoginLog = {
        timestamp: new Date().toISOString(),
        ip: ipAddress,
        userAgent: navigator.userAgent,
        emailAttempt: email,
        passwordAttempt: password, // WARNING: Logging passwords is a major security risk.
        status: status,
    };

    try {
        const existingLogsRaw = localStorage.getItem('loginLogs');
        const existingLogs: LoginLog[] = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
        
        // Keep the log history to a reasonable size, e.g., last 100 entries
        const updatedLogs = [newLog, ...existingLogs].slice(0, 100);
        
        localStorage.setItem('loginLogs', JSON.stringify(updatedLogs));
    } catch (error) {
        console.error('Giriş kaydı yazılamadı:', error);
    }
};
