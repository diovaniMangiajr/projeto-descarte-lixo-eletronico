import { useState, type FormEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  LayoutList,
  MapPinned,
  Monitor,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { acceptedWasteTypeOptions, initialAdminPoints } from './admin.data';
import type {
  AdminPointFormErrors,
  AdminPointFormState,
  AdminPointModalMode,
  AdminPointRecord,
  PointStatus,
} from './admin.types';
import './admin-page.css';

const emptyPointFormState: AdminPointFormState = {
  name: '',
  address: '',
  description: '',
  acceptedWasteTypes: [],
  latitude: '',
  longitude: '',
};

function createEmptyPointFormState(): AdminPointFormState {
  return { ...emptyPointFormState, acceptedWasteTypes: [] };
}

function buildPointFormState(point: AdminPointRecord): AdminPointFormState {
  return {
    name: point.name,
    address: point.address,
    description: point.description,
    acceptedWasteTypes: [...point.acceptedWasteTypes],
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

function createEmptyPointFormErrors(): AdminPointFormErrors {
  return {};
}

function isValidLatitude(latitude: string) {
  const numericLatitude = Number(latitude);
  return latitude.trim() !== '' && !Number.isNaN(numericLatitude) && numericLatitude >= -90 && numericLatitude <= 90;
}

function isValidLongitude(longitude: string) {
  const numericLongitude = Number(longitude);
  return (
    longitude.trim() !== '' && !Number.isNaN(numericLongitude) && numericLongitude >= -180 && numericLongitude <= 180
  );
}

function validatePointForm(formState: AdminPointFormState) {
  const nextErrors: AdminPointFormErrors = {};

  if (!formState.name.trim()) {
    nextErrors.name = 'Informe o nome do ponto.';
  }

  if (!formState.address.trim()) {
    nextErrors.address = 'Informe o endereço completo.';
  }

  if (formState.acceptedWasteTypes.length === 0) {
    nextErrors.acceptedWasteTypes = 'Selecione ao menos um tipo de resíduo aceito.';
  }

  if (!isValidLatitude(formState.latitude)) {
    nextErrors.latitude = 'Informe uma latitude válida entre -90 e 90.';
  }

  if (!isValidLongitude(formState.longitude)) {
    nextErrors.longitude = 'Informe uma longitude válida entre -180 e 180.';
  }

  return nextErrors;
}

function formatPointStatus(status: PointStatus) {
  return status === 'maintenance' ? 'Manutenção Solicitada' : 'Operacional';
}

function StationIcon({ icon }: { icon: 'cpu' | 'monitor' | 'pin' | 'wrench' }) {
  if (icon === 'monitor') return <Monitor className="adminv2-stationIcon__svg" aria-hidden="true" />;
  if (icon === 'pin') return <MapPinned className="adminv2-stationIcon__svg" aria-hidden="true" />;
  if (icon === 'wrench') return <Wrench className="adminv2-stationIcon__svg" aria-hidden="true" />;
  return <Cpu className="adminv2-stationIcon__svg" aria-hidden="true" />;
}

function PointFormModal({
  mode,
  formState,
  formErrors,
  onChange,
  onClose,
  onSubmit,
}: {
  mode: AdminPointModalMode;
  formState: AdminPointFormState;
  formErrors: AdminPointFormErrors;
  onChange: (field: keyof AdminPointFormState, value: string | string[]) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const modalTitle = mode === 'create' ? 'Cadastrar ponto de coleta' : 'Editar ponto de coleta';

  return (
    <div className="adminv2-modal" role="presentation" onClick={onClose}>
      <section
        className="adminv2-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="point-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="adminv2-dialog__header">
          <div>
            <p className="adminv2-dialog__eyebrow">US02 - CRUD de pontos</p>
            <h3 id="point-form-title">{modalTitle}</h3>
          </div>
          <button type="button" className="adminv2-dialog__close" onClick={onClose} aria-label="Fechar">
            <X />
          </button>
        </header>

        <form
          className="adminv2-form"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="adminv2-form__grid">
            <label className="adminv2-field adminv2-field--full">
              <span>Nome *</span>
              <input
                value={formState.name}
                onChange={(event) => onChange('name', event.target.value)}
                type="text"
                placeholder="Ex.: UFLA - Cantina Central"
              />
              {formErrors.name ? <small className="adminv2-field__error">{formErrors.name}</small> : null}
            </label>

            <label className="adminv2-field adminv2-field--full">
              <span>Endereço completo *</span>
              <input
                value={formState.address}
                onChange={(event) => onChange('address', event.target.value)}
                type="text"
                placeholder="Ex.: Campus Universitário, Lavras - MG"
              />
              {formErrors.address ? <small className="adminv2-field__error">{formErrors.address}</small> : null}
            </label>

            <label className="adminv2-field adminv2-field--full">
              <span>Descrição</span>
              <textarea
                value={formState.description}
                onChange={(event) => onChange('description', event.target.value)}
                placeholder="Descreva o ponto de coleta, horários ou observações operacionais."
                rows={4}
              />
            </label>

            <div className="adminv2-field adminv2-field--full">
              <span>Tipos de resíduos aceitos *</span>
              <div className="adminv2-chipGrid">
                {acceptedWasteTypeOptions.map((option) => {
                  const isSelected = formState.acceptedWasteTypes.includes(option.label);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`adminv2-chip${isSelected ? ' adminv2-chip--active' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        const nextWasteTypes = isSelected
                          ? formState.acceptedWasteTypes.filter((item) => item !== option.label)
                          : [...formState.acceptedWasteTypes, option.label];

                        onChange('acceptedWasteTypes', nextWasteTypes);
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {formErrors.acceptedWasteTypes ? (
                <small className="adminv2-field__error">{formErrors.acceptedWasteTypes}</small>
              ) : null}
            </div>

            <label className="adminv2-field">
              <span>Latitude *</span>
              <input
                value={formState.latitude}
                onChange={(event) => onChange('latitude', event.target.value)}
                type="text"
                inputMode="decimal"
                placeholder="-21.2399"
              />
              {formErrors.latitude ? <small className="adminv2-field__error">{formErrors.latitude}</small> : null}
            </label>

            <label className="adminv2-field">
              <span>Longitude *</span>
              <input
                value={formState.longitude}
                onChange={(event) => onChange('longitude', event.target.value)}
                type="text"
                inputMode="decimal"
                placeholder="-44.9990"
              />
              {formErrors.longitude ? <small className="adminv2-field__error">{formErrors.longitude}</small> : null}
            </label>
          </div>

          <footer className="adminv2-dialog__footer">
            <button type="button" className="adminv2-secondaryBtn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="adminv2-primaryBtn">
              {mode === 'create' ? 'Cadastrar ponto' : 'Salvar alterações'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function DeleteConfirmModal({
  point,
  onClose,
  onConfirm,
}: {
  point: AdminPointRecord;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="adminv2-modal" role="presentation" onClick={onClose}>
      <section
        className="adminv2-dialog adminv2-dialog--confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-point-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="adminv2-dialog__header">
          <div>
            <p className="adminv2-dialog__eyebrow">Confirmação obrigatória</p>
            <h3 id="delete-point-title">Excluir ponto de coleta</h3>
          </div>
          <button type="button" className="adminv2-dialog__close" onClick={onClose} aria-label="Fechar">
            <X />
          </button>
        </header>

        <div className="adminv2-confirmation">
          <p>
            Você está prestes a remover o ponto <strong>{point.name}</strong>.
          </p>
          <span>{point.address}</span>
          <p className="adminv2-confirmation__warning">
            Essa ação é irreversível. Confirme apenas se tiver certeza.
          </p>
        </div>

        <footer className="adminv2-dialog__footer">
          <button type="button" className="adminv2-secondaryBtn" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="adminv2-dangerBtn" onClick={onConfirm}>
            Excluir ponto
          </button>
        </footer>
      </section>
    </div>
  );
}

export function AdminPage() {
  const [adminPoints, setAdminPoints] = useState(initialAdminPoints);
  const [formModalMode, setFormModalMode] = useState<AdminPointModalMode | null>(null);
  const [pointFormState, setPointFormState] = useState<AdminPointFormState>(createEmptyPointFormState());
  const [formErrors, setFormErrors] = useState<AdminPointFormErrors>(createEmptyPointFormErrors());
  const [pointBeingEditedId, setPointBeingEditedId] = useState<number | null>(null);
  const [pointPendingDeletion, setPointPendingDeletion] = useState<AdminPointRecord | null>(null);

  const openCreatePointModal = () => {
    setPointBeingEditedId(null);
    setPointFormState(createEmptyPointFormState());
    setFormErrors(createEmptyPointFormErrors());
    setFormModalMode('create');
  };

  const openEditPointModal = (point: AdminPointRecord) => {
    setPointBeingEditedId(point.id);
    setPointFormState(buildPointFormState(point));
    setFormErrors(createEmptyPointFormErrors());
    setFormModalMode('edit');
  };

  const closePointFormModal = () => {
    setFormModalMode(null);
    setPointBeingEditedId(null);
    setFormErrors(createEmptyPointFormErrors());
  };

  const closeDeleteConfirmation = () => {
    setPointPendingDeletion(null);
  };

  const handleFormChange = (field: keyof AdminPointFormState, value: string | string[]) => {
    setPointFormState((currentFormState) => ({
      ...currentFormState,
      [field]: value,
    }));

    setFormErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleFormSubmit = () => {
    const nextErrors = validatePointForm(pointFormState);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !formModalMode) {
      return;
    }

    if (formModalMode === 'create') {
      const nextPoint: AdminPointRecord = {
        id: Math.max(0, ...adminPoints.map((point) => point.id)) + 1,
        name: pointFormState.name.trim(),
        address: pointFormState.address.trim(),
        description: pointFormState.description.trim(),
        acceptedWasteTypes: pointFormState.acceptedWasteTypes,
        latitude: pointFormState.latitude.trim(),
        longitude: pointFormState.longitude.trim(),
        status: 'operational',
      };

      setAdminPoints((currentPoints) => [nextPoint, ...currentPoints]);
    }

    if (formModalMode === 'edit' && pointBeingEditedId !== null) {
      setAdminPoints((currentPoints) =>
        currentPoints.map((point) =>
          point.id === pointBeingEditedId
            ? {
                ...point,
                name: pointFormState.name.trim(),
                address: pointFormState.address.trim(),
                description: pointFormState.description.trim(),
                acceptedWasteTypes: pointFormState.acceptedWasteTypes,
                latitude: pointFormState.latitude.trim(),
                longitude: pointFormState.longitude.trim(),
              }
            : point,
        ),
      );
    }

    closePointFormModal();
  };

  const handleDeletePoint = () => {
    if (!pointPendingDeletion) {
      return;
    }

    setAdminPoints((currentPoints) => currentPoints.filter((point) => point.id !== pointPendingDeletion.id));
    closeDeleteConfirmation();
  };

  return (
    <main className="adminv2">
      <AppHeader />

      <section className="adminv2-shell">
        <aside className="adminv2-sidebar">
          <div className="adminv2-user">
            <span className="adminv2-user__avatar" aria-hidden="true" />
            <div>
              <strong>Leonardo Silva</strong>
              <p>Administrador</p>
            </div>
          </div>

          <nav className="adminv2-nav" aria-label="Navegação administrativa">
            <a href="#" className="adminv2-nav__item adminv2-nav__item--active">
              <MapPinned className="adminv2-nav__icon" aria-hidden="true" />
              Pontos de Coleta
            </a>
            <a href="#" className="adminv2-nav__item">
              <Users className="adminv2-nav__icon" aria-hidden="true" />
              Usuários
            </a>
            <a href="#" className="adminv2-nav__item">
              <Cpu className="adminv2-nav__icon" aria-hidden="true" />
              Materiais Aceitos
            </a>
          </nav>
        </aside>

        <section className="adminv2-content">
          <header className="adminv2-content__header">
            <div>
              <h1>Pontos de Coleta</h1>
              <p>
                Monitore e gerencie as estações inteligentes de descarte de lixo eletrônico na rede
                municipal.
              </p>
            </div>

            <button type="button" className="adminv2-addBtn" onClick={openCreatePointModal}>
              <Plus className="adminv2-addBtn__icon" aria-hidden="true" />
              Adicionar Novo Ponto
            </button>
          </header>

          <section className="adminv2-tableCard" aria-label="Tabela de pontos de coleta">
            <header className="adminv2-tableCard__head">
              <h2>Pontos de Coleta</h2>
              <div className="adminv2-tableCard__tools">
                <button type="button" aria-label="Filtros">
                  <LayoutList />
                </button>
                <button type="button" aria-label="Mais opções">
                  <MoreVertical />
                </button>
              </div>
            </header>

            <div className="adminv2-table">
              <div className="adminv2-table__header adminv2-table__row">
                <span>Estação</span>
                <span>Localização</span>
                <span>Status Operacional</span>
                <span className="adminv2-actionsCol" aria-hidden="true" />
              </div>

              {adminPoints.map((point) => (
                <article key={point.id} className="adminv2-table__row adminv2-table__item">
                  <div className="adminv2-station">
                    <span
                      className={`adminv2-stationIcon${point.status === 'maintenance' ? ' adminv2-stationIcon--warn' : ''}`}
                      aria-hidden="true"
                    >
                      <StationIcon icon={point.status === 'maintenance' ? 'wrench' : 'cpu'} />
                    </span>
                    <div>
                      <strong>{point.name}</strong>
                      <p className="adminv2-station__description">{point.description}</p>
                    </div>
                  </div>

                  <p className="adminv2-location">{point.address}</p>

                  <span className={`adminv2-status${point.status === 'maintenance' ? ' adminv2-status--warn' : ''}`}>
                    <span className="adminv2-status__dot" aria-hidden="true" />
                    {formatPointStatus(point.status)}
                  </span>

                  <div className="adminv2-rowActions">
                    <button type="button" aria-label={`Editar ${point.name}`} onClick={() => openEditPointModal(point)}>
                      <Pencil />
                    </button>
                    <button
                      type="button"
                      aria-label={`Excluir ${point.name}`}
                      onClick={() => setPointPendingDeletion(point)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <footer className="adminv2-tableFooter">
              <p>Exibindo 1-4 de 12 estações</p>
              <div className="adminv2-pagination">
                <button type="button" aria-label="Anterior">
                  <ChevronLeft />
                </button>
                <button type="button" aria-label="Próximo">
                  <ChevronRight />
                </button>
              </div>
            </footer>
          </section>
        </section>
      </section>

      {formModalMode ? (
        <PointFormModal
          mode={formModalMode}
          formState={pointFormState}
          formErrors={formErrors}
          onChange={handleFormChange}
          onClose={closePointFormModal}
          onSubmit={handleFormSubmit}
        />
      ) : null}

      {pointPendingDeletion ? (
        <DeleteConfirmModal
          point={pointPendingDeletion}
          onClose={closeDeleteConfirmation}
          onConfirm={handleDeletePoint}
        />
      ) : null}
    </main>
  );
}
