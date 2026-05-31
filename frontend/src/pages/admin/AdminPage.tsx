import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Cpu, MapPin, MapPinned, Pencil, Plus, Trash2, Users } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppPaths } from '@/app/routes/paths' 
import { PointFormModal } from './PointFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { pontoColetaService, type PontoColetaResponse, type PontoColetaRequest, type Page } from '@/services/pontoColeta.service';
import type { AdminPointFormErrors, AdminPointFormState, AdminPointModalMode } from './admin.types';
import './admin-page.css';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

const emptyPointFormState: AdminPointFormState = {
  name: '',
  address: '',
  description: '',
  latitude: '',
  longitude: '',
  horarioAbertura: '08:00',
  horarioFechamento: '18:00',
  tipoProdutoIds: [],
};

export function AdminPage() {
  const navigate = useNavigate();
  const [pointsPage, setPointsPage] = useState<Page<PontoColetaResponse> | null>(null);
  const [currentPage, setCurrentPage] = useState(0); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formModalMode, setFormModalMode] = useState<AdminPointModalMode | null>(null);
  const [pointFormState, setPointFormState] = useState<AdminPointFormState>(emptyPointFormState);
  const [formErrors, setFormErrors] = useState<AdminPointFormErrors>({});
  const [pointBeingEditedId, setPointBeingEditedId] = useState<string | null>(null);
  const [pointPendingDeletion, setPointPendingDeletion] = useState<PontoColetaResponse | null>(null);

  useEffect(() => {
    fetchPoints(currentPage);
  }, [currentPage]);

  async function fetchPoints(pageIndex: number) {
    try {
      setIsLoading(true);
      const data = await pontoColetaService.findAllPaged(pageIndex, 5);
      setPointsPage(data);
    } catch (error) {
      console.error('Erro ao buscar pontos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const openCreatePointModal = () => {
    setPointBeingEditedId(null);
    setPointFormState({ ...emptyPointFormState });
    setFormErrors({});
    setFormModalMode('create');
  };

  const openEditPointModal = (point: PontoColetaResponse) => {
    setPointBeingEditedId(point.id);
    setPointFormState({
      name: point.nome,
      address: point.endereco,
      description: point.descricao,
      latitude: point.latitude.toString(),
      longitude: point.longitude.toString(),
      horarioAbertura: point.horarioAbertura.substring(0, 5),
      horarioFechamento: point.horarioFechamento.substring(0, 5),
      tipoProdutoIds: point.tiposProduto?.map(t => t.id) || [],
    });
    setFormErrors({});
    setFormModalMode('edit');
  };

  const validateForm = () => {
    const errors: AdminPointFormErrors = {};
    if (!pointFormState.name.trim()) errors.name = 'Informe o nome.';
    if (!pointFormState.address.trim()) errors.address = 'Informe o endereço.';
    if (!pointFormState.description.trim()) errors.description = 'Informe a descrição.';
    if (pointFormState.tipoProdutoIds.length === 0) errors.tipoProdutoIds = 'Selecione ao menos um tipo de resíduo.';
    
    const lat = Number(pointFormState.latitude);
    if (pointFormState.latitude.trim() === '' || Number.isNaN(lat) || lat < -90 || lat > 90) {
      errors.latitude = 'Latitude inválida.';
    }
    
    const lng = Number(pointFormState.longitude);
    if (pointFormState.longitude.trim() === '' || Number.isNaN(lng) || lng < -180 || lng > 180) {
      errors.longitude = 'Longitude inválida.';
    }

    if (!pointFormState.horarioAbertura) errors.horarioAbertura = 'Obrigatório.';
    if (!pointFormState.horarioFechamento) errors.horarioFechamento = 'Obrigatório.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm() || !formModalMode) return;

    try {
      setIsSubmitting(true);
      
      const payload: PontoColetaRequest = {
        nome: pointFormState.name.trim(),
        endereco: pointFormState.address.trim(),
        descricao: pointFormState.description.trim(),
        latitude: Number(pointFormState.latitude),
        longitude: Number(pointFormState.longitude),
        horarioAbertura: `${pointFormState.horarioAbertura}:00`,
        horarioFechamento: `${pointFormState.horarioFechamento}:00`,
        tipoProdutoIds: pointFormState.tipoProdutoIds,
      };

      if (formModalMode === 'create') {
        await pontoColetaService.create(payload);
        setCurrentPage(0);
      } else if (formModalMode === 'edit' && pointBeingEditedId) {
        await pontoColetaService.update(pointBeingEditedId, payload);
      }

      await fetchPoints(currentPage);
      setFormModalMode(null);
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      alert('Erro ao salvar os dados. Verifique o console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePoint = async () => {
    if (!pointPendingDeletion) return;
    try {
      setIsSubmitting(true);
      await pontoColetaService.delete(pointPendingDeletion.id);
      
      if (pointsPage?.content.length === 1 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchPoints(currentPage);
      }
      
      setPointPendingDeletion(null);
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir. Verifique o console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalElements = pointsPage?.totalElements || 0;
  const startItem = totalElements === 0 ? 0 : currentPage * 5 + 1;
  const endItem = Math.min((currentPage + 1) * 5, totalElements);
  const isFirstPage = currentPage === 0;
  const isLastPage = !pointsPage || currentPage >= pointsPage.totalPages - 1;

  return (
    <main className="adminv2">
      <AppHeader />
      <section className="adminv2-shell">
        <AdminSidebar activeTab="pontos" />

        <section className="adminv2-content">
          <header className="adminv2-content__header">
            <div>
              <h1>Pontos de Coleta</h1>
              <p>Monitore e gerencie os pontos de coleta disponíveis na cidade.</p>
            </div>
            <button type="button" className="adminv2-addBtn" onClick={openCreatePointModal}>
              <Plus className="adminv2-addBtn__icon" /> Adicionar Novo Ponto
            </button>
          </header>

          <section className="adminv2-tableCard">
            <header className="adminv2-tableCard__head">
              <h2>Pontos Cadastrados</h2>
            </header>

            <div className="adminv2-table">
              <div className="adminv2-table__header adminv2-table__row">
                <span>Ponto</span>
                <span>Localização</span>
                <span>Status Operacional</span>
                <span className="adminv2-actionsCol" />
              </div>

              {isLoading ? (
                <div style={{ padding: '24px', textAlign: 'center' }}>Carregando dados...</div>
              ) : !pointsPage || pointsPage.content.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center' }}>Nenhum ponto cadastrado.</div>
              ) : (
                pointsPage.content.map((point) => (
                  <article key={point.id} className="adminv2-table__row adminv2-table__item">
                    <div className="adminv2-station">
                      <span className={`adminv2-stationIcon${!point.aberto ? ' adminv2-stationIcon--warn' : ''}`}>
                        <MapPin className="adminv2-stationIcon__svg" />
                      </span>
                      <div>
                        <strong>{point.nome}</strong>
                        <p className="adminv2-station__description">{point.descricao}</p>
                      </div>
                    </div>

                    <p className="adminv2-location">{point.endereco}</p>

                    <span className={`adminv2-status${!point.aberto ? ' adminv2-status--warn' : ''}`}>
                      <span className="adminv2-status__dot" />
                      {point.aberto ? 'Operacional / Aberto' : 'Fora de Horário'}
                    </span>

                    <div className="adminv2-rowActions">
                      <button type="button" onClick={() => openEditPointModal(point)}>
                        <Pencil />
                      </button>
                      <button type="button" onClick={() => setPointPendingDeletion(point)}>
                        <Trash2 />
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <footer className="adminv2-tableFooter">
              <p>Exibindo {startItem} a {endItem} de {totalElements} pontos</p>
              <div className="adminv2-pagination">
                <button 
                  type="button" 
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={isFirstPage || isLoading}
                  style={{ opacity: isFirstPage ? 0.5 : 1, cursor: isFirstPage ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft />
                </button>
                <button 
                  type="button" 
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={isLastPage || isLoading}
                  style={{ opacity: isLastPage ? 0.5 : 1, cursor: isLastPage ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronRight />
                </button>
              </div>
            </footer>
          </section>
        </section>
      </section>

      {formModalMode && (
        <PointFormModal
          mode={formModalMode}
          formState={pointFormState}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          onChange={(field, value) => setPointFormState(prev => ({ ...prev, [field]: value }))}
          onClose={() => setFormModalMode(null)}
          onSubmit={handleFormSubmit}
        />
      )}

      {pointPendingDeletion && (
        <DeleteConfirmModal
          point={pointPendingDeletion}
          isDeleting={isSubmitting}
          onClose={() => setPointPendingDeletion(null)}
          onConfirm={handleDeletePoint}
        />
      )}
    </main>
  );
}