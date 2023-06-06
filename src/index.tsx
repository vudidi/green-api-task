import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import './styles/css/styles.css';
import App from './components/App/App';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#70828c',
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {' '}
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
