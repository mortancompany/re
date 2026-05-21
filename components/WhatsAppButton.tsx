import React from 'react';

const WhatsAppButton: React.FC = () => {
    const phoneNumber = "905540118888";
    const message = encodeURIComponent("Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            aria-label="WhatsApp ile İletişime Geçin"
        >
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <i className="fab fa-whatsapp text-4xl"></i>
            </div>
            <span className="absolute -top-10 right-1/2 translate-x-1/2 px-3 py-1.5 text-sm font-semibold text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                WhatsApp Destek
            </span>
        </a>
    );
};

export default WhatsAppButton;