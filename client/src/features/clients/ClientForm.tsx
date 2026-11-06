import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientEntity, CreateClientDto, UpdateClientDto } from '@/shared/types/client';
import { ApiClient } from '@/shared/services/api';

const api = new ApiClient('http://localhost:3000');

interface ClientFormProps {
  isEditMode?: boolean;
}

export function ClientForm({ isEditMode = false }: ClientFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateClientDto>({
    name: '',
    email: '',
    birthDate: '',
    preferences: {
      language: 'es',
      notifications: true,
      theme: 'light',
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      loadClient(id);
    }
  }, [isEditMode, id]);

  async function loadClient(clientId: string) {
    try {
      setFetching(true);
      const client = await api.getClientById(clientId);
      setFormData({
        name: client.name,
        email: client.email,
        birthDate: client.birthDate,
        preferences: client.preferences || {
          language: 'es',
          notifications: true,
          theme: 'light',
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar cliente');
    } finally {
      setFetching(false);
    }
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }

    if (!formData.birthDate) {
      errors.birthDate = 'La fecha de nacimiento es obligatoria';
    } else {
      const birth = new Date(formData.birthDate);
      const today = new Date();
      if (birth >= today) {
        errors.birthDate = 'La fecha de nacimiento debe ser anterior a hoy';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        const updateData: UpdateClientDto = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          birthDate: formData.birthDate,
          preferences: formData.preferences,
        };
        await api.updateClient(id, updateData);
      } else {
        await api.createClient(formData);
      }

      navigate('/clients');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar cliente');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.currentTarget;

    if (name.startsWith('preferences.')) {
      const prefKey = name.replace('preferences.', '');
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  if (fetching) {
    return (
      <div className="client-form__loading">
        <div className="spinner" aria-label="Cargando cliente"></div>
        <p>Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <div className="client-form">
      <header className="client-form__header">
        <h1 className="client-form__title">
          {isEditMode ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
        </h1>
      </header>

      {error && (
        <div className="client-form__error" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="client-form__form" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre completo <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${fieldErrors.name ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.name && (
            <span id="name-error" className="form-error" role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo electrónico <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.email && (
            <span id="email-error" className="form-error" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate" className="form-label">
            Fecha de nacimiento <span className="required">*</span>
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className={`form-input ${fieldErrors.birthDate ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.birthDate}
            aria-describedby={fieldErrors.birthDate ? 'birthDate-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.birthDate && (
            <span id="birthDate-error" className="form-error" role="alert">
              {fieldErrors.birthDate}
            </span>
          )}
        </div>

        <fieldset className="form-fieldset">
          <legend className="form-legend">Preferencias</legend>

          <div className="form-group">
            <label htmlFor="preferences.language" className="form-label">
              Idioma preferido
            </label>
            <select
              id="preferences.language"
              name="preferences.language"
              value={formData.preferences?.language || 'es'}
              onChange={handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className="form-group form-group--inline">
            <label htmlFor="preferences.notifications" className="form-checkbox-label">
              <input
                id="preferences.notifications"
                name="preferences.notifications"
                type="checkbox"
                checked={formData.preferences?.notifications ?? true}
                onChange={handleChange}
                disabled={loading}
                className="form-checkbox"
              />
              Recibir notificaciones
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="preferences.theme" className="form-label">
              Tema de interfaz
            </label>
            <select
              id="preferences.theme"
              name="preferences.theme"
              value={formData.preferences?.theme || 'light'}
              onChange={handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
        </fieldset>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="btn btn--secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}