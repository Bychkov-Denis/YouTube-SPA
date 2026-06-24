import { HashRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </ToastProvider>
  );
}

export default App;
