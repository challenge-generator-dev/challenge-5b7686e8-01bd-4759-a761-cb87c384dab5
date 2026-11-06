import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClientEntity } from '@/shared/types/client';
import { ApiClient } from '@/shared/services/api';
import { ClientCard } from './ClientCard';

const api = new ApiClient('http://localhost:3000');

export function ClientList() {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<ClientEntity[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClients(clients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          (client.preferences?.language?.toLowerCase().includes(query) ?? false)
      );
      setFilteredClients(filtered);
    }
  }, [searchQuery, clients]);

  async function loadClients() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getClients();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (!confirmed) return;

    try {
      await api.deleteClient(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      setFilteredClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar cliente');
    }
  }

  if (loading) {
    return (
      <div className="client-list__loading">
        <div className="spinner" aria-label="Cargando clientes"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-list__error">
        <p role="alert">Error: {error}</p>
        <button onClick={loadClients} className="btn btn--primary">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="client-list">
      <header className="client-list__header">
        <h1 className="client-list__title">Gestión de Clientes</h1>
        <Link to="/clients/new" className="btn btn--primary">
          Crear Nuevo Cliente
        </Link>
      </header>

      <div className="client-list__search">
        <label htmlFor="search" className="sr-only">Buscar clientes</label>
        <input
          id="search"
          type="search"
          placeholder="Buscar por nombre, email o idioma..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input--search"
          aria-label="Buscar clientes"
        />
      </div>

      {filteredClients.length === 0 ? (
        <div className="client-list__empty">
          <p>No se encontraron clientes.</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn btn--secondary"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <ul className="client-list__grid" role="list">
          {filteredClients.map((client) => (
            <li key={client.id} className="client-list__item">
              <ClientCard
                client={client}
                onEdit={`/clients/${client.id}/edit`}
                onDelete={() => handleDelete(client.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}