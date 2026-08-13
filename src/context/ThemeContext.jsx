/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || '#FF6D00');

    useEffect(() => {
        localStorage.setItem('accentColor', accentColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
    }, [accentColor]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
