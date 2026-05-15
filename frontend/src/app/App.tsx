import { AppRoutes } from '@/app/routes/AppRoutes';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}