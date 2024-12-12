import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, ThemeType } from '../../theme';

type NavigationContextType = {
  isSidebar: boolean;
  toggleNavigation: () => void;
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export type NavigationProps = 'sidebar' | 'navbar' | 'smallSidebar' | ' smallNavbar' | 'none'

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);


export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    return savedTheme || 'light';
  });

  const [isSidebar, setIsSidebar] = useState<boolean>(() => {
    const savedNavigation = localStorage.getItem('navigation');
    return savedNavigation ? JSON.parse(savedNavigation) : false;
  });

  const toggleNavigation = () => {
    setIsSidebar((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('navigation', JSON.stringify(isSidebar));
  }, [theme, isSidebar]);

  return (
    <NavigationContext.Provider value={{ isSidebar, toggleNavigation, theme, setTheme }}>
      <div style={{ backgroundColor: themes[theme].backgroundColor, minHeight: '100vh', color: themes[theme].textColor }}>
        {children}
      </div>
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};