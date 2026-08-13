import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    ];

    const currentLangObj = languages.find(lang => lang.code === currentLanguage);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 transition-all px-4 py-3 rounded-md hover:bg-white/10 active:scale-95 group font-bold text-white"
            >
                <span className="text-sm group-hover:scale-110 transition-transform">文A</span>
                <span className="hidden sm:inline">{currentLangObj?.nativeName || 'English'}</span>
                <span className={`ml-1 text-[10px] opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-[1100] animate-fadeInUp">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm font-bold transition-colors flex items-center justify-between group ${currentLanguage === lang.code
                                ? 'bg-accent/10 text-accent'
                                : 'text-white hover:bg-white/5'
                                }`}
                        >
                            <span>{lang.nativeName}</span>
                            {currentLanguage === lang.code && <span className="text-accent text-xs">●</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
