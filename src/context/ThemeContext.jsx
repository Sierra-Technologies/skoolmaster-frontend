import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  default: {
    name: 'Ocean Blue',
    key: 'default',
    colors: {
      primary: '#3B82F6',
      primaryDark: '#2563EB',
      primaryLight: '#60A5FA',
      secondary: '#8B5CF6',
      accent: '#10B981',
    },
  },
  forest: {
    name: 'Forest Green',
    key: 'forest',
    colors: {
      primary: '#10B981',
      primaryDark: '#059669',
      primaryLight: '#34D399',
      secondary: '#14B8A6',
      accent: '#F59E0B',
    },
  },
  sunset: {
    name: 'Sunset Orange',
    key: 'sunset',
    colors: {
      primary: '#F97316',
      primaryDark: '#EA580C',
      primaryLight: '#FB923C',
      secondary: '#EC4899',
      accent: '#8B5CF6',
    },
  },
  royal: {
    name: 'Royal Purple',
    key: 'royal',
    colors: {
      primary: '#8B5CF6',
      primaryDark: '#7C3AED',
      primaryLight: '#A78BFA',
      secondary: '#EC4899',
      accent: '#F59E0B',
    },
  },
  midnight: {
    name: 'Midnight Dark',
    key: 'midnight',
    colors: {
      primary: '#60A5FA',
      primaryDark: '#3B82F6',
      primaryLight: '#93C5FD',
      secondary: '#A78BFA',
      accent: '#34D399',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeKey) => {
    document.documentElement.setAttribute('data-theme', themeKey);
  };

  const changeTheme = (themeKey) => {
    if (themes[themeKey]) {
      setCurrentTheme(themeKey);
      localStorage.setItem('theme', themeKey);
      applyTheme(themeKey);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes: Object.values(themes),
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
