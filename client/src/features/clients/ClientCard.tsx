import { Link } from 'react-router-dom';
import { ClientEntity } from '@/shared/types/client';

interface ClientCardProps {
  client: ClientEntity;
  onEdit: string;
  onDelete: () => void;
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  function formatDate(dateString: string | undefined): string {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  function calculateAge(birthDate: string | undefined): number | null {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  const age = calculateAge(client.birthDate);

  return (
    <article className="client-card" aria-labelledby={`client-${client.id}-name`}>
      <header className="client-card__header">
        <div
          className="client-card__avatar"
          aria-hidden="true"
        >
          {getInitials(client.name)}
        </div>
        <div className="client-card__info">
          <h2
            id={`client-${client.id}-name`}
            className="client-card__name"
          >
            {client.name}
          </h2>
          <a
            href={`mailto:${client.email}`}
            className="client-card__email"
            aria-label={`Enviar email a ${client.email}`}
          >
            {client.email}
          </a>
        </div>
      </header>

      <dl className="client-card__details">
        <div className="client-card__detail">
          <dt className="client-card__label">Fecha de nacimiento</dt>
          <dd className="client-card__value">{formatDate(client.birthDate)}</dd>
        </div>
        {age !== null && (
          <div className="client-card__detail">
            <dt className="client-card__label">Edad</dt>
            <dd className="client-card__value">{age} años</dd>
          </div>
        )}
        {client.preferences && (
          <>
            <div className="client-card__detail">
              <dt className="client-card__label">Idioma</dt>
              <dd className="client-card__value">
                {client.preferences.language === 'es' && 'Español'}
                {client.preferences.language === 'en' && 'Inglés'}
                {client.preferences.language === 'fr' && 'Francés'}
                {client.preferences.language === 'de' && 'Alemán'}
              </dd>
            </div>
            <div className="client-card__detail">
              <dt className="client-card__label">Notificaciones</dt>
              <dd className="client-card__value">
                {client.preferences.notifications ? 'Activadas' : 'Desactivadas'}
              </dd>
            </div>
            <div className="client-card__detail">
              <dt className="client-card__label">Tema</dt>
              <dd className="client-card__value">
                {client.preferences.theme === 'light' && 'Claro'}
                {client.preferences.theme === 'dark' && 'Oscuro'}
                {client.preferences.theme === 'auto' && 'Automático'}
              </dd>
            </div>
          </>
        )}
      </dl>

      <footer className="client-card__actions">
        <Link
          to={onEdit}
          className="btn btn--secondary btn--small"
          aria-label={`Editar cliente ${client.name}`}
        >
          Editar
        </Link>
        <button
          onClick={onDelete}
          className="btn btn--danger btn--small"
          aria-label={`Eliminar cliente ${client.name}`}
        >
          Eliminar
        </button>
      </footer>
    </article>
  );
}