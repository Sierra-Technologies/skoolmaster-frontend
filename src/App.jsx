import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SchoolProvider } from './context/SchoolContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SchoolProvider>
          <AppRoutes />
        </SchoolProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
