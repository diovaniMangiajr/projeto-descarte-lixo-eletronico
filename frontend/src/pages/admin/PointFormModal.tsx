import { type FormEvent } from 'react';
import { X } from 'lucide-react';
import { acceptedWasteTypeOptions } from './admin.data';
import type { AdminPointFormErrors, AdminPointFormState, AdminPointModalMode } from './admin.types';

interface PointFormModalProps {
  mode: AdminPointModalMode;
  formState: AdminPointFormState;
  formErrors: AdminPointFormErrors;
  isSubmitting: boolean;
  onChange: (field: keyof AdminPointFormState, value: string | string[]) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function PointFormModal({
  mode,
  formState,
  formErrors,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}: PointFormModalProps) {
  const modalTitle = mode === 'create' ? 'Cadastrar ponto de coleta' : 'Editar ponto de coleta';

  return (
    <div className="adminv2-modal" role="presentation" onClick={onClose}>
      <section
        className="adminv2-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="adminv2-dialog__header">
          <div>
            <p className="adminv2-dialog__eyebrow">US02 - CRUD de pontos</p>
            <h3>{modalTitle}</h3>
          </div>
          <button type="button" className="adminv2-dialog__close" onClick={onClose} aria-label="Fechar" disabled={isSubmitting}>
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
          {/* Adicionando maxHeight para o formulário não estourar a tela em monitores menores */}
          <div className="adminv2-form__grid" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
            <label className="adminv2-field adminv2-field--full">
              <span>Nome *</span>
              <input
                value={formState.name}
                onChange={(event) => onChange('name', event.target.value)}
                type="text"
                placeholder="Ex.: UFLA - Cantina Central"
              />
              {formErrors.name && <small className="adminv2-field__error">{formErrors.name}</small>}
            </label>

            <label className="adminv2-field adminv2-field--full">
              <span>Endereço completo *</span>
              <input
                value={formState.address}
                onChange={(event) => onChange('address', event.target.value)}
                type="text"
                placeholder="Ex.: Campus Universitário, Lavras - MG"
              />
              {formErrors.address && <small className="adminv2-field__error">{formErrors.address}</small>}
            </label>

            <label className="adminv2-field adminv2-field--full">
              <span>Descrição *</span>
              <textarea
                value={formState.description}
                onChange={(event) => onChange('description', event.target.value)}
                placeholder="Descreva o ponto de coleta, horários ou observações operacionais."
                rows={3}
              />
              {formErrors.description && <small className="adminv2-field__error">{formErrors.description}</small>}
            </label>

            <div className="adminv2-field adminv2-field--full">
              <span>Tipos de resíduos aceitos *</span>
              <div className="adminv2-chipGrid">
                {acceptedWasteTypeOptions.map((option) => {
                  const isSelected = formState.tipoProdutoIds.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`adminv2-chip${isSelected ? ' adminv2-chip--active' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        const nextWasteTypes = isSelected
                          ? formState.tipoProdutoIds.filter((item) => item !== option.id)
                          : [...formState.tipoProdutoIds, option.id];
                        onChange('tipoProdutoIds', nextWasteTypes);
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {formErrors.tipoProdutoIds && <small className="adminv2-field__error">{formErrors.tipoProdutoIds}</small>}
            </div>

            <label className="adminv2-field">
              <span>Horário de Abertura *</span>
              <input
                value={formState.horarioAbertura}
                onChange={(event) => onChange('horarioAbertura', event.target.value)}
                type="time"
              />
              {formErrors.horarioAbertura && <small className="adminv2-field__error">{formErrors.horarioAbertura}</small>}
            </label>

            <label className="adminv2-field">
              <span>Horário de Fechamento *</span>
              <input
                value={formState.horarioFechamento}
                onChange={(event) => onChange('horarioFechamento', event.target.value)}
                type="time"
              />
              {formErrors.horarioFechamento && <small className="adminv2-field__error">{formErrors.horarioFechamento}</small>}
            </label>

            <label className="adminv2-field">
              <span>Latitude *</span>
              <input
                value={formState.latitude}
                onChange={(event) => onChange('latitude', event.target.value)}
                type="text"
                inputMode="decimal"
                placeholder="-21.2399"
              />
              {formErrors.latitude && <small className="adminv2-field__error">{formErrors.latitude}</small>}
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
              {formErrors.longitude && <small className="adminv2-field__error">{formErrors.longitude}</small>}
            </label>
          </div>

          <footer className="adminv2-dialog__footer">
            <button type="button" className="adminv2-secondaryBtn" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="adminv2-primaryBtn" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : mode === 'create' ? 'Cadastrar ponto' : 'Salvar alterações'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}