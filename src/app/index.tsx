import theme from '@/theme';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

interface AppProps {
  children: React.ReactNode;
}

export function App({ children }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

interface wrapPageElementProps {
  element: React.ReactNode;
}

export const wrapPageElement = ({ element }: wrapPageElementProps) => (
  <App>{element}</App>
);
