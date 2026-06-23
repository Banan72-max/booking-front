import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './router/routes';
import { Header } from '../widgets/header/Header';
import { Footer } from '../widgets/footer/Footer';
import { SupportWidget } from '../widgets/support-widget/SupportWidget';

export default function App() {
  return (
    <AppProviders>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <SupportWidget />
      </div>
    </AppProviders>
  );
}
