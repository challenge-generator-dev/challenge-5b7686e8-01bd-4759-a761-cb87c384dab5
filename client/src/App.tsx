import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientList } from '@/features/clients/ClientList';
import { ClientForm } from '@/features/clients/ClientForm';
import { Suspense, lazy } from 'react';

const ClientCard = lazy(() => import('@/features/clients/ClientCard'));

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientCard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;