import { HashRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}

export default App;
