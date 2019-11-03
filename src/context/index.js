import { createContext } from 'react';
import themes from '../themes';

export const ModeContext = createContext("dark");
export const ThemeContext = createContext(themes.dark);